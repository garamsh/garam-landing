import { notFound } from "next/navigation";
import { isLocale, localeCodes } from "@/features/i18n";
import { displayFont, textFont } from "@/lib/fonts";
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
      className={`${displayFont.variable} ${textFont.variable} scroll-smooth motion-reduce:scroll-auto`}
    >
      <body>{children}</body>
    </html>
  );
}
