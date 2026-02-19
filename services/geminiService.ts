
import { GoogleGenAI, Type } from "@google/genai";
import { NewsItem, Newspaper } from "../types";

const API_KEY = process.env.API_KEY || "";

export const fetchNewsFromArgentina = async (): Promise<{ news: NewsItem[], sources: any[] }> => {
  if (!API_KEY) {
    throw new Error("API Key is missing. Please ensure it's configured.");
  }

  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  const prompt = `
    Actúa como un curador de noticias experto en Argentina. 
    Usa Google Search para encontrar las 3 noticias más importantes de HOY (o de las últimas 24 horas) de cada uno de los siguientes diarios: 
    Clarín, La Nación, Infobae, Página/12 y Ámbito Financiero.
    
    Para cada noticia, extrae:
    - Título impactante.
    - Un resumen conciso de 2 frases.
    - La URL directa del artículo.
    - El nombre del diario.
    - Una categoría (Política, Economía, Sociedad, Deportes, Espectáculos).
    
    Asegúrate de que la información sea verídica y actual.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            news: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  title: { type: Type.STRING },
                  summary: { type: Type.STRING },
                  url: { type: Type.STRING },
                  source: { type: Type.STRING },
                  category: { type: Type.STRING },
                  publishedAt: { type: Type.STRING },
                },
                required: ["id", "title", "summary", "url", "source", "category"],
              },
            },
          },
        },
      },
    });

    const text = response.text;
    const jsonResult = JSON.parse(text);
    const groundingSources = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

    return {
      news: jsonResult.news,
      sources: groundingSources
    };
  } catch (error) {
    console.error("Error fetching news via Gemini:", error);
    throw error;
  }
};
