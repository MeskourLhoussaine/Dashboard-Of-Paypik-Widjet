import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Signin} from "./signin/signin.model";
import {Observable} from "rxjs";
import {AuthResponse} from "./auth.response";
import { environment } from 'src/environments/environment.development';
import { Token } from './signin/Token';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = environment.apiUrl+"/api/auth/signin"

  constructor(private http: HttpClient) { }

  signin(credentials : Signin): Observable<Token>{
    return this.http.post<Token>(this.url,credentials);
  }
  }

