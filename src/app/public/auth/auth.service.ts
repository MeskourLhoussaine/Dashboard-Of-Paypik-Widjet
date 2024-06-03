import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Signin } from './signin/signin.model';
import { Observable } from 'rxjs';
import { Token } from './signin/Token';
import { environment } from 'src/environments/environment.development';
import { Merchant } from 'src/app/marchand/models/merchant.model';
import { User } from 'src/app/admin/model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = environment.apiUrl + "/api/auth/signin";

  constructor(private http: HttpClient) { }

  signin(credentials: Signin): Observable<Token> {
    return this.http.post<Token>(this.url, credentials);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(environment.apiUrl+'/api/auth/findbyid/'+id);
  }

  findMerchantIdByMerchantName(merchantName: string): Observable<number> {
    return this.http.get<number>(environment.apiUrl +"/api/merchants/merchandId/"+ merchantName);
  }
  
  findMerchantById(id: number): Observable<Array<Merchant>> {
    return this.http.get<Array<Merchant>>(environment.apiUrl + "/api/merchants/findById/" + id);
  }

  // Nouvelle méthode pour récupérer l'ID de l'utilisateur authentifié
  getAuthenticatedUserId(): number {
    const token = localStorage.getItem('token');
    if (!token) {
      return 0; // Retourne 0 si aucun token n'est présent
    }
    const payload = JSON.parse(atob(token.split('.')[1]));
    console.log('userId',payload.id)
    return payload.id; // Retourne l'ID de l'utilisateur extrait du payload JWT
  }

  // Méthodes pour vérifier les rôles de l'utilisateur
  isAdmin(): boolean {
    const userRole = this.getUserRole();
    // L'administrateur a plusieurs rôles, donc on vérifie s'il a au moins l'un des rôles administrateurs
    return userRole === 'ROLE_ADMIN' || userRole === 'ROLE_COMERCIAL' || userRole === 'ROLE_MARCHAND';
  }
  
  isCommercial(): boolean {
    const userRole = this.getUserRole();
    return userRole === 'ROLE_COMERCIAL';
  }

  isMarchand(): boolean {
    const userRole = this.getUserRole();
    return userRole === 'ROLE_MARCHAND';
  }

  private getUserRole(): string {
    const token = localStorage.getItem('token');
    if (!token) {
      return '';
    }
    const payload = JSON.parse(atob(token.split('.')[1]));
    const roles = payload.roles;
    if (roles && roles.length > 0) {
      return roles[0];
    }
    return '';
  }
}
