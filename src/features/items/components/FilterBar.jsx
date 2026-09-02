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
          className={`rounded-full border px-3 py-1 text-sm font-medium transition ${
            value === opt.value
              ? "border-slate-900 bg-slate-900 text-white"
              : "border-slate-300 bg-white text-slate-600 hover:bg-slate-100"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}