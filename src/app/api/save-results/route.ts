import { NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabase-client";

function generateId(): string {
  return Math.random().toString(36).substring(2, 10);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { answers, matches } = body;
    const id = generateId();

    // Save results for shareable link
    await supabase
      .from("results")
      .insert({ id, answers, matches });

    // Increment quiz completions counter
    const { data } = await supabase
      .from("counter")
      .select("count")
      .eq("id", "quiz_completions")
      .single();

    const newCount = (data?.count || 0) + 1;

    await supabase
      .from("counter")
      .update({ count: newCount })
      .eq("id", "quiz_completions");

    return NextResponse.json({ id });
  } catch (error) {
    console.error("Save results error:", error);
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}