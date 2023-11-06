import { useDashBoard } from "../../components/DashBoardContext/useDashBoard";

const useNewAccountModalController = () => {
    const { isNewAccountModalOpen, closeNewAccountModal } = useDashBoard();

    return {
        isNewAccountModalOpen,
        closeNewAccountModal,
    };
};

export default useNewAccountModalController;
