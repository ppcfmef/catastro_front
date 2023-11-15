
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SuministroService {

  apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  get(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/inspection/supply/${id}`, );

  }

  update(id,data): Observable<any> {
    return this.http.patch(`${this.apiUrl}/inspection/supply/${id}/`, data);
  }

}
