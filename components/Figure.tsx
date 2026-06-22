import Image from "next/image";
import { getImageDim } from "@/lib/images";

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
  const dim = getImageDim(src);
  const portrait = dim.height > dim.width;

  return (
    <figure className={`not-prose my-8 ${portrait ? "mx-auto max-w-sm" : ""}`}>
      <div className="overflow-hidden rounded-xl border border-grey-200 bg-grey-100">
        <Image
          src={src}
          alt={alt}
          width={dim.width}
          height={dim.height}
          sizes={
            portrait
              ? "(max-width:768px) 100vw, 384px"
              : "(max-width:768px) 100vw, 740px"
          }
          className="h-auto w-full object-cover"
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
