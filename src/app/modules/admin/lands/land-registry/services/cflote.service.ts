/* eslint-disable @typescript-eslint/naming-convention */
import { Observable, from } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'environments/environment';

import { CommonService } from 'app/core/common/services/common.service';

@Injectable({
    providedIn: 'root',
})
export class CFLoteService {
    baseUrl = `${environment.apiUrlArcGisServer}/pruebas/CARTO_FISCAL/FeatureServer/1/query`;

    constructor(

    ) {}

    getList(where?: any,resultRecordCount: any=10): any {
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
