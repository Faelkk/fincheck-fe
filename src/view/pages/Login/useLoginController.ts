import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInParams } from "../../../app/services/authService/signin";

import { useMutation } from "@tanstack/react-query";
import { authService } from "../../../app/services/authService";
import { useAuth } from "../../../app/hooks/useAuth";
import { useForm } from "react-hook-form";

import toast from "react-hot-toast";

const schema = z.object({
    email: z
        .string()
        .nonempty("E-mail é obrigatorio")
        .email("Informe um Email valido"),
    password: z
        .string()
        .nonempty("Senha é obrigatoria")
        .min(8, "A senha deve conter pelo menos 8 digitos"),
});

type FormData = z.infer<typeof schema>;

const useLoginController = () => {
    const {
        register,
        handleSubmit: HookFormSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (data: SignInParams) => {
            return authService.signin(data);
        },
    });

    const { signin } = useAuth();

    const handleSubmit = HookFormSubmit(async (data) => {
        try {
            const { acessToken } = await mutateAsync(data);

            signin(acessToken);
        } catch {
            toast.error("Ocorreu um erro ao criar a conta");
        }
    });

    return { errors, isPending, handleSubmit, register };
};

export default useLoginController;
