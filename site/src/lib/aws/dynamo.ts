import "server-only";

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

let docClient: DynamoDBDocumentClient | null = null;

function getDocClient() {
  if (!docClient) {
    const client = new DynamoDBClient({
      region: process.env.AWS_REGION
    });

    docClient = DynamoDBDocumentClient.from(client);
  }

  return docClient;
}

export async function saveLead(lead: Record<string, unknown>) {
  const tableName = process.env.OMNILEND_LEADS_TABLE;

  if (!tableName) {
    throw new Error("Missing OMNILEND_LEADS_TABLE");
  }

  await getDocClient().send(
    new PutCommand({
      TableName: tableName,
      Item: lead,
      ConditionExpression: "attribute_not_exists(leadId)"
    })
  );
}
