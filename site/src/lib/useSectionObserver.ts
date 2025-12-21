import { useEffect, useMemo, useState } from "react";

export function useSectionObserver(sectionIds: string[]) {
  const ids = useMemo(() => sectionIds.filter(Boolean), [sectionIds]);
  const [activeId, setActiveId] = useState(ids[0] ?? "");

  useEffect(() => {
    if (typeof window === "undefined" || ids.length === 0) return;

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    let frame: number | null = null;

    const updateActive = () => {
      frame = null;
      const viewportMarker = window.innerHeight * 0.35;
      let bestId = elements[0].id;
      let bestDistance = Number.POSITIVE_INFINITY;

      for (const section of elements) {
        const rect = section.getBoundingClientRect();
        if (rect.bottom <= 0) continue;
        const distance = Math.abs(rect.top - viewportMarker);
        if (distance < bestDistance) {
          bestDistance = distance;
          bestId = section.id;
        }
      }

      setActiveId(bestId);
    };

    const onScroll = () => {
      if (frame !== null) return;
      frame = window.requestAnimationFrame(updateActive);
    };

    updateActive();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (frame !== null) {
        window.cancelAnimationFrame(frame);
      }
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ids]);

  return activeId;
}
