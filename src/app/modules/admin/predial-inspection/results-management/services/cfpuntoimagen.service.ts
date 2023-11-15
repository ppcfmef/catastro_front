/* eslint-disable @typescript-eslint/naming-convention */
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'environments/environment';
import { IPagination } from 'app/core/common/interfaces/common.interface';
import { MapUtils } from 'app/shared/utils/map.utils';
import { loadModules } from 'esri-loader';
import { CommonService } from 'app/core/common/services/common.service';
import { FormUtils } from 'app/shared/utils/form.utils';
import { ICFPuntoImagen } from '../interfaces/cfpunto-imagen.interface';


@Injectable({
    providedIn: 'root',
})
export class CFPuntoImagenService {
    apiUrl ='';

    apiUrlPuntoImagen = `${environment.apiUrlArcGisServer}/ACTUALIZACION/ACTUALIZACION_DE_PUNTO_IMG/MapServer/0`;

    constructor(
        private http: HttpClient,
        private _commonService: CommonService
    ) {}

    async crearPunto(data: ICFPuntoImagen): Promise<any> {
        const wkid = 4326;
        const _predio = data;

        this.apiUrl = `${this.apiUrlPuntoImagen.replace(
            'MapServer',
            'FeatureServer'
        )}/addFeatures`;

        const jsonData = await MapUtils.createArcgisJSON([_predio], wkid);
        const formData = new FormData();
        formData.append('features', JSON.stringify(jsonData));
        formData.append('F', 'json');
        const headers = new HttpHeaders();


        const response =   await fetch(`${this.apiUrl}`, {
            method: 'POST',
            body: formData,
        });
        const responseJson: any = await response.json();
        return responseJson;

    }


    async updatePunto(data: ICFPuntoImagen): Promise < any > {
        const wkid = 4326;
        const _predio = data;

        this.apiUrl = `${
            this.apiUrlPuntoImagen.replace('MapServer', 'FeatureServer')
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

    async getMaxSecuen( ubigeo: string): Promise<number>{
        const res: any = {};
        const [FeatureLayer,] = await loadModules(['esri/layers/FeatureLayer']);
        const layer = new FeatureLayer(this.apiUrlPuntoImagen);
        const query = layer ?. createQuery();

        query.where = `UBIGEO='${ubigeo}'`;
        const maxSECUEN={
            onStatisticField: 'SECUEN',
            outStatisticFieldName: 'max_SECUEN',
            statisticType: 'max'
        };

        query.outStatistics = [ maxSECUEN ];
        const response=await layer.queryFeatures(query);
        const stats = response.features[0].attributes;
        const maxSecuen=(stats.max_SECUEN)?stats.max_SECUEN:0;
        return maxSecuen;
    }

}
