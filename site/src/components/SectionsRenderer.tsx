import dynamic from "next/dynamic";
import type { SectionT } from "@content/schema";

const Hero = dynamic(() => import("./sections/Hero"));
const Features = dynamic(() => import("./sections/Features"));
const Steps = dynamic(() => import("./sections/Steps"));
const Testimonials = dynamic(() => import("./sections/Testimonials"));
const CTA = dynamic(() => import("./sections/CTA"));
const Prose = dynamic(() => import("./sections/Prose"));

export default function SectionsRenderer({ sections }: { sections: SectionT[] }) {
  return (
    <>
      {sections.map((s, i) => {
        switch (s.type) {
          case "hero":
            return <Hero key={i} {...s} />;
          case "features":
            return <Features key={i} {...s} />;
          case "steps":
            return <Steps key={i} {...s} />;
          case "testimonials":
            return <Testimonials key={i} {...s} />;
          case "cta":
            return <CTA key={i} {...s} />;
          case "prose":
            return <Prose key={i} {...s} />;
          default:
            return null;
        }
      })}
    </>
  );
}
