import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useCreateInvoiceMutation,
  useUpdateInvoiceMutation,
  useGetInvoiceByIdQuery,
} from "@/module/invoice/api/invoiceApi";
import {
  createInvoiceSchema,
  updateInvoiceSchema,
  type CreateInvoiceFormValues,
  type UpdateInvoiceFormValues,
} from "@/module/invoice/utils/validationSchemas";
import { InvoiceStatus } from "@/module/invoice/types/invoice.types";
import { APP_ROUTES } from "@/constants/routes";
import { useToast } from "@/hooks/useToast";
import "@/module/invoice/styles/invoice.css";

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

interface InvoiceFormProps {
  mode: "create" | "edit";
}

export function InvoiceForm({ mode }: InvoiceFormProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = mode === "edit";
  const toast = useToast();

  // Fetch existing invoice for edit mode
  const { data: existing } = useGetInvoiceByIdQuery(id!, {
    skip: !isEdit || !id,
  });

  const [createInvoice, { isLoading: isCreating }] = useCreateInvoiceMutation();
  const [updateInvoice, { isLoading: isUpdating }] = useUpdateInvoiceMutation();

  const isSubmitting = isCreating || isUpdating;

  // Use the appropriate schema depending on mode
  const schema = isEdit ? updateInvoiceSchema : createInvoiceSchema;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateInvoiceFormValues | UpdateInvoiceFormValues>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: yupResolver(schema as any),
    mode: "onTouched",
  });

  // Populate form when editing
  useEffect(() => {
    if (isEdit && existing) {
      reset({
        customerName: existing.customerName,
        amount: existing.amount,
        ...(isEdit ? { status: existing.status } : {}),
      });
    }
  }, [isEdit, existing, reset]);

  const onSubmit = async (
    values: CreateInvoiceFormValues | UpdateInvoiceFormValues,
  ) => {
    try {
      if (isEdit && id) {
        await updateInvoice({ id, body: values }).unwrap();
        toast.success(
          "Invoice Updated",
          "Your invoice has been saved successfully.",
        );
        navigate(`/invoices/${id}`, { replace: true });
      } else {
        const created = await createInvoice(
          values as CreateInvoiceFormValues,
        ).unwrap();
        toast.success(
          "Invoice Created",
          "Your new invoice has been created successfully.",
        );
        navigate(`/invoices/${created.id}`, { replace: true });
      }
    } catch (error) {
      const errorMessage =
        (error as { data?: { message?: string } }).data?.message ||
        "An error occurred";
      toast.error("Operation Failed", errorMessage);
    }
  };

  return (
    <div className="invoice-form-page">
      <h1>{isEdit ? "Edit Invoice" : "Create Invoice"}</h1>

      <form
        className="invoice-form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        {/* Customer name */}
        <div className="invoice-form-field">
          <label htmlFor="invoice-customer">Customer Name</label>
          <input
            id="invoice-customer"
            type="text"
            className={`invoice-form-input ${errors.customerName ? "input-error" : ""}`}
            placeholder="e.g. Acme Corp"
            {...register("customerName")}
          />
          {errors.customerName && (
            <p className="invoice-form-error">{errors.customerName.message}</p>
          )}
        </div>

        {/* Amount */}
        <div className="invoice-form-field">
          <label htmlFor="invoice-amount">Amount ($)</label>
          <input
            id="invoice-amount"
            type="number"
            step="0.01"
            className={`invoice-form-input ${errors.amount ? "input-error" : ""}`}
            placeholder="0.00"
            {...register("amount")}
          />
          {errors.amount && (
            <p className="invoice-form-error">{errors.amount.message}</p>
          )}
        </div>

        {/* Status (edit mode only) */}
        {isEdit && (
          <div className="invoice-form-field">
            <label htmlFor="invoice-status">Status</label>
            <select
              id="invoice-status"
              className={`invoice-form-select ${"status" in errors && errors.status ? "input-error" : ""}`}
              {...register("status" as "customerName")}
            >
              {Object.values(InvoiceStatus).map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            {"status" in errors && errors.status && (
              <p className="invoice-form-error">
                {
                  (
                    errors as UpdateInvoiceFormValues & {
                      status?: { message?: string };
                    }
                  ).status?.message
                }
              </p>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="invoice-form-actions">
          <button
            type="submit"
            className="invoice-form-submit"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? isEdit
                ? "Saving…"
                : "Creating…"
              : isEdit
                ? "Save Changes"
                : "Create Invoice"}
          </button>
          <Link to={APP_ROUTES.INVOICES} className="invoice-form-cancel">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
