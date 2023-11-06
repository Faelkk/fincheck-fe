import { useState } from "react";
import { useDashBoard } from "../DashBoardContext/useDashBoard";

export function useTransactionController() {
    const { areValueVisible } = useDashBoard();

    const [isFiltered, setIsFilteredModalOpen] = useState(false);

    function handleOpenFiltersModal() {
        setIsFilteredModalOpen(true);
    }

    function handleCloseFiltersModal() {
        setIsFilteredModalOpen(false);
    }
    return {
        isFiltered,
        areValueVisible,
        transactions: [{}],
        isInitialLoading: false,
        isLoading: false,
        handleOpenFiltersModal,
        handleCloseFiltersModal,
    };
}
