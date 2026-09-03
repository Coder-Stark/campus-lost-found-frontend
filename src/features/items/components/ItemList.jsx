import Loader from "../../../shared/components/Loader.jsx";
import ItemCard from "./ItemCard.jsx";

export default function ItemList({ items, isLoading, loadError, onRetry }) {
  if (isLoading) return <Loader label="Loading reports..." />;

  if (loadError) {
    return (
      <div className="flex items-center justify-between rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300">
        <span>{loadError}</span>
        <button
          onClick={onRetry}
          className="ml-4 shrink-0 cursor-pointer rounded-md border border-red-300 px-3 py-1 text-xs font-medium hover:bg-red-100 dark:border-red-800 dark:hover:bg-red-900/40"
        >
          Retry
        </button>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-slate-300 bg-white py-10 text-center text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400">
        No items reported yet. Be the first to post one below.
      </p>
    );
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <ItemCard key={item._id} item={item} />
      ))}
    </div>
  );
}