import { TransactionModel } from "../../Models/Transaction.model";
import { Globals } from "../GlobalServices/Globals";
import httpClient from "./httpClient";

export async function getAllTransactionsAsync(): Promise<TransactionModel[]> {
    const response = await httpClient.get<TransactionModel[]>(Globals.transactionsApiUrl);
    return response.data;
}

export async function getTransactionByIdAsync(_id:string): Promise<TransactionModel> {
    const response = await httpClient.get<TransactionModel>(Globals.transactionsApiUrl + _id);
    return response.data;
}

export async function createNewTransactionAsync(transaction: TransactionModel): Promise<TransactionModel> {
    const response = await httpClient.post<TransactionModel>(Globals.transactionsApiUrl, transaction);
    return response.data;
}

export async function updateTransactionAsync(transaction: TransactionModel): Promise<TransactionModel> {
    const response = await httpClient.put<TransactionModel>(Globals.transactionsApiUrl + transaction._id, transaction);
    return response.data;
}

export async function deleteTransactionByIdAsync(_id:string): Promise<void> {
    await httpClient.delete<TransactionModel>(Globals.transactionsApiUrl + _id);
}