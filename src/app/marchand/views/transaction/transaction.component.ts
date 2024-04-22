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


  filterByDate(date: string): void {
    // Implement your filter by date logic here
    // Assuming transactions have a timestamp property
    this.filteredTransactions = this.transactions.filter(transaction => {
      const transactionDate = new Date(transaction.timestamp);
      const inputDate = new Date(date);
      return transactionDate.toDateString() === inputDate.toDateString();
    });
  }

  filterByStatus(status: string): void {
    // Implement your filter by status logic here
    this.filteredTransactions = this.transactions.filter(transaction =>
      transaction.status.toLowerCase() === status.toLowerCase()
    );
  }

  onSearch(date: string, status: string): void {
    // Call both filter functions
    this.filterByDate(date);
    this.filterByStatus(status);
  }

  resetFilters(): void {
    // Reset filters to show all transactions
    this.filteredTransactions = this.transactions;
  }
}
