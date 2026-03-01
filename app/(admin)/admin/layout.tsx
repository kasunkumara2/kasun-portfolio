import { requireAdmin } from "@/lib/admin";
import { AdminShell } from "@/components/admin/AdminShell";

export const dynamic = "force-dynamic";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  requireAdmin();
  return <AdminShell>{children}</AdminShell>;
}
