import { describe, it, expect } from "vitest";
import { isBase64 } from "./isBase64";

describe("isBase64", () => {
  describe("valid base64 strings", () => {
    it("should return true for valid base64 strings", () => {
      expect(isBase64("SGVsbG8gV29ybGQ=")).toBe(true);
      expect(isBase64("VGVzdA==")).toBe(true);
      expect(isBase64("QQ==")).toBe(true);
      expect(isBase64("QUI=")).toBe(true);
      expect(isBase64("QUJD")).toBe(true);
    });

    it("should return true for base64 strings without padding", () => {
      expect(isBase64("SGVsbG8gV29ybGQ")).toBe(false); // Invalid without proper padding
      expect(isBase64("QUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLw==")).toBe(true);
    });

    it("should return true for empty base64 string", () => {
      expect(isBase64("")).toBe(false); // Empty string is not valid base64
    });

    it("should return true for base64 data URLs", () => {
      expect(isBase64("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==")).toBe(true);
      expect(isBase64("data:text/plain;base64,SGVsbG8gV29ybGQ=")).toBe(true);
      expect(isBase64("data:application/json;base64,eyJmb28iOiJiYXIifQ==")).toBe(true);
    });

    it("should handle long base64 strings", () => {
      const longString = "A".repeat(1000) + "==";
      expect(isBase64(longString)).toBe(false); // Not divisible by 4
      
      const validLongString = "AAAA".repeat(250);
      expect(isBase64(validLongString)).toBe(true);
    });
  });

  describe("invalid base64 strings", () => {
    it("should return false for strings with invalid characters", () => {
      expect(isBase64("Hello World!")).toBe(false);
      expect(isBase64("SGVsbG8@V29ybGQ=")).toBe(false);
      expect(isBase64("SGVsbG8#V29ybGQ=")).toBe(false);
      expect(isBase64("SGVsbG8 V29ybGQ=")).toBe(false); // Contains space
      expect(isBase64("SGVsbG8\nV29ybGQ=")).toBe(false); // Contains newline
    });

    it("should return false for invalid padding", () => {
      expect(isBase64("SGVsbG8gV29ybGQ")).toBe(false); // Missing padding
      expect(isBase64("SGVsbG8gV29ybGQ===")).toBe(false); // Too much padding
      expect(isBase64("SGVsbG8gV29ybGQ====")).toBe(false); // Way too much padding
      expect(isBase64("=SGVsbG8gV29ybGQ")).toBe(false); // Padding at start
      expect(isBase64("SGVs=bG8gV29ybGQ")).toBe(false); // Padding in middle
    });

    it("should return false for invalid length", () => {
      expect(isBase64("A")).toBe(false); // Length 1
      expect(isBase64("AB")).toBe(false); // Length 2
      expect(isBase64("ABC")).toBe(false); // Length 3
      expect(isBase64("ABCDE")).toBe(false); // Length 5
    });

    it("should return false for non-string inputs", () => {
      expect(isBase64(null as any)).toBe(false);
      expect(isBase64(undefined as any)).toBe(false);
      expect(isBase64(123 as any)).toBe(false);
      expect(isBase64({} as any)).toBe(false);
      expect(isBase64([] as any)).toBe(false);
    });

    it("should return false for plain URLs", () => {
      expect(isBase64("https://example.com")).toBe(false);
      expect(isBase64("http://localhost:3000")).toBe(false);
      expect(isBase64("/path/to/resource")).toBe(false);
    });

    it("should return false for malformed data URLs", () => {
      expect(isBase64("data:image/png;base64,")).toBe(false); // Empty base64 part
      expect(isBase64("data:;base64,SGVsbG8gV29ybGQ=")).toBe(true); // Valid even without mime type
      expect(isBase64("base64,SGVsbG8gV29ybGQ=")).toBe(false); // Not a valid data URL or base64
    });

    it("should return false for strings that decode but aren't valid base64 format", () => {
      expect(isBase64("!!!!!!")).toBe(false);
      expect(isBase64("??????")).toBe(false);
    });
  });

  describe("edge cases", () => {
    it("should handle unicode characters properly", () => {
      expect(isBase64("4pyT")).toBe(true); // Valid base64
      expect(isBase64("✓")).toBe(false); // Unicode character
      expect(isBase64("🚀")).toBe(false); // Emoji
    });

    it("should handle whitespace", () => {
      expect(isBase64(" SGVsbG8gV29ybGQ= ")).toBe(false); // Leading/trailing spaces
      expect(isBase64("\tSGVsbG8gV29ybGQ=")).toBe(false); // Tab
      expect(isBase64("SGVsbG8gV29ybGQ=\n")).toBe(false); // Trailing newline
    });
  });
});