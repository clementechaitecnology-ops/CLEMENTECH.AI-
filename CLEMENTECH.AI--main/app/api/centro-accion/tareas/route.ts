import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export async function GET() {
  const { data, error } = await getSupabaseAdmin()
    .from("tareas")
    .select("*")
    .order("fecha_hora", { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ tareas: data });
}

export async function POST(request: Request) {
  const body = await request.json();

  const { data, error } = await getSupabaseAdmin()
    .from("tareas")
    .insert({
      titulo: body.titulo,
      descripcion: body.descripcion || null,
      fecha_hora: body.fecha_hora || null,
      prioridad: body.prioridad || "Media",
      con_alarma: body.con_alarma || false,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ tarea: data });
}

export async function PATCH(request: Request) {
  const body = await request.json();

  const { error } = await getSupabaseAdmin()
    .from("tareas")
    .update({ estado: body.estado })
    .eq("id", body.id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  if (body.estado === "Hecho") {
    const hoy = new Date().toISOString().split("T")[0];
    const { data: existente } = await getSupabaseAdmin()
      .from("racha")
      .select("*")
      .eq("fecha", hoy)
      .single();

    if (existente) {
      await getSupabaseAdmin()
        .from("racha")
        .update({ tareas_completadas: existente.tareas_completadas + 1 })
        .eq("fecha", hoy);
    } else {
      await getSupabaseAdmin().from("racha").insert({ fecha: hoy, tareas_completadas: 1 });
    }
  }

  return NextResponse.json({ success: true });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Se requiere el id de la tarea." }, { status: 400 });
  }

  const { error } = await getSupabaseAdmin().from("tareas").delete().eq("id", id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
