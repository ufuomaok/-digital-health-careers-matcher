import { NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabase-client";

export async function GET() {
  try {
    const { data } = await supabase
      .from("counter")
      .select("count")
      .eq("id", "quiz_completions")
      .single();

    return NextResponse.json({ count: data?.count || 0 });
  } catch (error) {
    console.error("Get counter error:", error);
    return NextResponse.json({ count: 0 });
  }
}