import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const messages = Array.isArray(body.messages) ? body.messages : [];
  const ultimaPregunta = messages.at(-1)?.texto ?? "";
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ answer: `Puedo ayudarte a planificarlo. Para "${ultimaPregunta}", empieza definiendo el objetivo, los datos que entran, la acción automática y la métrica de éxito. Cuando configures OPENAI_API_KEY, este chat podrá usar un modelo conectado.` });
  }

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ model: "gpt-4o-mini", messages: messages.map((message: { rol: string; texto: string }) => ({ role: message.rol, content: message.texto })), temperature: 0.7 }),
  });
  if (!response.ok) return NextResponse.json({ answer: "El proveedor de IA no está disponible ahora." }, { status: 502 });
  const data = await response.json();
  return NextResponse.json({ answer: data.choices?.[0]?.message?.content ?? "No recibí una respuesta del modelo." });
}