import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { loadModules } from 'esri-loader';
import { Observable, Subscription } from 'rxjs';
import { TableService } from './table.service';
import { FuseSplashScreenService } from '@fuse/services/splash-screen';
import { IOperator } from '../interfaces/operator.interface';

@Injectable({
  providedIn: 'root'
})
export class OperatorService {
    idWorkLoadLayer = 'carto_asignacion_carga_8124';
    idTicketLayer = 'carto_asignacion_carga_9869';
    idFieldPointLayer = 'CARTO_PUNTO_CAMPO_4985';
    idFieldBlockLayer = 'CARTO_MANZANA_CAMPO_3194';
    _webMapData;
    constructor(
    private _httpClient: HttpClient,
    ) { }


    getOperador(params): Observable<any> {
        return this._httpClient.get<any>(`${environment.apiUrl}/gap-analisys/user/`, {params});
    }

    getOperatorById(id: string): Observable<IOperator> {
        return this._httpClient.get<IOperator>(`${environment.apiUrl}/gap-analisys/user/${id}`);
    }
}
