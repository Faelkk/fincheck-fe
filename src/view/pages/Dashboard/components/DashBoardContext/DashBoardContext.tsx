import { ReactNode, createContext, useCallback, useState } from "react";
import { BankAccount } from "../../../../../app/Entities/BankAccount";

interface DashBoardContextValue {
    newTransactionType: "INCOME" | "EXPENSE" | null;
    isNewTransactionModalOpen: boolean;
    areValueVisible: boolean;
    isNewAccountModalOpen: boolean;
    isEditAccountModalOpen: boolean;
    accountBeingEdited: BankAccount | null;
    openNewAccountModal: () => void;
    closeNewAccountModal: () => void;
    openNewTransactionModal: (type: "INCOME" | "EXPENSE") => void;
    closeNewTransactionModal: () => void;
    toggleValuesVisiblity: () => void;
    closeEditAccountModal: () => void;
    openEditAccountModal: (bankAccount: BankAccount) => void;
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
    const [isEditAccountModalOpen, setIsEditAccountModalOpen] = useState(false);
    const [accountBeingEdited, setIsAccountBeingEdited] =
        useState<BankAccount | null>(null);

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

    const openEditAccountModal = useCallback((bankAccount: BankAccount) => {
        setIsAccountBeingEdited(bankAccount);
        setIsEditAccountModalOpen(true);
    }, []);

    const closeEditAccountModal = useCallback(() => {
        setIsEditAccountModalOpen(false);
        setIsAccountBeingEdited(null);
    }, []);

    return (
        <DashBoardContext.Provider
            value={{
                isEditAccountModalOpen,
                accountBeingEdited,
                newTransactionType,
                isNewTransactionModalOpen,
                areValueVisible,
                isNewAccountModalOpen,
                toggleValuesVisiblity,
                openNewAccountModal,
                closeNewAccountModal,
                openNewTransactionModal,
                closeNewTransactionModal,
                closeEditAccountModal,
                openEditAccountModal,
            }}
        >
            {children}
        </DashBoardContext.Provider>
    );
}
