/* eslint-disable @typescript-eslint/naming-convention */
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'environments/environment';
import { IPagination } from 'app/core/common/interfaces/common.interface';
import { PredioUI } from '../interfaces/predio.interface';
import { MapUtils } from 'app/shared/utils/map.utils';
import { loadModules } from 'esri-loader';
import { CommonService } from 'app/core/common/services/common.service';
import { FormUtils } from 'app/shared/utils/form.utils';
import { PuntoCampoUI } from '../interfaces/punto-campo.interface';

@Injectable({
    providedIn: 'root',
})
export class ManzanaPrediosSubvaluadosService {

    baseUrl = `${environment.apiUrlArcGisServer}/pruebas/CAPAS_INSPECCION/MapServer/4/query`;

    constructor(
        private http: HttpClient,
        private _commonService: CommonService
    ) {}

    async get(parametros?: any): Promise<any> {


        const params = new URLSearchParams({
            where: parametros.where?parametros.where:'1=1',// A valid SQL where clause
            outFields: '*',// Fields you want to retrieve, "*" for all fields
           // returnGeometry: 'true', // Whether to return geometries
            f: 'json',// Response format
            resultOffset: parametros.resultOffset?String(parametros.resultOffset):'0',// Starting record
            resultRecordCount: parametros.resultRecordCount?String(parametros.resultRecordCount):'5',// Number of records to fetch,

          });
          const url = `${this.baseUrl}?${params.toString()}`;
          const response = await fetch(`${url}`, {
            method: 'GET',
        });

          const paramsTotal = new URLSearchParams({
            where: parametros.where?parametros.where:'1=1',// A valid SQL where clause
            f: 'json',// Response format
            returnCountOnly: 'true'
          });

        const urlTotal = `${this.baseUrl}?${paramsTotal.toString()}`;
        const responseTotal = await fetch(`${urlTotal}`, {
            method: 'GET',
        });

        const responseJsonTotal: any = await responseTotal.json();
        console.log('responseTotal>>>',responseJsonTotal);
        const responseJson: any = await response.json();
        return {...responseJson, ...responseJsonTotal};
    }
}
