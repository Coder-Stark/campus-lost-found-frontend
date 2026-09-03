import ThemeToggle from "./ThemeToggle.jsx";

export default function Navbar({ theme, onToggleTheme }) {
  return (
    <header className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <span className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          Campus Lost &amp; Found
        </span>
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
      </div>
    </header>
  );
}