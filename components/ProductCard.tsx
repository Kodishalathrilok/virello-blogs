"use client";

import { useState } from "react";
import Image from "next/image";
import { Star } from "lucide-react";

export interface ProductCardProps {
  id: string;
  tag?: string;
  title: string;
  href: string;
  description: string;
  image?: string;
  rating?: number;
  reviewCount?: string;
}

function Stars({ rating = 5 }: { rating?: number }) {
  const filled = Math.round(Math.min(5, Math.max(0, rating)));
  return (
    <span
      className="inline-flex items-center"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          aria-hidden="true"
          className={`h-3.5 w-3.5 ${
            i < filled ? "fill-[#f5a623] text-[#f5a623]" : "fill-grey-200 text-grey-200"
          }`}
        />
      ))}
    </span>
  );
}

export default function ProductCard({
  id,
  tag = "Recommended",
  title,
  href,
  description,
  image,
  rating = 5,
  reviewCount,
}: ProductCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      id={id}
      className="group my-8 scroll-mt-[120px] rounded-xl border border-grey-200 bg-white p-5 transition-all duration-[250ms] ease-out hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(0,0,0,0.10)]"
    >
      <div className="flex flex-col gap-5 sm:flex-row">
        {/* Image */}
        {image ? (
          <div className="relative aspect-video w-full shrink-0 overflow-hidden rounded-lg bg-grey-100 sm:aspect-square sm:h-40 sm:w-40">
            <Image
              src={image}
              alt={title}
              fill
              sizes="(max-width:640px) 100vw, 160px"
              className="object-cover transition-transform duration-[400ms] ease-out group-hover:scale-[1.04]"
            />
          </div>
        ) : null}

        {/* Content */}
        <div className="flex min-w-0 flex-1 flex-col">
          <span className="font-label inline-block w-fit rounded-full bg-black px-2.5 py-[3px] text-[10px] font-bold uppercase tracking-[0.08em] text-white">
            {tag}
          </span>

          <h3 className="mt-2.5 font-serif text-[20px] font-semibold leading-snug text-black">
            {title}
          </h3>

          <p
            className={`mt-1.5 text-[14px] leading-[1.6] text-[#666] ${
              expanded ? "" : "line-clamp-2"
            }`}
          >
            {description}
          </p>
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="mt-1 w-fit cursor-pointer text-[13px] font-medium text-black underline underline-offset-2 transition-opacity duration-200 hover:opacity-60"
          >
            {expanded ? "read less" : "read more"}
          </button>

          {/* Rating */}
          <div className="mt-2 flex items-center gap-2">
            <Stars rating={rating} />
            {reviewCount ? (
              <span className="text-[13px] text-grey-400">{reviewCount}</span>
            ) : null}
          </div>

          {/* Price + CTA */}
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-[13px] italic text-grey-400">Check Price</span>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-label inline-flex w-full cursor-pointer items-center justify-center rounded-lg bg-amazon px-6 py-3 text-[14px] font-bold text-white transition-all duration-200 hover:scale-[1.02] hover:bg-amazon-dark sm:w-auto"
            >
              View on Amazon →
            </a>
          </div>

          <p className="mt-3 text-[11px] text-grey-400">
            Prices update on Amazon in real time
          </p>
        </div>
      </div>
    </div>
  );
}
