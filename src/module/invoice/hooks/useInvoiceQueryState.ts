import { create } from "zustand";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { QueryKeys } from "../constants/queryKeys";
import { DefaultQueryValues } from "../constants/defaultValues";
import type { InvoiceStatusType } from "../types/invoice.types";

export interface InvoiceQueryState {
  page: number;
  limit: number;
  search: string;
  status: InvoiceStatusType | "";
  setQuery: (
    query: Partial<Omit<InvoiceQueryState, "setQuery" | "resetQuery">>,
  ) => void;
  resetQuery: () => void;
}

const useInvoiceQueryStore = create<InvoiceQueryState>((set) => ({
  page: DefaultQueryValues.PAGE,
  limit: DefaultQueryValues.LIMIT,
  search: DefaultQueryValues.SEARCH,
  status: DefaultQueryValues.STATUS,
  setQuery: (query) =>
    set((state) => ({
      ...state,
      ...query,
      // Reset page to 1 if search or status changes
      ...(query.search !== undefined || query.status !== undefined
        ? { page: 1 }
        : {}),
    })),
  resetQuery: () =>
    set({
      page: DefaultQueryValues.PAGE,
      limit: DefaultQueryValues.LIMIT,
      search: DefaultQueryValues.SEARCH,
      status: DefaultQueryValues.STATUS,
    }),
}));

// 2. Custom Hook to Sync Zustand <-> URL
export function useInvoiceQueryState() {
  const [searchParams, setSearchParams] = useSearchParams();
  const state = useInvoiceQueryStore();

  // URL -> Zustand (On mount or external URL change)
  useEffect(() => {
    const page =
      Number(searchParams.get(QueryKeys.PAGE)) || DefaultQueryValues.PAGE;
    const limit =
      Number(searchParams.get(QueryKeys.LIMIT)) || DefaultQueryValues.LIMIT;
    const search =
      searchParams.get(QueryKeys.SEARCH) || DefaultQueryValues.SEARCH;
    const status =
      (searchParams.get(QueryKeys.STATUS) as InvoiceStatusType | "") ||
      DefaultQueryValues.STATUS;

    // Only update Zustand if URL differs from current Zustand state to prevent infinite loops
    if (
      page !== state.page ||
      limit !== state.limit ||
      search !== state.search ||
      status !== state.status
    ) {
      state.setQuery({ page, limit, search, status });
    }
  }, [searchParams, state]);

  // Zustand -> URL (When Zustand state changes via setQuery)
  useEffect(() => {
    const newParams = new URLSearchParams(searchParams);

    // Update or remove params
    if (state.page !== DefaultQueryValues.PAGE)
      newParams.set(QueryKeys.PAGE, String(state.page));
    else newParams.delete(QueryKeys.PAGE);

    if (state.limit !== DefaultQueryValues.LIMIT)
      newParams.set(QueryKeys.LIMIT, String(state.limit));
    else newParams.delete(QueryKeys.LIMIT);

    if (state.search) newParams.set(QueryKeys.SEARCH, state.search);
    else newParams.delete(QueryKeys.SEARCH);

    if (state.status) newParams.set(QueryKeys.STATUS, state.status);
    else newParams.delete(QueryKeys.STATUS);

    // Only update URL if params have actually changed
    if (newParams.toString() !== searchParams.toString()) {
      setSearchParams(newParams, { replace: true });
    }
  }, [
    state.page,
    state.limit,
    state.search,
    state.status,
    searchParams,
    setSearchParams,
  ]);

  return state;
}
