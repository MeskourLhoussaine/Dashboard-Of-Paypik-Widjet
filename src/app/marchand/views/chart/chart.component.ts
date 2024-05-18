import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { Transaction } from '../../models/transaction.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css'
})
export class ChartComponent implements OnInit{

  merchantId!: number;
  transactions: Transaction[] = [];
  ngOnInit(): void {
  

    this.route.params.subscribe((params) => {
      this.merchantId = params['id'];
      this.retrieveTransactions();
    }); 

  }
  

 retrieveTransactions(): void {

    this.transactionService.getTransactionsByMerchantId(this.merchantId).subscribe({
      next: (data: Transaction[]) => {
        this.transactions = data;
        console.log("data",data)
        this.processTransactions( this.transactions);
      },
      error: (error) => console.error(error)
    });
  }

  chartData: number[] = [0,0,0,300];
  labels: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep','Nov','Des'];

  tooltipContent: string = '';
  tooltipOpen: boolean = false;
  tooltipX: number = 0;
  tooltipY: number = 0;

  constructor(private transactionService: TransactionService,
    private route: ActivatedRoute,
  ) { }
  processTransactions(transactions: Transaction[]): void {
    const monthlyData = new Array(13).fill(0);
  
    transactions.forEach(transaction => {
      if (transaction.timestamp) {
        const date = new Date(transaction.timestamp);
        const month = date.getMonth()+1;
        console.log(`Transaction Timestamp: ${transaction.timestamp}, Parsed Date: ${date}, Month: ${month}`);
        if (!isNaN(month)) { // Vérifiez si month est un nombre valide hh
          monthlyData[month]++;
        
        }
      }
    });
  
    this.chartData= [300,45,50,32,60,54,19,34,89,200,93];
    console.log("Monthly Data: ", monthlyData);
  }
  
  showTooltip(e: MouseEvent) {
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


}
