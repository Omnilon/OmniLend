"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { BrandNavbar, BrandNavItem } from "./BrandNavbar";
import { HudBracket } from "./HudBracket";
import { Section } from "./Section";
import { SoundToggle } from "./SoundToggle";
import { HeroGate, hasEnteredGate } from "./HeroGate";
import { Preloader, hasSeenPreloader } from "./Preloader";
import { ExperienceDeck, ExperienceId } from "./ExperienceDeck";
import { CornerHudBadge } from "./CornerHudBadge";

type ServiceData = {
  id: string;
  title: string;
  summary: string;
  description: string;
  price: string;
  deliverables: string[];
  image?: string;
};

type Quote = {
  quote: string;
  author: string;
  role: string;
};

const INTERIOR_SERVICES: ServiceData[] = [
  {
    id: "e-design",
    title: "E-Design",
    summary:
      "Fast, flat-fee design boards with finish schedules and linked shopping lists you can execute on your timeline.",
    description:
      "Collaborate virtually on mood boards, annotated floor plans, and sourced finishes. We package every selection with vendor links so you can implement from anywhere.",
    price: "Flat packages from $749 per room",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1600&auto=format&fit=crop",
    deliverables: [
      "Concept mood boards with palette notes",
      "Scaled floor plan with furniture and lighting callouts",
      "Clickable shopping list with lead times and alternates"
    ]
  },
  {
    id: "refresh",
    title: "Residential Refresh",
    summary:
      "Room-by-room transformations with milestone billing. Client-funded purchasing keeps budgets transparent.",
    description:
      "We layer materials, lighting, and styling with weekly checkpoints so your home evolves without chaos. Procurement stays in your name so every invoice is clear.",
    price: "Projects typically $6k–$18k depending on scope",
    image:
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=1600&auto=format&fit=crop",
    deliverables: [
      "Detailed scope and mood direction for every zone",
      "Procurement tracker with budget status and receipts",
      "Install day supervision with styling and photo ready reset"
    ]
  },
  {
    id: "staging",
    title: "Staging & Small Commercial",
    summary:
      "Photo-ready staging and durable layouts for boutiques, coffee shops, and creative offices.",
    description:
      "Listings, pop-ups, and boutique spaces get curated inventory, signage, and styling plans that convert foot traffic while protecting your investment.",
    price: "Custom proposals from $3,500 per engagement",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1600&auto=format&fit=crop&sat=-10",
    deliverables: [
      "Merchandising and traffic flow maps",
      "Curated rental inventory plan with care instructions",
      "Opening-day styling team and reset checklist"
    ]
  }
];

const INTERIOR_PROCESS = [
  {
    title: "Discovery call",
    description: "Define style fit, budget, and timing before we lock the scope."
  },
  {
    title: "Design concepts",
    description:
      "Boards, samples, and revisions land in a shared dashboard with transparent approvals."
  },
  {
    title: "Procurement",
    description:
      "Client-funded purchasing keeps cash flow honest while we coordinate logistics."
  },
  {
    title: "Install + styling",
    description: "We manage install day so the space feels calm, warm, and functional."
  }
];

const INTERIOR_TESTIMONIALS: Quote[] = [
  {
    quote: "Absolutely transformed our living room. Calm, warm, and practical.",
    author: "A. Rivera",
    role: "Homeowner"
  },
  {
    quote: "Clear milestones and great communication. Install day felt effortless.",
    author: "L. Greene",
    role: "Townhome Renovation"
  },
  {
    quote: "We booked e-design first, then brought Ømnilon for full staging.",
    author: "M. Patel",
    role: "Realtor Partner"
  }
];

const SECURITY_SERVICES: ServiceData[] = [
  {
    id: "sweep",
    title: "In-store vulnerability sweep",
    summary:
      "Map blind spots, ticket swaps, and exit paths using the same playbooks as professional boosters.",
    description:
      "Secret Lifters blend into your floor, document every exploit, and capture POV footage so your team can see the exact moves boosters rely on.",
    price: "Engagements from $2,500 per location",
    deliverables: [
      "Heat-mapped floor plan with blind spots and traffic leaks",
      "Body cam footage with timestamps and narration",
      "Priority remediation list aligned to effort and impact"
    ]
  },
  {
    id: "policy",
    title: "Policy & POS penetration",
    summary:
      "Stress test returns, overrides, coupon stacking, and self-checkout flows to expose loopholes.",
    description:
      "We stress test returns, overrides, coupon stacking, and self-checkout flows to surface loopholes before crews iterate on them.",
    price: "Multi-day investigations from $4,000",
    deliverables: [
      "Scenario scripts with risk ratings",
      "POS and policy exploit recordings with receipts",
      "Updated SOP recommendations for LP and associates"
    ]
  },
  {
    id: "ecommerce",
    title: "Ecommerce exploit hunt",
    summary:
      "Simulate bots, refund abuse, affiliate fraud, and skimming to harden your storefront.",
    description:
      "We simulate bots, refund abuse, affiliate fraud, and skimming to harden digital touchpoints with actionable logging guidance.",
    price: "Subscription sweeps from $3,200 per month",
    deliverables: [
      "Threat matrix covering bots, refunds, loyalty, and CX",
      "Traffic replay files and compromised account evidence",
      "Stack-ranked remediation roadmap with owner assignments"
    ]
  }
];

const SECURITY_PROCESS = [
  {
    title: "Threat intake",
    description:
      "Review shrink reports, POS data, and leadership goals to target the right personas."
  },
  {
    title: "Covert deployment",
    description:
      "Secret Lifters run live scenarios in-store and online, recording every exploit without disrupting guests."
  },
  {
    title: "Signal review",
    description:
      "Analysts tag footage, receipts, and digital trails to separate one-off issues from systemic gaps."
  },
  {
    title: "Action brief",
    description:
      "Receive a 48-hour remediation brief with prioritized fixes, training points, and tech hardening guidance."
  }
];

const SECURITY_COVERAGE = [
  "Field-ready boosters that rotate across apparel, beauty, electronics, and grocery formats.",
  "Digital recon covering ecommerce, OMS, loyalty, and customer support surfaces.",
  "Leadership workshops that translate covert findings into training and KPI dashboards."
];

const SECURITY_PROOF: Quote[] = [
  {
    quote:
      "The Secret Lifter debrief showed us exactly how crews were gutting promos and walking out clean.",
    author: "Director of Loss Prevention",
    role: "National Retailer"
  },
  {
    quote:
      "We closed three policy gaps in a week thanks to the annotated footage and scripts they delivered.",
    author: "Regional LP Lead",
    role: "Specialty Apparel"
  }
];

const INK_SERVICES: ServiceData[] = [
  {
    id: "flash",
    title: "Flash Queue",
    summary:
      "Ready-to-go flash refreshed monthly so you can pick a design and be in the chair fast.",
    description:
      "Reserve a slot, preview the piece at true scale, and review placement suggestions before you arrive.",
    price: "Flash pieces start at $39.99 ($29.99 with sticker drop)",
    image:
      "https://images.unsplash.com/photo-1517233899337-2d0c46345a6d?q=80&w=1400&auto=format&fit=crop",
    deliverables: [
      "Monthly flash sheet preview delivered to your inbox",
      "Placement mockups sized to your selected area",
      "15-minute aftercare briefing with product recs"
    ]
  },
  {
    id: "sticker",
    title: "Sticker Discount Days",
    summary:
      "Bring any sticker to drop flash pieces from $39.99 to $29.99—thanks for supporting the apprenticeship.",
    description:
      "Sticker sessions keep the queue lively and help the apprenticeship fund new equipment while rewarding loyal supporters.",
    price: "Limited slots weekly — $29.99 per flash piece",
    image:
      "https://images.unsplash.com/photo-1519904981063-b0cf448d4794?q=80&w=1400&auto=format&fit=crop",
    deliverables: [
      "Priority booking window during sticker hours",
      "Complimentary touch-up within 60 days if needed",
      "Photo set of your piece for socials"
    ]
  },
  {
    id: "custom",
    title: "Custom Line Work",
    summary:
      "Intentional line work mapped with real objects so you know what fits comfortably and heals clean.",
    description:
      "We sketch alongside your references, test sizing with AR previews, and plan shading that fits your lifestyle and budget.",
    price: "Custom sessions range from $59.99 to $499.99",
    image:
      "https://images.unsplash.com/photo-1551727974-8af20a3322e0?q=80&w=1400&auto=format&fit=crop",
    deliverables: [
      "Collaborative sketch review with iteration feedback",
      "Digital placement mockups at multiple scales",
      "Follow-up check-in two weeks post appointment"
    ]
  }
];

const INK_PROCESS = [
  {
    title: "Select flash or request custom",
    description:
      "Browse the latest drop or send inspo so we can outline scope and timing."
  },
  {
    title: "Deposit & design prep",
    description:
      "A 50% deposit locks your date while we refine sketches and placement."
  },
  {
    title: "Session day",
    description:
      "Arrive to a staged station with sterilized equipment, playlist options, and hydration."
  },
  {
    title: "Aftercare follow-up",
    description:
      "We check in with healing photos, product recs, and free touch-up windows if needed."
  }
];

const INK_PRICING_DETAILS = [
  "Flash tattoos start at $39.99 and drop to $29.99 with sticker sessions.",
  "Custom work ranges from $59.99 to $499.99 depending on coverage and detail.",
  "Every appointment requires a 50% deposit applied to the final total.",
  "Healing check-ins and one touch-up within 60 days are included."
];

const INK_STORIES: Quote[] = [
  {
    quote: "The placement mockups took the guesswork out of my first tattoo.",
    author: "R. Jackson",
    role: "First-time client"
  },
  {
    quote: "Transparent pricing and a chill vibe. Already booked my next flash.",
    author: "K. Nguyen",
    role: "Flash regular"
  }
];

const FINANCING_SERVICES: ServiceData[] = [
  {
    id: "phones",
    title: "iPhones & premium phones",
    summary: "Run fast approvals on iPhones and flagship devices with transparent monthly terms.",
    description:
      "Bundle phones with cases, protectors, and accessories while keeping down payment, term length, and total repayment clear.",
    price: "Programs configured by ticket size",
    image: "https://images.unsplash.com/photo-1503389152951-9f343605f61e?q=80&w=1400&auto=format&fit=crop",
    deliverables: [
      "Approval flow tuned for premium phone purchases",
      "Clear monthly and total-cost disclosure templates",
      "Accessory bundle support in one checkout path"
    ]
  },
  {
    id: "laptops",
    title: "MacBooks & computers",
    summary: "Finance MacBooks, creator laptops, desktops, and gaming PCs without checkout friction.",
    description:
      "Set term and deposit ranges by product band so customers can buy now while you protect margin.",
    price: "Term + deposit matrix by category",
    image: "https://images.unsplash.com/photo-1556740749-887f6717d7e4?q=80&w=1400&auto=format&fit=crop",
    deliverables: [
      "SKU and bundle mapping for laptops and PCs",
      "Configurable term options by basket size",
      "Structured approval messaging for sales teams"
    ]
  },
  {
    id: "mobility",
    title: "Mopeds & scooters",
    summary: "Support mobility financing with clear deposits, approval routing, and risk controls.",
    description:
      "Launch moped and scooter financing with policies that balance affordability, approval speed, and portfolio safety.",
    price: "Mobility-ready underwriting setup",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1400&auto=format&fit=crop",
    deliverables: [
      "Deposit guardrails for higher-risk assets",
      "America's First Finance integration guidance",
      "Approval and servicing workflow playbook"
    ]
  }
];

const FINANCING_PROCESS = [
  {
    title: "Program design",
    description:
      "Map product classes across phones, MacBooks, computers, PCs, mopeds, and scooters."
  },
  {
    title: "Term + deposit setup",
    description:
      "Configure term lengths and deposit bands so payment options stay clear and sustainable."
  },
  {
    title: "Approval workflow",
    description:
      "Route applications through America's First Finance and keep teams informed in real time."
  },
  {
    title: "Launch and monitor",
    description:
      "Go live with monthly-payment offers and monitor approvals, utilization, and customer outcomes."
  }
];

const FINANCING_TESTIMONIALS: Quote[] = [
  {
    quote: "Financing made the build feasible without surprise fees.",
    author: "Retail ops lead",
    role: "Multi-store rollout"
  },
  {
    quote: "Vendors loved the clarity on payouts and margin. Clients loved the monthly options.",
    author: "Program manager",
    role: "Omni-channel launch"
  }
];

const EXPERIENCE_NAV: Record<ExperienceId, BrandNavItem[]> = {
  interiors: [
    { href: "#experiences", label: "Overview", key: "overview" },
    { href: "#services", label: "Services", key: "services" },
    { href: "#process", label: "Process", key: "process" },
    { href: "#testimonials", label: "Testimonials", key: "testimonials" },
    { href: "#cta", label: "Contact", key: "contact" }
  ],
  security: [
    { href: "#experiences", label: "Overview", key: "overview" },
    { href: "#services", label: "Services", key: "services" },
    { href: "#process", label: "Process", key: "process" },
    { href: "#testimonials", label: "Testimonials", key: "testimonials" },
    { href: "#cta", label: "Contact", key: "contact" }
  ],
  ink: [
    { href: "#experiences", label: "Overview", key: "overview" },
    { href: "#services", label: "Services", key: "services" },
    { href: "#process", label: "Process", key: "process" },
    { href: "#testimonials", label: "Testimonials", key: "testimonials" },
    { href: "#cta", label: "Contact", key: "contact" }
  ],
  financing: [
    { href: "#experiences", label: "Overview", key: "overview" },
    { href: "#services", label: "Services", key: "services" },
    { href: "#process", label: "Process", key: "process" },
    { href: "#testimonials", label: "Testimonials", key: "testimonials" },
    { href: "#cta", label: "Contact", key: "contact" }
  ]
};

const CTA_COPY: Record<
  ExperienceId,
  { intro: string; body: string; button: string }
> = {
  interiors: {
    intro:
      "Tell us what space needs attention and we’ll respond within one business day with next steps and a discovery slot.",
    body:
      "Interiors projects are available nationwide with an Atlanta-based install team.",
    button: "Start an interiors project"
  },
  security: {
    intro:
      "Launch an asset fortification review and we’ll scope in-store plus ecommerce vulnerabilities around your highest-risk flows.",
    body:
      "Asset fortification programs are available across the US with travel and remediation playbooks included.",
    button: "Start fortification"
  },
  ink: {
    intro:
      "Reserve your flash slot or request custom line work. We’ll send the latest drop and schedule your consult.",
    body: "Studio schedules drop monthly and deposits secure your seat.",
    button: "Book Ømnilon Ink"
  },
  financing: {
    intro:
      "Offer consumer financing powered by America's First Finance for mopeds, scooters, iPhones, MacBooks, computers, and PCs.",
    body:
      "Share your product mix and preferred term structure; we’ll reply within one business day.",
    button: "Launch financing"
  }
};

const EXPERIENCE_LABELS: Record<ExperienceId, string> = {
  interiors: "Interiors",
  security: "Asset Fortification",
  ink: "Tattoos",
  financing: "Consumer Financing"
};

const EXPERIENCE_ORDER: ExperienceId[] = ["interiors", "security", "ink", "financing"];

type BrandPageProps = {
  initialExperience?: ExperienceId;
  skipIntro?: boolean;
};

export function BrandPage({ initialExperience = "interiors", skipIntro = false }: BrandPageProps) {
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [showPreloader, setShowPreloader] = useState(false);
  const [entered, setEntered] = useState(false);
  const [activeExperience, setActiveExperience] = useState<ExperienceId>(initialExperience);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);

  useEffect(() => {
    if (skipIntro) {
      setPreloaderDone(true);
      setShowPreloader(false);
      setEntered(true);
      return;
    }
    const seen = hasSeenPreloader();
    const gate = hasEnteredGate();
    setPreloaderDone(seen);
    setShowPreloader(!seen);
    setEntered(gate);
  }, [skipIntro]);

  useEffect(() => {
    setSelectedServiceId(null);
  }, [activeExperience]);

  useEffect(() => {
    if (initialExperience !== activeExperience) {
      setActiveExperience(initialExperience);
      setSelectedServiceId(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialExperience]);

  const handleServiceSelect = (id: string | null) => {
    setSelectedServiceId((current) => {
      if (id === null) {
        return null;
      }

      return current === id ? null : id;
    });
  };

  const navItems = EXPERIENCE_NAV[activeExperience];
  const cta = CTA_COPY[activeExperience];

  const handleExperienceSelect = useCallback((experience: ExperienceId) => {
    setActiveExperience(experience);

    if (typeof window !== "undefined") {
      window.requestAnimationFrame(() => {
        document.getElementById("services")?.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      });
    }
  }, []);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isTyping =
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable);
      if (isTyping) return;
      if (!preloaderDone) return;

      if (!entered && event.key === "Enter") {
        event.preventDefault();
        window.localStorage.setItem("omnilend:hero-entered", "true");
        setEntered(true);
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        const idx = EXPERIENCE_ORDER.indexOf(activeExperience);
        const next = EXPERIENCE_ORDER[(idx + 1) % EXPERIENCE_ORDER.length];
        handleExperienceSelect(next);
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        const idx = EXPERIENCE_ORDER.indexOf(activeExperience);
        const next = EXPERIENCE_ORDER[(idx - 1 + EXPERIENCE_ORDER.length) % EXPERIENCE_ORDER.length];
        handleExperienceSelect(next);
        return;
      }

      if (["1", "2", "3", "4"].includes(event.key)) {
        const next = EXPERIENCE_ORDER[Number(event.key) - 1];
        if (next) {
          event.preventDefault();
          handleExperienceSelect(next);
        }
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [activeExperience, entered, handleExperienceSelect, preloaderDone]);

  return (
    <div id="top" className="relative min-h-screen bg-bg text-white">
      <BrandNavbar
        items={navItems}
        activeExperienceLabel={EXPERIENCE_LABELS[activeExperience]}
        interfaceUnlocked={entered}
      />
      <AnimatePresence>
        {!skipIntro && showPreloader && !preloaderDone ? (
          <Preloader
            key="preloader"
            onComplete={() => {
              setPreloaderDone(true);
              setShowPreloader(false);
            }}
          />
        ) : null}
      </AnimatePresence>
      {!skipIntro && preloaderDone ? (
        <HeroGate
          open={entered}
          onEnter={() => {
            setEntered(true);
          }}
          activeExperienceLabel={EXPERIENCE_LABELS[activeExperience]}
        />
      ) : null}
      {entered ? (
        <motion.main
          className="relative pt-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Section
            id="experiences"
            label="Greeting"
            title="Choose your service"
            intro="Pick interiors, asset fortification, tattoos, or consumer financing through America's First Finance. Each lane shows how we scope work, price clearly, and keep updates consistent."
          >
            <ExperienceDeck
              activeId={activeExperience}
              onSelect={handleExperienceSelect}
            />
            <div className="mt-6 flex flex-wrap gap-3 text-[10px] font-mono uppercase tracking-[0.32em] text-white/60">
              <span className="rounded-full border border-white/10 px-3 py-1">
                1 / 2 / 3 / 4 or ← → switch experiences
              </span>
              {!skipIntro ? (
                <span className="rounded-full border border-white/10 px-3 py-1">
                  Enter unlocks shell
                </span>
              ) : null}
              <span className="rounded-full border border-white/10 px-3 py-1">
                Hover cards for parallax HUD
              </span>
            </div>
            <CornerHudBadge
              label={EXPERIENCE_LABELS[activeExperience].toUpperCase()}
              animateKey={activeExperience}
              position="bottom-right"
              onClick={() => {
                // Placeholder interaction
                console.log("Mini map toggled");
              }}
            />
          </Section>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeExperience}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            >
              {activeExperience === "interiors" ? (
                <>
                  <Section
                    id="services"
                    label="Interiors"
                    title="Interiors services"
                    intro="Intentional residential, staging, and boutique spaces with a transparent process from the first concept to install day."
                  >
                    <ServicesGrid
                      services={INTERIOR_SERVICES}
                      selectedId={selectedServiceId}
                      onSelect={handleServiceSelect}
                    />
                  </Section>

                  <Section
                    id="process"
                    label="Process"
                    title="How interior projects move"
                    intro="Every engagement stays grounded with milestone billing, client-funded purchasing, and calm communication."
                  >
                    <div className="grid gap-6 md:grid-cols-2">
                      {INTERIOR_PROCESS.map((step, index) => (
                        <HudBracket
                          key={step.title}
                          className="h-full bg-white/5 p-6"
                          label={`Step ${index + 1}`}
                        >
                          <div className="flex h-full flex-col gap-4">
                            <h3 className="font-grotesk text-xl font-semibold text-white">
                              {step.title}
                            </h3>
                            <p className="text-sm text-muted">{step.description}</p>
                          </div>
                        </HudBracket>
                      ))}
                    </div>
                  </Section>

                  <Section
                    id="testimonials"
                    label="Client Notes"
                    title="What interiors clients say"
                    intro="A few quick wins from interiors clients who trusted Ømnilon to handle every detail."
                  >
                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                      {INTERIOR_TESTIMONIALS.map((testimonial) => (
                        <HudBracket
                          key={testimonial.quote}
                          className="h-full bg-white/5 p-6"
                          label={testimonial.role}
                        >
                          <blockquote className="flex h-full flex-col justify-between gap-4">
                            <p className="text-sm text-muted">“{testimonial.quote}”</p>
                            <footer className="text-sm font-semibold text-white">
                              {testimonial.author}
                            </footer>
                          </blockquote>
                        </HudBracket>
                      ))}
                    </div>
                  </Section>
                </>
              ) : null}

              {activeExperience === "security" ? (
                <>
                  <Section
                    id="services"
                    label="Asset Fortification"
                    title="Asset fortification services"
                    intro="We stress-test in-store and ecommerce operations so you can close exploitable gaps before they turn into recurring losses."
                  >
                    <ServicesGrid
                      services={SECURITY_SERVICES}
                      selectedId={selectedServiceId}
                      onSelect={handleServiceSelect}
                    />
                  </Section>

                  <Section
                    id="process"
                    label="Engagement Flow"
                    title="How investigations unfold"
                    intro="We align on personas, deploy covert teams, and surface remediation in under 48 hours."
                  >
                    <div className="grid gap-6 md:grid-cols-2">
                      {SECURITY_PROCESS.map((step, index) => (
                        <HudBracket
                          key={step.title}
                          className="h-full bg-white/5 p-6"
                          label={`Phase ${index + 1}`}
                        >
                          <div className="flex h-full flex-col gap-4">
                            <h3 className="font-grotesk text-xl font-semibold text-white">
                              {step.title}
                            </h3>
                            <p className="text-sm text-muted">{step.description}</p>
                          </div>
                        </HudBracket>
                      ))}
                    </div>
                  </Section>

                  <Section
                    id="testimonials"
                    label="Coverage"
                    title="What you receive"
                    intro="Asset fortification engagements align risk personas, run controlled tests, and deliver prioritized fixes for leadership and frontline teams."
                  >
                    <HudBracket className="bg-white/5 p-6" label="Deliverables">
                      <ul className="space-y-3 text-sm text-muted">
                        {SECURITY_COVERAGE.map((item) => (
                          <li key={item} className="flex items-start gap-3">
                            <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-accent-purple" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </HudBracket>
                    <div className="mt-6 grid gap-6 md:grid-cols-2">
                      {SECURITY_PROOF.map((testimonial) => (
                        <HudBracket
                          key={testimonial.quote}
                          className="h-full bg-white/5 p-6"
                          label={testimonial.role}
                        >
                          <blockquote className="flex h-full flex-col justify-between gap-4">
                            <p className="text-sm text-muted">“{testimonial.quote}”</p>
                            <footer className="text-sm font-semibold text-white">
                              {testimonial.author}
                            </footer>
                          </blockquote>
                        </HudBracket>
                      ))}
                    </div>
                  </Section>
                </>
              ) : null}

              {activeExperience === "ink" ? (
                <>
                  <Section
                    id="services"
                    label="Ømnilon Ink"
                    title="Flash, custom, and apprenticeship offerings"
                    intro="Apprentice-led flash, custom line work, and transparent aftercare so every session feels intentional."
                  >
                    <ServicesGrid
                      services={INK_SERVICES}
                      selectedId={selectedServiceId}
                      onSelect={handleServiceSelect}
                    />
                  </Section>

                  <Section
                    id="process"
                    label="Session Flow"
                    title="What the studio experience feels like"
                    intro="Warm check-ins, steady pacing, and clear aftercare support every appointment."
                  >
                    <div className="grid gap-6 md:grid-cols-2">
                      {INK_PROCESS.map((step, index) => (
                        <HudBracket
                          key={step.title}
                          className="h-full bg-white/5 p-6"
                          label={`Phase ${index + 1}`}
                        >
                          <div className="flex h-full flex-col gap-4">
                            <h3 className="font-grotesk text-xl font-semibold text-white">
                              {step.title}
                            </h3>
                            <p className="text-sm text-muted">{step.description}</p>
                          </div>
                        </HudBracket>
                      ))}
                    </div>
                  </Section>

                  <Section
                    id="testimonials"
                    label="Pricing & Deposits"
                    title="Transparent tattoo pricing"
                    intro="Healing support and deposit structure keep the apprenticeship sustainable without surprises."
                  >
                    <HudBracket className="bg-white/5 p-6" label="What to know">
                      <ul className="space-y-3 text-sm text-muted">
                        {INK_PRICING_DETAILS.map((item) => (
                          <li key={item} className="flex items-start gap-3">
                            <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-accent-purple" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </HudBracket>
                    <div className="mt-6 grid gap-6 md:grid-cols-2">
                      {INK_STORIES.map((testimonial) => (
                        <HudBracket
                          key={testimonial.quote}
                          className="h-full bg-white/5 p-6"
                          label={testimonial.role}
                        >
                          <blockquote className="flex h-full flex-col justify-between gap-4">
                            <p className="text-sm text-muted">“{testimonial.quote}”</p>
                            <footer className="text-sm font-semibold text-white">
                              {testimonial.author}
                            </footer>
                          </blockquote>
                        </HudBracket>
                      ))}
                    </div>
                  </Section>
                </>
              ) : null}

              {activeExperience === "financing" ? (
                <>
                  <Section
                    id="services"
                    label="Consumer Financing"
                    title="Finance phones, computers, and mobility products"
                    intro="Launch monthly-payment options for iPhones, MacBooks, computers, PCs, scooters, and mopeds with clear terms."
                  >
                    <ServicesGrid
                      services={FINANCING_SERVICES}
                      selectedId={selectedServiceId}
                      onSelect={handleServiceSelect}
                    />
                  </Section>

                  <Section
                    id="process"
                    label="Flow"
                    title="How financing runs"
                    intro="From program design to launch, every step keeps approvals, terms, and team communication aligned."
                  >
                    <div className="grid gap-6 md:grid-cols-2">
                      {FINANCING_PROCESS.map((step, index) => (
                        <HudBracket
                          key={step.title}
                          className="h-full bg-white/5 p-6"
                          label={`Phase ${index + 1}`}
                        >
                          <div className="flex h-full flex-col gap-4">
                            <h3 className="font-grotesk text-xl font-semibold text-white">
                              {step.title}
                            </h3>
                            <p className="text-sm text-muted">{step.description}</p>
                          </div>
                        </HudBracket>
                      ))}
                    </div>
                  </Section>

                  <Section
                    id="testimonials"
                    label="Proof"
                    title="Financing notes"
                    intro="Signals from teams that launched financing with transparent terms and predictable execution."
                  >
                    <div className="grid gap-6 md:grid-cols-2">
                      {FINANCING_TESTIMONIALS.map(note => (
                        <HudBracket key={note.quote} className="h-full bg-white/5 p-6" label={note.role}>
                          <blockquote className="flex h-full flex-col justify-between gap-4">
                            <p className="text-sm text-muted">“{note.quote}”</p>
                            <footer className="text-sm font-semibold text-white">{note.author}</footer>
                          </blockquote>
                        </HudBracket>
                      ))}
                    </div>
                  </Section>
                </>
              ) : null}

              <Section
                id="cta"
                label="Next Steps"
                title="Tell us where to start."
                intro={cta.intro}
              >
                <HudBracket className="bg-white/5 p-6" label="Contact">
                  <div className="flex flex-col gap-4 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
                    <p>
                      Email
                      {" "}
                      <a
                        href="mailto:omnilend.co@gmail.com"
                        className="underline decoration-dotted underline-offset-4 hover:text-white"
                      >
                        omnilend.co@gmail.com
                      </a>
                      {" "}
                      or call
                      {" "}
                      <a
                        href="tel:14049198026"
                        className="underline decoration-dotted underline-offset-4 hover:text-white"
                      >
                        404-919-8026
                      </a>
                      . {cta.body}
                    </p>
                    <Link
                      href="/contact"
                      className="inline-flex shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 px-6 py-3 font-mono text-[10px] uppercase tracking-[0.36em] text-white transition duration-300 ease-brand hover:border-accent-purple hover:text-accent-purple focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-purple focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                    >
                      {cta.button}
                    </Link>
                  </div>
                </HudBracket>
              </Section>
            </motion.div>
          </AnimatePresence>

          <footer className="border-t border-white/10 bg-black/40">
            <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-4 py-10 text-sm text-muted sm:flex-row sm:px-6 lg:px-8">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.36em] text-accent-purple">
                  Ømnilon Studio
                </span>
                <p className="mt-2 text-sm text-muted">
                  Atlanta, GA &amp; Remote • © {new Date().getFullYear()} Ømnilon
                </p>
              </div>
              <SoundToggle />
            </div>
          </footer>
        </motion.main>
      ) : null}
    </div>
  );
}

type ServicesGridProps = {
  services: ServiceData[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
};

function ServicesGrid({ services, selectedId, onSelect }: ServicesGridProps) {
  const activeService = services.find((service) => service.id === selectedId);

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {services.map((service) => {
          const isActive = selectedId === service.id;

          return (
            <motion.button
              key={service.id}
              type="button"
              onClick={() => onSelect(service.id)}
              className={cn(
                "group relative flex h-full flex-col justify-between rounded-3xl border border-white/10 bg-white/5 p-6 text-left transition duration-300 ease-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-purple focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
                isActive
                  ? "border-accent-purple/70 bg-white/10 shadow-[0_0_30px_rgba(129,140,248,0.35)]"
                  : "hover:border-accent-purple/60 hover:bg-white/10"
              )}
              whileHover={{ translateY: -4 }}
              whileTap={{ scale: 0.98 }}
              aria-expanded={isActive}
            >
              <div className="space-y-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.36em] text-white/60">
                  {service.price}
                </span>
                <h3 className="font-grotesk text-xl font-semibold text-white">
                  {service.title}
                </h3>
                <p className="text-sm text-muted">{service.summary}</p>
              </div>
              <span className="mt-6 inline-flex items-center gap-2 text-sm text-white/80">
                <span className="h-2 w-2 rounded-full bg-accent-purple" />
                Learn more
              </span>
            </motion.button>
          );
        })}
      </div>
      <AnimatePresence mode="wait">
        {activeService ? (
          <motion.div
            key={activeService.id}
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="relative mt-6 overflow-hidden rounded-3xl border border-white/20 bg-white/5 backdrop-blur-2xl"
          >
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-br from-rose-400/40 via-sky-400/30 to-violet-500/40"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -left-24 -top-24 h-48 w-48 rounded-full bg-accent-purple/30 blur-3xl"
              aria-hidden
            />
            <button
              type="button"
              onClick={() => onSelect(null)}
              className="absolute right-5 top-5 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-black/40 text-lg text-white/80 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-purple focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
              aria-label={`Close ${activeService.title} details`}
            >
              ×
            </button>
            <div className="relative z-10 grid gap-6 p-6 sm:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] sm:p-10">
              <div className="space-y-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.36em] text-white/70">
                  {activeService.price}
                </span>
                <h3 className="text-3xl font-semibold text-white sm:text-4xl">
                  {activeService.title}
                </h3>
                <p className="text-sm text-white/80 sm:text-base">
                  {activeService.description}
                </p>
                <div className="grid gap-3 text-sm text-muted sm:grid-cols-2">
                  {activeService.deliverables.map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-2 rounded-2xl border border-white/10 bg-black/40 p-3"
                    >
                      <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-accent-purple" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-3 text-sm text-white/80">
                {activeService.image ? (
                  <div className="relative overflow-hidden rounded-2xl border border-white/10">
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${activeService.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="relative z-10 flex h-full flex-col justify-end gap-2 p-4">
                      <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/70">
                        Visual reference
                      </p>
                      <p className="text-sm text-white/90">
                        Imagery matches the service vibe—material palettes, staged sets, or flash closeups.
                      </p>
                    </div>
                  </div>
                ) : null}
                <div className="space-y-2 rounded-2xl border border-white/10 bg-black/50 p-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.36em] text-white/70">
                    Booking checklist
                  </p>
                  <ul className="space-y-2 text-sm text-white/80">
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-accent-purple" />
                      Share timing, budget, and references up front.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-accent-purple" />
                      Expect a scoped agenda within one business day.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-accent-purple" />
                      Deposits and receipts stay transparent.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
