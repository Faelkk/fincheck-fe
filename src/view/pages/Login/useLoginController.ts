import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { authService } from "../../../app/services/authService";
import { SignInParams } from "../../../app/services/authService/signin";

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

    const handleSubmit = HookFormSubmit(async (data) => {
        try {
            const { acessToken } = await mutateAsync(data);
            toast.success("Deu tudo certo");
            console.log({ acessToken });
        } catch {
            toast.error("Ocorreu um erro ao criar a conta");
        }
    });

    return { errors, isPending, handleSubmit, register };
};

export default useLoginController;
