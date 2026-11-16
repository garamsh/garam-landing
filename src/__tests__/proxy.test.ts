import { NextRequest } from "next/server";
import { describe, expect, it } from "vitest";
import { config, proxy } from "../proxy";

function get(acceptLanguage?: string) {
  const headers = new Headers();
  if (acceptLanguage) headers.set("accept-language", acceptLanguage);
  return proxy(new NextRequest("https://garam.sh/", { headers }));
}

describe("proxy", () => {
  it("redirects a Korean browser to /ko", () => {
    const response = get("ko-KR,ko;q=0.9,en;q=0.8");
    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe("https://garam.sh/ko");
  });

  it("redirects an English browser to /en", () => {
    expect(get("en-US").headers.get("location")).toBe("https://garam.sh/en");
  });

  it("falls back to /en for an unsupported language or no header", () => {
    expect(get("fr-FR").headers.get("location")).toBe("https://garam.sh/en");
    expect(get().headers.get("location")).toBe("https://garam.sh/en");
  });

  it("varies on Accept-Language", () => {
    expect(get("ko").headers.get("vary")).toBe("Accept-Language");
  });

  it("matches only the root path", () => {
    expect(config.matcher).toEqual(["/"]);
  });
});
