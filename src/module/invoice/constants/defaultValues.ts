import type { InvoiceStatusType } from "../types/invoice.types";

export const DefaultQueryValues = {
  PAGE: 1,
  LIMIT: 10,
  SEARCH: "",
  STATUS: "" as InvoiceStatusType | "",
} as const;
