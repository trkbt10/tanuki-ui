/**
 * Check if a string is base64 encoded
 * @param str - The string to check
 * @returns true if the string is base64 encoded
 */
export function isBase64(str: string): boolean {
  if (!str || typeof str !== 'string') {
    return false;
  }

  // Remove data URL prefix if present
  const base64String = str.replace(/^data:[^;]*;base64,/, '');

  // Check if string is empty after removing prefix
  if (base64String.length === 0) {
    return false;
  }

  // Base64 regex pattern
  // Valid base64 characters: A-Z, a-z, 0-9, +, /, and optional padding with =
  const base64Regex = /^[A-Za-z0-9+/]*={0,2}$/;

  // Check if the string matches the base64 pattern
  if (!base64Regex.test(base64String)) {
    return false;
  }

  // Check if the length is valid (must be divisible by 4)
  if (base64String.length % 4 !== 0) {
    return false;
  }

  try {
    // Try to decode the base64 string
    // If it's not valid base64, this will throw an error
    atob(base64String);
    return true;
  } catch {
    return false;
  }
}