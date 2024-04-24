import { formatDate } from '@angular/common';
import { Component, OnInit,ViewChild, ElementRef} from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { pageTransition } from 'src/app/shared/utils/animations';
import { TransactionService } from '../../services/transaction.service';
import { PaymentMethodService } from '../../services/payment-method.service';
import { ActivatedRoute } from '@angular/router';
import { Transaction } from '../../models/transaction.model';
Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [pageTransition]
})
export class DashboardComponent implements OnInit {
  totalTransactions: number = 0;
  transactions: Transaction[] = [];
  merchantId!:number ;
  constructor(
    private route: ActivatedRoute,
    private transactionService: TransactionService,
    private paymentMethodService: PaymentMethodService
  ) {}
  eventDate: any = formatDate(new Date(), 'MMM dd, yyyy', 'en');

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.merchantId = +params['id']; // '+' convertit la chaîne en nombre
      this.retrieveTransactions(); // Appel à retrieveTransactions après avoir obtenu l'ID
    });
    var myChart = new Chart("areaWiseSale", {
      type: 'doughnut',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
          ],
        }]
      },
      options: {
        scales: {
          x: {
            display: false
          },
          y: {
            display: false
          },
        },
        plugins: {
          legend: {
            position: 'right',
            align: 'center',
          },
        },
      },
    });
  }

    ////////////Scroll to section //////////////

    @ViewChild('detailedDescription') detailedDescription!: ElementRef;

    scrollToSection() {
      if (this.detailedDescription && this.detailedDescription.nativeElement) {
        this.detailedDescription.nativeElement.scrollIntoView({ behavior: 'smooth' });
      }
    }

    //###########logic calculat transaction
    retrieveTransactions(): void {
      this.transactionService.getTransactionsByMerchantId(this.merchantId).subscribe({
        next: (data: Transaction[]) => {
          this.transactions = data;
          // Appelez cette méthode pour calculer le nombre total de transactions
        },
        error: (error) => console.error(error)
        
      });
    }
  
    get calculateTotalTransactions() {
      return this.transactions.length;
    }
  
   
}
