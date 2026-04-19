"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Sidebar Component for Desktop Dashboard
 * 
 * Features:
 * - Fixed left positioning
 * - Active route highlighting
 * - Warm hover effects
 */
export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/dashboard", icon: "🏠" },
    { name: "Memories", href: "/dashboard/memories", icon: "📸" },
  ];

  return (
    <aside className="hidden h-screen w-80 flex-col border-r border-white/20 glass p-10 lg:flex sticky top-0 z-50 shrink-0">
      <div className="mb-14 px-2">
        <h2 className="text-4xl font-black text-primary tracking-tighter truncate">Vault 🏡</h2>
        <p className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mt-2 opacity-60">Family Moments</p>
      </div>

      <nav className="flex-1 space-y-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`
                group flex items-center gap-5 rounded-[2.5rem] px-8 py-5 text-xl font-bold transition-all duration-500
                ${isActive 
                  ? "bg-white dark:bg-primary text-primary dark:text-white shadow-2xl scale-105 border border-primary/10" 
                  : "text-gray-400 dark:text-gray-500 hover:bg-white/40 dark:hover:bg-white/5 hover:text-primary hover:translate-x-3"}
              `}
            >
              <span className="text-3xl transition-transform duration-500 group-hover:scale-125 group-hover:rotate-12">{item.icon}</span>
              <span className="truncate">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto rounded-[3rem] bg-secondary/10 dark:bg-white/5 p-8 text-center border border-white/40 dark:border-white/5">
        <p className="text-[11px] font-black text-primary uppercase tracking-[0.3em] opacity-50">Our Private Vault ✨</p>
      </div>
    </aside>
  );
}


