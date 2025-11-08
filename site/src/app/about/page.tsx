import SectionsRenderer from "@/components/SectionsRenderer";
import { loadPage } from "@/lib/loadPage";

export default async function About() {
  const page = await loadPage("about");
  return (
    <main className="pb-24">
      <SectionsRenderer sections={page.sections} />
    </main>
  );
}
