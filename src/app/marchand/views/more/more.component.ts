import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { MerchantService } from '../../services/merchant.service';
import { TransactionService } from '../../services/transaction.service';
import { PaymentMethodService } from '../../services/payment-method.service';
import { ActivatedRoute } from '@angular/router';
import { Merchant } from '../../models/merchant.model';
import { Transaction } from '../../models/transaction.model';
import { PaymentMethod } from '../../models/payment-method.model';
import { pageTransition } from 'src/app/shared/utils/animations';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

Chart.register(...registerables);

@Component({
  selector: 'app-more',
  templateUrl: './more.component.html',
  styleUrls: ['./more.component.css'],
  animations: [pageTransition],
})
export class MoreComponent implements OnInit {
  merchants: Merchant[] = [];
  transactions: Transaction[] = [];
  paymentMethods: PaymentMethod[] = [];
  merchantId!: number;
  transactionId!: number;
  clientName!: string;
 
  // Ajoutez une nouvelle variable pour stocker le nombre de transactions
  numberOfTransactions: number = 0;
  //PDF
  loading: boolean = false;
  @ViewChild('content', { static: false }) content!: ElementRef;
  API_URL: any;
  http: any;

  constructor(
    private route: ActivatedRoute,
    private merchantService: MerchantService,
    private transactionService: TransactionService,
    private paymentMethodService: PaymentMethodService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.merchantId = +params['id'];
      this.transactionId = +params['transaId'];
      this.clientName = params['clientName']; 
      this.retrieveMerchantAndTransaction();
    });
  }

  retrieveMerchantAndTransaction(): void {
    this.retrieveMerchantById();
    this.retrieveTransactionById();
    /**nomberclient  */
    this.retrieveNumberOfTransactions();
  }

  retrieveMerchantById(): void {
    this.merchantService.getMerchantById(this.merchantId).subscribe({
      next: (data: Merchant) => {
        console.log('Merchant data:', data);
        this.merchants.push(data);
      },
      error: (error) => console.error(error),
    });
  }

  retrieveTransactionById(): void {
    this.transactionService.getTransactionById(this.transactionId).subscribe({
      next: (data: Transaction) => {
        console.log('Transaction data:', data);

        this.transactions.push(data);
        this.retrievePaymentMethodById(data.paymentMethodId);
      },
      error: (error) => console.error(error),
    });
  }

  retrievePaymentMethodById(paymentMethodId: number): void {
    this.paymentMethodService.getPymentMethodeById(paymentMethodId).subscribe({
      next: (data: PaymentMethod) => {
        this.paymentMethods.push(data);
        console.log('Payment method details:', data);
      },
      error: (error) => console.error(error),
    });
  }

  // Ajoutez une nouvelle méthode pour récupérer le nombre de transactions
  retrieveNumberOfTransactions(): void {
    this.transactionService
      .getNumberOfTransactionsByClientAndMerchant(
        this.merchantId,
        this.clientName
      )
      .subscribe({
        next: (count: number) => {
          this.numberOfTransactions = count;
          console.log('Nombre de transactions:', count);
        },
        error: (error) =>
          console.error(
            'Erreur lors de la récupération du nombre de transactions:',
            error
          ),
      });
  }
 // Pdf downloading
/*
 startLoading() {
  // Set loading to true after a delay of 500 milliseconds
  setTimeout(() => {
    this.loading = true;
    this.downloadPdf();
  });
}*/

// Méthode pour consommer l'API et télécharger le PDF


downloadPdf(transactionId: number): void {
  this.loading = true;  // Activer l'indicateur de chargement

  this.transactionService.generatePdf(transactionId).subscribe({
    next: (pdfBlob: Blob) => {
      // Créer une URL pour le fichier PDF
      const blobUrl = URL.createObjectURL(pdfBlob);

      // Ouvrir le PDF dans un nouvel onglet
      window.open(blobUrl, '_blank');

      // Révoquer l'URL après un certain temps pour éviter les fuites de mémoire
      setTimeout(() => {
        URL.revokeObjectURL(blobUrl);
      }, 100);

      this.loading = false;  // Désactiver l'indicateur de chargement
    },
    error: (error) => {
      console.error('Erreur lors de la génération du PDF:', error);
      this.loading = false;  // Désactiver l'indicateur de chargement
    }
  });
}

// Méthode pour générer un PDF à partir de l'API


}
