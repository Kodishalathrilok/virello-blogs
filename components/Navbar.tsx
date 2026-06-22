"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-white/85 backdrop-blur-md transition-all duration-300 ${
        scrolled
          ? "border-b border-grey-200 shadow-[0_1px_12px_-6px_rgba(10,10,10,0.25)]"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-[60px] max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link
          href="/"
          aria-label="Virello Living home"
          className="cursor-pointer font-serif text-[22px] font-bold tracking-[0.02em] text-black transition-opacity duration-200 hover:opacity-70"
        >
          VIRELLO LIVING
        </Link>
        <span className="font-label hidden text-[11px] font-medium uppercase tracking-[0.08em] text-grey-600 sm:block">
          Home Organization · Small Space Living
        </span>
      </nav>
    </header>
  );
}
