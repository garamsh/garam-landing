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
    sections: string;
  };
  nav: {
    mission: string;
    approach: string;
    company: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    lead: string;
    cta: string;
  };
  mission: {
    eyebrow: string;
    title: string;
    items: readonly DictionaryItem[];
  };
  approach: {
    eyebrow: string;
    title: string;
    intro: string;
    items: readonly DictionaryItem[];
  };
  company: {
    eyebrow: string;
    title: string;
    body: string;
  };
  footer: {
    tradeNameLabel: string;
    representativeLabel: string;
    registrationNumberLabel: string;
    githubLabel: string;
  };
}
