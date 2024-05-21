import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }
  /*
  public getMarchands(): Observable<Array<Merchant>> {
    return this.http.get<Array<Merchant>>(environment.apiUrl + "/api/merchants/findAll")
  }
*/
  public getUseres():Observable<Array<User>>{
    return this.http.get<Array<User>>(environment.apiUrl + "/api/auth/users");
  }
}
