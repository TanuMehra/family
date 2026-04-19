/**
 * NoteCard Component
 * 
 * Displays an individual family note/message with a delete action.
 */
export default function NoteCard({ note, onDelete }) {
  const { title, message, date, id } = note;

  return (
    <div className="group relative flex flex-col rounded-[2.5rem] glass p-10 shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 animate-fade-in-up">
      {/* Date Badge */}
      <div className="mb-6 flex items-center justify-between">
        <span className="text-[10px] font-black uppercase tracking-[0.25em] text-primary/60">
          {new Date(date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
        </span>
        <button 
          onClick={() => onDelete(id)}
          className="opacity-0 group-hover:opacity-100 transition-all p-3 hover:bg-red-50 rounded-full text-red-200 hover:text-red-500 shadow-sm"
          title="Delete Note"
        >
          ✕
        </button>
      </div>

      {/* Content */}
      <h3 className="text-2xl font-black text-gray-800 mb-4 group-hover:text-primary transition-colors tracking-tight">
        {title}
      </h3>
      <p className="text-gray-600 font-medium leading-relaxed italic text-lg opacity-80">
        "{message}"
      </p>

      {/* Elegant geometric decor */}
      <div className="absolute -bottom-2 -right-2 -z-10 h-24 w-24 rounded-full bg-secondary/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    </div>
  );
}

