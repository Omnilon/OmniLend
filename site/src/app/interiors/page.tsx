import type { Metadata } from "next";
import { DivisionShell } from "@/components/brand/DivisionShell";
import { divisions } from "@/content/divisions";

const division = divisions.interiors;

export const metadata: Metadata = {
  title: division.metaTitle,
  description: division.metaDescription
};

export default function InteriorsPage() {
  return <DivisionShell division={division} />;
}
