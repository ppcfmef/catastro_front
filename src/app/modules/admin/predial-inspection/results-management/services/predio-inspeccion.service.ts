
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { IRegistroTitularidad } from '../interfaces/registro-titularidad.interface';



@Injectable({
  providedIn: 'root'
})
export class PredioInpeccionService {

  apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  get(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/inspection/landinspection/${id}` );

  }

  update(id,data): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/inspection/landinspection/${id}/`, data);
  }

}
