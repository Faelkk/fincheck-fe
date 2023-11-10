import { Controller } from "react-hook-form";
import DatePickerInput from "../../../../components/DatePickerInput";
import Input from "../../../../components/Input";
import InputCurrency from "../../../../components/InputCurrency";
import Modal from "../../../../components/Modal";
import Select from "../../../../components/Select";
import Button from "../../../../components/Button";
import { Transaction } from "../../../../../app/Entities/Transaction";
import ConfirmDeleteModal from "../../../../components/ConfirmDeleteModal";
import { TrashIcon } from "../../../../components/icons/TrashIcon";
import useEditTransactionModalController from "./useEditTransactionModalController";

interface EditNEditNewTransactionModal {
    transaction: Transaction | null;
    open: boolean;
    onClose: () => void;
}

const EditNewTransactionModal = ({
    transaction,
    open,
    onClose,
}: EditNEditNewTransactionModal) => {
    const {
        isDeleteModalOpen,
        isLoading,
        categories,
        accounts,
        control,
        errors,
        isLoadingDelete,
        handleSubmit,
        register,
        handleDeleteTransaction,
        handleCloseDeleteModal,
        handleOpenDeleteModal,
    } = useEditTransactionModalController(transaction, onClose);

    const isExpense = transaction?.type === "EXPENSE";

    if (isDeleteModalOpen) {
        return (
            <ConfirmDeleteModal
                isLoading={isLoadingDelete}
                onConfirm={handleDeleteTransaction}
                title={`Tem certeza que deseja excluir essa ${
                    isExpense ? "despesa" : "receita"
                }?`}
                onClose={handleCloseDeleteModal}
            />
        );
    }

    return (
        <Modal
            title={isExpense ? "Editar despesa" : "Editar receita"}
            open={open}
            onClose={onClose}
            rightAction={
                <button onClick={handleOpenDeleteModal}>
                    <TrashIcon className="text-red-900 w-6 h-6" />
                </button>
            }
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
                    Salvar
                </Button>
            </form>
        </Modal>
    );
};

export default EditNewTransactionModal;
