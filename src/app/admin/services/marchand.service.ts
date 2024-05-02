import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Merchant } from '../model/merchant.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MarchandService {
 

  constructor(private http:HttpClient){ }

  public getMarchands(): Observable<Array<Merchant>> {
    return this.http.get<Array<Merchant>>(environment.apiUrl + "/api/merchants/findAll")
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

  public editMarchand( marchand: Merchant): Observable<Merchant> {
    return this.http.put<Merchant>(environment.apiUrl + "/api/merchants/updateMarchand/" + marchand.merchantId,marchand);
  }
}
