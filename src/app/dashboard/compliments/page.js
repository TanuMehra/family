"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

/**
 * Premium Compliments Page
 * A curated collection of kindness and sweet thoughts for the family.
 */
export default function ComplimentsPage() {
  const [compliments, setCompliments] = useState([]);
  
  useEffect(() => {
    // Shared family compliments
    setCompliments([
      { id: 1, text: "Your smile is the most beautiful thing in this house. 😊", from: "The Family" },
      { id: 2, text: "Thank you for always listening when I need to talk. ❤️", from: "Someone who loves you" },
      { id: 3, text: "You are the glue that holds our family together. 🏡", from: "Home" },
      { id: 4, text: "Your kindness is your greatest strength. ✨", from: "Your Secret Admirer" },
      { id: 5, text: "I'm so proud of the person you are becoming. 🌟", from: "Proud Guardian" },
      { id: 6, text: "Every day with you is a gift. 🎁", from: "Family Heart" },
    ]);
  }, []);

  return (
    <main className="min-h-screen p-6 md:p-14 pb-48 animate-fade-in-up">
      <header className="mb-20 flex flex-col items-center justify-between gap-10 md:flex-row">
        <div className="text-center md:text-left flex flex-col md:flex-row items-center gap-8">
          <Link href="/dashboard" className="text-4xl hover:scale-110 transition-all bg-white/20 p-6 rounded-full glass shadow-2xl">🏡</Link>
          <div className="space-y-2">
            <h1 className="text-7xl font-black text-gray-800 dark:text-white tracking-tighter">Kind Words ✨</h1>
            <p className="text-2xl font-bold text-gray-400 dark:text-gray-500 italic opacity-80">A repository of family love and kindness.</p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {compliments.map((comp, idx) => (
          <div 
            key={comp.id} 
            className={`
              relative rounded-[3rem] glass p-10 md:p-14 shadow-2xl border border-white/20 dark:border-white/5 space-y-8 
              hover:scale-[1.03] hover:shadow-primary/20 transition-all duration-500 group overflow-hidden
              animate-fade-in-up
            `}
            style={{ animationDelay: `${idx * 0.15}s` }}
          >
            {/* Subtle Gradient Accent */}
            <div className="absolute top-0 right-0 h-32 w-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-primary/10 transition-colors" />

            <div className="text-6xl group-hover:rotate-12 group-hover:scale-125 transition-transform duration-700 select-none">💌</div>
            <p className="text-3xl font-black text-gray-700 dark:text-gray-100 leading-[1.1] tracking-tighter">
              "{comp.text}"
            </p>
            <div className="pt-8 flex items-center gap-4">
              <div className="h-px bg-primary/20 flex-1" />
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary whitespace-nowrap">
                — {comp.from}
              </span>
            </div>
          </div>
        ))}
      </div>

      <footer className="mt-40 text-center opacity-30 select-none text-[10px] font-black uppercase tracking-[0.8em]">
        Kindness is the heartbeat of home.
      </footer>
    </main>
  );
}
