import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Demandedto } from '../model/demandedto.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DemandeService {

  constructor(private http: HttpClient) { }

  saveNewDemande(demande: Demandedto): Observable<Demandedto> {
    return this.http.post<Demandedto>(environment.apiUrl + "/api/demandes", demande);
  }

  getAllDemandes(): Observable<Demandedto[]> {
    return this.http.get<Demandedto[]>(environment.apiUrl + "/api/demandes");
  }

  getDemande(demandeId: number): Observable<Demandedto> {
    return this.http.get<Demandedto>(environment.apiUrl + "/api/demandes/demande/" + demandeId);
  }

  getAllDemandesNotVerified(): Observable<Demandedto[]> {
    return this.http.get<Demandedto[]>(environment.apiUrl +"/api/demandes/not-verified");
  }

  updateDemandeRejected(demandeId: number): Observable<Demandedto> {
    return this.http.put<Demandedto>(environment.apiUrl +"/api/demandes/"+ demandeId +"/rejected" , null);
  }

  updateDemandeAccepted(demandeId: number): Observable<Demandedto> {
    return this.http.put<Demandedto>(environment.apiUrl + "/api/demandes/" + demandeId +"/accepted", null);
  }
}
