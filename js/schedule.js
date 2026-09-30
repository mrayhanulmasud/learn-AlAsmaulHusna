/**
 * Pure learning logic: dates, daily lessons and spaced repetition.
 * No DOM or storage access here, so it can be unit-tested with Node.
 */
import { ORDERS, DEFAULT_ORDER, orderIds } from "./data/orders.js";

export const NAMES_PER_DAY = 3;

/**
 * Leitner boxes. A card in box b is shown again INTERVALS[b] days after a
 * successful review. New cards start in box 1 (review tomorrow).
 */
export const INTERVALS = [0, 1, 3, 7, 14, 30, 60];
export const MAX_BOX = INTERVALS.length - 1;

/* ---------- dates (local calendar days as "YYYY-MM-DD") ---------- */

export function dateKey(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function keyToUTC(key) {
  const [y, m, d] = key.split("-").map(Number);
  return Date.UTC(y, m - 1, d);
}

export function addDays(key, days) {
  const t = new Date(keyToUTC(key) + days * 86400000);
  return t.toISOString().slice(0, 10);
}

export function daysBetween(fromKey, toKey) {
  return Math.round((keyToUTC(toKey) - keyToUTC(fromKey)) / 86400000);
}

/* ---------- lessons ---------- */

/** The next `size` names (in the chosen order) that are not learned yet. */
export function nextLessonIds(orderKey, learned, size = NAMES_PER_DAY) {
  return orderIds(orderKey).filter((id) => !learned[id]).slice(0, size);
}

/** Has a lesson already been completed on `today`? */
export function lessonDoneOn(history, today) {
  return history.some((h) => h.date === today);
}

/** 1-based day number of the group that contains `id` in an order. */
export function dayOf(orderKey, id) {
  const groups = (ORDERS[orderKey] ?? ORDERS[DEFAULT_ORDER]).groups;
  return groups.findIndex((g) => g.ids.includes(id)) + 1;
}

/** Record a finished lesson: new cards enter box 1, due tomorrow. */
export function applyLesson(state, ids, today) {
  const learned = { ...state.learned };
  for (const id of ids) {
    if (!learned[id]) {
      learned[id] = { on: today, box: 1, due: addDays(today, INTERVALS[1]), reviews: 0, lapses: 0 };
    }
  }
  return touchActivity({ ...state, learned, history: [...state.history, { date: today, ids: [...ids] }] }, today);
}

/* ---------- spaced repetition ---------- */

/** Learned ids due for review on `today`, most overdue first, then by order. */
export function dueIds(state, today) {
  const order = orderIds(state.settings.order);
  return Object.entries(state.learned)
    .filter(([, c]) => c.due <= today)
    .sort(([a, ca], [b, cb]) => ca.due.localeCompare(cb.due) || order.indexOf(a) - order.indexOf(b))
    .map(([id]) => id);
}

/** Grade one review. Remembered → next box; forgotten → back to box 1. */
export function applyReview(state, id, remembered, today) {
  const card = state.learned[id];
  if (!card) return state;
  const box = remembered ? Math.min(card.box + 1, MAX_BOX) : 1;
  const next = {
    ...card,
    box,
    due: addDays(today, INTERVALS[box]),
    reviews: card.reviews + 1,
    lapses: card.lapses + (remembered ? 0 : 1),
  };
  return touchActivity({ ...state, learned: { ...state.learned, [id]: next } }, today);
}

/** "Mastered" = reached one of the two highest boxes. */
export function isMastered(card) {
  return !!card && card.box >= MAX_BOX - 1;
}

/* ---------- streak ---------- */

/** Mark `today` as an active day and update the streak. */
export function touchActivity(state, today) {
  const a = state.activity ?? { lastDate: null, streak: 0, best: 0 };
  if (a.lastDate === today) return state;
  const streak = a.lastDate && daysBetween(a.lastDate, today) === 1 ? a.streak + 1 : 1;
  return { ...state, activity: { lastDate: today, streak, best: Math.max(a.best, streak) } };
}

/** Streak as it should be displayed today (0 if a day was missed). */
export function currentStreak(state, today) {
  const a = state.activity;
  if (!a?.lastDate) return 0;
  return daysBetween(a.lastDate, today) <= 1 ? a.streak : 0;
}
