import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { IntegrateBusiness, IntegratePerson, IntegrateNsrtmLandOwner, SatLandOwner} from '../interfaces/integrations.inteface';

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

  getNsrtmLandOwner(ubigeo: string, landOwnerCode: string): Observable<IntegrateNsrtmLandOwner> {
    return this.http.get<IntegrateNsrtmLandOwner>(`${this.apiUrl}/integrations/nsrtm/${ubigeo}/${landOwnerCode}/`);
  }

  getSatLandOwner(ubigeo: string, landOwnerCode: string): Observable<{data: SatLandOwner[]}> {
    return this.http.get<{data: SatLandOwner[]}>(`${this.apiSatUrl}/buscar/contribuyente-catastro/${ubigeo}/${landOwnerCode}`);
  }
}
