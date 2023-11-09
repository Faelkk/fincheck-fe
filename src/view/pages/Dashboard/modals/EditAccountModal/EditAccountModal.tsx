import { Controller } from "react-hook-form";
import Button from "../../../../components/Button";
import ColorDropdownInput from "../../../../components/ColorDropdownInput";
import Input from "../../../../components/Input";
import InputCurrency from "../../../../components/InputCurrency";
import Modal from "../../../../components/Modal";
import Select from "../../../../components/Select";
import useEditAccountModalController from "./useEditAccountModalController";
import { TrashIcon } from "../../../../components/icons/TrashIcon";
import ConfirmDeleteModal from "../../../../components/ConfirmDeleteModal";

const EditAccountModal = () => {
    const {
        isDeleteModalOpen,
        isEditAccountModalOpen,
        errors,
        control,
        isLoading,
        isLoadingDelete,
        closeEditAccountModal,
        register,
        handleSubmit,
        handleCloseDeleteModal,
        handleOpenDeleteModal,
        handleDeleteAccount,
    } = useEditAccountModalController();

    if (isDeleteModalOpen) {
        return (
            <ConfirmDeleteModal
                isLoading={isLoadingDelete}
                onConfirm={handleDeleteAccount}
                title="Tem certeza que deseja excluir essa conta?"
                onClose={handleCloseDeleteModal}
                description=" Ao excluir a conta, tambem serão excluidos todos os
                registros de receitas e despesas relacionados"
            />
        );
    }

    return (
        <Modal
            title="Editar conta"
            open={isEditAccountModalOpen}
            onClose={closeEditAccountModal}
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
                            Saldo inicial
                        </span>
                        <span className="text-gray-600 tracking-[-0.5px] text-lg">
                            R$
                        </span>
                        <Controller
                            name="initialBalance"
                            control={control}
                            defaultValue="0"
                            render={({ field: { onChange, value } }) => (
                                <InputCurrency
                                    onChange={onChange}
                                    error={errors.initialBalance?.message}
                                    value={value}
                                />
                            )}
                        />
                    </div>
                </div>

                <div className="mt-10 flex flex-col gap-4">
                    <Input
                        type="text"
                        placeholder="Nome da Conta"
                        error={errors.name?.message}
                        {...register("name")}
                    />

                    <Controller
                        control={control}
                        name="type"
                        defaultValue="CHECKING"
                        render={({ field: { onChange, value } }) => (
                            <Select
                                placeholder="Tipo"
                                onChange={onChange}
                                value={value}
                                error={errors.type?.message}
                                options={[
                                    {
                                        value: "INVESTMENT",
                                        label: "Investimentos",
                                    },
                                    {
                                        value: "CHECKING",
                                        label: "Conta corrente",
                                    },
                                    {
                                        value: "CASH",
                                        label: "Dinheiro fisico",
                                    },
                                ]}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="color"
                        defaultValue=""
                        render={({ field: { onChange, value } }) => (
                            <ColorDropdownInput
                                error={errors.color?.message}
                                onChange={onChange}
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

export default EditAccountModal;
