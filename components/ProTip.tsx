import { Lightbulb } from "lucide-react";

export default function ProTip({
  title = "Pro Tip",
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <aside className="not-prose my-8 rounded-lg border-l-4 border-mustard bg-grey-100 p-5">
      <div className="flex items-center gap-2">
        <Lightbulb aria-hidden="true" className="h-4 w-4 text-mustard" />
        <span className="font-label text-[11px] font-semibold uppercase tracking-[0.08em] text-black">
          {title}
        </span>
      </div>
      <div className="mt-2 text-[15px] leading-relaxed text-grey-600">
        {children}
      </div>
    </aside>
  );
}
