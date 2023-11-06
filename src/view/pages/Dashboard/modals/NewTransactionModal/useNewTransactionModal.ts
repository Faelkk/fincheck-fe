import { useDashBoard } from "../../components/DashBoardContext/useDashBoard";

const useNewTransactionController = () => {
    const {
        isNewTransactionModalOpen,
        newTransactionType,
        closeNewTransactionModal,
    } = useDashBoard();

    return {
        newTransactionType,
        isNewTransactionModalOpen,
        closeNewTransactionModal,
    };
};

export default useNewTransactionController;
