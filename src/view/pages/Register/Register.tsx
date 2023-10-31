import { Link } from "react-router-dom";
import Button from "../../components/Button";
import Input from "../../components/Input";
import useRegisterController from "./useRegisterController";

const Register = () => {
    const { errors, isPending, handleSubmit, register } =
        useRegisterController();

    return (
        <>
            <header className=" flex flex-col items-center gap-4 text-center">
                <h1 className="text-2xl font-bold text-gray-900 tracking-[-0.1px]">
                    Crie sua conta
                </h1>

                <p className="space-x-2 tracking-[-0.5px]">
                    <span className="text-gray-700">Já possui uma conta?</span>

                    <Link
                        to="/login"
                        className="tracking-[-0.5px] font-medium text-teal-900"
                    >
                        Fazer login
                    </Link>
                </p>
            </header>

            <form
                action=""
                className="mt-[60px] flex flex-col gap-4"
                onSubmit={handleSubmit}
            >
                <Input
                    placeholder="Nome"
                    error={errors.name?.message}
                    {...register("name")}
                />
                <Input
                    type="email"
                    placeholder="Email"
                    error={errors.email?.message}
                    {...register("email")}
                />
                <Input
                    type="password"
                    placeholder="Senha"
                    error={errors.password?.message}
                    {...register("password")}
                />

                <Button type="submit" className="mt-2" disabled={isPending}>
                    Criar conta
                </Button>
            </form>
        </>
    );
};

export default Register;
