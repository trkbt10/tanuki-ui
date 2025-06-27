/**
 * Generate a short prefix from folder name
 * @param folderName - The folder name to abbreviate
 * @param existingPrefixes - Set of already used prefixes to avoid collisions
 * @returns A short prefix for the folder
 */
export function generateFolderPrefix(folderName: string, existingPrefixes: Set<string>): string {
  // Special cases for compound names
  const vowels = /[aeiou]/gi;
  const consonants = folderName
    .replace(vowels, "")
    .split("-")
    .map((part) => part.slice(0, Math.min(part.length, 3)))
    .join("");
  let prefix: string = consonants;

  // Check for collisions with existing prefixes
  let finalPrefix = prefix;
  let counter = 1;
  while (existingPrefixes.has(finalPrefix)) {
    finalPrefix = prefix + counter;
    counter++;
  }

  return finalPrefix;
}
