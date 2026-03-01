"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  FolderKanban,
  MessageSquare,
  Settings,
  LogOut,
  Palette,
  BarChart3,
  MapPin,
  Star,
  Briefcase,
  HelpCircle,
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  // If on login page, don't show the layout shell
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  // Prevent hydration mismatch
  if (!mounted) {
    return <div className="min-h-screen bg-neutral-50 flex items-center justify-center"></div>;
  }

  const navItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Projects", href: "/admin/projects", icon: FolderKanban },
    { name: "Services", href: "/admin/services", icon: Palette },
    { name: "Testimonials", href: "/admin/testimonials", icon: MessageSquare },
    { name: "Why Choose Us", href: "/admin/why-choose-us", icon: Star },
    { name: "Locations", href: "/admin/locations", icon: MapPin },
    { name: "Careers", href: "/admin/careers", icon: Briefcase },
    { name: "Consultation", href: "/admin/consultation", icon: HelpCircle },
    { name: "Stats & Settings", href: "/admin/settings", icon: BarChart3 },
    { name: "General Settings", href: "/admin/general", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-neutral-900 text-white fixed h-full z-10 hidden md:flex flex-col">
        <div className="p-6 border-b border-neutral-800">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center font-bold text-neutral-900">D</div>
            <span className="font-display font-medium tracking-wide">ADMIN PANEL</span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive
                  ? "bg-primary-500 text-white shadow-lg shadow-primary-500/20"
                  : "text-neutral-400 hover:bg-neutral-800 hover:text-white"
                  }`}
              >
                <Icon className="h-5 w-5" />
                <span className="font-sans font-medium text-sm">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-neutral-800">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 px-4 py-3 w-full rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span className="font-sans font-medium text-sm">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-8">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
