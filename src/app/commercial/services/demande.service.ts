import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Demandedto } from '../model/demandedto.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DemandeService {
  API_URL = environment.apiUrl;
  constructor(private http: HttpClient) { }

  saveNewDemande(demande: Demandedto): Observable<Demandedto> {
    return this.http.post<Demandedto>(this.API_URL + "/api/demandes", demande);
  }

  getAllDemandes(): Observable<Demandedto[]> {
    return this.http.get<Demandedto[]>(this.API_URL + "/api/demandes");
  }

  getDemande(demandeId: number): Observable<Demandedto> {
    return this.http.get<Demandedto>(this.API_URL + "/api/demandes/demande/" + demandeId);
  }

  getAllDemandesNotVerified(): Observable<Demandedto[]> {
    return this.http.get<Demandedto[]>(this.API_URL +"/api/demandes/not-verified");
  }

  updateDemandeRejected(demandeId: number): Observable<Demandedto> {
    return this.http.put<Demandedto>(this.API_URL +"/api/demandes/"+ demandeId +"/rejected" , null);
  }

  updateDemandeAccepted(demandeId: number): Observable<Demandedto> {
    return this.http.put<Demandedto>(this.API_URL + "/api/demandes/" + demandeId +"/accepted", null);

  }
  updateDemandeUpdateAndAccepted(demandeId: number,demande: Demandedto): Observable<Demandedto> {
    return this.http.put<Demandedto>(this.API_URL + "/api/demandes/" + demandeId +"/update/accepted", demande);
  }

  updateDemandeUpdate(demandeId: number,demande: Demandedto): Observable<Demandedto> {
    return this.http.put<Demandedto>(this.API_URL + "/api/demandes/" + demandeId +"/update", demande);
  }
}
