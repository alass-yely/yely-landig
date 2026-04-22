export function normalizePhone(phone: string) {
  let clean = phone.replace(/\D/g, "");

  if (clean.startsWith("00225")) {
    clean = clean.slice(2);
  }

  if (clean.startsWith("225")) {
    return `+${clean}`;
  }

  return `+225${clean}`;
}
