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

  getRTArancel(queryParams = {}): Observable<IPagination<any>> {
    return this.http.get<IPagination<any>>(`${this.apiUrl}/incomes/rtarancel/`, {params: queryParams});
  }

  getRTPredioDato(queryParams = {}): Observable<IPagination<any>> {
    return this.http.get<IPagination<any>>(`${this.apiUrl}/incomes/rtpediodato/`, {params: queryParams});
  }

  getRTPredioCaracteristica(queryParams = {}): Observable<IPagination<any>> {
    return this.http.get<IPagination<any>>(`${this.apiUrl}/incomes/rtprediocaracteristica/`, {params: queryParams});
  }

  getRTRecaudacion(queryParams = {}): Observable<IPagination<any>> {
    return this.http.get<IPagination<any>>(`${this.apiUrl}/incomes/rtrecaudacion/`, {params: queryParams});
  }

  getRTDeuda(queryParams = {}): Observable<IPagination<any>> {
    return this.http.get<IPagination<any>>(`${this.apiUrl}/incomes/rtdeuda/`, {params: queryParams});
  }

  getRTEmision(queryParams = {}): Observable<IPagination<any>> {
    return this.http.get<IPagination<any>>(`${this.apiUrl}/incomes/rtemision/`, {params: queryParams});
  }

  getRTBaseImponible(queryParams = {}): Observable<IPagination<any>> {
    return this.http.get<IPagination<any>>(`${this.apiUrl}/incomes/rtbaseimponible/`, {params: queryParams});
  }

  getRTAlicuota(queryParams = {}): Observable<IPagination<any>> {
    return this.http.get<IPagination<any>>(`${this.apiUrl}/incomes/rtalicuota/`, {params: queryParams});
  }

  getRTAmnistiaContribuyente(queryParams = {}): Observable<IPagination<any>> {
    return this.http.get<IPagination<any>>(`${this.apiUrl}/incomes/rtamnistiacontribuyente/`, {params: queryParams});
  }

  getRTAmnistiaMunicipal(queryParams = {}): Observable<IPagination<any>> {
    return this.http.get<IPagination<any>>(`${this.apiUrl}/incomes/rtamnistiamunicipal/`, {params: queryParams});
  }

  getRTVaremMunicipal(queryParams = {}): Observable<IPagination<any>> {
    return this.http.get<IPagination<any>>(`${this.apiUrl}/incomes/rtvaremmunicipal/`, {params: queryParams});
  }
}
