/* eslint-disable @typescript-eslint/naming-convention */
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'environments/environment';

import { CommonService } from 'app/core/common/services/common.service';

@Injectable({
    providedIn: 'root',
})
export class CFLoteService {
    baseUrl = `${environment.apiUrlArcGisServer}/pruebas/CAPAS_INSPECCION/MapServer/5/query`;

    constructor(

    ) {}

    async getList(parametros?: any): Promise<any> {
        let where = '';
        where =  parametros?.cod_uu? `COD_UU='${parametros?.codUu}'`:where;
        where =  parametros?.urbanMza? `${where} AND MZN_URB ='${parametros?.urbanMza}'`:where;
        where =  parametros?.urbanLotNumber? `${where} AND LOT_URB ='${parametros?.urbanLotNumber}'`:where;
        const params = new URLSearchParams({
            where: where, // A valid SQL where clause
            outFields: '*', // Fields you want to retrieve, "*" for all fields
            // returnGeometry: 'true', // Whether to return geometries
            f: 'json', // Response format
            returnGeometry: 'false',
        });
        const url = `${this.baseUrl}?${params.toString()}`;
        const response = await fetch(`${url}`, {
            method: 'GET',
        });

        const responseJson: any = await response.json();
        return { ...responseJson };
    }
}
