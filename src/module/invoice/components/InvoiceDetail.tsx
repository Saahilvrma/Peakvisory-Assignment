import { useParams, Link, useNavigate } from "react-router-dom";
import { useGetInvoiceByIdQuery } from "@/module/invoice/api/invoiceApi";
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
import "@/module/invoice/styles/invoice.css";

export function InvoiceDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const canUpdate = hasPermission(user, Permissions.INVOICES_UPDATE);
  const canDelete = hasPermission(user, Permissions.INVOICES_DELETE);

  const {
    data: invoice,
    isLoading,
    isError,
  } = useGetInvoiceByIdQuery(id!, {
    skip: !id,
  });

  const [showDelete, setShowDelete] = useState(false);

  if (isLoading) {
    return (
      <div className="invoice-detail">
        <div className="invoice-detail-header">
          <h1>Loading…</h1>
        </div>
        <div className="invoice-detail-card">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="invoice-skeleton-row">
              <div className="invoice-skeleton-cell" style={{ width: "25%" }} />
              <div className="invoice-skeleton-cell" style={{ width: "40%" }} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isError || !invoice) {
    return (
      <div className="invoice-detail">
        <div className="invoice-empty">
          <h3>Invoice not found</h3>
          <p>The invoice you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="invoice-detail">
      <div className="invoice-detail-header">
        <h1>Invoice Details</h1>
        <span className={`invoice-status ${getStatusColor(invoice.status)}`}>
          {invoice.status}
        </span>
      </div>

      <div className="invoice-detail-card">
        <div className="invoice-detail-row">
          <span className="invoice-detail-label">Invoice ID</span>
          <span className="invoice-detail-value">{invoice.id}</span>
        </div>
        <div className="invoice-detail-row">
          <span className="invoice-detail-label">Invoice Name</span>
          <span className="invoice-detail-value">{invoice?.invoiceNumber}</span>
        </div>
        <div className="invoice-detail-row">
          <span className="invoice-detail-label">Customer</span>
          <span className="invoice-detail-value">{invoice.customerName}</span>
        </div>
        <div className="invoice-detail-row">
          <span className="invoice-detail-label">Amount</span>
          <span className="invoice-detail-value invoice-amount">
            {formatCurrency(invoice.amount)}
          </span>
        </div>
        <div className="invoice-detail-row">
          <span className="invoice-detail-label">Created</span>
          <span className="invoice-detail-value">
            {formatDate(invoice.createdAt)}
          </span>
        </div>
      </div>

      <div className="invoice-detail-actions">
        <Link to={APP_ROUTES.INVOICES} className="invoice-form-cancel">
          ← Back
        </Link>
        {canUpdate && (
          <Link
            to={`/invoices/${invoice.id}/edit`}
            className="invoice-form-submit"
            style={{ textDecoration: "none" }}
          >
            Edit Invoice
          </Link>
        )}
        {canDelete && (
          <button className="modal-delete" onClick={() => setShowDelete(true)}>
            Delete
          </button>
        )}
      </div>

      {showDelete && (
        <DeleteInvoiceDialog
          invoiceId={invoice.id}
          onClose={() => {
            setShowDelete(false);
            navigate(APP_ROUTES.INVOICES, { replace: true });
          }}
        />
      )}
    </div>
  );
}
