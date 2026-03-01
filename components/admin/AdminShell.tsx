import { AdminSidebar } from "@/components/admin/AdminSidebar";

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-hero-gradient">
      <div className="mx-auto max-w-6xl px-5 md:px-8 py-10">
        <div className="grid lg:grid-cols-[260px_1fr] gap-6 items-start">
          <AdminSidebar />
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}
