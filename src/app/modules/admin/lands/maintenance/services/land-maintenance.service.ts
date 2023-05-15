import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'environments/environment';
import { IPagination } from 'app/core/common/interfaces/common.interface';


@Injectable({
  providedIn: 'root'
})
export class LandMaintenanceService {

  apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  getList(queryParams): Observable<IPagination<any>> {
    return this.http.get<IPagination<any>>(`${this.apiUrl}/maintenance/land/`, {params: queryParams});
  }

    getHasNotApplicationsList(queryParams): Observable<IPagination<any>> {
    return this.http.get<IPagination<any>>(`${this.apiUrl}/maintenance/land/has-not-applications/`, {params: queryParams});
  }
}
