import { Transaction } from "../../Entities/Transaction";

import { httpClient } from "../httpClient";

type TransactionsResponse = Array<Transaction>;

export type typeTransactionsFilter = {
    month: number;
    year: number;
    bankAccountId?: string;
    type?: Transaction["type"];
};

export async function getAll(filters: typeTransactionsFilter) {
    const { data } = await httpClient.get<TransactionsResponse>(
        "/transactions",
        { params: filters }
    );

    return data;
}
