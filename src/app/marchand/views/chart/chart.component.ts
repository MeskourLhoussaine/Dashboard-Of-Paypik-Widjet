import { Component, Input, OnInit } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { Transaction } from '../../models/transaction.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'], // Correction du nom de la propriété
})
export class ChartComponent implements OnInit {
  @Input() merchantId!: number; // Define input property to receive merchantId

  chartData: number[] = [];
  labels: string[] = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  tooltipContent: string = '';
  tooltipOpen: boolean = false;
  tooltipX: number = 0;
  tooltipY: number = 0;

  transactions: Transaction[] = [];
  maxBarHeight: number = 200; // Change this value as needed
  scaleFactor: number = 1;

  constructor(private transactionService: TransactionService, private route: ActivatedRoute,) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.merchantId = +params['id'];
    console.log(`Merchant ID: ${this.merchantId}`);
     // Log merchantId to the console
    this.retrieveTransactions();
  });
  }

  showTooltip(e: MouseEvent) {
    console.log(e);
    this.tooltipContent = (e.target as HTMLElement).textContent || '';
    this.tooltipX = (e.target as HTMLElement).offsetLeft - (e.target as HTMLElement).clientWidth;
    this.tooltipY = (e.target as HTMLElement).clientHeight + (e.target as HTMLElement).clientWidth;
    this.tooltipOpen = true;
  }

  hideTooltip() {
    this.tooltipContent = '';
    this.tooltipOpen = false;
    this.tooltipX = 0;
    this.tooltipY = 0;
  }

  retrieveTransactions(): void {
    this.transactionService.getTransactionsByMerchantId(this.merchantId).subscribe({
      next: (data: Transaction[]) => {
        this.transactions = data;
        this.calculateChartData();
      },
      error: (error) => console.error(error),
    });
  }

  calculateChartData(): void {
    this.chartData = Array(12).fill(0);

    // Loop through transactions and increment the count for the respective month
    this.transactions.forEach((transaction) => {
      const month = new Date(transaction.timestamp).getMonth();
      this.chartData[month]++;
    });

    // Find the maximum value in the chart data
    const max = Math.max(...this.chartData);

    // Calculate the scaling factor
    this.scaleFactor = max > 0 ? this.maxBarHeight / max : 12;
  }
}
