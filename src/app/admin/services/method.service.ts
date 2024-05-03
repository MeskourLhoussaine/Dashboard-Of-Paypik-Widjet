import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaymentMethod } from 'src/app/admin/model/payment-method.model';

@Injectable({
  providedIn: 'root',
})
export class MethodService {
  API_URL = environment.apiUrl;

  constructor(private http: HttpClient) {}
  getAll(): Observable<PaymentMethod[]> {
    return this.http
      .get<PaymentMethod[]>(this.API_URL + '/api/merchant_methods/findAll')
      .pipe(catchError(this.handleError));
  }
  /*utiliser pour Frant details transaction */
  getPymentMethodeById(id: number): Observable<PaymentMethod> {
    return this.http
      .get<PaymentMethod>(this.API_URL + '/api/merchant_methods/findById/' + id)
      .pipe(catchError(this.handleError));
  }

  getPaimentMethodeBymerchanId(
    merchantId: number
  ): Observable<PaymentMethod[]> {
    return this.http
      .get<PaymentMethod[]>(
        this.API_URL + '/pymentMethodeBymerchanId/' + merchantId
      )
      .pipe(catchError(this.handleError));
  }

  updateMerchantMethodStatus(paymentMethodId: number, merchantId: number, status: boolean): Observable<any> {
    return this.http.put<any>(`${this.API_URL}/api/merchant_methods/updateMerchantMethodStatusByPaymentMethodId/${paymentMethodId}/${merchantId}/${status}`, {})
      .pipe(
        catchError(this.handleError) // Utilisez catchError pour gérer les erreurs
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }
}
