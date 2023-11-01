import { useDashBoard } from "../DashBoardContext/useDashBoard";

export function useTransactionController() {
    const { areValueVisible } = useDashBoard();

    return {
        areValueVisible,
        transactions: [{}],
        isInitialLoading: false,
        isLoading: false,
    };
}
