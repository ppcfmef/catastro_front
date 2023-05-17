import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

  uploadFile(data: any): Observable<any> {
    const formData= new FormData();
    formData.append('id_app', data.id_app);
    formData.append('file', data.file);
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    console.log('formData>>',formData);
    return this.http.post<any>(`${this.apiUrl}/maintenance/application/upload-file/`, formData,{headers});
  }
/*
 createOwner(data: LandOwner): Observable<LandOwner> {
    return this.http.post<LandOwner>(`${this.apiUrl}/lands/owners/register/`, data);
  }

*/
}
