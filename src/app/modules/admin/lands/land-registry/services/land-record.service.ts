import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { environment } from 'environments/environment';
import { IPagination } from 'app/core/common/interfaces/common.interface';
import { LandRecord } from '../interfaces/land-record.interface';

import { landRecodMock } from 'mocks/land-record.mock';

@Injectable({
  providedIn: 'root'
})
export class LandRecordService {

  apiUrl = environment.apiUrl;

  constructor() { }

  getAllBy(landOwnerId: number): Observable<IPagination<LandRecord>> {
    const data = this._getMockData();
    return new Observable(
      (observer) => {
        setTimeout( () => {
          observer.next(this._getMockPaginateData(data));
          observer.complete();
        }, 1000);
      }
    );
  }

  private _getMockData(): LandRecord[] {
    return landRecodMock;
  }

  private _getMockPaginateData(data: LandRecord[]): IPagination<LandRecord> {
    return {
      count: data.length,
      next: '',
      previous: '',
      results: data,
    };
  }
}
