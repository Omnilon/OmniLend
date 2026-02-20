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
    title: "OmniLend - Interiors, Fortification, Tattoos & Financing",
    description:
      "OmniLend offers four lanes in one place: interiors, asset fortification, tattoos, and consumer financing powered by America's First Finance.",
    tagline: "Interiors. Fortification. Tattoos. Financing.",
    gatewayTagline: "OMNILEND // SYSTEM ENTRY",
    introLabel: "System access",
    heroLabel: "OmniLend // Integrated Systems",
    heroTitle: "One system for spaces, capital, and protection.",
    heroSubtitle:
      "We combine interior design, financial operations, and asset protection into a calm, coordinated engagement with clear outcomes.",
    heroCtaPrimary: "Enter the system",
    heroCtaSecondary: "Explore services",
    heroHighlights: [
      "Interior design + experience",
      "Financial clarity + planning",
      "Asset protection + safety",
      "Operational alignment"
    ]
  },
  nav: [
    { label: "Overview", href: "#overview" },
    { label: "Services", href: "#services" },
    { label: "Process", href: "#process" },
    { label: "Proof", href: "#proof" },
    { label: "Work", href: "#work" },
    { label: "Trust", href: "#trust" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" }
  ],
  sections: [
    { id: "hero", label: "Gateway", mode: "MODE: GATEWAY" },
    { id: "overview", label: "Overview", mode: "MODE: OVERVIEW" },
    { id: "services", label: "Services", mode: "MODE: SERVICES" },
    { id: "process", label: "Process", mode: "MODE: PROCESS" },
    { id: "proof", label: "Proof", mode: "MODE: SIGNAL" },
    { id: "work", label: "Work", mode: "MODE: CASES" },
    { id: "trust", label: "Trust", mode: "MODE: SAFEGUARD" },
    { id: "faq", label: "FAQ", mode: "MODE: SUPPORT" },
    { id: "contact", label: "Contact", mode: "MODE: CTA" }
  ] as SectionNav[],
  overview: {
    eyebrow: "System overview",
    title: "Four services, one operating partner.",
    subtitle:
      "OmniLend blends interiors, asset fortification, tattoos, and consumer financing into one coordinated experience.",
    items: [
      {
        title: "Interior environments",
        description:
          "Human-centered spaces that balance beauty, function, and longevity for residential and boutique commercial clients."
      },
      {
        title: "Finance operations",
        description:
          "Planning, forecasting, and cash flow visibility that keeps teams aligned on growth and risk."
      },
      {
        title: "Asset protection",
        description:
          "Risk assessment, safety protocols, and operational safeguards to protect people and assets."
      }
    ] as OverviewItem[]
  },
  services: {
    eyebrow: "Capabilities",
    title: "Services built to stay calm under pressure.",
    subtitle: "Pick a single discipline or combine multiple systems in one engagement.",
    items: [
      {
        id: "interior-design",
        title: "Interior Design Studio",
        summary: "Concept-to-install design for residential and boutique commercial spaces.",
        description:
          "We guide concepting, spatial planning, finishes, lighting, and procurement with a steady process that keeps teams aligned.",
        outcomes: [
          "Cohesive design direction",
          "Predictable timelines",
          "Vendor coordination and oversight"
        ],
        deliverables: [
          "Design boards and layout plans",
          "Finish schedules",
          "Procurement and install guidance"
        ],
        pricing: "Engagement: project-based or room packages",
        accent: "#F07A8E",
        accentSoft: "rgba(240, 122, 142, 0.18)"
      },
      {
        id: "finance",
        title: "OmniLend Finance",
        summary: "Financial planning, forecasting, and operator-ready reporting.",
        description:
          "We structure budgets, cash flow models, and decision frameworks so leadership can move quickly with confidence.",
        outcomes: [
          "Clear financial visibility",
          "Aligned leadership decisions",
          "Operational-ready reporting"
        ],
        deliverables: [
          "Forecasting models",
          "Budget and runway planning",
          "Monthly reporting cadence"
        ],
        pricing: "Engagement: advisory or fractional support",
        accent: "#F3C24A",
        accentSoft: "rgba(243, 194, 74, 0.18)"
      },
      {
        id: "asset-protection",
        title: "OmniLend Asset Protection",
        summary: "Risk assessments, safety planning, and loss prevention support.",
        description:
          "We audit vulnerabilities, design protocols, and train teams to protect people, spaces, and operational continuity.",
        outcomes: [
          "Risk visibility and mitigation",
          "Stronger safety protocols",
          "Reduced operational exposure"
        ],
        deliverables: [
          "Risk assessment report",
          "Protocol playbooks",
          "Training and review sessions"
        ],
        pricing: "Engagement: assessment plus ongoing review",
        accent: "#59D3B2",
        accentSoft: "rgba(89, 211, 178, 0.18)"
      }
    ] as Service[]
  },
  process: {
    eyebrow: "Process",
    title: "A repeatable operating rhythm.",
    subtitle: "Five steps that keep teams aligned from intake to execution.",
    steps: [
      {
        title: "Signal intake",
        description: "Gather objectives, constraints, and risk signals from stakeholders."
      },
      {
        title: "System mapping",
        description: "Audit the current state and map gaps across people, process, and tools."
      },
      {
        title: "Design + planning",
        description: "Draft the plan, scope, and cadence with clear deliverables."
      },
      {
        title: "Deployment",
        description: "Deliver assets, execution support, and implementation guidance."
      },
      {
        title: "Optimization",
        description: "Review outcomes, adjust the system, and plan the next phase."
      }
    ] as ProcessStep[]
  },
  proof: {
    eyebrow: "Proof",
    title: "Measured outcomes, shared clearly.",
    subtitle: "Replace these placeholders with verified metrics and case studies.",
    metrics: [
      { value: "18%", label: "Sample cost efficiency lift", note: "Placeholder" },
      { value: "4.9/5", label: "Sample client satisfaction", note: "Placeholder" },
      { value: "3-5w", label: "Sample engagement timeline", note: "Placeholder" }
    ] as Metric[],
    testimonials: [
      {
        quote:
          "OmniLend brought clarity to our space, budget, and operational risks in one coordinated engagement.",
        name: "Director of Operations",
        role: "Hospitality",
        company: "Boutique Group"
      },
      {
        quote:
          "The finance framework helped us align leadership and move faster without losing control.",
        name: "Founder",
        role: "Consumer Brand",
        company: "Private Portfolio"
      },
      {
        quote:
          "The asset protection review surfaced blind spots we had missed for years.",
        name: "General Manager",
        role: "Retail",
        company: "Regional Operator"
      }
    ] as Testimonial[],
    logos: ["Studio North", "Westlake", "Maven", "Eastbay", "Orchid"]
  },
  work: {
    eyebrow: "Work",
    title: "Selected engagements (placeholder).",
    subtitle: "Swap these with live case studies when ready.",
    cases: [
      {
        title: "Residential interior transformation",
        description:
          "Reimagined a full-home interior with cohesive material palettes and custom lighting plans.",
        tags: ["Interior Design", "Residential"],
        outcome: "Improved flow and livability."
      },
      {
        title: "Finance operations reset",
        description:
          "Built a forecasting and reporting cadence to align leadership on growth priorities.",
        tags: ["Finance", "Planning"],
        outcome: "Leadership decisions made with clearer data."
      },
      {
        title: "Asset protection assessment",
        description:
          "Audited high-risk operational zones and deployed safety protocols across teams.",
        tags: ["Asset Protection", "Safety"],
        outcome: "Reduced exposure and improved team response."
      }
    ] as CaseStudy[]
  },
  trust: {
    eyebrow: "Trust & security",
    title: "Safeguards designed into the engagement.",
    subtitle:
      "We stay precise, transparent, and respectful of privacy while we build the system.",
    items: [
      {
        title: "Scope clarity",
        description:
          "Every engagement begins with clear deliverables, timelines, and communication paths."
      },
      {
        title: "Discretion + privacy",
        description:
          "Sensitive information stays protected with role-based access and secure documentation."
      },
      {
        title: "Safety-first protocols",
        description:
          "We plan for safety, compliance, and operational continuity without overpromising."
      }
    ] as TrustItem[]
  },
  faq: {
    eyebrow: "FAQ",
    title: "Questions, answered with clarity.",
    items: [
      {
        question: "Can we engage on just one discipline?",
        answer:
          "Yes. You can engage OmniLend for a single service or combine multiple systems under one engagement."
      },
      {
        question: "Do you offer ongoing retainers?",
        answer:
          "Yes, retainers are available for finance advisory, asset protection reviews, and continued design support."
      },
      {
        question: "Where do you operate?",
        answer:
          "We work remotely across the U.S. and travel on-site for engagements that require it."
      },
      {
        question: "How quickly can we start?",
        answer:
          "Discovery typically begins within two weeks once scope and stakeholders are aligned."
      }
    ] as FaqItem[]
  },
  contact: {
    eyebrow: "Contact",
    title: "Tell us what you are building.",
    subtitle:
      "Share your goals across design, finance, or protection. We will respond with a tailored plan.",
    email: "omnilend.co@gmail.com",
    phone: "(404) 919-8026",
    phoneDial: "+14049198026",
    availability: "New engagements accepted quarterly.",
    formTitle: "Start an engagement",
    formDescription: "Send a brief note and we will follow up within 2 business days.",
    ctaLabel: "Schedule a discovery call",
    ctaNote: "Response within 2 business days."
  }
};

export type OmniContent = typeof omniContent;
