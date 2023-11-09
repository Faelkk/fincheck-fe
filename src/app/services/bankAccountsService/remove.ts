import { sleep } from "../../utils/sleep";
import { httpClient } from "../httpClient";

export async function remove(bankAccountId: string) {
    await sleep(500);
    const { data } = await httpClient.delete(`/bank-accounts/${bankAccountId}`);
    return data;
}
