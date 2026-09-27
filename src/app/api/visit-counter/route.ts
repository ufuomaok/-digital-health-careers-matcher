import { NextResponse } from "next/server";
import { getSupabase } from "@/app/lib/supabase-client";

export async function GET() {
  try {
    const supabase = getSupabase();
    const { data } = await supabase
      .from("counter")
      .select("count")
      .eq("id", "page_visits")
      .single();

    const newCount = (data?.count || 0) + 1;

    await supabase
      .from("counter")
      .update({ count: newCount })
      .eq("id", "page_visits");

    return NextResponse.json({ count: newCount });
  } catch (error) {
    console.error("Visit counter error:", error);
    return NextResponse.json({ count: 0 });
  }
}