import { httpClient } from "../httpClient";

export interface SignUpParams {
    name: string;
    email: string;
    password: string;
}

interface SignUpResponse {
    acessToken: string;
}

export async function signup(params: SignUpParams) {
    const { data } = await httpClient.post<SignUpResponse>(
        "/auth/signup",
        params
    );

    return data;
}
