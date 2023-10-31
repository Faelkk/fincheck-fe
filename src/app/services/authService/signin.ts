import { sleep } from "../../utils/sleep";
import { httpClient } from "../httpClient";

export interface SignInParams {
    email: string;
    password: string;
}

interface SigninResponse {
    acessToken: string;
}

export async function signin(params: SignInParams) {
    await sleep(500);
    const { data } = await httpClient.post<SigninResponse>(
        "/auth/signin",
        params
    );

    return data;
}
