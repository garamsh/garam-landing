import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/features/i18n";
import { LandingPage } from "@/features/landing";
import {
  JsonLd,
  buildLocaleMetadata,
  organizationJsonLd,
} from "@/features/seo";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return buildLocaleMetadata(locale);
}

export default async function Page({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <LandingPage locale={locale} />
    </>
  );
}
