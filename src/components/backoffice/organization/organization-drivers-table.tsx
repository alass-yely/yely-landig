import type { OrganizationDriverListItem } from "@/types/organization";

type OrganizationDriversTableProps = {
  drivers: OrganizationDriverListItem[];
  loading: boolean;
  error: string | null;
};

function formatDate(value?: string) {
  if (!value) return "-";
  return new Date(value).toLocaleDateString();
}

export function OrganizationDriversTable({ drivers, loading, error }: OrganizationDriversTableProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">Chauffeurs affiliés</h2>

      {loading ? <p className="mt-4 text-sm text-slate-500">Chargement des chauffeurs...</p> : null}
      {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}
      {!loading && !error && drivers.length === 0 ? (
        <p className="mt-4 text-sm text-slate-500">Aucun chauffeur affilié pour le moment.</p>
      ) : null}

      {!loading && !error && drivers.length > 0 ? (
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
                <th className="px-3 py-2">Nom complet</th>
                <th className="px-3 py-2">Téléphone</th>
                <th className="px-3 py-2">Statut</th>
                <th className="px-3 py-2">Date d&apos;affiliation</th>
                <th className="px-3 py-2">Dernière activité</th>
              </tr>
            </thead>
            <tbody>
              {drivers.map((driver) => (
                <tr key={driver.id} className="border-b border-slate-100 text-slate-700">
                  <td className="px-3 py-3 font-medium">{driver.firstName} {driver.lastName}</td>
                  <td className="px-3 py-3">{driver.phone || "-"}</td>
                  <td className="px-3 py-3">{driver.status || "-"}</td>
                  <td className="px-3 py-3">{formatDate(driver.affiliatedAt)}</td>
                  <td className="px-3 py-3">{formatDate(driver.lastActivityAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
}
