import { Info } from "lucide-react";

export default function AffiliateDisclosure() {
  return (
    <aside className="not-prose mt-12 flex gap-3 rounded-lg border border-grey-200 bg-grey-100 p-5">
      <Info
        aria-hidden="true"
        className="mt-0.5 h-5 w-5 shrink-0 text-grey-400"
      />
      <p className="text-[13px] leading-relaxed text-grey-600">
        <strong className="font-semibold text-black">
          Affiliate Disclosure:
        </strong>{" "}
        Virello Living is a participant in the Amazon Associates Program, an
        affiliate advertising program. As an Amazon Associate we earn from
        qualifying purchases. This means we may earn a small commission when you
        buy through links on this page — at no additional cost to you. We only
        recommend products we believe genuinely help. Prices and availability
        are accurate as of the date of publishing.
      </p>
    </aside>
  );
}
