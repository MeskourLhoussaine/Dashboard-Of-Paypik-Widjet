import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Demandedto } from '../model/demandedto.model';

import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class DemandeService {
  apiUrl='http://localhost:8080'
  constructor(private http:HttpClient) { }

  public saveDemande(demandedto: Demandedto): Observable<Demandedto> {
    console.log('bonjour')
    return this.http.post<Demandedto>(this.apiUrl + "/api/demandes/save", demandedto)
  }
}
