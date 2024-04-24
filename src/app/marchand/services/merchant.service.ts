import { Injectable } from '@angular/core';
import { Merchant } from '../models/merchant.model';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MerchantService {
  readonly API_URL = 'http://localhost:8080/api/merchants'; 
  constructor(private http: HttpClient) { }

  getMerchantById(id: number): Observable<Merchant> {
    return this.http.get<Merchant>(`${this.API_URL}/findById/${id}`).pipe(
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
