import {
  GoogleGenAI,
  createUserContent,
  createPartFromUri,
  GenerateContentResponse,
} from "@google/genai";

import { z } from "zod";
import { InvoiceSchema } from "../validations/invoiceValidation";

const prompt = `
  Kamu adalah ahli ekstraksi data invoice. 
  Ekstrak data dari dokumen ini ke dalam format JSON yang valid:
  {
    "id": string (ambil dari nomor invoice/faktur),
    "storeName": string,
    "date": string (ISO format),
    "total": number,
    "paymentMethod": string,
    "items": [
      {"name": string, "quantity": number, "price": number, "total": number}
    ]
  }
  PENTING: Jika nomor invoice tidak ditemukan, buatkan ID unik singkat berdasarkan nama toko dan tanggal.
  Balas hanya dengan format JSON-nya saja tanpa penjelasan apa pun 😊.
`;


export const scanInvoiceWithGemini = async (imgUrl: string, mimeType: string) =>  {
  const ai = new GoogleGenAI({});

  const response: GenerateContentResponse = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [
      createUserContent([
        prompt,
        createPartFromUri(imgUrl, mimeType),
      ]),
    ],
    config: {
      responseMimeType: "application/json",
    },
  });

  console.log('responseAI: ', response)

  return JSON.parse(response.text ?? '');
};