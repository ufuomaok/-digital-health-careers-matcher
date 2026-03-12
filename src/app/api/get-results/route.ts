import { NextRequest, NextResponse } from "next/server";
import { TableClient } from "@azure/data-tables";

const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING!;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "No ID provided" }, { status: 400 });
  }

  try {
    const client = TableClient.fromConnectionString(connectionString, "results");
    const entity = await client.getEntity("result", id);

    return NextResponse.json({
      answers: JSON.parse(entity.answers as string),
      matches: JSON.parse(entity.matches as string),
    });
  } catch {
    return NextResponse.json({ error: "Results not found" }, { status: 404 });
  }
}
