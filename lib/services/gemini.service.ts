import {
  GoogleGenAI,
  createUserContent,
  createPartFromUri,
  GenerateContentResponse,
} from "@google/genai";

const prompt = `
  Kamu adalah ahli ekstraksi data invoice. 
  Tugas pertama: Analisis apakah gambar ini adalah invoice, faktur, atau struk belanja.
  
  Kriteria Invoice: Ada nama toko, daftar barang/jasa, dan total harga.

  Jika gambar BUKAN invoice (misal: foto orang, pemandangan, dokumen lain):
  Keluarkan JSON: { "isInvoice": false }
  Jika gambar ADALAH invoice, keluarkan JSON:
  
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