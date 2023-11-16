/* eslint-disable @typescript-eslint/naming-convention */
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {environment} from 'environments/environment';
import {IPagination} from 'app/core/common/interfaces/common.interface';

import {MapUtils} from 'app/shared/utils/map.utils';
import {loadModules} from 'esri-loader';
import {CommonService} from 'app/core/common/services/common.service';
import {FormUtils} from 'app/shared/utils/form.utils';
import {PredioUI} from '../../gap-analysis/interfaces/predio.interface';

@Injectable({providedIn: 'root'})
export class CFTicketService {
    apiUrl = environment.apiUrl;

    apiUrlPredio = `${
        environment.apiUrlArcGisServer
    }/pruebas/carto_asignacion_carga/MapServer/1`;

    constructor(private http: HttpClient, private _commonService : CommonService) {}

    async getTicket(parametros: any): Promise <any>{
        let where = '';
        where =  parametros?.COD_TICKET? `COD_TICKET='${parametros?.COD_TICKET}'`:where;
        where =  parametros?.ESTADO_V? where.length>0? `${where} AND ESTADO_V=${parametros?.ESTADO_V}`:`ESTADO_V=${parametros?.ESTADO_V}`: where;

        const params = new URLSearchParams({
            where: where, // A valid SQL where clause
            outFields: '*', // Fields you want to retrieve, "*" for all fields
            f: 'json', // Response format
        });


        this.apiUrl = `${this.apiUrlPredio}/query?${params.toString()}`;

        const response = await fetch(`${this.apiUrl}`, {
            method: 'GET',
        });

        const responseJson: any = await response.json();

        return responseJson;

    }


    async updateTicket(data: any): Promise < any > {
        const wkid = 4326;
        const _predio = data;

        this.apiUrl = `${
            this.apiUrlPredio.replace('MapServer', 'FeatureServer')
        }/updateFeatures`;

        const jsonData = await MapUtils.createArcgisJSON([_predio], wkid);
        const formData = new FormData();
        formData.append('features', JSON.stringify(jsonData));
        formData.append('F', 'json');

        const response = await fetch(`${
            this.apiUrl
        }`, {
            method: 'POST',
            body: formData
        });
        const responseJson: any = await response.json();
        return responseJson;

    }
}
