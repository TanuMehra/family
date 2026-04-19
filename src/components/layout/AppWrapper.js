"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import GlobalMusicPlayer from "@/components/ui/GlobalMusicPlayer";

// Import FloatingHearts with ssr: false to fix Hydration errors permanently
const FloatingHearts = dynamic(() => import("@/components/ui/FloatingHearts"), { ssr: false });

export default function AppWrapper({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const nextMode = !isDarkMode;
    setIsDarkMode(nextMode);
    if (nextMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  if (!mounted) return <div className="bg-[#FFFBF7] min-h-screen" />;

  return (
    <div className="min-h-screen">
      {/* 🔮 Background Layer: Animations & Decor */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
         {/* Moving Blur Circles */}
         <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-rose-200/20 dark:bg-rose-900/10 rounded-full blur-[120px] animate-move-blur" />
         <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-peach-200/20 dark:bg-orange-900/10 rounded-full blur-[100px] animate-move-blur" style={{ animationDelay: '-5s' }} />
         
         <FloatingHearts />
      </div>

      <GlobalMusicPlayer />


      
      {/* 🌓 Premium Dark Mode Toggle */}
      <button
        onClick={toggleDarkMode}
        className="fixed top-8 left-8 z-[110] flex h-14 w-14 items-center justify-center rounded-2xl glass border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-500 hover:scale-110 active:scale-95 group overflow-hidden"
        aria-label="Toggle Dark Mode"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <span className="text-2xl transform transition-transform duration-700 group-hover:rotate-[360deg]">
          {isDarkMode ? "☀️" : "🌙"}
        </span>
      </button>

      {children}
    </div>
  );
}
