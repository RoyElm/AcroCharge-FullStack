import { CustomerModel } from "../../Models/Customer.model";
import { Globals } from "../GlobalServices/Globals";
import httpClient from "./httpClient";

export async function getAllCustomersAsync(): Promise<CustomerModel[]> {
    const response = await httpClient.get<CustomerModel[]>(Globals.customersApiUrl);
    return response.data;
}

export async function createNewCustomerAsync(customer: CustomerModel): Promise<CustomerModel> {
    const response = await httpClient.post<CustomerModel>(Globals.customersApiUrl, customer);
    return response.data;
}

export async function getCustomerByIdAsync(_id:string): Promise<CustomerModel> {
    const response = await httpClient.get<CustomerModel>(Globals.customersApiUrl + _id);
    return response.data;
}

export async function updateCustomerAsync(customer: CustomerModel): Promise<CustomerModel> {
    const response = await httpClient.put<CustomerModel>(Globals.customersApiUrl + customer._id, customer);
    return response.data;
}

export async function deleteCustomerByIdAsync(_id: string): Promise<void> {
    await httpClient.delete<CustomerModel>(Globals.customersApiUrl + _id);
}