/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable max-len */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { SynchronizationComponent } from '../synchronization.component';
import { Observable } from 'rxjs';
import { DJResponse } from '../interfaces/dj.interface';
import { environment } from 'environments/environment';
import { Params } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SynchronizationDjService {

    apiUrlSrtm = environment.apiUrlSrtm;
    private _httpClient = inject(HttpClient);

  constructor() { }

    synchronizationAll(params): Observable<DJResponse> {
    return this._httpClient.get<DJResponse>(`${this.apiUrlSrtm}/nsrtm-services/djpredial/consultas-externas/consultar-log-scf`, {params: params});

    }


    synchronizationIndividual(params): Observable<any> {
        return this._httpClient.post<any>(`${this.apiUrlSrtm}/nsrtm-services/djpredial/consultas-externas/reprocesar-scf-individual`,null, {
            headers:{
                'client-nsrtm': JSON.stringify({ terminal: '1.2.0.0' })
            },
            params,
        });
    }

    synchronizationMassive(): Observable<any> {
        return this._httpClient.post<any>(`${this.apiUrlSrtm}/nsrtm-services/djpredial/consultas-externas/reprocesar-scf-masivo`, {
            headers:{
                'client-nsrtm': JSON.stringify({ terminal: '1.2.0.0' })
            },
        });
    }
}
