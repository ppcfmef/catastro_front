import { Injectable } from '@angular/core';
import { FuseSplashScreenService } from '@fuse/services/splash-screen';
import { loadModules } from 'esri-loader';
import moment from 'moment';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { WidgetService } from './widget.service';


@Injectable({
  providedIn: 'root'
})
export class TableService {
    idWorkLoadLayer = 'carto_asignacion_carga_8124';
    idTicketLayer = 'carto_asignacion_carga_9869';
    idFieldPointLayer = 'CARTO_PUNTO_CAMPO_4985';
    idFieldBlockLayer = 'CARTO_MANZANA_CAMPO_3194';

    idManzanaPrediosLayer = 'CAPAS_INSPECCION_AC_1236';
    idLotesSinPredioLayer = 'CAPAS_INSPECCION_AC_3266';
    idPuntoImagenLayer = 'CAPAS_INSPECCION_AC_3611';
    idManzanaIneiLayer = 'CAPAS_INSPECCION_AC_3891';
    idPredioSinManzanaLayer = 'CARTO_PUNTO_CAMPO_7359';
    idManzanaPuntoImagenLayer = 'CAPAS_INSPECCION_AC_3115';
    idPredSinCartoAsignadoLayer = 'CARTO_PUNTO_CAMPO_7359_2477';

    webMapSubscription: Subscription;
    _graphicsIds: any;
    webMapData: any;
    _webmap = null;
    _portalUrl = 'https://js.arcgis.com/4.27/';
    _view = null;

    private webMapSubject = new BehaviorSubject<any>(null);
    private wievSubject = new BehaviorSubject<any>(null);
    constructor(
        private _fuseSplashScreenService: FuseSplashScreenService,
        private _widgetService: WidgetService,

    ) { }

    getWidget(ubigeo): void {
        this._widgetService.listWidget(ubigeo);
    }

    setWebMap(webMap: any): void {
        this._webmap = webMap;
        this.webMapSubject.next(this._webmap);
    }
    getWebMap(): Observable<any> {
        return this.webMapSubject.asObservable();
    }

    setWiev(view: any): void {
        this._view = view;
        this.wievSubject.next(this._view);
    }

    dataLoad(state: string, queryObject: string[], ubigeo: string ): Promise<any> {
        return new Promise (async (resolve, reject) => {
            try {
                const [ newQuery,query,esriConfig] = await loadModules([ 'esri/rest/support/Query','esri/rest/query','esri/config',]);
                esriConfig.portalUrl = this._portalUrl;
                // Url del servicio de cargas
                const urlCarga = 'https://ws.mineco.gob.pe/serverdf/rest/services/pruebas/carto_asignacion_carga/FeatureServer/0';

                // Realizamos el filtro
                const queryObjectPorAsignar = new newQuery();

                queryObjectPorAsignar.where = `UBIGEO = ${ubigeo} and ${state}`;
                queryObjectPorAsignar.outFields = queryObject;

                // indicamos que no queremos retornar datos de geometria
                queryObjectPorAsignar.returnGeometry = false;

                // query to feature layer
                query.executeQueryJSON(urlCarga, queryObjectPorAsignar)
                    .then((response)=> {
                        const data = response.features.map((feature, index) =>(
                            (state ==='ESTADO = "1"')
                            ?
                            ({
                                oid: feature.attributes.OBJECTID,
                                nro: index + 1,
                                codCarga: feature.attributes.COD_CARGA,
                                fecha: moment(feature.attributes.FEC_ENTREGA).format('DD-MM-YYYY'),
                            })
                            :
                            ({
                                oid: feature.attributes.OBJECTID,
                                nro: index + 1,
                                codCarga: feature.attributes.COD_CARGA,
                                fecha: moment(feature.attributes.FEC_ENTREGA).format('DD-MM-YYYY'),
                                codOperador: feature.attributes.COD_USUARIO,
                                operador: feature.attributes.NOM_USUARIO
                            })
                        ));
                        resolve(data);
                    })
                    .catch( error => reject(error));
            }
            catch (error) {
                console.log('EsriLoader: ', error);
            }
        });
    }

    deleteRow(workLoadData , currentUserUbigeo): Promise<any>{
        return new Promise (async (resolve, reject) => {
            try {
                const [ newQuery] = await loadModules([ 'esri/rest/support/Query',]);
                console.log(workLoadData, currentUserUbigeo,'here');
                const queryWorkLoad = new newQuery();
                        queryWorkLoad.where = `OBJECTID = ${workLoadData.oid} and ESTADO NOT IN ('0', '4')`;
                        queryWorkLoad.outFields = ['*'];
                        queryWorkLoad.returnGeometry = false;

                        this._webmap.findLayerById(this.idWorkLoadLayer).queryFeatures(queryWorkLoad)
                            .then((response) => {
                                if (response.features.length > 0) {
                                    const feature = response.features[0];
                                    feature.attributes.ESTADO = 0;
                                    return this._webmap.findLayerById(this.idWorkLoadLayer).applyEdits({ updateFeatures: [feature] });
                                }
                                return resolve(`No se encontró la carga ${workLoadData.codCarga} o fue eliminada con anterioridad`);
                            })
                            .then((response) => {
                                const updateFeatureResult = response.updateFeatureResults[0];
                                if (updateFeatureResult.error) {
                                    return reject(updateFeatureResult.error);
                                }
                                const queryTicket = new newQuery();
                                queryTicket.where = `ID_CARGA = '${currentUserUbigeo}${workLoadData.codCarga}' and ESTADO_V = '1'`;
                                queryTicket.outFields = ['*'];

                                return this._webmap.findTableById(this.idTicketLayer).queryFeatures(queryTicket);
                            })
                            .then((response) => {
                                if (response.features.length > 0) {
                                    const features = response.features;
                                    features.forEach((feature) => {
                                        feature.attributes.ESTADO_V = 0;
                                    });
                                    return this._webmap.findTableById(this.idTicketLayer).applyEdits({ updateFeatures: features });
                                }
                                return reject(`No se encontraron tickets registrados para la carga de trabajo ${workLoadData.codCarga}`);
                            })
                            .then((response) => {
                                const updateFeatureResult = response.updateFeatureResults;
                                for (const stateFeatureResult of updateFeatureResult) {
                                    if (stateFeatureResult.error) {
                                        console.log(stateFeatureResult);
                                    }
                                }
                                const queryPoint = new newQuery();
                                queryPoint.where = `ID_CARGA = '${currentUserUbigeo}${workLoadData.codCarga}'`;
                                queryPoint.outFields = ['*'];

                                return this._webmap.findLayerById(this.idFieldPointLayer).queryFeatures(queryPoint);
                            })
                            .then((response) => {
                                if (response.features.length > 0) {
                                    const features = response.features;
                                    features.forEach((feature) => {
                                        feature.attributes.Estado_tra = 1;
                                        feature.attributes.ID_CARGA = null;
                                    });
                                    return this._webmap.findLayerById(this.idFieldPointLayer).applyEdits({ updateFeatures: features });
                                }
                                return null;
                            })
                            .then((response) => {
                                if (response) {
                                    const updateFeatureResult = response.updateFeatureResults;
                                    for (const stateFeatureResult of updateFeatureResult) {
                                        if (stateFeatureResult.error) {
                                            console.log(stateFeatureResult);
                                        }
                                    }
                                }
                                const queryBlock = new newQuery();
                                queryBlock.where = `ID_CARGA = '${currentUserUbigeo}${workLoadData.codCarga}'`;
                                queryBlock.outFields = ['OBJECTID'];
                                queryBlock.returnGeometry = false;

                                return this._webmap.findLayerById(this.idFieldBlockLayer).queryFeatures(queryBlock);
                            })
                            .then((response) => {
                                console.log(response);
                                if (response.features.length > 0) {

                                    const features = response.features;

                                    return this._webmap.findLayerById(this.idFieldBlockLayer).applyEdits({ deleteFeatures: features });
                                }
                                return null;
                            })
                            .then(() => {
                                // refresh layers
                                // aqui debes usar el servicio siguiente
                                // this._stateService.triggerRefreshLayer(idPuntoImagenLayer)
                                this._webmap.findLayerById(this.idWorkLoadLayer).refresh();
                                this._webmap.findLayerById(this.idFieldPointLayer).refresh();
                                this._webmap.findLayerById(this.idFieldBlockLayer).refresh();
                                this._webmap.findLayerById(this.idPuntoImagenLayer).refresh();
                                this._webmap.findLayerById(this.idLotesSinPredioLayer).refresh();
                                this._webmap.findLayerById(this.idManzanaIneiLayer).refresh();
                                this._webmap.findLayerById(this.idManzanaPrediosLayer).refresh();
                                this._webmap.findLayerById(this.idPredioSinManzanaLayer).refresh();
                                this._webmap.findLayerById(this.idManzanaPuntoImagenLayer).refresh();
                                this._webmap.findLayerById(this.idPredSinCartoAsignadoLayer).refresh();
                                // Aqui confirma que se elimino la carga de trabajo
                                const responseMessage = 'Se eliminó la carga de trabajo ' + workLoadData.codCarga;
                                this.getWidget(currentUserUbigeo);
                                resolve(responseMessage);
                                //console.log(responseMessage, 'correcto');
                            })
                            .catch((err) => {
                                console.log(err, 'error here');
                                const responseMessage = 'No existe el codigo que desea eliminar ';
                                reject(responseMessage);
                                //throw new Error('Err:' + err?.error?.statusText);
                            });
            } catch (error) {
                console.log('EsriLoader: ', error);
            }
        });

    }

    zoomRow(unitData): Promise<any> {
        console.log(unitData.row.TIPO.toLowerCase(), 'unidsfd');
        return new Promise (async (resolve, reject) => {
            try {
                const [ newQuery] = await loadModules([ 'esri/rest/support/Query',]);
                this._fuseSplashScreenService.show(0);
                const queryUnitData = new newQuery();
                queryUnitData.returnGeometry = true;
                let layerId = this.idFieldBlockLayer;

                if (unitData.row.TIPO.toLowerCase() === 'manzana' && unitData.row.FUENTE.toLowerCase() === 'cf') {
                    queryUnitData.where = `ID_MZN_C = '${unitData.row.ID_MZN_C}' and UBIGEO = '${unitData.row.UBIGEO}'`;
                } else if (unitData.row.TIPO.toLowerCase() === 'manzana' && unitData.row.FUENTE.toLowerCase() === 'cfa') {
                    queryUnitData.where = `ID_MZN_C = '${unitData.row.ID_MZN_C}' and UBIGEO = '${unitData.row.UBIGEO}'`;
                } else if (unitData.row.TIPO.toLowerCase() === 'manzana' && unitData.row.FUENTE.toLowerCase() === 'eu') {
                    queryUnitData.where = `ID_MZN_C = '${unitData.row.ID_MZN_C}' and UBIGEO = '${unitData.row.UBIGEO}'`;
                } else if (unitData.row.TIPO.toLowerCase() === 'predio') {
                    queryUnitData.where = `COD_PRE = '${unitData.row.CODIGO}' and UBIGEO = '${unitData.row.UBIGEO}'`;
                    layerId = this.idPredioSinManzanaLayer;
                    console.log(layerId, 'layeriD');
                } else {
                    this._fuseSplashScreenService.hide();
                    return;
                }

                this._webmap.findLayerById(layerId).queryExtent(queryUnitData)
                    .then((response) => {
                        console.log(layerId, 'layeriDf');
                        if (response.extent) {
                            console.log(response.extent);
                            this._view.goTo(response.extent);
                        }
                        this._fuseSplashScreenService.hide();
                    }).catch((err) => {
                        console.log(err);
                        this._fuseSplashScreenService.hide();
                    });
            }
            catch (error) {
            console.log('EsriLoader: ', error);
            }
        });
    }

    zoomRowByNewWorkLoad(unitData): void {
        this._view.goTo(this._graphicsIds[unitData.oid]);
    }

    detailLoad(workLoadData: string, ubigeouser: string): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const [newQuery, query] = await loadModules(['esri/rest/support/Query', 'esri/rest/query']);

                const idDetailWorkLoadLayer = 'https://ws.mineco.gob.pe/serverdf/rest/services/pruebas/CAPAS_INSPECCION_AC/MapServer/5';
                const ubigeo = ubigeouser;

                const queryDetailWorkLoad = new newQuery();
                queryDetailWorkLoad.where = `ID_CARGA = '${ubigeo}${workLoadData}'`;
                queryDetailWorkLoad.outFields = ['*'];
                queryDetailWorkLoad.returnGeometry = false;

                query.executeQueryJSON(idDetailWorkLoadLayer, queryDetailWorkLoad)
                    .then((response: any) => {
                        if (response.features.length > 0) {
                            const dataTable = response.features.map((row: any) => row.attributes);
                            dataTable.forEach((item: any, index: number) => Object.assign(item, { nro: `${index + 1}` }));

                            resolve(dataTable);
                        } else {
                            reject(`No se encontró la carga ${workLoadData}`);
                        }
                    })
                    .catch((error: any) => {
                        reject(error);
                    });
            } catch (error) {
                reject('EsriLoader: ' + error);
            }
        });
    }


}


