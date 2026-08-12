"use client";

import { useState, useMemo } from "react";
import Sidebar from "@/components/Sidebar";
import { reverseFromPrice, forwardFromFarsh, type CostInput } from "@/lib/calc";
import { fInt, fSom, fNum } from "@/lib/format";

type Dir = "rev" | "fwd";

function NumField({
  label,
  value,
  onChange,
  suffix,
  step = 1,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
  suffix?: string;
  step?: number;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-[13px] font-medium text-muted">{label}</span>
      <div className="flex items-center rounded-[9px] border border-edgeStrong bg-white focus-within:border-red">
        <input
          type="number"
          value={Number.isFinite(value) ? value : ""}
          step={step}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          className="mono w-full bg-transparent px-3 py-2.5 text-[15px] outline-none"
        />
        {suffix && <span className="pr-3 text-sm text-muted">{suffix}</span>}
      </div>
    </label>
  );
}

function Row({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="sheet-row">
      <span className={`lbl ${strong ? "text-ink" : "text-[#4a4744]"}`}>{label}</span>
      <span className={`val ${strong ? "text-red-deep" : ""}`}>{value}</span>
    </div>
  );
}

export default function TannarxPage() {
  const [dir, setDir] = useState<Dir>("rev");
  const [P, setP] = useState(13000); // sotuv narxi
  const [farshKg, setFarshKg] = useState(13000); // 1 kg farsh narxi
  const [inp, setInp] = useState<CostInput>({
    weight: 340,
    loss: 0,
    qadoq: 1326,
    marja: 40,
    bonus: 32,
  });

  const set = (k: keyof CostInput) => (n: number) => setInp((s) => ({ ...s, [k]: n }));

  const rev = useMemo(() => reverseFromPrice(P, inp), [P, inp]);
  const fwd = useMemo(() => forwardFromFarsh(farshKg, inp), [farshKg, inp]);

  return (
    <div className="min-h-screen">
      <Sidebar />
      <main className="relative z-10 ml-[212px] px-8 py-8">
        <header className="mb-6">
          <h1 className="text-2xl font-extrabold tracking-tight">Tannarx va narx</h1>
          <p className="mt-1 text-sm text-muted">
            Sotuv narxidan farsh narxini yoki farsh narxidan sotuv narxini hisoblang.
          </p>
        </header>

        {/* Yo'nalish tanlash */}
        <div className="mb-6 inline-flex rounded-[10px] border border-edge bg-card p-1">
          {(
            [
              ["rev", "Sotuv narxidan → farsh"],
              ["fwd", "Farsh narxidan → sotuv"],
            ] as const
          ).map(([d, t]) => (
            <button
              key={d}
              onClick={() => setDir(d)}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                dir === d ? "bg-red text-white" : "text-[#4a4744] hover:bg-soft"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Kirish maydonlari */}
          <section className="rounded-2xl border border-edge bg-card p-6">
            <h2 className="mb-4 text-base font-bold">Ma'lumotlar</h2>
            <div className="grid grid-cols-2 gap-4">
              {dir === "rev" ? (
                <NumField label="Sotuv narxi (dona)" value={P} onChange={setP} suffix="so'm" step={100} />
              ) : (
                <NumField
                  label="1 kg farsh narxi"
                  value={farshKg}
                  onChange={setFarshKg}
                  suffix="so'm"
                  step={100}
                />
              )}
              <NumField label="1 dona og'irligi" value={inp.weight} onChange={set("weight")} suffix="g" />
              <NumField label="Termik yo'qotish" value={inp.loss} onChange={set("loss")} suffix="%" />
              <NumField label="Qadoq (jami)" value={inp.qadoq} onChange={set("qadoq")} suffix="so'm" step={10} />
              <NumField label="Marja" value={inp.marja} onChange={set("marja")} suffix="%" />
              <NumField label="Sotuv bonusi" value={inp.bonus} onChange={set("bonus")} suffix="%" />
            </div>
          </section>

          {/* Hisob varag'i */}
          <section className="rounded-2xl border border-edge bg-card p-6">
            <h2 className="mb-4 text-base font-bold">Hisob varag'i</h2>
            {dir === "rev" ? (
              <div>
                <Row label="Sotuv narxi" value={fInt(P)} />
                <Row label={`Sotuv bonusi (${inp.bonus}%)`} value={fInt(rev.bonusSum)} />
                <Row label="Qadoq" value={fInt(inp.qadoq)} />
                <Row label={`Marja (${inp.marja}%)`} value={fInt(rev.marjaSum)} />
                <Row label="Farshga qoladi (dona tannarx)" value={fInt(Math.max(0, rev.farshPiece))} strong />
                <Row label="Farsh sarfi (yo'qotish bilan)" value={fNum(rev.farshGr) + " g"} />
                <div className="mt-4 rounded-xl bg-red-soft p-5 text-center">
                  <div className="text-[13px] font-semibold text-red-deep">1 kg farsh maksimal narxi</div>
                  <div className="mono mt-1 text-3xl font-extrabold text-red-deep">
                    {rev.farshPiece > 0 ? fSom(rev.farshKg) : "0 so'm"}
                  </div>
                  <div className="mt-1 text-xs text-muted">
                    {inp.weight} g dona, marja {inp.marja}% saqlangan holda
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <Row label="1 kg farsh narxi" value={fInt(farshKg)} />
                <Row label="Farsh sarfi (yo'qotish bilan)" value={fNum(fwd.farshGr) + " g"} />
                <Row label="Farsh xarajati (dona)" value={fInt(fwd.farshPiece)} />
                <Row label="Qadoq" value={fInt(inp.qadoq)} />
                <Row label="To'liq tannarx" value={fInt(fwd.cost)} strong />
                <Row label={`Marja (${inp.marja}%)`} value={fInt(fwd.marjaSum)} />
                <Row label={`Sotuv bonusi (${inp.bonus}%)`} value={fInt(fwd.bonusSum)} />
                <div className="mt-4 rounded-xl bg-red-soft p-5 text-center">
                  <div className="text-[13px] font-semibold text-red-deep">Sotuv narxi (dona)</div>
                  <div className="mono mt-1 text-3xl font-extrabold text-red-deep">
                    {isFinite(fwd.price) ? fSom(fwd.price) : "—"}
                  </div>
                  <div className="mt-1 text-xs text-muted">
                    marja {inp.marja}% va bonus {inp.bonus}% bilan
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>

        <p className="mt-8 text-xs text-muted">
          Meat City · Next.js versiyasi (yadro). Retseptura, reseptlar kutubxonasi va boshqa
          bo'limlar keyingi bosqichlarda ko'chiriladi.
        </p>
      </main>
    </div>
  );
}
