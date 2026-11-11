import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export async function GET() {
  const { data, error } = await getSupabaseAdmin()
    .from("pedidos")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ pedidos: data });
}

export async function POST(request: Request) {
  const body = await request.json();

  const { data, error } = await getSupabaseAdmin()
    .from("pedidos")
    .insert({
      cliente_nombre: body.cliente_nombre,
      producto_nombre: body.producto_nombre,
      transportadora: body.transportadora || "Por asignar",
      estado: "Pendiente",
      cantidad: 1,
      precio_unitario: body.precio_unitario || 0,
      total: body.precio_unitario || 0,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ pedido: data });
}

export async function PATCH(request: Request) {
  const body = await request.json();
  if (typeof body.id !== "string" || typeof body.estado !== "string") {
    return NextResponse.json(
      { error: "Se requieren el id del pedido y su estado." },
      { status: 400 },
    );
  }

  const { error } = await getSupabaseAdmin()
    .from("pedidos")
    .update({ estado: body.estado })
    .eq("id", body.id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}