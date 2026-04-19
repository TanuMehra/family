"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

/**
 * Premium Upgrade - Landing Page
 * Features:
 * - Theme-aware styling (Light/Dark mode)
 * - Industrial-grade hero animations
 * - Responsive typographic scale
 * - Glassmorphism immersive action button
 */
export default function LandingPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration flicker
  if (!mounted) return null;

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
      
      {/* 🔮 Central Hero Section */}
      <div className="z-10 flex flex-col items-center space-y-12 animate-fade-in-up">
        
        {/* Animated Badge */}
        <div className="inline-block px-6 py-2 rounded-full glass text-primary font-black uppercase tracking-[0.4em] text-[10px] animate-pulse">
          Preserving Our Stories 🏡
        </div>

        {/* Main Hero Header */}
        <div className="space-y-6 max-w-5xl">
          <h1 className="text-6xl font-black tracking-tighter sm:text-8xl md:text-9xl leading-[0.85] dark:text-white text-gray-800 transition-all duration-700">
            Family Memory <br />
            <span className="text-primary italic">Vault ❤️</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-xl md:text-2xl font-medium text-gray-500 dark:text-gray-400 italic leading-relaxed opacity-80 transition-opacity stagger-2">
            "Because some moments are too precious to stay only as memories." Save and relive your family's journey in your private, beautiful space.
          </p>
        </div>

        {/* Immersive CTA Button */}
        <div className="pt-6 w-full sm:w-auto">
          <Link
            href="/dashboard"
            className="
              group relative flex items-center justify-center rounded-[3rem] 
              bg-primary px-16 py-8 text-3xl font-black text-white 
              shadow-[0_40px_80px_-20px_rgba(255,148,120,0.4)] 
              transition-all duration-500 ease-out 
              hover:scale-110 hover:shadow-primary/60
              active:scale-95
              w-full sm:w-auto overflow-hidden
            "
          >
            {/* Glass Shine & Text Animation */}
            <span className="relative z-20 transition-transform duration-500 group-hover:-translate-y-1 block">
              Enter Our Space 🏡
            </span>
            
            {/* Decorative Inner Glow */}
            <div className="absolute inset-x-0 bottom-0 h-4 w-full bg-white/20 translate-y-4 group-hover:translate-y-0 transition-all duration-500" />
            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
            
            {/* Hover Glow Ripple */}
            <div className="absolute -inset-24 bg-primary/20 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-full" />
          </Link>
        </div>
      </div>

      {/* Subtle Bottom Attribution */}
      <footer className="absolute bottom-12 text-[10px] font-black uppercase tracking-[0.6em] text-gray-400/50 select-none animate-fade-in-up stagger-4 lg:bottom-16">
        Private Family Vault &bull; 2024
      </footer>
    </main>
  );
}
