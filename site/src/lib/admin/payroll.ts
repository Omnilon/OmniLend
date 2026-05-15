import "server-only";

import fs from "fs/promises";
import path from "path";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";

export type PayrollStatement = {
  id: string;
  title: string;
  period: string;
  payDate: string;
  source: string;
  page: number;
  documentId: string;
};

export const payrollStatements: PayrollStatement[] = [
  {
    id: "march-2026-ach",
    title: "March 2026 ACH earnings statement",
    period: "March 2026",
    payDate: "March 2026",
    source: "ACH payroll packet",
    page: 1,
    documentId: "earnings-ach-mar-may-2026"
  },
  {
    id: "april-2026-ach",
    title: "April 2026 ACH earnings statement",
    period: "April 2026",
    payDate: "April 2026",
    source: "ACH payroll packet",
    page: 3,
    documentId: "earnings-ach-mar-may-2026"
  },
  {
    id: "may-2026-ach",
    title: "May 2026 ACH earnings statement",
    period: "May 2026",
    payDate: "May 2026",
    source: "ACH payroll packet",
    page: 5,
    documentId: "earnings-ach-mar-may-2026"
  }
];

const payrollDocuments = {
  "earnings-ach-mar-may-2026": {
    filename: "OMNILON_Earnings_Statements_ACH_Mar_May_2026.pdf",
    envUrl: "OMNILEND_PAYROLL_MAR_MAY_2026_URL"
  }
};

export type PayrollDocumentId = keyof typeof payrollDocuments;

const client = new DynamoDBClient({
  region: process.env.AWS_REGION
});

const docClient = DynamoDBDocumentClient.from(client);

function getPayrollTableName() {
  return process.env.OMNILEND_PAYROLL_TABLE ?? process.env.OMNILEND_LEADS_TABLE;
}

function getDocumentKey(documentId: string) {
  return `payroll-document#${documentId}`;
}

export function getPayrollDocumentUrl(statement: PayrollStatement) {
  return `/api/admin/payroll/${statement.documentId}#page=${statement.page}&view=FitH`;
}

export async function readPayrollDocument(documentId: string) {
  const document = payrollDocuments[documentId as PayrollDocumentId];

  if (!document) {
    return null;
  }

  const remoteUrl = process.env[document.envUrl];

  if (remoteUrl) {
    const response = await fetch(remoteUrl, { cache: "no-store" });

    if (!response.ok) {
      throw new Error(`Unable to read payroll document from ${document.envUrl}`);
    }

    return {
      filename: document.filename,
      bytes: Buffer.from(await response.arrayBuffer())
    };
  }

  const localPath = path.join(process.cwd(), "private", "payroll", document.filename);
  try {
    const bytes = await fs.readFile(localPath);

    return {
      filename: document.filename,
      bytes
    };
  } catch (error) {
    const code = (error as NodeJS.ErrnoException).code;

    if (code !== "ENOENT") {
      throw error;
    }
  }

  const storedDocument = await readPayrollDocumentFromStore(documentId);

  if (storedDocument) {
    return storedDocument;
  }

  throw new Error("Payroll document is not configured");
}

export async function readPayrollDocumentFromStore(documentId: string) {
  const tableName = getPayrollTableName();

  if (!tableName) {
    return null;
  }

  const response = await docClient.send(
    new GetCommand({
      TableName: tableName,
      Key: {
        leadId: getDocumentKey(documentId)
      }
    })
  );

  const item = response.Item;

  if (!item || typeof item.bytesBase64 !== "string" || typeof item.filename !== "string") {
    return null;
  }

  return {
    filename: item.filename,
    bytes: Buffer.from(item.bytesBase64, "base64")
  };
}

export async function savePayrollDocumentToStore({
  documentId,
  filename,
  bytes
}: {
  documentId: string;
  filename: string;
  bytes: Buffer;
}) {
  const tableName = getPayrollTableName();

  if (!tableName) {
    throw new Error("Missing OMNILEND_PAYROLL_TABLE or OMNILEND_LEADS_TABLE");
  }

  await docClient.send(
    new PutCommand({
      TableName: tableName,
      Item: {
        leadId: getDocumentKey(documentId),
        kind: "payrollDocument",
        documentId,
        filename,
        contentType: "application/pdf",
        bytesBase64: bytes.toString("base64"),
        updatedAt: new Date().toISOString()
      }
    })
  );
}
