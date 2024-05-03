import { Component ,OnInit,ViewChild, ElementRef } from '@angular/core';
import { formatDate } from '@angular/common';
import { Chart, registerables } from 'chart.js';
import { pageTransition } from 'src/app/shared/utils/animations';
import { ActivatedRoute } from '@angular/router';


import { Merchant } from '../../model/merchant.model';
import { MarchandService } from 'src/app/admin/services/marchand.service';
import { PaymentMethod } from 'src/app/admin/model/payment-method.model';
import { MethodService } from '../../services/method.service';



Chart.register(...registerables);

@Component({
  selector: 'app-more',
  templateUrl: './more.component.html',
  styleUrl: './more.component.css',
  animations: [pageTransition]
})
export class MoreComponent implements OnInit{
merchantId!:number;
merchants: Merchant[] = [];
//transactions: Transaction[] = [];
paymentMethods: PaymentMethod[] = [];
methods: PaymentMethod[] = [];
// Déclaration d'un ensemble pour stocker les numéros de méthode uniques
 methodNumbers: number[] = [];
 status: boolean | undefined;
 paymentMethodId!: number;

  constructor(
    private route: ActivatedRoute,
    private merchantService: MarchandService,
    private methodService:MethodService,
 
  ) {}
  eventDate: any = formatDate(new Date(), 'MMM dd, yyyy', 'en');

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.merchantId = +params['merchantId'];
      this.paymentMethodId = +params['paymentMethodId'];
    Chart.register(...registerables); // Enregistrez les éléments Chart.js nécessaires

    this.createChart();
    this.retrieveMerchantById();
    this.getMethodsUsingByMarchand();
   
    
  });
  }
//find marchand by id 
retrieveMerchantById(): void {
  this.merchantService.getMerchantById(this.merchantId).subscribe({
    next: (data: any) => { // Utilisation de 'any' temporairement pour résoudre le problème de type
     console.log('Merchant data:', data);
      this.merchants.push(data as Merchant); // Cast 'data' en tant que Merchant
     
    },
    error: (error) => console.error(error),
  });

}


findStatusForMethod(method: PaymentMethod): void {
  this.merchantService.findStatusMerchantPayment(this.merchantId, method.paymentMethodId)
    .subscribe(status => {
      method.status = status; // Assigner le statut à la méthode
      console.log('Method:', method.name, 'status:', status);
    });
}


getMethodsUsingByMarchand(): void {
  this.merchantService.getMarchandPaymentMethod(this.merchantId).subscribe({
    next: (data: any[]) => {
      for (let i = 0; i < data.length; i++) {
        const methodData = data[i];
        const method: PaymentMethod = {
          paymentMethodId: methodData.paymentMethodId,
          name: methodData.methodName,
          description: methodData.methodDescription,
          iconUrl: methodData.methodIconUrl
        };
        this.methods.push(method); // Ajoute la méthode à la liste des méthodes
        this.methodNumbers.push(method.paymentMethodId); 
        this.findStatusForMethod(method);// Ajoute le paymentMethodId à la liste des identifiants de méthode
      }
      console.log('Merchant paymentMethode', this.methods);
      console.log('Array of method IDs: ', this.methodNumbers);
      /***************/
   
    },
    error: (error) => console.error(error),
  });

 
}
/*update implement */
updateStatus(paymentMethodId: number, event: any): void {
  const checked = event.target.checked;
  this.methodService
    .updateMerchantMethodStatus(paymentMethodId, this.merchantId, checked)
    .subscribe({
      next: (response) => {
        console.log('Status updated successfully:', response);
        // Vous pouvez effectuer des actions supplémentaires après la mise à jour du statut si nécessaire
      },
      error: (error) => {
        console.error('Error updating status:', error);
        // Gérer l'erreur si la mise à jour échoue
      },
    });
}

/*
getMerchantPaymentStatus() {
  if (!isNaN( this.methodNumbers[0])) { // Vérifie si paymentMethodId est un nombre valide
    this.merchantService.findStatusMerchantPayment(this.merchantId, this.methodNumbers[0])
      .subscribe(status => {
        this.status = status;
        console.log('Merchant payment status: ', this.status);
      });
  } else {
    console.error('Invalid paymentMethodId: ', this.paymentMethodId);
  }
}

*/







  ////////////Scroll to section //////////////

  @ViewChild('detailedDescription') detailedDescription!: ElementRef;

  scrollToSection() {
    if (this.detailedDescription && this.detailedDescription.nativeElement) {
      this.detailedDescription.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  //-----------------------------chart ---------------------
  createChart() {
    const ctx = document.getElementById('areaWiseSale') as HTMLCanvasElement;
    const myChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Token', 'Card', 'Epay', 'Paypal'],
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
}
function getMerchantPaymentStatus() {
  throw new Error('Function not implemented.');
}

