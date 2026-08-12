// Raqamlarni o'zbekcha ko'rinishda formatlash (vergul kasr, bo'sh joy mingliklar)
export function fInt(n: number): string {
  if (!isFinite(n)) return "—";
  return Math.round(n).toLocaleString("ru-RU").replace(/,/g, " ");
}
export function fNum(n: number, dec = 3): string {
  if (!isFinite(n)) return "—";
  return n.toLocaleString("ru-RU", { maximumFractionDigits: dec }).replace(/,/g, "@").replace(/\./g, ",").replace(/@/g, " ");
}
export function fSom(n: number): string {
  return fInt(n) + " so'm";
}
