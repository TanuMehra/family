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


      
      {/* Dark Mode Toggle Button - Fixed Position */}
      <button
        onClick={toggleDarkMode}
        className="fixed top-8 left-8 z-[110] flex h-12 w-12 items-center justify-center rounded-full glass shadow-xl transition-all hover:scale-110 active:scale-90"
        aria-label="Toggle Dark Mode"
      >
        <span className="text-xl">
          {isDarkMode ? "☀️" : "🌙"}
        </span>
      </button>

      {children}
    </div>
  );
}
