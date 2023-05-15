import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'environments/environment';
import { IPagination } from 'app/core/common/interfaces/common.interface';
import { ApplicationUI } from '../interfaces/application';


@Injectable({
  providedIn: 'root'
})
export class ApplicationMaintenanceService {

  apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  getList(queryParams): Observable<IPagination<any>> {
    return this.http.get<IPagination<any>>(`${this.apiUrl}/maintenance/application/`, {params: queryParams});
  }

  create(data: any): Observable<ApplicationUI> {
    return this.http.post<ApplicationUI>(`${this.apiUrl}/maintenance/application/`, data);
  }
/*
 createOwner(data: LandOwner): Observable<LandOwner> {
    return this.http.post<LandOwner>(`${this.apiUrl}/lands/owners/register/`, data);
  }

*/
}
