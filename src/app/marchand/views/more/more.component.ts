import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { MerchantService } from '../../services/merchant.service';
import { Merchant } from '../../models/merchant.model';
import { pageTransition } from 'src/app/shared/utils/animations';
import { ActivatedRoute } from '@angular/router';

Chart.register(...registerables);

@Component({
  selector: 'app-more',
  templateUrl: './more.component.html',
  styleUrls: ['./more.component.css'],
  animations: [pageTransition]
})
export class MoreComponent implements OnInit {

  merchants: Merchant[] = [];
  merchantId: number = 4; // You need to assign a value to merchantId

  constructor(
    // Uncomment if you intend to use them later
    // private route: ActivatedRoute,
    // private transactionService: TransactionService,
    // private paymentMethodService: PaymentMethodService
    private route: ActivatedRoute,
    private merchantService: MerchantService
  ) {}

  ngOnInit(): void {
    this.retrieveMerchantById();
  }

  retrieveMerchantById(): void {
    this.merchantService.getMerchantById(this.merchantId).subscribe({
      next: (data: Merchant) => {
        console.log('Données du marchand :', data); // Affichage des données du marchand dans la console
        this.merchants.push(data);
      },
      error: (error) => console.error(error)
    });
  }

}
