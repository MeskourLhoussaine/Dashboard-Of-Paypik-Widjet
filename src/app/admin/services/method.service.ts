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
  private host:string="http://localhost:8080";

  constructor(private http:HttpClient){ }

  getAll(): Observable<PaymentMethod[]> {
    return this.http.get<PaymentMethod[]>(environment.apiUrl + '/api/merchant_methods/findAll')
  }

  getPaymentMethodeById(id: number): Observable<PaymentMethod> {
    return this.http.get<PaymentMethod>(environment.apiUrl + '/api/merchant_methods/findById/' + id)
  }

  updateMarchandMethodStatus(paymentMethodId: number, marchandId: number): Observable<any> {
    return this.http.put<any>(environment.apiUrl + '/api/merchant_methods/'+ marchandId + '/updatePayment-method/' + paymentMethodId ,{}) 
  }}
