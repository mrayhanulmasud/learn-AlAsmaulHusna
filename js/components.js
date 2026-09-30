/** Reusable pieces of markup. All return `html` results. */
import { NAMES } from "./data/names.js";
import { MEMORY_GROUP_BY_ID } from "./data/orders.js";
import { bn, html } from "./utils.js";

export const ICONS = {
  learn: html`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5zM4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5"/></svg>`,
  review: html`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 12a8 8 0 1 1-2.34-5.66M20 4v5h-5"/></svg>`,
  flame: html`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 22c4 0 7-2.7 7-7 0-4.5-4-7-4.5-11-2.5 2-3.5 4.5-3.5 7-1.5-.8-2.5-2.3-2.5-4C6 9 5 11.5 5 15c0 4.3 3 7 7 7z"/></svg>`,
  star: html`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/></svg>`,
  calendar: html`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v14H4zM4 10h16M8 2v4M16 2v4"/></svg>`,
  check: html`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>`,
  moon: html`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5z"/></svg>`,
  sun: html`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></svg>`,
  close: html`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>`,
};

/** Arabic text span with the chosen Arabic font. */
export const arabic = (text, cls = "") => html`<span class="ar ${cls}" lang="ar" dir="rtl">${text}</span>`;

/** Rows of pronunciation, meanings, transliteration and root. */
export function nameDetails(n) {
  const sameRoot = NAMES.filter((x) => x.root === n.root && x.id !== n.id);
  return html`
    <dl class="details">
      <div class="d-row"><dt>উচ্চারণ</dt><dd class="d-pron">${n.bnPron}</dd></div>
      <div class="d-row"><dt>বাংলা অর্থ</dt><dd class="d-bn">${n.bn}</dd></div>
      <div class="d-row"><dt>English</dt><dd class="d-en" lang="en">${n.en}</dd></div>
      <div class="d-row"><dt>Transliteration</dt><dd class="d-tr" lang="en">${n.tr}</dd></div>
      <div class="d-row"><dt>মূলধাতু</dt><dd>${arabic(n.root, "root")}${
        sameRoot.length
          ? html` <span class="same-root">একই মূল: ${sameRoot.map((x, i) => html`${i ? "، " : ""}<button class="link" data-action="open-name" data-id="${x.id}">${x.bnPron}</button>`)}</span>`
          : ""
      }</dd></div>
    </dl>`;
}

/**
 * A flip card. `front` decides what is shown before flipping:
 *   "arabic"  → the Arabic name (default)
 *   "meaning" → the Bangla meaning (reverse practice)
 */
export function flashcard(n, { front = "arabic", flipped = false } = {}) {
  const frontFace =
    front === "meaning"
      ? html`<p class="fc-prompt">কোন নামের অর্থ?</p><p class="fc-meaning">${n.bn}</p><p class="fc-meaning-en" lang="en">${n.en}</p>`
      : html`${arabic(n.ar, "fc-arabic")}`;
  return html`
    <div class="flashcard ${flipped ? "is-flipped" : ""}" data-action="flip" role="button" tabindex="0"
         aria-pressed="${flipped ? "true" : "false"}" aria-label="কার্ড উল্টান">
      <div class="fc-face fc-front" aria-hidden="${flipped ? "true" : "false"}">
        <span class="fc-num">${bn(n.num)}</span>
        ${frontFace}
        <span class="fc-hint">উল্টাতে ট্যাপ করুন</span>
      </div>
      <div class="fc-face fc-back" aria-hidden="${flipped ? "false" : "true"}">
        <span class="fc-num">${bn(n.num)}</span>
        ${arabic(n.ar, "fc-arabic small")}
        ${nameDetails(n)}
      </div>
    </div>`;
}

/** Memory hook of the name's memory-order group (theme + verse/du‘a). */
export function hookPanel(id, { open = true } = {}) {
  const g = MEMORY_GROUP_BY_ID[id];
  if (!g) return "";
  return html`
    <details class="hook" ${open ? "open" : ""}>
      <summary><span class="hook-kicker">স্মৃতি-সূত্র · দিন ${bn(g.day)}</span> <span class="hook-theme">${g.theme}</span></summary>
      <p class="hook-text">${g.hook}</p>
      ${g.quotes.map(
        (q) => html`<figure class="quote">${arabic(q.ar, "quote-ar")}<figcaption>${q.ref}</figcaption></figure>`,
      )}
    </details>`;
}

/** Circular progress indicator. */
export function progressRing(value, total, label) {
  const r = 52;
  const c = 2 * Math.PI * r;
  const pct = total ? value / total : 0;
  return html`
    <div class="ring" role="img" aria-label="${label}">
      <svg viewBox="0 0 120 120" aria-hidden="true">
        <circle class="ring-track" cx="60" cy="60" r="${r}"/>
        <circle class="ring-fill" cx="60" cy="60" r="${r}" stroke-dasharray="${c.toFixed(1)}"
                stroke-dashoffset="${(c * (1 - pct)).toFixed(1)}"/>
      </svg>
      <div class="ring-label"><strong>${bn(value)}</strong><span>/ ${bn(total)}</span></div>
    </div>`;
}
