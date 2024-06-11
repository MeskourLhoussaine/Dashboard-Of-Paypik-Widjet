import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

import { Merchant } from 'src/app/marchand/models/merchant.model';

@Injectable({
  providedIn: 'root',
})
export class MarchandService {
  API_URL = environment.apiUrl
  constructor(private http: HttpClient) {}

  public getMarchands(): Observable<Array<Merchant>> {
    return this.http.get<Array<Merchant>>(this.API_URL + '/marchand/all');
  }

  // public searchMarchands(keyword: string): Observable<Array<Marchand>> {
  //   return this.http.get<Array<Marchand>>(environment.apiUrl + "/marchands/search?keyword=" + keyword)
  // }

  public saveMarchand(marchand: Merchant): Observable<Merchant> {
    return this.http.post<Merchant>(this.API_URL + "/api/merchants/save", marchand)
  }

  public deleteMarchand(id: number): Observable<Merchant> {
    return this.http.delete<Merchant>(
      this.API_URL + '/marchand/delete/' + id
    );
  }

  public editMarchand(marchand: Merchant): Observable<Merchant> {
    return this.http.put<Merchant>(
      this.API_URL + '/marchands/' + marchand.merchantId,
      marchand
    );
  }
}
