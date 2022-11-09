import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from 'environments/environment';

import { IPagination } from 'app/core/common/interfaces/common.interface';
import { GisCatalog } from '../interfaces/gis-catalog.interface';

@Injectable({
  providedIn: 'root'
})
export class GisMetadataService {

  apiUrl = `${environment.apiUrl}/gis`;

  constructor(private http: HttpClient) { }

  getCatalogList(queryParameters?: {[key: string]: string | number}): Observable<IPagination<GisCatalog>> {
    return this.http.get<IPagination<GisCatalog>>(
      `${this.apiUrl}/catalogs/`,
      { params: queryParameters}
    );
  }

  getCatalogDetail(catalogId: number): Observable<GisCatalog> {
    return this.http.get<GisCatalog>(`${this.apiUrl}/catalogs/${catalogId}/`);
  }
}
