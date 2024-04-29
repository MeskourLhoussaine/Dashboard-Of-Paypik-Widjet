import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Merchant } from '../model/merchant.model';


@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  readonly API_URL = 'http://localhost:8080/api/merchants';
  constructor(private http: HttpClient) {}

  public getMarchands(): Observable<Array<Merchant>> {
    return this.http.get<Array<Merchant>>(
      environment.apiUrl + '/marchands'
    );
  }

  public searchMarchands(keyword: string): Observable<Array<Merchant>> {
    return this.http.get<Array<Merchant>>(
      environment.apiUrl + '/marchands/search?keyword=' + keyword
    );
  }

  public saveMarchand(customer: Merchant): Observable<Merchant> {
    return this.http.post<Merchant>(
      environment.apiUrl + '/marchands',
      customer
    );
  }

  public deleteMarchand(id: number): Observable<Merchant> {
    return this.http.delete<Merchant>(
      environment.apiUrl + '/marchands/' + id
    );
  }

  public editMarchand(id: number, customer: Merchant): Observable<Merchant> {
    return this.http.put<Merchant>(
      environment.apiUrl + '/marchands/' + id,
      customer
    );
  }
}
