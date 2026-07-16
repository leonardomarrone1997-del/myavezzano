import { readFile } from "node:fs/promises";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const root = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const referenceDate = process.env.CALENDAR_QA_DATE || new Date().toISOString().slice(0, 10);

function eventDate(date) {
  return new Date(`${date}T12:00:00`);
}

function eventDurationDays(item) {
  if (!item.endDate) return 1;
  return Math.max(1, Math.round((eventDate(item.endDate) - eventDate(item.date)) / 86400000) + 1);
}

function isLongRunningProgram(item) {
  const text = [item.title, item.time, item.detail, item.price, item.category].filter(Boolean).join(" ").toLowerCase();
  return eventDurationDays(item) > 7 || /date variabili|orari vari|centro estivo|centri estivi|iscrizioni|programma|voucher/.test(text);
}

function eventIsLiveToday(item) {
  return !isLongRunningProgram(item) && item.date <= referenceDate && (item.endDate || item.date) >= referenceDate;
}

function eventStartsOnOrAfter(item) {
  return item.date >= referenceDate;
}

function eventIsHomeCandidate(item) {
  return eventIsLiveToday(item) || eventStartsOnOrAfter(item);
}

function eventSortDate(item) {
  return eventIsLiveToday(item) ? referenceDate : item.date;
}

function sortEventsByCurrentDate(items) {
  return [...items].sort((a, b) => eventSortDate(a).localeCompare(eventSortDate(b)) || String(a.time || "").localeCompare(String(b.time || "")));
}

function homeSelection(events) {
  const avezzanoEvents = sortEventsByCurrentDate(events.filter((item) => item.area === "Avezzano"));
  const nearbyEvents = sortEventsByCurrentDate(events.filter((item) => item.area !== "Avezzano"));
  const avezzanoToday = avezzanoEvents.filter(eventIsLiveToday);
  const nearbyToday = nearbyEvents.filter(eventIsLiveToday);
  const nextAvezzano = avezzanoEvents.find(eventStartsOnOrAfter);
  const nextNearby = nearbyEvents.find(eventStartsOnOrAfter);
  const primary = avezzanoToday[0] || nearbyToday[0] || nextAvezzano || nextNearby;
  const nextSuggested = sortEventsByCurrentDate([nextAvezzano, nextNearby].filter((event) => event && event.id !== primary?.id))[0];
  return {
    primary,
    avezzanoToday,
    nearbyToday,
    nextSuggested
  };
}

function fail(message, detail = "") {
  console.error(`Calendar QA failed: ${message}`);
  if (detail) console.error(detail);
  process.exit(1);
}

const source = await readFile(path.join(root, "events-data.js"), "utf8");
const sandbox = { window: {} };
vm.runInNewContext(source, sandbox);

const events = sandbox.window.MYAVEZZANO_EVENTS || [];
if (!events.length) fail("nessun evento presente in events-data.js");

const invalidRanges = events.filter((item) => item.endDate && item.endDate < item.date);
if (invalidRanges.length) {
  fail("intervalli data non validi", invalidRanges.map((item) => `${item.id}: ${item.date} > ${item.endDate}`).join("\n"));
}

const homeCandidates = sortEventsByCurrentDate(events.filter(eventIsHomeCandidate));
if (!homeCandidates.length) {
  fail(`nessun evento futuro o valido da mostrare dopo ${referenceDate}`);
}

const { primary: homeEvent, avezzanoToday, nearbyToday } = homeSelection(events);
if (!homeEvent) {
  fail(`nessun evento valido per la home dopo ${referenceDate}`);
}

if (avezzanoToday.length && homeEvent.area !== "Avezzano") {
  fail("la home non darebbe priorita agli eventi di oggi ad Avezzano", `${homeEvent.id}: ${homeEvent.title} (${homeEvent.area})`);
}

if (!avezzanoToday.length && nearbyToday.length && !eventIsLiveToday(homeEvent)) {
  fail("la home ignorerebbe eventi di oggi nei comuni limitrofi", `${homeEvent.id}: ${homeEvent.title} (${homeEvent.date})`);
}

if (homeEvent.date < referenceDate && !eventIsLiveToday(homeEvent)) {
  fail("la home proporrebbe un evento scaduto", `${homeEvent.id}: ${homeEvent.title} (${homeEvent.date}${homeEvent.endDate ? `-${homeEvent.endDate}` : ""})`);
}

if (isLongRunningProgram(homeEvent) && homeEvent.date < referenceDate) {
  fail("un programma continuativo vecchio sarebbe promosso in home", `${homeEvent.id}: ${homeEvent.title} (${homeEvent.date}-${homeEvent.endDate})`);
}

const stalePromoted = events.filter((item) => item.date < referenceDate && !eventIsLiveToday(item) && eventIsHomeCandidate(item));
if (stalePromoted.length) {
  fail("eventi scaduti rilevati tra i candidati home", stalePromoted.map((item) => `${item.id}: ${item.title}`).join("\n"));
}

const publicSummerEvents = events.filter((item) => item.date >= "2026-06-21" && item.date <= "2026-09-22" && eventIsHomeCandidate(item));
const staleSummerEvents = publicSummerEvents.filter((item) => item.date < referenceDate && !eventIsLiveToday(item));
if (staleSummerEvents.length) {
  fail("eventi estivi vecchi visibili nella sezione pubblica", staleSummerEvents.map((item) => `${item.id}: ${item.title} (${item.date})`).join("\n"));
}

console.log(`Calendar QA ok: ${homeEvent.title} (${homeEvent.date}) selezionabile dal ${referenceDate}.`);
