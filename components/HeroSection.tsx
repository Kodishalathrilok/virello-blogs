import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { PostMeta } from "@/lib/posts";

export default function HeroSection({ latest }: { latest?: PostMeta }) {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2">
      {/* Black left panel */}
      <div className="flex flex-col justify-center bg-black px-6 py-16 sm:px-12 lg:px-16 lg:py-24">
        <span className="font-label text-[11px] font-semibold uppercase tracking-[0.08em] text-mustard">
          Home Organization · Small Space Living
        </span>
        <h1 className="mt-6 font-serif text-[44px] font-bold italic leading-[1.04] tracking-[-0.02em] text-white sm:text-6xl">
          Make every corner of your Indian home work harder.
        </h1>
        <p className="mt-6 max-w-md text-[17px] leading-[1.7] text-grey-400">
          Practical, budget-friendly storage and decor ideas built for 1BHK and
          2BHK apartment living — with honest picks you can actually buy.
        </p>

        {latest ? (
          <Link
            href={`/blog/${latest.slug}`}
            className="group mt-9 inline-flex w-fit cursor-pointer items-center gap-3 rounded-full bg-mustard px-6 py-3 text-black transition-all duration-300 hover:gap-4 hover:bg-white"
          >
            <span className="font-label text-[12px] font-bold uppercase tracking-[0.08em]">
              Read the latest post
            </span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        ) : null}

        {latest ? (
          <p className="mt-5 max-w-sm text-[13px] leading-relaxed text-grey-600">
            <span className="text-grey-400">Latest:</span> {latest.title}
          </p>
        ) : null}
      </div>

      {/* Full-bleed right image */}
      <div className="relative min-h-[300px] sm:min-h-[420px] lg:min-h-full">
        <Image
          src="/images/hero.png"
          alt="A warmly lit, organized Indian bedroom with a white dresser and styled shelving"
          fill
          priority
          sizes="(max-width:1024px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
    </section>
  );
}
