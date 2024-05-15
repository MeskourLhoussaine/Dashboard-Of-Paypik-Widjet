import { PaymentMethod } from "./paymentmethod.model";
import { Transaction } from "./transaction.model";

export interface Merchant{
    merchantId: number;
    merchantName: string;
    merchantDescrip: string;
    marchandPhone: string;
    merchantHost: string;
    marchandEmail: string;
    marchandStatus: string;
    merchantUrl: string;
    marchandFormejuridique: string;
    marchandRcIf: string;
    marchandSiegeAddresse: string;
    marchandDgName: string;
    marchandTypeActivite: string;
    marchandAnneeActivite: string;
    callback: string;
    serviceId: string;
    accessKey: string;
    secretKey: string;
    transactions?: Transaction[]; // Assuming Transaction is another Angular model/interface
    paymentMethods?: PaymentMethod[];
}
