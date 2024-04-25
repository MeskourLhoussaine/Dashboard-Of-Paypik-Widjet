import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { MerchantService } from '../../services/merchant.service';
import { Merchant } from '../../models/merchant.model';
import { pageTransition } from 'src/app/shared/utils/animations';
import { ActivatedRoute } from '@angular/router';
import { TransactionService } from '../../services/transaction.service';
import { Transaction } from '../../models/transaction.model';
import { PaymentMethodService } from '../../services/payment-method.service';
import { PaymentMethod } from '../../models/payment-method.model';

Chart.register(...registerables);

@Component({
  selector: 'app-more',
  templateUrl: './more.component.html',
  styleUrls: ['./more.component.css'],
  animations: [pageTransition]
})
export class MoreComponent implements OnInit {

  merchants: Merchant[] = [];
  transactions:Transaction[]=[];
  paymentMethods:PaymentMethod[]=[];
  merchantId!: number ; // You need to assign a value to merchantId
  transactionId!:number;
  
  


  constructor(
    // Uncomment if you intend to use them later
    // private route: ActivatedRoute,
    private transactionService: TransactionService,
    private paymentMethodService: PaymentMethodService,
    private route: ActivatedRoute,
    private merchantService: MerchantService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.merchantId = +params['id']; /*recuperer Id*/
      this.transactionId = +params['transaId'];
      
      console.log('Transaction ID:', this.transactionId);
     
      
    this.retrieveMerchantById();
    this.retrieveTransactionById();
  });
  }
/*recherche Merchant par id*/
  retrieveMerchantById(): void {
    this.merchantService.getMerchantById(this.merchantId).subscribe({
      next: (data: Merchant) => {
        console.log('Données du marchand :', data); // Affichage des données du marchand dans la console
        this.merchants.push(data);
      },
      error: (error) => console.error(error)
    });
  }
                        /*Search Transaction  by id */
                        retrieveTransactionById(): void {
                          this.transactionService.getTransactionById(this.transactionId).subscribe({
                              next: (data: Transaction) => {
                                  console.log('Données du Transaction :', data);
                                  this.transactions.push(data);
                                  console.log('paymentMethode ID:', data.paymentMethodId);
                      
                                  // Récupération du paymentMethodId de la transaction
                                  const paymentMethodId = data.paymentMethodId;
                      
                                  // Appel de la méthode pour récupérer les détails de la méthode de paiement
                                  this.retrievePaymentMethodById(paymentMethodId);
                              },
                              error: (error) => console.error(error)
                          });
                      }
                      /*search Transaction by marchant id */
                      retrievePaymentMethodById(paymentMethodId: number): void {
                          this.paymentMethodService.getPymentMethodeById(paymentMethodId).subscribe({
                              next: (data: PaymentMethod) => {
                                this.paymentMethods.push(data);
                                  console.log('Détails de la méthode de paiement :', data);
                                  // Vous pouvez faire ce que vous voulez avec les détails de la méthode de paiement ici
                              },
                              error: (error) => console.error(error)
                          });
                      }
                      
                      

}
