import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function GET() {
  const { data, error } = await supabaseAdmin.from("automatizaciones").select("*");
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ automatizaciones: data });
}

export async function PATCH(request: Request) {
  const body = await request.json();

  const { error } = await supabaseAdmin
    .from("automatizaciones")
    .update({ activa: body.activa })
    .eq("id", body.id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}