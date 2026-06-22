import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-grey-200 bg-grey-100">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Link
              href="/"
              className="cursor-pointer font-serif text-2xl font-bold tracking-[0.02em] text-black"
            >
              VIRELLO LIVING
            </Link>
            <p className="mt-3 text-[15px] leading-relaxed text-grey-600">
              Practical, budget-friendly home organization and small space
              living ideas, curated for Indian apartments.
            </p>
          </div>

          <nav className="flex flex-col gap-3">
            <span className="font-label text-[11px] font-semibold uppercase tracking-[0.08em] text-grey-400">
              Explore
            </span>
            <Link
              href="/"
              className="cursor-pointer text-sm text-grey-600 transition-colors duration-200 hover:text-black"
            >
              Home
            </Link>
            <Link
              href="/blog"
              className="cursor-pointer text-sm text-grey-600 transition-colors duration-200 hover:text-black"
            >
              All Posts
            </Link>
          </nav>
        </div>

        <div className="mt-12 border-t border-grey-200 pt-6">
          <p className="text-[13px] leading-relaxed text-grey-400">
            <strong className="font-semibold text-grey-600">
              Affiliate Disclosure:
            </strong>{" "}
            As an Amazon Associate, Virello Living earns from qualifying
            purchases. Some links on this site are affiliate links, which means
            we may earn a small commission at no extra cost to you.
          </p>
          <p className="font-label mt-4 text-[11px] uppercase tracking-[0.08em] text-grey-400">
            © 2026 Virello Living. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
