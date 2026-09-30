/** Small DOM / formatting helpers shared by the views. */

const BN_DIGITS = "০১২৩৪৫৬৭৮৯";

/** Western digits → Bangla digits. */
export const bn = (value) => String(value).replace(/\d/g, (d) => BN_DIGITS[d]);

const ESCAPES = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
export const escapeHtml = (s) => String(s).replace(/[&<>"']/g, (c) => ESCAPES[c]);

/** Marks a string as trusted HTML so `html` does not escape it. */
class SafeHtml {
  constructor(value) {
    this.value = value;
  }
  toString() {
    return this.value;
  }
}

function format(value) {
  if (value instanceof SafeHtml) return value.value;
  if (Array.isArray(value)) return value.map(format).join("");
  if (value === null || value === undefined || value === false) return "";
  return escapeHtml(value);
}

/** Tagged template: interpolated values are escaped unless they are `html` results. */
export function html(strings, ...values) {
  return new SafeHtml(strings.reduce((out, s, i) => out + s + (i < values.length ? format(values[i]) : ""), ""));
}

/** Fisher–Yates shuffle (returns a new array). */
export function shuffle(items) {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** "2026-10-05" → "৫ অক্টোবর" */
export function bnDate(key) {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("bn-BD", { day: "numeric", month: "long" });
}

export function prefersReducedMotion() {
  return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
}
