const OPTIONS = [
  { label: "All", value: "" },
  { label: "Lost", value: "Lost" },
  { label: "Found", value: "Found" },
];

export default function FilterBar({ value, onChange }) {
  return (
    <div className="flex gap-2">
      {OPTIONS.map((opt) => (
        <button
          key={opt.label}
          onClick={() => onChange(opt.value)}
          className={`cursor-pointer rounded-full border px-3 py-1 text-sm font-medium transition ${
            value === opt.value
              ? "border-slate-900 bg-slate-900 text-white dark:border-slate-100 dark:bg-slate-100 dark:text-slate-900"
              : "border-slate-300 bg-white text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}