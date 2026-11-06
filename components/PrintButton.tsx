
"use client";

export default function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="mt-8 rounded-lg bg-slate-900 px-6 py-3 text-white hover:bg-slate-700 print:hidden"
    >
      Print Meeting Program
    </button>
  );
}
