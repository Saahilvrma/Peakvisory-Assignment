import * as yup from "yup";
import { InvoiceStatus } from "@/module/invoice/types/invoice.types";

/** Schema for creating a new invoice */
export const createInvoiceSchema = yup.object({
  customerName: yup
    .string()
    .required("Customer name is required")
    .min(2, "Minimum 2 characters")
    .max(100, "Maximum 100 characters"),
  amount: yup
    .number()
    .typeError("Amount must be a number")
    .required("Amount is required")
    .positive("Amount must be positive")
    .max(999_999_999, "Amount is too large"),
});

export type CreateInvoiceFormValues = yup.InferType<typeof createInvoiceSchema>;

/** Schema for updating an invoice */
export const updateInvoiceSchema = yup.object({
  customerName: yup
    .string()
    .required("Customer name is required")
    .min(2, "Minimum 2 characters")
    .max(100, "Maximum 100 characters"),
  amount: yup
    .number()
    .typeError("Amount must be a number")
    .required("Amount is required")
    .positive("Amount must be positive")
    .max(999_999_999, "Amount is too large"),
  status: yup
    .string()
    .oneOf(Object.values(InvoiceStatus), "Invalid status")
    .required("Status is required"),
});

export type UpdateInvoiceFormValues = yup.InferType<typeof updateInvoiceSchema>;
