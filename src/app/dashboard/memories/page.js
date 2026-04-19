"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import MemoryModal from "@/components/ui/MemoryModal";

/**
 * Premium Collage Gallery - Memories Page
 * Features:
 * - Editorial Asymmetric Collage (Highlights)
 * - Immersive Modal Viewer
 * - Glassmorphism UI
 */
export default function MemoriesPage() {
  const [memories, setMemories] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [selectedMemory, setSelectedMemory] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("family_memories");
    if (saved) {
      try {
        setMemories(JSON.parse(saved).sort((a, b) => new Date(b.date) - new Date(a.date)));
      } catch (e) {
        console.error("Failed to load memories:", e);
      }
    }
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("This photo is a bit large! Please try a smaller one. 📸");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const saveMemory = (e) => {
    e.preventDefault();
    if (!title || !description || !image) {
      alert("Please fill in everything! 💖");
      return;
    }
    const newMemory = { id: Date.now(), title, description, image, date: new Date().toISOString() };
    const updated = [newMemory, ...memories];
    setMemories(updated);
    localStorage.setItem("family_memories", JSON.stringify(updated));
    setTitle(""); setDescription(""); setImage(null); setIsAdding(false);
  };

  return (
    <div className="min-h-screen p-6 md:p-12 pb-32 animate-fade-in-up">
      {/* Immersive Header */}
      <header className="mb-14 flex flex-col items-center justify-between gap-8 md:flex-row">
        <div className="text-center md:text-left flex flex-col md:flex-row md:items-center gap-6">
          <Link href="/dashboard" className="text-4xl hover:scale-110 transition-all bg-white/20 p-5 rounded-full glass shadow-xl">🏡</Link>
          <div>
            <h1 className="text-6xl font-black text-gray-800 dark:text-white tracking-tighter">Memories 📸</h1>
            <p className="text-xl font-bold text-gray-400 dark:text-gray-500 mt-2 italic">A premium collage of our story.</p>
          </div>
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className={`
            rounded-full px-12 py-6 text-2xl font-black text-white shadow-2xl transition-all duration-300 active:scale-95
            ${isAdding ? "bg-gray-400 dark:bg-gray-700" : "bg-primary hover:bg-primary/90 hover:-translate-y-1 hover:shadow-primary/30"}
          `}
        >
          {isAdding ? "Close Form ✕" : "Add New Memory ✨"}
        </button>
      </header>

      {/* Form Section */}
      {isAdding && (
        <div className="mb-20 space-y-8 animate-fade-in-up max-w-3xl mx-auto">
          <div className="rounded-[4rem] glass p-10 md:p-16 shadow-2xl border border-white/40 dark:border-white/5 transition-all duration-300 bg-white/10">
            <form onSubmit={saveMemory} className="space-y-10">
               {/* Form fields (Title, Story, Image) - Same as previous turn but ensuring path consistency */}
               <div className="space-y-4">
                <label className="text-[10px] font-black text-primary uppercase tracking-[0.4em] ml-6">Memory Title</label>
                <input type="text" placeholder="Title..." value={title} onChange={(e) => setTitle(e.target.value)} className="w-full rounded-[2.5rem] border-2 border-white/20 dark:border-white/5 bg-white/40 dark:bg-black/40 px-10 py-6 text-xl text-gray-800 dark:text-white outline-none focus:ring-4 focus:ring-primary/20 transition-all font-bold placeholder:text-gray-400 dark:placeholder:text-gray-600 shadow-sm backdrop-blur-md" />
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-black text-primary uppercase tracking-[0.4em] ml-6">The Story</label>
                <textarea placeholder="Story..." rows="4" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full rounded-[2.5rem] border-2 border-white/20 dark:border-white/5 bg-white/40 dark:bg-black/40 px-10 py-6 text-xl text-gray-800 dark:text-white outline-none focus:ring-4 focus:ring-primary/20 transition-all font-bold placeholder:text-gray-400 dark:placeholder:text-gray-600 shadow-sm backdrop-blur-md resize-none" />
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-black text-primary uppercase tracking-[0.4em] ml-6">Photo</label>
                <div className="relative group flex aspect-video w-full cursor-pointer items-center justify-center rounded-[3rem] border-4 border-dashed border-white/40 dark:border-white/10 bg-white/30 dark:bg-black/20 hover:bg-white/50 transition-all">
                  {image ? <img src={image} className="h-full w-full rounded-[3rem] object-cover" /> : <span className="text-8xl">📷</span>}
                  <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                </div>
              </div>
              <button type="submit" className="w-full rounded-full bg-primary py-8 text-3xl font-black text-white shadow-2xl transition-all hover:scale-[1.03]">Save To Vault 🏡</button>
            </form>
          </div>
        </div>
      )}

      {/* 🖼️ Premium Asymmetric Collage Layout */}
      {memories.length > 0 ? (
        <div className="space-y-20">
          
          {/* 1. Featured Highlights Section (Collage) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 auto-rows-[250px] md:auto-rows-[350px]">
            {memories.map((mem, idx) => {
              // Collage Logic for a dynamic, asymmetric editorial look
              let gridClass = "col-span-1 row-span-1";
              let rotation = (idx % 2 === 0 ? "rotate-1" : "-rotate-1");
              let offset = (idx % 3 === 0 ? "translate-y-2" : "");

              // FEATURED CENTER-ISH PIECE
              if (idx === 0) {
                gridClass = "md:col-span-2 md:row-span-2 col-span-2 row-span-2";
                rotation = "rotate-0";
                offset = "";
              } else if (idx === 3) {
                gridClass = "md:col-span-2 md:row-span-1 col-span-2";
              }

              return (
                <div 
                  key={mem.id} 
                  onClick={() => setSelectedMemory(mem)}
                  className={`
                    group relative overflow-hidden rounded-[2.5rem] glass cursor-pointer transition-all duration-700
                    hover:scale-105 hover:rotate-0 hover:z-50 hover:shadow-[0_20px_50px_rgba(255,148,120,0.3)]
                    animate-fade-in-up stagger-${(idx % 4) + 1}
                    ${gridClass} ${rotation} ${offset}
                  `}
                >
                  <img src={mem.image} alt={mem.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                    <h3 className="text-2xl font-black text-white leading-tight">{mem.title}</h3>
                    <p className="text-white/60 text-xs font-bold mt-2 uppercase tracking-widest">{new Date(mem.date).toLocaleDateString()}</p>
                  </div>

                  {idx === 0 && (
                    <div className="absolute top-8 left-8">
                      <span className="bg-primary px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-white animate-pulse">Highlights ✨</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="mt-40 flex flex-col items-center justify-center text-center opacity-30 select-none">
          <div className="text-9xl mb-12">🖼️</div>
          <h2 className="text-4xl font-black italic">The collage is currently silent.</h2>
          <p className="text-xl font-bold mt-4">Add your first memory to begin the story.</p>
        </div>
      )}

      {/* Fullscreen Interaction Modal */}
      {selectedMemory && (
        <MemoryModal 
          memory={selectedMemory} 
          onClose={() => setSelectedMemory(null)} 
        />
      )}
    </div>
  );
}
