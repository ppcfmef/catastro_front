import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {NavigationView, Permission, TypePermission} from '../models/permission.interface';
import {IPagination} from "../../core/common/interfaces/common.interface";

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

    getPermissions(queryParams = null): Observable<IPagination<Permission>> {
        return this._httpClient.get<IPagination<Permission>>(`${this._apiUrl}/users/permission/`, {params: queryParams});
    }

    deletePermissionById(id: number): Observable<void> {
        return this._httpClient.delete<void>(`${this._apiUrl}/users/permission/${id}/`);
    }
}
