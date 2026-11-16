import { GeistMono } from "geist/font/mono";
import { notFound } from "next/navigation";
import { isLocale, localeCodes } from "@/features/i18n";
// Pretendard's dynamic-subset build binds each file to a unicode-range, which
// next/font/local cannot express, so the package stylesheet is imported and
// the bundler self-hosts the files it names.
import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";
import "@/styles/globals.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return localeCodes.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <html
      lang={locale}
      className={`${GeistMono.variable} scroll-smooth antialiased motion-reduce:scroll-auto`}
    >
      <body className="flex min-h-screen flex-col">{children}</body>
    </html>
  );
}
