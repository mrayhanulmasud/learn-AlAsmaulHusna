import { test } from "node:test";
import assert from "node:assert/strict";
import { freshState } from "../js/store.js";
import {
  addDays, applyLesson, applyReview, currentStreak, daysBetween, dueIds,
  INTERVALS, lessonDoneOn, MAX_BOX, nextLessonIds,
} from "../js/schedule.js";

const DAY1 = "2026-01-30";

test("date helpers cross month and year boundaries", () => {
  assert.equal(addDays("2026-01-30", 3), "2026-02-02");
  assert.equal(addDays("2025-12-31", 1), "2026-01-01");
  assert.equal(daysBetween("2026-02-27", "2026-03-01"), 2);
});

test("first lesson follows the memory order, then the original order", () => {
  const s = freshState();
  assert.deepEqual(nextLessonIds("memory", s.learned), ["rahman", "rahim", "malik"]);
  const after = applyLesson(s, ["rahman", "rahim", "malik"], DAY1);
  assert.deepEqual(nextLessonIds("memory", after.learned), ["quddus", "salam", "mumin"]);
  assert.deepEqual(nextLessonIds("original", after.learned), ["malikulmulk", "dhuljalal", "quddus"]);
});

test("a lesson marks the day done and schedules the first review tomorrow", () => {
  const s = applyLesson(freshState(), ["rahman", "rahim", "malik"], DAY1);
  assert.ok(lessonDoneOn(s.history, DAY1));
  assert.ok(!lessonDoneOn(s.history, addDays(DAY1, 1)));
  assert.equal(s.learned.rahman.box, 1);
  assert.deepEqual(dueIds(s, DAY1), []);
  assert.deepEqual(dueIds(s, addDays(DAY1, 1)), ["rahman", "rahim", "malik"]);
});

test("remembering moves a card up a box; forgetting sends it back to box 1", () => {
  let s = applyLesson(freshState(), ["rahman"], DAY1);
  const d2 = addDays(DAY1, 1);
  s = applyReview(s, "rahman", true, d2);
  assert.equal(s.learned.rahman.box, 2);
  assert.equal(s.learned.rahman.due, addDays(d2, INTERVALS[2]));
  s = applyReview(s, "rahman", false, d2);
  assert.equal(s.learned.rahman.box, 1);
  assert.equal(s.learned.rahman.lapses, 1);
  for (let i = 0; i < 20; i++) s = applyReview(s, "rahman", true, d2);
  assert.equal(s.learned.rahman.box, MAX_BOX);
});

test("streak counts consecutive active days and resets after a gap", () => {
  let s = applyLesson(freshState(), ["rahman"], DAY1);
  s = applyLesson(s, ["rahim"], addDays(DAY1, 1));
  assert.equal(currentStreak(s, addDays(DAY1, 1)), 2);
  assert.equal(currentStreak(s, addDays(DAY1, 2)), 2); // today not done yet
  assert.equal(currentStreak(s, addDays(DAY1, 3)), 0); // a day was missed
  s = applyLesson(s, ["malik"], addDays(DAY1, 4));
  assert.equal(s.activity.streak, 1);
  assert.equal(s.activity.best, 2);
});

test("all 99 names are learned after 33 lessons", () => {
  let s = freshState();
  let day = DAY1;
  for (let i = 0; i < 33; i++) {
    s = applyLesson(s, nextLessonIds("memory", s.learned), day);
    day = addDays(day, 1);
  }
  assert.equal(Object.keys(s.learned).length, 99);
  assert.deepEqual(nextLessonIds("memory", s.learned), []);
});
