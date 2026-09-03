export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-sm text-slate-500 dark:text-slate-400 sm:flex-row">
        <span>© {new Date().getFullYear()} Campus Lost &amp; Found</span>
        <a
          href="https://github.com/your-username"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-slate-900 dark:hover:text-slate-100"
        >
          Built by Shivam Kumar
        </a>
      </div>
    </footer>
  );
}