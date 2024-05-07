import { Merchant } from "./merchant.model";
import { Transaction } from "./transaction.model";

export interface PaymentMethod {
    status?: boolean;
    paymentMethodId: number;
    name?:String;
    description?:String;
    iconUrl?:String;
    transactions: Transaction[];
    marchands: Merchant[];
    
}
