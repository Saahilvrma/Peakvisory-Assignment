import { Search } from "@/lib/components/Search/Search";

import {
  type InvoiceStatusType,
  InvoiceStatus,
} from "@/module/invoice/types/invoice.types";
import { useInvoiceQueryState } from "@/module/invoice/hooks/useInvoiceQueryState";

export function InvoiceFilters() {
  const { search, status, setQuery } = useInvoiceQueryState();

  return (
    <div
      style={{
        display: "flex",
        gap: "1rem",
        flexWrap: "wrap",
        marginBottom: "1.5rem",
        alignItems: "center",
      }}
    >
      <Search
        value={search}
        onChange={(val) => setQuery({ search: val })}
        placeholder="Search invoices..."
      />

      <select
        value={status}
        onChange={(e) =>
          setQuery({ status: e.target.value as InvoiceStatusType })
        }
        className="lib-sorting-select"
      >
        <option value="">All Statuses</option>
        {Object.values(InvoiceStatus).map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
    </div>
  );
}
