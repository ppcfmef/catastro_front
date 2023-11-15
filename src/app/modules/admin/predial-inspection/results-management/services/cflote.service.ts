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
import { ICFLote } from '../interfaces/cflote.interface';


@Injectable({providedIn: 'root'})
export class CFLoteService {
    apiUrl = environment.apiUrl;

    apiUrlLote = `${
        environment.apiUrlArcGisServer
    }/pruebas/CARTO_FISCAL/MapServer/0`;

    constructor(private http: HttpClient, private _commonService: CommonService) {}

    async crearLote(data: ICFLote): Promise < any > {
        const wkid = 4326;
        const _lote = data;

        this.apiUrl = `${
            this.apiUrlLote.replace('MapServer', 'FeatureServer')
        }/addFeatures`;

        const jsonData = await MapUtils.createArcgisJSON([_lote], wkid);
        const formData = new FormData();
        formData.append('features', JSON.stringify(jsonData));
        formData.append('F', 'json');
        //const headers = new HttpHeaders();


        const response = await fetch(`${
            this.apiUrl
        }`, {
            method: 'POST',
            body: formData
        });
        const responseJson: any = await response.json();
        return responseJson;

    }


    async generateRANCPU(ubigeo: string): Promise < any > {
        const res: any = {};
        const [FeatureLayer,] = await loadModules(['esri/layers/FeatureLayer']);
        let ran_cpu: number=0;

        this.apiUrl = `${
            this.apiUrlLote
        }`;
        const layer = new FeatureLayer(this.apiUrl);
        const query = layer ?. createQuery();

        if (ubigeo) {
            query.where = `UBIGEO='${ubigeo}'`;

            const maxRANCPUStatistics = {
                onStatisticField: 'RAN_CPU',
                outStatisticFieldName: 'max_RAN_CPU',
                statisticType: 'max'
            };


            query.outStatistics = [maxRANCPUStatistics];

            const response = await layer ?. queryFeatures(query);
            const stats = response.features[0].attributes;

            if (response.features.length > 0 && stats.max_RAN_CPU && stats.max_RAN_CPU !== null) {
                ran_cpu =stats.max_RAN_CPU;
            }



        }

        return ran_cpu+1;
    }
}
