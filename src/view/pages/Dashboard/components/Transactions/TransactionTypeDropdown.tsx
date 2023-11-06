import { ChevronDownIcon } from "@radix-ui/react-icons";
import {
    DropdownContent,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
} from "../../../../components/DropdownMenu";
import { TransactionsIcon } from "../../../../components/icons/TransactionsIcon";
import { IncomeIcon } from "../../../../components/icons/IncomeIcon";
import { ExpensesIcon } from "../../../../components/icons/ExpensesIcon";

const TransactionTypeDropdown = () => {
    return (
        <DropdownMenu>
            <DropdownTrigger>
                <button className="flex items-center gap-2 ">
                    <TransactionsIcon />
                    <span className="text-sm text-gray-800 tracking-[-0.5px]">
                        Transações
                    </span>
                    <ChevronDownIcon className="text-gray-900" />
                </button>
            </DropdownTrigger>
            <DropdownContent className="w-[279px]">
                <DropdownItem clasName="gap-2">
                    <IncomeIcon />
                    Receitas
                </DropdownItem>
                <DropdownItem clasName="gap-2">
                    <ExpensesIcon />
                    Despesas
                </DropdownItem>
                <DropdownItem clasName="gap-2">
                    <TransactionsIcon />
                    Transações
                </DropdownItem>
            </DropdownContent>
        </DropdownMenu>
    );
};

export default TransactionTypeDropdown;
