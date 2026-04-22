import { useDeleteInvoiceMutation } from "@/module/invoice/api/invoiceApi";
import "@/module/invoice/styles/invoice.css";

interface DeleteInvoiceDialogProps {
  invoiceId: string;
  onClose: () => void;
}

export function DeleteInvoiceDialog({
  invoiceId,
  onClose,
}: DeleteInvoiceDialogProps) {
  const [deleteInvoice, { isLoading }] = useDeleteInvoiceMutation();

  const handleDelete = async () => {
    try {
      await deleteInvoice(invoiceId).unwrap();
      onClose();
    } catch {
      // Error handled by RTK Query — toast could go here
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <h2>Delete Invoice</h2>
        <p>
          Are you sure you want to delete this invoice? This action cannot be
          undone.
        </p>
        <div className="modal-actions">
          <button
            className="modal-cancel"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            className="modal-delete"
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading ? "Deleting…" : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
