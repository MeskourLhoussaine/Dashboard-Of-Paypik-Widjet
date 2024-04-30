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

 startLoading() {
  // Set loading to true after a delay of 500 milliseconds
  setTimeout(() => {
    this.loading = true;
    this.downloadPdf();
  });
}

downloadPdf() {
  const content = this.content.nativeElement;

  // Increase DPI for better quality
  const dpi = 300; // Adjust as needed

  html2canvas(
    content, 
    { 
      allowTaint: true, 
      useCORS: true,
      scale: dpi / 96 // 96 is the default DPI
    }
  ).then((canvas) => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    const imgWidth = 210;
    const imgHeight = canvas.height * imgWidth / canvas.width;

    // Define padding
    const paddingTop = 70; // Adjust as needed

    // Add header image
    const headerImg = new Image();
    headerImg.src = 'assets/images/logo/header.png'; // Replace with the path to your header image
    headerImg.onload = () => {
      const headerWidth = imgWidth; // Use the full width of the page for the header
      const headerHeight = (headerImg.height * headerWidth) / headerImg.width;
      pdf.addImage(headerImg, 'PNG', 0, 0, headerWidth, headerHeight);

      // Add footer image
      const footerImg = new Image();
      footerImg.src = 'assets/images/logo/footer.png'; // Replace with the path to your footer image
      footerImg.onload = () => {
        const footerWidth = imgWidth; // Use the full width of the page for the footer
        const footerHeight = (footerImg.height * footerWidth) / footerImg.width;
        const footerY = pdf.internal.pageSize.height - footerHeight; // Position the footer at the bottom of the page
        pdf.addImage(footerImg, 'PNG', 0, footerY, footerWidth, footerHeight);

        // Add content image with padding
        pdf.addImage(imgData, 'PNG', 0, paddingTop, imgWidth, imgHeight);

        pdf.save('content.pdf');

        this.loading = false; // Set loading to false after PDF generation is complete
      };
    };
  });
}  
}
