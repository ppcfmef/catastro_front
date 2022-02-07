import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {NavigationView, TypePermission} from '../models/permission.interface';

@Injectable({
    providedIn: 'root'
})
export class PermissionService {

    private _apiUrl = `${environment.apiUrl}`;

    constructor(
        private _httpClient: HttpClient
    ) {
    }

    getNavigationView(): Observable<NavigationView[]> {
        return this._httpClient.get<NavigationView[]>(`${this._apiUrl}/common/navigation/view/`);
    }

    getTypePermissions(): Observable<TypePermission[]> {
        return this._httpClient.get<TypePermission[]>(`${this._apiUrl}/users/permission/type/`);
    }
}
