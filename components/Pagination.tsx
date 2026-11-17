"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({
  currentPage,
  totalPages,
}: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  function changePage(page: number) {
    const params = new URLSearchParams(searchParams.toString());

    params.set("page", page.toString());

    router.push(`${pathname}?${params.toString()}`);
  }

  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav
      aria-label="Meeting pages"
      className="mt-8 flex items-center justify-center gap-4"
    >
      <button
        type="button"
        onClick={() => changePage(currentPage - 1)}
        disabled={currentPage <= 1}
        className="rounded border px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Previous
      </button>

      <span aria-live="polite">
        Page {currentPage} of {totalPages}
      </span>

      <button
        type="button"
        onClick={() => changePage(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="rounded border px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Next
      </button>
    </nav>
  );
}