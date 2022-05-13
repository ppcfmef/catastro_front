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

  getList(queryParams): Observable<IPagination<LandRecord>> {
    if (queryParams.search) {
      return this.search(queryParams.search);
    }

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

  search(value: string): Observable<IPagination<LandRecord>> {
    const data: LandRecord[] = this._getMockData();
    return new Observable(
      (observer) => {
        const resultFind: LandRecord[] = data.filter(
          (element: LandRecord) => {
            const a = element.steetName.toLowerCase() === value.toLowerCase();
            const b = element.habilitacionName.toLowerCase() === value.toLowerCase();
            return a || b;
          }
          );
        setTimeout( () => {
          observer.next(this._getMockPaginateData(resultFind));
          observer.complete();
        }, 2000);
      }
    );
  }

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
