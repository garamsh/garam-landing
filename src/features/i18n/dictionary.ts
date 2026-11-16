export interface DictionaryItem {
  title: string;
  body: string;
}

export interface Dictionary {
  meta: {
    title: string;
    description: string;
  };
  a11y: {
    skipToContent: string;
    languageSwitcher: string;
    homeLink: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    lead: string;
    primaryCta: string;
    secondaryCta: string;
  };
  beliefs: {
    title: string;
    items: readonly DictionaryItem[];
  };
  approach: {
    title: string;
    intro: string;
    items: readonly DictionaryItem[];
  };
  nameNote: {
    title: string;
    body: string;
  };
  follow: {
    title: string;
    body: string;
    cta: string;
  };
  footer: {
    tradeNameLabel: string;
    representativeLabel: string;
    registrationNumberLabel: string;
  };
}
