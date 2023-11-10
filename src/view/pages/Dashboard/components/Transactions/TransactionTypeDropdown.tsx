import { ChevronDownIcon } from "@radix-ui/react-icons";
import { DropdownMenu } from "../../../../components/DropdownMenu";
import { TransactionsIcon } from "../../../../components/icons/TransactionsIcon";
import { IncomeIcon } from "../../../../components/icons/IncomeIcon";
import { ExpensesIcon } from "../../../../components/icons/ExpensesIcon";

interface TransactionTypeDropdownProps {
    onSelect: (type: "INCOME" | "EXPENSE" | undefined) => void;
    selectedType: "INCOME" | "EXPENSE" | undefined;
}

const TransactionTypeDropdown = ({
    onSelect,
    selectedType,
}: TransactionTypeDropdownProps) => {
    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger>
                <button className="flex items-center gap-2 ">
                    {selectedType === "EXPENSE" && <ExpensesIcon />}
                    {selectedType === "INCOME" && <IncomeIcon />}
                    {selectedType === undefined && <TransactionsIcon />}

                    <span className="text-sm text-gray-800 tracking-[-0.5px]">
                        {selectedType === undefined && "Transações"}
                        {selectedType === "EXPENSE" && "Expense"}
                        {selectedType === "INCOME" && "Income"}
                    </span>
                    <ChevronDownIcon className="text-gray-900" />
                </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content className="w-[279px]">
                <DropdownMenu.Item
                    className="gap-2"
                    onSelect={() => onSelect("INCOME")}
                >
                    <IncomeIcon />
                    Receitas
                </DropdownMenu.Item>
                <DropdownMenu.Item
                    className="gap-2"
                    onSelect={() => onSelect("EXPENSE")}
                >
                    <ExpensesIcon />
                    Despesas
                </DropdownMenu.Item>
                <DropdownMenu.Item
                    className="gap-2"
                    onSelect={() => onSelect(undefined)}
                >
                    <TransactionsIcon />
                    Transações
                </DropdownMenu.Item>
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    );
};

export default TransactionTypeDropdown;
