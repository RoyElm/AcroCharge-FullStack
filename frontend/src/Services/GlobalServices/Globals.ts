export class Globals {
    public static customersApiUrl: string;
    public static transactionsApiUrl: string;
    public static baseApiUrl: string;



    public static url() {
        if (process.env.NODE_ENV === "production") {
            Globals.customersApiUrl = "";
            Globals.transactionsApiUrl = "";
            Globals.baseApiUrl = "";
        } else {
            Globals.baseApiUrl = "http://localhost:3001/api/";
            Globals.customersApiUrl = "customer/";
            Globals.transactionsApiUrl = "transaction/";
        }
    }
}

Globals.url();