export type LegalSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

export type LegalDocumentContent = {
  title: string;
  lastUpdated: string;
  intro: string[];
  sections: LegalSection[];
};
