import { sleep } from "../../utils/sleep";
import { httpClient } from "../httpClient";

interface MeResponse {
    name: string;
    email: string;
}

export async function me() {
    await sleep(500);
    const { data } = await httpClient.get<MeResponse>("/users/me");

    return data;
}
