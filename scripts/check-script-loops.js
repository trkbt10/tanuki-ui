#!/usr/bin/env node

/**
 * Script Loop Detector
 * Detects potential infinite loops in npm scripts caused by recursive dependencies
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

function analyzePackageScripts() {
  console.log('🔍 Analyzing npm scripts for potential loops...\n');
  
  const packageJsonPath = path.join(rootDir, 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  const scripts = packageJson.scripts || {};
  
  // Build dependency graph
  const dependencies = {};
  const scriptExecutions = {};
  
  for (const [scriptName, scriptCommand] of Object.entries(scripts)) {
    dependencies[scriptName] = [];
    scriptExecutions[scriptName] = [];
    
    // Find npm run calls
    const npmRunMatches = scriptCommand.match(/npm run (\w[\w-]*)/g);
    if (npmRunMatches) {
      for (const match of npmRunMatches) {
        const calledScript = match.replace('npm run ', '');
        dependencies[scriptName].push(calledScript);
      }
    }
    
    // Find script executions in JS files
    const nodeMatches = scriptCommand.match(/node\s+([^\s]+\.js)/g);
    if (nodeMatches) {
      for (const match of nodeMatches) {
        const scriptFile = match.replace('node ', '');
        scriptExecutions[scriptName].push(scriptFile);
      }
    }
  }
  
  // Check for direct loops (A calls B, B calls A)
  const directLoops = [];
  for (const [script, deps] of Object.entries(dependencies)) {
    for (const dep of deps) {
      if (dependencies[dep] && dependencies[dep].includes(script)) {
        directLoops.push([script, dep]);
      }
    }
  }
  
  // Check for indirect loops using DFS
  function findCycles(script, visited = new Set(), path = []) {
    if (path.includes(script)) {
      return [...path.slice(path.indexOf(script)), script];
    }
    
    if (visited.has(script)) return null;
    visited.add(script);
    
    const deps = dependencies[script] || [];
    for (const dep of deps) {
      const cycle = findCycles(dep, visited, [...path, script]);
      if (cycle) return cycle;
    }
    
    return null;
  }
  
  const cycles = [];
  for (const script of Object.keys(scripts)) {
    const cycle = findCycles(script);
    if (cycle) {
      cycles.push(cycle);
    }
  }
  
  // Check for prebuild/prepack hooks that might cause issues
  const problematicHooks = [];
  for (const [scriptName, scriptCommand] of Object.entries(scripts)) {
    if (scriptName.startsWith('pre') || scriptName.startsWith('post')) {
      const baseScript = scriptName.replace(/^(pre|post)/, '');
      if (scripts[baseScript]) {
        // Check if the hook script calls the base script
        if (scriptCommand.includes(`npm run ${baseScript}`)) {
          problematicHooks.push({
            hook: scriptName,
            base: baseScript,
            command: scriptCommand
          });
        }
      }
    }
  }
  
  // Check for scripts that call themselves via external files
  const externalLoops = [];
  for (const [scriptName, executions] of Object.entries(scriptExecutions)) {
    for (const scriptFile of executions) {
      try {
        const fullPath = path.resolve(rootDir, scriptFile);
        if (fs.existsSync(fullPath)) {
          const content = fs.readFileSync(fullPath, 'utf8');
          // Check if the script file calls npm run commands
          const npmCalls = content.match(/execSync\(['"`]npm run (\w[\w-]*)['"`]/g);
          if (npmCalls) {
            for (const call of npmCalls) {
              const calledScript = call.match(/npm run (\w[\w-]*)/)[1];
              if (calledScript === scriptName) {
                externalLoops.push({
                  script: scriptName,
                  file: scriptFile,
                  calls: calledScript
                });
              }
            }
          }
        }
      } catch (error) {
        // Ignore file read errors
      }
    }
  }
  
  // Report findings
  let hasIssues = false;
  
  if (directLoops.length > 0) {
    console.log('🚨 Direct circular dependencies detected:');
    directLoops.forEach(([a, b]) => {
      console.log(`  • "${a}" ↔ "${b}"`);
    });
    console.log();
    hasIssues = true;
  }
  
  if (cycles.length > 0) {
    console.log('🔄 Cycle dependencies detected:');
    cycles.forEach(cycle => {
      console.log(`  • ${cycle.join(' → ')}`);
    });
    console.log();
    hasIssues = true;
  }
  
  if (problematicHooks.length > 0) {
    console.log('⚠️  Problematic pre/post hooks detected:');
    problematicHooks.forEach(({ hook, base, command }) => {
      console.log(`  • "${hook}" calls "${base}" (${command})`);
    });
    console.log();
    hasIssues = true;
  }
  
  if (externalLoops.length > 0) {
    console.log('🔄 External script loops detected:');
    externalLoops.forEach(({ script, file, calls }) => {
      console.log(`  • "${script}" → ${file} → calls "${calls}"`);
    });
    console.log();
    hasIssues = true;
  }
  
  // Show dependency tree
  console.log('📊 Script dependency tree:');
  for (const [script, deps] of Object.entries(dependencies)) {
    if (deps.length > 0) {
      console.log(`  ${script}:`);
      deps.forEach(dep => {
        const exists = scripts[dep] ? '✓' : '✗';
        console.log(`    → ${dep} ${exists}`);
      });
    }
  }
  
  if (!hasIssues) {
    console.log('\n✅ No script loops detected!');
  } else {
    console.log('\n❌ Script loop issues found. Please review and fix.');
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  analyzePackageScripts();
}

export { analyzePackageScripts };