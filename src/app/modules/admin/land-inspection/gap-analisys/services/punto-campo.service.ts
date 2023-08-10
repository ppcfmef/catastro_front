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
export class PuntoCampoService {
    apiUrl = environment.apiUrl;

    apiUrlPuntoCampo = `${environment.apiUrlArcGisServer}/pruebas/CARTO_PUNTO_CAMPO/MapServer/0`;

    constructor(
        private http: HttpClient,
        private _commonService: CommonService
    ) {}

    async crearPuntoCampo(data: PuntoCampoUI): Promise<any> {
        const wkid = 4326;
        const _predio = data;

        this.apiUrl = `${this.apiUrlPuntoCampo.replace(
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

}
