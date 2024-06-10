import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ChangePasswordRequest } from '../models/change-password-request';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  updatePassword(
    userId: number,
    changePasswordRequest: ChangePasswordRequest
  ): Observable<any> {
    return this.http
      .put<any>(
        `http://localhost:8080/api/auth/users/${userId}/password`,
        changePasswordRequest
      )
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(error);
  }
}
