import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Merchant } from '../model/merchant.model';


@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  API_URL =  environment.apiUrl; //api
  constructor(private http: HttpClient) {}

  public getMarchands(): Observable<Array<Merchant>> {
    return this.http.get<Array<Merchant>>(
      this.API_URL + '/api/merchants/findAll'
    );
  }

  public searchMarchands(keyword: string): Observable<Array<Merchant>> {
    return this.http.get<Array<Merchant>>(
     this.API_URL + '/marchands/search?keyword=' + keyword
    );
  }

  public saveMarchand(customer: Merchant): Observable<Merchant> {
    return this.http.post<Merchant>(
      this.API_URL + '/marchands',
      customer
    );
  }

  public deleteMarchand(id: number): Observable<Merchant> {
    return this.http.delete<Merchant>(
      this.API_URL+ '/marchands/' + id
    );
  }

  public editMarchand(id: number, customer: Merchant): Observable<Merchant> {
    return this.http.put<Merchant>(
      this.API_URL+ '/marchands/' + id,
      customer
    );
  }
}
