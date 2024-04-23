import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { Transaction } from '../../models/transaction.model';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  transactions: any[] = []; // Suppose you have some transactions data here
  filteredTransactions: any[] = [];

  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    // Initialize transactions data, if needed
    this.filteredTransactions = this.transactions;
    this.retrieveTransactions();
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


onSearch(date: string, status: string, clientName: string): void {
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
}
  resetFilters(): void {
    // Reset filters to show all transactions
    this.filteredTransactions = this.transactions;
  }
}