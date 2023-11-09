export interface Transaction {
    id: string;
    name: string;
    type: "EXPENSE" | "INCOME";
    date: Date;
    value: number;
    bankAccountId: string;
    categoryId: string;
}
