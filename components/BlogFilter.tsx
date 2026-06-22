"use client";

import { useMemo, useState } from "react";
import PostCard from "@/components/PostCard";
import type { PostMeta } from "@/lib/posts";

export default function BlogFilter({
  posts,
  niches,
}: {
  posts: PostMeta[];
  niches: string[];
}) {
  const [active, setActive] = useState<string>("All");
  const tabs = useMemo(() => ["All", ...niches], [niches]);

  const visible =
    active === "All" ? posts : posts.filter((p) => p.niche === active);

  return (
    <div>
      <div
        role="tablist"
        aria-label="Filter posts by category"
        className="flex flex-wrap gap-2"
      >
        {tabs.map((tab) => {
          const isActive = active === tab;
          return (
            <button
              key={tab}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(tab)}
              className={`font-label cursor-pointer rounded-full border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.08em] transition-all duration-200 ${
                isActive
                  ? "border-black bg-black text-white"
                  : "border-grey-200 bg-white text-grey-600 hover:border-grey-400 hover:text-black"
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {visible.length > 0 ? (
        <div className="mt-10 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((post, i) => (
            <PostCard key={post.slug} post={post} priority={i < 3} />
          ))}
        </div>
      ) : (
        <p className="mt-10 text-grey-600">No posts in this category yet.</p>
      )}
    </div>
  );
}
