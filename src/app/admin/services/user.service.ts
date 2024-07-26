import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { User } from '../model/user.model';
import { Role } from '../model/role.model';
import { ChangePasswordRequest } from 'src/app/marchand/models/change-password-request';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  API_URL = environment.apiUrl;
  /*updatePassword(userId: number, changePasswordRequest: ChangePasswordRequest) {
    throw new Error('Method not implemented.');
  }
*/
  constructor(private http: HttpClient) {}

  public getUseres(): Observable<Array<User>> {
    return this.http.get<Array<User>>(this.API_URL + '/api/auth/users');
  }

  public updateUser(user: User): Observable<User> {
    // Utiliser l'identifiant de l'utilisateur pour former l'URL de mise à jour
    const url = `${this.API_URL}/api/auth/updateprofile/${user.id}`;
    // Envoyer une requête PUT avec les données de l'utilisateur
    return this.http.put<User>(url, user);
  }

  findRoles(username: string): Observable<Role[]> {
    const url = `${this.API_URL} /api/auth/users/roles/${username}`;
    return this.http.get<Role[]>(url);
  }
  /*delet*/

  deleteUser(id: number): Observable<void> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<void>(`${this.API_URL}/api/auth/delete/${id}`, {
      headers,
    });
  }
  /*Add*/
  // Ajoutez ici la méthode pour ajouter un utilisateur
  /* public addUser(user: User): Observable<User> {
    const url = `${this.API_URL}/api/auth/signup`;
    console.log("service data",user)
    return this.http.post<User>(url, user);
  }*/
  public addUser(user: User): Observable<User> {
    const url = `${this.API_URL}/api/auth/signup`;
    console.log('service data', user);
    return this.http.post<User>(url, user).pipe(catchError(this.handleError));
  }
  /*
  public getRoles():Observable<Array<User>>{
    return this.http.get<Array<User>>(environment.apiUrl + "/api/auth/users");
  }
*/
  public updatePassword(
    userId: number,
    changePasswordRequest: ChangePasswordRequest
  ): Observable<any> {
    return this.http.put<any>(
      this.API_URL + `/api/auth/users/${userId}/password`,
      changePasswordRequest
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage =
        error.error.message ||
        `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    // Retourne l'erreur sous forme d'observable
    return throwError(() => new Error(errorMessage));
  }
}
