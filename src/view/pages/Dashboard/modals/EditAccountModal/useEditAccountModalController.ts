import { z } from "zod";
import { useDashBoard } from "../../components/DashBoardContext/useDashBoard";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bankAccountService } from "../../../../../app/services/bankAccountsService";
import { currencyStringToNumber } from "../../../../../app/utils/currencyStringToNumber";
import toast from "react-hot-toast";
import { useState } from "react";

const schema = z.object({
    initialBalance: z.union([
        z.string().nonempty("Saldo Inicial é obrigatório"),
        z.number(),
    ]),
    name: z.string().nonempty("Nome da conta é obrigatório"),
    type: z.enum(["CHECKING", "INVESTMENT", "CASH"]),
    color: z.string().nonempty("Cor é obrigatória"),
});

type FormData = z.infer<typeof schema>;

type ExtendedFormData = FormData & {
    initialBalance: number;
    id: string;
};

const useEditAccountModalController = () => {
    const {
        accountBeingEdited,
        isEditAccountModalOpen,
        closeEditAccountModal,
    } = useDashBoard();

    const {
        register,
        handleSubmit: hookFormSubmit,
        formState: { errors },
        control,
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            color: accountBeingEdited?.color,
            initialBalance: accountBeingEdited?.initialBalance,
            type: accountBeingEdited?.type,
            name: accountBeingEdited?.name,
        },
    });

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const queryClient = useQueryClient();
    const { isPending: isLoading, mutateAsync: updateAccount } = useMutation<
        FormData,
        unknown,
        ExtendedFormData
    >({
        mutationFn: async (data) => {
            return bankAccountService.update(data);
        },
    });

    const { isPending: isLoadingDelete, mutateAsync: removeAccount } =
        useMutation<string, unknown, string, unknown>({
            mutationFn: (bankAccountId: string) => {
                return bankAccountService.remove(bankAccountId);
            },
        });

    const handleSubmit = hookFormSubmit(async (data) => {
        try {
            const accountsData = {
                ...data,
                id: accountBeingEdited!.id,
                initialBalance: currencyStringToNumber(data.initialBalance),
            };

            await updateAccount(accountsData as ExtendedFormData);

            queryClient.invalidateQueries({ queryKey: ["bankAccounts"] });
            toast.success("Conta foi editada com sucesso!");
            closeEditAccountModal();
        } catch {
            toast.error("Erro ao salvar as alterações!");
        }
    });

    function handleOpenDeleteModal() {
        setIsDeleteModalOpen(true);
    }

    function handleCloseDeleteModal() {
        setIsDeleteModalOpen(false);
    }

    async function handleDeleteAccount() {
        try {
            await removeAccount(accountBeingEdited!.id);
            queryClient.invalidateQueries({ queryKey: ["bankAccounts"] });
            toast.success("Conta foi deletada com sucesso!");
            closeEditAccountModal();
        } catch {
            toast.error("Erro ao deletar a conta!");
        }
    }

    return {
        isDeleteModalOpen,
        isEditAccountModalOpen,
        errors,
        control,
        isLoading,
        isLoadingDelete,
        closeEditAccountModal,
        register,
        handleSubmit,
        handleOpenDeleteModal,
        handleCloseDeleteModal,
        handleDeleteAccount,
    };
};

export default useEditAccountModalController;
