import type { Metadata } from "next";
import { LoginForm } from "@/components/admin/LoginForm";

export const metadata: Metadata = {
  title: "Admin Login"
};

export default function AdminLoginPage() {
  return (
    <main className="min-h-screen bg-[#050505] px-5 py-6 text-white">
      <section className="mx-auto grid min-h-[calc(100vh-3rem)] w-full max-w-6xl items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-8">
          <a href="/" className="inline-grid gap-1" aria-label="Open OmniLend gateway">
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.5em] text-white/45">
              omnilend.pro
            </span>
            <span className="text-2xl font-semibold uppercase tracking-[0.22em] text-white">
              ØMNILON
            </span>
          </a>

          <div className="max-w-xl space-y-5">
            <p className="font-mono text-xs uppercase tracking-[0.38em] text-white/45">
              employee access
            </p>
            <h1 className="text-balance text-5xl font-semibold uppercase leading-[0.9] tracking-[-0.05em] sm:text-7xl">
              Administrative command.
            </h1>
            <p className="max-w-lg text-base leading-7 text-white/62">
              Private payroll, profile, document, and operating records for the OmniLend
              employee workspace.
            </p>
          </div>
        </div>

        <LoginForm />
      </section>
    </main>
  );
}
