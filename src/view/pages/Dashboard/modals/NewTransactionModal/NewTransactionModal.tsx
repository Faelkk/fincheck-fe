import DatePickerInput from "../../../../components/DatePickerInput";
import Input from "../../../../components/Input";
import InputCurrency from "../../../../components/InputCurrency";
import Modal from "../../../../components/Modal";
import Select from "../../../../components/Select";
import useNewTransactionController from "./useNewTransactionModal";

const NewTransactionModal = () => {
    const {
        newTransactionType,
        isNewTransactionModalOpen,
        closeNewTransactionModal,
    } = useNewTransactionController();

    const isExpense = newTransactionType === "EXPENSE";

    return (
        <Modal
            title={isExpense ? "Nova despesa" : "Nova receita"}
            open={isNewTransactionModalOpen}
            onClose={closeNewTransactionModal}
        >
            <form>
                <div className="">
                    <div className="flex items-center gap-2">
                        <span className="text-gray-600 tracking-[-0.5px] text-xs">
                            Valor {isExpense ? "da Receita" : "da Despesa"}
                        </span>
                        <span className="text-gray-600 tracking-[-0.5px] text-lg">
                            R$
                        </span>
                        <InputCurrency />
                    </div>
                </div>

                <div className="mt-10 flex flex-col gap-4">
                    <Input
                        type="text"
                        name="name"
                        placeholder={`Nome ${
                            isExpense ? "da Receita" : "da Despesa"
                        }`}
                    />

                    <Select
                        placeholder="Categoria"
                        options={[
                            {
                                value: "INVESTMENT",
                                label: "Investimentos",
                            },
                            {
                                value: "Checking",
                                label: "Conta corrente",
                            },
                            {
                                value: "CASH",
                                label: "Dinheiro fisico",
                            },
                        ]}
                    />

                    <Select
                        placeholder={isExpense ? "Pagar com" : "Receber com"}
                        options={[
                            {
                                value: "INVESTMENT",
                                label: "Investimentos",
                            },
                            {
                                value: "Checking",
                                label: "Conta corrente",
                            },
                            {
                                value: "CASH",
                                label: "Dinheiro fisico",
                            },
                        ]}
                    />

                    <DatePickerInput />
                </div>
            </form>
        </Modal>
    );
};

export default NewTransactionModal;
