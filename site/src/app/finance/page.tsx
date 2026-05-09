import type { Metadata } from "next";
import { DivisionShell } from "@/components/brand/DivisionShell";
import { divisions } from "@/content/divisions";

const division = divisions.finance;

export const metadata: Metadata = {
  title: division.metaTitle,
  description: division.metaDescription
};

export default function FinancePage() {
  return <DivisionShell division={division} />;
}
