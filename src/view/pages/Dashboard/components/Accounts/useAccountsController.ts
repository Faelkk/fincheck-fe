import { useState } from "react";
import { useWindowWidth } from "../../../../../app/hooks/useWindowWidth";
import { useDashBoard } from "../DashBoardContext/useDashBoard";

const useAccountsController = () => {
    const windowWidth = useWindowWidth();

    const { areValueVisible, openNewAccountModal, toggleValuesVisiblity } =
        useDashBoard();

    const [sliderState, setSliderState] = useState({
        isBeginning: true,
        isEnd: false,
    });

    return {
        areValueVisible,
        windowWidth,
        sliderState,
        isLoading: false,
        accounts: [],
        setSliderState,
        toggleValuesVisiblity,
        openNewAccountModal,
    };
};

export default useAccountsController;
