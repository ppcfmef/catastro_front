/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable max-len */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { SynchronizationComponent } from '../synchronization.component';
import { BehaviorSubject, Observable } from 'rxjs';
import { DJResponse } from '../interfaces/dj.interface';
import { environment } from 'environments/environment';
import { Params } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SynchronizationDjService {
    apiUrl = environment.apiUrl;
    apiUrlSrtm = environment.apiUrlSrtm;
    params$ = new BehaviorSubject<Params>({});
    private _httpClient = inject(HttpClient);

  constructor() { }

    synchronizationAll(params): Observable<DJResponse> {

        //api/v1/lands/external/consultar-log-scf
        return this._httpClient.get<DJResponse>(`${this.apiUrl}/lands/external/consultar-log-scf`, {params: params});
    //return this._httpClient.get<DJResponse>(`${this.apiUrlSrtm}/nsrtm-services/djpredial/consultas-externas/consultar-log-scf`, {params: params});

    }


    synchronizationIndividual(params): Observable<any> {


       /* return this._httpClient.post<any>(`${this.apiUrlSrtm}/nsrtm-services/djpredial/consultas-externas/reprocesar-scf-individual`,null, {
            headers:{
                'client-nsrtm': JSON.stringify({ terminal: '1.2.0.0' })
            },
            params,
            responseType: 'text' as 'json'
        });
*/
        return this._httpClient.post<any>(`${this.apiUrl}/lands/external/reprocesar-scf-individual`,null, {
            /*headers:{
                'client-nsrtm': JSON.stringify({ terminal: '1.2.0.0' })
            },*/
            params,
        });
    }

    synchronizationMassive(): Observable<any> {

        return this._httpClient.post<any>(`${this.apiUrlSrtm}/lands/external/reprocesar-scf-masivo`,{}, {
            /*headers:{
                'client-nsrtm': JSON.stringify({ terminal: '1.2.0.0' })
            },*/
        });
        /*return this._httpClient.post<any>(`${this.apiUrlSrtm}/nsrtm-services/djpredial/consultas-externas/Reprocesar-scf-masivo`,{}, {
            headers:{
                'client-nsrtm': JSON.stringify({ terminal: '1.2.0.0' })
            },
            responseType: 'text' as 'json'
        });
        
        */
    }
}
