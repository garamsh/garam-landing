import { describe, expect, it } from "vitest";
import {
  defaultLocale,
  getDictionary,
  isLocale,
  localeCodes,
  localePath,
  negotiateLocale,
} from "..";

describe("isLocale", () => {
  it("accepts supported codes only", () => {
    expect(isLocale("en")).toBe(true);
    expect(isLocale("ko")).toBe(true);
    expect(isLocale("fr")).toBe(false);
    expect(isLocale("toString")).toBe(false);
  });
});

describe("localePath", () => {
  it("prefixes the locale", () => {
    expect(localePath("ko")).toBe("/ko");
  });
});

describe("dictionaries", () => {
  it("keep the same list lengths in every locale", () => {
    const dictionaries = localeCodes.map(getDictionary);
    const beliefs = dictionaries.map((d) => d.beliefs.items.length);
    const approach = dictionaries.map((d) => d.approach.items.length);
    expect(new Set(beliefs).size).toBe(1);
    expect(new Set(approach).size).toBe(1);
  });

  it("have a distinct title and description per locale", () => {
    const titles = localeCodes.map((code) => getDictionary(code).meta.title);
    const descriptions = localeCodes.map(
      (code) => getDictionary(code).meta.description,
    );
    expect(new Set(titles).size).toBe(localeCodes.length);
    expect(new Set(descriptions).size).toBe(localeCodes.length);
  });
});

describe("negotiateLocale", () => {
  it("falls back to the default without a header", () => {
    expect(negotiateLocale(null)).toBe(defaultLocale);
  });

  it("matches the primary language subtag", () => {
    expect(negotiateLocale("ko-KR,ko;q=0.9,en;q=0.8")).toBe("ko");
  });

  it("prefers the higher quality value", () => {
    expect(negotiateLocale("ko;q=0.4,en;q=0.9")).toBe("en");
    expect(negotiateLocale("en;q=0.2,ko;q=0.8")).toBe("ko");
  });

  it("ignores unsupported languages and q=0", () => {
    expect(negotiateLocale("fr-FR,de;q=0.8")).toBe(defaultLocale);
    expect(negotiateLocale("ko;q=0,fr")).toBe(defaultLocale);
  });

  it("tolerates a malformed quality value", () => {
    expect(negotiateLocale("ko;q=abc,en")).toBe("en");
  });
});
