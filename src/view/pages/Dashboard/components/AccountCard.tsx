import { formatCurrency } from "../../../../app/utils/formatCurrency";
import { BankAccountTypeIcon } from "../../../components/icons/BankAccountTypeIcon";

interface AccountCardProps {
    color: string;
    name: string;
    balance: number;
    type: "CASH" | "INCOME" | "INVESTMENT";
}

const AccountCard = ({ balance, color, name }: AccountCardProps) => {
    return (
        <div
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
                <span className="text-gray-800 font-medium tracking-[0.5px] mt-4 block">
                    {formatCurrency(balance)}
                </span>
                <small className="text-gray-600 text-sm">Saldo atual</small>
            </div>
        </div>
    );
};

export default AccountCard;
