"use client";

import { useEffect, useState } from "react";
import type { Heading } from "@/lib/slugify";

export default function TableOfContents({ headings }: { headings: Heading[] }) {
  const [active, setActive] = useState<string>(headings[0]?.slug ?? "");

  useEffect(() => {
    if (headings.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-88px 0px -70% 0px", threshold: 0 }
    );

    for (const h of headings) {
      const el = document.getElementById(h.slug);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav aria-label="Table of contents" className="text-sm">
      <p className="font-label mb-4 text-[11px] font-semibold uppercase tracking-[0.08em] text-grey-400">
        On this page
      </p>
      <ul className="space-y-1 border-l border-grey-200">
        {headings.map((h) => {
          const isActive = active === h.slug;
          return (
            <li key={h.slug}>
              <a
                href={`#${h.slug}`}
                className={`-ml-px block cursor-pointer border-l-2 py-1.5 pl-4 leading-snug transition-colors duration-200 ${
                  isActive
                    ? "border-mustard font-medium text-black"
                    : "border-transparent text-grey-400 hover:text-grey-600"
                }`}
              >
                {h.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
