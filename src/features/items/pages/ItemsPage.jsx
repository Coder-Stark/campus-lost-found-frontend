import { useItems } from "../hooks/useItems.js";
import FilterBar from "../components/FilterBar.jsx";
import ItemList from "../components/ItemList.jsx";
import ItemForm from "../components/ItemForm.jsx";

export default function ItemsPage() {
  const {
    items,
    isLoading,
    loadError,
    typeFilter,
    setTypeFilter,
    refetch,
    addItem,
    isSubmitting,
  } = useItems();

  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Recent reports
          </h2>
          <FilterBar value={typeFilter} onChange={setTypeFilter} />
        </div>
        <ItemList items={items} isLoading={isLoading} loadError={loadError} onRetry={refetch} />
      </section>

      <section className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Report an item
        </h2>
        <ItemForm onSubmit={addItem} isSubmitting={isSubmitting} />
      </section>
    </div>
  );
}