import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ChangePasswordRequest } from '../model/change-password-request';
import { environment } from 'src/environments/environment.development';


@Injectable({
  providedIn: 'root',
})
export class UserService {

  API_URL = environment.apiUrl; 
  constructor(private http: HttpClient) {}

  updatePassword(
    userId: number,
    changePasswordRequest: ChangePasswordRequest
  ): Observable<any> {
    return this.http
      .put<any>(
        this.API_URL+`/api/auth/users/${userId}/password`,
        changePasswordRequest
      )
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(error);
  }
}
