import { useMemo, useState } from "react";
import { useWindowWidth } from "../../../../../app/hooks/useWindowWidth";
import { useDashBoard } from "../DashBoardContext/useDashBoard";
import { useQuery } from "@tanstack/react-query";
import { bankAccountService } from "../../../../../app/services/bankAccountsService";

const useAccountsController = () => {
    const windowWidth = useWindowWidth();

    const { areValueVisible, openNewAccountModal, toggleValuesVisiblity } =
        useDashBoard();

    const [sliderState, setSliderState] = useState({
        isBeginning: true,
        isEnd: false,
    });

    const { data = [], isFetching } = useQuery({
        queryKey: ["bankAccounts"],
        queryFn: bankAccountService.getAll,
    });

    const currentBalance = useMemo(() => {
        if (!data) return 0;

        return data.reduce(
            (total, account) => total + account.currentBalance,
            0
        );
    }, [data]);

    return {
        currentBalance,
        areValueVisible,
        windowWidth,
        sliderState,
        isLoading: isFetching,
        accounts: data,
        setSliderState,
        toggleValuesVisiblity,
        openNewAccountModal,
    };
};

export default useAccountsController;
