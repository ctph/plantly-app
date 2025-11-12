import { useEffect, useState } from "react";

const LS_KEY = "plantly.reminders.v1";

function readReminders() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function nextUpcoming(reminders) {
  const now = Date.now();
  const future = reminders
    .filter((r) => !r.done && r.whenISO && new Date(r.whenISO).getTime() >= now)
    .sort((a, b) => new Date(a.whenISO) - new Date(b.whenISO));
  return future[0] || null;
}

export default function useReminders() {
  const [all, setAll] = useState(() => readReminders());
  const [next, setNext] = useState(() => nextUpcoming(readReminders()));

  const refresh = () => {
    const r = readReminders();
    setAll(r);
    setNext(nextUpcoming(r));
  };

  useEffect(() => {
    // update when localStorage changes (other tabs) or our custom event fires
    const onStorage = (e) => {
      if (e.key === LS_KEY) refresh();
    };
    const onCustom = () => refresh();

    window.addEventListener("storage", onStorage);
    window.addEventListener("plantly:remindersUpdated", onCustom);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("plantly:remindersUpdated", onCustom);
    };
  }, []);

  return { all, next, refresh };
}
