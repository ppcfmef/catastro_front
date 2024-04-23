import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { ResultObservation } from '../interfaces/observation.interface';


@Injectable({
  providedIn: 'root'
})
export class DetailObservedService {
  #apiUrl = environment.apiUrl;
  #httpClient =  inject(HttpClient);

  getObservation(id): Observable<ResultObservation[]>{
    const params = new HttpParams().set('application', id);
    return this.#httpClient.get<ResultObservation[]>(`${this.#apiUrl}/maintenance/observation/`,{params})
  }
}
