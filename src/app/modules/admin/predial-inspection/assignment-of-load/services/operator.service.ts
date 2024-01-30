import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { IOperator } from '../interfaces/operator.interface';
import { UserService } from 'app/core/user/user.service';
import { takeUntil } from 'rxjs/operators';
import { User } from 'app/core/user/user.types';

@Injectable({
    providedIn: 'root'
})
export class OperatorService {
    idWorkLoadLayer = 'carto_asignacion_carga_8124';
    idTicketLayer = 'carto_asignacion_carga_9869';
    idFieldPointLayer = 'CARTO_PUNTO_CAMPO_4985';
    idFieldBlockLayer = 'CARTO_MANZANA_CAMPO_3194';
    _webMapData;
    private _currentUserUbigeo = new BehaviorSubject<string>('');
    constructor(
        private _httpClient: HttpClient,
        private _userService: UserService,
    ) {
        //this.setUbigeo();
    }

    getUbigeo(): Observable<string> {
        return this._currentUserUbigeo.asObservable();
    }

    updateUbigeo(): void {
        const ubigeo = localStorage.getItem('ubigeo');
        this._currentUserUbigeo.next(ubigeo);
    }



    getOperador(params): Observable<any> {
        return this._httpClient.get<any>(`${environment.apiUrl}/gap-analisys/user/`, { params });
    }

    getOperatorById(id: string): Observable<IOperator> {
        return this._httpClient.get<IOperator>(`${environment.apiUrl}/gap-analisys/user/${id}`);
    }
}
