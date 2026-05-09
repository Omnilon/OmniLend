export type DivisionKey = "interiors" | "asset-fortification" | "finance";

export type LeadFormConfig = {
  serviceLabel: string;
  servicePlaceholder: string;
  serviceOptions: string[];
  budgetLabel: string;
  budgetPlaceholder: string;
  contextLabel: string;
  contextPlaceholder: string;
  timelineLabel: string;
  timelinePlaceholder: string;
  messageLabel: string;
  messagePlaceholder: string;
};

export type Division = {
  slug: DivisionKey;
  eyebrow: string;
  name: string;
  shortName: string;
  metaTitle: string;
  metaDescription: string;
  heroTitle: string;
  heroSubtitle: string;
  visualMood: string;
  accentColor: string;
  gradient: string;
  services: string[];
  process: string[];
  proofPoints: string[];
  leadFormFields: LeadFormConfig;
  crossLinks: DivisionKey[];
};

export const divisions: Record<DivisionKey, Division> = {
  interiors: {
    slug: "interiors",
    name: "ØMNILON Interiors",
    shortName: "Interiors",
    eyebrow: "Spatial Design / Staging / Visual Redesign",
    metaTitle: "ØMNILON Interiors — Interior Design, Staging, and Visual Redesign",
    metaDescription:
      "Interior styling, virtual redesign, staging, and spatial direction for residential, commercial, rental, and brand environments.",
    heroTitle: "Rooms that feel intentional before anyone says a word.",
    heroSubtitle:
      "Interior styling, staging, virtual redesign, and environment planning for homes, offices, rentals, and commercial spaces.",
    visualMood:
      "warm-black gallery, soft architectural lighting, material swatches, floor-plan grid overlays, cinematic before/after reveals",
    accentColor: "#D4A0FF",
    gradient:
      "radial-gradient(circle at 18% 12%, rgba(212,160,255,0.24), transparent 36%), radial-gradient(circle at 78% 30%, rgba(245,218,185,0.16), transparent 34%), linear-gradient(140deg, #09070c 0%, #161018 48%, #08070a 100%)",
    services: [
      "Residential room redesign",
      "Commercial space styling",
      "Virtual redesign boards",
      "Furniture and decor sourcing",
      "Staging for listings, rentals, and brand spaces",
      "Layout planning and visual direction"
    ],
    process: [
      "Intake and room goals",
      "Moodboard and spatial concept",
      "Sourcing and layout plan",
      "Final design direction or implementation support"
    ],
    proofPoints: [
      "Design direction built around function, mood, and budget",
      "Clear visual deliverables before money is spent on furniture",
      "Can support residential, commercial, rental, or brand spaces"
    ],
    leadFormFields: {
      serviceLabel: "Project type",
      servicePlaceholder: "Select a project type",
      serviceOptions: [
        "Residential redesign",
        "Commercial styling",
        "Virtual redesign",
        "Staging",
        "Furniture/decor sourcing",
        "Other"
      ],
      budgetLabel: "Budget range",
      budgetPlaceholder: "$2k-$5k, $5k-$15k, open, etc.",
      contextLabel: "Room / property type",
      contextPlaceholder: "Living room, rental unit, salon, office suite...",
      timelineLabel: "Timeline",
      timelinePlaceholder: "This month, 6-8 weeks, flexible...",
      messageLabel: "Design notes",
      messagePlaceholder:
        "Describe the space, what is not working, preferred mood, and any constraints."
    },
    crossLinks: ["asset-fortification", "finance"]
  },
  "asset-fortification": {
    slug: "asset-fortification",
    name: "ØMNILON Asset Fortification",
    shortName: "Asset Fortification",
    eyebrow: "Risk Review / Loss Prevention / Operational Security",
    metaTitle: "ØMNILON Asset Fortification — Risk Review and Loss Prevention",
    metaDescription:
      "Site walkthroughs, loss-prevention planning, vulnerability review, and operational security recommendations for properties and businesses.",
    heroTitle: "Protect the assets people overlook until something goes wrong.",
    heroSubtitle:
      "Security-minded audits, site assessments, loss-prevention planning, and operational safeguards for businesses, properties, and high-risk environments.",
    visualMood:
      "black/grey tactical interface, red-orange scanning lines, subtle map grid, incident timeline cards, camera-zone overlays",
    accentColor: "#FF5300",
    gradient:
      "radial-gradient(circle at 12% 18%, rgba(255,83,0,0.22), transparent 34%), radial-gradient(circle at 82% 16%, rgba(255,255,255,0.08), transparent 28%), linear-gradient(150deg, #050505 0%, #151515 50%, #090706 100%)",
    services: [
      "Site vulnerability walkthroughs",
      "Loss-prevention observations",
      "Asset protection planning",
      "Access-point and camera-zone review",
      "Incident documentation systems",
      "Staff-facing security workflow recommendations"
    ],
    process: [
      "Risk intake",
      "Site or workflow review",
      "Threat and vulnerability mapping",
      "Fortification plan with prioritized fixes"
    ],
    proofPoints: [
      "Built for practical, real-world security gaps",
      "Focuses on prevention, documentation, and accountability",
      "Useful for retail, offices, property managers, and small businesses"
    ],
    leadFormFields: {
      serviceLabel: "Main concern",
      servicePlaceholder: "Select the primary concern",
      serviceOptions: [
        "Loss prevention",
        "Unauthorized access",
        "Camera blind spots",
        "Staff safety",
        "Incident documentation",
        "Operational security review",
        "Other"
      ],
      budgetLabel: "Business / property type",
      budgetPlaceholder: "Retail, office, warehouse, rental property...",
      contextLabel: "Site location general area",
      contextPlaceholder: "City/region only. Do not send sensitive access details.",
      timelineLabel: "Timeline",
      timelinePlaceholder: "Urgent, this month, quarterly review...",
      messageLabel: "Risk notes",
      messagePlaceholder:
        "Describe the pattern, site type, workflow, or documentation gap you want reviewed."
    },
    crossLinks: ["interiors", "finance"]
  },
  finance: {
    slug: "finance",
    name: "OmniLend Finance",
    shortName: "Finance",
    eyebrow: "Financing / Purchase Planning / Customer Intake",
    metaTitle: "OmniLend Finance — Purchase Planning and Financing Intake",
    metaDescription:
      "Finance intake, purchase planning, eligibility workflows, and structured follow-up for customers exploring payment options.",
    heroTitle: "Flexible purchasing pathways without the usual friction.",
    heroSubtitle:
      "A finance-focused division for purchase planning, payment options, customer intake, and structured approval workflows. Financing options are subject to approval where available, and terms may vary.",
    visualMood:
      "dark fintech dashboard, clean numbers, approval pathway cards, glass panels, subtle green/purple financial signal accents",
    accentColor: "#6EC85C",
    gradient:
      "radial-gradient(circle at 16% 12%, rgba(110,200,92,0.22), transparent 35%), radial-gradient(circle at 78% 18%, rgba(212,160,255,0.16), transparent 30%), linear-gradient(145deg, #050806 0%, #0d1710 48%, #050607 100%)",
    services: [
      "Customer finance intake",
      "Purchase planning workflows",
      "Device and product financing pathways",
      "Payment option presentation",
      "Approval-status tracking",
      "Lead qualification for financing opportunities"
    ],
    process: [
      "Customer intent capture",
      "Eligibility and purchase-path review",
      "Finance option presentation",
      "Follow-up and closing workflow"
    ],
    proofPoints: [
      "Designed to make financing conversations easier to track",
      "Separates serious leads from casual inquiries",
      "Can support future merchant-financing or lease-to-own workflows"
    ],
    leadFormFields: {
      serviceLabel: "Purchase type",
      servicePlaceholder: "Select a purchase type",
      serviceOptions: [
        "Phone/device",
        "Furniture/interior project",
        "Business equipment",
        "Consumer product",
        "Other"
      ],
      budgetLabel: "Estimated purchase amount",
      budgetPlaceholder: "$500, $2,500, not sure yet...",
      contextLabel: "Financing need",
      contextPlaceholder: "Payment options, eligibility review, purchase planning...",
      timelineLabel: "Timeline",
      timelinePlaceholder: "Ready now, comparing options, future purchase...",
      messageLabel: "Purchase notes",
      messagePlaceholder:
        "Describe what you want to purchase, preferred timing, and any context for the intake review."
    },
    crossLinks: ["interiors", "asset-fortification"]
  }
};

export const divisionList = [
  divisions.interiors,
  divisions["asset-fortification"],
  divisions.finance
];

export function getDivision(slug: DivisionKey) {
  return divisions[slug];
}
