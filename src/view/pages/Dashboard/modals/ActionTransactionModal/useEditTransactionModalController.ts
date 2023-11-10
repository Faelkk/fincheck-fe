import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useBankAccounts } from "../../../../../app/hooks/useBankAccounts";
import { useCategories } from "../../../../../app/hooks/useCategories";
import { useMemo, useState } from "react";
import { Transaction } from "../../../../../app/Entities/Transaction";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { transactionsService } from "../../../../../app/services/TransactionService";
import toast from "react-hot-toast";
import { currencyStringToNumber } from "../../../../../app/utils/currencyStringToNumber";

const schema = z.object({
    value: z.union([
        z.string().nonempty("Saldo Inicial é obrigatório"),
        z.number(),
    ]),
    name: z.string().nonempty("Informe o nome da despesa"),
    categoryId: z.string().nonempty("Informe a categoria"),
    bankAccountId: z.string().nonempty("Informe a bank account"),
    date: z.date(),
});

type FormData = z.infer<typeof schema>;

type ExtendedFormData = FormData & {
    id: string;
    type: "INCOME" | "EXPENSE";
    value: number;
    date: string;
};

const useEditTransactionModalController = (
    transaction: Transaction | null,
    onClose: () => void
) => {
    const { accounts } = useBankAccounts();
    const { categories: CategoriesList } = useCategories();
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const {
        register,
        handleSubmit: hookFormSubmit,
        formState: { errors },
        control,
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            bankAccountId: transaction?.bankAccountId,
            categoryId: transaction?.categoryId,
            name: transaction?.name,
            value: transaction?.value,
            date: transaction ? new Date(transaction?.date) : new Date(),
        },
    });

    const queryClient = useQueryClient();
    const { isPending: isLoading, mutateAsync: updateTransaction } =
        useMutation<ExtendedFormData, unknown, ExtendedFormData>({
            mutationFn: async (data) => {
                return transactionsService.update(data);
            },
        });

    const { isPending: isLoadingDelete, mutateAsync: removeAccount } =
        useMutation<string, unknown, string, unknown>({
            mutationFn: (bankAccountId: string) => {
                return transactionsService.remove(bankAccountId);
            },
        });

    const handleSubmit = hookFormSubmit(async (data) => {
        try {
            const transactionsData = {
                ...data,
                id: transaction!.id,
                value: currencyStringToNumber(data.value),
                type: transaction!.type,
                date: data.date.toISOString(),
            };

            await updateTransaction(transactionsData as ExtendedFormData);

            queryClient.invalidateQueries({ queryKey: ["transactions"] });
            toast.success(
                transaction?.type === "EXPENSE"
                    ? "Despesa editada com sucesso"
                    : "Receita edtiada com sucesso"
            );
            onClose();
        } catch {
            toast.error(
                transaction?.type === "EXPENSE"
                    ? "Erro ao editar despesa "
                    : "Erro ao editar receita"
            );
        }
    });

    function handleCloseDeleteModal() {
        setIsDeleteModalOpen(false);
    }

    function handleOpenDeleteModal() {
        setIsDeleteModalOpen(true);
    }

    async function handleDeleteTransaction() {
        try {
            await removeAccount(transaction!.id);
            queryClient.invalidateQueries({ queryKey: ["transactions"] });
            queryClient.invalidateQueries({ queryKey: ["bankAccounts"] });
            toast.success(
                transaction?.type === "EXPENSE"
                    ? "Despesa foi deletada com sucesso"
                    : "Receita foi deletada com sucesso"
            );

            onClose();
        } catch {
            toast.error(
                transaction?.type === "EXPENSE"
                    ? "Erro ao deletar despesa"
                    : "Erro ao deletar receita"
            );
        }
    }

    const categories = useMemo(() => {
        return CategoriesList.filter(
            (category) => category.type === transaction?.type
        );
    }, [CategoriesList, transaction?.type]);

    return {
        isDeleteModalOpen,
        categories,
        accounts,
        errors,
        control,
        isLoading,
        isLoadingDelete,
        register,
        handleSubmit,
        handleCloseDeleteModal,
        handleDeleteTransaction,
        handleOpenDeleteModal,
    };
};

export default useEditTransactionModalController;
