import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { MerchantService } from '../../services/merchant.service';
import { TransactionService } from '../../services/transaction.service';
import { PaymentMethodService } from '../../services/payment-method.service';
import { ActivatedRoute } from '@angular/router';
import { Merchant } from '../../models/merchant.model';
import { Transaction } from '../../models/transaction.model';
import { PaymentMethod } from '../../models/payment-method.model';
import { pageTransition } from 'src/app/shared/utils/animations';

Chart.register(...registerables);

@Component({
  selector: 'app-more',
  templateUrl: './more.component.html',
  styleUrls: ['./more.component.css'],
  animations: [pageTransition],
})
export class MoreComponent implements OnInit {
  merchants: Merchant[] = [];
  transactions: Transaction[] = [];
  paymentMethods: PaymentMethod[] = [];
  merchantId!: number;
  transactionId!: number;

  constructor(
    private route: ActivatedRoute,
    private merchantService: MerchantService,
    private transactionService: TransactionService,
    private paymentMethodService: PaymentMethodService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.merchantId = +params['id'];
      this.transactionId = +params['transaId'];
      this.retrieveMerchantAndTransaction();
    });
  }

  // Retrieve both merchant and transaction details
  retrieveMerchantAndTransaction(): void {
    this.retrieveMerchantById();
    this.retrieveTransactionById();
  }

  // Retrieve merchant by ID
  retrieveMerchantById(): void {
    this.merchantService.getMerchantById(this.merchantId).subscribe({
      next: (data: Merchant) => {
        console.log('Données du marchand :', data);
        this.merchants.push(data);
      },
      error: (error) => console.error(error),
    });
  }

  // Retrieve transaction by ID
  retrieveTransactionById(): void {
    this.transactionService.getTransactionById(this.transactionId).subscribe({
      next: (data: Transaction) => {
        console.log('Données du Transaction :', data);
        this.transactions.push(data);
        this.retrievePaymentMethodById(data.paymentMethodId);
      },
      error: (error) => console.error(error),
    });
  }

  // Retrieve payment method by ID
  retrievePaymentMethodById(paymentMethodId: number): void {
    this.paymentMethodService.getPymentMethodeById(paymentMethodId).subscribe({
      next: (data: PaymentMethod) => {
        this.paymentMethods.push(data);
        console.log('Détails de la méthode de paiement :', data);
      },
      error: (error) => console.error(error),
    });
  }
}
