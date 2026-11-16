import { NextResponse, type NextRequest } from "next/server";
import { localePath, negotiateLocale } from "@/features/i18n";

export function proxy(request: NextRequest) {
  const locale = negotiateLocale(request.headers.get("accept-language"));
  const response = NextResponse.redirect(
    new URL(localePath(locale), request.url),
  );
  // The target depends on the request header, so caches must key on it.
  response.headers.set("Vary", "Accept-Language");
  return response;
}

export const config = {
  matcher: ["/"],
};
