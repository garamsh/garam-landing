import { describe, expect, it } from "vitest";
import { parseSiteUrl } from "../env";

describe("parseSiteUrl", () => {
  it("defaults when unset or empty", () => {
    expect(parseSiteUrl(undefined)).toBe("https://garam.sh");
    expect(parseSiteUrl("")).toBe("https://garam.sh");
  });

  it("normalizes to the origin without a trailing slash", () => {
    expect(parseSiteUrl("https://example.com/")).toBe("https://example.com");
    expect(parseSiteUrl("https://example.com/path")).toBe(
      "https://example.com",
    );
  });

  it("rejects values that are not http(s) URLs", () => {
    expect(() => parseSiteUrl("not a url")).toThrow("NEXT_PUBLIC_SITE_URL");
    expect(() => parseSiteUrl("ftp://example.com")).toThrow(
      "NEXT_PUBLIC_SITE_URL",
    );
  });
});
