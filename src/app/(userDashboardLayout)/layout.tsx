import DashboardNavbar from "@/components/ui/Dashboard/DashboardNavbar/DashboardNavbar";
import DashboardSidebar from "@/components/ui/Dashboard/DashboardSidebar/DashboardSidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pawfect | Dashboard",
  description:
    "Your ultimate platform for pet care tips, stories, and nutrition advice. Explore and share knowledge to keep your pets happy and healthy.",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <DashboardSidebar />
      <div className="flex flex-col">
        <DashboardNavbar />
        {children}
      </div>
    </div>
  );
}
