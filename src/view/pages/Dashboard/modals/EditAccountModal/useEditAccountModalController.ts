import { z } from "zod";
import { useDashBoard } from "../../components/DashBoardContext/useDashBoard";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bankAccountService } from "../../../../../app/services/bankAccountsService";
import { currencyStringToNumber } from "../../../../../app/utils/currencyStringToNumber";
import toast from "react-hot-toast";

const schema = z.object({
    initialBalance: z.string().nonempty("Saldo Inicial é obrigatório"),
    name: z.string().nonempty("Nome da conta é obrigatório"),
    type: z.enum(["CHECKING", "INVESTMENT", "CASH"]),
    color: z.string().nonempty("Cor é obrigatória"),
});

type FormData = z.infer<typeof schema>;

type ExtendedFormData = FormData & {
    initialBalance: number;
};

const useEditAccountModalController = () => {
    const { isEditAccountModalOpen, closeEditAccountModal } = useDashBoard();

    const {
        register,
        handleSubmit: hookFormSubmit,
        formState: { errors },
        control,
        reset,
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const queryClient = useQueryClient();
    const { isPending, mutateAsync } = useMutation<
        FormData,
        unknown,
        ExtendedFormData
    >({
        mutationFn: async (data) => {
            return bankAccountService.create(data);
        },
    });

    const handleSubmit = hookFormSubmit(async (data) => {
        try {
            const accountsData = {
                ...data,
                initialBalance: currencyStringToNumber(data.initialBalance),
            };

            await mutateAsync(accountsData as ExtendedFormData);

            queryClient.invalidateQueries({ queryKey: ["bankAccounts"] });
            toast.success("Conta foi cadastrada com sucesso!");
            closeEditAccountModal();
            reset();
        } catch {
            toast.error("Erro ao cadastrar a conta!");
        }
    });

    return {
        isEditAccountModalOpen,
        errors,
        control,
        isPending,
        closeEditAccountModal,
        register,
        handleSubmit,
    };
};

export default useEditAccountModalController;
