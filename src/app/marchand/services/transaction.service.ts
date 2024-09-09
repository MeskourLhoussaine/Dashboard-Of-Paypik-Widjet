import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Transaction } from '../models/transaction.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  
   API_URL = environment.apiUrl; 
 
  constructor(private http: HttpClient) {}

  public getAll(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.API_URL + "/findAll").pipe(
      catchError(this.handleError)
    );
  }
  getTransactionsByMerchantId(merchantId: number): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.API_URL+'/api/Transaction/findByMerchantId/'+merchantId).pipe(
      catchError(this.handleError)
    );
  }

  getTransactionsByPaymentMethodName(name: string): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.API_URL+'/api/Transaction/BypymentMethothodName/'+name);

  }
//le nombre de transaction a fait le client dans un merchand
getNumberOfTransactionsByClientAndMerchant(merchantId: number, clientName: string): Observable<number> {
  return this.http.get<number>(this.API_URL+'/api/Transaction/NumberOfTransactionsByClientAndMerchant/'+merchantId+'/'+clientName).pipe(
    catchError(this.handleError)
  );
}







  getTransactionById(id: number): Observable<Transaction> {
    return this.http.get<Transaction>(this.API_URL+'/api/Transaction/'+id).pipe(
      catchError(this.handleError)
    );
  }
//###########
 
// Méthode pour générer un PDF pour une transaction donnée
generatePdf(transactionId: number): Observable<Blob> {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/pdf'
  });

  // Appel à l'API pour générer le PDF
  return this.http.get(`${this.API_URL}/api/Transaction/${transactionId}/pdf`, {
    headers: headers,
    responseType: 'blob'  // On s'attend à recevoir un fichier binaire (Blob)
  });
}
 
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    return throwError('Something bad happened; please try again later.');
  }

}
