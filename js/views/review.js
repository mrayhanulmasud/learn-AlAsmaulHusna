/**
 * Review (spaced repetition of due names) and free practice (all learned
 * names, shuffled, schedule untouched).
 */
import { NAME_BY_ID } from "../data/names.js";
import { applyReview, dueIds } from "../schedule.js";
import { flashcard, ICONS } from "../components.js";
import { bn, bnDate, html, shuffle } from "../utils.js";

export default function reviewView(root, ctx, { practice = false } = {}) {
  const today = ctx.today();
  const learnedIds = Object.keys(ctx.state.learned);
  const queue = practice ? shuffle(learnedIds) : dueIds(ctx.state, today);
  const front = ctx.state.settings.front;
  const s = { i: 0, flipped: false, graded: new Set(), remembered: 0, forgot: 0 };
  const title = practice ? "অনুশীলন" : "পুনরাবৃত্তি";

  if (!queue.length) {
    const upcoming = Object.values(ctx.state.learned).map((c) => c.due).sort()[0];
    root.innerHTML = html`
      <section class="panel center">
        <h1>${practice ? "এখনো কোনো নাম শেখা হয়নি" : "এখন পুনরাবৃত্তির কিছু নেই"}</h1>
        <p class="muted">${
          learnedIds.length
            ? html`পরের পুনরাবৃত্তি: ${bnDate(upcoming)}। চাইলে এখনই সব শেখা নাম অনুশীলন করতে পারেন।`
            : "প্রথমে আজকের পাঠ শুরু করুন।"
        }</p>
        <div class="row">
          ${learnedIds.length && !practice ? html`<a class="btn btn-primary" href="#/practice">সব শেখা নাম অনুশীলন (${bn(learnedIds.length)})</a>` : ""}
          <a class="btn" href="#/">হোমে ফিরুন</a>
        </div>
      </section>`;
    return;
  }

  function render() {
    if (s.i >= queue.length) return renderDone();
    const n = NAME_BY_ID[queue[s.i]];
    root.innerHTML = html`
      <header class="session-head">
        <a class="btn btn-ghost" href="#/">← ফিরে যান</a>
        <p class="kicker">${title} · ${bn(s.i + 1)} / ${bn(queue.length)}</p>
        <div class="bar" aria-hidden="true"><span style="width:${((s.i / queue.length) * 100).toFixed(1)}%"></span></div>
      </header>
      <div class="card-stage">${flashcard(n, { front, flipped: s.flipped })}</div>
      <div class="grade ${s.flipped ? "" : "is-hidden"}">
        <p class="muted small center">${front === "meaning" ? "নামটি" : "অর্থ ও উচ্চারণ"} কি মনে ছিল?</p>
        <div class="row">
          <button class="btn btn-danger" data-grade="0">ভুলে গেছি <kbd>1</kbd></button>
          <button class="btn btn-success" data-grade="1">মনে ছিল <kbd>2</kbd></button>
        </div>
      </div>
      <p class="muted small center flip-hint ${s.flipped ? "is-hidden" : ""}">আগে মনে করার চেষ্টা করুন, তারপর কার্ড উল্টান</p>`;
  }

  function renderDone() {
    root.innerHTML = html`
      <section class="panel center done">
        <div class="done-badge">${ICONS.check}</div>
        <h1>${title} সম্পন্ন</h1>
        <p class="muted">মনে ছিল: <strong>${bn(s.remembered)}</strong> · ভুলে গেছি: <strong>${bn(s.forgot)}</strong></p>
        ${s.forgot && !practice ? html`<p class="muted small">ভুলে যাওয়া নামগুলো আগামীকাল আবার আসবে।</p>` : ""}
        <div class="row">
          <a class="btn btn-primary" href="#/">হোমে ফিরুন</a>
          ${practice ? html`<a class="btn" href="#/practice" data-action="reload">আবার অনুশীলন</a>` : ""}
        </div>
      </section>`;
  }

  function grade(remembered) {
    if (!s.flipped) return;
    const id = queue[s.i];
    if (!s.graded.has(id)) {
      s.graded.add(id);
      remembered ? s.remembered++ : s.forgot++;
      if (!practice) ctx.update((st) => applyReview(st, id, remembered, today));
    }
    if (!remembered) queue.push(id); // see it once more in this session
    s.i += 1;
    s.flipped = false;
    render();
  }

  root.addEventListener("click", (e) => {
    const b = e.target.closest("[data-grade]");
    if (b) grade(b.dataset.grade === "1");
  });
  root.addEventListener("flip", (e) => {
    s.flipped = e.detail.flipped;
    root.querySelector(".grade")?.classList.toggle("is-hidden", !s.flipped);
    root.querySelector(".flip-hint")?.classList.toggle("is-hidden", s.flipped);
  });

  ctx.onKey((e) => {
    if (e.key === "1") grade(false);
    else if (e.key === "2") grade(true);
    else return false;
    return true;
  });

  render();
}
