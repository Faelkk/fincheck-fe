import { useEffect, useState } from "react";
import { useDashBoard } from "../DashBoardContext/useDashBoard";
import { useTransactions } from "../../../../../app/hooks/useTransaction";
import { typeTransactionsFilter } from "../../../../../app/services/TransactionService/getAll";
import { Transaction } from "../../../../../app/Entities/Transaction";

export function useTransactionController() {
    const { areValueVisible } = useDashBoard();

    const [isFiltered, setIsFilteredModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [transactionBeingEdited, SetTransactionBeingEdited] =
        useState<null | Transaction>(null);

    const [filters, setFilters] = useState<typeTransactionsFilter>({
        month: new Date().getMonth(),
        year: new Date().getFullYear(),
    });

    const { transactions, isLoading, isInitialLoading, refetch } =
        useTransactions(filters);

    useEffect(() => {
        refetch();
    }, [filters, refetch]);

    function handleApplyFilters({
        bankAccountId,
        year,
    }: {
        bankAccountId: string | undefined;
        year: number;
    }) {
        handleChangeFilters("bankAccountId")(bankAccountId);
        handleChangeFilters("year")(year);
        setIsFilteredModalOpen(false);
    }

    function handleChangeFilters<Tfilter extends keyof typeTransactionsFilter>(
        filter: Tfilter
    ) {
        return (value: typeTransactionsFilter[Tfilter]) => {
            if (value === filters[filter]) return;

            setFilters((prevState) => ({
                ...prevState,
                [filter]: value,
            }));
        };
    }

    function handleOpenFiltersModal() {
        setIsFilteredModalOpen(true);
    }

    function handleCloseFiltersModal() {
        setIsFilteredModalOpen(false);
    }

    function handleOpenTransactionEditModal(transaction: Transaction) {
        setIsEditModalOpen(true);

        SetTransactionBeingEdited(transaction);
    }

    function handleCloseTransactionEditModal() {
        setIsEditModalOpen(false);
        SetTransactionBeingEdited(null);
    }

    return {
        transactionBeingEdited,
        isEditModalOpen,
        filters,
        isFiltered,
        areValueVisible,
        transactions,
        isInitialLoading,
        isLoading,
        handleOpenFiltersModal,
        handleCloseFiltersModal,
        handleChangeFilters,
        handleApplyFilters,
        handleOpenTransactionEditModal,
        handleCloseTransactionEditModal,
    };
}
