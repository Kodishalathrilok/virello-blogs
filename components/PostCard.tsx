import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { PostMeta } from "@/lib/posts";

export default function PostCard({
  post,
  priority = false,
}: {
  post: PostMeta;
  priority?: boolean;
}) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex cursor-pointer flex-col overflow-hidden rounded-xl border border-grey-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_44px_-20px_rgba(10,10,10,0.35)]"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-grey-100">
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes="(max-width:768px) 100vw, (max-width:1280px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          priority={priority}
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <span className="font-label w-fit rounded-full bg-grey-100 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-black">
          {post.niche}
        </span>
        <h3 className="font-serif text-[22px] font-semibold leading-[1.15] text-black">
          {post.title}
        </h3>
        <p className="line-clamp-2 text-[15px] leading-relaxed text-grey-600">
          {post.description}
        </p>
        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="font-label text-[11px] uppercase tracking-[0.08em] text-grey-400">
            {post.readTime}
          </span>
          <span className="inline-flex items-center gap-1 text-sm font-medium text-black">
            Read
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
