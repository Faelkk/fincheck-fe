import { Controller } from "react-hook-form";
import DatePickerInput from "../../../../components/DatePickerInput";
import Input from "../../../../components/Input";
import InputCurrency from "../../../../components/InputCurrency";
import Modal from "../../../../components/Modal";
import Select from "../../../../components/Select";
import useNewTransactionController from "./useNewTransactionModal";
import Button from "../../../../components/Button";

const NewTransactionModal = () => {
    const {
        isLoading,
        categories,
        accounts,
        newTransactionType,
        isNewTransactionModalOpen,
        control,
        errors,
        handleSubmit,
        register,
        closeNewTransactionModal,
    } = useNewTransactionController();

    const isExpense = newTransactionType === "EXPENSE";

    return (
        <Modal
            title={isExpense ? "Nova despesa" : "Nova receita"}
            open={isNewTransactionModalOpen}
            onClose={closeNewTransactionModal}
        >
            <form onSubmit={handleSubmit}>
                <div className="">
                    <div className="flex items-center gap-2">
                        <span className="text-gray-600 tracking-[-0.5px] text-xs">
                            Valor {isExpense ? "da Receita" : "da Despesa"}
                        </span>
                        <span className="text-gray-600 tracking-[-0.5px] text-lg">
                            R$
                        </span>
                        <Controller
                            name="value"
                            control={control}
                            defaultValue="0"
                            render={({ field: { onChange, value } }) => (
                                <InputCurrency
                                    error={errors.value?.message}
                                    onChange={onChange}
                                    value={value}
                                />
                            )}
                        />
                    </div>
                </div>

                <div className="mt-10 flex flex-col gap-4">
                    <Input
                        type="text"
                        placeholder={`Nome ${
                            isExpense ? "da Receita" : "da Despesa"
                        }`}
                        error={errors.name?.message}
                        {...register("name")}
                    />

                    <Controller
                        control={control}
                        defaultValue=""
                        name="categoryId"
                        render={({ field: { onChange, value } }) => (
                            <Select
                                onChange={onChange}
                                value={value}
                                placeholder="Categoria"
                                error={errors.categoryId?.message}
                                options={categories.map((category) => ({
                                    value: category.id,
                                    label: category.name,
                                }))}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        defaultValue=""
                        name="bankAccountId"
                        render={({ field: { onChange, value } }) => (
                            <Select
                                value={value}
                                error={errors.bankAccountId?.message}
                                onChange={onChange}
                                placeholder={
                                    isExpense ? "Pagar com" : "Receber com"
                                }
                                options={accounts.map((account) => ({
                                    value: account.id,
                                    label: account.name,
                                }))}
                            />
                        )}
                    />

                    <Controller
                        name="date"
                        control={control}
                        defaultValue={new Date()}
                        render={({ field: { onChange, value } }) => (
                            <DatePickerInput
                                onChange={onChange}
                                error={errors.date?.message}
                                value={value}
                            />
                        )}
                    />
                </div>

                <Button
                    type="submit"
                    className="w-full mt-6"
                    isLoading={isLoading}
                >
                    Criar
                </Button>
            </form>
        </Modal>
    );
};

export default NewTransactionModal;
