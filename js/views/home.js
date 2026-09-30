import { NAMES, NAME_BY_ID } from "../data/names.js";
import { ORDERS, MEMORY_GROUP_BY_ID } from "../data/orders.js";
import { currentStreak, dayOf, dueIds, isMastered, lessonDoneOn, nextLessonIds } from "../schedule.js";
import { arabic, ICONS, progressRing } from "../components.js";
import { bn, bnDate, html } from "../utils.js";

export default function homeView(root, ctx) {
  const { state } = ctx;
  const today = ctx.today();
  const order = state.settings.order;
  const learnedCount = Object.keys(state.learned).length;
  const mastered = Object.values(state.learned).filter(isMastered).length;
  const due = dueIds(state, today);
  const next = nextLessonIds(order, state.learned);
  const doneToday = lessonDoneOn(state.history, today);
  const streak = currentStreak(state, today);

  root.innerHTML = html`
    <section class="hero">
      ${progressRing(learnedCount, NAMES.length, `${bn(learnedCount)}টি নাম শেখা হয়েছে`)}
      <div class="hero-text">
        <p class="kicker">আসমাউল হুসনা</p>
        <h1>আল্লাহর ৯৯টি সুন্দর নাম</h1>
        <p class="muted">প্রতিদিন ৩টি নতুন নাম · ৩৩ দিনে সম্পূর্ণ</p>
        <ul class="stats">
          <li>${ICONS.flame}<span><strong>${bn(streak)}</strong> দিনের ধারা</span></li>
          <li>${ICONS.star}<span><strong>${bn(mastered)}</strong>টি আয়ত্তে</span></li>
          <li>${ICONS.calendar}<span><strong>${bn(state.history.length)}</strong>টি পাঠ</span></li>
        </ul>
      </div>
    </section>

    ${learnedCount === 0 ? welcome() : ""}
    ${due.length ? reviewCard(due) : ""}
    ${todayCard(next, doneToday, order, state)}
    ${journey(state, order)}
  `;
}

function welcome() {
  return html`
    <section class="panel welcome">
      <h2>স্বাগতম!</h2>
      <ol class="steps">
        <li><strong>শিখুন</strong> — প্রতিদিন ৩টি নতুন নাম ফ্ল্যাশকার্ডে, সাথে মনে রাখার সূত্র।</li>
        <li><strong>যাচাই করুন</strong> — ছোট্ট কুইজে নিজেকে পরীক্ষা করুন।</li>
        <li><strong>পুনরাবৃত্তি করুন</strong> — ভুলে যাওয়ার আগেই নামগুলো আবার সামনে আসবে।</li>
      </ol>
      <p class="muted small">আপনার অগ্রগতি এই ব্রাউজারেই সংরক্ষিত থাকে — কোনো অ্যাকাউন্ট লাগবে না।</p>
    </section>`;
}

function reviewCard(due) {
  return html`
    <section class="panel review-cta">
      <div>
        <h2>পুনরাবৃত্তির সময়</h2>
        <p class="muted">${bn(due.length)}টি নাম আজ আবার দেখার সময় হয়েছে। নতুন নামের আগে এগুলো ঝালিয়ে নিন।</p>
      </div>
      <a class="btn btn-primary" href="#/review">${ICONS.review} পুনরাবৃত্তি শুরু</a>
    </section>`;
}

function todayCard(next, doneToday, order, state) {
  if (!next.length) {
    return html`
      <section class="panel today done-all">
        <h2>মাশাআল্লাহ! সব ৯৯টি নাম শেখা সম্পন্ন</h2>
        <p class="muted">নিয়মিত পুনরাবৃত্তি চালিয়ে যান যাতে নামগুলো স্থায়ীভাবে মনে থাকে। চাইলে সেটিংস থেকে নতুন করে শুরু করতে পারেন।</p>
        <a class="btn" href="#/practice">সব নাম অনুশীলন করুন</a>
      </section>`;
  }

  const day = dayOf(order, next[0]);
  const group = ORDERS[order].groups[day - 1];
  const theme = group.theme ?? MEMORY_GROUP_BY_ID[next[0]]?.theme;
  const preview = html`
    <ul class="preview">
      ${next.map((id) => {
        const n = NAME_BY_ID[id];
        return html`<li>${arabic(n.ar)}<span>${n.bnPron}</span></li>`;
      })}
    </ul>`;

  if (doneToday) {
    const lastLesson = state.history[state.history.length - 1];
    return html`
      <section class="panel today is-done">
        <p class="kicker">${ICONS.check} আজকের পাঠ সম্পন্ন</p>
        <h2>নতুন নাম আসবে আগামীকাল</h2>
        <p class="muted">আজ শিখেছেন: ${lastLesson.ids.map((id, i) => html`${i ? " · " : ""}${NAME_BY_ID[id].bnPron}`)}</p>
        <details class="ahead">
          <summary>আজই আরও শিখতে চান?</summary>
          <p class="muted small">পরের পাঠ — দিন ${bn(day)}${theme ? html` · ${theme}` : ""}। ধীরে শিখলে মনে থাকে বেশি, তবে চাইলে এগিয়ে যেতে পারেন।</p>
          ${preview}
          <a class="btn" href="#/learn">পরের ৩টি নাম শিখুন</a>
        </details>
      </section>`;
  }

  return html`
    <section class="panel today">
      <p class="kicker">আজকের পাঠ · দিন ${bn(day)} / ৩৩</p>
      <h2>${theme ?? `নাম ${bn(NAME_BY_ID[next[0]].num)}–${bn(NAME_BY_ID[next[next.length - 1]].num)}`}</h2>
      ${preview}
      <a class="btn btn-primary btn-lg" href="#/learn">${ICONS.learn} আজকের ৩টি নাম শিখুন</a>
    </section>`;
}

function journey(state, order) {
  const groups = ORDERS[order].groups;
  return html`
    <section class="panel">
      <div class="panel-head">
        <h2>৩৩ দিনের যাত্রা</h2>
        <a class="link" href="#/names">সব নাম →</a>
      </div>
      <ol class="journey" aria-label="দিনভিত্তিক অগ্রগতি">
        ${groups.map((g, i) => {
          const learned = g.ids.filter((id) => state.learned[id]).length;
          const cls = learned === g.ids.length ? "full" : learned ? "part" : "";
          const theme = g.theme ?? MEMORY_GROUP_BY_ID[g.ids[0]]?.theme ?? "";
          return html`<li class="${cls}" title="দিন ${bn(i + 1)}: ${theme}"><a href="#/names?day=${i + 1}">${bn(i + 1)}</a></li>`;
        })}
      </ol>
      ${state.startedOn ? html`<p class="muted small">শুরু করেছেন ${bnDate(state.startedOn)}</p>` : ""}
    </section>`;
}
