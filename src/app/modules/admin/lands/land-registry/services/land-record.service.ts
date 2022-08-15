import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'environments/environment';
import { IPagination } from 'app/core/common/interfaces/common.interface';
import { LandRecord } from '../interfaces/land-record.interface';


@Injectable({
  providedIn: 'root'
})
export class LandRecordService {

  apiUrl = environment.apiUrl;
  private _landRecordDownloadCroquis$ = new BehaviorSubject<boolean>(null);


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
}
