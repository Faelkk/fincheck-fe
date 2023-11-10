import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import Modal from "../../../../../components/Modal";
import Button from "../../../../../components/Button";
import { cn } from "../../../../../../app/utils/cn";
import { useFiltersModalController } from "./useFiltersModaControllerl";

interface FiltersModalProps {
    open: boolean;
    onCLose: () => void;
    onApplyFilters: (filters: {
        bankAccountId: string | undefined;
        year: number;
    }) => void;
}

const FiltersModal = ({ open, onCLose, onApplyFilters }: FiltersModalProps) => {
    const {
        accounts,
        selectedBankAccountId,
        selectedYear,
        handleSelectedBankAccout,
        handleChangeYear,
    } = useFiltersModalController();

    return (
        <Modal open={open} onClose={onCLose} title="Filtros">
            <span className="text-lg tracking-[-1px] font-bold text-gray-800">
                Conta
            </span>
            <div className="space-y-2 mt-2">
                {accounts.map((account) => (
                    <button
                        key={account.id}
                        onClick={() => handleSelectedBankAccout(account.id)}
                        className={cn(
                            "p-2 rounded-2xl w-full text-left  text-gray-800 hover:bg-gray-50 transitions-colors",
                            account.id === selectedBankAccountId &&
                                "!bg-gray-200"
                        )}
                    >
                        {account.name}
                    </button>
                ))}
            </div>

            <div className="mt-10">
                <span className="text-lg tracking-[-1px] font-bold text-gray-800">
                    Ano
                </span>
                <div className="2 mt-2 w-52 text-gray-800 flex items-center justify-between">
                    <button className="w-12 h-12 flex items-center justify-center">
                        <ChevronLeftIcon
                            className="w-6 h-6"
                            onClick={() => handleChangeYear(-1)}
                        />
                    </button>

                    <div className="flex-1 text-center">
                        <span className="text-sm font-medium tracking-[-0.5px]">
                            {selectedYear}
                        </span>
                    </div>

                    <button className="w-12 h-12 flex items-center justify-center">
                        <ChevronRightIcon
                            className="w-6 h-6"
                            onClick={() => handleChangeYear(+1)}
                        />
                    </button>
                </div>
            </div>

            <Button
                className="w-full mt-10"
                onClick={() =>
                    onApplyFilters({
                        bankAccountId: selectedBankAccountId,
                        year: selectedYear,
                    })
                }
            >
                {" "}
                Aplicar filtros
            </Button>
        </Modal>
    );
};

export default FiltersModal;
