import SectionsRenderer from "@/components/SectionsRenderer";
import { loadPage } from "@/lib/loadPage";

export default async function Pricing() {
  const page = await loadPage("pricing");
  return (
    <main className="pb-24">
      <SectionsRenderer sections={page.sections} />
    </main>
  );
}
