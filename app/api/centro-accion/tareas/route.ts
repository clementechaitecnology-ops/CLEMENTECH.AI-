import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("tareas")
    .select("*")
    .order("fecha_hora", { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ tareas: data });
}

export async function POST(request: Request) {
  const body = await request.json();

  const { data, error } = await supabaseAdmin
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

  const { error } = await supabaseAdmin
    .from("tareas")
    .update({ estado: body.estado })
    .eq("id", body.id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  if (body.estado === "Hecho") {
    const hoy = new Date().toISOString().split("T")[0];
    const { data: existente } = await supabaseAdmin
      .from("racha")
      .select("*")
      .eq("fecha", hoy)
      .single();

    if (existente) {
      await supabaseAdmin
        .from("racha")
        .update({ tareas_completadas: existente.tareas_completadas + 1 })
        .eq("fecha", hoy);
    } else {
      await supabaseAdmin.from("racha").insert({ fecha: hoy, tareas_completadas: 1 });
    }
  }

  return NextResponse.json({ success: true });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  const { error } = await supabaseAdmin.from("tareas").delete().eq("id", id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
