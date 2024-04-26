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
  merchantId!: number;
  transactionId!: number;
  itemsPerPage: number = 4;
  currentPage: number = 1;
  pagedTransactions: any[] = [];
  pages: number[] = [];
  totalPages: number = 0;
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
    this.route.params.subscribe(params => {
      this.merchantId = +params['id'];
      this.transactionId = +params['transaId'];
      this.retrieveTransactions();
      this.loadPymentMethods();
    });
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

  // Filter transactions by date
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

  // Filter transactions by status
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

  // Filter transactions by client name
  filterByClientName(name: string): void {
    this.filteredTransactions = this.transactions.filter(transaction =>
      transaction.clientName.toLowerCase().includes(name.toLowerCase())
    );
    this.calculatePages();
    this.setPage(1);
  }

  // Filter transactions by payment method
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

  // Apply all active filters
  applyFilters(): void {
    let filteredTransactions = [...this.transactions];
    const date = this.dateInput.nativeElement.value;
    if (date) {
      filteredTransactions = filteredTransactions.filter(transaction => {
        const transactionDate = new Date(transaction.timestamp);
        const inputDate = new Date(date);
        return transactionDate.toDateString() === inputDate.toDateString();
      });
      this.dateInput.nativeElement.value = '';
    }
    const status = this.statusInput.nativeElement.value;
    if (status) {
      filteredTransactions = filteredTransactions.filter(transaction =>
        transaction.status.toLowerCase() === status.toLowerCase()
      );
      this.statusInput.nativeElement.value = '';
    }
    const clientName = this.clientNameInput.nativeElement.value;
    if (clientName) {
      filteredTransactions = filteredTransactions.filter(transaction =>
        transaction.clientName.toLowerCase().includes(clientName.toLowerCase())
      );
      this.clientNameInput.nativeElement.value = '';
    }
    const paymentMethod = this.paymentMethodInput.nativeElement.value;
    if (paymentMethod) {
      this.transactionService.getTransactionsByPaymentMethodName(paymentMethod).subscribe({
        next: (data: Transaction[]) => {
          filteredTransactions = data;
          this.filteredTransactions = filteredTransactions;
          this.calculatePages();
          this.setPage(1);
        },
        error: (error) => console.error(error)
      });
      this.paymentMethodInput.nativeElement.selectedIndex = 0;
      return;
    }
    this.filteredTransactions = filteredTransactions;
    this.calculatePages();
    this.setPage(1);
  }

  // Reset all filters to default
  resetFilters(): void {
    this.filteredTransactions = this.transactions;
    this.calculatePages();
    this.setPage(1);
    this.dateInput.nativeElement.value = '';
    this.statusInput.nativeElement.value = '';
    this.clientNameInput.nativeElement.value = '';
    this.paymentMethodInput.nativeElement.selectedIndex = 0;
  }

  // Load all payment methods
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

  // Get status styles for rendering
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

  // Get status badge styles for rendering
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

  // Get status icon styles for rendering
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

  // Calculate total number of pages
  calculatePages(): void {
    this.totalPages = Math.ceil(this.filteredTransactions.length / this.itemsPerPage);
    this.pages = Array(this.totalPages).fill(0).map((_, i) => i + 1);
  }

  // Handle page change event
  onPageChange(page: number): void {
    this.setPage(page);
  }

  // Set current page and update paged transactions
  setPage(page: number): void {
    this.currentPage = page;
    const startIndex = (page - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage, this.filteredTransactions.length);
    this.pagedTransactions = this.filteredTransactions.slice(startIndex, endIndex);
  }

  // Navigate to specific page
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.setPage(page);
    }
  }

  // Navigate to previous page
  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.goToPage(this.currentPage - 1);
    }
  }

  // Navigate to next page
  goToNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.goToPage(this.currentPage + 1);
    }
  }

  // Paginate transactions based on current page
  paginateTransactions(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage, this.filteredTransactions.length);
    this.pagedTransactions = this.filteredTransactions.slice(startIndex, endIndex);
  }

  // Calculate the number of transactions for the current merchant
  calculateMerchantTransactions(): number {
    return this.filteredTransactions.filter(transaction => transaction.merchantId === this.merchantId).length;
  }

  //////////// Scroll to section //////////////

  @ViewChild('detailedDescription') detailedDescription!: ElementRef;

  scrollToSection() {
    if (this.detailedDescription && this.detailedDescription.nativeElement) {
      this.detailedDescription.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
