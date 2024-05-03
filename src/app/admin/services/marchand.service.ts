import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Merchant } from '../model/merchant.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MarchandService {
  API_URL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public getMarchands(): Observable<Array<Merchant>> {
    return this.http.get<Array<Merchant>>(
      this.API_URL + '/api/merchants/findAll'
    );
  }

  // public searchMarchands(keyword: string): Observable<Array<Marchand>> {
  //   return this.http.get<Array<Marchand>>(environment.apiUrl + "/marchands/search?keyword=" + keyword)
  // }

  public saveMarchand(marchand: Merchant): Observable<Merchant> {
    return this.http
      .post<Merchant>(this.API_URL + '/api/merchants/save', marchand)
      .pipe(catchError(this.handleError));
  }

  public deleteMarchand(id: number): Observable<Merchant> {
    return this.http
      .delete<Merchant>(this.API_URL + '/api/merchants/delete/' + id)
      .pipe(catchError(this.handleError));
  }
  /*-----------using for updating marchant for Admin------------*/
  public editMarchand(marchand: Merchant): Observable<Merchant> {
    return this.http
      .put<Merchant>(
        this.API_URL + '/api/merchants/updateMarchand/' + marchand.merchantId,
        marchand
      )
      .pipe(catchError(this.handleError));
  }

  /*-----------using  for  morecomponenet for Admin------------*/
  getMerchantById(id: number): Observable<Merchant> {
    return this.http
      .get<Merchant>(this.API_URL + '/api/merchants/findById/' + id)
      .pipe(catchError(this.handleError));
  }
  /*-----------using  for  morecomponenet for Admin all methode used by marchand------------*/

  getMarchandPaymentMethod(marchandId: number): Observable<Map<string, any>[]> {
    return this.http
      .get<Map<string, any>[]>(
        this.API_URL + '/api/merchants/methods/' + marchandId
      )
      .pipe(catchError(this.handleError));
  }

  /*-----------using  for  morecomponenet for Admin Status of methods shecked by marchand------------*/
  findStatusMerchantPayment(
    merchantId: number,
    paymentMethodId: number
  ): Observable<boolean> {
    return this.http
      .get<boolean>(
        this.API_URL + '/api/merchant_methods/status/' + merchantId + '/' + paymentMethodId
      )
      .pipe(catchError(this.handleError));
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
