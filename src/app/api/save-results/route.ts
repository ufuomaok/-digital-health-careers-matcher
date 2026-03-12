import { NextRequest, NextResponse } from "next/server";
import { TableClient, AzureNamedKeyCredential } from "@azure/data-tables";

const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING!;

function generateId(): string {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let id = "";
  for (let i = 0; i < 8; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }
  return id;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Save result to Azure Table Storage
    const resultsClient = TableClient.fromConnectionString(
      connectionString,
      "results"
    );

    await resultsClient.createTable();

    const id = generateId();
    await resultsClient.createEntity({
      partitionKey: "result",
      rowKey: id,
      answers: JSON.stringify(body.answers),
      matches: JSON.stringify(body.matches),
      createdAt: new Date().toISOString(),
    });

    // Increment visit counter
    const counterClient = TableClient.fromConnectionString(
      connectionString,
      "counter"
    );

    await counterClient.createTable();

    let currentCount = 0;
    try {
      const entity = await counterClient.getEntity("counter", "total");
      currentCount = Number(entity.count) || 0;
    } catch {
      // Entity doesn't exist yet — start from 0
    }

    try {
      await counterClient.updateEntity(
        {
          partitionKey: "counter",
          rowKey: "total",
          count: currentCount + 1,
        },
        "Replace"
      );
    } catch {
      await counterClient.createEntity({
        partitionKey: "counter",
        rowKey: "total",
        count: 1,
      });
    }

    return NextResponse.json({ id });
  } catch (error) {
    console.error("Save results error:", error);
    return NextResponse.json({ error: "Failed to save results" }, { status: 500 });
  }
}
