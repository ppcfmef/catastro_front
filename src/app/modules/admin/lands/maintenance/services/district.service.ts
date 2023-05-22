import {Injectable} from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { District } from 'app/core/common/interfaces/common.interface';
import { environment } from 'environments/environment';


@Injectable({
    providedIn: 'root'
})
export class DistrictService {

    private _apiUrl = environment.apiUrl;

    constructor(
        private _httpClient: HttpClient,
    ) {
    }


    getDistrict(ubigeo: string): Observable<District[]> {
        return this._httpClient.get<District[]>(`${this._apiUrl}/places/district/${ubigeo}`);
    }


}
