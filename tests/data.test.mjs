import { test } from "node:test";
import assert from "node:assert/strict";
import { NAMES } from "../js/data/names.js";
import { MEMORY_GROUPS, ORIGINAL_GROUPS, orderIds } from "../js/data/orders.js";

const FIELDS = ["id", "num", "ar", "tr", "bnPron", "bn", "en", "root"];

test("there are exactly 99 names with unique ids and numbers 1–99", () => {
  assert.equal(NAMES.length, 99);
  assert.equal(new Set(NAMES.map((n) => n.id)).size, 99);
  NAMES.forEach((n, i) => assert.equal(n.num, i + 1, n.id));
});

test("every name has all fields filled", () => {
  for (const n of NAMES) {
    for (const f of FIELDS) assert.ok(String(n[f] ?? "").trim(), `${n.id}.${f}`);
    assert.match(n.ar, /^[؀-ۿ\s]+$/, `${n.id}.ar is Arabic`);
    assert.match(n.bnPron, /[ঀ-৿]/, `${n.id}.bnPron is Bangla`);
    assert.ok([3, 4].includes(n.root.split(" ").length), `${n.id}.root has 3–4 letters`);
  }
});

test("Arabic uses Indo-Pak style: plain alif, no alif wasla", () => {
  for (const n of NAMES) assert.ok(!n.ar.includes("ٱ"), n.id);
});

for (const [name, groups] of [["memory", MEMORY_GROUPS], ["original", ORIGINAL_GROUPS]]) {
  test(`${name} order: 33 groups of 3 covering every name once`, () => {
    assert.equal(groups.length, 33);
    for (const g of groups) assert.equal(g.ids.length, 3);
    const ids = orderIds(name);
    assert.equal(new Set(ids).size, 99);
    assert.deepEqual([...ids].sort(), NAMES.map((n) => n.id).sort());
  });
}

test("every memory group has a theme, hook and at least one reference", () => {
  for (const g of MEMORY_GROUPS) {
    assert.ok(g.theme && g.themeEn && g.hook, g.ids.join());
    assert.ok(g.quotes.length > 0, g.ids.join());
    for (const q of g.quotes) assert.ok(q.ar && q.ref, g.ids.join());
  }
});
