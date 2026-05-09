export type NavItem = {
  label: string;
  href: string;
};

export type SectionNav = {
  id: string;
  label: string;
  mode: string;
};

export type OverviewItem = {
  title: string;
  description: string;
};

export type Service = {
  id: string;
  title: string;
  summary: string;
  description: string;
  outcomes: string[];
  deliverables: string[];
  pricing: string;
  accent: string;
  accentSoft: string;
};

export type ProcessStep = {
  title: string;
  description: string;
};

export type Metric = {
  value: string;
  label: string;
  note?: string;
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
};

export type CaseStudy = {
  title: string;
  description: string;
  tags: string[];
  outcome: string;
};

export type TrustItem = {
  title: string;
  description: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export const omniContent = {
  site: {
    name: "OmniLend",
    url: "https://omnilend.pro",
    title: "OmniLend.pro - Design, Asset Fortification, and Finance",
    description:
      "OmniLend is a three-division umbrella brand for interiors, asset fortification, and finance intake.",
    tagline: "Design. Protect. Structure.",
    gatewayTagline: "OMNILEND // THREE DIVISIONS",
    introLabel: "Gateway access",
    heroLabel: "OmniLend // Umbrella Brand",
    heroTitle: "Three specialist worlds under one parent brand.",
    heroSubtitle:
      "Choose the division that matches the work: spatial design, asset fortification, or finance intake.",
    heroCtaPrimary: "Open gateway",
    heroCtaSecondary: "Send intake",
    heroHighlights: ["Interior environments", "Asset fortification", "Finance intake"]
  },
  nav: [
    { label: "Gateway", href: "/" },
    { label: "Interiors", href: "/interiors" },
    { label: "Asset Fortification", href: "/asset-fortification" },
    { label: "Finance", href: "/finance" }
  ] as NavItem[],
  sections: [
    { id: "hero", label: "Gateway", mode: "MODE: GATEWAY" },
    { id: "overview", label: "Overview", mode: "MODE: OVERVIEW" },
    { id: "services", label: "Services", mode: "MODE: SERVICES" },
    { id: "process", label: "Process", mode: "MODE: PROCESS" },
    { id: "proof", label: "Proof", mode: "MODE: SIGNAL" },
    { id: "contact", label: "Contact", mode: "MODE: CTA" }
  ] as SectionNav[],
  overview: {
    eyebrow: "System overview",
    title: "One parent brand, three specialist divisions.",
    subtitle:
      "Each division has its own route, visual language, intake questions, and operating context.",
    items: [
      {
        title: "Interior Design",
        description:
          "Spatial planning, staging, virtual redesign, and sourcing for residential, commercial, rental, and brand environments."
      },
      {
        title: "Asset Fortification",
        description:
          "Risk review, loss-prevention planning, access-point checks, camera-zone review, and operational documentation."
      },
      {
        title: "Finance",
        description:
          "Purchase planning, customer intake, eligibility workflow support, and structured follow-up where options are available."
      }
    ] as OverviewItem[]
  },
  services: {
    eyebrow: "Divisions",
    title: "Select the world you need.",
    subtitle:
      "The live site routes directly into Interiors, Asset Fortification, or Finance without a cluttered service menu.",
    items: [
      {
        id: "interiors",
        title: "ØMNILON Interiors",
        summary: "Interior styling, staging, virtual redesign, and spatial direction.",
        description:
          "Design direction built around function, mood, budget, and clear visual deliverables before furniture or decor decisions are made.",
        outcomes: [
          "Clear room goals",
          "Visual direction before purchases",
          "Layout and sourcing support"
        ],
        deliverables: ["Moodboards", "Layout plans", "Sourcing and staging direction"],
        pricing: "Scoped by room, property type, and implementation needs",
        accent: "#D4A0FF",
        accentSoft: "rgba(212,160,255,0.18)"
      },
      {
        id: "asset-fortification",
        title: "ØMNILON Asset Fortification",
        summary: "Risk review, loss prevention, and operational security recommendations.",
        description:
          "Security-minded review for practical gaps in access, visibility, workflow, documentation, and accountability.",
        outcomes: [
          "Vulnerability visibility",
          "Prioritized safeguards",
          "Documentation recommendations"
        ],
        deliverables: ["Risk intake", "Site or workflow review", "Fortification plan"],
        pricing: "Scoped by site, workflow, and urgency",
        accent: "#FF5300",
        accentSoft: "rgba(255,83,0,0.18)"
      },
      {
        id: "finance",
        title: "OmniLend Finance",
        summary: "Purchase planning, finance intake, and structured follow-up.",
        description:
          "Compliance-friendly intake for customers exploring payment options where available. Financing is subject to approval and terms may vary.",
        outcomes: ["Intent capture", "Eligibility review support", "Follow-up clarity"],
        deliverables: ["Lead qualification", "Purchase notes", "Approval-path tracking"],
        pricing: "No guaranteed approvals, rates, or lending terms",
        accent: "#6EC85C",
        accentSoft: "rgba(110,200,92,0.18)"
      }
    ] as Service[]
  },
  process: {
    eyebrow: "Process",
    title: "A clear intake rhythm.",
    subtitle: "Each division starts with context, then narrows into a specific plan.",
    steps: [
      {
        title: "Signal intake",
        description: "Capture goals, constraints, timing, and the division-specific request."
      },
      {
        title: "Review",
        description: "Assess the current space, asset exposure, or purchase path."
      },
      {
        title: "Plan",
        description: "Return a scoped direction with next steps and practical priorities."
      }
    ] as ProcessStep[]
  },
  proof: {
    eyebrow: "Proof",
    title: "Evidence belongs in the work.",
    subtitle: "Public case studies and metrics should only be added when verified.",
    metrics: [] as Metric[],
    testimonials: [] as Testimonial[],
    logos: [] as string[]
  },
  work: {
    eyebrow: "Work",
    title: "Division work is routed by context.",
    subtitle: "Case studies can be added once real, approved examples are ready.",
    cases: [] as CaseStudy[]
  },
  trust: {
    eyebrow: "Trust",
    title: "Practical, scoped, and compliance-aware.",
    subtitle:
      "The public site avoids fake claims, fake terms, and overbroad promises. Intake stays division-specific.",
    items: [
      {
        title: "Scope clarity",
        description: "Each route asks for the details that matter to that division."
      },
      {
        title: "Discretion",
        description: "Sensitive operational context is handled through controlled intake."
      },
      {
        title: "Compliance-safe finance language",
        description: "Finance copy avoids guaranteed approval, invented rates, or lender claims."
      }
    ] as TrustItem[]
  },
  faq: {
    eyebrow: "FAQ",
    title: "Common routing questions.",
    items: [
      {
        question: "Can I start with only one division?",
        answer: "Yes. Each division has its own route and form."
      },
      {
        question: "Does finance guarantee approval?",
        answer:
          "No. Availability, approval, and terms may vary and are subject to review and provider requirements."
      },
      {
        question: "Where should I send attachments?",
        answer: "Email Omnilend.co@gmail.com after submitting the relevant division intake."
      }
    ] as FaqItem[]
  },
  contact: {
    eyebrow: "Contact",
    title: "Send the right intake.",
    subtitle: "Start from the division route that matches your request.",
    email: "Omnilend.co@gmail.com",
    phone: "",
    phoneDial: "",
    availability: "New requests accepted through division forms.",
    formTitle: "Start an engagement",
    formDescription: "Use the division-specific lead forms for the cleanest routing.",
    ctaLabel: "Open gateway",
    ctaNote: "Response timing depends on scope and availability."
  }
};

export const serviceItems = omniContent.services.items;

export function getServiceHref(service: Pick<Service, "id"> | string) {
  const id = typeof service === "string" ? service : service.id;
  return id === "interiors" ? "/interiors" : `/${id}`;
}

export function getServiceById(id: string) {
  return serviceItems.find((service) => service.id === id);
}

export type OmniContent = typeof omniContent;
