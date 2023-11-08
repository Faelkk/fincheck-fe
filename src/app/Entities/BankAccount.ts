export interface BankAccount {
    id: string;
    currentBalance: number;
    name: string;
    initialBalance: number;
    color: string;
    type: "CHECKING" | "INVESTMENT" | "CASH";
}
