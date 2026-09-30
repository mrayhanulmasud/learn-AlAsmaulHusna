/**
 * Generates docs/NAMES.md from the data files, so the human-readable list can
 * never drift from what the website shows. Run: npm run docs
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { NAMES, NAME_BY_ID } from "../js/data/names.js";
import { MEMORY_GROUPS } from "../js/data/orders.js";

const row = (cells) => `| ${cells.join(" | ")} |`;
const out = [];

out.push(
  "# আল্লাহর ৯৯টি নাম — The 99 Names of Allah",
  "",
  "> Generated from `js/data/*.js` by `npm run docs`. Edit the data files, not this file.",
  "",
  "## 1. Names in the original order",
  "",
  NAMES.map((n) => `${n.num}. ${n.ar} — ${n.bnPron} (${n.tr})`).join("\n"),
  "",
  "## 2. Full details (original order)",
  "",
  row(["#", "Arabic (Indo-Pak)", "বাংলা উচ্চারণ", "বাংলা অর্থ", "English meaning", "Transliteration", "Root"]),
  row(Array(7).fill("---")),
  ...NAMES.map((n) => row([n.num, n.ar, n.bnPron, n.bn, n.en, n.tr, n.root])),
  "",
  "## 3. Memory order — 33 days × 3 names",
  "",
  "Each day's three names are tied together by one hook: they occur together in a verse",
  "or a well-known du‘a, share an Arabic root, or are opposites. Consecutive days also",
  "follow each other (Surah al-Hashr 59:22–24 over days 1–5, Ayat al-Kursi over days 8–9,",
  "al-Hadid 57:3 over days 24–25).",
  "",
);

MEMORY_GROUPS.forEach((g, i) => {
  out.push(`### Day ${i + 1} · ${g.theme} — ${g.themeEn}`, "");
  out.push(g.ids.map((id) => {
    const n = NAME_BY_ID[id];
    return `- **${n.ar}** ${n.bnPron} — ${n.bn} / *${n.en}* (original #${n.num})`;
  }).join("\n"), "");
  out.push(`**স্মৃতি-সূত্র:** ${g.hook}`, "");
  out.push(g.quotes.map((q) => `> ${q.ar} — *${q.ref}*`).join("\n>\n"), "");
});

mkdirSync(new URL("../docs/", import.meta.url), { recursive: true });
writeFileSync(new URL("../docs/NAMES.md", import.meta.url), out.join("\n"));
console.log("Wrote docs/NAMES.md");
