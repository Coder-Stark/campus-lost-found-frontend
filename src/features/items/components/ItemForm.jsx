import { useState } from "react";

const INITIAL_STATE = {
  title: "",
  type: "Lost",
  location: "",
  contactMethod: "",
  date: "",
  description: "",
};

export default function ItemForm({ onSubmit, isSubmitting }) {
  const [values, setValues] = useState(INITIAL_STATE);

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const payload = {
      title: values.title.trim(),
      type: values.type,
      location: values.location.trim(),
      contactMethod: values.contactMethod.trim(),
      ...(values.date ? { date: new Date(values.date).toISOString() } : {}),
      ...(values.description.trim() ? { description: values.description.trim() } : {}),
    };

    try {
      await onSubmit(payload);
      setValues(INITIAL_STATE);
    } catch {
      // toast already shown by useItems
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="mb-1 block text-sm font-medium text-slate-700">Title</label>
          <input
            name="title"
            required
            value={values.title}
            onChange={handleChange}
            placeholder="e.g. Black Water Bottle"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Type</label>
          <select
            name="type"
            required
            value={values.type}
            onChange={handleChange}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
          >
            <option value="Lost">Lost</option>
            <option value="Found">Found</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Location</label>
          <input
            name="location"
            required
            value={values.location}
            onChange={handleChange}
            placeholder="e.g. Central Library"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Contact method</label>
          <input
            name="contactMethod"
            required
            value={values.contactMethod}
            onChange={handleChange}
            placeholder="email or phone"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Date <span className="text-slate-400">(optional)</span>
          </label>
          <input
            type="date"
            name="date"
            value={values.date}
            onChange={handleChange}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Description <span className="text-slate-400">(optional)</span>
          </label>
          <textarea
            name="description"
            value={values.description}
            onChange={handleChange}
            rows={3}
            placeholder="Any extra detail that helps identify the item"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {isSubmitting ? "Submitting..." : "Submit report"}
      </button>
    </form>
  );
}