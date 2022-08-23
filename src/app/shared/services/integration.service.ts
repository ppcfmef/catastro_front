import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { IntegrateBusiness, IntegratePerson} from '../interfaces/integrations.inteface';

@Injectable({
  providedIn: 'root'
})
export class IntegrationService {

  apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  getBusiness(document): Observable<IntegrateBusiness> {
    return this.http.get<IntegrateBusiness>(`${this.apiUrl}/integrations/business/${document}/`);
  }

  getPerson(document): Observable<IntegratePerson> {
    return this.http.get<IntegratePerson>(`${this.apiUrl}/integrations/person/${document}/`);
  }
}
