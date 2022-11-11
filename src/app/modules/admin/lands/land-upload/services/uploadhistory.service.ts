import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'environments/environment';

import { IPagination } from 'app/core/common/interfaces/common.interface';
import { UploadHistory } from '../interfaces/upload-history.interface';


@Injectable({
  providedIn: 'root'
})
export class UploadhistoryService {

  apiUrl = environment.apiUrl;

  constructor(
    private readonly http: HttpClient
  ) { }

  getList(queryParams: any): Observable<IPagination<UploadHistory>> {
    return this.http.get<IPagination<UploadHistory>>(`${this.apiUrl}/lands/registry/`, {params: queryParams});
  }

  uploadFile(payload: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/lands/registry/`, payload);
  }

  changeStatus(uploadHistoryId: number, status: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/lands/upload/status/${uploadHistoryId}/`, { status });
  }
}
