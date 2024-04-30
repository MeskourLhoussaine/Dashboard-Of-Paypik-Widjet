import { Injectable } from '@angular/core';
import { PaymentMethod } from '../models/payment-method.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentMethodService {

 API_URL = environment.apiUrl; 
  constructor(private http: HttpClient) {}

  getAll(): Observable<PaymentMethod[]> {
    return this.http.get<PaymentMethod[]>(this.API_URL+'/api/merchant_methods/findAll').pipe(
      catchError(this.handleError)
    );
  }
/*utiliser pour Frant details transaction */
  getPymentMethodeById(id: number): Observable<PaymentMethod> {
    return this.http.get<PaymentMethod>(this.API_URL+'/api/merchant_methods/findById/'+id).pipe(
      catchError(this.handleError)
    );
  }


  getPaimentMethodeBymerchanId(merchantId: number): Observable<PaymentMethod[]> {
    return this.http.get<PaymentMethod[]>(this.API_URL+'/pymentMethodeBymerchanId/'+merchantId).pipe(
      catchError(this.handleError)
    );
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
