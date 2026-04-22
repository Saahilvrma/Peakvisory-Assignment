/** Invoice status values */
export const InvoiceStatus = {
  DRAFT: "Draft",
  SENT: "Sent",
  PAID: "Paid",
} as const;

export type InvoiceStatusType =
  (typeof InvoiceStatus)[keyof typeof InvoiceStatus];

/** Single invoice entity */
export interface Invoice {
  id: string;
  customerName: string;
  amount: number;
  status: InvoiceStatusType;
  createdAt: string;
  invoiceNumber: string;
}

/** GET /api/invoices response shape */
export interface InvoiceListResponse {
  items: Invoice[];
  totalCount: number;
  page: number;
  limit: number;
}

/** Query params for listing invoices */
export interface InvoiceQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: InvoiceStatusType | "";
}

/** POST /api/invoices body */
export interface CreateInvoicePayload {
  customerName: string;
  amount: number;
}

/** PATCH /api/invoices/:id body */
export interface UpdateInvoicePayload {
  customerName?: string;
  amount?: number;
  status?: InvoiceStatusType;
}
