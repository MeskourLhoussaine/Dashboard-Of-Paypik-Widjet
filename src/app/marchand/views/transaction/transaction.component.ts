import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { Transaction } from '../../models/transaction.model';
import { PaymentMethod } from '../../models/payment-method.model';
import { PaymentMethodService } from '../../services/payment-method.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  transactions: any[] = []; // Suppose you have some transactions data here
  paymentMethods: PaymentMethod[] | undefined;
  filteredTransactions: any[] = [];
  selectedPaymentMethod: string = '';
  merchantId: number = 5;


  constructor(  private route: ActivatedRoute,private transactionService: TransactionService,
    private paymentMethodService:PaymentMethodService, 
    
  ) {}

  ngOnInit(): void {
  //  this.route.paramMap.subscribe(params => {
     // this.merchantId = Number(params.get('merchantId'));
      this.retrieveTransactions();
      this.merchantId ;
     this.loadPymentMethods();
   // });
  }

  retrieveTransactions(): void {
    this.transactionService.getTransactionsByMerchantId(this.merchantId).subscribe({
      next: (data: Transaction[]) => {
        this.transactions = data;
        this.filteredTransactions = data;
      },
      error: (error) => console.error(error)
    });
  }

  
filterByDate(date: string): void {
  if (!date) {
    this.filteredTransactions = [...this.transactions];
    return;
  }
  
  const inputDate = new Date(date);
  this.filteredTransactions = this.transactions.filter(transaction => {
    const transactionDate = new Date(transaction.timestamp);
    return (
      transactionDate.getFullYear() === inputDate.getFullYear() &&
      transactionDate.getMonth() === inputDate.getMonth() &&
      transactionDate.getDate() === inputDate.getDate()
    );
  });
}

filterByStatus(status: string): void {
  if (!status) {
    this.filteredTransactions = [...this.transactions];
    return;
  }
  
  this.filteredTransactions = this.transactions.filter(transaction =>
    transaction.status.toLowerCase() === status.toLowerCase()
  );
}

//filtrer par name client 

filterByClientName(name: string): void {
  // Implement your filter by client name logic here
  this.filteredTransactions = this.transactions.filter(transaction =>
    transaction.clientName.toLowerCase().includes(name.toLowerCase())
  );
}
//filtrer par PaymentMethode 
filterByPaymentMethod(paymentMethod: string): void {
  if (!paymentMethod) {
    this.filteredTransactions = [...this.transactions];
    return;
  }
  
  this.transactionService.getTransactionsByPaymentMethodName(paymentMethod).subscribe({
    next: (data: Transaction[]) => {
      this.filteredTransactions = data;
    },
    error: (error) => console.error(error)
  });
}


onSearch(date: string, status: string, clientName: string, paymentMethod: string): void {
  this.filteredTransactions = [...this.transactions];

  if (date) {
    this.filterByDate(date);
  }

  if (status) {
    this.filterByStatus(status);
  }

  if (clientName) {
    this.filterByClientName(clientName);
  }

  if (paymentMethod) {
    this.filterByPaymentMethod(paymentMethod);
  }
  
}
  resetFilters(): void {
    // Reset filters to show all transactions
    this.filteredTransactions = this.transactions;
  }

  //##################load methode payment #################
  loadPymentMethods(): void {
    this.paymentMethodService.getAll().subscribe(
      (data) => {
        this.paymentMethods = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

//s########################status style###################### 
getStatusStyles(status: string): any {
  switch (status.toLowerCase()) {
    case 'completed':
      return { color: 'green' };
    case 'pending':
      return { color: 'yellow' };
    case 'cancelled':
      return { color: 'red' };
    default:
      return {};
  }
}

getStatusBadgeStyles(status: string): any {
  switch (status.toLowerCase()) {
    case 'completed':
      return { backgroundColor: 'rgba(46, 204, 113, 0.6)' }; // Green color with alpha
    case 'pending':
      return { backgroundColor: 'rgba(241, 196, 15, 0.6)' }; // Yellow color with alpha
    case 'cancelled':
      return { backgroundColor: 'rgba(231, 76, 60, 0.6)' }; // Red color with alpha
    default:
      return {};
  }
}

getStatusIconStyles(status: string): any {
  switch (status.toLowerCase()) {
    case 'completed':
      return { stroke: 'green' };
    case 'pending':
      return { stroke: 'yellow' };
    case 'cancelled':
      return { stroke: 'red' };
    default:
      return {};
  }
}
//#################################### End style ##########################################

/*----------------- nombre transaction par merchant --------------------*/

calculateMerchantTransactions(): number {
  return this.filteredTransactions.filter(transaction => transaction.merchantId === this.merchantId).length;
}
}