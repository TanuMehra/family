"use client";

import { useState, useRef, useEffect } from "react";

/**
 * Music Player Page
 * 
 * Features:
 * - Three categories: Happy, Emotional, Calm
 * - Interactive player with play/pause and category switching
 * - Visual spinning animation + basic visualizer effect
 * - Browser-safe interaction handling (No autoplay)
 */
export default function MusicPage() {
  const [currentCategory, setCurrentCategory] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // Configuration for family-friendly music categories
  const categories = [
    { 
      id: "happy", 
      name: "Happy Feelings", 
      icon: "😊", 
      file: "/music/happy.mp3", 
      color: "bg-yellow-100 hover:bg-yellow-200 text-yellow-700" 
    },
    { 
      id: "emotional", 
      name: "Love & Memories", 
      icon: "❤️", 
      file: "/music/emotional.mp3", 
      color: "bg-pink-100 hover:bg-pink-200 text-pink-700" 
    },
    { 
      id: "calm", 
      name: "Peaceful Moments", 
      icon: "🌙", 
      file: "/music/calm.mp3", 
      color: "bg-blue-100 hover:bg-blue-200 text-blue-700" 
    },
  ];

  /**
   * Toggle Play/Pause for the current track
   */
  const togglePlay = () => {
    if (!currentCategory) {
      // If nothing is selected yet, pick the first category
      handleCategorySelect(categories[0]);
      return;
    }

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(err => {
        console.warn("Audio playback issue:", err);
        alert("Audio file not found! Please make sure to place mp3 files in /public/music/ folder. 🎵");
      });
    }
    setIsPlaying(!isPlaying);
  };

  /**
   * Handle switching between different music styles
   */
  const handleCategorySelect = (category) => {
    // If clicking the same category that's already active, just toggle play
    if (currentCategory?.id === category.id) {
      togglePlay();
      return;
    }

    // Set new category and update player state
    setCurrentCategory(category);
    setIsPlaying(true);
    
    // Update audio source and start fresh
    if (audioRef.current) {
      audioRef.current.src = category.file;
      audioRef.current.load();
      audioRef.current.play().catch(err => {
        console.warn("Audio playback issue:", err);
        // Note: We don't alert twice if src just changed and failed
      });
    }
    
    console.log(`🎵 Switching to ${category.name} mood...`);
  };

  return (
    <div className="min-h-screen bg-[#FFFBF7] p-6 md:p-12 pb-32">
      <header className="mb-12">
        <h1 className="text-5xl font-black text-gray-800 tracking-tight">Family Music 🎵</h1>
        <p className="text-xl font-medium text-gray-500 mt-2">Every heart has its own soundtrack.</p>
      </header>

      <div className="max-w-4xl mx-auto space-y-12">
        {/* Category Selector Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategorySelect(cat)}
              className={`
                group flex flex-col items-center justify-center rounded-[3.5rem] p-12 transition-all duration-500 transform
                ${currentCategory?.id === cat.id 
                  ? 'scale-105 shadow-[0_20px_50px_rgba(0,0,0,0.1)] ring-8 ring-white' 
                  : 'hover:scale-105 hover:shadow-xl opacity-80 hover:opacity-100'}
                ${cat.color}
              `}
            >
              <span className={`text-7xl mb-6 transition-transform duration-700 ${currentCategory?.id === cat.id && isPlaying ? 'animate-bounce' : 'group-hover:scale-110'}`}>
                {cat.icon}
              </span>
              <span className="text-2xl font-black tracking-tight">{cat.name}</span>
              <div className="mt-4 text-xs font-black uppercase tracking-[0.2em] opacity-40">
                {currentCategory?.id === cat.id && isPlaying ? "Currently Playing" : "Tap To Listen"}
              </div>
            </button>
          ))}
        </div>

        {/* Global Player Controls - Only visible when a category is picked */}
        {currentCategory && (
          <div className="bg-white rounded-[4rem] p-8 md:p-14 shadow-2xl border border-orange-50 animate-in fade-in zoom-in slide-in-from-bottom-12 duration-1000">
            <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
              
              {/* Spinning Aesthetic Record/Disk */}
              <div className="relative group">
                <div className={`
                  h-40 w-40 md:h-56 md:w-56 rounded-full flex items-center justify-center text-7xl shadow-inner
                  bg-gradient-to-tr from-orange-50 via-rose-50 to-orange-100 border-8 border-white
                  ${isPlaying ? 'animate-spin-slow' : ''}
                `}>
                  {currentCategory.icon}
                </div>
                
                {/* Visualizer effect */}
                {isPlaying && (
                  <div className="absolute -inset-6 flex items-center justify-center gap-1.5 opacity-20 pointer-events-none">
                    {[...Array(15)].map((_, i) => (
                      <div 
                        key={i} 
                        className="w-1.5 bg-orange-500 rounded-full animate-music-bar" 
                        style={{ height: '40%', animationDelay: `${i * 0.08}s` }} 
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Player Information & Main Control */}
              <div className="flex-1 text-center md:text-left space-y-3">
                <h2 className="text-sm font-black text-orange-300 uppercase tracking-[0.3em]">Soundtrack For</h2>
                <h3 className="text-4xl font-black text-gray-800 tracking-tighter">{currentCategory.name}</h3>
                
                <div className="pt-8 flex flex-col md:flex-row items-center gap-8">
                  <button 
                    onClick={togglePlay}
                    className={`
                      h-24 w-24 flex items-center justify-center rounded-full bg-orange-500 text-white text-4xl shadow-xl 
                      transition-all duration-300 hover:scale-110 hover:bg-orange-600 active:scale-90
                    `}
                  >
                    {isPlaying ? "⏸" : "▶️"}
                  </button>
                  <div className="space-y-1">
                    <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">
                      {isPlaying ? "Playing Beautiful Melodies..." : "Playback Paused"}
                    </p>
                    <div className="h-1 w-32 bg-orange-100 rounded-full overflow-hidden">
                      {isPlaying && <div className="h-full bg-orange-500 w-full animate-pulse" />}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer Quote */}
        <div className="rounded-[3rem] bg-orange-50 p-10 text-center text-gray-400 border border-dashed border-orange-200">
          <p className="italic font-bold text-lg">
            "Music is what feelings sound like." ✨
          </p>
        </div>
      </div>

      {/* Hidden Native Audio Element */}
      <audio 
        ref={audioRef}
        onEnded={() => setIsPlaying(false)}
        className="hidden"
      />

      {/* Custom Animations */}
      <style jsx global>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 15s linear infinite;
        }
        @keyframes music-bar {
          0%, 100% { height: 20%; transform: scaleY(1); }
          50% { height: 80%; transform: scaleY(1.5); }
        }
        .animate-music-bar {
          animation: music-bar 0.8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
