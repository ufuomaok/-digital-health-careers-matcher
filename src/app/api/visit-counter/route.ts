import { NextResponse } from "next/server";
import { TableClient } from "@azure/data-tables";

const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING!;

export async function GET() {
  try {
    const client = TableClient.fromConnectionString(connectionString, "visitcounter");
    await client.createTable();

    let currentCount = 0;
    try {
      const entity = await client.getEntity("counter", "visits");
      currentCount = Number(entity.count) || 0;
    } catch {
      // Entity doesn't exist yet
    }

    const newCount = currentCount + 1;

    try {
      await client.updateEntity(
        { partitionKey: "counter", rowKey: "visits", count: newCount },
        "Replace"
      );
    } catch {
      await client.createEntity(
        { partitionKey: "counter", rowKey: "visits", count: newCount }
      );
    }

    return NextResponse.json({ count: newCount });
  } catch (error) {
    console.error("Visit counter error:", error);
    return NextResponse.json({ count: 0 });
  }
}