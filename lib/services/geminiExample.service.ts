import { GoogleGenAI } from "@google/genai";

export const testGeminiConnection = async () => {
  const ai = new GoogleGenAI({});
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: "Apakah kamu bisa scan invoice dan extract data dari sana?",
  });
  console.log(response.text);

  return response;
};