export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-950">
      <div className="flex-1 flex flex-col">{children}</div>

      <footer className="bg-gray-900 border-t border-gray-800 mt-auto">
        <p className="text-center text-gray-600 text-xs py-5">
          &copy; 2026 Eco Teppichreinigung. Nur für autorisierte Mitarbeiter.
        </p>
      </footer>
    </div>
  );
}
