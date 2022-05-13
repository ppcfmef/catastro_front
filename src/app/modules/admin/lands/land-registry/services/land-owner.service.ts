import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { environment } from 'environments/environment';
import { IPagination } from 'app/core/common/interfaces/common.interface';
import { LandOwner } from '../interfaces/land-owner.interface';

@Injectable({
  providedIn: 'root'
})
export class LandOwnerService {

  apiUrl = environment.apiUrl;

  constructor() { }

  getList(queryParams): Observable<IPagination<LandOwner>> {
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

  search(value: string): Observable<IPagination<LandOwner>> {
    const data: LandOwner[] = this._getMockData();
    return new Observable(
      (observer) => {
        const resultFind: LandOwner[] = data.filter((element: LandOwner) => element.name.toLowerCase() === value.toLowerCase());
        setTimeout( () => {
          observer.next(this._getMockPaginateData(resultFind));
          observer.complete();
        }, 2000);
      }
    );
  }

  getDetail(landOwnerId: number): Observable<IPagination<LandOwner>> {
    const data: LandOwner[] = this._getMockData();
    return new Observable(
      (observer) => {
        const resultFind: LandOwner[] = data.filter((element: LandOwner) => element.id === landOwnerId);
        setTimeout( () => {
          observer.next(this._getMockPaginateData(resultFind));
          observer.complete();
        }, 2000);
      }
    );
  }

  private _getMockData(): LandOwner[] {
    return [
      {
        id: 1,
        code: '0001',
        documentType: 1,
        dni: '46161430',
        name: 'Jose Carlos',
        paternalSurname: 'Ramirez',
        maternalSurname: 'Tello',
        taxAddress: 'Av. Arica',
        numberLands: 2,
      },
      {
        id: 2,
        code: '0002',
        documentType: 1,
        dni: '26161430',
        name: 'Kadir',
        paternalSurname: 'Huamani',
        maternalSurname: 'Huamani',
        taxAddress: 'Av. Prueba',
        numberLands: 4,
      }
    ];
  }

  private _getMockPaginateData(data: LandOwner[]): IPagination<LandOwner> {
    return {
      count: data.length,
      next: '',
      previous: '',
      results: data,
    };
  }
}
