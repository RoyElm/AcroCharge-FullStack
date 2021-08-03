import { CustomerModel } from './Customer.model';

export class TransactionModel {
    public _id: string;
    public total_price: string;
    public currency: string;
    public credit_card_type: string;
    public credit_card_number: string;
    public customer_id:string;
    public customer: CustomerModel;
}

