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
    private _tableService: TableService,
    private _fuseSplashScreenService: FuseSplashScreenService,
    ) { }

    getWebMap(): void {
        this._tableService.getWebMap().subscribe(webMap => this._webMapData = webMap);
    }


    getOperador(params): Observable<any> {
        return this._httpClient.get<any>(`${environment.apiUrl}/gap-analisys/user/`, {params});
    }

    getOperatorById(id: string): Observable<IOperator> {
        return this._httpClient.get<IOperator>(`${environment.apiUrl}/gap-analisys/user/${id}`);
    }



    async assigmentOperator(operator, nameOperator, workload, dateLimit, ubigeo): Promise<void> {
        this._fuseSplashScreenService.show(0);
        try {
            const workLoadStatus = operator ? '2' : '1';
            const ticketStatus = operator ? '3' : '2';
            const dateUpdate = new Date().valueOf();

            const [newQuery, query, esriConfig] = await loadModules(['esri/rest/support/Query', 'esri/rest/query',]);
            const idWorkLoadLayer = this.idWorkLoadLayer;
            const idTicketLayer = this.idTicketLayer;
            const idFieldPointLayer = this.idFieldPointLayer;
            const idFieldBlockLayer = this.idFieldBlockLayer;

            // Realizamos el filtro
            const queryWorkLoad = new newQuery();
            queryWorkLoad.where = `COD_CARGA = '${workload}' AND UBIGEO = '${ubigeo}'`;
            queryWorkLoad.outFields = ['*'];
            queryWorkLoad.returnGeometry = false;
            this.getWebMap();

            // query to feature layer
            this._webMapData.findLayerById(idWorkLoadLayer).queryFeatures(queryWorkLoad)
                .then((response) => {
                    const features = response.features;
                    features.forEach((feature) => {
                        feature.attributes.ESTADO = workLoadStatus;
                        feature.attributes.COD_USUARIO = operator;
                        feature.attributes.NOM_USUARIO = nameOperator;
                        feature.attributes.FEC_ENTREGA = dateLimit;
                    });

                    return this._webMapData.findLayerById(idWorkLoadLayer).applyEdits({ updateFeatures: features });
                })
                .then((response) => {
                    const updateFeatureResult = response.updateFeatureResults[0];
                    if (updateFeatureResult.error) {
                        return Promise.reject(`Ocurrio un error al asignar el usuario ${nameOperator} a la carga de trabajo ${workload}\n${updateFeatureResult.error}`);
                    }
                    const queryTicket = new newQuery();
                    queryTicket.where = `ID_CARGA = '${ubigeo}${workload}'`;
                    queryTicket.outFields = ['*'];
                    queryTicket.returnGeometry = false;
                    return this._webMapData.findTableById(idTicketLayer).queryFeatures(queryTicket);
                })
                .then((response) => {
                    const features = response.features;
                    features.forEach((feature) => {
                        feature.attributes.ESTADO = ticketStatus;
                        feature.attributes.COD_USUARIO = operator;
                        feature.attributes.FEC_ASIGNACION = dateUpdate;
                        feature.attributes.FEC_ULTIMA_ACTUALIZACION = dateUpdate;
                    });

                    return this._webMapData.findTableById(idTicketLayer).applyEdits({ updateFeatures: features });
                })
                .then(() => {
                    const queryObjectBlock = new newQuery();
                    queryObjectBlock.where = `ID_CARGA = '${ubigeo}${workload}'`;
                    queryObjectBlock.outFields = ['*'];
                    queryObjectBlock.returnGeometry = false;
                    return this._webMapData.findLayerById(idFieldBlockLayer).queryFeatures(queryObjectBlock);
                })
                .then((response) => {
                    if (response.features.length === 0) {
                        return Promise.resolve();
                    }
                    const features = response.features;
                    features.forEach((feature) => {
                        feature.attributes.Estado_tra = ticketStatus;
                    });

                    return this._webMapData.findLayerById(idFieldBlockLayer).applyEdits({ updateFeatures: features });
                })
                .then(() => {
                    const queryObjectPred = new newQuery();
                    queryObjectPred.where = `ID_CARGA = '${ubigeo}${workload}'`;
                    queryObjectPred.outFields = ['*'];
                    queryObjectPred.returnGeometry = false;
                    return this._webMapData.findLayerById(idFieldPointLayer).queryFeatures(queryObjectPred);
                })
                .then((response) => {
                    if (response.features.length === 0) {
                        return Promise.resolve();
                    }
                    const features = response.features;
                    features.forEach((feature) => {
                        feature.attributes.Estado_tra = ticketStatus;
                    });

                    return this._webMapData.findLayerById(idFieldPointLayer).applyEdits({ updateFeatures: features });

                })
                .then(() => {
                    console.log(`Se ${operator ? 'asigno' : 'desasigno'} el usuario ${nameOperator} a la carga de trabajo ${workload}`);
                    this._fuseSplashScreenService.hide();
                })
                .catch((error) => {
                    console.log(error);
                    this._fuseSplashScreenService.hide();
                });
        }
        catch (error) {
            console.log('EsriLoader: ', error);
            this._fuseSplashScreenService.hide();
        }
    }
}
