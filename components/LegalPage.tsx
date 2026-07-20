import Link from "next/link";

/** Shared shell for the legal pages, so Privacy and Terms read as one document
 *  set rather than two pages that happen to sit next to each other. */
export default function LegalPage({
  title,
  updated,
  intro,
  children,
}: {
  title: string;
  updated: string;
  intro: string;
  children: React.ReactNode;
}) {
  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-4xl font-semibold tracking-tight">{title}</h1>
      <p className="mt-3 text-sm text-[var(--text-muted)]">Last updated {updated}</p>
      <p className="mt-6 text-lg text-[var(--text-secondary)] leading-relaxed">{intro}</p>

      <div className="mt-12 space-y-10">{children}</div>

      <div className="mt-16 pt-6 border-t border-[var(--border)] flex flex-wrap gap-x-6 gap-y-2 text-sm">
        <Link href="/privacy" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
          Privacy policy
        </Link>
        <Link href="/terms" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
          Terms of service
        </Link>
        <Link href="/docs" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
          Documentation
        </Link>
      </div>
    </main>
  );
}

export function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      <div className="mt-3 space-y-3 text-[var(--text-secondary)] leading-relaxed">
        {children}
      </div>
    </section>
  );
}

export function Table({
  head,
  rows,
}: {
  head: string[];
  rows: React.ReactNode[][];
}) {
  return (
    <div className="scroll-x rounded-xl border border-[var(--border)] my-4">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-[var(--surface-2)]">
            {head.map((h) => (
              <th
                key={h}
                className="text-left font-semibold px-4 py-2.5 border-b border-[var(--border)] whitespace-nowrap"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-[var(--border)] last:border-0">
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3 align-top">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
