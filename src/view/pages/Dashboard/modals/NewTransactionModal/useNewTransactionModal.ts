import { z } from "zod";
import { useDashBoard } from "../../components/DashBoardContext/useDashBoard";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useBankAccounts } from "../../../../../app/hooks/useBankAccounts";
import { useCategories } from "../../../../../app/hooks/useCategories";
import { useMemo } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { transactionsService } from "../../../../../app/services/TransactionService";
import toast from "react-hot-toast";
import { currencyStringToNumber } from "../../../../../app/utils/currencyStringToNumber";

const schema = z.object({
    value: z.string().nonempty("Informe o valor"),
    name: z.string().nonempty("Informe o nome da despesa"),
    categoryId: z.string().nonempty("Informe a categoria"),
    bankAccountId: z.string().nonempty("Informe a bank account"),
    date: z.date(),
});

type FormData = z.infer<typeof schema>;

type ExtendedFormData = {
    value: number;
    name: string;
    categoryId: string;
    bankAccountId: string;
    date: string;
    type: "INCOME" | "EXPENSE";
};

const useNewTransactionController = () => {
    const {
        isNewTransactionModalOpen,
        newTransactionType,
        closeNewTransactionModal,
    } = useDashBoard();

    const { accounts } = useBankAccounts();
    const { categories: CategoriesList } = useCategories();

    const queryClient = useQueryClient();
    const { isPending: isLoading, mutateAsync } = useMutation<
        ExtendedFormData,
        unknown,
        ExtendedFormData
    >({
        mutationFn: async (data) => {
            return transactionsService.create(data);
        },
    });

    const {
        register,
        handleSubmit: hookFormSubmit,
        formState: { errors },
        control,
        reset,
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const handleSubmit = hookFormSubmit(async (data) => {
        try {
            const transactionsData = {
                ...data,
                value: currencyStringToNumber(data.value),
                type: newTransactionType!,
                date: data.date.toISOString(),
            };

            await mutateAsync(transactionsData as ExtendedFormData);

            queryClient.invalidateQueries({ queryKey: ["transactions"] });
            toast.success(
                newTransactionType === "EXPENSE"
                    ? "Despesa cadastrada com sucesso"
                    : "Receita cadastrada com sucesso"
            );
            closeNewTransactionModal();
            reset();
        } catch {
            toast.error(
                newTransactionType === "EXPENSE"
                    ? "Erro ao cadastrar despesa "
                    : "Erro ao cadastrar receita"
            );
        }
    });

    const categories = useMemo(() => {
        return CategoriesList.filter(
            (category) => category.type === newTransactionType
        );
    }, [CategoriesList, newTransactionType]);

    return {
        categories,
        accounts,
        errors,
        control,
        newTransactionType,
        isNewTransactionModalOpen,
        isLoading,
        closeNewTransactionModal,
        register,
        handleSubmit,
    };
};

export default useNewTransactionController;
