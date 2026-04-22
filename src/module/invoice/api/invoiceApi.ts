import { createApi } from "@reduxjs/toolkit/query/react";
import createAxiosBaseQuery from "@/lib/api/axiosBaseQuery";
import type {
  Invoice,
  InvoiceListResponse,
  InvoiceQueryParams,
  CreateInvoicePayload,
  UpdateInvoicePayload,
} from "@/module/invoice/types/invoice.types";

// ...existing code...

/* ------------------------------------------------------------------ */
/*  Invoice API slice                                                  */
/* ------------------------------------------------------------------ */

export const invoiceApi = createApi({
  reducerPath: "invoiceApi",
  baseQuery: createAxiosBaseQuery(),
  tagTypes: ["Invoice"],
  endpoints: (builder) => ({
    /** GET /api/invoices?page=&limit=&search=&status= */
    getInvoices: builder.query<InvoiceListResponse, InvoiceQueryParams>({
      query: (params) => ({
        url: "/api/invoices",
        method: "GET",
        params: params as Record<string, unknown>,
      }),
      providesTags: (result) => {
        const invoices = Array.isArray(result)
          ? result.items
          : (result.items ?? []);
        return [
          ...invoices.map(({ id }: { id: string }) => ({
            type: "Invoice" as const,
            id,
          })),
          { type: "Invoice", id: "LIST" },
        ];
      },
    }),

    /** GET /api/invoices/:id */
    getInvoiceById: builder.query<Invoice, string>({
      query: (id) => ({
        url: `/api/invoices/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "Invoice", id }],
    }),

    /** POST /api/invoices */
    createInvoice: builder.mutation<Invoice, CreateInvoicePayload>({
      query: (body) => ({
        url: "/api/invoices",
        method: "POST",
        data: body,
      }),
      invalidatesTags: [{ type: "Invoice", id: "LIST" }],
    }),

    /** PATCH /api/invoices/:id */
    updateInvoice: builder.mutation<
      Invoice,
      { id: string; body: UpdateInvoicePayload }
    >({
      query: ({ id, body }) => ({
        url: `/api/invoices/${id}`,
        method: "PATCH",
        data: body,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Invoice", id },
        { type: "Invoice", id: "LIST" },
      ],
    }),

    /** DELETE /api/invoices/:id */
    deleteInvoice: builder.mutation<void, string>({
      query: (id) => ({
        url: `/api/invoices/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: "Invoice", id },
        { type: "Invoice", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetInvoicesQuery,
  useGetInvoiceByIdQuery,
  useCreateInvoiceMutation,
  useUpdateInvoiceMutation,
  useDeleteInvoiceMutation,
} = invoiceApi;
