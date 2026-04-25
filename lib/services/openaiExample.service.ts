import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const aiServiceExample = async (data?: string) => {

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: 'developer', content: 'Talk like a pirate.' },
      { role: 'user', content: 'Are semicolons optional in JavaScript?' },
    ],
    response_format: { type: "json_object" }, // Memastikan output selalu JSON
  });

  return JSON.parse(response.choices[0].message.content || "{}");
};