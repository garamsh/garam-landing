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
  };
  hero: {
    eyebrow: string;
    title: string;
    lead: string;
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
  closing: {
    title: string;
  };
  footer: {
    tradeNameLabel: string;
    representativeLabel: string;
    registrationNumberLabel: string;
    githubLabel: string;
  };
}
