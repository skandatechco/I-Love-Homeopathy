import { getSectionColour } from "@/lib/section-colours";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

function pageHref(basePath: string, page: number) {
  return `${basePath}?page=${page}`;
}

function buildPages(currentPage: number, totalPages: number) {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const pages = new Set<number>([1, totalPages]);
  for (let page = currentPage - 2; page <= currentPage + 2; page += 1) {
    if (page > 1 && page < totalPages) {
      pages.add(page);
    }
  }

  return Array.from(pages).sort((a, b) => a - b);
}

export default function Pagination({
  currentPage,
  totalPages,
  basePath,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pageNumbers = buildPages(currentPage, totalPages);
  const section = basePath.split("/").pop() || "philosophy";
  const colour = getSectionColour(section);

  return (
    <div className="flex items-center justify-center gap-2 py-8">
      <a
        href={pageHref(basePath, Math.max(1, currentPage - 1))}
        className={`rounded-lg border border-rule px-4 py-2 font-helvetica text-sm text-muted ${
          currentPage === 1 ? "pointer-events-none opacity-40" : ""
        }`}
      >
        Previous
      </a>

      {pageNumbers.map((page, index) => {
        const previous = pageNumbers[index - 1];
        const showEllipsis = previous && page - previous > 1;

        return (
          <span key={page} className="flex items-center gap-2">
            {showEllipsis ? (
              <span className="px-2 font-helvetica text-sm text-muted">…</span>
            ) : null}
            <a
              href={pageHref(basePath, page)}
              className="rounded-lg px-4 py-2 font-helvetica text-sm transition"
              style={
                page === currentPage
                  ? { background: colour.border, color: "#ffffff" }
                  : { background: "#ede8d8", color: "#0a1f2e" }
              }
            >
              {page}
            </a>
          </span>
        );
      })}

      <a
        href={pageHref(basePath, Math.min(totalPages, currentPage + 1))}
        className={`rounded-lg border border-rule px-4 py-2 font-helvetica text-sm text-muted ${
          currentPage === totalPages ? "pointer-events-none opacity-40" : ""
        }`}
      >
        Next
      </a>
    </div>
  );
}
