/**
 * Progress persistence in localStorage. Every read/write is guarded so the
 * app still works (without saving) in private mode or when storage is blocked.
 */
import { DEFAULT_ORDER, ORDERS } from "./data/orders.js";
import { NAME_BY_ID } from "./data/names.js";

const KEY = "asmaul-husna:v1";

export const DEFAULT_SETTINGS = {
  order: DEFAULT_ORDER, // "memory" | "original"
  font: "scheherazade", // "scheherazade" | "naskh"
  theme: "auto", // "auto" | "light" | "dark"
  front: "arabic", // review card front: "arabic" | "meaning"
};

export function freshState(settings = DEFAULT_SETTINGS) {
  return {
    v: 1,
    startedOn: null,
    learned: {}, // id → { on, box, due, reviews, lapses }
    history: [], // [{ date, ids }]
    activity: { lastDate: null, streak: 0, best: 0 },
    settings: { ...settings },
  };
}

/** Drop anything unknown so a corrupted or outdated save can't break the app. */
function sanitize(raw) {
  const base = freshState();
  if (!raw || typeof raw !== "object") return base;
  const settings = { ...base.settings, ...(raw.settings ?? {}) };
  if (!ORDERS[settings.order]) settings.order = DEFAULT_ORDER;
  const learned = {};
  for (const [id, c] of Object.entries(raw.learned ?? {})) {
    if (NAME_BY_ID[id] && c && typeof c.due === "string") learned[id] = c;
  }
  return {
    ...base,
    startedOn: typeof raw.startedOn === "string" ? raw.startedOn : null,
    learned,
    history: Array.isArray(raw.history) ? raw.history : [],
    activity: { ...base.activity, ...(raw.activity ?? {}) },
    settings,
  };
}

export function load() {
  try {
    const text = localStorage.getItem(KEY);
    return sanitize(text ? JSON.parse(text) : null);
  } catch {
    return freshState();
  }
}

/** @returns {boolean} whether the save succeeded */
export function save(state) {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
    return true;
  } catch {
    return false;
  }
}
