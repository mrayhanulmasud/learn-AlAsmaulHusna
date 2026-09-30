import { ORDERS } from "../data/orders.js";
import { freshState } from "../store.js";
import { arabic } from "../components.js";
import { bn, html } from "../utils.js";

const FONTS = [
  { key: "scheherazade", label: "শেহেরজাদ (মোটা, সহজ নাসখ)" },
  { key: "naskh", label: "নোটো নাসখ (সরু, আধুনিক)" },
];
const THEMES = [
  { key: "auto", label: "ডিভাইস অনুযায়ী" },
  { key: "light", label: "হালকা" },
  { key: "dark", label: "গাঢ়" },
];
const FRONTS = [
  { key: "arabic", label: "আরবি নাম → অর্থ মনে করুন" },
  { key: "meaning", label: "বাংলা অর্থ → নাম মনে করুন" },
];

function radios(name, options, current, render = (o) => o.label) {
  return html`${options.map(
    (o) => html`<label class="radio"><input type="radio" name="${name}" value="${o.key}" ${o.key === current ? "checked" : ""}/><span>${render(o)}</span></label>`,
  )}`;
}

export default function settingsView(root, ctx) {
  const { settings } = ctx.state;
  const learned = Object.keys(ctx.state.learned).length;

  root.innerHTML = html`
    <header class="page-head"><h1>সেটিংস</h1></header>

    <section class="panel">
      <h2>শেখার ক্রম</h2>
      <p class="muted small">ক্রম বদলালেও শেখা নামগুলো সংরক্ষিত থাকবে; পরের পাঠে নতুন ক্রমের প্রথম অশেখা নামগুলো আসবে।</p>
      ${radios("order", Object.values(ORDERS), settings.order, (o) => html`<strong>${o.label}</strong><small class="muted">${o.description}</small>`)}
      <p class="small"><a class="link" href="#/about#ordering">এই ক্রম কেন? →</a></p>
    </section>

    <section class="panel">
      <h2>আরবি ফন্ট</h2>
      <p class="muted small">লেখা হয়েছে ইন্দো-পাক (উপমহাদেশীয়) স্বরচিহ্ন রীতিতে।</p>
      ${radios("font", FONTS, settings.font, (o) => html`<span>${o.label}</span>${arabic("اَلرَّحْمٰنُ اَلرَّحِيْمُ", `font-${o.key}`)}`)}
    </section>

    <section class="panel">
      <h2>পুনরাবৃত্তির কার্ড</h2>
      ${radios("front", FRONTS, settings.front)}
    </section>

    <section class="panel">
      <h2>থিম</h2>
      <div class="row wrap">${radios("theme", THEMES, settings.theme)}</div>
    </section>

    <section class="panel danger-zone">
      <h2>নতুন করে শুরু</h2>
      <p class="muted small">শেখা ${bn(learned)}টি নাম, পুনরাবৃত্তির সময়সূচি ও ধারা মুছে প্রথম দিন থেকে শুরু হবে। সেটিংস অপরিবর্তিত থাকবে।</p>
      <button class="btn btn-danger" data-action="reset">অগ্রগতি মুছে নতুন করে শুরু করুন</button>
    </section>

    <p class="center small"><a class="link" href="#/about">সম্পর্কে ও উচ্চারণ নির্দেশিকা →</a></p>`;

  root.addEventListener("change", (e) => {
    const { name, value } = e.target;
    if (!(name in settings)) return;
    ctx.update((st) => ({ ...st, settings: { ...st.settings, [name]: value } }));
    ctx.applySettings();
    ctx.toast("সংরক্ষিত হয়েছে");
  });

  root.querySelector("[data-action=reset]").addEventListener("click", async () => {
    const ok = await ctx.confirm({
      title: "সব অগ্রগতি মুছবেন?",
      body: "এটি আর ফেরানো যাবে না।",
      confirmLabel: "হ্যাঁ, নতুন করে শুরু",
    });
    if (!ok) return;
    ctx.update((st) => freshState(st.settings));
    ctx.toast("নতুন করে শুরু হয়েছে — বিসমিল্লাহ!");
    ctx.go("#/");
  });
}
