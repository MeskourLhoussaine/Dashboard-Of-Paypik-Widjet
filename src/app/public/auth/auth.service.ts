import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Signin } from './signin/signin.model';
import { Observable, throwError } from 'rxjs';
import { Token } from './signin/Token';
import { environment } from 'src/environments/environment.development';
import { Merchant } from 'src/app/marchand/models/merchant.model';
import { User } from 'src/app/admin/model/user.model';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = environment.apiUrl + "/api/auth/signin";

  constructor(private http: HttpClient) { }

  signin(credentials: Signin): Observable<Token> {
    return this.http.post<Token>(this.url, credentials).pipe(
      catchError(this.handleError)
    );
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/api/auth/findbyid/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  findMerchantIdByMerchantName(merchantName: string): Observable<number> {
    return this.http.get<number>(`${environment.apiUrl}/api/merchants/merchandId/${merchantName}`).pipe(
      catchError(this.handleError)
    );
  }

  findMerchantById(id: number): Observable<Array<Merchant>> {
    return this.http.get<Array<Merchant>>(`${environment.apiUrl}/api/merchants/findById/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  getAuthenticatedUserId(): number {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found in localStorage');
      return 0;
    }
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      console.log('Payload:', payload);
      return payload.id;
    } catch (error) {
      console.error('Invalid token', error);
      return 0;
    }
  }

  isAdmin(): boolean {
    const isAdmin = this.getUserRoles().includes('ROLE_ADMIN');
    console.log('isAdmin:', isAdmin);
    return isAdmin;
  }

  isSuperAdmin(): boolean {
    const roles = this.getUserRoles();
    const isSuperAdmin = roles.includes('ROLE_ADMIN') && roles.includes('ROLE_COMERCIAL') && roles.includes('ROLE_MARCHAND');
    console.log('isSuperAdmin:', isSuperAdmin);
    return isSuperAdmin;
  }

  isCommercial(): boolean {
    const isCommercial = this.getUserRoles().includes('ROLE_COMERCIAL');
    console.log('isCommercial:', isCommercial);
    return isCommercial;
  }

  isMarchand(): boolean {
    const isMarchand = this.getUserRoles().includes('ROLE_MARCHAND');
    console.log('isMarchand:', isMarchand);
    return isMarchand;
  }

  private getUserRoles(): string[] {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found in localStorage');
      return [];
    }
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      console.log('Roles:', payload.roles);
      return payload.roles || [];
    } catch (error) {
      console.error('Invalid token', error);
      return [];
    }
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error.error.message || error.message);
    return throwError('Something went wrong; please try again later.');
  }
}
