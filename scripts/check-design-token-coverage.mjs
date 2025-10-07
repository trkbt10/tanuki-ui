#!/usr/bin/env node
import { promises as fs } from 'fs';
import path from 'path';
import process from 'process';
import cssPkg from 'css';

const { parse } = cssPkg;

function parseArgs(argv) {
  const args = {
    baseline: null,
    stylesDir: path.join(process.cwd(), 'public', 'styles'),
    showMissing: true,
    missingLimit: 20,
    format: 'table',
    output: null,
  };

  for (const arg of argv) {
    if (arg.startsWith('--baseline=')) {
      args.baseline = arg.split('=')[1];
    } else if (arg.startsWith('--stylesDir=')) {
      args.stylesDir = path.resolve(arg.split('=')[1]);
    } else if (arg.startsWith('--missingLimit=')) {
      const value = Number(arg.split('=')[1]);
      if (!Number.isNaN(value) && value >= 0) {
        args.missingLimit = value;
      }
    } else if (arg === '--no-missing') {
      args.showMissing = false;
    } else if (arg.startsWith('--format=')) {
      const value = arg.split('=')[1];
      if (value) {
        args.format = value.toLowerCase();
      }
    } else if (arg.startsWith('--output=')) {
      const target = arg.split('=')[1];
      if (target) {
        args.output = path.resolve(target);
      }
    }
  }

  return args;
}

function extractVariables(ast) {
  const tokens = new Set();

  function walk(rules = []) {
    for (const rule of rules) {
      if (!rule) continue;
      switch (rule.type) {
        case 'rule':
        case 'font-face':
        case 'page':
        case 'document':
        case 'host':
          if (Array.isArray(rule.declarations)) {
            for (const decl of rule.declarations) {
              if (decl && decl.type === 'declaration' && typeof decl.property === 'string' && decl.property.startsWith('--')) {
                tokens.add(decl.property);
              }
            }
          }
          break;
        case 'media':
        case 'supports':
        case 'keyframes':
        case 'layer':
          walk(rule.rules || rule.keyframes);
          break;
        default:
          break;
      }
    }
  }

  walk(ast?.stylesheet?.rules);
  return tokens;
}

async function loadTokens(filePath) {
  const raw = await fs.readFile(filePath, 'utf8');
  const ast = parse(raw, { source: filePath });
  return extractVariables(ast);
}

function percentage(part, whole) {
  if (whole === 0) return '0.00%';
  return `${((part / whole) * 100).toFixed(2)}%`;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));

  const validFormats = new Set(['table', 'csv', 'json']);
  if (!validFormats.has(args.format)) {
    console.error(`Unsupported format \`${args.format}\`. Use one of: table, csv, json.`);
    process.exit(1);
  }

  const entries = await fs.readdir(args.stylesDir, { withFileTypes: true });
  const cssFiles = entries.filter(entry => entry.isFile() && entry.name.endsWith('.css'));

  if (cssFiles.length === 0) {
    console.error(`No CSS files found in ${args.stylesDir}`);
    process.exit(1);
  }

  const themes = await Promise.all(
    cssFiles.map(async entry => {
      const filePath = path.join(args.stylesDir, entry.name);
      const tokens = await loadTokens(filePath);
      return { name: entry.name, tokens };
    })
  );

  let referenceTokens;
  if (args.baseline) {
    const baselineFile = themes.find(theme => theme.name === args.baseline || theme.name === `${args.baseline}.css`);
    if (!baselineFile) {
      console.error(`Baseline theme \`${args.baseline}\` not found in ${args.stylesDir}`);
      process.exit(1);
    }
    referenceTokens = baselineFile.tokens;
  } else {
    referenceTokens = new Set();
    for (const theme of themes) {
      for (const token of theme.tokens) {
        referenceTokens.add(token);
      }
    }
  }

  const referenceList = Array.from(referenceTokens).sort();

  const results = themes.map(theme => {
    const missing = referenceList.filter(token => !theme.tokens.has(token));
    const covered = referenceList.length - missing.length;
    return {
      name: theme.name,
      total: theme.tokens.size,
      coverageCount: covered,
      coveragePercent: percentage(covered, referenceList.length),
      missing,
    };
  }).sort((a, b) => a.name.localeCompare(b.name));

  const referenceTotal = referenceList.length;

  const previewMissingTokens = tokens => {
    if (!args.showMissing) return '';
    if (args.missingLimit === 0 || tokens.length <= args.missingLimit) {
      return tokens.join(', ');
    }
    const preview = tokens.slice(0, args.missingLimit);
    const remaining = tokens.length - preview.length;
    return `${preview.join(', ')}, ... (+${remaining} more)`;
  };

  const ensureTrailingNewline = text => (text.endsWith('\n') ? text : `${text}\n`);

  let outputText = '';

  if (args.format === 'csv') {
    const header = ['theme', 'token_count', 'coverage_count', 'reference_total', 'coverage_percent', 'missing_count'];
    if (args.showMissing) {
      header.push(args.missingLimit === 0 ? 'missing_tokens' : `missing_preview_limit_${args.missingLimit}`);
    }

    const escapeCsv = value => {
      const str = String(value ?? '');
      if (/[",\n]/.test(str)) {
        return `"${str.replace(/"/g, '""')}"`;
      }
      return str;
    };

    const rows = results.map(result => {
      const base = [
        escapeCsv(result.name),
        escapeCsv(result.total),
        escapeCsv(result.coverageCount),
        escapeCsv(referenceTotal),
        escapeCsv(result.coveragePercent),
        escapeCsv(result.missing.length),
      ];
      if (args.showMissing) {
        base.push(escapeCsv(previewMissingTokens(result.missing)));
      }
      return base.join(',');
    });

    outputText = [header.join(','), ...rows].join('\n');
  } else if (args.format === 'json') {
    const jsonResults = results.map(result => {
      const coveragePercentValue = Number(((result.coverageCount / referenceTotal) * 100).toFixed(2));
      const payload = {
        name: result.name,
        tokenCount: result.total,
        coverageCount: result.coverageCount,
        referenceTotal,
        coveragePercent: coveragePercentValue,
        coveragePercentLabel: `${result.coverageCount}/${referenceTotal} (${result.coveragePercent})`,
        missingCount: result.missing.length,
      };

      if (args.showMissing) {
        const isComplete = args.missingLimit === 0 || result.missing.length <= args.missingLimit;
        const tokens = isComplete ? result.missing : result.missing.slice(0, args.missingLimit);
        payload.missingTokens = tokens;
        payload.missingAdditional = isComplete ? 0 : result.missing.length - tokens.length;
      }

      return payload;
    });

    const payload = {
      baseline: args.baseline ?? null,
      referenceTokens: referenceTotal,
      stylesDir: args.stylesDir,
      missingLimit: args.missingLimit,
      showMissing: args.showMissing,
      format: args.format,
      results: jsonResults,
    };

    outputText = JSON.stringify(payload, null, 2);
  } else {
    const lines = [`Reference tokens: ${referenceTotal}`, ''];
    const header = ['Theme', 'Tokens', 'Coverage', 'Missing'];
    const tableRows = [
      header,
      ...results.map(result => [
        result.name,
        result.total.toString(),
        `${result.coverageCount}/${referenceTotal} (${result.coveragePercent})`,
        result.missing.length.toString(),
      ]),
    ];

    const colWidths = header.map((_, idx) => Math.max(...tableRows.map(row => row[idx].length)));

    for (const row of tableRows) {
      const formatted = row.map((cell, idx) => cell.padEnd(colWidths[idx]));
      lines.push(formatted.join('  '));
    }

    if (args.showMissing) {
      lines.push('', 'Missing tokens by theme:');
      for (const result of results) {
        if (result.missing.length === 0) continue;
        lines.push('', `- ${result.name}`);
        lines.push(`  Missing (${result.missing.length}): ${previewMissingTokens(result.missing)}`);
      }
    }

    outputText = lines.join('\n');
  }

  if (args.output) {
    await fs.writeFile(args.output, ensureTrailingNewline(outputText), 'utf8');
  } else {
    process.stdout.write(ensureTrailingNewline(outputText));
  }
}

main().catch(error => {
  console.error('Failed to compute design token coverage:', error);
  process.exit(1);
});
