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

  constructor(private http:HttpClient){ }

  public getTransactions(): Observable<Array<Transaction>> {
    return this.http.get<Array<Transaction>>(environment.apiUrl + "/api/Transaction/findAll")
  }

  public getTransactionsByMarchand(marchandId: number): Observable<Array<Transaction>> {
    return this.http.get<Array<Transaction>>(environment.apiUrl + "/api/Transaction/findByMerchantId/" + marchandId)
  }

  // public searchTransactions(keyword: string): Observable<Array<Transaction>> {
  //   return this.http.get<Array<Transaction>>(environment.apiUrl + "/transactions/search?keyword=" + keyword)
  // }

  public saveTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(environment.apiUrl + "/api/Transaction/save", transaction)
  }

  public deleteTransaction(id: number): Observable<Transaction> {
    return this.http.delete<Transaction>(environment.apiUrl + "/api/Transaction/delete/" + id)
  }

  public editTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http.put<Transaction>(environment.apiUrl + "/api/Transaction/" + transaction.transactionId, transaction);
  }
}
