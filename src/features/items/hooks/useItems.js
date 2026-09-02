import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { createItem, fetchItems } from "../api/items.api";

export function useItems() {
  const [items, setItems] = useState([]);
  const [typeFilter, setTypeFilter] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadItems = useCallback(async (type) => {
    setIsLoading(true);
    setLoadError(null);
    try {
      const data = await fetchItems(type || undefined);
      setItems(data);
    } catch (err) {
      setLoadError(
        err.response?.data?.error || "Could not reach the server."
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadItems(typeFilter);
  }, [typeFilter, loadItems]);

  const addItem = useCallback(
    async (payload) => {
      setIsSubmitting(true);
      try {
        const created = await createItem(payload);
        await loadItems(typeFilter);
        toast.success("Report submitted.");
        return created;
      } catch (err) {
        const data = err.response?.data;
        const detailMsgs = (data?.details || []).map((d) => d.message);
        toast.error(
          [data?.error, ...detailMsgs].filter(Boolean).join(" — ") ||
            "Could not submit the report."
        );
        throw err;
      } finally {
        setIsSubmitting(false);
      }
    },
    [loadItems, typeFilter]
  );

  return {
    items,
    isLoading,
    loadError,
    typeFilter,
    setTypeFilter,
    refetch: () => loadItems(typeFilter),
    addItem,
    isSubmitting,
  };
}