export interface Transaction {
    id: string;
    categoryId: string;
    bankAccountId: string;
    name: string;
    type: "EXPENSE" | "INCOME";
    date: string;
    value: number;
    category: {
        id: string;
        name: string;
        icon: string;
    };
}
