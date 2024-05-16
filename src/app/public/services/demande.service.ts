import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Demandedto } from '../model/demandedto.model';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';



@Injectable({
  providedIn: 'root'
})
export class DemandeService {
 // apiUrl='http://localhost:8080'
  constructor(private http:HttpClient) { }

  public saveDemande(demandedto: Demandedto): Observable<Demandedto> {
    console.log('bonjour')
    return this.http.post<Demandedto>(environment.apiUrl + "/api/demandes/save", demandedto)
  }
}
