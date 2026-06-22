import Image from "next/image";

/**
 * Section layout with the image breaking out to the left (45%) and the
 * text flowing on the right (55%) on desktop. Stacks (image on top) on
 * mobile. Used for sections 01 and 09.
 */
export default function SplitSection({
  image,
  alt = "",
  children,
}: {
  image: string;
  alt?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="my-8 grid grid-cols-1 gap-8 lg:grid-cols-[45%_minmax(0,55%)] lg:items-start">
      <div className="relative h-[280px] w-full overflow-hidden rounded-lg bg-grey-100 lg:sticky lg:top-24 lg:h-[420px]">
        <Image
          src={image}
          alt={alt}
          fill
          sizes="(max-width:1024px) 100vw, 360px"
          className="object-cover"
        />
      </div>
      <div className="min-w-0">{children}</div>
    </div>
  );
}
