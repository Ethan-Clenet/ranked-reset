"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

export const LANGUAGES = [
  { code: "fr", label: "FR", flag: "🇫🇷" },
  { code: "en", label: "EN", flag: "🇬🇧" },
  { code: "es", label: "ES", flag: "🇪🇸" },
  { code: "de", label: "DE", flag: "🇩🇪" },
] as const;

export type Locale = (typeof LANGUAGES)[number]["code"];

// ---------------------------------------------------------------------------
// Translation dictionary
// ---------------------------------------------------------------------------

const translations: Record<Locale, Record<string, string>> = {
  fr: {
    // Header
    "header.subtitle": "Toutes les dates de reset ranked",

    // HomeClient
    "home.title": "Calendrier des resets ranked",
    "home.description":
      "Retrouvez en un coup d'œil les dates de fin et de début de saison de tous vos jeux compétitifs préférés.",
    "home.gamesTracked": "jeux suivis",
    "home.seasons": "saisons",
    "home.grid": "Grille",
    "home.timeline": "Timeline",
    "home.emptyTitle": "Aucun jeu pour le moment",
    "home.emptyDescription": "Les données de saisons seront bientôt disponibles.",

    // GameCard
    "card.resetIn": "Reset dans",
    "card.startsIn": "Début dans",
    "card.nextSeason": "Prochaine saison",
    "card.finished": "Terminé",

    // StatusBadge
    "status.active": "En cours",
    "status.upcoming": "À venir",
    "status.ended": "Terminé",

    // Countdown units
    "unit.d": "j",
    "unit.h": "h",
    "unit.m": "m",
    "unit.s": "s",

    // Timeline
    "timeline.today": "Aujourd'hui",

    // Rank
    "rank.setRank": "Mon rank",
    "rank.clear": "Supprimer mon rank",
    "rank.back": "Retour",

    // DiscordBubble
    "discord.title": "Demande d'ajout de jeu",
    "discord.subtitle": "Contactez-moi sur Discord",
    "discord.copy": "Copier",
    "discord.hint":
      "Envoyez un message pour demander l'ajout d'un jeu ou signaler une erreur.",
  },

  en: {
    // Header
    "header.subtitle": "All ranked reset dates",

    // HomeClient
    "home.title": "Ranked reset calendar",
    "home.description":
      "See at a glance the start and end dates for every competitive season of your favorite games.",
    "home.gamesTracked": "games tracked",
    "home.seasons": "seasons",
    "home.grid": "Grid",
    "home.timeline": "Timeline",
    "home.emptyTitle": "No games yet",
    "home.emptyDescription": "Season data will be available soon.",

    // GameCard
    "card.resetIn": "Reset in",
    "card.startsIn": "Starts in",
    "card.nextSeason": "Next season",
    "card.finished": "Finished",

    // StatusBadge
    "status.active": "Active",
    "status.upcoming": "Upcoming",
    "status.ended": "Ended",

    // Countdown units
    "unit.d": "d",
    "unit.h": "h",
    "unit.m": "m",
    "unit.s": "s",

    // Timeline
    "timeline.today": "Today",

    // Rank
    "rank.setRank": "My rank",
    "rank.clear": "Clear my rank",
    "rank.back": "Back",

    // DiscordBubble
    "discord.title": "Request a game",
    "discord.subtitle": "Contact me on Discord",
    "discord.copy": "Copy",
    "discord.hint":
      "Send a message to request a game addition or report an error.",
  },

  es: {
    // Header
    "header.subtitle": "Todas las fechas de reset ranked",

    // HomeClient
    "home.title": "Calendario de resets ranked",
    "home.description":
      "Consulta de un vistazo las fechas de inicio y fin de temporada de todos tus juegos competitivos favoritos.",
    "home.gamesTracked": "juegos seguidos",
    "home.seasons": "temporadas",
    "home.grid": "Cuadrícula",
    "home.timeline": "Línea temporal",
    "home.emptyTitle": "Sin juegos por el momento",
    "home.emptyDescription": "Los datos de temporadas estarán disponibles pronto.",

    // GameCard
    "card.resetIn": "Reset en",
    "card.startsIn": "Empieza en",
    "card.nextSeason": "Próxima temporada",
    "card.finished": "Terminado",

    // StatusBadge
    "status.active": "En curso",
    "status.upcoming": "Próximamente",
    "status.ended": "Terminado",

    // Countdown units
    "unit.d": "d",
    "unit.h": "h",
    "unit.m": "m",
    "unit.s": "s",

    // Timeline
    "timeline.today": "Hoy",

    // Rank
    "rank.setRank": "Mi rango",
    "rank.clear": "Eliminar mi rango",
    "rank.back": "Volver",

    // DiscordBubble
    "discord.title": "Solicitud de juego",
    "discord.subtitle": "Contáctame en Discord",
    "discord.copy": "Copiar",
    "discord.hint":
      "Envía un mensaje para solicitar un juego o reportar un error.",
  },

  de: {
    // Header
    "header.subtitle": "Alle Ranked-Reset-Daten",

    // HomeClient
    "home.title": "Ranked-Reset-Kalender",
    "home.description":
      "Sieh auf einen Blick die Start- und Enddaten aller Saisons deiner liebsten kompetitiven Spiele.",
    "home.gamesTracked": "Spiele verfolgt",
    "home.seasons": "Saisons",
    "home.grid": "Raster",
    "home.timeline": "Zeitleiste",
    "home.emptyTitle": "Noch keine Spiele",
    "home.emptyDescription": "Saisondaten werden bald verfügbar sein.",

    // GameCard
    "card.resetIn": "Reset in",
    "card.startsIn": "Start in",
    "card.nextSeason": "Nächste Saison",
    "card.finished": "Beendet",

    // StatusBadge
    "status.active": "Aktiv",
    "status.upcoming": "Bevorstehend",
    "status.ended": "Beendet",

    // Countdown units
    "unit.d": "T",
    "unit.h": "S",
    "unit.m": "M",
    "unit.s": "S",

    // Timeline
    "timeline.today": "Heute",

    // Rank
    "rank.setRank": "Mein Rang",
    "rank.clear": "Rang löschen",
    "rank.back": "Zurück",

    // DiscordBubble
    "discord.title": "Spielanfrage",
    "discord.subtitle": "Kontaktiere mich auf Discord",
    "discord.copy": "Kopieren",
    "discord.hint":
      "Schreibe mir, um ein Spiel hinzuzufügen oder einen Fehler zu melden.",
  },
};

// ---------------------------------------------------------------------------
// date-fns locale mapping
// ---------------------------------------------------------------------------

import { fr, enUS, es, de } from "date-fns/locale";
import type { Locale as DateFnsLocale } from "date-fns";

const dateFnsLocales: Record<Locale, DateFnsLocale> = {
  fr,
  en: enUS,
  es,
  de,
};

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  dateFnsLocale: DateFnsLocale;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("fr");

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
  }, []);

  const t = useCallback(
    (key: string) => {
      return translations[locale]?.[key] ?? translations.fr[key] ?? key;
    },
    [locale],
  );

  return (
    <I18nContext.Provider
      value={{ locale, setLocale, t, dateFnsLocale: dateFnsLocales[locale] }}
    >
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
