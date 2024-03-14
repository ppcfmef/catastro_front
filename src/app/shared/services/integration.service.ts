import { Observable, from} from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { IntegrateBusiness, IntegratePerson, IntegrateNsrtmLandOwner, SatLandOwner } from '../interfaces/integrations.inteface';

@Injectable({
  providedIn: 'root'
})
export class IntegrationService {

  apiUrl = environment.apiUrl;
  apiSatUrl = environment.apiSatUrl;
  constructor(
    private http: HttpClient
  ) { }

  getBusiness(document): Observable<IntegrateBusiness> {
    return this.http.get<IntegrateBusiness>(`${this.apiUrl}/integrations/business/${document}/`);
  }

  getPerson(document): Observable<IntegratePerson> {
    return this.http.get<IntegratePerson>(`${this.apiUrl}/integrations/person/${document}/`);
  }

  getLandOwner(ubigeo: string, landOwnerCode: string): Observable<IntegrateNsrtmLandOwner> {
    return this.http.get<IntegrateNsrtmLandOwner>(`${this.apiUrl}/integrations/land-owner/${ubigeo}/${landOwnerCode}/`);
  }

  getSatLandOwner(ubigeo: string, landOwnerCode: string): Observable<{ data: SatLandOwner[] }> {
    return this.http.get<{ data: SatLandOwner[] }>(`${this.apiSatUrl}/buscar/contribuyente-catastro/${ubigeo}/${landOwnerCode}`, {
      headers: {
        'Skip-Auth': 'true',
      }
    });
  }

  getLandOwnerNSRTM(ubigeo: string, landOwnerCode: string): Observable<any> {

    const url=`${environment.apiNSRTMUrl}/contribuyente/consultas-externas/listar-datos-contribuyente-por-documento?ubigeo=${ubigeo}&codigo_contribuyente=${landOwnerCode}`;
    const call =  fetch(`${url}`, {
        method: 'GET',
    }).then(response => response.json());

    return from(call);

    //return this.http.get<any>(`${environment.apiNSRTMUrl}/contribuyente/consultas-externas/listar-datos-contribuyente-por-documento?ubigeo=${ubigeo}&codigo_contribuyente=${landOwnerCode}`);
  }
}
