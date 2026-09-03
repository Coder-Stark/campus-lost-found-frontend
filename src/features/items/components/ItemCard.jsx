function formatDate(value) {
  if (!value) return null;
  try {
    return new Date(value).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return value;
  }
}

export default function ItemCard({ item }) {
  const isLost = item.type === "Lost";
  const date = formatDate(item.date || item.createdAt);

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-medium text-slate-900 dark:text-slate-100">{item.title}</h3>
        <span
          className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${
            isLost
              ? "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300"
              : "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300"
          }`}
        >
          {item.type}
        </span>
      </div>

      <dl className="mt-3 space-y-1 text-sm text-slate-600 dark:text-slate-300">
        <div className="flex gap-1.5">
          <dt className="font-medium text-slate-500 dark:text-slate-400">Location:</dt>
          <dd>{item.location}</dd>
        </div>
        {date && (
          <div className="flex gap-1.5">
            <dt className="font-medium text-slate-500 dark:text-slate-400">Date:</dt>
            <dd>{date}</dd>
          </div>
        )}
        {item.description && (
          <div className="flex gap-1.5">
            <dt className="font-medium text-slate-500 dark:text-slate-400">Details:</dt>
            <dd>{item.description}</dd>
          </div>
        )}
        <div className="flex gap-1.5">
          <dt className="font-medium text-slate-500 dark:text-slate-400">Contact:</dt>
          <dd>{item.contactMethod}</dd>
        </div>
      </dl>
    </div>
  );
}