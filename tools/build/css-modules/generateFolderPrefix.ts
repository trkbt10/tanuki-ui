/**
 * Generate a short prefix from folder name
 * @param folderName - The folder name to abbreviate
 * @param existingPrefixes - Set of already used prefixes to avoid collisions
 * @returns A short prefix for the folder
 */
export function generateFolderPrefix(
  folderName: string,
  existingPrefixes: Set<string>
): string {
  let prefix: string;

  // Special cases for compound names
  if (folderName.includes('-')) {
    // For hyphenated names, take first letter of each part
    prefix = folderName
      .split('-')
      .map(part => part[0])
      .join('')
      .toLowerCase();
  } else if (folderName.includes('/')) {
    // For paths, use last part
    const lastPart = folderName.split('/').pop()!;
    return generateFolderPrefix(lastPart, existingPrefixes);
  } else {
    // For single words, use smart abbreviation
    const vowels = /[aeiou]/gi;
    const consonants = folderName.replace(vowels, '');

    if (consonants.length >= 2) {
      // Use first 2-3 consonants
      prefix = consonants.slice(0, Math.min(consonants.length, 3)).toLowerCase();
    } else {
      // Fallback: use first 2-3 letters
      prefix = folderName.slice(0, Math.min(folderName.length, 3)).toLowerCase();
    }
  }

  // Ensure prefix is at least 2 characters
  if (prefix.length === 1) {
    prefix = folderName.slice(0, 2).toLowerCase();
  }

  // Check for collisions with existing prefixes
  let finalPrefix = prefix;
  let counter = 1;
  while (existingPrefixes.has(finalPrefix)) {
    finalPrefix = prefix + counter;
    counter++;
  }

  return finalPrefix;
}