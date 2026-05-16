"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowUpRight,
  BadgeDollarSign,
  BriefcaseBusiness,
  FileText,
  Inbox,
  LockKeyhole,
  LogOut,
  Mail,
  MessageSquareText,
  Phone,
  RefreshCw,
  ShieldCheck,
  UserRound
} from "lucide-react";
import type { AdminUser } from "@/lib/admin/session";
import type { PayrollStatement } from "@/lib/admin/payroll";

type AdminTab = "overview" | "payroll" | "leads" | "documents" | "settings";
type AdminLead = {
  leadId: string;
  division: "interiors" | "asset-fortification" | "finance";
  name: string;
  email: string;
  phone?: string;
  budget?: string;
  serviceInterest?: string;
  message: string;
  sourcePath?: string;
  status: "new";
  createdAt: string;
  userAgent?: string;
};

const tabs: Array<{ id: AdminTab; label: string }> = [
  { id: "overview", label: "Overview" },
  { id: "payroll", label: "Payroll information" },
  { id: "leads", label: "Lead desk" },
  { id: "documents", label: "Documents" },
  { id: "settings", label: "Settings" }
];

const divisionLabels: Record<AdminLead["division"], string> = {
  interiors: "Interiors",
  "asset-fortification": "Asset Fortification",
  finance: "Finance"
};

export function AdminDashboard({
  user,
  payrollStatements
}: {
  user: AdminUser;
  payrollStatements: PayrollStatement[];
}) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<AdminTab>("payroll");
  const [selectedStatementId, setSelectedStatementId] = useState(payrollStatements[0]?.id ?? "");

  const selectedStatement = useMemo(
    () => payrollStatements.find((statement) => statement.id === selectedStatementId) ?? payrollStatements[0],
    [payrollStatements, selectedStatementId]
  );

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-[#040404] text-white">
      <div className="border-b border-white/10 bg-black/75 px-5 py-4 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-4">
          <a href="/" className="inline-flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center border border-white/20 font-mono text-sm">
              Ø
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.34em] text-white/70">
              OmniLend employee admin
            </span>
          </a>

          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-medium">{user.name}</p>
              <p className="font-mono text-[0.64rem] uppercase tracking-[0.2em] text-white/42">
                {user.role}
              </p>
            </div>
            <div className="grid h-10 w-10 place-items-center rounded-full bg-white text-sm font-semibold text-black">
              {user.initials}
            </div>
            <button
              type="button"
              onClick={logout}
              className="grid h-10 w-10 place-items-center border border-white/14 text-white/60 transition hover:border-white/40 hover:text-white"
              aria-label="Sign out"
            >
              <LogOut size={17} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      <section className="mx-auto grid w-full max-w-7xl gap-8 px-5 py-8 lg:grid-cols-[18rem_1fr]">
        <aside className="space-y-5">
          <div className="border border-white/12 bg-white/[0.045] p-5">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.32em] text-white/42">
              employee profile
            </p>
            <div className="mt-5 flex items-center gap-4">
              <div className="grid h-14 w-14 place-items-center rounded-full bg-white text-lg font-semibold text-black">
                {user.initials}
              </div>
              <div>
                <h1 className="text-xl font-semibold tracking-[-0.03em]">{user.name}</h1>
                <p className="text-sm text-white/52">{user.email}</p>
              </div>
            </div>
          </div>

          <nav className="grid gap-2" aria-label="Employee admin tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                aria-pressed={activeTab === tab.id}
                className={`flex items-center justify-between border px-4 py-3 text-left font-mono text-[0.68rem] uppercase tracking-[0.2em] transition ${
                  activeTab === tab.id
                    ? "border-white bg-white text-black"
                    : "border-white/12 bg-white/[0.035] text-white/58 hover:border-white/34 hover:text-white"
                }`}
              >
                <span>{tab.label}</span>
                <ArrowUpRight size={14} aria-hidden="true" />
              </button>
            ))}
          </nav>
        </aside>

        <div className="min-w-0">
          {activeTab === "overview" ? <OverviewPanel user={user} /> : null}
          {activeTab === "payroll" && selectedStatement ? (
            <PayrollPanel
              statements={payrollStatements}
              selectedStatement={selectedStatement}
              onSelect={setSelectedStatementId}
            />
          ) : null}
          {activeTab === "leads" ? <LeadDeskPanel /> : null}
          {activeTab === "documents" ? <UtilityPanel type="documents" /> : null}
          {activeTab === "settings" ? <UtilityPanel type="settings" /> : null}
        </div>
      </section>
    </main>
  );
}

function OverviewPanel({ user }: { user: AdminUser }) {
  return (
    <section className="space-y-6">
      <div className="border border-white/12 bg-white/[0.045] p-6 sm:p-8">
        <p className="font-mono text-[0.68rem] uppercase tracking-[0.34em] text-white/42">
          command overview
        </p>
        <h2 className="mt-5 max-w-3xl text-4xl font-semibold uppercase leading-[0.95] tracking-[-0.05em] sm:text-6xl">
          Employee workspace for {user.name}.
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-7 text-white/58">
          Centralized access for payroll packets, profile records, internal documents, and
          incoming OmniLend operating activity.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <StatusCard icon={<BadgeDollarSign size={19} />} label="Payroll" value="ACH packet attached" />
        <StatusCard icon={<ShieldCheck size={19} />} label="Access" value="Admin session active" />
        <StatusCard icon={<BriefcaseBusiness size={19} />} label="Role" value={user.role} />
      </div>
    </section>
  );
}

function PayrollPanel({
  statements,
  selectedStatement,
  onSelect
}: {
  statements: PayrollStatement[];
  selectedStatement: PayrollStatement;
  onSelect: (statementId: string) => void;
}) {
  const viewerUrl = `/api/admin/payroll/${selectedStatement.documentId}#page=${selectedStatement.page}&view=FitH`;

  return (
    <section className="grid gap-5 xl:grid-cols-[22rem_1fr]">
      <div className="space-y-5">
        <div className="border border-white/12 bg-white/[0.045] p-5">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.34em] text-white/42">
            payroll information
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em]">Earnings statements</h2>
          <p className="mt-3 text-sm leading-6 text-white/55">
            Select a payroll period to view the protected ACH earnings statement packet.
          </p>
        </div>

        <div className="grid gap-3">
          {statements.map((statement) => (
            <button
              key={statement.id}
              type="button"
              onClick={() => onSelect(statement.id)}
              className={`border p-4 text-left transition ${
                selectedStatement.id === statement.id
                  ? "border-white bg-white text-black"
                  : "border-white/12 bg-white/[0.035] text-white hover:border-white/34"
              }`}
            >
              <span className="font-mono text-[0.65rem] uppercase tracking-[0.28em] opacity-60">
                {statement.period}
              </span>
              <span className="mt-2 block text-lg font-semibold tracking-[-0.03em]">
                {statement.title}
              </span>
              <span className="mt-3 flex items-center gap-2 text-sm opacity-70">
                <FileText size={15} aria-hidden="true" />
                {statement.source}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="min-h-[42rem] overflow-hidden border border-white/12 bg-white/[0.045]">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
          <div>
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.28em] text-white/42">
              active statement
            </p>
            <h3 className="mt-1 font-medium">{selectedStatement.title}</h3>
          </div>
          <a
            href={viewerUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 border border-white/16 px-3 py-2 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-white/65 transition hover:border-white/44 hover:text-white"
          >
            Open PDF
            <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        </div>
        <iframe
          key={viewerUrl}
          src={viewerUrl}
          title={selectedStatement.title}
          className="h-[72vh] min-h-[38rem] w-full bg-white"
        />
      </div>
    </section>
  );
}

function LeadDeskPanel() {
  const [leads, setLeads] = useState<AdminLead[]>([]);
  const [selectedLeadId, setSelectedLeadId] = useState("");
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [error, setError] = useState("");

  const selectedLead = useMemo(
    () => leads.find((lead) => lead.leadId === selectedLeadId) ?? leads[0],
    [leads, selectedLeadId]
  );

  const divisionCounts = useMemo(
    () =>
      leads.reduce(
        (counts, lead) => {
          counts[lead.division] += 1;
          return counts;
        },
        { interiors: 0, "asset-fortification": 0, finance: 0 } as Record<AdminLead["division"], number>
      ),
    [leads]
  );

  const loadLeads = useCallback(async () => {
    setStatus("loading");
    setError("");

    try {
      const response = await fetch("/api/admin/leads", { cache: "no-store" });
      const body = (await response.json().catch(() => null)) as
        | { ok: true; leads: AdminLead[] }
        | { ok: false; error: string }
        | null;

      if (!response.ok || !body) {
        throw new Error("Lead inbox is not available.");
      }

      if (!body.ok) {
        throw new Error(body.error);
      }

      setLeads(body.leads);
      setSelectedLeadId((current) =>
        body.leads.some((lead) => lead.leadId === current) ? current : body.leads[0]?.leadId || ""
      );
      setStatus("ready");
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Lead inbox is not available.");
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    void loadLeads();
  }, [loadLeads]);

  return (
    <section className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-4 border border-white/12 bg-white/[0.045] p-6 sm:p-8">
        <div>
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.34em] text-white/42">
            inquiry routing
          </p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em]">Lead desk</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/55">
            Messages submitted from the public division forms, grouped by source section and
            stored through the OmniLend lead capture endpoint.
          </p>
        </div>
        <button
          type="button"
          onClick={() => void loadLeads()}
          disabled={status === "loading"}
          className="inline-flex items-center gap-2 border border-white/16 px-4 py-3 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-white/65 transition hover:border-white/44 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
        >
          <RefreshCw size={14} aria-hidden="true" />
          Refresh
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <StatusCard icon={<Inbox size={19} />} label="Total inquiries" value={String(leads.length)} />
        <StatusCard
          icon={<MessageSquareText size={19} />}
          label="Interiors"
          value={String(divisionCounts.interiors)}
        />
        <StatusCard
          icon={<ShieldCheck size={19} />}
          label="Asset fortification"
          value={String(divisionCounts["asset-fortification"])}
        />
        <StatusCard
          icon={<BadgeDollarSign size={19} />}
          label="Finance"
          value={String(divisionCounts.finance)}
        />
      </div>

      {status === "error" ? (
        <div className="border border-red-300/25 bg-red-500/10 p-5">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-red-200">
            {error}
          </p>
        </div>
      ) : null}

      {status === "loading" && leads.length === 0 ? (
        <div className="border border-white/12 bg-white/[0.045] p-8 text-white/55">
          Loading inquiries...
        </div>
      ) : null}

      {status === "ready" && leads.length === 0 ? (
        <div className="border border-white/12 bg-white/[0.045] p-8">
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.3em] text-white/42">
            no inquiries yet
          </p>
          <p className="mt-3 text-sm leading-6 text-white/55">
            New division form submissions will appear here after DynamoDB stores them.
          </p>
        </div>
      ) : null}

      {leads.length > 0 && selectedLead ? (
        <div className="grid gap-5 xl:grid-cols-[24rem_1fr]">
          <div className="grid max-h-[48rem] gap-3 overflow-auto pr-1">
            {leads.map((lead) => (
              <button
                key={lead.leadId}
                type="button"
                onClick={() => setSelectedLeadId(lead.leadId)}
                aria-pressed={selectedLead.leadId === lead.leadId}
                className={`border p-4 text-left transition ${
                  selectedLead.leadId === lead.leadId
                    ? "border-white bg-white text-black"
                    : "border-white/12 bg-white/[0.035] text-white hover:border-white/34"
                }`}
              >
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.24em] opacity-60">
                  {divisionLabels[lead.division]} / {formatDate(lead.createdAt)}
                </span>
                <span className="mt-2 block text-lg font-semibold tracking-[-0.03em]">
                  {lead.name}
                </span>
                <span className="mt-2 block truncate text-sm opacity-70">
                  {lead.serviceInterest || "General inquiry"}
                </span>
              </button>
            ))}
          </div>

          <article className="border border-white/12 bg-white/[0.045]">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/10 p-5">
              <div>
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.28em] text-white/42">
                  {divisionLabels[selectedLead.division]} inquiry
                </p>
                <h3 className="mt-2 text-3xl font-semibold tracking-[-0.04em]">
                  {selectedLead.name}
                </h3>
              </div>
              <span className="border border-white/14 px-3 py-2 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-white/55">
                {selectedLead.status}
              </span>
            </div>

            <div className="grid gap-5 p-5 lg:grid-cols-2">
              <DetailItem icon={<Mail size={15} />} label="Email" value={selectedLead.email} />
              <DetailItem
                icon={<Phone size={15} />}
                label="Phone"
                value={selectedLead.phone || "Not provided"}
              />
              <DetailItem
                icon={<BriefcaseBusiness size={15} />}
                label="Interest"
                value={selectedLead.serviceInterest || "Not provided"}
              />
              <DetailItem
                icon={<BadgeDollarSign size={15} />}
                label="Budget / amount"
                value={selectedLead.budget || "Not provided"}
              />
              <DetailItem
                icon={<ArrowUpRight size={15} />}
                label="Source section"
                value={`${divisionLabels[selectedLead.division]} (${selectedLead.sourcePath || "/"})`}
              />
              <DetailItem
                icon={<MessageSquareText size={15} />}
                label="Received"
                value={formatDate(selectedLead.createdAt)}
              />
            </div>

            <div className="border-t border-white/10 p-5">
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.28em] text-white/42">
                Message
              </p>
              <p className="mt-4 whitespace-pre-wrap text-base leading-7 text-white/72">
                {selectedLead.message}
              </p>
            </div>
          </article>
        </div>
      ) : null}
    </section>
  );
}

function DetailItem({
  icon,
  label,
  value
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="border border-white/10 bg-black/20 p-4">
      <div className="flex items-center gap-2 text-white/42">
        {icon}
        <span className="font-mono text-[0.62rem] uppercase tracking-[0.24em]">{label}</span>
      </div>
      <p className="mt-3 break-words text-sm leading-6 text-white/72">{value}</p>
    </div>
  );
}

function formatDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(date);
}

function UtilityPanel({ type }: { type: "documents" | "settings" }) {
  const copy = {
    documents: {
      icon: <FileText size={20} />,
      title: "Documents",
      body: "Internal document slots are ready for protected operating files, policy records, and employee attachments."
    },
    settings: {
      icon: <LockKeyhole size={20} />,
      title: "Settings",
      body: "Profile, password, and storage settings should remain environment-backed so secrets do not enter the public repository."
    }
  }[type];

  return (
    <section className="border border-white/12 bg-white/[0.045] p-6 sm:p-8">
      <div className="grid h-12 w-12 place-items-center border border-white/15 text-white/65">
        {copy.icon}
      </div>
      <h2 className="mt-6 text-4xl font-semibold tracking-[-0.05em]">{copy.title}</h2>
      <p className="mt-4 max-w-2xl text-base leading-7 text-white/58">{copy.body}</p>
    </section>
  );
}

function StatusCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <article className="border border-white/12 bg-white/[0.045] p-5">
      <div className="flex items-center justify-between text-white/60">
        {icon}
        <UserRound size={16} aria-hidden="true" />
      </div>
      <p className="mt-5 font-mono text-[0.62rem] uppercase tracking-[0.28em] text-white/38">
        {label}
      </p>
      <p className="mt-2 text-lg font-medium tracking-[-0.02em]">{value}</p>
    </article>
  );
}
