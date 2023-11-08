import { BankAccount } from "../../Entities/BankAccount";
import { sleep } from "../../utils/sleep";
import { httpClient } from "../httpClient";

type BankAccountResponse = Array<BankAccount>;

export async function getAll() {
    await sleep(500);
    const { data } = await httpClient.get<BankAccountResponse>(
        "/bank-accounts"
    );

    return data;
}
