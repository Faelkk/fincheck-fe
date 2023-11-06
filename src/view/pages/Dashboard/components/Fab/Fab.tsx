import { PlusIcon } from "@radix-ui/react-icons";
import {
    DropdownContent,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
} from "../../../../components/DropdownMenu";
import { Expense } from "../../../../components/icons/categories/expense/Expense";
import { Income } from "../../../../components/icons/categories/income/Income";
import { BankAccountIcon } from "../../../../components/icons/BankAccountIcon";
import { useDashBoard } from "../DashBoardContext/useDashBoard";

const Fab = () => {
    const { openNewAccountModal, openNewTransactionModal } = useDashBoard();

    return (
        <div className="fixed right-4 bottom-4">
            <DropdownMenu>
                <DropdownTrigger>
                    {" "}
                    <button className=" bg-teal-900 w-12 h-12 rounded-full flex justify-center items-center text-white">
                        <PlusIcon className="w-6 h-6" />
                    </button>
                </DropdownTrigger>

                <DropdownContent>
                    <DropdownItem
                        clasName="gap-2"
                        onSelect={() => openNewTransactionModal("EXPENSE")}
                    >
                        <Expense />
                        Nova despesa
                    </DropdownItem>
                    <DropdownItem
                        clasName="gap-2"
                        onSelect={() => openNewTransactionModal("INCOME")}
                    >
                        <Income />
                        Nova receita
                    </DropdownItem>
                    <DropdownItem
                        clasName="gap-2"
                        onSelect={openNewAccountModal}
                    >
                        <BankAccountIcon />
                        Nova conta
                    </DropdownItem>
                </DropdownContent>
            </DropdownMenu>
        </div>
    );
};

export default Fab;
