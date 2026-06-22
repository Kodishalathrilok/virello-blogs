import type { Metadata } from "next";
import type { MDXComponents } from "mdx/types";
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
import QuickShopBar from "@/components/QuickShopBar";
import QuickShopDrawer from "@/components/QuickShopDrawer";
import ProductCard from "@/components/ProductCard";
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

  const productsById = Object.fromEntries(
    meta.products.map((p) => [p.id, p])
  );
  const components: MDXComponents = {
    ...mdxComponents,
    Product: ({ id }: { id?: string }) => {
      const product = id ? productsById[id] : undefined;
      return product ? <ProductCard {...product} /> : null;
    },
  };

  return (
    <>
      <Navbar />
      <QuickShopBar
        products={meta.products.map((p) => ({ id: p.id, name: p.title }))}
      />
      <main>
        {/* Split hero */}
        <section className="grid grid-cols-1 lg:grid-cols-2">
          <div className="flex flex-col justify-center bg-black px-6 py-14 sm:px-12 lg:px-16 lg:py-20">
            <Link
              href="/blog"
              className="group font-label mb-8 inline-flex w-fit cursor-pointer items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-grey-400 transition-colors duration-200 hover:text-white"
            >
              <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-x-1" />
              All posts
            </Link>

            <span className="font-label w-fit rounded-full bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-black">
              {meta.niche}
            </span>

            <h1 className="mt-6 font-serif text-[40px] font-bold italic leading-[1.06] tracking-[-0.02em] text-white sm:text-[52px]">
              {meta.title}
            </h1>

            <div className="font-label mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-[12px] uppercase tracking-[0.08em] text-grey-400">
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

          <div className="relative min-h-[280px] sm:min-h-[400px] lg:min-h-full">
            <Image
              src={meta.image}
              alt={meta.title}
              fill
              priority
              sizes="(max-width:1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </section>

        {/* Body + sticky TOC */}
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[220px_minmax(0,1fr)]">
          <aside className="hidden lg:block">
            <div className="sticky top-[88px]">
              <TableOfContents headings={headings} />
            </div>
          </aside>

          <article className="max-w-2xl">
            <MDXRemote
              source={content}
              components={components}
              options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
            />
            <AffiliateDisclosure />
          </article>
        </div>

        {/* Related */}
        {related.length > 0 ? (
          <section className="border-t border-grey-200 bg-grey-100">
            <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
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
