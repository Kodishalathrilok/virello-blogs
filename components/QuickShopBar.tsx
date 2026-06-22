"use client";

import { ChevronRight } from "lucide-react";

export type QuickShopItem = { id: string; name: string };

function truncate(name: string, max = 20) {
  return name.length > max ? `${name.slice(0, max).trimEnd()}…` : name;
}

function scrollToProduct(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function openDrawer() {
  window.dispatchEvent(new CustomEvent("virello:open-shop"));
}

export default function QuickShopBar({
  products,
}: {
  products: QuickShopItem[];
}) {
  if (products.length === 0) return null;
  const many = products.length > 3;

  return (
    <div className="sticky top-[60px] z-40 border-b border-grey-200 bg-white">
      <div className="mx-auto flex h-11 max-w-7xl items-center gap-4 px-6">
        <span className="font-label hidden shrink-0 text-[11px] font-semibold uppercase tracking-[0.08em] text-grey-400 sm:block">
          In This Post:
        </span>

        {/* Desktop / tablet: scrollable pill row */}
        <div
          className={`min-w-0 flex-1 items-center gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
            many ? "hidden sm:flex" : "flex"
          }`}
        >
          {products.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => scrollToProduct(p.id)}
              title={p.name}
              className="font-label shrink-0 cursor-pointer rounded-full border border-black bg-white px-3.5 py-1 text-[12px] text-black transition-colors duration-200 hover:bg-black hover:text-white"
            >
              {truncate(p.name)}
            </button>
          ))}
        </div>

        {/* Mobile with >3 products: single chip that opens the drawer */}
        {many ? (
          <button
            type="button"
            onClick={openDrawer}
            className="font-label flex shrink-0 cursor-pointer items-center gap-1 rounded-full border border-black bg-white px-3.5 py-1 text-[12px] text-black transition-colors duration-200 hover:bg-black hover:text-white sm:hidden"
          >
            {products.length} products
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        ) : null}
      </div>
    </div>
  );
}
