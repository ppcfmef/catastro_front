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

@Injectable({
    providedIn: 'root',
})
export class PredioService {
    apiUrl = environment.apiUrl;

    apiUrlPredio = `${environment.apiUrlArcGisServer}/pruebas/CARTO_FISCAL/MapServer/0`;

    constructor(
        private http: HttpClient,
        private _commonService: CommonService
    ) {}

    async crearPredio(data: PredioUI): Promise<any> {
        const wkid = 4326;
        const _predio = data;

        this.apiUrl = `${this.apiUrlPredio.replace(
            'MapServer',
            'FeatureServer'
        )}/addFeatures`;

        const jsonData = await MapUtils.createArcgisJSON([_predio], wkid);
        const formData = new FormData();
        formData.append('features', JSON.stringify(jsonData));
        formData.append('F', 'json');
        const headers = new HttpHeaders();
        //return this.http.post<any>(`${this.apiUrl}`, formData, { headers });

        const response =   await fetch(`${this.apiUrl}`, {
            method: 'POST',
            body: formData,
        });
        const responseJson: any = await response.json();
        return responseJson;

    }

    async generateMaxCPU(value: any): Promise<any> {
        const res: any = {};
        /*let maxCPU ='';


    let idPRED ='';*/

        const [
            // eslint-disable-next-line @typescript-eslint/naming-convention
            FeatureLayer,
        ] = await loadModules(['esri/layers/FeatureLayer']);

        /*const ubigeo = (value && value.ubigeo)?value.ubigeo:'150101';




        const district =await this._commonService.getDistrictResource(ubigeo).toPromise();
        const utm=district.resources[0].utm;

        //const layerInfo=this.layersInfo.find(e=>e.utm === utm);
        const layerInfo=this.layersInfo[0];*/
        //const url=`${layerInfo.urlBase}/${layerInfo.idServer}`;
        this.apiUrl = `${this.apiUrlPredio}`;
        console.log('this.apiUrl>>', this.apiUrl);
        const layer = new FeatureLayer(this.apiUrl);

        const query = layer?.createQuery();
        const query2 = layer?.createQuery();
        if (value.UBIGEO && value.RAN_CPU && parseInt(value.RAN_CPU, 10) > 0) {
            query.where = `UBIGEO='${value.UBIGEO}' and RAN_CPU=${value.RAN_CPU}`;
            query2.where = `UBIGEO='${value.UBIGEO}' `;
            const maxCPUStatistics = {
                onStatisticField: 'COD_CPU', // service field for 2015 population
                outStatisticFieldName: 'max_COD_CPU',
                statisticType: 'max',
            };

            const maxIDPREDIOStatistics = {
                onStatisticField: 'ID_PRED', // service field for 2015 population
                outStatisticFieldName: 'max_ID_PRED',
                statisticType: 'max',
            };

            query.outStatistics = [maxCPUStatistics];
            query2.outStatistics = [maxIDPREDIOStatistics];
            const response = await layer?.queryFeatures(query);
            const response2 = await layer?.queryFeatures(query2);
            const stats = response.features[0].attributes;
            const stats2 = response2.features[0].attributes;
            const rangCPU = value.RAN_CPU;


            console.log('stats2>>',stats2);
            let unidadImbNew = '0001';
            if (
                response.features.length > 0 &&
                stats.max_COD_CPU &&
                stats.max_COD_CPU !== null
            ) {
                const unidadImb = stats.max_COD_CPU.split('-')[1];
                unidadImbNew = FormUtils.zeroPad(
                    parseInt(unidadImb, 10) + 1,
                    4
                );
            }

            const factores = [2, 3, 4, 5, 6, 7, 2, 3, 4, 5, 6, 7];

            const temp = `${rangCPU}${unidadImbNew}`
                .split('')
                .reverse()
                .join('');

            /* eslint-disable @typescript-eslint/prefer-for-of */
            let s = 0;
            for (let i = 0; i < temp.length; i++) {
                s = parseInt(temp[i], 10) * factores[i] + s;
            }
            /* eslint-enable @typescript-eslint/prefer-for-of */
            //let v = 11-s%11;
            let v = [11, 10].includes(s % 11) ? s % 11 : 11 - (s % 11);
            v = v > 9 ? 11 - v : v;

            
            res.COD_CPU = `${rangCPU}-${unidadImbNew}-${v}`;



            res.ID_PRED = (
                stats2.max_ID_PRED ? parseInt(stats2.max_ID_PRED, 10) + 1 : 1
            ).toString();
        }

        return res;
    }
}
