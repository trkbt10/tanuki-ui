#!/usr/bin/env node

import { execSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Constants
const MAJOR_VERSION = 1; // Fixed major version
const PACKAGE_JSON_PATH = resolve(__dirname, '../package.json');

// Git utilities
function getCommitCount() {
  try {
    const count = execSync('git rev-list --count HEAD', { encoding: 'utf8' }).trim();
    return parseInt(count, 10);
  } catch (error) {
    console.error('Error getting commit count:', error.message);
    return 0;
  }
}

function getLastCommitHash() {
  try {
    return execSync('git rev-parse HEAD', { encoding: 'utf8' }).trim();
  } catch (error) {
    console.error('Error getting last commit hash:', error.message);
    return '';
  }
}

function getChangedFiles() {
  try {
    const lastVersion = getLastVersionCommit();
    if (!lastVersion) {
      // If no version tag exists, get all files
      return execSync('git ls-files', { encoding: 'utf8' }).trim().split('\n');
    }
    
    const files = execSync(`git diff --name-only ${lastVersion}..HEAD`, { encoding: 'utf8' })
      .trim()
      .split('\n')
      .filter(Boolean);
    return files;
  } catch (error) {
    console.error('Error getting changed files:', error.message);
    return [];
  }
}

function getLastVersionCommit() {
  try {
    // Get the last commit that changed package.json version
    const log = execSync('git log -p --reverse package.json | grep -B 10 \'"version":\' | grep commit | tail -1', { 
      encoding: 'utf8',
      shell: true 
    }).trim();
    
    if (log) {
      const match = log.match(/commit\s+([a-f0-9]+)/);
      return match ? match[1] : null;
    }
    return null;
  } catch (error) {
    return null;
  }
}

// File analysis utilities
function hasInterfaceChanges(files) {
  const interfaceFiles = files.filter(file => 
    file.startsWith('src/') && 
    (file.endsWith('.tsx') || file.endsWith('.ts')) &&
    !file.includes('.stories.') &&
    !file.includes('.spec.') &&
    !file.includes('.test.')
  );

  for (const file of interfaceFiles) {
    try {
      const content = readFileSync(file, 'utf8');
      
      // Check for export changes
      if (content.includes('export ') || content.includes('export {') || content.includes('export *')) {
        // Check if the export is a component or interface/type
        const exportMatches = content.match(/export\s+(?:default\s+)?(?:const|function|class|interface|type|enum)\s+\w+/g);
        if (exportMatches && exportMatches.length > 0) {
          console.log(`Interface change detected in ${file}`);
          return true;
        }
      }
      
      // Check for props changes in React components
      if (content.includes('Props') || content.includes('props:')) {
        const propsMatches = content.match(/(?:interface|type)\s+\w*Props\s*[={]/g);
        if (propsMatches && propsMatches.length > 0) {
          console.log(`Props change detected in ${file}`);
          return true;
        }
      }
    } catch (error) {
      console.error(`Error reading file ${file}:`, error.message);
    }
  }
  
  return false;
}

// Version management
function getCurrentVersion() {
  try {
    const packageJson = JSON.parse(readFileSync(PACKAGE_JSON_PATH, 'utf8'));
    return packageJson.version;
  } catch (error) {
    console.error('Error reading package.json:', error.message);
    return '1.0.0';
  }
}

function updateVersion(newVersion) {
  try {
    const packageJson = JSON.parse(readFileSync(PACKAGE_JSON_PATH, 'utf8'));
    packageJson.version = newVersion;
    writeFileSync(PACKAGE_JSON_PATH, JSON.stringify(packageJson, null, 2) + '\n');
    console.log(`Version updated to ${newVersion}`);
    return true;
  } catch (error) {
    console.error('Error updating package.json:', error.message);
    return false;
  }
}

function parseVersion(versionString) {
  const [major, minor, patch] = versionString.split('.').map(n => parseInt(n, 10));
  return { major, minor, patch };
}

// Main versioning logic
function calculateNewVersion() {
  const currentVersion = getCurrentVersion();
  const { minor } = parseVersion(currentVersion);
  
  const changedFiles = getChangedFiles();
  console.log(`Found ${changedFiles.length} changed files since last version`);
  
  const hasInterfaceChange = hasInterfaceChanges(changedFiles);
  const commitCount = getCommitCount();
  
  let newMinor = minor;
  if (hasInterfaceChange) {
    newMinor = minor + 1;
    console.log('Interface changes detected, incrementing minor version');
  }
  
  const newVersion = `${MAJOR_VERSION}.${newMinor}.${commitCount}`;
  return newVersion;
}

// Main execution
function main() {
  console.log('Starting auto-versioning...');
  
  const currentVersion = getCurrentVersion();
  console.log(`Current version: ${currentVersion}`);
  
  const newVersion = calculateNewVersion();
  
  if (currentVersion === newVersion) {
    console.log('No version change needed');
    return;
  }
  
  if (updateVersion(newVersion)) {
    console.log(`Successfully updated version from ${currentVersion} to ${newVersion}`);
    
    // Show what triggered the version change
    const { minor: oldMinor } = parseVersion(currentVersion);
    const { minor: newMinor } = parseVersion(newVersion);
    
    if (newMinor > oldMinor) {
      console.log('Minor version incremented due to interface/props changes');
    } else {
      console.log('Patch version updated based on commit count');
    }
  }
}

// Run if called directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}

export { calculateNewVersion, getCurrentVersion, updateVersion };