import { useState } from "react";
import { useItems } from "../hooks/useItems.js";
import FilterBar from "../components/FilterBar.jsx";
import ItemList from "../components/ItemList.jsx";
import ItemForm from "../components/ItemForm.jsx";
import Modal from "../../../shared/components/Modal.jsx";

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

  const [openModal, setOpenModal] = useState(null);

  async function handleSubmit(payload){
    await addItem(payload);
    setOpenModal(null);
  }

  return (
    <div className="space-y-10">
      <section className="rounded-xl bg-white p-8 text-center shadow-sm dark:bg-slate-900">
        <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl dark:text-slate-100">
          Lost something? We'll help you find it.
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-slate-500 dark:text-slate-400">
          A centralized board for students to report and recover lost or found items on campus.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={() => setOpenModal("Lost")}
            className="cursor-pointer rounded-md bg-amber-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-amber-700"
          >
            Report Lost Item
          </button>
          <button
            onClick={() => setOpenModal("Found")}
            className="cursor-pointer rounded-md bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-700"
          >
            Report Found Item
          </button>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Recent reports
          </h2>
          <FilterBar value={typeFilter} onChange={setTypeFilter} />
        </div>
        <ItemList items={items} isLoading={isLoading} loadError={loadError} onRetry={refetch} />
      </section>

      <Modal
        isOpen={openModal !== null}
        onClose={() => setOpenModal(null)}
        title={openModal === "Lost" ? "Report a Lost Item" : "Report a Found Item"}
      >
        <ItemForm onSubmit={handleSubmit} isSubmitting={isSubmitting} lockedType={openModal} />
      </Modal>
    </div>
  );
}