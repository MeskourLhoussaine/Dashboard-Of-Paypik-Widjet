import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  transactions: any[] = [];
  paymentMethods: PaymentMethod[] | undefined;
  filteredTransactions: any[] = [];
  selectedPaymentMethod: string = '';
  merchantId: number = 4;
  /*les variables de pagination */
  itemsPerPage: number = 4;
  currentPage: number = 1;
  pagedTransactions: any[] = [];
  pages: number[] = [];
  totalPages: number = 0;
  /*pour vider les champs*/

  @ViewChild('dateInput') dateInput!: ElementRef;
  @ViewChild('statusInput') statusInput!: ElementRef;
  @ViewChild('clientNameInput') clientNameInput!: ElementRef;
  @ViewChild('paymentMethodInput') paymentMethodInput!: ElementRef;


  constructor(
    private route: ActivatedRoute,
    private transactionService: TransactionService,
    private paymentMethodService: PaymentMethodService
  ) {}

  ngOnInit(): void {
    this.retrieveTransactions();
    this.loadPymentMethods();
  }

  retrieveTransactions(): void {
    this.transactionService.getTransactionsByMerchantId(this.merchantId).subscribe({
      next: (data: Transaction[]) => {
        this.transactions = data;
        this.filteredTransactions = data;
        this.calculatePages();
        this.setPage(this.currentPage);
      },
      error: (error) => console.error(error)
    });
  }
                                 /*la fonction pour filtrer par date */
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
    this.calculatePages();
    this.setPage(1);
  }
                         /*la fonction pour filtrer par status */
  filterByStatus(status: string): void {
    if (!status) {
      this.filteredTransactions = [...this.transactions];
      return;
    }

    this.filteredTransactions = this.transactions.filter(transaction =>
      transaction.status.toLowerCase() === status.toLowerCase()
    );
    this.calculatePages();
    this.setPage(1);
  }
                          /*la fonction pour filtrer par clinet Name  */
  filterByClientName(name: string): void {
    this.filteredTransactions = this.transactions.filter(transaction =>
      transaction.clientName.toLowerCase().includes(name.toLowerCase())
    );
    this.calculatePages();
    this.setPage(1);
  }
                      /*la fonction pour filtrer par PaymentMethode */
  filterByPaymentMethod(paymentMethod: string): void {
    if (!paymentMethod) {
      this.filteredTransactions = [...this.transactions];
      return;
    }
              
    this.transactionService.getTransactionsByPaymentMethodName(paymentMethod).subscribe({
      next: (data: Transaction[]) => {
        this.filteredTransactions = data;
        this.calculatePages();
        this.setPage(1);
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

    // Après avoir appliqué les filtres, réinitialisez les valeurs des paramètres de recherche
    this.dateInput.nativeElement.value = '';
    this.statusInput.nativeElement.value = '';
    this.clientNameInput.nativeElement.value = '';
    this.paymentMethodInput.nativeElement.selectedIndex = 0;
}

  resetFilters(): void {
    this.filteredTransactions = this.transactions;
    this.calculatePages();
    this.setPage(1);
    this.dateInput.nativeElement.value = '';
    this.statusInput.nativeElement.value = '';
    this.clientNameInput.nativeElement.value = '';
    this.paymentMethodInput.nativeElement.selectedIndex = 0;
  }

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
        return { backgroundColor: 'rgba(46, 204, 113, 0.6)', };
      case 'pending':
        return { backgroundColor: 'rgba(241, 196, 15, 0.6)' };
      case 'cancelled':
        return { backgroundColor: 'rgba(231, 76, 60, 0.6)' };
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

  calculatePages(): void {
    this.totalPages = Math.ceil(this.filteredTransactions.length / this.itemsPerPage);
    this.pages = Array(this.totalPages).fill(0).map((_, i) => i + 1);
  }

  onPageChange(page: number): void {
    this.setPage(page);
  }
  setPage(page: number): void {
    this.currentPage = page;
    const startIndex = (page - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage, this.filteredTransactions.length);
    this.pagedTransactions = this.filteredTransactions.slice(startIndex, endIndex);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.setPage(page);
    }
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.goToPage(this.currentPage - 1);
    }
  }

  goToNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.goToPage(this.currentPage + 1);
    }
  }

  paginateTransactions(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage, this.filteredTransactions.length);
    this.pagedTransactions = this.filteredTransactions.slice(startIndex, endIndex);
  }
  calculateMerchantTransactions(): number {
    return this.filteredTransactions.filter(transaction => transaction.merchantId === this.merchantId).length;
  }
}