import { useState } from "react";
import { useWindowWidth } from "../../../../../app/hooks/useWindowWidth";
import { useDashBoard } from "../DashBoardContext/useDashBoard";

const useAccountsController = () => {
    const windowWidth = useWindowWidth();
    const { areValueVisible, toggleValuesVisiblity } = useDashBoard();

    const [sliderState, setSliderState] = useState({
        isBeginning: true,
        isEnd: false,
    });

    return {
        areValueVisible,
        windowWidth,
        sliderState,
        setSliderState,
        toggleValuesVisiblity,
        isLoading: false,
        accounts: [],
    };
};

export default useAccountsController;
