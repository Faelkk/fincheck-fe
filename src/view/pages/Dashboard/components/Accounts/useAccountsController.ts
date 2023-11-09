import { useMemo, useState } from "react";
import { useWindowWidth } from "../../../../../app/hooks/useWindowWidth";
import { useDashBoard } from "../DashBoardContext/useDashBoard";

import { useBankAccounts } from "../../../../../app/hooks/useBankAccounts";

const useAccountsController = () => {
    const windowWidth = useWindowWidth();

    const { areValueVisible, openNewAccountModal, toggleValuesVisiblity } =
        useDashBoard();

    const [sliderState, setSliderState] = useState({
        isBeginning: true,
        isEnd: false,
    });

    const { accounts, isLoading } = useBankAccounts();

    const currentBalance = useMemo(() => {
        return accounts.reduce(
            (total, account) => total + account.currentBalance,
            0
        );
    }, [accounts]);

    return {
        currentBalance,
        areValueVisible,
        windowWidth,
        sliderState,
        isLoading,
        accounts,
        setSliderState,
        toggleValuesVisiblity,
        openNewAccountModal,
    };
};

export default useAccountsController;
