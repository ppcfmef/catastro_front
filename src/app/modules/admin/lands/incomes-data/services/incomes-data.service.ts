import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { IPagination } from 'app/core/common/interfaces/common.interface';

@Injectable({
  providedIn: 'root'
})
export class IncomesDataService {

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getRTContribuyente(queryParams = {}): Observable<IPagination<any>> {
    return this.http.get<IPagination<any>>(`${this.apiUrl}/incomes/rtcontribuyente/`, {params: queryParams});
  }

  getRTMarcoPredio(queryParams = {}): Observable<IPagination<any>> {
    return this.http.get<IPagination<any>>(`${this.apiUrl}/incomes/rtmarcopredio/`, {params: queryParams});
  }
}
