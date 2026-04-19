"use client";

import { useState } from "react";
import Link from "next/link";

/**
 * Premium Virtual Hug Page
 * An interactive emotional experience for family members.
 */
export default function HugPage() {
  const [hugCount, setHugCount] = useState(0);
  const [isHugging, setIsHugging] = useState(false);

  const sendHug = () => {
    setIsHugging(true);
    setHugCount(prev => prev + 1);
    const audio = new Audio('/haptic.mp3').play().catch(() => {}); // Optional haptic feedback
    
    setTimeout(() => {
      setIsHugging(false);
    }, 1500);
  };

  return (
    <main className="min-h-screen p-6 md:p-14 pb-48 flex flex-col items-center justify-center overflow-hidden">
      
      {/* Immersive Header */}
      <header className="absolute top-10 left-10 md:top-14 md:left-14 flex items-center gap-6 animate-fade-in-up">
        <Link href="/dashboard" className="text-4xl hover:scale-110 transition-all bg-white/20 p-6 rounded-full glass shadow-2xl">🏡</Link>
        <div className="hidden md:block">
           <h1 className="text-4xl font-black text-gray-800 dark:text-white tracking-tighter">Virtual Hug 🫂</h1>
        </div>
      </header>

      {/* 🔮 Central Interactive Heart */}
      <div className="relative flex flex-col items-center justify-center space-y-12 md:space-y-16 animate-fade-in-up">
        
        <div className="text-center space-y-4 max-w-2xl px-6">
           <h2 className="text-4xl md:text-8xl font-black text-gray-800 dark:text-white tracking-tighter leading-[1.1]">
             Sometimes, a hug is all <br />
             <span className="text-primary italic font-serif">you need. ❤️</span>
           </h2>
           <p className="text-lg md:text-2xl font-bold text-gray-400 italic">
             Tap the heart to send a warm virtual hug.
           </p>
        </div>

        {/* The Action Button */}
        <div className="relative flex items-center justify-center">
            {/* 💎 Outer Glass Ring decor */}
            <div className={`absolute inset-[-20px] rounded-full border-2 border-white/10 glass transition-all duration-1000 ${isHugging ? 'scale-110 opacity-100' : 'scale-95 opacity-40'}`} />
            
            <button 
              onClick={sendHug}
              className={`
                relative group flex items-center justify-center h-64 w-64 md:h-[400px] md:w-[400px] rounded-full transition-all duration-700
                ${isHugging ? 'scale-110 shadow-[0_0_100px_rgba(255,148,120,0.4)]' : 'hover:scale-105 shadow-2xl'}
                bg-gradient-to-tr from-primary/10 via-white/5 to-primary/5 glass border-white/20
              `}
            >
               {/* Pulsing Aura */}
               <div className={`absolute inset-0 rounded-full bg-primary/20 blur-[80px] animate-pulse ${isHugging ? 'opacity-100 scale-125' : 'opacity-20'} transition-all duration-700`} />
           
           {/* Center Icon */}
           <div className={`
             text-[120px] md:text-[180px] transition-all duration-700 transform
             ${isHugging ? 'scale-125 rotate-12' : 'group-hover:scale-110 rotate-0'}
           `}>
             {isHugging ? '🫂' : '❤️'}
           </div>

           {/* Floating Mini Hearts (when triggered) */}
           {isHugging && (
             <div className="absolute inset-0 pointer-events-none">
                {[...Array(12)].map((_, i) => (
                  <div 
                    key={i}
                    className="absolute animate-float-heart text-4xl"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDuration: `${1 + Math.random()}s`,
                      opacity: 0.8
                    }}
                  >
                    💖
                  </div>
                ))}
             </div>
           )}
        </button>

        {/* Counter Widget */}
        <div className="text-center space-y-2 glass px-12 py-6 rounded-full shadow-xl">
           <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/60">Total Warmth Shared</span>
           <p className="text-5xl font-black text-gray-800 dark:text-white tabular-nums">{hugCount}</p>
        </div>
      </div>

      <footer className="absolute bottom-10 text-[10px] font-black uppercase tracking-[0.4em] text-gray-400/50">
        Sending a little bit of home, anywhere.
      </footer>
    </main>
  );
}
