import { ShoppingBag, ArrowUpRight } from "lucide-react";

export type RecBoxProps = {
  tag?: string;
  title: string;
  href: string;
  description: string;
};

export default function RecBox({
  tag = "Recommended",
  title,
  href,
  description,
}: RecBoxProps) {
  return (
    <div className="not-prose my-8 rounded-lg bg-black p-6">
      <span className="font-label inline-block rounded-full bg-mustard px-3 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-black">
        {tag}
      </span>
      <a
        href={href}
        target="_blank"
        rel="nofollow sponsored noopener noreferrer"
        className="group mt-4 flex cursor-pointer items-start gap-3"
      >
        <ShoppingBag
          aria-hidden="true"
          className="mt-0.5 h-5 w-5 shrink-0 text-mustard"
        />
        <span className="text-[17px] font-bold leading-snug text-white underline-offset-4 transition-colors duration-200 group-hover:text-mustard group-hover:underline">
          {title}
          <ArrowUpRight
            aria-hidden="true"
            className="ml-1 inline h-4 w-4 align-text-top opacity-70 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </span>
      </a>
      <p className="mt-3 pl-8 text-[15px] leading-relaxed text-grey-400">
        {description}
      </p>
    </div>
  );
}
