export type Tip = { title: string; description: string };

const DEFAULT_TIPS: Tip[] = [
  {
    title: "Measure before you buy",
    description:
      "Indian apartment dimensions vary wildly. Note your under-bed clearance, almirah depth and balcony width before ordering any organizer — a 2cm mismatch is the difference between a perfect fit and a return.",
  },
  {
    title: "Go vertical first",
    description:
      "Floor space is the most expensive real estate in a 1BHK. Walls, doors and the area above eye level are almost always underused. Climb before you sprawl.",
  },
  {
    title: "Store seasonally, rotate twice a year",
    description:
      "Keep only the current season within easy reach. Pack winter quilts and festival wear into labelled under-bed bags and swap them with the weather.",
  },
  {
    title: "Contain, then label",
    description:
      "Loose items expand to fill any space. Group like-with-like in bins and label them in your own handwriting — future-you will find things in seconds, not minutes.",
  },
  {
    title: "Choose foldable over fixed",
    description:
      "Renting in India often means moving every 11 months. Collapsible boxes and no-drill mounts pack flat and leave your deposit intact.",
  },
  {
    title: "Keep one empty shelf",
    description:
      "A deliberately empty shelf or drawer is your release valve. It absorbs new purchases, guests' things and festival clutter without forcing a reorganization.",
  },
  {
    title: "Edit before you organize",
    description:
      "No system can store what you don't need. Donate, sell or recycle first — organizing clutter just makes prettier clutter.",
  },
];

export default function ProTipsGrid({
  heading = "7 Pro Tips for Small-Space Living",
  subheading = "The principles behind every product on this list — apply these and any apartment starts working harder.",
  tips = DEFAULT_TIPS,
}: {
  heading?: string;
  subheading?: string;
  tips?: Tip[];
}) {
  return (
    <section className="not-prose my-14 overflow-hidden rounded-2xl bg-black">
      <div className="px-6 pt-10 pb-2 sm:px-10">
        <span className="font-label text-[11px] font-semibold uppercase tracking-[0.08em] text-grey-400">
          Quick Reference
        </span>
        <h2 className="mt-3 max-w-2xl font-serif text-3xl font-semibold !text-white sm:text-4xl">
          {heading}
        </h2>
        <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-grey-400">
          {subheading}
        </p>
      </div>

      <div className="px-6 pb-10 sm:px-10">
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {tips.map((tip, i) => (
            <div
              key={tip.title}
              className="group relative rounded-xl border border-grey-200/20 bg-black p-6 transition-colors duration-300 hover:border-grey-200/40 sm:p-8"
            >
              <span
                aria-hidden="true"
                className="font-serif text-5xl font-bold leading-none text-[#E8E8E8]/15 transition-colors duration-300 group-hover:text-[#E8E8E8]/25"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-serif text-xl font-semibold !text-white">
                {tip.title}
              </h3>
              <p className="mt-2 text-[14px] leading-relaxed text-grey-400">
                {tip.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
