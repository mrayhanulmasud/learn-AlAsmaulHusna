# আসমাউল হুসনা — Learn the 99 Names of Allah

A static website for memorizing the 99 Beautiful Names of Allah, three new names a day. Everything is in Bangla, with English meanings too.

- **Flashcards:** the Arabic name on the front. Flip the card to see the Bangla pronunciation, the Bangla and English meanings, the transliteration and the Arabic root, with links to other names from the same root.
- **3 new names per day:** 33 days in total. A new lesson opens each calendar day. You can also choose to learn ahead.
- **Memory hooks:** each day's three names are tied to one Quranic verse or du‘a, a shared root, or an opposite pair. The verse or du‘a is quoted with its reference.
- **Quiz after every lesson:** questions go both ways (name → meaning and meaning → name). Anything answered wrong comes back again.
- **Spaced repetition:** learned names come back for review after 1, 3, 7, 14, 30 and 60 days. A forgotten name starts again from day 1.
- **Progress saved in the browser** (`localStorage`). There's no account and no server. You can restart at any time from *Settings*.
- **Two learning orders:** the memory-friendly order (the default) and the original order. You can switch any time without losing progress.
- **Light and dark themes, a choice of Arabic font, and a phone-friendly layout** with a bottom tab bar and keyboard shortcuts.

The full list of names with every field, in both orders and with the memory hooks, is in [`docs/NAMES.md`](docs/NAMES.md).

## Publish on GitHub Pages (project site)

The site is plain HTML, CSS and JavaScript with no build step, so GitHub Pages can serve the repository root directly.

1. Make sure the repository is **public** and these files are on the `main` branch.
2. On GitHub, open the repository and go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
4. Choose branch **`main`** and folder **`/ (root)`**, then click **Save**.
5. After a minute or two the site is live at
   `https://mrayhanulmasud.github.io/learn-AlAsmaulHusna/`

All paths are relative and routing uses `#/…` URLs, so the site works under the `/learn-AlAsmaulHusna/` sub-path without any extra configuration. `.nojekyll` tells Pages to serve the files as they are.

## Run locally

The JavaScript is loaded as ES modules, so the site needs a web server. Opening `index.html` directly with `file://` does not work.

```bash
npm start            # = python3 -m http.server 8000 → http://localhost:8000
npm test             # data integrity + learning-logic tests (Node 18+)
npm run docs         # regenerate docs/NAMES.md from the data
```

## Project structure

```
index.html               page shell: header, navigation, dialog, toast
css/style.css            design tokens (light/dark), layout, components
js/data/names.js         the 99 names — Arabic, Bangla pronunciation, meanings, root
js/data/orders.js        original order + memory order (themes, hooks, verse quotes)
js/schedule.js           pure logic: dates, daily lessons, spaced repetition, streak
js/store.js              saving/loading progress in localStorage
js/components.js         flashcard, name details, memory hook, progress ring
js/views/*.js            home, learn, review/practice, names, settings, about
js/app.js                router, state, dialogs, keyboard shortcuts
scripts/build-docs.mjs   generates docs/NAMES.md
tests/*.test.mjs         node:test unit tests
```

**Editing content:** change `js/data/names.js` or `js/data/orders.js`, run `npm test` and `npm run docs`, then commit. Never change a name's `id`, because saved progress is keyed by it.

## Content notes

- **The list:** the well-known list of 99 names in Jami‘ at-Tirmidhi 3507. The hadith that Allah has 99 names is in Sahih al-Bukhari 2736 and 7392, and Sahih Muslim 2677. Hadith scholars consider the enumerated list an addition by a narrator, but the names themselves come from the Quran and Sunnah.
- **Arabic:** written with Indo-Pak (subcontinent) vowel marking, as in Bangladeshi and Indian mushafs. That means a plain alif for the article (اَلْ), a sukun on long و and ي, and a standing fatha (ٰ). It is shown in *Scheherazade New*, a bold and simple Naskh; *Noto Naskh Arabic* is available in Settings. To use a true Indo-Pak Nastaleeq font, add the font file and a matching `@font-face` rule, then point `--font-ar` at it in `css/style.css`. Check the font's license first.
- **Bangla pronunciation:** follows one consistent scheme. For example ‘ = ع, ’ = ء, ক্ব = ق, দ্ব = ض, and ছ = ث. The *About* page explains the full scheme. Bangla script can't represent every Arabic sound exactly, so the best way to learn correct pronunciation is from a qualified qari.
- **Meanings:** condensed from how each name is used in the Quran and from the classical explanations of as-Sa‘di, Ibn al-Qayyim and al-Ghazali (*al-Maqsad al-Asna*).

## License

[Apache-2.0](LICENSE)
