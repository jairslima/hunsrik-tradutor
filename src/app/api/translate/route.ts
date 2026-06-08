import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { lookupRelevant } from "@/lib/dictionary";
import { SYSTEM_PROMPT, buildUserPrompt } from "@/lib/hunsrik-prompt";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

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

    const message = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 2048,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: userPrompt }],
    });

    const translation =
      message.content[0].type === "text" ? message.content[0].text : "";

    return NextResponse.json({ translation, dictContext });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Erro ao traduzir. Verifique a chave de API." },
      { status: 500 }
    );
  }
}
