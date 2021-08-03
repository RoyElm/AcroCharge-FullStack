import { EGender } from "./interfaces/EGender";

export class CustomerModel {
    public _id: string;
    public first_name: string;
    public last_name: string;
    public email: string;
    public gender: EGender;
    public country: string;
    public city: string;
    public street: string;
    public phone: string;
}

