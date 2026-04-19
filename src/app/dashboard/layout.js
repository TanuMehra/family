/**
 * Dashboard Layout - Full Screen Mode
 * Removed Sidebar and BottomNav for a cleaner, gallery-focused experience.
 */
export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen">
      <main className="animate-fade-in-up">
        {children}
      </main>
    </div>
  );
}
