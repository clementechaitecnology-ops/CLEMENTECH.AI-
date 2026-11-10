import { NextResponse } from "next/server";

const TEMAS_EXITO = [
  "science of getting rich",
  "as a man thinketh",
  "acres of diamonds",
  "self reliance",
  "art of money getting",
  "pushing to the front",
  "how to get what you want",
];

function extraerUrlTexto(formats: Record<string, string>) {
  const clave = Object.keys(formats).find((k) => k.startsWith("text/plain"));
  return clave ? formats[clave] : null;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const qPersonalizado = searchParams.get("q");

  const consultas = qPersonalizado ? [qPersonalizado] : TEMAS_EXITO;

  const resultados = await Promise.all(
    consultas.map(async (termino) => {
      try {
        const res = await fetch(`https://gutendex.com/books?search=${encodeURIComponent(termino)}`);
        const data = await res.json();
        return data.results || [];
      } catch {
        return [];
      }
    })
  );

  const todos = resultados.flat();
  const vistos = new Set<number>();
  const libros = [];

  for (const libro of todos) {
    if (vistos.has(libro.id)) continue;
    const texto_url = extraerUrlTexto(libro.formats || {});
    if (!texto_url) continue;
    vistos.add(libro.id);
    libros.push({
      id: libro.id,
      titulo: libro.title,
      autor: libro.authors?.[0]?.name || "Autor desconocido",
      portada_url: libro.formats?.["image/jpeg"] || null,
      texto_url,
    });
  }

  return NextResponse.json({ libros: libros.slice(0, 24) });
}