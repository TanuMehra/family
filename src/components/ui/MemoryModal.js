"use client";

import { useEffect, useState } from "react";

export default function MemoryModal({ memory, onClose }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    document.body.style.overflow = "hidden";

    // ESC key listener
    const handleKeyDown = (e) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  if (!memory) return null;

  return (
    <div 
      className={`
        fixed inset-0 z-[200] flex items-center justify-center p-6 transition-all duration-700
        ${isVisible ? 'opacity-100 backdrop-blur-3xl' : 'opacity-0 backdrop-blur-0'}
      `}
      onClick={handleClose}
    >
      {/* 🎭 Cinematic Background Layer */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f0f0f] via-[#1a1a2e] to-[#16213e] opacity-95" />
      
      {/* 💖 Emotional Floating Hearts (Modal-Specific) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="animate-float-heart absolute text-white/10"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: "-10%",
              fontSize: `${Math.random() * 20 + 10}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 6 + 10}s`,
            }}
          >
            {['💖', '✨', '🤍'][Math.floor(Math.random() * 3)]}
          </div>
        ))}
      </div>

      {/* Close Button */}
      <button 
        className="fixed top-10 right-10 z-[220] group h-16 w-16 flex items-center justify-center rounded-full glass border-white/10 hover:bg-white/20 transition-all text-2xl text-white/50 hover:text-white"
        onClick={handleClose}
      >
        ✕
      </button>

      {/* 🖼️ Premium Image Container */}
      <div 
        className={`
          relative z-10 max-w-7xl w-full flex flex-col items-center justify-center transform transition-all duration-700 cubic-bezier(0.16, 1, 0.3, 1)
          ${isVisible ? 'scale-100 opacity-100 rotate-0' : 'scale-75 opacity-0 rotate-2'}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Radial Glow behind image */}
        <div className="absolute -inset-20 bg-primary/20 rounded-full blur-[120px] pointer-events-none animate-pulse" />
        
        <img 
          src={memory.image} 
          alt={memory.title}
          className="relative z-10 w-full max-h-[80vh] object-contain rounded-[2rem] shadow-[0_0_100px_rgba(255,148,120,0.3)] border border-white/5"
        />
        
        {/* Info Box */}
        <div className={`
          mt-10 text-center space-y-4 px-6 transition-all duration-1000 delay-300
          ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
        `}>
          <div className="flex items-center justify-center gap-4">
             <div className="h-px w-10 bg-white/20" />
             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/70">Forever Stored</span>
             <div className="h-px w-10 bg-white/20" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-none">{memory.title}</h2>
          <p className="text-xl md:text-2xl font-medium text-white/50 italic leading-relaxed max-w-3xl mx-auto">
            "{memory.description}"
          </p>
          <div className="pt-4 opacity-40 text-[10px] font-black uppercase tracking-widest text-white">
            Captured {new Date(memory.date).toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  );
}

