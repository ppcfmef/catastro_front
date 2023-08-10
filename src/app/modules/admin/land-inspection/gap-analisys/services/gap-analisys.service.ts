import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'environments/environment';
import { IPagination } from 'app/core/common/interfaces/common.interface';
import { FormUtils } from 'app/shared/utils/form.utils';


@Injectable({
  providedIn: 'root'
})
export class GapAnalisysService {

  apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }
/*
  async savePredio(data: PredioUI): Promise<void> {
    const wkid = 4326;
    const _predio = data;

    const urlBase = `${this.urlPredio.replace(
        'MapServer',
        'FeatureServer'
    )}/addFeatures`;

    const json = await this.createArcgisJSON([_predio], wkid);

    const formData = new FormData();
    formData.append('features', JSON.stringify(json));
    formData.append('F', 'json');

    const response = await fetch(`${urlBase}`, {
        method: 'POST',
        body: formData,
    });
    const responseJson = await response.json();
    //console.log('responseJson>>',responseJson);

    if (responseJson?.addResults) {
        const addFeature = responseJson?.addResults[0];
    }
}

async savePuntoCampo(data: PuntoCampoUI): Promise<void> {
    const wkid = 4326;
    const _point = data;

    const urlBase = `${this.urlPuntoCampo.replace(
        'MapServer',
        'FeatureServer'
    )}/addFeatures`;

    //const json = await this.createArcgisJSON([_point], wkid);

    const formData = new FormData();
    formData.append('features', JSON.stringify(json));
    formData.append('F', 'json');

    const response = await fetch(`${urlBase}`, {
        method: 'POST',
        body: formData,
    });
    const responseJson = await response.json();

    if (responseJson?.addResults) {
        const addFeature = responseJson?.addResults[0];
    }
}


*/

}
