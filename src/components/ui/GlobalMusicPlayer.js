"use client";

import { useState, useRef, useEffect } from "react";

/**
 * GlobalMusicPlayer Component - HYDRATION & ERROR FIXED
 * 
 * Features:
 * - Mounted pattern to prevent hydration mismatch.
 * - Interaction-based start.
 * - Audio error handling (detects missing files).
 */
export default function GlobalMusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [mounted, setMounted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    setMounted(true);
    // Global interaction listener
    const handleFirstInteraction = () => {
      setHasInteracted(true);
      window.removeEventListener('click', handleFirstInteraction);
    };
    window.addEventListener('click', handleFirstInteraction);
    return () => window.removeEventListener('click', handleFirstInteraction);
  }, []);

  // When interaction happens, try to play
  useEffect(() => {
    if (hasInteracted && audioRef.current && !isPlaying) {
      audioRef.current.volume = 0.3; // Default volume set to 0.3 (Premium recommendation)
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(() => console.warn("Audio play blocked. Click anywhere to start vibes! 🎵"));
    }
  }, [hasInteracted]);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => alert("Could not load 'bgm.mp3' from the public folder."));
    }
    setIsPlaying(!isPlaying);
  };

  if (!mounted) return null;

  return (
    <div className="fixed bottom-32 left-8 z-[150] flex items-center gap-3 animate-fade-in-up md:bottom-8 lg:bottom-12">
      <audio 
        ref={audioRef} 
        src="/bgm.mp3" 
        loop 
        onError={() => console.error("Audio Load Error: Make sure /public/bgm.mp3 exists!")}
        className="hidden" 
      />


      
      {hasInteracted && (
        <button
          onClick={toggleMusic}
          className={`
            group flex h-14 w-14 items-center justify-center rounded-full glass shadow-2xl transition-all duration-500 hover:scale-110
            ${isPlaying ? 'bg-white text-primary rotate-12' : 'bg-gray-100 text-gray-400 grayscale'}
          `}
        >
          <span className="text-2xl">
            {isPlaying ? "🎵" : "🔇"}
          </span>
          <div className="absolute -top-12 left-0 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-primary shadow-sm border border-orange-50">
            {isPlaying ? "Family Melodies: On" : "Music Paused"}
          </div>
        </button>
      )}

      {isPlaying && (
        <div className="flex gap-1 items-end h-4">
          {[...Array(3)].map((_, i) => (
            <div 
              key={i} 
              className="w-1 bg-primary/60 rounded-full animate-music-bar" 
              style={{ height: '100%', animationDelay: `${i * 0.2}s` }} 
            />
          ))}
        </div>
      )}
    </div>
  );
}

