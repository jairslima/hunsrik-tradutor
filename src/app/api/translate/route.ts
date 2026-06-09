import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { lookupRelevant } from "@/lib/dictionary";
import { SYSTEM_PROMPT, buildUserPrompt } from "@/lib/hunsrik-prompt";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { text, direction } = await req.json();

    if (!text?.trim()) {
      return NextResponse.json({ error: "Texto vazio." }, { status: 400 });
    }

    if (text.length > 4000) {
      return NextResponse.json(
        { error: "Texto muito longo. Máximo: 4.000 caracteres." },
        { status: 400 }
      );
    }

    const dictContext =
      direction === "pt-hrx" ? lookupRelevant(text) : "";

    const userPrompt =
      direction === "pt-hrx"
        ? buildUserPrompt(text, dictContext)
        : `Traduza o seguinte texto em Hunsrik Plat Taytx para português brasileiro:\n\n${text}`;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: SYSTEM_PROMPT,
    });

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: userPrompt }] }],
      generationConfig: { maxOutputTokens: 2048, temperature: 0.3 },
    });

    const translation = result.response.text();

    return NextResponse.json({ translation, dictContext });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Erro ao traduzir. Verifique a chave de API." },
      { status: 500 }
    );
  }
}
