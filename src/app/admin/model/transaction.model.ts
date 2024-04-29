import { Merchant } from "./merchant.model";
import { PaymentMethod } from "./payment-method.model";


export interface Transaction {
    transactionId?: any;
    
    orderId?:string;
    amount?:string;
    currency?:string;
    status?:string;
    timestamp?:string;
    clientId?:string;
    clientName?:string;
    clientEmail?:string;
    hmac?:string;
    notif?:string;
    paymentMethode?:PaymentMethod;
    merchant?:Merchant;
    
}
