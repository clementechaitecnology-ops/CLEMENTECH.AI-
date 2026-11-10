import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  const respuesta = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY!,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-5",
      max_tokens: 500,
      system: "Eres un asistente experto en productividad y gestion del tiempo. Responde en espanol, de forma breve, practica y motivadora. Basate en el contexto de tareas del usuario si te lo dan.",
      messages: [{ role: "user", content: body.pregunta }],
    }),
  });

  const data = await respuesta.json();
  const texto = data.content?.[0]?.text || "No pude generar una respuesta, intenta de nuevo.";

  return NextResponse.json({ respuesta: texto });
}