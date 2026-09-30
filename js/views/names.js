/** Browse and search all 99 names, grouped by day in the chosen order. */
import { NAME_BY_ID } from "../data/names.js";
import { ORDERS, MEMORY_GROUP_BY_ID } from "../data/orders.js";
import { isMastered } from "../schedule.js";
import { arabic } from "../components.js";
import { bn, html } from "../utils.js";

/**
 * Search normalisation: lower-case, drop Latin accents (ā → a), Arabic vowel
 * marks and apostrophe-like letters so "al-aziz" finds "Al-ʿAzīz".
 */
const norm = (s) =>
  String(s)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f\u064B-\u065F\u0670\u06D6-\u06ED\u02BF\u2018\u2019']/g, "");

const searchText = (n) => norm([n.bnPron, n.bn, n.en, n.tr, n.ar, n.num].join(" "));

export default function namesView(root, ctx, { params }) {
  const { state } = ctx;
  const order = ORDERS[state.settings.order];

  root.innerHTML = html`
    <header class="page-head">
      <h1>সব নাম</h1>
      <p class="muted">${order.label} · ৩৩ দিন × ৩টি নাম। যেকোনো নামে ট্যাপ করে বিস্তারিত দেখুন।</p>
      <label class="search">
        <span class="sr-only">নাম খুঁজুন</span>
        <input type="search" placeholder="খুঁজুন: বাংলা, English, العربية…" autocomplete="off" />
      </label>
      <p class="legend muted small">
        <span class="chip learned">শেখা হয়েছে</span> <span class="chip mastered">আয়ত্তে</span> <span class="chip">নতুন</span>
      </p>
    </header>
    <div class="day-list">
      ${order.groups.map((g, i) => {
        const theme = g.theme ?? MEMORY_GROUP_BY_ID[g.ids[0]]?.theme;
        return html`
          <section class="day" id="day-${i + 1}">
            <h2><span class="day-num">দিন ${bn(i + 1)}</span> ${g.theme ? theme : html`<span class="muted">নাম ${bn(i * 3 + 1)}–${bn(i * 3 + 3)}</span>`}</h2>
            <ul>
              ${g.ids.map((id) => {
                const n = NAME_BY_ID[id];
                const card = state.learned[id];
                const status = isMastered(card) ? "mastered" : card ? "learned" : "";
                return html`
                  <li data-search="${searchText(n)}">
                    <button class="name-row ${status}" data-action="open-name" data-id="${id}">
                      <span class="num">${bn(n.num)}</span>
                      ${arabic(n.ar)}
                      <span class="name-text"><strong>${n.bnPron}</strong><small>${n.bn}</small><small class="en" lang="en">${n.en}</small></span>
                    </button>
                  </li>`;
              })}
            </ul>
          </section>`;
      })}
    </div>
    <p class="empty muted center is-gone">কিছু পাওয়া যায়নি।</p>`;

  const input = root.querySelector("input[type=search]");
  input.addEventListener("input", () => {
    const q = norm(input.value.trim());
    let shown = 0;
    for (const day of root.querySelectorAll(".day")) {
      let dayShown = 0;
      for (const li of day.querySelectorAll("li")) {
        const hit = !q || li.dataset.search.includes(q);
        li.classList.toggle("is-gone", !hit);
        dayShown += hit;
      }
      day.classList.toggle("is-gone", !dayShown);
      shown += dayShown;
    }
    root.querySelector(".empty").classList.toggle("is-gone", shown > 0);
  });

  const day = Number(params.get("day"));
  if (day) root.querySelector(`#day-${day}`)?.scrollIntoView({ block: "start" });
}
