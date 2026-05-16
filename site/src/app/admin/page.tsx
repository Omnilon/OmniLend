import type { Metadata } from "next";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { requireAdminSession } from "@/lib/admin/session";
import { payrollStatements } from "@/lib/admin/payroll";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "OmniLend Employee Admin"
};

export default function AdminPage() {
  const session = requireAdminSession();

  return <AdminDashboard user={session} payrollStatements={payrollStatements} />;
}
