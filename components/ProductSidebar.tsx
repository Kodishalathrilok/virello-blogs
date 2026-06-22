import Image from "next/image";
import type { Product } from "@/lib/posts";

export default function ProductSidebar({ products }: { products: Product[] }) {
  if (products.length === 0) return null;

  return (
    <div className="sticky top-20">
      <p className="font-label mb-4 text-[11px] font-semibold uppercase tracking-[0.08em] text-grey-400">
        Products in This Post
      </p>
      <ul className="divide-y divide-grey-200">
        {products.map((p) => (
          <li key={p.id} className="py-5 first:pt-0 last:pb-0">
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
            <a
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-label mt-3 block cursor-pointer rounded-md bg-amazon px-3 py-2 text-center text-[13px] font-bold text-white transition-all duration-200 hover:scale-[1.02] hover:bg-amazon-dark"
            >
              View on Amazon →
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
