import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserMonitoringServiceService {

  apiUrl = environment.apiUrl;
  private _landRecordDownloadCroquis$ = new BehaviorSubject<boolean>(null);


  constructor(
    private http: HttpClient
  ) { }

  getInstitutions(queryParams = null): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/institutions/`, {params: queryParams});
  }

  getHistoryAcctions(queryParams = null): Observable<any> {
      return this.http.get(`${this.apiUrl}/users/history_actions/`, {params: queryParams});
  }

  getHistoryDetail(queryParams = null): Observable<any> {
    return this.http.get(`${this.apiUrl}/lands/records/history_detail/`, {params: queryParams});
  }
}
