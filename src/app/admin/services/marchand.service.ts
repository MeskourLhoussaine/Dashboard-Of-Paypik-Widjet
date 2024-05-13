import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Merchant } from '../model/merchant.model';


@Injectable({
  providedIn: 'root'
})
export class MarchandService {

  constructor(private http:HttpClient){ }

  public getMarchands(): Observable<Array<Merchant>> {
    return this.http.get<Array<Merchant>>(environment.apiUrl + "/api/merchants/findAll")
  }

  public getMarchandById(id: number): Observable<Array<Merchant>> {
    return this.http.get<Array<Merchant>>(environment.apiUrl + "/api/merchants/findById/" + id)
  }

  // public searchMarchands(keyword: string): Observable<Array<Marchand>> {
  //   return this.http.get<Array<Marchand>>(environment.apiUrl + "/marchands/search?keyword=" + keyword)
  // }

  public saveMarchand(marchand: Merchant): Observable<Merchant> {
    return this.http.post<Merchant>(environment.apiUrl + "/api/merchants/save", marchand)
  }

  public deleteMarchand(id: number): Observable<Merchant> {
    return this.http.delete<Merchant>(environment.apiUrl + "/api/merchants/delete/" + id)
  }

  public editMarchand(marchand: Merchant): Observable<Merchant> {
    return this.http.put<Merchant>(environment.apiUrl + "/api/merchants/update"   ,marchand);
  }

  findStatusMarchandPayment(marchandId: number, paymentMethodId: number): Observable<boolean> {
    return this.http.get<boolean>(environment.apiUrl + '/api/merchant_methods/status/' + marchandId + '/' + paymentMethodId)
  }

}

