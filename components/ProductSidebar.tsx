"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { Product } from "@/lib/posts";

export default function ProductSidebar({ products }: { products: Product[] }) {
  const scrollRef = useRef<HTMLUListElement>(null);
  const [showFade, setShowFade] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  // Show the bottom fade only when there is more to scroll below.
  const updateFade = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setShowFade(el.scrollHeight - el.scrollTop - el.clientHeight > 8);
  }, []);

  useEffect(() => {
    updateFade();
    window.addEventListener("resize", updateFade);
    return () => window.removeEventListener("resize", updateFade);
  }, [updateFade]);

  // Highlight the product(s) belonging to the section currently in view.
  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("article h2[id]")
    );
    if (sections.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveSection(visible[0].target.id);
      },
      { rootMargin: "-96px 0px -70% 0px", threshold: 0 }
    );
    for (const s of sections) observer.observe(s);
    return () => observer.disconnect();
  }, []);

  if (products.length === 0) return null;

  return (
    <div className="sticky top-20">
      <p className="font-label mb-4 text-[11px] font-semibold uppercase tracking-[0.08em] text-grey-400">
        Products in This Post
      </p>

      <div className="relative">
        <ul
          ref={scrollRef}
          onScroll={updateFade}
          className="max-h-[calc(100vh-100px)] divide-y divide-grey-200 overflow-y-auto [scroll-snap-type:y_mandatory] [scrollbar-color:#e8e8e8_transparent] [scrollbar-width:thin]"
        >
          {products.map((p) => {
            const isActive = !!p.section && p.section === activeSection;
            return (
              <li key={p.id} className="[scroll-snap-align:start]">
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group block cursor-pointer border-l-[3px] py-5 pl-3 pr-1 transition-all duration-200 hover:-translate-x-0.5 ${
                    isActive
                      ? "border-amazon bg-[#fff8f0]"
                      : "border-transparent hover:bg-[#f9f9f9]"
                  }`}
                >
                  {p.image ? (
                    <div className="relative h-[140px] w-full overflow-hidden rounded-lg bg-grey-100">
                      <Image
                        src={p.image}
                        alt={p.title}
                        fill
                        sizes="280px"
                        className="object-cover"
                      />
                    </div>
                  ) : null}
                  <h3 className="mt-3 line-clamp-2 font-serif text-[15px] font-semibold leading-snug text-black">
                    {p.title}
                  </h3>
                  <span className="font-label mt-3 block rounded-md bg-amazon px-3 py-2 text-center text-[13px] font-bold text-white transition-colors duration-200 group-hover:bg-amazon-dark">
                    View on Amazon →
                  </span>
                </a>
              </li>
            );
          })}
        </ul>

        {/* Scroll indicator: fades out when scrolled to the bottom */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white to-transparent transition-opacity duration-200 ${
            showFade ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>
    </div>
  );
}
