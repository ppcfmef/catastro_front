import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PredioPadronService {

  apiUrl = environment.apiUrl;

  constructor(
    private readonly http: HttpClient,
  ) { }

  updateLand(id: number, data: any): Observable<any> {
    // Eliminando registros que el backend no modifica
    // delete data['<key>'];
    return this.http.patch<any>(`${this.apiUrl}/lands/register/${id}/`, data);
  }


}
