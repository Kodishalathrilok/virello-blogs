import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import PostCard from "@/components/PostCard";
import { getAllPosts } from "@/lib/posts";

export default function Home() {
  const posts = getAllPosts();
  const latest = posts[0];
  const featured = posts.slice(0, 6);

  return (
    <>
      <Navbar />
      <main>
        <HeroSection latest={latest} />

        <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="font-label text-[11px] font-semibold uppercase tracking-[0.08em] text-green">
                From the journal
              </span>
              <h2 className="mt-3 font-serif text-4xl font-semibold tracking-[-0.02em] text-black sm:text-5xl">
                Latest stories
              </h2>
            </div>
            <Link
              href="/blog"
              className="group inline-flex w-fit cursor-pointer items-center gap-2 text-sm font-medium text-black"
            >
              <span className="font-label text-[12px] uppercase tracking-[0.08em]">
                View all posts
              </span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          {featured.length > 0 ? (
            <div className="mt-12 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((post, i) => (
                <PostCard key={post.slug} post={post} priority={i < 3} />
              ))}
            </div>
          ) : (
            <p className="mt-12 text-grey-600">New stories are on the way.</p>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
