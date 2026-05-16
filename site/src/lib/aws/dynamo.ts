import "server-only";

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import type { LeadRecord } from "@/lib/leads/schema";

let docClient: DynamoDBDocumentClient | null = null;

const DEFAULT_AWS_REGION = "us-east-1";
const DEFAULT_LEADS_TABLE = "OmniLendLeads";

function getDocClient() {
  if (!docClient) {
    const client = new DynamoDBClient({
      region: process.env.AWS_REGION ?? DEFAULT_AWS_REGION
    });

    docClient = DynamoDBDocumentClient.from(client);
  }

  return docClient;
}

export async function saveLead(lead: Record<string, unknown>) {
  const tableName = process.env.OMNILEND_LEADS_TABLE ?? DEFAULT_LEADS_TABLE;

  await getDocClient().send(
    new PutCommand({
      TableName: tableName,
      Item: lead,
      ConditionExpression: "attribute_not_exists(leadId)"
    })
  );
}

function getOptionalString(item: Record<string, unknown>, key: string) {
  const value = item[key];

  return typeof value === "string" ? value : undefined;
}

function normalizeLeadRecord(item: Record<string, unknown>): LeadRecord | null {
  const leadId = getOptionalString(item, "leadId");
  const division = getOptionalString(item, "division");
  const name = getOptionalString(item, "name");
  const email = getOptionalString(item, "email");
  const message = getOptionalString(item, "message");
  const createdAt = getOptionalString(item, "createdAt");

  if (
    !leadId ||
    !name ||
    !email ||
    !message ||
    !createdAt ||
    (division !== "interiors" && division !== "asset-fortification" && division !== "finance")
  ) {
    return null;
  }

  return {
    leadId,
    division,
    name,
    email,
    phone: getOptionalString(item, "phone") ?? "",
    budget: getOptionalString(item, "budget") ?? "",
    serviceInterest: getOptionalString(item, "serviceInterest") ?? "",
    message,
    sourcePath: getOptionalString(item, "sourcePath") ?? "",
    status: "new",
    createdAt,
    ipHash: getOptionalString(item, "ipHash"),
    userAgent: getOptionalString(item, "userAgent")
  };
}

export async function listLeads(limit = 100) {
  const tableName = process.env.OMNILEND_LEADS_TABLE ?? DEFAULT_LEADS_TABLE;

  const leads: LeadRecord[] = [];
  let exclusiveStartKey: Record<string, unknown> | undefined;

  do {
    const response = await getDocClient().send(
      new ScanCommand({
        TableName: tableName,
        Limit: Math.min(limit, 100),
        ExclusiveStartKey: exclusiveStartKey,
        FilterExpression: "attribute_exists(#division) AND attribute_exists(#createdAt)",
        ExpressionAttributeNames: {
          "#division": "division",
          "#createdAt": "createdAt"
        }
      })
    );

    for (const item of response.Items ?? []) {
      const lead = normalizeLeadRecord(item);

      if (lead) {
        leads.push(lead);
      }
    }

    exclusiveStartKey = response.LastEvaluatedKey as Record<string, unknown> | undefined;
  } while (exclusiveStartKey && leads.length < limit);

  return leads
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, limit);
}
