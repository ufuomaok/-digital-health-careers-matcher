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

    return NextResponse.json({ count: data?.count || 0 });
  } catch (error) {
    console.error("Get visits error:", error);
    return NextResponse.json({ count: 0 });
  }
}
