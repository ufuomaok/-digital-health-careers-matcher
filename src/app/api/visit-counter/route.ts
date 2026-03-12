import { NextResponse } from "next/server";
import { TableClient } from "@azure/data-tables";

const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING!;

export async function GET() {
  try {
    const client = TableClient.fromConnectionString(connectionString, "counter");
    const entity = await client.getEntity("counter", "total");
    return NextResponse.json({ count: Number(entity.count) || 0 });
  } catch {
    return NextResponse.json({ count: 0 });
  }
}
