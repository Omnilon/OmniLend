"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowUpRight,
  BadgeDollarSign,
  BriefcaseBusiness,
  FileText,
  LockKeyhole,
  LogOut,
  ShieldCheck,
  UserRound
} from "lucide-react";
import type { AdminUser } from "@/lib/admin/session";
import type { PayrollStatement } from "@/lib/admin/payroll";

type AdminTab = "overview" | "payroll" | "leads" | "documents" | "settings";

const tabs: Array<{ id: AdminTab; label: string }> = [
  { id: "overview", label: "Overview" },
  { id: "payroll", label: "Payroll information" },
  { id: "leads", label: "Lead desk" },
  { id: "documents", label: "Documents" },
  { id: "settings", label: "Settings" }
];

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
          {activeTab === "leads" ? <UtilityPanel type="leads" /> : null}
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

function UtilityPanel({ type }: { type: "leads" | "documents" | "settings" }) {
  const copy = {
    leads: {
      icon: <BriefcaseBusiness size={20} />,
      title: "Lead desk",
      body: "Lead capture is already routed through the OmniLend AWS endpoint. This tab is reserved for the authenticated lead review surface."
    },
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
