import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TableOfContents from "@/components/TableOfContents";
import AffiliateDisclosure from "@/components/AffiliateDisclosure";
import QuickShopDrawer from "@/components/QuickShopDrawer";
import ProductSidebar from "@/components/ProductSidebar";
import { mdxComponents } from "@/components/mdx";
import { getAllPosts, getPostBySlug, getPostSlugs, formatDate } from "@/lib/posts";
import { extractHeadings } from "@/lib/slugify";

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  const { meta } = post;
  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "article",
      publishedTime: meta.date,
      images: [{ url: meta.image }],
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const { meta, content } = post;
  const headings = extractHeadings(content);
  const related = getAllPosts().filter((p) => p.slug !== slug);

  return (
    <>
      <Navbar />
      <main>
        {/* Full-bleed hero banner */}
        <section className="relative h-[420px] w-full sm:h-[480px] lg:h-[520px]">
          <Image
            src={meta.image}
            alt={meta.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/15" />
          <div className="absolute inset-0 flex items-end">
            <div className="mx-auto w-full max-w-[1400px] px-5 pb-10 md:px-10 lg:px-8 lg:pb-14">
              <Link
                href="/blog"
                className="group font-label mb-6 inline-flex w-fit cursor-pointer items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-white/80 transition-colors duration-200 hover:text-white"
              >
                <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-x-1" />
                All posts
              </Link>

              <span className="font-label block w-fit rounded-full bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-black">
                {meta.niche}
              </span>

              <h1 className="mt-5 max-w-4xl font-serif text-[34px] font-bold italic leading-[1.05] tracking-[-0.02em] text-white sm:text-[44px] lg:text-[56px]">
                {meta.title}
              </h1>

              <div className="font-label mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-[12px] uppercase tracking-[0.08em] text-white/80">
                <span className="inline-flex items-center gap-2">
                  <Calendar className="h-3.5 w-3.5" />
                  {formatDate(meta.date)}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5" />
                  {meta.readTime}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Body: [TOC 240] [content] [products 280] */}
        <div className="mx-auto max-w-[1400px] px-5 py-12 md:px-10 lg:px-8 lg:py-16">
          {/* Mobile / tablet TOC accordion */}
          <div className="mb-8 lg:hidden">
            <TableOfContents headings={headings} variant="accordion" />
          </div>

          <div className="lg:grid lg:grid-cols-[240px_minmax(0,1fr)_280px] lg:gap-12">
            <aside className="hidden lg:block">
              <TableOfContents headings={headings} variant="sidebar" />
            </aside>

            <article className="min-w-0">
              <MDXRemote
                source={content}
                components={mdxComponents}
                options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
              />
              <div className="mx-auto w-full max-w-[680px]">
                <AffiliateDisclosure />
              </div>
            </article>

            <aside className="hidden lg:block">
              <ProductSidebar products={meta.products} />
            </aside>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 ? (
          <section className="border-t border-grey-200 bg-grey-100">
            <div className="mx-auto max-w-[1400px] px-5 py-16 md:px-10 lg:px-8">
              <h2 className="font-serif text-3xl font-semibold text-black">
                Keep reading
              </h2>
              <ul className="mt-8 divide-y divide-grey-200">
                {related.slice(0, 4).map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/blog/${p.slug}`}
                      className="group flex items-center justify-between gap-6 py-5 transition-colors duration-200"
                    >
                      <div>
                        <span className="font-label text-[10px] font-semibold uppercase tracking-[0.08em] text-grey-400">
                          {p.niche}
                        </span>
                        <p className="mt-1 font-serif text-xl font-semibold text-black transition-colors duration-200 group-hover:text-grey-600">
                          {p.title}
                        </p>
                      </div>
                      <span className="font-label shrink-0 text-[11px] uppercase tracking-[0.08em] text-grey-400">
                        {p.readTime}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ) : null}
      </main>
      <QuickShopDrawer products={meta.products} />
      <Footer />
    </>
  );
}
