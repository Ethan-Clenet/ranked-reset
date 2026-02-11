export default function Header() {
  return (
    <header className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-lg font-bold text-white tracking-tight">Ranked Reset</h1>
            <p className="text-xs text-zinc-500">Toutes les dates de reset ranked</p>
          </div>
        </div>

        <nav className="flex items-center gap-1">
          <button className="px-3 py-1.5 text-sm text-white bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors">
            Grille
          </button>
          <button className="px-3 py-1.5 text-sm text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors">
            Timeline
          </button>
        </nav>
      </div>
    </header>
  );
}
