import { Link } from "react-router-dom";
import { useGetInvoicesQuery } from "@/module/invoice/api/invoiceApi";
import { useAuthStore } from "@/module/auth/hooks/useAuth";
import { hasPermission } from "@/module/auth/utils/permissions";
import { Permissions } from "@/constants/permissions";
import { APP_ROUTES } from "@/constants/routes";
import {
  formatCurrency,
  formatDate,
  getStatusColor,
} from "@/module/invoice/utils/formatters";
import { DeleteInvoiceDialog } from "./DeleteInvoiceDialog";
import { useState } from "react";
import { InvoiceFilters } from "./Filters/InvoiceFilters";
import { Pagination } from "@/lib/components/Pagination/Pagination";
import { useInvoiceQueryState } from "@/module/invoice/hooks/useInvoiceQueryState";
import "@/module/invoice/styles/invoice.css";

/* ------------------------------------------------------------------ */
/*  Icons                                                              */
/* ------------------------------------------------------------------ */

const PlusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const EyeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EditIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
  </svg>
);

const TrashIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 6h18" />
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    <line x1="10" y1="11" x2="10" y2="17" />
    <line x1="14" y1="11" x2="14" y2="17" />
  </svg>
);

const EmptyIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
    <path d="M14 2v6h6" />
    <path d="M12 18v-6" />
    <path d="m9 15 3-3 3 3" />
  </svg>
);

/* ------------------------------------------------------------------ */
/*  Skeleton loader                                                    */
/* ------------------------------------------------------------------ */

function TableSkeleton() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="invoice-skeleton-row">
          <div className="invoice-skeleton-cell" style={{ width: "30%" }} />
          <div className="invoice-skeleton-cell" style={{ width: "15%" }} />
          <div className="invoice-skeleton-cell" style={{ width: "12%" }} />
          <div className="invoice-skeleton-cell" style={{ width: "18%" }} />
          <div className="invoice-skeleton-cell" style={{ width: "10%" }} />
        </div>
      ))}
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function InvoiceList() {
  const user = useAuthStore((s) => s.user);
  const canCreate = hasPermission(user, Permissions.INVOICES_CREATE);
  const canUpdate = hasPermission(user, Permissions.INVOICES_UPDATE);
  const canDelete = hasPermission(user, Permissions.INVOICES_DELETE);

  const { page, limit, search, status, setQuery } = useInvoiceQueryState();

  const { data, isLoading, isError } = useGetInvoicesQuery({
    page,
    limit,
    ...(search ? { search } : {}),
    ...(status ? { status } : {}),
  });

  const totalPages = data?.totalCount ? Math.ceil(data.totalCount / limit) : 1;

  const [deleteId, setDeleteId] = useState<string | null>(null);

  return (
    <div>
      {/* Header */}
      <div className="invoice-page-header">
        <h1>Invoices</h1>
        {canCreate && (
          <Link to={APP_ROUTES.INVOICE_CREATE} className="invoice-create-btn">
            <PlusIcon />
            New Invoice
          </Link>
        )}
      </div>

      {/* Filters & Search */}
      <InvoiceFilters />

      {/* Table */}
      <div className="invoice-table-wrapper">
        {isLoading ? (
          <TableSkeleton />
        ) : isError ? (
          <div className="invoice-empty">
            <EmptyIcon />
            <h3>Failed to load invoices</h3>
            <p>Please try again later.</p>
          </div>
        ) : !data?.items?.length ? (
          <div className="invoice-empty">
            <EmptyIcon />
            <h3>No invoices yet</h3>
            <p>
              {canCreate
                ? "Create your first invoice to get started."
                : "No invoices to display."}
            </p>
          </div>
        ) : (
          <table className="invoice-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.items.map((invoice) => (
                <tr key={invoice.id}>
                  <td>
                    <Link
                      to={`/invoices/${invoice.id}`}
                      className="invoice-customer-link"
                    >
                      {invoice.customerName}
                    </Link>
                  </td>
                  <td className="invoice-amount">
                    {formatCurrency(invoice.amount)}
                  </td>
                  <td>
                    <span
                      className={`invoice-status ${getStatusColor(invoice.status)}`}
                    >
                      {invoice.status}
                    </span>
                  </td>
                  <td>{formatDate(invoice.createdAt)}</td>
                  <td>
                    <div className="invoice-actions">
                      <Link
                        to={`/invoices/${invoice.id}`}
                        className="invoice-action-btn"
                        title="View"
                      >
                        <EyeIcon />
                      </Link>
                      {canUpdate && (
                        <Link
                          to={`/invoices/${invoice.id}/edit`}
                          className="invoice-action-btn"
                          title="Edit"
                        >
                          <EditIcon />
                        </Link>
                      )}
                      {canDelete && (
                        <button
                          className="invoice-action-btn delete"
                          title="Delete"
                          onClick={() => setDeleteId(invoice.id)}
                        >
                          <TrashIcon />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {/* Pagination */}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={(newPage) => setQuery({ page: newPage })}
      />
      {/* Delete modal */}
      {deleteId && (
        <DeleteInvoiceDialog
          invoiceId={deleteId}
          onClose={() => setDeleteId(null)}
        />
      )}
    </div>
  );
}
