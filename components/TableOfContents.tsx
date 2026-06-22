"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import type { Heading } from "@/lib/slugify";

function useActiveHeading(headings: Heading[]) {
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
      { rootMargin: "-96px 0px -70% 0px", threshold: 0 }
    );
    for (const h of headings) {
      const el = document.getElementById(h.slug);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [headings]);

  return active;
}

function scrollToHeading(slug: string) {
  const el = document.getElementById(slug);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ---------- Desktop: clean left sidebar list ---------- */
function SidebarToc({ headings }: { headings: Heading[] }) {
  const active = useActiveHeading(headings);
  return (
    <nav aria-label="Table of contents" className="sticky top-20">
      <p className="font-label mb-4 text-[11px] font-semibold uppercase tracking-[0.08em] text-grey-400">
        On This Page
      </p>
      <ul className="space-y-0.5">
        {headings.map((h) => {
          const isActive = active === h.slug;
          return (
            <li key={h.slug}>
              <a
                href={`#${h.slug}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToHeading(h.slug);
                }}
                className={`font-label block cursor-pointer border-l-2 py-1 pl-3 text-[13px] leading-snug transition-colors duration-200 ${
                  isActive
                    ? "border-black font-medium text-black"
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

/* ---------- Mobile / tablet: collapsible accordion ---------- */
function AccordionToc({ headings }: { headings: Heading[] }) {
  const active = useActiveHeading(headings);
  const [open, setOpen] = useState(false);
  return (
    <div className="overflow-hidden rounded-lg border border-grey-200 bg-white">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full cursor-pointer items-center justify-between px-4 py-3"
      >
        <span className="font-label text-[11px] font-semibold uppercase tracking-[0.08em] text-grey-400">
          On This Page
        </span>
        <ChevronDown
          className={`h-4 w-4 text-grey-400 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open ? (
        <ul className="border-t border-grey-200 px-2 py-2">
          {headings.map((h) => {
            const isActive = active === h.slug;
            return (
              <li key={h.slug}>
                <a
                  href={`#${h.slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToHeading(h.slug);
                    setOpen(false);
                  }}
                  className={`font-label block cursor-pointer rounded px-2 py-2 text-[13px] leading-snug transition-colors duration-200 ${
                    isActive ? "font-medium text-black" : "text-grey-400"
                  }`}
                >
                  {h.text}
                </a>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}

export default function TableOfContents({
  headings,
  variant = "sidebar",
}: {
  headings: Heading[];
  variant?: "sidebar" | "accordion";
}) {
  if (headings.length === 0) return null;
  return variant === "accordion" ? (
    <AccordionToc headings={headings} />
  ) : (
    <SidebarToc headings={headings} />
  );
}
