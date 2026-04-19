"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import MemoryModal from "@/components/ui/MemoryModal";

/**
 * Premium Fully-Functional Vault Dashboard
 * Features:
 * - Multi-Photo Upload + Base64 Conversion
 * - Persistent LocalStorage Gallery
 * - Individual Photo Deletion
 * - Immersive Modal Viewer
 * - Editable Captions during Upload
 */
export default function DashboardPage() {
  const [memories, setMemories] = useState([]);
  const [selectedMemory, setSelectedMemory] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [previewFiles, setPreviewFiles] = useState([]);

  useEffect(() => {
    const loadMemories = () => {
      const saved = localStorage.getItem("family_memories");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setMemories(parsed.sort((a, b) => new Date(b.date) - new Date(a.date)));
        } catch (e) {
          console.error("Failed to load memoires:", e);
        }
      }
    };
    loadMemories();
    window.addEventListener("storage", loadMemories);
    return () => window.removeEventListener("storage", loadMemories);
  }, []);

  // 📸 Quick Add Photo Logic
  const handleQuickAdd = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setIsUploading(true);
    const newPreviews = [];

    for (const file of files) {
      if (file.size > 5 * 1024 * 1024) continue; // Increased limit for better photos
      
      const reader = new FileReader();
      const promise = new Promise((resolve) => {
        reader.onloadend = () => {
          newPreviews.push({
            id: Date.now() + Math.random(),
            title: "Family Moment 📸",
            description: "Captured with love.",
            image: reader.result,
            date: new Date().toISOString()
          });
          resolve();
        };
      });
      reader.readAsDataURL(file);
      await promise;
    }

    setPreviewFiles(newPreviews);
    setIsUploading(false);
  };

  const confirmUpload = () => {
    const updated = [...previewFiles, ...memories];
    setMemories(updated);
    localStorage.setItem("family_memories", JSON.stringify(updated));
    setPreviewFiles([]);
  };

  const deleteMemory = (e, id) => {
    e.stopPropagation(); // Don't open modal
    if (!window.confirm("Are you sure you want to remove this memory? 🗑️")) return;
    
    const updated = memories.filter(m => m.id !== id);
    setMemories(updated);
    localStorage.setItem("family_memories", JSON.stringify(updated));
  };

  const updatePreviewTitle = (id, newTitle) => {
    setPreviewFiles(prev => prev.map(p => p.id === id ? { ...p, title: newTitle } : p));
  };

  return (
    <div className="relative min-h-screen px-4 pb-48 pt-10 md:px-12 lg:px-20 overflow-hidden">
      
      {/* 🔮 Background Decor */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-rose-400/10 dark:bg-rose-900/10 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-purple-400/10 dark:bg-purple-900/10 rounded-full blur-[150px] animate-pulse delay-700" />
      </div>

      {/* 🔮 Hero Section */}
      <section className="relative z-10 mb-20 flex flex-col items-center text-center animate-fade-in-up">
        <div className="space-y-6 max-w-4xl">
          <h1 className="text-6xl font-black tracking-tighter sm:text-8xl leading-none dark:text-white text-gray-800">
            Our Private <br />
            <span className="text-primary italic">Vault ❤️</span>
          </h1>
          <p className="mx-auto max-w-2xl text-xl font-medium text-gray-500 dark:text-gray-400 italic">
            Save, relive, and cherish every moment forever.
          </p>
        </div>
      </section>

      {/* 🖼️ Premium Collage Layout */}
      <section className="relative z-10 container mx-auto">
        {memories.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 auto-rows-[250px] md:auto-rows-[350px]">
            {memories.map((mem, idx) => {
              const isCenterFocus = idx === (memories.length >= 5 ? 2 : 0);
              let gridClass = isCenterFocus ? "md:col-span-2 md:row-span-2 col-span-2 row-span-2" : "col-span-1 row-span-1";

              return (
                <div 
                  key={mem.id} 
                  onClick={() => setSelectedMemory(mem)}
                  className={`
                    relative group overflow-hidden rounded-[3rem] glass cursor-pointer transition-all duration-500 
                    animate-fade-in-up 
                    ${isCenterFocus ? 'shadow-[0_0_80px_rgba(255,148,120,0.5)] z-20 scale-105' : 'scale-90 opacity-60 blur-[1px] hover:blur-0 hover:opacity-100 hover:scale-105 hover:z-30 hover:shadow-primary/30'}
                    ${gridClass}
                  `}
                  style={{ animationDelay: `${idx * 0.15}s` }}
                >
                  <img src={mem.image} alt={mem.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                  
                  {/* Delete Button */}
                  <button 
                    onClick={(e) => deleteMemory(e, mem.id)}
                    className="absolute top-6 right-6 h-12 w-12 bg-black/40 hover:bg-red-500 text-white flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-all z-40 transform hover:scale-110"
                  >
                    🗑️
                  </button>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-10">
                    <h3 className="text-3xl font-black text-white tracking-tighter">{mem.title}</h3>
                  </div>

                  {isCenterFocus && (
                    <div className="absolute top-10 left-10">
                       <span className="bg-primary px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em] text-white shadow-2xl animate-pulse">Highlights ✨</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-12 py-32 text-center opacity-20">
            <div className="text-9xl grayscale">🖼️</div>
            <p className="text-2xl font-black italic">Your vault is waiting for its first memory...</p>
          </div>
        )}
      </section>

      {/* ✨ Multi-Photo Review Overlay + Captioning */}
      {previewFiles.length > 0 && (
        <div className="fixed inset-0 z-[100] bg-[#0f0f0f]/95 backdrop-blur-2xl flex items-center justify-center p-6 animate-in fade-in zoom-in duration-300">
           <div className="max-w-6xl w-full space-y-12">
              <div className="text-center">
                 <h2 className="text-5xl font-black text-white tracking-widest uppercase">Add Captions 📸</h2>
                 <p className="text-white/40 mt-3 text-lg font-bold italic">Tell the story behind these beautiful moments.</p>
              </div>
              
              <div className="flex gap-6 overflow-x-auto pb-10 px-4 snap-x">
                 {previewFiles.map(prev => (
                   <div key={prev.id} className="min-w-[300px] snap-center flex flex-col gap-6">
                      <img src={prev.image} className="aspect-square object-cover rounded-[3rem] shadow-2xl border-4 border-white/10" />
                      <input 
                        type="text" 
                        value={prev.title} 
                        onChange={(e) => updatePreviewTitle(prev.id, e.target.value)}
                        className="w-full bg-white/10 border-2 border-white/5 rounded-[1.5rem] px-6 py-4 text-white font-bold placeholder:text-white/20 focus:border-primary outline-none transition-all"
                        placeholder="Add a caption..."
                      />
                   </div>
                 ))}
              </div>

              <div className="flex gap-6">
                 <button onClick={() => setPreviewFiles([])} className="flex-1 py-8 rounded-full glass border-white/10 text-white font-black uppercase tracking-widest hover:bg-white/5 transition-all text-xl">Discard</button>
                 <button onClick={confirmUpload} className="flex-[2] py-8 rounded-full bg-primary text-white font-black uppercase tracking-widest shadow-[0_20px_60px_-10px_rgba(255,148,120,0.6)] hover:scale-[1.02] active:scale-95 transition-all text-xl">Save To Vault ✨</button>
              </div>
           </div>
        </div>
      )}

      {/* Primary Floating Action Button */}
      <div className="fixed bottom-12 right-12 z-[50]">
         <label className="cursor-pointer group flex items-center gap-6">
            <div className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-700 ease-out">
               <span className="whitespace-nowrap rounded-[2rem] glass border-white/10 px-10 py-6 text-xl font-black text-primary uppercase tracking-[0.4em] shadow-2xl">
                 Add Photos 📸
               </span>
            </div>
            <div className="relative h-24 w-24 flex items-center justify-center rounded-full bg-gradient-to-br from-[#FE3B7B] to-[#FF8C68] shadow-[0_25px_60px_rgba(254,59,123,0.5)] transition-all duration-500 hover:scale-110 hover:shadow-[0_30px_70px_rgba(254,59,123,0.7)] group-active:scale-95">
               <span className="text-5xl text-white transform group-hover:rotate-12 transition-transform">✨</span>
               {isUploading && <div className="absolute inset-0 rounded-full border-4 border-white border-t-transparent animate-spin" />}
               <input type="file" accept="image/*" multiple onChange={handleQuickAdd} className="hidden" />
            </div>
         </label>
      </div>

      {selectedMemory && <MemoryModal memory={selectedMemory} onClose={() => setSelectedMemory(null)} />}
    </div>
  );
}
