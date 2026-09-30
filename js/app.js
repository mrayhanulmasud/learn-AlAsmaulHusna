/**
 * App shell: holds the state, routes between views (hash based, so it works
 * on GitHub Pages without server config) and provides shared UI services.
 */
import { NAME_BY_ID } from "./data/names.js";
import { dateKey, dueIds } from "./schedule.js";
import { load, save } from "./store.js";
import { flashcard, hookPanel, ICONS } from "./components.js";
import { bn, html } from "./utils.js";
import homeView from "./views/home.js";
import learnView from "./views/learn.js";
import reviewView from "./views/review.js";
import namesView from "./views/names.js";
import settingsView from "./views/settings.js";
import aboutView from "./views/about.js";

const ROUTES = {
  "/": { view: homeView, title: "হোম", nav: "home" },
  "/learn": { view: learnView, title: "শিখুন", nav: "learn" },
  "/review": { view: reviewView, title: "পুনরাবৃত্তি", nav: "review" },
  "/practice": { view: (root, ctx, opts) => reviewView(root, ctx, { ...opts, practice: true }), title: "অনুশীলন", nav: "review" },
  "/names": { view: namesView, title: "সব নাম", nav: "names" },
  "/settings": { view: settingsView, title: "সেটিংস", nav: "settings" },
  "/about": { view: aboutView, title: "সম্পর্কে", nav: "settings" },
};

let state = load();
let saveWarned = false;
let keyHandler = null;

const main = document.getElementById("main");
const nav = document.getElementById("nav");

const ctx = {
  get state() {
    return state;
  },
  today: () => dateKey(),
  update(fn) {
    state = fn(state);
    if (!save(state) && !saveWarned) {
      saveWarned = true;
      toast("এই ব্রাউজারে অগ্রগতি সংরক্ষণ করা যাচ্ছে না (প্রাইভেট মোড?)");
    }
    renderNavBadge();
  },
  go: (hash) => (location.hash === hash ? route() : (location.hash = hash)),
  toast,
  confirm: confirmDialog,
  applySettings,
  /** Views register one keyboard handler; it is cleared on navigation. */
  onKey: (fn) => (keyHandler = fn),
};

/* ---------------- routing ---------------- */

function parseHash() {
  // "#/names?day=3" or "#/about#ordering"
  const raw = location.hash.replace(/^#/, "") || "/";
  const [pathAndQuery, anchor] = raw.split("#");
  const [path, query = ""] = pathAndQuery.split("?");
  return { path: ROUTES[path] ? path : "/", params: new URLSearchParams(query), anchor };
}

function route() {
  const { path, params, anchor } = parseHash();
  const r = ROUTES[path];
  keyHandler = null;

  // Fresh element per view so old listeners are dropped with it.
  const root = document.createElement("div");
  root.className = `view view-${r.nav}`;
  main.replaceChildren(root);
  r.view(root, ctx, { params });

  document.title = `${r.title} · আসমাউল হুসনা`;
  for (const a of nav.querySelectorAll("a")) a.toggleAttribute("aria-current", a.dataset.nav === r.nav);
  if (anchor) document.getElementById(anchor)?.scrollIntoView();
  else if (!params.get("day")) window.scrollTo(0, 0);
  main.focus({ preventScroll: true });
}

function renderNavBadge() {
  const due = dueIds(state, dateKey()).length;
  const badge = nav.querySelector("[data-nav=review] .badge");
  badge.textContent = due ? bn(due) : "";
  badge.hidden = !due;
}

/* ---------------- settings → document ---------------- */

function applySettings() {
  const { theme, font } = state.settings;
  const rootEl = document.documentElement;
  if (theme === "auto") rootEl.removeAttribute("data-theme");
  else rootEl.dataset.theme = theme;
  rootEl.dataset.font = font;
  const dark = theme === "dark" || (theme === "auto" && matchMedia("(prefers-color-scheme: dark)").matches);
  document.querySelector("meta[name=theme-color]")?.setAttribute("content", dark ? "#062820" : "#f7f1e3");
  const toggle = document.getElementById("theme-toggle");
  toggle.innerHTML = String(dark ? ICONS.sun : ICONS.moon);
  toggle.setAttribute("aria-label", dark ? "হালকা থিম" : "গাঢ় থিম");
}

/* ---------------- dialogs & toasts ---------------- */

const dialog = document.getElementById("dialog");

function openName(id) {
  const n = NAME_BY_ID[id];
  if (!n) return;
  dialog.innerHTML = String(html`
    <div class="dialog-body">
      <button class="icon-btn dialog-close" data-action="close-dialog" aria-label="বন্ধ করুন">${ICONS.close}</button>
      ${flashcard(n, { flipped: true })}
      ${hookPanel(id, { open: false })}
    </div>`);
  if (!dialog.open) dialog.showModal();
}

function confirmDialog({ title, body, confirmLabel }) {
  return new Promise((resolve) => {
    dialog.innerHTML = String(html`
      <form method="dialog" class="dialog-body confirm">
        <h2>${title}</h2>
        <p class="muted">${body}</p>
        <div class="row">
          <button class="btn" value="cancel">বাতিল</button>
          <button class="btn btn-danger" value="ok">${confirmLabel}</button>
        </div>
      </form>`);
    dialog.returnValue = "";
    dialog.addEventListener("close", () => resolve(dialog.returnValue === "ok"), { once: true });
    dialog.showModal();
  });
}

let toastTimer;
function toast(message) {
  const el = document.getElementById("toast");
  el.textContent = message;
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), 2600);
}

/* ---------------- global events ---------------- */

function flip(card) {
  const flipped = card.classList.toggle("is-flipped");
  card.setAttribute("aria-pressed", String(flipped));
  card.querySelector(".fc-front")?.setAttribute("aria-hidden", String(flipped));
  card.querySelector(".fc-back")?.setAttribute("aria-hidden", String(!flipped));
  card.dispatchEvent(new CustomEvent("flip", { bubbles: true, detail: { flipped } }));
}

document.addEventListener("click", (e) => {
  const openBtn = e.target.closest("[data-action=open-name]");
  if (openBtn) return openName(openBtn.dataset.id);
  if (e.target.closest("[data-action=close-dialog]") || e.target === dialog) return dialog.close();
  const reload = e.target.closest("[data-action=reload]");
  if (reload) {
    e.preventDefault();
    return route();
  }
  // Don't flip when the user taps a link/button inside the card's back side.
  if (e.target.closest(".flashcard button, .flashcard a")) return;
  const card = e.target.closest("[data-action=flip]");
  if (card) flip(card);
});

document.addEventListener("keydown", (e) => {
  if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey || dialog.open) return;
  if (e.target.matches("input, textarea, select")) return;
  const card = main.querySelector("[data-action=flip]");
  // Space/Enter flip the card unless another control (button, link…) has focus.
  const onControl = e.target !== card && e.target.closest?.("button, a, summary, label");
  if (card && !onControl && (e.key === " " || e.key === "Enter")) {
    e.preventDefault();
    return flip(card);
  }
  if (keyHandler?.(e)) e.preventDefault();
});

document.getElementById("theme-toggle").addEventListener("click", () => {
  const dark = document.documentElement.dataset.theme === "dark" ||
    (!document.documentElement.dataset.theme && matchMedia("(prefers-color-scheme: dark)").matches);
  ctx.update((st) => ({ ...st, settings: { ...st.settings, theme: dark ? "light" : "dark" } }));
  applySettings();
});

matchMedia("(prefers-color-scheme: dark)").addEventListener?.("change", applySettings);
window.addEventListener("hashchange", route);
// Another tab changed the progress → reload it here too.
window.addEventListener("storage", () => {
  state = load();
  applySettings();
  renderNavBadge();
});
// Returning to the tab on a new day should show the new lesson.
let lastDay = dateKey();
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible" && dateKey() !== lastDay) {
    lastDay = dateKey();
    renderNavBadge();
    if (parseHash().path === "/") route();
  }
});

applySettings();
renderNavBadge();
route();
