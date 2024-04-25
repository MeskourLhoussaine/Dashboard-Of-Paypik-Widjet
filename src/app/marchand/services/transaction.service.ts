import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Transaction } from '../models/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  readonly API_URL = 'http://localhost:8080/api/Transaction'; 
 
  constructor(private http: HttpClient) {}

  

  getAll(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.API_URL}/findAll`).pipe(
      catchError(this.handleError)
    );
  }

  getTransactionsByMerchantId(merchantId: number): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.API_URL}/findByMerchantId/${merchantId}`).pipe(
      catchError(this.handleError)
    );
  }

  getTransactionsByPaymentMethodName(name: string): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.API_URL}/BypymentMethothodName/${name}`);
  }

//###########



  getTransactionById(id: number): Observable<Transaction> {
    return this.http.get<Transaction>(`${this.API_URL}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  saveTerrain(terrain: Transaction): Observable<any> {
    return this.http.post(`${this.API_URL}/save`, terrain).pipe(
      catchError(this.handleError)
    );
  }

  updateTerrain(terrain: Transaction): Observable<any> {
    return this.http.put(`${this.API_URL}/update`, terrain).pipe(
      catchError(this.handleError)
    );
  }

  deleteTerrain(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/delete/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  deleteAll(): Observable<any> {
    return this.http.delete(`${this.API_URL}/deleteAll`).pipe(
      catchError(this.handleError)
    );
  }

  findByName(name: string): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.API_URL}/findByName?name=${name}`).pipe(
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
