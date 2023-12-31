import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { authService } from "../../../app/services/authService";

import { useMutation } from "@tanstack/react-query";
import { SignUpParams } from "../../../app/services/authService/signup";
import { useAuth } from "../../../app/hooks/useAuth";

import toast from "react-hot-toast";

const schema = z.object({
    name: z.string().nonempty("Nome é obrigatório"),
    email: z
        .string()
        .nonempty("E-mail é obrigatório")
        .email("Informe um Email valido"),
    password: z
        .string()
        .nonempty("Senha é obrigatória")
        .min(8, "A senha deve conter pelo menos 8 digitos"),
});

type FormData = z.infer<typeof schema>;

const useRegisterController = () => {
    const {
        register,
        handleSubmit: HookFormSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (data: SignUpParams) => {
            return authService.signup(data);
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

export default useRegisterController;
