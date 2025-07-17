import * as crypto from "node:crypto";
import { generateFolderPrefix } from "./generateFolderPrefix";
import { abbreviations } from "./abbreviations";

// Cache for generated class names and folder prefixes
const classNameCache = new Map<string, string>();
const collisionCheck = new Map<string, string>();
const folderPrefixCache = new Map<string, string>();

/**
 * Generate a short class name based on the file path and class name
 * @param name - The original class name
 * @param filePath - The file path (relative to src/)
 * @returns A short, unique class name
 */
export function generateShortClassName(name: string, filePath: string): string {
  const cacheKey = `${filePath}:${name}`;

  // Return cached result if available
  if (classNameCache.has(cacheKey)) {
    return classNameCache.get(cacheKey)!;
  }

  // Extract folder structure from path
  const pathParts = filePath.split("/").filter(Boolean);

  // Find the most specific folder to use as prefix
  let prefix = "ui"; // default prefix

  // Create a short but readable version of the class name
  let shortName = name;

  // Apply abbreviations
  for (const [full, abbr] of Object.entries(abbreviations)) {
    shortName = shortName.replace(new RegExp(full, "gi"), abbr);
  }

  // If still too long, use first letter of each word
  if (shortName.length > 8) {
    shortName = shortName
      .replace(/([A-Z])/g, "-$1")
      .toLowerCase()
      .replace(/^-/, "")
      .split(/[-_]/)
      .map((part) => part.slice(0, 3))
      .join("");
  }

  // Create base class name
  let className = `${prefix}${shortName}`;

  // Check for collisions and add counter if needed
  if (collisionCheck.has(className)) {
    const existingPath = collisionCheck.get(className)!;
    if (existingPath !== cacheKey) {
      // Collision detected, add a short hash instead of counter
      const hash = crypto.createHash("md5").update(cacheKey).digest("base64url").slice(0, 3);
      className = `${prefix}${shortName}${hash}`;
    }
  }

  // Store in cache and collision check
  classNameCache.set(cacheKey, className);
  collisionCheck.set(className, cacheKey);

  return className;
}

/**
 * Get or generate a folder prefix
 * @param folderName - The folder name
 * @returns The prefix for the folder
 */
function getFolderPrefix(folderName: string): string {
  if (folderPrefixCache.has(folderName)) {
    return folderPrefixCache.get(folderName)!;
  }

  const existingPrefixes = new Set(folderPrefixCache.values());
  const prefix = generateFolderPrefix(folderName, existingPrefixes);
  folderPrefixCache.set(folderName, prefix);

  return prefix;
}
