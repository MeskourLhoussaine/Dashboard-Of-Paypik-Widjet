import { Merchant } from './merchant.model';
import { Transaction } from './transaction.model';

export interface PaymentMethod {
  paymentMethodId?: any;
  name?: String;
  description?: String;
  iconUrl?: String;
  transactions: Transaction[];
  marchands: Merchant[];
}
