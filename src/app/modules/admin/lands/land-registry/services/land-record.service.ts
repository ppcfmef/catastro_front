import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'environments/environment';
import { IPagination } from 'app/core/common/interfaces/common.interface';
import { LandRecord } from '../interfaces/land-record.interface';
import { LandRecordSummary } from '../interfaces/land-record-summary.interface';


@Injectable({
  providedIn: 'root'
})
export class LandRecordService {

  apiUrl = environment.apiUrl;
  private _landRecordDownloadCroquis$ = new BehaviorSubject<boolean>(null);
  filtersOptions$ = new BehaviorSubject<string>(null);
  filtersOptionsSelect$ = new BehaviorSubject<any>(null);
  lengthOwner$ = new BehaviorSubject<number>(null);
  renderOption$ = new Subject<boolean>();
  constructor(
    private http: HttpClient
  ) { }

  getList(queryParams): Observable<IPagination<LandRecord>> {
    return this.http.get<IPagination<LandRecord>>(`${this.apiUrl}/lands/records/`, {params: queryParams});
  }

  getAllBy(landOwnerId: number): Observable<IPagination<LandRecord>> {
    return this.getList({owner: landOwnerId});
  }



  setLandRecordDownloadCroquis(value: boolean): void {
    this._landRecordDownloadCroquis$.next(value);
  }

  getLandRecordDownloadCroquis(): Observable<boolean> {
    return this._landRecordDownloadCroquis$;
  }

  getSummary(queryParams = {}): Observable<LandRecordSummary> {
    return this.http.get<LandRecordSummary>(`${this.apiUrl}/lands/summary/`, {params: queryParams});
  }
}
