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
export class CFPredioService {
    apiUrl = environment.apiUrl;

    apiUrlPredio = `${
        environment.apiUrlArcGisServer
    }/pruebas/CARTO_FISCAL/MapServer/0`;

    constructor(private http: HttpClient, private _commonService : CommonService) {}

    async crearPredio(data: PredioUI): Promise < any > {
        const wkid = 4326;
        const _predio = data;

        this.apiUrl = `${
            this.apiUrlPredio.replace('MapServer', 'FeatureServer')
        }/addFeatures`;

        const jsonData = await MapUtils.createArcgisJSON([_predio], wkid);
        const formData = new FormData();
        formData.append('features', JSON.stringify(jsonData));
        formData.append('F', 'json');
        const headers = new HttpHeaders();


        const response = await fetch(`${
            this.apiUrl
        }`, {
            method: 'POST',
            body: formData
        });
        const responseJson: any = await response.json();
        return responseJson;

    }

    async updatePredio(data: PredioUI): Promise < any > {
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

    async getPredios(parametros: any): Promise <any>{
        let where = '';
        where =  parametros?.UBIGEO? `UBIGEO='${parametros?.UBIGEO}'`:where;
        where =  parametros?.COD_PRE? where.length>0? `${where} AND COD_PRE='${parametros?.COD_PRE}'`:`COD_PRE='${parametros?.COD_PRE}'`: where;

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


    async generateMaxCPU(value: any): Promise < any > {
        const res: any = {};
        const [FeatureLayer,] = await loadModules(['esri/layers/FeatureLayer']);


        this.apiUrl = `${
            this.apiUrlPredio
        }`;
        const layer = new FeatureLayer(this.apiUrl);
        const query = layer ?. createQuery();

        if (value.UBIGEO && value.RAN_CPU && parseInt(value.RAN_CPU, 10) > 0) {
            query.where = `UBIGEO='${
                value.UBIGEO
            }' and RAN_CPU=${
                value.RAN_CPU
            }`;

            const maxCPUStatistics = {
                onStatisticField: 'COD_CPU',
                outStatisticFieldName: 'max_COD_CPU',
                statisticType: 'max'
            };

            const maxIDPREDIOStatistics = {
                onStatisticField: 'ID_PRED',
                outStatisticFieldName: 'max_ID_PRED',
                statisticType: 'max'
            };

            query.outStatistics = [maxCPUStatistics, maxIDPREDIOStatistics];

            const response = await layer ?. queryFeatures(query);
            const stats = response.features[0].attributes;
            const rangCPU = value.RAN_CPU;

            let unidadImbNew = '0001';
            if (response.features.length > 0 && stats.max_COD_CPU && stats.max_COD_CPU !== null) {
                const unidadImb = stats.max_COD_CPU.split('-')[1];
                unidadImbNew = FormUtils.zeroPad(parseInt(unidadImb, 10) + 1, 4);
            }

            const factores = [
                2,
                3,
                4,
                5,
                6,
                7,
                2,
                3,
                4,
                5,
                6,
                7
            ];

            const temp = `${rangCPU}${unidadImbNew}`.split('').reverse().join('');

            /* eslint-disable @typescript-eslint/prefer-for-of */
            let s = 0;
            for (let i = 0; i < temp.length; i++) {
                s = parseInt(temp[i], 10) * factores[i] + s;
            }


            let v = [11, 10].includes(s % 11) ? s % 11 : 11 - (s % 11);
            v = v > 9 ? 11 - v : v;


            res.COD_CPU = `${rangCPU}-${unidadImbNew}-${v}`;
            res.ID_PRED = (stats.max_ID_PRED ? parseInt(stats.max_ID_PRED, 10) + 1 : 1).toString();
        }

        return res;
    }
}
