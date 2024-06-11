import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Merchant } from '../model/merchant.model';


@Injectable({
  providedIn: 'root'
})
export class MarchandService {
  API_URL = environment.apiUrl
  constructor(private http:HttpClient){ }

  public getMarchands(): Observable<Array<Merchant>> {
    return this.http.get<Array<Merchant>>(this.API_URL + "/api/merchants/findAll")
  }

  public getMarchandById(id: number): Observable<Array<Merchant>> {
    return this.http.get<Array<Merchant>>(this.API_URL + "/api/merchants/findById/" + id)
  }

  // public searchMarchands(keyword: string): Observable<Array<Marchand>> {
  //   return this.http.get<Array<Marchand>>(this.API_URL + "/marchands/search?keyword=" + keyword)
  // }

  public saveMarchand(marchand: Merchant): Observable<Merchant> {
    return this.http.post<Merchant>(this.API_URL + "/api/merchants/save", marchand)
  }

  public deleteMarchand(id: number): Observable<Merchant> {
    return this.http.delete<Merchant>(this.API_URL+ "/api/merchants/delete/" + id)
  }

  public editMarchand(marchand: Merchant): Observable<Merchant> {
    return this.http.put<Merchant>(this.API_URL + "/api/merchants/update"   ,marchand);
  }

  findStatusMarchandPayment(marchandId: number, paymentMethodId: number): Observable<boolean> {
    return this.http.get<boolean>(this.API_URL + '/api/merchant_methods/status/' + marchandId + '/' + paymentMethodId)
  }

}

