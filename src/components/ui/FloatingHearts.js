"use client";

import { useEffect, useState } from "react";

/**
 * FloatingHearts Component - HYDRATION FIXED
 * 
 * Uses the 'mounted' pattern to ensure Math.random() only runs on the client.
 * This prevents the "Hydration failed" error in Next.js.
 */
export default function FloatingHearts() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none">
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="animate-float-heart absolute text-primary/20 transition-opacity"
          style={{
            left: `${Math.random() * 100}%`,
            bottom: "-10%",
            fontSize: `${Math.random() * 20 + 8}px`,
            animationDelay: `${Math.random() * 12}s`,
            animationDuration: `${Math.random() * 8 + 12}s`,
            opacity: Math.random() * 0.5 + 0.1,
          }}
        >
          {['💖', '✨', '🤍', '🧡', '✨'][Math.floor(Math.random() * 5)]}
        </div>
      ))}
    </div>
  );

}

