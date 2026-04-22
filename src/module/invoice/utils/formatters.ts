import type { InvoiceStatusType } from "@/module/invoice/types/invoice.types";

/**
 * Format a number as currency (USD).
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount);
};

/**
 * Format an ISO date string to a human-friendly format.
 */
export const formatDate = (dateStr: string | number): string => {
  const date =
    typeof dateStr === "string" && /^\d+$/.test(dateStr)
      ? new Date(Number(dateStr))
      : new Date(dateStr);

  if (isNaN(date.getTime())) return "Invalid Date";

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
};

/**
 * Returns CSS class modifier for invoice status badge.
 */
export const getStatusColor = (status: InvoiceStatusType): string => {
  const map: Record<InvoiceStatusType, string> = {
    Draft: "status-draft",
    Sent: "status-sent",
    Paid: "status-paid",
    Overdue: "status-overdue",
    Cancelled: "status-cancelled",
  };
  return map[status] ?? "status-draft";
};
