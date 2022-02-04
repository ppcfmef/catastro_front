import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Department, District, Institute, Province} from '../interfaces/common.interface';

@Injectable({
    providedIn: 'root'
})
export class CommonService {

    private _apiUrl = environment.apiUrl;

    constructor(
        private _httpClient: HttpClient,
    ) {
    }

    getDepartments(): Observable<Department[]> {
        return this._httpClient.get<Department[]>(`${this._apiUrl}/places/department/`);
    }

    getProvinces(queryParams = null): Observable<Province[]> {
        return this._httpClient.get<Province[]>(`${this._apiUrl}/places/province/`, {params: queryParams});
    }

    getDistricts(queryParams = null): Observable<District[]> {
        return this._httpClient.get<District[]>(`${this._apiUrl}/places/district/`, {params: queryParams});
    }

    getInstitutes(): Observable<Institute[]> {
        return this._httpClient.get<Institute[]>(`${this._apiUrl}/master/institution/`);
    }
}
