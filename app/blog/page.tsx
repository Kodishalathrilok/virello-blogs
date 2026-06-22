import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogFilter from "@/components/BlogFilter";
import { getAllPosts, getAllNiches } from "@/lib/posts";

export const metadata: Metadata = {
  title: "All Posts",
  description:
    "Browse every Virello Living guide on home organization and small space living for Indian apartments.",
};

export default function BlogIndexPage() {
  const posts = getAllPosts();
  const niches = getAllNiches();

  return (
    <>
      <Navbar />
      <main>
        <header className="border-b border-grey-200 bg-grey-100">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
            <span className="font-label text-[11px] font-semibold uppercase tracking-[0.08em] text-grey-400">
              The Journal
            </span>
            <h1 className="mt-3 max-w-3xl font-serif text-5xl font-bold italic tracking-[-0.02em] text-black sm:text-6xl">
              Ideas for living larger in small spaces
            </h1>
            <p className="mt-5 max-w-xl text-[17px] leading-[1.7] text-grey-600">
              Honest, budget-friendly home organization guides written for Indian
              apartment living.
            </p>
          </div>
        </header>

        <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
          <BlogFilter posts={posts} niches={niches} />
        </section>
      </main>
      <Footer />
    </>
  );
}
