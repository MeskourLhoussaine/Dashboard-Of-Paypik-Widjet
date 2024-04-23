import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { Transaction } from '../../models/transaction.model';
import { PaymentMethod } from '../../models/payment-method.model';
import { PaymentMethodService } from '../../services/payment-method.service';

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


  constructor(private transactionService: TransactionService,
    private paymentMethodService:PaymentMethodService,
    
  ) {}

  ngOnInit(): void {
    // Initialize transactions data, if needed
    this.filteredTransactions = this.transactions;
    this.retrieveTransactions();
    this.loadPymentMethods();
  }
  retrieveTransactions(): void {
    this.transactionService.getAll().subscribe({
      next: (data: Transaction[]) => {
        this.transactions = data;
        this.filteredTransactions = [...data];
      },
      error: (error) => console.error(error)
    });
  }
//filtrer par date 

  
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
  
  this.filteredTransactions = this.transactions.filter(transaction =>
    transaction.paymentMethod.toLowerCase() === paymentMethod.toLowerCase()
  );
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

  //load methode payment 
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

}