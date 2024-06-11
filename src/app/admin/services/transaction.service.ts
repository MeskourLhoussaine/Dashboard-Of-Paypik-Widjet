import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Merchant } from '../model/merchant.model';
import { Transaction } from '../model/transaction.model';


@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  API_URL = environment.apiUrl
  constructor(private http:HttpClient){ }

  public getTransactions(): Observable<Array<Transaction>> {
    return this.http.get<Array<Transaction>>(this.API_URL + "/api/Transaction/findAll")
  }

  public getTransactionsByMarchand(marchandId: number): Observable<Array<Transaction>> {
    return this.http.get<Array<Transaction>>(this.API_URL+ "/api/Transaction/findByMerchantId/" + marchandId)
  }

  // public searchTransactions(keyword: string): Observable<Array<Transaction>> {
  //   return this.http.get<Array<Transaction>>(environment.apiUrl + "/transactions/search?keyword=" + keyword)
  // }

  public saveTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(this.API_URL + "/api/Transaction/save", transaction)
  }

  public deleteTransaction(id: number): Observable<Transaction> {
    return this.http.delete<Transaction>(this.API_URL + "/api/Transaction/delete/" + id)
  }

  public editTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http.put<Transaction>(this.API_URL  + "/api/Transaction/" + transaction.transactionId, transaction);
  }
}
