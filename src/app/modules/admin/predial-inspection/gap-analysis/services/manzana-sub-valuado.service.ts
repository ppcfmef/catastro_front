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

    async getList(parametros?: any): Promise<any> {
        let where = 'CONT_PS>0';
        where =  parametros?.ubigeo? `CONT_PS>0 and UBIGEO='${parametros?.ubigeo}'`:where;
        console.log('where>>>>>>',where);
        let responseJsonTotal: any = {};
        const params = new URLSearchParams({
            where: where, // A valid SQL where clause
            outFields: '*', // Fields you want to retrieve, "*" for all fields
            // returnGeometry: 'true', // Whether to return geometries
            f: 'json', // Response format
            resultOffset: parametros.resultOffset
                ? String(parametros.resultOffset)
                : '0', // Starting record
            resultRecordCount: parametros.resultRecordCount
                ? String(parametros.resultRecordCount)
                : '5', // Number of records to fetch,
        });
        const url = `${this.baseUrl}?${params.toString()}`;
        const response = await fetch(`${url}`, {
            method: 'GET',
        });

        if (parametros.count) {
            const paramsTotal = new URLSearchParams({
                where: where, // A valid SQL where clause
                f: 'json', // Response format
                returnCountOnly: 'true',
            });

            const urlTotal = `${this.baseUrl}?${paramsTotal.toString()}`;
            const responseTotal = await fetch(`${urlTotal}`, {
                method: 'GET',
            });

            responseJsonTotal = await responseTotal.json();
            console.log('responseTotal>>>', responseJsonTotal);
        }
        const responseJson: any = await response.json();
        return { ...responseJson, ...responseJsonTotal };
    }

    async getTotalSubvaluados(parametros?: any): Promise<any> {
        let res =0;
        let where = 'CONT_PS>0';
        where =  parametros?.ubigeo? `CONT_PS>0 and UBIGEO='${parametros?.ubigeo}'`:where;
        const params = new URLSearchParams({
            where: where , // A valid SQL where clause
            outStatistics:'[{"statisticType":"sum","onStatisticField":"CONT_PS","outStatisticFieldName":"sum_contps"}]',
            f: 'json', // Response format
        });
        const url = `${this.baseUrl}?${params.toString()}`;
        const response = await fetch(`${url}`, {
            method: 'GET',
        });

        const responseJson: any = await response.json();
        res = (responseJson &&  responseJson?.features  && responseJson?.features[0]?.attributes?.sum_contps)?responseJson?.features[0]?.attributes?.sum_contps:0;
        return res;

    }


}
