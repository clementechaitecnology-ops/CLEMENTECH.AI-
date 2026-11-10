import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  if (!url || !url.includes("gutenberg.org")) {
    return NextResponse.json({ error: "URL invalida" }, { status: 400 });
  }

  try {
    const res = await fetch(url);
    if (!res.ok) {
      return NextResponse.json({ error: "No se pudo descargar el libro" }, { status: 502 });
    }
    const texto = await res.text();
    return NextResponse.json({ texto: texto.slice(0, 300000) });
  } catch {
    return NextResponse.json({ error: "Error de conexion" }, { status: 500 });
  }
}