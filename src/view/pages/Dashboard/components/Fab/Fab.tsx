import { PlusIcon } from "@radix-ui/react-icons";
import { DropdownMenu } from "../../../../components/DropdownMenu";
import { Expense } from "../../../../components/icons/categories/expense/Expense";
import { Income } from "../../../../components/icons/categories/income/Income";
import { BankAccountIcon } from "../../../../components/icons/BankAccountIcon";
import { useDashBoard } from "../DashBoardContext/useDashBoard";

const Fab = () => {
    const { openNewAccountModal, openNewTransactionModal } = useDashBoard();

    return (
        <div className="fixed right-4 bottom-4">
            <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                    {" "}
                    <button className=" bg-teal-900 w-12 h-12 rounded-full flex justify-center items-center text-white">
                        <PlusIcon className="w-6 h-6" />
                    </button>
                </DropdownMenu.Trigger>

                <DropdownMenu.Content>
                    <DropdownMenu.Item
                        className="gap-2"
                        onSelect={() => openNewTransactionModal("EXPENSE")}
                    >
                        <Expense />
                        Nova despesa
                    </DropdownMenu.Item>
                    <DropdownMenu.Item
                        className="gap-2"
                        onSelect={() => openNewTransactionModal("INCOME")}
                    >
                        <Income />
                        Nova receita
                    </DropdownMenu.Item>
                    <DropdownMenu.Item
                        className="gap-2"
                        onSelect={openNewAccountModal}
                    >
                        <BankAccountIcon />
                        Nova conta
                    </DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Root>
        </div>
    );
};

export default Fab;
