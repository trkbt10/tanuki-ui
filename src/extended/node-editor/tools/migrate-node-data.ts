#!/usr/bin/env node

/**
 * CLI tool for migrating node editor data files from old format to new format
 * 
 * Usage:
 *   npx ts-node migrate-node-data.ts <input-file> [output-file]
 *   npx ts-node migrate-node-data.ts --bulk <input-dir> <output-dir>
 *   npx ts-node migrate-node-data.ts --validate <file>
 */

import * as fs from 'fs';
import * as path from 'path';
import { 
  migrateNodeData, 
  validateMigratedData,
  bulkMigrateData,
  needsMigration,
  type VersionedNodeEditorData 
} from '../utils/dataMigration';
import { createNodeDefinitionRegistry } from '../types/NodeDefinition';

// Parse command line arguments
const args = process.argv.slice(2);

if (args.length === 0 || args[0] === '--help' || args[0] === '-h') {
  printHelp();
  process.exit(0);
}

// Main execution
async function main() {
  try {
    if (args[0] === '--bulk') {
      await handleBulkMigration(args[1], args[2]);
    } else if (args[0] === '--validate') {
      await handleValidation(args[1]);
    } else {
      await handleSingleMigration(args[0], args[1]);
    }
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

/**
 * Print help message
 */
function printHelp() {
  console.log(`
Node Editor Data Migration Tool

This tool migrates node editor data from the old format (ports embedded in nodes)
to the new format (ports inferred from node definitions).

Usage:
  migrate-node-data.ts <input-file> [output-file]
    Migrate a single file. If output-file is not specified, 
    the result will be saved as <input-file>.migrated.json

  migrate-node-data.ts --bulk <input-dir> <output-dir>
    Migrate all .json files in input-dir and save to output-dir

  migrate-node-data.ts --validate <file>
    Validate a file to check if it needs migration

Options:
  -h, --help    Show this help message

Examples:
  # Migrate a single file
  npx ts-node migrate-node-data.ts workflow.json workflow-new.json

  # Migrate all files in a directory
  npx ts-node migrate-node-data.ts --bulk ./data ./data-migrated

  # Check if a file needs migration
  npx ts-node migrate-node-data.ts --validate workflow.json
`);
}

/**
 * Handle single file migration
 */
async function handleSingleMigration(inputFile: string, outputFile?: string) {
  console.log(`Migrating ${inputFile}...`);

  // Read input file
  const data = await readJsonFile(inputFile);

  // Check if migration is needed
  if (!needsMigration(data)) {
    console.log('File is already in the new format. No migration needed.');
    return;
  }

  // Create a basic registry (you may need to customize this)
  const registry = createNodeDefinitionRegistry();

  // Perform migration
  const result = migrateNodeData(data, registry);

  // Show statistics
  console.log('\nMigration Statistics:');
  console.log(`  Nodes processed: ${result.statistics.nodesProcessed}`);
  console.log(`  Ports removed: ${result.statistics.portsRemoved}`);
  console.log(`  Port overrides created: ${result.statistics.portOverridesCreated}`);

  if (result.warnings.length > 0) {
    console.log('\nWarnings:');
    result.warnings.forEach(warning => console.log(`  - ${warning}`));
  }

  // Validate migration
  const validation = validateMigratedData(data, result.data, registry);
  if (!validation.isValid) {
    console.error('\nValidation failed:');
    validation.errors.forEach(error => console.error(`  - ${error}`));
    throw new Error('Migration validation failed');
  }

  // Save output
  const output = outputFile || inputFile.replace(/\.json$/, '.migrated.json');
  await writeJsonFile(output, result.data);
  console.log(`\nMigrated data saved to: ${output}`);
}

/**
 * Handle bulk migration
 */
async function handleBulkMigration(inputDir: string, outputDir: string) {
  console.log(`Bulk migrating files from ${inputDir} to ${outputDir}...`);

  // Ensure output directory exists
  await fs.promises.mkdir(outputDir, { recursive: true });

  // Find all JSON files in input directory
  const files = await fs.promises.readdir(inputDir);
  const jsonFiles = files.filter(file => file.endsWith('.json'));

  console.log(`Found ${jsonFiles.length} JSON files to process.`);

  // Create registry
  const registry = createNodeDefinitionRegistry();

  // Process each file
  let successCount = 0;
  let skipCount = 0;
  let errorCount = 0;

  for (const file of jsonFiles) {
    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(outputDir, file);

    try {
      console.log(`\nProcessing ${file}...`);
      const data = await readJsonFile(inputPath);

      if (!needsMigration(data)) {
        console.log('  Already in new format, copying as-is.');
        await fs.promises.copyFile(inputPath, outputPath);
        skipCount++;
        continue;
      }

      const result = migrateNodeData(data, registry);
      
      // Validate
      const validation = validateMigratedData(data, result.data, registry);
      if (!validation.isValid) {
        throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
      }

      await writeJsonFile(outputPath, result.data);
      console.log(`  ✓ Migrated successfully (${result.statistics.portsRemoved} ports removed)`);
      successCount++;

    } catch (error) {
      console.error(`  ✗ Error: ${error}`);
      errorCount++;
    }
  }

  console.log('\nBulk Migration Summary:');
  console.log(`  Successfully migrated: ${successCount}`);
  console.log(`  Already migrated: ${skipCount}`);
  console.log(`  Errors: ${errorCount}`);
  console.log(`  Total: ${jsonFiles.length}`);
}

/**
 * Handle validation
 */
async function handleValidation(inputFile: string) {
  console.log(`Validating ${inputFile}...`);

  const data = await readJsonFile(inputFile);

  if (!needsMigration(data)) {
    console.log('✓ File is already in the new format.');
    return;
  }

  console.log('✗ File needs migration.');
  console.log('\nFile format details:');
  console.log(`  Format version: ${data.formatVersion?.version || 'none (legacy)'}`);
  console.log(`  Ports storage: ${data.formatVersion?.portsStorageMethod || 'embedded (legacy)'}`);

  // Count nodes with ports
  let nodesWithPorts = 0;
  let totalPorts = 0;

  Object.values(data.nodes).forEach(node => {
    if ((node as any).ports?.length > 0) {
      nodesWithPorts++;
      totalPorts += (node as any).ports.length;
    }
  });

  console.log(`\nNodes with embedded ports: ${nodesWithPorts}`);
  console.log(`Total embedded ports: ${totalPorts}`);
}

/**
 * Read JSON file
 */
async function readJsonFile(filePath: string): Promise<VersionedNodeEditorData> {
  const content = await fs.promises.readFile(filePath, 'utf-8');
  return JSON.parse(content);
}

/**
 * Write JSON file
 */
async function writeJsonFile(filePath: string, data: any): Promise<void> {
  const content = JSON.stringify(data, null, 2);
  await fs.promises.writeFile(filePath, content, 'utf-8');
}

// Run the tool
main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});