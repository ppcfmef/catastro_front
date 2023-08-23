import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'environments/environment';
import { IPagination } from 'app/core/common/interfaces/common.interface';


@Injectable({
  providedIn: 'root'
})
export class LandGapAnalisysService {

  apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  getList(queryParams): Observable<IPagination<any>> {
    return this.http.get<IPagination<any>>(`${this.apiUrl}/gap-analisys/land/`, {params: queryParams});
  }

  get(id): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/gap-analisys/land/${id}`, );
  }

  update(id,data): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/gap-analisys/land/${id}/`, data);
  }

  geStadistictsStatus(): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/gap-analisys/land/stadisticts_gap_analisys/`, );
  }
}
