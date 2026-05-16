"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, LockKeyhole } from "lucide-react";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submitLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const result = (await response.json()) as { ok: boolean; error?: string };

      if (!response.ok || !result.ok) {
        setError(result.error ?? "Login failed.");
        return;
      }

      router.replace("/admin");
      router.refresh();
    } catch {
      setError("Unable to reach the admin login endpoint.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={submitLogin}
      className="relative overflow-hidden border border-white/18 bg-white/[0.06] p-6 shadow-[0_40px_120px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-8"
    >
      <div className="absolute right-6 top-6 rounded-full border border-white/15 bg-white/[0.04] p-3 text-white/70">
        <LockKeyhole size={18} aria-hidden="true" />
      </div>

      <div className="space-y-2 pr-16">
        <p className="font-mono text-[0.68rem] uppercase tracking-[0.34em] text-white/45">
          secure employee login
        </p>
        <h2 className="text-3xl font-semibold tracking-[-0.04em]">Employee portal</h2>
        <p className="max-w-md text-sm leading-6 text-white/50">
          Use your assigned OmniLend credentials to continue.
        </p>
      </div>

      <div className="mt-8 grid gap-5">
        <label className="grid gap-2">
          <span className="font-mono text-[0.68rem] uppercase tracking-[0.26em] text-white/45">
            Email
          </span>
          <input
            type="text"
            inputMode="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="username"
            placeholder="employee@omnilend.pro"
            className="border border-white/14 bg-black/35 px-4 py-3 text-base text-white outline-none transition focus:border-white/60"
            required
          />
        </label>

        <label className="grid gap-2">
          <span className="font-mono text-[0.68rem] uppercase tracking-[0.26em] text-white/45">
            Password
          </span>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            className="border border-white/14 bg-black/35 px-4 py-3 text-base text-white outline-none transition focus:border-white/60"
            required
          />
        </label>
      </div>

      {error ? (
        <p className="mt-5 border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={loading}
        className="mt-7 inline-flex w-full items-center justify-between bg-white px-5 py-4 font-mono text-[0.72rem] uppercase tracking-[0.28em] text-black transition hover:bg-white/86 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <span>{loading ? "Authenticating" : "Enter admin"}</span>
        <ArrowRight size={18} aria-hidden="true" />
      </button>
    </form>
  );
}
