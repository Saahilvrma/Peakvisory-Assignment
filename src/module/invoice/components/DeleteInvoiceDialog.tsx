import { useDeleteInvoiceMutation } from "@/module/invoice/api/invoiceApi";
import { useToast } from "@/hooks/useToast";
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
  const toast = useToast();

  const handleDelete = async () => {
    try {
      await deleteInvoice(invoiceId).unwrap();
      toast.success(
        "Invoice Deleted",
        "The invoice has been deleted successfully.",
      );
      onClose();
    } catch (error) {
      const errorMessage =
        (error as { data?: { message?: string } }).data?.message ||
        "Failed to delete invoice";
      toast.error("Delete Failed", errorMessage);
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
