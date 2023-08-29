import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'environments/environment';
import { IPagination } from 'app/core/common/interfaces/common.interface';


@Injectable({
  providedIn: 'root'
})
export class DistrictService {

  apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  getList(queryParams): Observable<IPagination<any>>  {
    return this.http.get<IPagination<any>>(`${this.apiUrl}/gap-analisys/district/`, {params: queryParams});
  }

}
