import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export async function GET() {
  const { data, error } = await getSupabaseAdmin()
    .from("devoluciones")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ devoluciones: data });
}

export async function POST(request: Request) {
  const body = await request.json();

  const { data, error } = await getSupabaseAdmin()
    .from("devoluciones")
    .insert({
      pedido_codigo: body.pedido_codigo,
      cliente_nombre: body.cliente_nombre,
      motivo: body.motivo,
      estado: "En revision",
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ devolucion: data });
}