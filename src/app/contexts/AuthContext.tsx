import {
    ReactNode,
    createContext,
    useCallback,
    useEffect,
    useState,
} from "react";
import { localStorageKeys } from "../config/localStorageKeys";
import { useQuery } from "@tanstack/react-query";
import { usersService } from "../services/userService";
import toast from "react-hot-toast";
import LaunchScreen from "../../view/components/LaunchScreen";
import { User } from "../Entities/user";

interface AuthContextValue {
    signedIn: boolean;
    user: User | undefined;
    signin: (acessToken: string) => void;
    signout: () => void;
}

export const AuthContext = createContext({} as AuthContextValue);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [signedIn, setSignedIn] = useState<boolean>(() => {
        const storedAcessToken = localStorage.getItem(
            localStorageKeys.ACESS_TOKEN
        );

        return !!storedAcessToken;
    });

    const { isError, isFetching, isSuccess, data } = useQuery({
        queryKey: ["users", "me"],
        queryFn: () => usersService.me(),
        enabled: signedIn,
    });

    const signin = useCallback((acessToken: string) => {
        localStorage.setItem(localStorageKeys.ACESS_TOKEN, acessToken);

        setSignedIn(true);
    }, []);

    const signout = useCallback(() => {
        localStorage.removeItem(localStorageKeys.ACESS_TOKEN);

        setSignedIn(false);
    }, []);

    useEffect(() => {
        if (isError) {
            toast.error("Sua sessão expirou");
            signout();
        }
    }, [isError, signout]);

    return (
        <AuthContext.Provider
            value={{
                signedIn: isSuccess && signedIn,
                user: data,
                signin,
                signout,
            }}
        >
            <LaunchScreen isLoading={isFetching} />
            {!isFetching && children}
        </AuthContext.Provider>
    );
}
