import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'environments/environment';
import { IPagination } from 'app/core/common/interfaces/common.interface';
import { LandOwner } from '../interfaces/land-owner.interface';

@Injectable({
  providedIn: 'root'
})
export class LandOwnerService {

  apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  getList(queryParams): Observable<IPagination<LandOwner>> {
    return this.http.get<IPagination<LandOwner>>(`${this.apiUrl}/lands/owners/`, {params: queryParams});
  }


  getDetail(landOwnerId: number): Observable<IPagination<LandOwner>> {
    return this.getList({id: landOwnerId});
  }
}
