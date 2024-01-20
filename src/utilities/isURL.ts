/**
 * Check if a string is a valid URL
 * @param str - The string to check
 * @param options - Options for URL validation
 * @returns true if the string is a valid URL
 */
export function isURL(str: string, options?: { requireProtocol?: boolean }): boolean {
  if (!str || typeof str !== 'string') {
    return false;
  }

  // Trim whitespace
  const trimmed = str.trim();
  if (trimmed.length === 0) {
    return false;
  }

  try {
    const url = new URL(trimmed);
    
    // Check if it has a valid protocol
    const validProtocols = ['http:', 'https:', 'ftp:', 'ftps:'];
    if (!validProtocols.includes(url.protocol)) {
      // If protocol is not valid but requireProtocol is false, try with https prefix
      if (options?.requireProtocol === false) {
        throw new Error('Invalid protocol, retry with https');
      }
      return false;
    }

    return true;
  } catch {
    // If URL constructor throws, try to check if it's a protocol-relative URL
    if (options?.requireProtocol === false) {
      // Don't try to convert paths to URLs
      if (trimmed.startsWith('/') && !trimmed.startsWith('//')) {
        return false;
      }
      
      try {
        // Try with a default protocol
        const urlWithProtocol = trimmed.startsWith('//') ? `https:${trimmed}` : `https://${trimmed}`;
        const url = new URL(urlWithProtocol);
        
        // Check if it has a valid protocol (should always be true here, but just in case)
        const validProtocols = ['http:', 'https:', 'ftp:', 'ftps:'];
        if (!validProtocols.includes(url.protocol)) {
          return false;
        }
        
        return true;
      } catch {
        return false;
      }
    }
    return false;
  }
}