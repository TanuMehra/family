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
    <div className="fixed bottom-32 left-8 z-[150] flex items-center gap-4 animate-fade-in-up md:bottom-8 lg:bottom-12">
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
            group relative flex h-16 w-16 items-center justify-center rounded-2xl glass border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.2)] transition-all duration-500 hover:scale-110
            ${isPlaying ? 'bg-primary/20 text-primary border-primary/40' : 'bg-gray-100/50 text-gray-400 grayscale border-transparent'}
          `}
          aria-label="Toggle Background Music"
        >
          {/* Pulsing Ring for Active State */}
          {isPlaying && (
            <div className="absolute inset-0 rounded-2xl border-2 border-primary animate-ping opacity-20" />
          )}

          <span className="text-3xl filter drop-shadow-md">
            {isPlaying ? "🔈" : "🔇"}
          </span>

          {/* Premium Label */}
          <div className="absolute -top-14 left-0 scale-90 origin-bottom-left opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none">
             <div className="bg-black/80 backdrop-blur-md px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.3em] text-white border border-white/10 shadow-2xl">
                {isPlaying ? "Melody: On" : "Music Muted"}
             </div>
          </div>
        </button>
      )}

      {/* Visualizer bars */}
      {isPlaying && (
        <div className="flex gap-1.5 items-end h-6 px-2">
          {[...Array(4)].map((_, i) => (
            <div 
              key={i} 
              className="w-1.5 bg-primary/40 rounded-full animate-music-bar" 
              style={{ height: '100%', animationDelay: `${i * 0.15}s`, animationDuration: `${0.6 + i * 0.1}s` }} 
            />
          ))}
        </div>
      )}
    </div>
  );
}


