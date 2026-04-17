type SuccessCardProps = {
  title: string;
  children: React.ReactNode;
};

export function SuccessCard({ title, children }: SuccessCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
      <div className="mt-3 text-sm leading-7 text-slate-600">{children}</div>
    </div>
  );
}
