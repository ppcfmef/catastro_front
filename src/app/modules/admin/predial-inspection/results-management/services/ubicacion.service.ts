import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'environments/environment';
import { IPagination } from 'app/core/common/interfaces/common.interface';
import { ticketMock, ticketsMock } from '../mocks/ticket.mock';
import { ubicacionMocks } from '../mocks/ubicacion.mock';


@Injectable({
  providedIn: 'root'
})
export class UbicacionService {

  apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  getList(queryParams): Observable<IPagination<any>> {

    const res: IPagination<any> = {
        count: 2,
        next: '0',
        previous: '0',
        results: ubicacionMocks,
    };


    return new Observable((observer) => {
      observer.next(res);
    });
    //return this.http.get<IPagination<any>>(`${this.apiUrl}/gap-analisys/land/`, {params: queryParams});
  }

  get(id: string): Observable<any> {
    const res = ubicacionMocks[0];

    return new Observable((observer) => {
      observer.next(res);
    });

  }

  update(id,data): Observable<any> {
    const res = ubicacionMocks[0];

    return new Observable((observer) => {
      observer.next(res);
    });
    //return this.http.patch<any>(`${this.apiUrl}/gap-analisys/land/${id}/`, data);
  }


}
