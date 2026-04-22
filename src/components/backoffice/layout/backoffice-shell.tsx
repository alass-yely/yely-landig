import type { ReactNode } from "react";

type BackofficeShellProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
};

export function BackofficeShell({ title, subtitle, children }: BackofficeShellProps) {
  return (
    <section className="min-h-screen bg-slate-50">
      <div className="mx-auto w-full max-w-7xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
        <header>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">{title}</h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">{subtitle}</p>
        </header>

        {children}
      </div>
    </section>
  );
}
