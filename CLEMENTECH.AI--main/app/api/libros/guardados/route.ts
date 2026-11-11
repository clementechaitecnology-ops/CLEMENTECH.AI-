import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export async function GET() {
  const { data, error } = await getSupabaseAdmin()
    .from("libros_guardados")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ libros: data });
}

export async function POST(request: Request) {
  const body = await request.json();

  const { data, error } = await getSupabaseAdmin()
    .from("libros_guardados")
    .insert({
      titulo: body.titulo,
      autor: body.autor,
      portada_url: body.portada_url,
      open_library_key: body.key,
      estado: "Por leer",
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ libro: data });
}

export async function PATCH(request: Request) {
  const body = await request.json();

  const { error } = await getSupabaseAdmin()
    .from("libros_guardados")
    .update({ estado: body.estado })
    .eq("id", body.id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Se requiere el id del libro." }, { status: 400 });
  }

  const { error } = await getSupabaseAdmin().from("libros_guardados").delete().eq("id", id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}