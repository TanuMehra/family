"use client";

import { useState } from "react";
import Link from "next/link";

/**
 * Premium Mood Page
 * Allows family members to share their emotional state with others.
 */
export default function MoodPage() {
  const [selectedMood, setSelectedMood] = useState(null);

  const moods = [
    { id: "happy", icon: "😊", label: "Joyful", color: "bg-yellow-100 text-yellow-700" },
    { id: "loved", icon: "🥰", label: "Loved", color: "bg-pink-100 text-pink-700" },
    { id: "peaceful", icon: "😌", label: "At Peace", color: "bg-blue-100 text-blue-700" },
    { id: "tired", icon: "😴", label: "Tired", color: "bg-purple-100 text-purple-700" },
    { id: "excited", icon: "🤩", label: "Excited", color: "bg-orange-100 text-orange-700" },
    { id: "grateful", icon: "🙏", label: "Grateful", color: "bg-green-100 text-green-700" },
  ];

  return (
    <main className="min-h-screen p-6 md:p-14 pb-48 animate-fade-in-up">
      
      <header className="mb-20 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="text-4xl hover:scale-110 transition-all bg-white/20 p-6 rounded-full glass shadow-2xl">🏡</Link>
          <div className="space-y-1">
             <h1 className="text-5xl font-black text-gray-800 dark:text-white tracking-tighter">Family Mood 🌈</h1>
             <p className="text-xl font-bold text-gray-400 dark:text-gray-500 italic">How are we feeling today?</p>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto flex flex-col items-center">
        
        <div className="text-center mb-16 space-y-4">
           <h2 className="text-4xl font-black text-gray-800 dark:text-white tracking-tight">Select your current vibe ✨</h2>
           <p className="text-lg font-medium text-gray-400 max-w-lg mx-auto leading-relaxed">
             Sharing your mood helps your family know how to support you or celebrate with you.
           </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 md:gap-10 w-full px-4">
           {moods.map((mood) => (
             <button
               key={mood.id}
               onClick={() => setSelectedMood(mood.id)}
               className={`
                 relative flex flex-col items-center justify-center p-8 md:p-12 rounded-[2.5rem] transition-all duration-500 transform overflow-hidden
                 ${selectedMood === mood.id 
                    ? 'ring-4 ring-primary scale-105 shadow-2xl z-20 ' + mood.color
                    : 'glass border-white/10 opacity-60 hover:opacity-100 hover:scale-[1.03]'}
               `}
             >
                {/* Selected Shimmer */}
                {selectedMood === mood.id && (
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/40 to-transparent animate-pulse" />
                )}

                <span className={`text-6xl md:text-8xl mb-6 transition-transform duration-700 ${selectedMood === mood.id ? 'animate-bounce' : ''}`}>
                  {mood.icon}
                </span>
                <span className="text-xl md:text-2xl font-black tracking-tighter">{mood.label}</span>
                
                {selectedMood === mood.id && (
                  <div className="absolute -top-4 -right-4 bg-primary text-white h-12 w-12 rounded-full flex items-center justify-center shadow-xl animate-scale-in">
                    ✓
                  </div>
                )}
             </button>
           ))}
        </div>

        {selectedMood && (
          <div className="mt-24 animate-fade-in-up text-center space-y-8 max-w-2xl px-6">
             <div className="p-10 rounded-[3rem] bg-white dark:bg-black/20 shadow-2xl border border-primary/10">
                <p className="text-2xl font-bold text-gray-500 italic leading-relaxed">
                  "It's okay to feel whatever you're feeling. Your family is here for you, no matter what. ❤️"
                </p>
             </div>
             <button 
               onClick={() => setSelectedMood(null)}
               className="px-12 py-5 rounded-full bg-primary text-white font-black uppercase tracking-widest hover:brightness-110 transition-all shadow-xl"
             >
               Update Mood
             </button>
          </div>
        )}
      </div>

    </main>
  );
}
