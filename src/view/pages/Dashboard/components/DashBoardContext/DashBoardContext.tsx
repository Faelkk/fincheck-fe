import { ReactNode, createContext, useCallback, useState } from "react";

interface DashBoardContextValue {
    newTransactionType: "INCOME" | "EXPENSE" | null;
    isNewTransactionModalOpen: boolean;
    areValueVisible: boolean;
    isNewAccountModalOpen: boolean;
    openNewAccountModal: () => void;
    closeNewAccountModal: () => void;
    openNewTransactionModal: (type: "INCOME" | "EXPENSE") => void;
    closeNewTransactionModal: () => void;
    toggleValuesVisiblity: () => void;
}

export const DashBoardContext = createContext({} as DashBoardContextValue);

export function DashBoardProvider({ children }: { children: ReactNode }) {
    const [areValueVisible, setAreValueVisible] = useState(false);
    const [isNewAccountModalOpen, setIsNewAccountModalOpen] = useState(false);
    const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] =
        useState(false);
    const [newTransactionType, setNewTransactionType] = useState<
        "INCOME" | "EXPENSE" | null
    >(null);

    const toggleValuesVisiblity = useCallback(() => {
        setAreValueVisible((prevState) => !prevState);
    }, []);

    const openNewAccountModal = useCallback(() => {
        setIsNewAccountModalOpen(true);
    }, []);

    const closeNewAccountModal = useCallback(() => {
        setIsNewAccountModalOpen(false);
    }, []);

    const openNewTransactionModal = useCallback(
        (type: "INCOME" | "EXPENSE") => {
            setNewTransactionType(type);
            setIsNewTransactionModalOpen(true);
        },
        []
    );

    const closeNewTransactionModal = useCallback(() => {
        setIsNewTransactionModalOpen(false);
        setNewTransactionType(null);
    }, []);

    return (
        <DashBoardContext.Provider
            value={{
                newTransactionType,
                isNewTransactionModalOpen,
                areValueVisible,
                isNewAccountModalOpen,
                toggleValuesVisiblity,
                openNewAccountModal,
                closeNewAccountModal,
                openNewTransactionModal,
                closeNewTransactionModal,
            }}
        >
            {children}
        </DashBoardContext.Provider>
    );
}
