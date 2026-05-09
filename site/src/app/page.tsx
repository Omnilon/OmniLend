import type { Metadata } from "next";
import { DivisionGateway } from "@/components/brand/DivisionGateway";
import { divisionList } from "@/content/divisions";

export const metadata: Metadata = {
  title: "OmniLend.pro — Design, Asset Fortification, and Finance",
  description: "Enter OmniLend’s three divisions: Interiors, Asset Fortification, and Finance."
};

export default function HomePage() {
  return <DivisionGateway divisions={divisionList} />;
}
