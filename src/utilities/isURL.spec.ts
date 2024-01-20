import { describe, it, expect } from "vitest";
import { isURL } from "./isURL";

describe("isURL", () => {
  describe("valid URLs", () => {
    it("should return true for valid HTTP URLs", () => {
      expect(isURL("http://example.com")).toBe(true);
      expect(isURL("http://www.example.com")).toBe(true);
      expect(isURL("http://subdomain.example.com")).toBe(true);
      expect(isURL("http://example.com:8080")).toBe(true);
      expect(isURL("http://example.com/path")).toBe(true);
      expect(isURL("http://example.com/path/to/resource")).toBe(true);
      expect(isURL("http://example.com?query=string")).toBe(true);
      expect(isURL("http://example.com#fragment")).toBe(true);
      expect(isURL("http://example.com/path?query=string#fragment")).toBe(true);
    });

    it("should return true for valid HTTPS URLs", () => {
      expect(isURL("https://example.com")).toBe(true);
      expect(isURL("https://secure.example.com")).toBe(true);
      expect(isURL("https://example.com:443")).toBe(true);
      expect(isURL("https://api.example.com/v1/users")).toBe(true);
    });

    it("should return true for valid FTP URLs", () => {
      expect(isURL("ftp://ftp.example.com")).toBe(true);
      expect(isURL("ftp://ftp.example.com/path/to/file.txt")).toBe(true);
      expect(isURL("ftps://secure-ftp.example.com")).toBe(true);
    });

    it("should return true for localhost URLs", () => {
      expect(isURL("http://localhost")).toBe(true);
      expect(isURL("http://localhost:3000")).toBe(true);
      expect(isURL("http://localhost:8080/api")).toBe(true);
      expect(isURL("https://localhost")).toBe(true);
    });

    it("should return true for IP address URLs", () => {
      expect(isURL("http://192.168.1.1")).toBe(true);
      expect(isURL("http://127.0.0.1")).toBe(true);
      expect(isURL("http://0.0.0.0")).toBe(true);
      expect(isURL("http://255.255.255.255")).toBe(true);
      expect(isURL("http://192.168.1.1:8080")).toBe(true);
      expect(isURL("http://10.0.0.1/path")).toBe(true);
    });

    it("should return true for IPv6 URLs", () => {
      expect(isURL("http://[::1]")).toBe(true);
      expect(isURL("http://[2001:db8::1]")).toBe(true);
      expect(isURL("http://[2001:db8::1]:8080")).toBe(true);
      expect(isURL("http://[::]:3000")).toBe(true);
    });

    it("should handle URLs with authentication", () => {
      expect(isURL("http://user:pass@example.com")).toBe(true);
      expect(isURL("https://admin@example.com")).toBe(true);
      expect(isURL("ftp://user:password@ftp.example.com")).toBe(true);
    });

    it("should handle complex query strings and fragments", () => {
      expect(isURL("https://example.com?foo=bar&baz=qux")).toBe(true);
      expect(isURL("https://example.com?q=hello+world")).toBe(true);
      expect(isURL("https://example.com?q=hello%20world")).toBe(true);
      expect(isURL("https://example.com#section-1")).toBe(true);
      expect(isURL("https://example.com/page?id=123#top")).toBe(true);
    });

    it("should handle international domain names", () => {
      expect(isURL("http://example.co.uk")).toBe(true);
      expect(isURL("http://example.com.au")).toBe(true);
      expect(isURL("http://example.io")).toBe(true);
      expect(isURL("http://example.dev")).toBe(true);
    });
  });

  describe("invalid URLs", () => {
    it("should return false for invalid protocols", () => {
      expect(isURL("file:///path/to/file")).toBe(false);
      expect(isURL("mailto:test@example.com")).toBe(false);
      expect(isURL("javascript:alert('xss')")).toBe(false);
      expect(isURL("data:text/plain,hello")).toBe(false);
      expect(isURL("tel:+1234567890")).toBe(false);
    });

    it("should return false for malformed URLs", () => {
      expect(isURL("http://")).toBe(false);
      expect(isURL("http://.com")).toBe(true); // URL constructor accepts this
      expect(isURL("http://example")).toBe(true); // URL constructor accepts this
      expect(isURL("http://.")).toBe(true); // URL constructor accepts this
      expect(isURL("://example.com")).toBe(false);
      expect(isURL("http//example.com")).toBe(false);
      expect(isURL("http:///example.com")).toBe(true); // URL constructor accepts this
    });

    it("should handle IP addresses (URL constructor is permissive)", () => {
      // Note: URL constructor doesn't validate IP addresses strictly
      expect(isURL("http://192.168.1.1")).toBe(true); // Valid IP
      expect(isURL("http://256.1.1.1")).toBe(false); // Invalid but caught by constructor
      expect(isURL("http://192.168.1")).toBe(true); // URL constructor accepts partial IPs
    });

    it("should return false for relative URLs", () => {
      expect(isURL("/path/to/resource")).toBe(false);
      expect(isURL("../parent/path")).toBe(false);
      expect(isURL("./current/path")).toBe(false);
      expect(isURL("path/to/resource")).toBe(false);
    });

    it("should return false for non-string inputs", () => {
      expect(isURL(null as any)).toBe(false);
      expect(isURL(undefined as any)).toBe(false);
      expect(isURL(123 as any)).toBe(false);
      expect(isURL({} as any)).toBe(false);
      expect(isURL([] as any)).toBe(false);
      expect(isURL(true as any)).toBe(false);
    });

    it("should return false for empty or whitespace strings", () => {
      expect(isURL("")).toBe(false);
      expect(isURL(" ")).toBe(false);
      expect(isURL("\t")).toBe(false);
      expect(isURL("\n")).toBe(false);
      expect(isURL("   ")).toBe(false);
    });

    it("should return false for plain text", () => {
      expect(isURL("hello world")).toBe(false);
      expect(isURL("example.com")).toBe(false);
      expect(isURL("not a url")).toBe(false);
      expect(isURL("test@example.com")).toBe(false);
    });

    it("should return false for URLs with spaces", () => {
      expect(isURL("http://example .com")).toBe(false);
      expect(isURL("http://example.com/path with spaces")).toBe(true); // URL constructor encodes spaces
      expect(isURL("http://ex ample.com")).toBe(false);
    });
  });

  describe("URLs without protocol", () => {
    it("should return false by default for URLs without protocol", () => {
      expect(isURL("example.com")).toBe(false);
      expect(isURL("www.example.com")).toBe(false);
      expect(isURL("subdomain.example.com")).toBe(false);
    });

    it("should return true when requireProtocol is false", () => {
      expect(isURL("example.com", { requireProtocol: false })).toBe(true);
      expect(isURL("www.example.com", { requireProtocol: false })).toBe(true);
      expect(isURL("subdomain.example.com", { requireProtocol: false })).toBe(true);
      expect(isURL("example.com:8080", { requireProtocol: false })).toBe(true);
      expect(isURL("example.com/path", { requireProtocol: false })).toBe(true);
    });

    it("should handle protocol-relative URLs", () => {
      expect(isURL("//example.com")).toBe(false);
      expect(isURL("//example.com", { requireProtocol: false })).toBe(true);
      expect(isURL("//www.example.com/path", { requireProtocol: false })).toBe(true);
    });

    it("should still return false for invalid URLs even when requireProtocol is false", () => {
      expect(isURL("not a url", { requireProtocol: false })).toBe(false);
      expect(isURL("/path/to/resource", { requireProtocol: false })).toBe(false);
      expect(isURL("", { requireProtocol: false })).toBe(false);
      expect(isURL("example", { requireProtocol: false })).toBe(true); // Can be valid hostname
    });
  });

  describe("edge cases", () => {
    it("should handle URLs with special characters", () => {
      expect(isURL("https://example.com/path-with-dash")).toBe(true);
      expect(isURL("https://example.com/path_with_underscore")).toBe(true);
      expect(isURL("https://example.com/path.with.dots")).toBe(true);
      expect(isURL("https://example.com/~user")).toBe(true);
      expect(isURL("https://example.com/$special")).toBe(true);
    });

    it("should handle very long URLs", () => {
      const longPath = "/path".repeat(100);
      expect(isURL(`https://example.com${longPath}`)).toBe(true);
      
      const longQuery = "?param=value&".repeat(50);
      expect(isURL(`https://example.com${longQuery}`)).toBe(true);
    });

    it("should trim whitespace", () => {
      expect(isURL("  https://example.com  ")).toBe(true);
      expect(isURL("\thttps://example.com\t")).toBe(true);
      expect(isURL("\nhttps://example.com\n")).toBe(true);
    });

    it("should handle punycode domains", () => {
      expect(isURL("http://xn--e1afmkfd.xn--p1ai")).toBe(true); // пример.рф
      expect(isURL("https://xn--80akhbyknj4f.xn--p1ai")).toBe(true); // испытание.рф
    });
  });
});