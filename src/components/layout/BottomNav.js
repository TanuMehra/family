"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Bottom Navigation Component for Mobile Dashboard
 * 
 * Features:
 * - Fixed bottom positioning
 * - Icon-focused design for small screens
 * - Active route indicators
 */
export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/dashboard", icon: "🏠" },
    { name: "Memories", href: "/dashboard/memories", icon: "📸" },
  ];


  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex h-20 w-[90%] items-center justify-around rounded-[2.5rem] glass shadow-2xl px-6 lg:hidden">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.name}
            href={item.href}
            className={`
              flex flex-col items-center gap-1 rounded-2xl px-6 py-2 transition-all duration-300
              ${isActive 
                ? "bg-white dark:bg-primary text-primary dark:text-white shadow-lg scale-110" 
                : "text-gray-400 dark:text-gray-500 hover:text-primary"}
            `}
          >
            <span className="text-2xl">{item.icon}</span>
            <span className="text-[10px] font-black uppercase tracking-widest">{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}
