import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import { isValidElement, type ReactNode } from "react";
import { slugify } from "@/lib/slugify";
import Figure from "@/components/Figure";
import SplitSection from "@/components/SplitSection";
import ProTip from "@/components/ProTip";
import ProTipsGrid from "@/components/ProTipsGrid";

function textContent(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textContent).join("");
  if (isValidElement(node)) {
    return textContent((node.props as { children?: ReactNode }).children);
  }
  return "";
}

// Shared comfortable reading column for text-level elements.
const COL = "mx-auto w-full max-w-[680px]";

export const mdxComponents: MDXComponents = {
  h2: ({ children }) => {
    const full = textContent(children);
    const id = slugify(full);
    const m = /^(\d+)\.\s*(.*)$/.exec(full);
    const num = m?.[1];
    const title = m ? m[2] : null;
    return (
      <h2
        id={id}
        className={`${COL} relative mt-20 scroll-mt-28 font-serif text-3xl font-semibold leading-tight text-black sm:text-[36px]`}
      >
        {num ? (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -left-[60px] -top-10 hidden select-none font-serif text-[96px] font-bold leading-none text-[#f0f0f0] xl:block"
          >
            {num}
          </span>
        ) : null}
        {num ? <span className="xl:hidden">{num}. </span> : null}
        {title ?? children}
      </h2>
    );
  },
  h3: ({ children }) => (
    <h3 className={`${COL} mt-10 font-serif text-2xl font-semibold text-black`}>
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className={`${COL} mt-5 text-[17px] leading-[1.8] text-grey-600`}>
      {children}
    </p>
  ),
  ul: ({ children }) => (
    <ul className={`${COL} mt-5 space-y-2.5 pl-1 text-[17px] leading-[1.8] text-grey-600`}>
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className={`${COL} mt-5 list-decimal space-y-2.5 pl-5 text-[17px] leading-[1.8] text-grey-600 marker:text-grey-400`}>
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="relative pl-6 before:absolute before:left-0 before:top-[0.7em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-black">
      {children}
    </li>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-black">{children}</strong>
  ),
  em: ({ children }) => <em className="italic">{children}</em>,
  blockquote: ({ children }) => (
    <blockquote className={`${COL} my-8 border-l-4 border-black pl-6 font-serif text-2xl italic leading-snug text-black`}>
      {children}
    </blockquote>
  ),
  hr: () => <hr className={`${COL} my-12 border-t border-grey-200`} />,
  a: ({ href, children }) => {
    const url = href ?? "#";
    const external = /^https?:\/\//.test(url);
    if (external) {
      return (
        <a
          href={url}
          target="_blank"
          rel="nofollow sponsored noopener noreferrer"
          className="cursor-pointer font-medium text-black underline underline-offset-4 transition-colors duration-200 hover:text-grey-600"
        >
          {children}
        </a>
      );
    }
    return (
      <Link
        href={url}
        className="cursor-pointer font-medium text-black underline underline-offset-4 transition-colors duration-200 hover:text-grey-600"
      >
        {children}
      </Link>
    );
  },
  img: (props) => (
    <Figure src={props.src as string} alt={(props.alt as string) ?? ""} />
  ),
  // Custom components available inside MDX
  Figure,
  SplitSection,
  ProTip,
  ProTipsGrid,
};
