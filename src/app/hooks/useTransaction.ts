import { useQuery } from "@tanstack/react-query";
import { transactionsService } from "../services/TransactionService";
import { typeTransactionsFilter } from "../services/TransactionService/getAll";

export function useTransactions(filters: typeTransactionsFilter) {
    const { data, isFetching, isInitialLoading, refetch } = useQuery({
        queryKey: ["transactions"],
        queryFn: () => transactionsService.getAll(filters),
        enabled: false,
    });

    return {
        transactions: data ?? [],
        isLoading: isFetching,
        isInitialLoading,
        refetch,
    };
}
