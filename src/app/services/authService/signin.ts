import { httpClient } from "../httpClient";

export interface SignInParams {
    email: string;
    password: string;
}

interface SigninResponse {
    acessToken: string;
}

export async function signin(params: SignInParams) {
    const { data } = await httpClient.post<SigninResponse>(
        "/auth/signin",
        params
    );

    return data;
}
