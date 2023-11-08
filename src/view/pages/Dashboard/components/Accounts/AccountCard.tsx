import { cn } from "../../../../../app/utils/cn";
import { formatCurrency } from "../../../../../app/utils/formatCurrency";
import { BankAccountTypeIcon } from "../../../../components/icons/BankAccountTypeIcon";
import { useDashBoard } from "../DashBoardContext/useDashBoard";
import { BankAccount } from "../../../../../app/Entities/BankAccount";

interface AccountCardProps {
    data: BankAccount;
}

const AccountCard = ({ data }: AccountCardProps) => {
    const { color, name, currentBalance } = data;
    const { areValueVisible, openEditAccountModal } = useDashBoard();

    return (
        <div
            onClick={() => openEditAccountModal(data)}
            role="button"
            className="p-4 bg-white rounded-2xl h-[200px] flex flex-col justify-between  border-b-4 border-teal-950 border-"
            style={{ borderColor: color }}
        >
            <header>
                <BankAccountTypeIcon type="CASH" />
                <span className="text-gray-800 font-medium tracking-[0.5px] mt-4 block">
                    {name}
                </span>
            </header>

            <div>
                <span
                    className={cn(
                        "text-gray-800 font-medium tracking-[0.5px] mt-4 block",
                        !areValueVisible && "blur-sm"
                    )}
                >
                    {formatCurrency(currentBalance)}
                </span>
                <small className="text-gray-600 text-sm">Saldo atual</small>
            </div>
        </div>
    );
};

export default AccountCard;
