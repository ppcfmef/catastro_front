import { Observable, from } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'environments/environment';
import { IPagination } from 'app/core/common/interfaces/common.interface';
import { LandOwner } from '../interfaces/land-owner.interface';

@Injectable({
  providedIn: 'root'
})
export class CFManzanaService {

  baseUrl = `${environment.apiUrlArcGisServer}/pruebas/CARTO_FISCAL/FeatureServer/9/query`;

  constructor(
    private http: HttpClient
  ) { }

  getList(where?: any,resultRecordCount: any=10,returnGeometry: string ='false'): any {
    /*where =  parametros?.cod_uu? `COD_UU='${parametros?.codUu}'`:where;*/
    const params = new URLSearchParams({
        where: where,
        resultRecordCount : resultRecordCount,
        outFields: '*',
        f: 'json', // Response format
        returnGeometry: 'false',
    });
    const url = `${this.baseUrl}?${params.toString()}`;
    /*const response =  fetch(`${url}`, {
        method: 'GET',
    });*/

    const call =  fetch(`${url}`, {
        method: 'GET',
    // eslint-disable-next-line @typescript-eslint/no-shadow
    });//.then(response => response.json());
    return call;

}
}
