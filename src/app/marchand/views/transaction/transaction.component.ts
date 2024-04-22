import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Transaction } from '../../models/transaction.model';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  transactions: Transaction[] = [];
  filteredTransactions: Transaction[] = [];

  @ViewChild('dateInput') dateInput!: ElementRef;

  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
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

  refreshList(): void {
    this.retrieveTransactions();
  }

  filterByDate(date: string): void {
    const filtered = this.transactions.filter(transaction => {
      if (transaction.timestamp) {
        const transactionDate = new Date(transaction.timestamp);
        const selectedDate = new Date(date);
        return transactionDate.toDateString() === selectedDate.toDateString();
      }
      return false;
    });
    this.filteredTransactions = [...filtered];
  }

  resetFilters(): void {
    this.filteredTransactions = [...this.transactions];
  }
  
  onSearchByDate(): void {
    const selectedDate = this.dateInput.nativeElement.value;
    this.filterByDate(selectedDate);
  }
}
