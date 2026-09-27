import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/app/lib/supabase-client";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "No ID provided" }, { status: 400 });
  }

  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("results")
      .select("answers, matches")
      .eq("id", id)
      .single();

    if (error || !data) throw error;

    return NextResponse.json({
      answers: data.answers,
      matches: data.matches,
    });
  } catch {
    return NextResponse.json({ error: "Results not found" }, { status: 404 });
  }
}
