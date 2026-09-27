import { NextResponse } from "next/server";
import { getSupabase } from "@/app/lib/supabase-client";

function generateId(): string {
  return Math.random().toString(36).substring(2, 10);
}

export async function POST(request: Request) {
  try {
    const supabase = getSupabase();
    const body = await request.json();
    const { answers, matches } = body;
    const id = generateId();

    // Save results for shareable link
    const { error: insertError } = await supabase
      .from("results")
      .insert({ id, answers, matches });

    if (insertError) throw insertError;

    // Increment quiz completions counter
    const { data, error: readError } = await supabase
      .from("counter")
      .select("count")
      .eq("id", "quiz_completions")
      .single();

    if (readError) console.error("Quiz counter read error:", readError);

    const newCount = (data?.count || 0) + 1;

    const { data: updated, error: updateError } = await supabase
      .from("counter")
      .update({ count: newCount })
      .eq("id", "quiz_completions")
      .select();

    if (updateError || !updated?.length) {
      console.error("Quiz counter update failed:", updateError ?? "no rows updated");
    }

    return NextResponse.json({ id });
  } catch (error) {
    console.error("Save results error:", error);
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}