import SectionsRenderer from "@/components/SectionsRenderer";
import { loadPage } from "@/lib/loadPage";

export default async function Contact() {
  const page = await loadPage("contact");
  return (
    <main className="pb-24">
      <SectionsRenderer sections={page.sections} />
    </main>
  );
}
