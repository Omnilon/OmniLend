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
    title: "OmniLend - Secure Lending Experiences",
    description:
      "OmniLend designs and builds secure, human-centered lending experiences for modern platforms. Strategy, design, and engineering for high-trust finance.",
    tagline: "Lending systems that feel human.",
    gatewayTagline: "OMNILEND // FREE FROM COMPROMISE",
    introLabel: "System access",
    heroLabel: "OmniLend // Lending Systems",
    heroTitle: "Lending experiences built for trust.",
    heroSubtitle:
      "We design, ship, and optimize lending journeys that balance speed with risk clarity - from onboarding to repayment.",
    heroCtaPrimary: "Enter the system",
    heroCtaSecondary: "Explore services"
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
    title: "A calm, confident lending system.",
    subtitle:
      "OmniLend orchestrates lending experiences that keep borrowers informed and teams in control - with clear flows, visibility, and measured risk.",
    items: [
      {
        title: "Clarity across the journey",
        description:
          "We map decisioning, disclosures, and repayment into a single narrative so customers always know what happens next."
      },
      {
        title: "Risk-aware by design",
        description:
          "Signals, friction, and guardrails are shaped into the experience, not bolted on after launch."
      },
      {
        title: "Operational visibility",
        description:
          "Dashboards and handoffs keep lending ops, servicing, and risk teams aligned on every touchpoint."
      }
    ] as OverviewItem[]
  },
  services: {
    eyebrow: "Capabilities",
    title: "Services engineered for high-trust lending.",
    subtitle:
      "Strategy, experience, and build support for lenders that need speed without losing control.",
    items: [
      {
        id: "strategy",
        title: "Lending strategy + discovery",
        summary: "Define the lending model, risk posture, and experience north star.",
        description:
          "We align stakeholders around product goals, eligibility logic, and user journeys while mapping regulatory and operational constraints.",
        outcomes: [
          "Clear lending model and success metrics",
          "Risk assumptions documented early",
          "Aligned roadmap and scope"
        ],
        deliverables: [
          "Experience blueprint",
          "Risk and compliance checklist",
          "Opportunity map"
        ]
      },
      {
        id: "experience",
        title: "Experience design",
        summary: "Design borrower flows that feel transparent and human.",
        description:
          "We craft UX and UI systems that keep borrowers informed, reduce drop-off, and preserve trust through sensitive moments.",
        outcomes: [
          "Higher completion rates",
          "Reduced support load",
          "Consistent brand confidence"
        ],
        deliverables: [
          "Journey maps",
          "High-fidelity UI system",
          "Copy and disclosure guidance"
        ]
      },
      {
        id: "risk",
        title: "Risk + policy design",
        summary: "Translate risk logic into clear, compliant experiences.",
        description:
          "We partner with risk and compliance teams to shape disclosures, adverse action flows, and servicing protocols that are clear and respectful.",
        outcomes: [
          "Lower escalation rates",
          "Better audit readiness",
          "Fewer manual reviews"
        ],
        deliverables: [
          "Decisioning UX rules",
          "Disclosure templates",
          "Exception handling playbook"
        ]
      },
      {
        id: "build",
        title: "Product build + launch",
        summary: "Ship the experience with modern engineering and analytics.",
        description:
          "We build front-end and integration layers, instrument analytics, and coordinate handoff so teams can operate from day one.",
        outcomes: [
          "Launch-ready lending journey",
          "Reliable integrations",
          "Operational telemetry"
        ],
        deliverables: [
          "Production UI",
          "Integration support",
          "Tracking plan"
        ]
      },
      {
        id: "optimization",
        title: "Optimization + growth",
        summary: "Measure behavior and iterate with precision.",
        description:
          "We run diagnostics on friction points, create experiments, and tune the system to improve approvals, repayment, and retention.",
        outcomes: [
          "Reduced drop-off",
          "Improved repayment posture",
          "Continuous learning loop"
        ],
        deliverables: [
          "Experiment backlog",
          "UX instrumentation",
          "Performance review cadence"
        ]
      }
    ] as Service[]
  },
  process: {
    eyebrow: "Process",
    title: "A calm, repeatable operating rhythm.",
    subtitle: "Five steps that keep teams aligned from intake to iteration.",
    steps: [
      {
        title: "Signal intake",
        description: "Gather business goals, data signals, and platform constraints."
      },
      {
        title: "Journey modeling",
        description: "Map lending flows, risk checkpoints, and communication moments."
      },
      {
        title: "Design + prototyping",
        description: "Prototype the experience with stakeholders and validation loops."
      },
      {
        title: "Build + integrate",
        description: "Ship the experience with analytics, QA, and deployment support."
      },
      {
        title: "Optimize",
        description: "Monitor signals and iterate with targeted experiments."
      }
    ] as ProcessStep[]
  },
  proof: {
    eyebrow: "Proof",
    title: "Measured outcomes, shared clearly.",
    subtitle:
      "Replace these placeholders with real numbers as you collect production data.",
    metrics: [
      { value: "28%", label: "Sample onboarding lift", note: "Placeholder" },
      { value: "36h", label: "Sample decision turnaround", note: "Placeholder" },
      { value: "4.8/5", label: "Sample borrower satisfaction", note: "Placeholder" }
    ] as Metric[],
    testimonials: [
      {
        quote:
          "OmniLend helped us simplify approvals while keeping risk and compliance aligned across teams.",
        name: "Head of Product",
        role: "Consumer Lending",
        company: "Fintech Platform"
      },
      {
        quote:
          "The new repayment experience reduced confusion and improved our servicing metrics within weeks.",
        name: "Operations Lead",
        role: "Servicing",
        company: "Credit Marketplace"
      },
      {
        quote:
          "Every touchpoint feels deliberate - we finally have a coherent lending story.",
        name: "Founder",
        role: "Embedded Finance",
        company: "SaaS Provider"
      }
    ] as Testimonial[],
    logos: ["NovaBank", "Aperture Capital", "Greyline", "Cascade", "Ion Ledger"]
  },
  work: {
    eyebrow: "Work",
    title: "Selected engagements (placeholder).",
    subtitle: "Swap these with live case studies when ready.",
    cases: [
      {
        title: "Embedded lending for a vertical SaaS",
        description:
          "Designed a loan offer flow that balances approvals with clear repayment expectations.",
        tags: ["SaaS", "Embedded", "B2B"],
        outcome: "Reduced drop-off at offer review."
      },
      {
        title: "Marketplace credit for mid-market buyers",
        description:
          "Built a multi-rail underwriting journey with transparent disclosures and status updates.",
        tags: ["Marketplace", "Underwriting", "Risk"],
        outcome: "Improved confidence in approval outcomes."
      },
      {
        title: "Servicing portal modernization",
        description:
          "Reimagined repayment, hardship, and support flows for a servicing team.",
        tags: ["Servicing", "Ops", "Support"],
        outcome: "Lowered inbound support volume."
      }
    ] as CaseStudy[]
  },
  trust: {
    eyebrow: "Trust & security",
    title: "Safeguards designed into the experience.",
    subtitle:
      "We focus on transparency, data stewardship, and operational resilience without overpromising compliance.",
    items: [
      {
        title: "Privacy-first workflows",
        description:
          "Sensitive data is minimized, masked, and handled with clear consent patterns."
      },
      {
        title: "Audit-friendly handoffs",
        description:
          "Documentation and decision logs are structured for internal review and partner audits."
      },
      {
        title: "Resilience planning",
        description:
          "We map fallback states, escalation paths, and recovery experiences before launch."
      }
    ] as TrustItem[]
  },
  faq: {
    eyebrow: "FAQ",
    title: "Questions, answered with clarity.",
    items: [
      {
        question: "What size teams do you work with?",
        answer:
          "We partner with lean fintech teams through enterprise platforms, adjusting cadence and documentation to match scale."
      },
      {
        question: "Do you replace internal design or engineering teams?",
        answer:
          "No - we work alongside your teams to accelerate delivery, document decisions, and hand off cleanly."
      },
      {
        question: "Can OmniLend support compliance requirements?",
        answer:
          "We design experiences that make compliance workflows clear, but we do not provide legal advice."
      },
      {
        question: "How quickly can we start?",
        answer:
          "Discovery can begin within two weeks once scope and stakeholders are aligned."
      }
    ] as FaqItem[]
  },
  contact: {
    eyebrow: "Contact",
    title: "Build the lending experience your customers trust.",
    subtitle:
      "Tell us about your product, risk goals, and timeline. We will respond with a tailored plan.",
    ctaLabel: "Schedule a discovery call",
    ctaNote: "Response within 2 business days."
  }
};

export type OmniContent = typeof omniContent;
