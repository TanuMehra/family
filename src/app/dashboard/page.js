"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import MemoryModal from "@/components/ui/MemoryModal";

/**
 * Premium Fully-Functional Vault Dashboard
 * Refined for Full Mobile Responsiveness
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
      if (file.size > 5 * 1024 * 1024) continue; 
      
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
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to remove this memory? 🗑️")) return;
    
    const updated = memories.filter(m => m.id !== id);
    setMemories(updated);
    localStorage.setItem("family_memories", JSON.stringify(updated));
  };

  const updatePreviewTitle = (id, newTitle) => {
    setPreviewFiles(prev => prev.map(p => p.id === id ? { ...p, title: newTitle } : p));
  };

  return (
    <div className="relative min-h-screen px-4 pb-48 pt-24 md:pt-32 md:px-12 lg:px-20 overflow-hidden">
      
      {/* 🔮 Background Decor */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-rose-400/10 dark:bg-rose-900/10 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-purple-400/10 dark:bg-purple-900/10 rounded-full blur-[150px] animate-pulse delay-700" />
      </div>

      {/* 🔮 Hero Section */}
      <section className="relative z-10 mb-16 flex flex-col items-center text-center animate-fade-in-up">
        <div className="space-y-4 max-w-4xl px-4">
          <h1 className="text-5xl font-black tracking-tighter sm:text-8xl leading-tight dark:text-white text-gray-800">
            Our Private <br />
            <span className="text-primary italic font-serif">Vault ❤️</span>
          </h1>
          <p className="mx-auto max-w-lg text-lg md:text-xl font-medium text-gray-400 italic">
            Save, relive, and cherish every moment forever.
          </p>
        </div>
      </section>

      {/* 🖼️ Premium Collage Layout */}
      <section className="relative z-10 container mx-auto">
        {memories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 auto-rows-[300px] md:auto-rows-[350px]">
            {memories.map((mem, idx) => {
              const isCenterFocus = idx === (memories.length >= 5 ? 2 : 0);
              let gridClass = isCenterFocus ? "sm:col-span-2 sm:row-span-2 col-span-1 row-span-1" : "col-span-1 row-span-1";

              return (
                <div 
                  key={mem.id} 
                  onClick={() => setSelectedMemory(mem)}
                  className={`
                    relative group overflow-hidden rounded-[2.5rem] glass cursor-pointer transition-all duration-500 
                    animate-fade-in-up 
                    ${isCenterFocus ? 'shadow-[0_0_80px_rgba(255,148,120,0.5)] z-20 scale-[1.02] sm:scale-105' : 'scale-95 opacity-80 hover:opacity-100 hover:scale-100 hover:z-30 hover:shadow-primary/30'}
                    ${gridClass}
                  `}
                  style={{ animationDelay: `${idx * 0.15}s` }}
                >
                  <img src={mem.image} alt={mem.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                  
                  {/* Delete Button */}
                  <button 
                    onClick={(e) => deleteMemory(e, mem.id)}
                    className="absolute top-6 right-6 h-10 w-10 bg-black/40 hover:bg-red-500 text-white flex items-center justify-center rounded-full opacity-100 sm:opacity-0 group-hover:opacity-100 transition-all z-40 transform hover:scale-110"
                  >
                    🗑️
                  </button>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-100 sm:opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                    <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tighter">{mem.title}</h3>
                  </div>

                  {isCenterFocus && (
                    <div className="absolute top-8 left-8">
                       <span className="bg-primary px-4 py-1.5 rounded-full text-[8px] sm:text-[10px] font-black uppercase tracking-widest text-white shadow-2xl animate-pulse">Highlights ✨</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-12 py-32 text-center opacity-20">
            <div className="text-9xl grayscale">🖼️</div>
            <p className="text-2xl font-black italic">Your vault is waiting...</p>
          </div>
        )}
      </section>

      {/* ✨ Multi-Photo Review Overlay - BEAUTIFIED & RESPONSIVE */}
      {previewFiles.length > 0 && (
        <div className="fixed inset-0 z-[100] bg-[#0c0c0c]/98 backdrop-blur-3xl flex items-center justify-center p-6 md:p-12 animate-in fade-in zoom-in duration-500">
           <div className="max-w-5xl w-full flex flex-col max-h-[90vh] glass border-white/5 rounded-[3rem] p-8 md:p-16 shadow-2xl overflow-hidden">
              
              <div className="text-center mb-10">
                 <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight">New Memories ✨</h2>
                 <p className="text-white/30 mt-3 text-lg font-medium italic">Give these moments a name...</p>
              </div>
              
              <div className="flex-1 overflow-y-auto px-2 custom-scrollbar space-y-12 pb-10">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {previewFiles.map(prev => (
                      <div key={prev.id} className="group flex flex-col gap-6 animate-fade-in-up">
                         <div className="relative aspect-square overflow-hidden rounded-[2.5rem] border-4 border-white/5 shadow-2xl">
                            <img src={prev.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                         </div>
                         <input 
                           type="text" 
                           value={prev.title} 
                           onChange={(e) => updatePreviewTitle(prev.id, e.target.value)}
                           className="w-full bg-white/5 border-2 border-white/10 rounded-2xl px-6 py-5 text-white text-xl font-bold placeholder:text-white/20 focus:border-primary focus:bg-white/10 outline-none transition-all shadow-inner"
                           placeholder="What happened here?"
                         />
                      </div>
                    ))}
                 </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 pt-10 border-t border-white/10">
                 <button 
                  onClick={() => setPreviewFiles([])} 
                  className="flex-1 min-h-[70px] rounded-2xl glass border-white/10 text-white font-black uppercase tracking-widest text-lg hover:bg-white/5 transition-all active:scale-95"
                 >
                   Discard
                 </button>
                 <button 
                  onClick={confirmUpload} 
                  className="flex-[2] min-h-[70px] rounded-2xl bg-primary text-white font-black uppercase tracking-widest text-lg shadow-[0_20px_50px_rgba(255,148,120,0.4)] hover:scale-[1.02] active:scale-95 transition-all"
                 >
                   Save to Vault 🏡
                 </button>
              </div>
           </div>
        </div>
      )}

      {/* Primary Floating Action Button - Responsive & Ultra-Premium */}
      <div className="fixed bottom-8 right-8 sm:bottom-12 sm:right-12 z-[50]">
         <label className="cursor-pointer group flex items-center gap-6">
            <div className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-700 ease-out hidden sm:block">
               <span className="whitespace-nowrap rounded-2xl glass border-white/20 px-10 py-6 text-xl font-black text-primary uppercase tracking-[0.4em] shadow-2xl">
                 New Capture 📸
               </span>
            </div>
            
            <div className="relative flex items-center justify-center">
               {/* 💎 Outer Glass Ring Decor */}
               <div className="absolute inset-[-12px] rounded-[2.5rem] border-2 border-white/10 glass opacity-0 group-hover:opacity-100 transition-all duration-700 scale-90 group-hover:scale-100" />
               
               {/* Main Gradient Button */}
               <div className="relative h-20 w-20 sm:h-24 sm:w-24 flex items-center justify-center rounded-[2rem] bg-gradient-to-br from-[#FE3B7B] to-[#FF8C68] shadow-[0_30px_60px_rgba(254,59,123,0.5)] transition-all duration-500 hover:scale-110 active:scale-90 group-hover:rotate-6">
                  <span className="text-4xl sm:text-5xl text-white transform transition-transform group-hover:scale-125 group-hover:animate-pulse">✨</span>
                  {isUploading && (
                     <div className="absolute inset-0 rounded-full border-[6px] border-white/20 border-t-white animate-spin" />
                  )}
                  <input type="file" accept="image/*" multiple onChange={handleQuickAdd} className="hidden" />
               </div>
            </div>
         </label>
      </div>

      {selectedMemory && <MemoryModal memory={selectedMemory} onClose={() => setSelectedMemory(null)} />}
    </div>
  );
}
