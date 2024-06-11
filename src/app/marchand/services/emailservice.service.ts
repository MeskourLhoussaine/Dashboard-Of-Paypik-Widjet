import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class EmailserviceService {
  API_URL = environment.apiUrl;
  constructor(private http: HttpClient) { }

  sendEmail(subject: string, nom: string, message: string) {
    const url = `${this.API_URL}/mail/send-email?subject=${encodeURIComponent(subject)}&nom=${encodeURIComponent(nom)}&message=${encodeURIComponent(message)}`;
    return this.http.post<any>(url, {});
  }
}
