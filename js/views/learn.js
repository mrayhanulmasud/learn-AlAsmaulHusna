/**
 * Daily lesson: study 3 flashcards → quick two-way quiz → saved as learned.
 */
import { NAMES, NAME_BY_ID } from "../data/names.js";
import { applyLesson, lessonDoneOn, nextLessonIds } from "../schedule.js";
import { arabic, flashcard, hookPanel, ICONS } from "../components.js";
import { bn, html, shuffle } from "../utils.js";

export default function learnView(root, ctx) {
  const today = ctx.today();
  const ids = nextLessonIds(ctx.state.settings.order, ctx.state.learned);
  const extra = lessonDoneOn(ctx.state.history, today);

  if (!ids.length) {
    root.innerHTML = html`
      <section class="panel center">
        <h1>সব নাম শেখা হয়ে গেছে</h1>
        <p class="muted">এখন নিয়মিত পুনরাবৃত্তি করুন।</p>
        <a class="btn btn-primary" href="#/review">পুনরাবৃত্তি</a>
      </section>`;
    return;
  }

  const s = { phase: "cards", index: 0, flipped: false, quiz: buildQuiz(ids), q: 0, answered: null, mistakes: 0 };

  function render() {
    if (s.phase === "cards") renderCards();
    else if (s.phase === "quiz") renderQuiz();
    else renderDone();
  }

  function renderCards() {
    const n = NAME_BY_ID[ids[s.index]];
    const last = s.index === ids.length - 1;
    root.innerHTML = html`
      <header class="session-head">
        <a class="btn btn-ghost" href="#/">← ফিরে যান</a>
        <p class="kicker">${extra ? "অতিরিক্ত পাঠ" : "আজকের পাঠ"} · কার্ড ${bn(s.index + 1)} / ${bn(ids.length)}</p>
        ${dots(ids.length, s.index)}
      </header>
      <div class="card-stage">${flashcard(n, { flipped: s.flipped })}</div>
      ${hookPanel(n.id, { open: s.index === 0 })}
      <nav class="session-nav">
        <button class="btn" data-go="-1" ${s.index === 0 ? "disabled" : ""}>‹ আগের</button>
        ${last
          ? html`<button class="btn btn-primary" data-go="quiz">যাচাই করুন ${ICONS.check}</button>`
          : html`<button class="btn btn-primary" data-go="1">পরের ›</button>`}
      </nav>
      <p class="muted small center">কার্ডে ট্যাপ করে (বা Space চেপে) উচ্চারণ ও অর্থ দেখুন · ← → দিয়ে কার্ড বদলান</p>`;
  }

  function renderQuiz() {
    const item = s.quiz[s.q];
    const n = NAME_BY_ID[item.id];
    const question =
      item.type === "meaning"
        ? html`<p class="q-label">এই নামের অর্থ কী?</p>${arabic(n.ar, "q-arabic")}`
        : html`<p class="q-label">কোন নামের অর্থ —</p><p class="q-meaning">“${n.bn}”</p>`;
    root.innerHTML = html`
      <header class="session-head">
        <a class="btn btn-ghost" href="#/">← ফিরে যান</a>
        <p class="kicker">যাচাই · প্রশ্ন ${bn(s.q + 1)} / ${bn(s.quiz.length)}</p>
        ${dots(s.quiz.length, s.q)}
      </header>
      <section class="panel quiz">
        ${question}
        <div class="options ${item.type === "arabic" ? "options-ar" : ""}" role="group" aria-label="উত্তর বাছাই করুন">
          ${item.options.map((oid) => {
            const o = NAME_BY_ID[oid];
            let cls = "";
            if (s.answered) {
              if (oid === item.id) cls = "correct";
              else if (oid === s.answered) cls = "wrong";
            }
            return html`<button class="option ${cls}" data-answer="${oid}" ${s.answered ? "disabled" : ""}>
              ${item.type === "meaning" ? o.bn : arabic(o.ar)}</button>`;
          })}
        </div>
        ${s.answered
          ? html`<div class="feedback ${s.answered === item.id ? "ok" : "bad"}" role="status">
              ${s.answered === item.id
                ? html`<strong>সঠিক!</strong> ${n.bnPron} — ${n.bn}`
                : html`<strong>সঠিক উত্তর:</strong> ${n.bnPron} — ${n.bn}. এই প্রশ্নটি আবার আসবে।`}
            </div>
            <button class="btn btn-primary" data-go="next-q">${s.q === s.quiz.length - 1 ? "শেষ করুন" : "পরের প্রশ্ন ›"}</button>`
          : ""}
      </section>`;
    root.querySelector(s.answered ? "[data-go='next-q']" : ".option")?.focus();
  }

  function renderDone() {
    root.innerHTML = html`
      <section class="panel center done">
        <div class="done-badge">${ICONS.check}</div>
        <h1>আলহামদুলিল্লাহ!</h1>
        <p class="muted">${bn(ids.length)}টি নতুন নাম শেখা হলো${s.mistakes ? html` (${bn(s.mistakes)}টি ভুল সংশোধন করে)` : ""}। আগামীকাল এগুলো পুনরাবৃত্তিতে আসবে।</p>
        <ul class="done-list">
          ${ids.map((id) => {
            const n = NAME_BY_ID[id];
            return html`<li><button class="name-row" data-action="open-name" data-id="${id}">${arabic(n.ar)}<span><strong>${n.bnPron}</strong><small>${n.bn}</small></span></button></li>`;
          })}
        </ul>
        <div class="row">
          <a class="btn btn-primary" href="#/">হোমে ফিরুন</a>
          <a class="btn" href="#/names">সব নাম দেখুন</a>
        </div>
      </section>`;
  }

  function finish() {
    ctx.update((st) => ({ ...applyLesson(st, ids, today), startedOn: st.startedOn ?? today }));
    s.phase = "done";
    render();
  }

  function go(to) {
    if (to === "quiz") {
      s.phase = "quiz";
    } else if (to === "next-q") {
      s.answered = null;
      if (s.q === s.quiz.length - 1) return finish();
      s.q += 1;
    } else {
      const i = s.index + Number(to);
      if (i < 0 || i >= ids.length) return;
      s.index = i;
      s.flipped = false;
    }
    render();
  }

  root.addEventListener("click", (e) => {
    const goBtn = e.target.closest("[data-go]");
    if (goBtn) return go(goBtn.dataset.go);
    const ans = e.target.closest("[data-answer]");
    if (ans && !s.answered) {
      s.answered = ans.dataset.answer;
      const item = s.quiz[s.q];
      if (s.answered !== item.id) {
        s.mistakes += 1;
        s.quiz.push({ ...item, options: shuffle(item.options) }); // ask again later
      }
      render();
    }
  });
  root.addEventListener("flip", (e) => (s.flipped = e.detail.flipped));

  ctx.onKey((e) => {
    if (s.phase !== "cards") return false;
    if (e.key === "ArrowRight") go(s.index === ids.length - 1 ? "quiz" : "1");
    else if (e.key === "ArrowLeft") go("-1");
    else return false;
    return true;
  });

  render();
}

/**
 * Two questions per name: Arabic → meaning, and meaning → Arabic.
 * Options are the lesson's own names (hardest to tell apart) plus one other.
 */
function buildQuiz(ids) {
  const others = shuffle(NAMES.map((n) => n.id).filter((id) => !ids.includes(id)));
  const make = (type) =>
    shuffle(ids).map((id, i) => ({ id, type, options: shuffle([...ids, others[i % others.length]]) }));
  return [...make("meaning"), ...make("arabic")];
}

function dots(total, current) {
  if (total > 10) {
    return html`<div class="bar" aria-hidden="true"><span style="width:${((current / total) * 100).toFixed(1)}%"></span></div>`;
  }
  return html`<div class="dots" aria-hidden="true">${Array.from({ length: total }, (_, i) =>
    html`<span class="${i < current ? "past" : i === current ? "now" : ""}"></span>`,
  )}</div>`;
}
