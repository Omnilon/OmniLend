import SectionsRenderer from "@/components/SectionsRenderer";
import { loadPage } from "@/lib/loadPage";

export default async function Financing() {
  const page = await loadPage("financing");
  return (
    <main className="pb-24">
      <SectionsRenderer sections={page.sections} />
    </main>
  );
}
