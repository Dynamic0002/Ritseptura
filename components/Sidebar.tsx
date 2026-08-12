"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Beef, BookOpen, Wallet, Bell, Settings } from "lucide-react";

const items = [
  { href: "/tannarx", label: "Tannarx", icon: Wallet },
  { href: "/retseptura", label: "Retseptura", icon: Beef, soon: true },
  { href: "/reseptlar", label: "Reseptlar", icon: BookOpen, soon: true },
  { href: "/xabarnomalar", label: "Xabarnomalar", icon: Bell, soon: true },
  { href: "/sozlamalar", label: "Sozlamalar", icon: Settings, soon: true },
];

export default function Sidebar() {
  const path = usePathname();
  return (
    <aside className="fixed left-0 top-0 bottom-0 z-40 flex w-[212px] flex-col gap-1.5 border-r border-edge bg-card p-3">
      <div className="mb-2 flex items-center gap-2.5 border-b border-edge px-2 pb-3.5 pt-1">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-red text-sm font-extrabold text-white">
          MC
        </div>
        <span className="text-sm font-extrabold tracking-tight">Meat City</span>
      </div>
      {items.map(({ href, label, icon: Icon, soon }) => {
        const active = path === href;
        return (
          <Link
            key={href}
            href={soon ? "#" : href}
            aria-disabled={soon}
            className={`flex items-center gap-3 rounded-[10px] px-3 py-2.5 text-sm font-semibold transition ${
              active ? "bg-red text-white" : "text-[#4a4744] hover:bg-soft"
            } ${soon ? "cursor-default opacity-45 hover:bg-transparent" : ""}`}
          >
            <Icon size={18} className="shrink-0" />
            <span className="flex-1">{label}</span>
            {soon && <span className="text-[10px] font-bold text-muted">tez orada</span>}
          </Link>
        );
      })}
    </aside>
  );
}
