import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("racha")
    .select("*")
    .order("fecha", { ascending: false })
    .limit(60);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  let dias = 0;
  const fechas = (data || []).map((r) => r.fecha);
  let cursor = new Date();

  for (let i = 0; i < 60; i++) {
    const fechaStr = cursor.toISOString().split("T")[0];
    if (fechas.includes(fechaStr)) {
      dias++;
      cursor.setDate(cursor.getDate() - 1);
    } else {
      break;
    }
  }

  return NextResponse.json({ racha: dias, historial: data });
}