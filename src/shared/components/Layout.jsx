export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-4xl px-4 py-5">
          <h1 className="text-xl font-semibold text-slate-900">Campus Lost &amp; Found</h1>
          <p className="text-sm text-slate-500">
            Report something you lost or found, or browse recent reports.
          </p>
        </div>
      </header>
      <main className="mx-auto max-w-4xl px-4 py-8">{children}</main>
    </div>
  );
}