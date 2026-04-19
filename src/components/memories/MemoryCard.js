/**
 * MemoryCard Component
 * 
 * Displays an individual family memory with an image, title, description, and date.
 */
export default function MemoryCard({ memory }) {
  const { title, description, image, date } = memory;

  return (
    <div className="group overflow-hidden rounded-[2.5rem] glass shadow-lg transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl animate-fade-in-up">
      {/* Memory Image with subtle zoom */}
      <div className="relative h-64 w-full overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
      </div>

      {/* Memory Details */}
      <div className="p-8">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-2xl font-bold text-gray-800 tracking-tight">{title}</h3>
          <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] bg-white/50 px-4 py-2 rounded-full border border-white/40">
            {new Date(date).toLocaleDateString()}
          </span>
        </div>
        <p className="text-gray-600/90 leading-relaxed font-medium line-clamp-3 italic">
          "{description}"
        </p>
      </div>
    </div>
  );
}

