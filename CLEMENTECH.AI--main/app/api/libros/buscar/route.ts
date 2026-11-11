import { NextResponse } from "next/server";

type LibroOpenLibrary = {
  key: string;
  title: string;
  author_name?: string[];
  cover_i?: number;
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const consulta = searchParams.get("q")?.trim();

  if (!consulta) {
    return NextResponse.json({ libros: [] });
  }

  const url = new URL("https://openlibrary.org/search.json");
  url.searchParams.set("q", consulta);
  url.searchParams.set("limit", "24");
  url.searchParams.set("fields", "key,title,author_name,cover_i");

  const respuesta = await fetch(url, { next: { revalidate: 3600 } });
  if (!respuesta.ok) {
    return NextResponse.json(
      { error: "No se pudieron consultar los libros." },
      { status: 502 },
    );
  }

  const datos: { docs?: LibroOpenLibrary[] } = await respuesta.json();
  const libros = (datos.docs || [])
    .filter((libro) => libro.key && libro.title)
    .map((libro) => ({
      key: libro.key,
      titulo: libro.title,
      autor: libro.author_name?.[0] || "Autor desconocido",
      portada_url: libro.cover_i
        ? `https://covers.openlibrary.org/b/id/${libro.cover_i}-M.jpg`
        : null,
    }));

  return NextResponse.json({ libros });
}
