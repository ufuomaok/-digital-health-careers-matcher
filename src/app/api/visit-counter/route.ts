import { NextResponse } from "next/server";
import { getSupabase } from "@/app/lib/supabase-client";

export async function GET() {
  try {
    const supabase = getSupabase();
    const { data, error: readError } = await supabase
      .from("counter")
      .select("count")
      .eq("id", "page_visits")
      .single();

    if (readError) throw readError;

    const newCount = (data?.count || 0) + 1;

    const { data: updated, error: updateError } = await supabase
      .from("counter")
      .update({ count: newCount })
      .eq("id", "page_visits")
      .select();

    if (updateError) throw updateError;
    if (!updated?.length) throw new Error("Visit counter update affected no rows");

    return NextResponse.json({ count: newCount });
  } catch (error) {
    console.error("Visit counter error:", error);
    return NextResponse.json({ count: 0 });
  }
}