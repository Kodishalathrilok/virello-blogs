"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ShoppingBag, X } from "lucide-react";
import type { ProductCardProps } from "@/components/ProductCard";

export default function QuickShopDrawer({
  products,
}: {
  products: ProductCardProps[];
}) {
  const [open, setOpen] = useState(false);
  const [pulse, setPulse] = useState(true);

  // Open in response to the QuickShopBar mobile chip (decoupled via event)
  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("virello:open-shop", handler);
    return () => window.removeEventListener("virello:open-shop", handler);
  }, []);

  // Stop drawing attention once the button has been around for a moment
  useEffect(() => {
    const t = window.setTimeout(() => setPulse(false), 3600);
    return () => window.clearTimeout(t);
  }, []);

  // Lock body scroll while the drawer is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (products.length === 0) return null;

  return (
    <>
      {/* Floating pill button */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Shop ${products.length} products from this post`}
        className={`font-label fixed bottom-4 right-4 z-50 inline-flex cursor-pointer items-center gap-2 rounded-full bg-black px-4 py-2.5 text-[13px] font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#333] sm:bottom-6 sm:right-6 sm:px-5 sm:py-3 sm:text-[14px] lg:hidden ${
          pulse ? "animate-pulse-thrice" : "shadow-[0_4px_20px_rgba(0,0,0,0.25)]"
        }`}
      >
        <ShoppingBag aria-hidden="true" className="h-4 w-4" />
        Shop Products ({products.length})
      </button>

      {/* Backdrop */}
      <div
        onClick={() => setOpen(false)}
        aria-hidden="true"
        className={`fixed inset-0 z-50 bg-black/50 transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Drawer */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Products in this post"
        className={`fixed inset-x-0 bottom-0 z-50 mx-auto max-h-[80vh] max-w-2xl overflow-y-auto rounded-t-3xl bg-white transition-transform duration-[350ms] [transition-timing-function:cubic-bezier(0.32,0.72,0,1)] ${
          open ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="sticky top-0 flex items-center justify-between border-b border-grey-200 bg-white px-6 py-4">
          <h2 className="font-serif text-[22px] font-semibold text-black">
            Products in This Post
          </h2>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="cursor-pointer rounded-full p-1 text-grey-600 transition-colors duration-200 hover:bg-grey-100 hover:text-black"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-3 p-5 sm:grid-cols-2">
          {products.map((p) => (
            <div
              key={p.id}
              className="flex gap-3 rounded-xl border border-grey-200 p-3"
            >
              {p.image ? (
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-grey-100">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>
              ) : null}
              <div className="flex min-w-0 flex-1 flex-col">
                <p className="line-clamp-2 text-[14px] font-medium leading-snug text-black">
                  {p.title}
                </p>
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-label mt-auto cursor-pointer text-[12px] font-bold uppercase tracking-[0.06em] text-amazon transition-opacity duration-200 hover:opacity-70"
                >
                  View →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
