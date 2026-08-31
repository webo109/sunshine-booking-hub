// Newsletter subscriber list, stored in localStorage for the demo.
// Real activation wires this to Resend / Mailchimp / similar.
//
// Lowercase + trim before storing so "Foo@bar.com" and " foo@bar.com "
// resolve to the same subscriber.

const STORAGE_KEY = "sunshine_newsletter_v1";

const normalize = (email: string) => email.trim().toLowerCase();

export function loadSubscribers(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

/** Add an email to the subscriber list. Returns true on first subscribe, false if already on the list. */
export function subscribe(email: string): boolean {
  if (typeof window === "undefined") return false;
  const e = normalize(email);
  const list = loadSubscribers();
  if (list.includes(e)) return false;
  list.push(e);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  return true;
}

/** Remove an email from the subscriber list. Returns true on successful removal, false if not on the list. */
export function unsubscribe(email: string): boolean {
  if (typeof window === "undefined") return false;
  const e = normalize(email);
  const list = loadSubscribers();
  const idx = list.indexOf(e);
  if (idx === -1) return false;
  list.splice(idx, 1);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  return true;
}

export function isSubscribed(email: string): boolean {
  return loadSubscribers().includes(normalize(email));
}
