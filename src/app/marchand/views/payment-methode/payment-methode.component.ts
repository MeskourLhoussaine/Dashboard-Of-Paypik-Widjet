import { Component, OnInit } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { PaymentMethod } from '../../models/payment-method.model';
import { HttpClient } from '@angular/common/http';
import { PaymentMethodService } from '../../services/payment-method.service';

@Component({
  selector: 'app-payment-methode',
  standalone: true,
  imports: [],
  templateUrl: './payment-methode.component.html',
  styleUrl: './payment-methode.component.css'
})
export class PaymentMethodeComponent  implements OnInit {
  paymentMethods: any[] = []; // Suppose you have some transactions data here
 // filteredTransactions: any[] = [];
 merchantId: number = 0;
  constructor(private paymentMethodService: PaymentMethodService,
    
  ) {}

  ngOnInit(): void {
    // Initialize transactions data, if needed
    
    this.retrievePaymentMethods();
  }
  retrievePaymentMethods(): void {
    this.paymentMethodService.getPaimentMethodeBymerchanId(this.merchantId).subscribe({
      next: (data: PaymentMethod[]) => {
        this.paymentMethods = data;
       
      },
      error: (error) => console.error(error)
    });
  }
//filtrer par date
}
