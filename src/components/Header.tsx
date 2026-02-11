"use client";

import { useI18n, LANGUAGES } from "@/lib/i18n";

export default function Header() {
  const { locale, setLocale, t } = useI18n();

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
            <p className="text-xs text-zinc-500">{t("header.subtitle")}</p>
          </div>
        </div>

        {/* Language select */}
        <div className="relative">
          <select
            value={locale}
            onChange={(e) => setLocale(e.target.value as typeof locale)}
            className="appearance-none bg-zinc-900 border border-zinc-700 text-sm text-white rounded-lg px-3 py-1.5 pr-8 cursor-pointer hover:border-zinc-600 transition-colors focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            {LANGUAGES.map((l) => (
              <option key={l.code} value={l.code}>
                {l.flag} {l.label}
              </option>
            ))}
          </select>
          <svg
            className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </div>
      </div>
    </header>
  );
}
