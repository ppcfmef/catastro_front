/* eslint-disable @typescript-eslint/naming-convention */
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'environments/environment';

import { CommonService } from 'app/core/common/services/common.service';

@Injectable({
    providedIn: 'root',
})
export class ManzanaCrecimientoService {
    baseUrl = `${environment.apiUrlArcGisServer}/pruebas/CAPAS_INSPECCION/MapServer/3/query`;

    constructor(

    ) {}

    async getList(parametros?: any): Promise<any> {
        let where = '';
        where =  parametros?.ubigeo? `UBIGEO='${parametros?.ubigeo}' `:where;

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

        }
        const responseJson: any = await response.json();
        return { ...responseJson, ...responseJsonTotal };
    }

    async getTotalManzanas(parametros?: any): Promise<any> {
        let res =0;
        let where = '1=1';
        where =  parametros?.ubigeo? `UBIGEO='${parametros?.ubigeo}' `:where;
        const params = new URLSearchParams({
            where: where , // A valid SQL where clause
            outStatistics:'[{"statisticType":"count","onStatisticField":"ID_MZN_U","outStatisticFieldName":"count_id_mzn_u"}]',
            f: 'json', // Response format
        });
        const url = `${this.baseUrl}?${params.toString()}`;
        const response = await fetch(`${url}`, {
            method: 'GET',
        });

        const responseJson: any = await response.json();
        res = (responseJson &&  responseJson?.features  && responseJson?.features[0]?.attributes?.count_id_mzn_u)?responseJson?.features[0]?.attributes?.count_id_mzn_u:0;
        return res;

    }


}
