import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'environments/environment';
import { IPagination } from 'app/core/common/interfaces/common.interface';
import { LandRecord } from '../interfaces/land-record.interface';
import { LandRegistryMapService } from './land-registry-map.service';
import { LandRegistryMapModel } from '../models/land-registry-map.model';


@Injectable({
  providedIn: 'root'
})
export class LandRecordService {

  apiUrl = environment.apiUrl;
  private unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private http: HttpClient,
    private landRegistryMapService: LandRegistryMapService
  ) { }

  getList(queryParams): Observable<IPagination<LandRecord>> {
    return this.http.get<IPagination<LandRecord>>(`${this.apiUrl}/lands/records/`, {params: queryParams});
  }

  getAllBy(landOwnerId: number): Observable<IPagination<LandRecord>> {
    return this.getList({owner: landOwnerId});
  }

  getLocalLandRecord(): void {
    this.landRegistryMapService.landOut$
    .pipe(takeUntil(this.unsubscribeAll))
    .subscribe((data: LandRegistryMapModel)=>{
      console.log('>>>> getLocalLandRecord',data);
    });
  }
}
