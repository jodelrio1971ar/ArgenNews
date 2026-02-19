
export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  url: string;
  source: string;
  category: string;
  publishedAt: string;
  imageUrl?: string;
}

export enum Newspaper {
  CLARIN = 'Clarín',
  LANACION = 'La Nación',
  INFOBAE = 'Infobae',
  PAGINA12 = 'Página/12',
  AMBITO = 'Ámbito Financiero'
}

export interface GroundingChunk {
  web?: {
    uri: string;
    title: string;
  };
}
