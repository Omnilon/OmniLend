import "server-only";

import fs from "fs/promises";
import path from "path";

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
  const bytes = await fs.readFile(localPath);

  return {
    filename: document.filename,
    bytes
  };
}
