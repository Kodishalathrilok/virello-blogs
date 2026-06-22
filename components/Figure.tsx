import Image from "next/image";

export default function Figure({
  src,
  alt = "",
  caption,
}: {
  src?: string;
  alt?: string;
  caption?: string;
}) {
  if (!src) return null;

  return (
    <figure className="my-8 w-full">
      <div className="relative h-[280px] w-full overflow-hidden rounded-lg bg-grey-100 md:h-[420px]">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width:1024px) 100vw, 760px"
          className="object-cover"
        />
      </div>
      {caption ? (
        <figcaption className="font-label mt-3 text-center text-[11px] uppercase tracking-[0.08em] text-grey-400">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
