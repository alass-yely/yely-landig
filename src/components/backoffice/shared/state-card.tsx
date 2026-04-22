import Link from "next/link";

type StateCardProps = {
  title: string;
  description: string;
  tone?: "default" | "danger";
  ctaHref?: string;
  ctaLabel?: string;
};

export function StateCard({
  title,
  description,
  tone = "default",
  ctaHref,
  ctaLabel,
}: StateCardProps) {
  const toneClass =
    tone === "danger"
      ? "border-red-200 bg-red-50 text-red-700"
      : "border-slate-200 bg-white text-slate-700";

  return (
    <div className={`rounded-2xl border p-6 ${toneClass}`}>
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="mt-2 text-sm leading-6">{description}</p>
      {ctaHref && ctaLabel ? (
        <Link
          href={ctaHref}
          className="mt-4 inline-flex rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
        >
          {ctaLabel}
        </Link>
      ) : null}
    </div>
  );
}
