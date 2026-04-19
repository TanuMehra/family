"use client";

import { useState, useEffect } from "react";
import NoteCard from "@/components/notes/NoteCard";

/**
 * Notes Page
 * 
 * A place for family members to leave digital sticky notes, 
 * reminders, and sweet messages for each other.
 * 
 * Features:
 * - Persisted storage in localStorage
 * - Dynamic note creation and deletion
 * - Responsive grid of "sticky note" style cards
 * - Warm, consistent family-friendly UI
 */
export default function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  // Initialize: Load notes from localStorage on first mount
  useEffect(() => {
    const saved = localStorage.getItem("family_notes");
    if (saved) {
      try {
        setNotes(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse notes from storage:", e);
      }
    }
  }, []);

  /**
   * Save a new note
   */
  const saveNote = (e) => {
    e.preventDefault();
    
    if (!title.trim() || !message.trim()) {
      alert("Please give your note a title and a message! 📝");
      return;
    }

    const newNote = {
      id: Date.now(),
      title: title.trim(),
      message: message.trim(),
      date: new Date().toISOString(),
    };

    const updatedNotes = [newNote, ...notes];
    setNotes(updatedNotes);
    localStorage.setItem("family_notes", JSON.stringify(updatedNotes));

    // Reset UI state
    setTitle("");
    setMessage("");
    setIsAdding(false);
    
    console.log("📝 Note saved successfully!");
  };

  /**
   * Delete a note by ID
   */
  const deleteNote = (id) => {
    // Basic confirmation for destructive action
    if (window.confirm("Are you sure you want to remove this note? 🗑️")) {
      const updatedNotes = notes.filter((n) => n.id !== id);
      setNotes(updatedNotes);
      localStorage.setItem("family_notes", JSON.stringify(updatedNotes));
      console.log("🗑️ Note deleted.");
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFBF7] p-6 md:p-12 pb-32">
      {/* Header section */}
      <header className="mb-12 flex flex-col items-center justify-between gap-6 md:flex-row">
        <div className="text-center md:text-left">
          <h1 className="text-5xl font-black text-gray-800 tracking-tight">Family Notes 📝</h1>
          <p className="text-xl font-medium text-gray-500 mt-2">Little reminders and letters of love.</p>
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className={`
            rounded-[2rem] px-10 py-5 text-xl font-bold text-white shadow-xl transition-all active:scale-95
            ${isAdding 
              ? "bg-gray-400 hover:bg-gray-500" 
              : "bg-orange-400 hover:bg-orange-500 hover:shadow-orange-100"}
          `}
        >
          {isAdding ? "Cancel ✕" : "Add Note ✍️"}
        </button>
      </header>

      {/* Add Note Form - Animated entry */}
      {isAdding && (
        <div className="mb-16 animate-in fade-in slide-in-from-top-6 duration-500 rounded-[3rem] bg-white p-10 shadow-2xl border border-orange-50 max-w-xl mx-auto">
          <form onSubmit={saveNote} className="space-y-8">
            <div className="space-y-3">
              <label className="text-xs font-black text-orange-300 uppercase tracking-[0.25em] ml-4">Subject</label>
              <input
                type="text"
                placeholder="Helpful Reminder? Sweet Note?"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-[1.5rem] border-2 border-orange-50 bg-orange-50/10 px-8 py-5 text-lg text-gray-700 outline-none focus:border-orange-200 transition-all font-medium"
              />
            </div>

            <div className="space-y-3">
              <label className="text-xs font-black text-orange-300 uppercase tracking-[0.25em] ml-4">The Message</label>
              <textarea
                placeholder="Write your heart out here..."
                rows="5"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full rounded-[1.5rem] border-2 border-orange-50 bg-orange-50/10 px-8 py-5 text-lg text-gray-700 outline-none focus:border-orange-200 transition-all font-medium resize-none shadow-inner"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full rounded-[2rem] bg-orange-400 py-6 text-2xl font-black text-white shadow-xl transition-all hover:bg-orange-500 hover:scale-[1.02] active:scale-95"
            >
              Pin Note 📝
            </button>
          </form>
        </div>
      )}

      {/* Main Grid View */}
      {notes.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {notes.map((note) => (
            <NoteCard 
              key={note.id} 
              note={note} 
              onDelete={deleteNote} 
            />
          ))}
        </div>
      ) : (
        <div className="mt-40 flex flex-col items-center justify-center text-center opacity-30 select-none">
          <div className="text-9xl mb-8">📋</div>
          <h2 className="text-3xl font-black text-gray-400 italic">No notes pinned yet.</h2>
          <p className="text-xl font-bold text-gray-400 mt-4 max-w-sm">Your digital fridge door is waiting for its first note!</p>
        </div>
      )}
    </div>
  );
}
