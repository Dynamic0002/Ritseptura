// Meat City — tannarx hisob yadrosi.
// Hozirgi dasturdagi formulalar aynan shu tarzda ko'chirildi.

export interface CostInput {
  weight: number; // 1 dona og'irligi, gramm
  loss: number; // termik yo'qotish, % (0..100)
  qadoq: number; // qadoq materiallari jami, so'm/dona (marja qo'llanmaydi)
  marja: number; // marja, % (0..100)
  bonus: number; // sotuv bonusi, % (0..100)
}

// Yordamchi: 1 dona uchun farsh grammi (termik yo'qotish bilan)
export function farshGrams(weight: number, lossPct: number): number {
  const loss = lossPct / 100;
  return loss >= 1 ? Infinity : weight / (1 - loss);
}

// TESKARI: sotuv narxidan (P) -> 1 kg farsh maksimal narxi
export function reverseFromPrice(P: number, inp: CostInput) {
  const b = inp.bonus / 100;
  const m = inp.marja / 100;
  const farshGr = farshGrams(inp.weight, inp.loss);
  const bonusSum = P * b;
  const base = P - bonusSum - inp.qadoq;
  const marjaSum = base > 0 ? base * m : 0;
  const farshPiece = base - marjaSum; // 1 dona farsh tannarxi
  const farshKg = farshPiece > 0 && farshGr > 0 ? farshPiece / (farshGr / 1000) : 0;
  return { bonusSum, base, marjaSum, farshPiece, farshKg, farshGr };
}

// OLDINGA: 1 kg farsh narxidan -> sotuv narxi (P)
export function forwardFromFarsh(farshKg: number, inp: CostInput) {
  const b = inp.bonus / 100;
  const m = inp.marja / 100;
  const farshGr = farshGrams(inp.weight, inp.loss);
  const farshPiece = (farshKg * farshGr) / 1000; // 1 dona farsh xarajati
  const cost = farshPiece + inp.qadoq; // to'liq tannarx
  const marjaSum = m < 1 ? (farshPiece * m) / (1 - m) : NaN;
  const price = m < 1 && b < 1 ? farshPiece / (1 - m) / (1 - b) + inp.qadoq / (1 - b) : NaN;
  const bonusSum = isFinite(price) ? price * b : NaN;
  return { farshPiece, cost, marjaSum, price, bonusSum, farshGr };
}
