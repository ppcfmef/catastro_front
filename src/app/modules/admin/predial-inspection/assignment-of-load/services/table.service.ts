import { Injectable, EventEmitter } from '@angular/core';
import { FuseSplashScreenService } from '@fuse/services/splash-screen';
import { loadModules } from 'esri-loader';
import moment from 'moment';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { WidgetService } from './widget.service';
import { OperatorService } from './operator.service';
import { MessageProviderService } from 'app/shared/services/message-provider.service';
import { environment } from 'environments/environment';
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
    _view = null;
    operator;

    public _row = new Subject();
    public _updateTable: Subject<boolean> = new Subject();
    public _newUbigeo: Subject<string> = new Subject();
    public searchBy = new Subject();
    public reloadTableAttended: EventEmitter<void> = new EventEmitter();
    private webMapSubject = new BehaviorSubject<any>(null);
    private wievSubject = new BehaviorSubject<any>(null);

    constructor(
        private _fuseSplashScreenService: FuseSplashScreenService,
        private _widgetService: WidgetService,
        private _operatorService: OperatorService,
        protected _messageProviderService: MessageProviderService,
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

    dataCount(state: string, ubigeo: string, filters?): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const [newQuery, query, esriConfig] = await loadModules(['esri/rest/support/Query', 'esri/rest/query', 'esri/config',]);
                // esriConfig.portalUrl = this._portalUrl;
                // Url del servicio de cargas
                const urlCarga = `${environment.apiUrlArcGisServer}/pruebas/carto_asignacion_carga/FeatureServer/0`;
                const urlUnidadesUrbanas = `${environment.apiUrlArcGisServer}/pruebas/CARTO_FISCAL/MapServer/6`;

                // Realizamos el filtro
                const queryObjectCount = new newQuery();
                const typeSearch: string = filters ? filters.type : '';
                const textValue: string = filters ? filters.search : '';
                const codeUrbanUnit: string = filters ? filters.cod : '';


                if (typeSearch === 'code' && textValue !== '') {
                    queryObjectCount.where = `UBIGEO = '${ubigeo}' and COD_CARGA = '${textValue}' and ${state}`;
                } else if (typeSearch === 'urban' && textValue !== '') {
                    const queryUrbanUnit = new newQuery();
                    queryUrbanUnit.where = `UBIGEO = '${ubigeo}' and COD_UU = '${codeUrbanUnit}'`;
                    queryUrbanUnit.outFields = ['*'];
                    queryUrbanUnit.returnGeometry = true;
                    const feature = await query.executeQueryJSON(urlUnidadesUrbanas, queryUrbanUnit);
                    const geometry = feature.features[0].geometry;
                    queryObjectCount.geometry = geometry;
                    queryObjectCount.spatialRelationship = 'intersects';
                    queryObjectCount.where = `${state}`;
                } else {
                    queryObjectCount.where = `UBIGEO = '${ubigeo}' and ${state}`;
                }

                // indicamos que no queremos retornar datos de geometria
                queryObjectCount.returnGeometry = false;

                // query to feature layer
                query.executeForCount(urlCarga, queryObjectCount)
                    .then((response) => {
                        resolve(response);
                    })
                    .catch(error => reject(error));
            }
            catch (error) {
                console.log('EsriLoader: ', error);
            }
        });
    }

    dataLoad(state: string, queryObject: string[], ubigeo: string, filters?, params?): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const [newQuery, query, esriConfig] = await loadModules(['esri/rest/support/Query', 'esri/rest/query', 'esri/config',]);
                // esriConfig.portalUrl = this._portalUrl;
                // Url del servicio de cargas
                const urlCarga = `${environment.apiUrlArcGisServer}/pruebas/carto_asignacion_carga/FeatureServer/0`;
                const urlUnidadesUrbanas = `${environment.apiUrlArcGisServer}/pruebas/CARTO_FISCAL/MapServer/6`;

                // Realizamos el filtro
                const queryObjectPorAsignar = new newQuery();
                const typeSearch: string = filters ? filters.type : '';
                const textValue: string = filters ? filters.search : '';
                const codeUrbanUnit: string = filters ? filters.cod : '';


                if (typeSearch === 'code' && textValue !== '') {
                    queryObjectPorAsignar.where = `UBIGEO = '${ubigeo}' and COD_CARGA = '${textValue}' and ${state}`;
                } else if (typeSearch === 'urban' && textValue !== '') {
                    const queryUrbanUnit = new newQuery();
                    queryUrbanUnit.where = `UBIGEO = '${ubigeo}' and COD_UU = '${codeUrbanUnit}'`;
                    queryUrbanUnit.outFields = ['*'];
                    queryUrbanUnit.returnGeometry = true;
                    const feature = await query.executeQueryJSON(urlUnidadesUrbanas, queryUrbanUnit);
                    const geometry = feature.features[0].geometry;
                    queryObjectPorAsignar.geometry = geometry;
                    queryObjectPorAsignar.spatialRelationship = 'intersects';
                    queryObjectPorAsignar.where = `${state}`;
                } else {
                    queryObjectPorAsignar.where = `UBIGEO = '${ubigeo}' and ${state}`;
                }

                queryObjectPorAsignar.outFields = queryObject;

                // indicamos que no queremos retornar datos de geometria
                queryObjectPorAsignar.returnGeometry = false;
                queryObjectPorAsignar.start = params.offset;
                queryObjectPorAsignar.num = params.limit;
                // query to feature layer

                const response = await query.executeQueryJSON(urlCarga, queryObjectPorAsignar);
                const data = response.features.map((feature, index) => (
                    (state === 'ESTADO = "1"')
                        ?
                        ({
                            oid: feature.attributes.OBJECTID,
                            nro: index + 1,
                            codCarga: feature.attributes.COD_CARGA,
                            fecha: moment.utc(feature.attributes.FEC_ENTREGA).format('DD-MM-YYYY'),
                        })
                        :
                        ({
                            oid: feature.attributes.OBJECTID,
                            nro: index + 1,
                            codCarga: feature.attributes.COD_CARGA,
                            fecha: moment.utc(feature.attributes.FEC_ENTREGA).format('DD-MM-YYYY'),
                            codOperador: feature.attributes.COD_USUARIO,
                            operador: feature.attributes.NOM_USUARIO
                        })
                ));
                resolve(data);

            }
            catch (error) {
                console.log('EsriLoader: ', error);
            }
        });
    }

    deletePendingTickets(codWorkLoad, currentUserUbigeo): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const [newQuery] = await loadModules(['esri/rest/support/Query',]);

                const queryTicket = new newQuery();
                queryTicket.where = `ID_CARGA = '${currentUserUbigeo}${codWorkLoad}' and ESTADO_V = '1' and ESTADO IN ('3', '4')`;
                queryTicket.outFields = ['*'];
                queryTicket.returnGeometry = false;

                const predios = [];
                const manzanas = [];

                const ticketsResponse = await this._webmap.findTableById(this.idTicketLayer).queryFeatures(queryTicket);
                if (ticketsResponse.features.length > 0) {
                    const featuresTicket = ticketsResponse.features;
                    featuresTicket.forEach((feature) => {
                        feature.attributes.ESTADO_V = 0;
                        if (feature.attributes.COD_TIPO_TICKET === '1' || feature.attributes.COD_TIPO_TICKET === '5') {
                            predios.push(feature.attributes.ID_ENTIDAD.slice(6,));
                        }
                        // else if (feature.attributes.COD_TIPO_TICKET === '4') {
                        //     manzanas.push(feature.attributes.ID_ENTIDAD.slice(6,));
                        // }
                    });
                    const updateTicketResponse = await this._webmap.findTableById(this.idTicketLayer).applyEdits({ updateFeatures: featuresTicket });

                    const updateFeatureResult = updateTicketResponse.updateFeatureResults;
                    for (const stateFeatureResult of updateFeatureResult) {
                        if (stateFeatureResult.error) {
                            console.log(stateFeatureResult);
                        }
                    }
                }



                if (predios.length > 0) {
                    const queryPoint = new newQuery();
                    // queryPoint.where = `COD_PRE IN ('${predios.join("', '")}') and ID_CARGA = '${currentUserUbigeo}${codWorkLoad}'`;
                    queryPoint.where = 'COD_PRE IN (\'' + predios.join('\', \'') + '\') and ID_CARGA = \'' + currentUserUbigeo + codWorkLoad + '\'';
                    queryPoint.outFields = ['*'];
                    queryPoint.returnGeometry = false;

                    const responsePoint = await this._webmap.findLayerById(this.idFieldPointLayer).queryFeatures(queryPoint);
                    if (responsePoint.features.length > 0) {
                        const featuresPredios = responsePoint.features;
                        featuresPredios.forEach((feature) => {
                            feature.attributes.Estado_tra = 1;
                            feature.attributes.ID_CARGA = null;
                        });

                        const updatePointResponse = await this._webmap.findLayerById(this.idFieldPointLayer).applyEdits({ updateFeatures: featuresPredios });

                        const updateFeatureResult = updatePointResponse.updateFeatureResults;
                        for (const stateFeatureResult of updateFeatureResult) {
                            if (stateFeatureResult.error) {
                                console.log(stateFeatureResult);
                            }
                        }
                    }
                }

                const queryTicketResult = new newQuery();
                queryTicketResult.where = `ID_CARGA = '${currentUserUbigeo}${codWorkLoad}' and ESTADO_V = '1'`;
                queryTicketResult.outFields = ['ID_MZN_C'];
                queryTicketResult.returnGeometry = false;

                const responseTicketResult = await this._webmap.findTableById(this.idTicketLayer).queryFeatures(queryTicketResult);

                if (responseTicketResult.features.length > 0) {
                    const features = responseTicketResult.features;
                    features.forEach((feature) => {
                        manzanas.push(feature.attributes.ID_MZN_C);
                    });
                }


                if (manzanas.length > 0) {
                    const queryBlock = new newQuery();
                    // queryBlock.where = `ID_MZN_C NOT IN ('${manzanas.join("', '")}') and ID_CARGA = '${currentUserUbigeo}${codWorkLoad}'`;
                    queryBlock.where = 'ID_MZN_C NOT IN (\'' + manzanas.join('\', \'') + '\') and ID_CARGA = \'' + currentUserUbigeo + codWorkLoad + '\'';

                    queryBlock.outFields = ['OBJECTID'];
                    queryBlock.returnGeometry = false;

                    const responseBlock = await this._webmap.findLayerById(this.idFieldBlockLayer).queryFeatures(queryBlock);

                    if (responseBlock.features.length > 0) {

                        const featuresBlock = responseBlock.features;

                        const deleteBlockIneiResponse = await this._webmap.findLayerById(this.idFieldBlockLayer).applyEdits({ deleteFeatures: featuresBlock });

                        const deleteFeatureResult = deleteBlockIneiResponse.deleteFeatureResults;
                        for (const stateFeatureResult of deleteFeatureResult) {
                            if (stateFeatureResult.error) {
                                console.log(stateFeatureResult);
                            }
                        }
                    }
                }

                const queryWorkLoad = new newQuery();
                queryWorkLoad.where = `ID_CARGA = '${currentUserUbigeo}${codWorkLoad}'`;
                queryWorkLoad.outFields = ['*'];
                queryWorkLoad.returnGeometry = false;

                const responseWorkLoad = await this._webmap.findLayerById(this.idWorkLoadLayer).queryFeatures(queryWorkLoad);

                if (responseWorkLoad.features.length > 0) {
                    const featureWorkload = responseWorkLoad.features[0];
                    featureWorkload.attributes.ESTADO = 4;

                    const updateWorkLoadResponse = await this._webmap.findLayerById(this.idWorkLoadLayer).applyEdits({ updateFeatures: [featureWorkload] });

                    const updateWorkloadResult = updateWorkLoadResponse.updateFeatureResults[0];
                    if (updateWorkloadResult.error) {
                        console.log(updateWorkloadResult.error);
                    }

                }
                const responseMessage = 'Se eliminaron los tickets pendientes de la carga de trabajo ' + codWorkLoad;
                this.getWidget(currentUserUbigeo);
                this._updateTable.next(true);
                resolve(responseMessage);

            } catch (err) {
                console.log(err, 'error here');
                const responseMessage = 'Ocurrio un error al intentar eliminar los tickets pendientes de la carga de trabajo ' + codWorkLoad;
                reject(responseMessage);
                //throw new Error('Err:' + err?.error?.statusText);
            }
        });
    }

    deleteRow(workLoadData, currentUserUbigeo): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const [newQuery] = await loadModules(['esri/rest/support/Query',]);
                // console.log(workLoadData, currentUserUbigeo, 'here');
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

    hasAttendedTickets(codWorkLoad, currentUserUbigeo): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const [newQuery] = await loadModules(['esri/rest/support/Query',]);
                const queryTicket = new newQuery();
                queryTicket.where = `ID_CARGA = '${currentUserUbigeo}${codWorkLoad}' and ESTADO NOT IN ('1', '2', '3', '4') AND ESTADO_V = '1'`;
                queryTicket.outFields = ['*'];

                this._webmap.findTableById(this.idTicketLayer).queryFeatures(queryTicket)
                    .then((response) => {
                        if (response.features.length > 0) {
                            return resolve(true);
                        }
                        return resolve(false);
                    })
                    .catch((err) => {
                        console.log(err);
                        reject(err);
                    });
            } catch (error) {
                console.log('EsriLoader: ', error);
            }
        });
    }

    async reloadLayersAfterDelete(): Promise<void> {
        await this._webmap.findLayerById(this.idWorkLoadLayer).refresh();
        await this._webmap.findLayerById(this.idFieldPointLayer).refresh();
        await this._webmap.findLayerById(this.idFieldBlockLayer).refresh();
        await this._webmap.findLayerById(this.idPuntoImagenLayer).refresh();
        await this._webmap.findLayerById(this.idLotesSinPredioLayer).refresh();
        await this._webmap.findLayerById(this.idManzanaIneiLayer).refresh();
        await this._webmap.findLayerById(this.idManzanaPrediosLayer).refresh();
        await this._webmap.findLayerById(this.idPredioSinManzanaLayer).refresh();
        await this._webmap.findLayerById(this.idManzanaPuntoImagenLayer).refresh();
        await this._webmap.findLayerById(this.idPredSinCartoAsignadoLayer).refresh();
    }

    zoomRow(unitData): Promise<any> {
        console.log(unitData.row.TIPO.toLowerCase(), 'unidsfd');
        return new Promise(async (resolve, reject) => {
            try {
                this._fuseSplashScreenService.show();
                const [newQuery] = await loadModules(['esri/rest/support/Query',]);

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

                const response = await this._webmap.findLayerById(layerId).queryExtent(queryUnitData);
                if (response.extent) {
                    this._view.goTo(response.extent);
                }
                this._fuseSplashScreenService.hide();

            }
            catch (error) {
                this._fuseSplashScreenService.hide();
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

                const idDetailWorkLoadLayer = `${environment.apiUrlArcGisServer}/pruebas/CAPAS_INSPECCION_AC/MapServer/5`;
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


    fechaLoad(codWorkload: string, ubigeouser: string): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const [newQuery, query] = await loadModules(['esri/rest/support/Query', 'esri/rest/query']);

                const urlWorkLoad = `${environment.apiUrlArcGisServer}/pruebas/carto_asignacion_carga/FeatureServer/0`;
                const ubigeo = ubigeouser;

                // @process
                const dqueryWorkLoad = new newQuery();
                dqueryWorkLoad.where = `UBIGEO = '${ubigeo}' AND COD_CARGA = ${codWorkload}`;
                dqueryWorkLoad.outFields = ['*'];
                dqueryWorkLoad.returnGeometry = false;
                dqueryWorkLoad.where = `UBIGEO = '${ubigeo}' AND COD_CARGA = ${codWorkload}`;
                dqueryWorkLoad.outFields = ['*'];
                dqueryWorkLoad.returnGeometry = false;

                query.executeQueryJSON(urlWorkLoad, dqueryWorkLoad)
                    .then((response) => {
                        let dateLimit = '';
                        if (response.features.length > 0) {
                            dateLimit = moment.utc(response.features[0].attributes.FEC_ENTREGA).format('YYYY-MM-DD');
                        }
                        return resolve(dateLimit);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            } catch (error) {
                reject('EsriLoader: ' + error);
            }
        });
    }

    getListUrbantUnit(ubigeo): Promise<string> {
        return new Promise(async (resolve, reject) => {
            const [newQuery, query] = await loadModules(['esri/rest/support/Query', 'esri/rest/query']);
            const urlUrbanUnits = `${environment.apiUrlArcGisServer}/pruebas/CARTO_FISCAL/MapServer/6`;

            // @process

            const queryUnitsUrban = new newQuery();
            queryUnitsUrban.where = `UBIGEO = '${ubigeo}'`;
            queryUnitsUrban.outFields = ['*'];
            queryUnitsUrban.returnGeometry = false;

            query.executeQueryJSON(urlUrbanUnits, queryUnitsUrban)
                .then((response) => {
                    if (response.features.length > 0) {
                        const urbanUnitsList = response.features.map(row => ({ cod: row.attributes.COD_UU, name: row.attributes.NOM_UU }));
                        return resolve(urbanUnitsList);
                    }
                    return resolve(`No se encontraron unidades urbanas para el distrito ${ubigeo} `);
                })
                .catch((error) => {
                    // Aqui se muestran los posibles errores; esto solo debe imprimirse; puede pasar
                    // que un distrito no tenga unidades urbanas
                    console.log(error);
                    reject(error);
                });
        });

    }

    getDataByWorkLoad(ubigeo, codWorkload): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const [newQuery, query, esriConfig] = await loadModules(['esri/rest/support/Query', 'esri/rest/query', 'esri/config',]);
                // esriConfig.portalUrl = this._portalUrl;
                const urlWorkLoad = `${environment.apiUrlArcGisServer}/pruebas/carto_asignacion_carga/FeatureServer/0`;
                const urlStatsUser = `${environment.apiUrlArcGisServer}/pruebas/CAPAS_INSPECCION_AC/MapServer/7`;

                // @process
                const queryWorkLoad = new newQuery();
                queryWorkLoad.where = `UBIGEO = '${ubigeo}' AND COD_CARGA = '${codWorkload}'`;
                queryWorkLoad.outFields = ['*'];
                queryWorkLoad.returnGeometry = false;

                const result = {
                    codCarga: codWorkload,
                    user: {},
                    dateLimit: null,
                };
                const dataWorkLoad = await query.executeQueryJSON(urlWorkLoad, queryWorkLoad);
                if (dataWorkLoad.features.length === 0) {
                    return reject(`No se encontró la carga ${codWorkload} para el distrito ${ubigeo} `);
                }

                const attributes = dataWorkLoad.features[0].attributes;
                result.dateLimit = moment.utc(attributes.FEC_ENTREGA).format('YYYY-MM-DD');

                if (attributes.COD_USUARIO) {
                    result.user = await this._operatorService.getOperatorById(attributes.COD_USUARIO).toPromise();
                    // this._operatorService.getOperatorById(attributes.COD_USUARIO).subscribe(async (data: IOperator) => {
                    //     result.user = data;

                    // });
                    const queryStatsUser = new newQuery();
                    queryStatsUser.where = `UBIGEO = '${ubigeo}' AND COD_USUARIO = '${result.user['id']}'`;
                    queryStatsUser.outFields = ['*'];
                    queryStatsUser.returnGeometry = false;
                    const dataStatsUser = await query.executeQueryJSON(urlStatsUser, queryStatsUser);
                    let statsUser = {
                        pending: 0,
                        attended: 0
                    };
                    if (dataStatsUser.features.length > 0) {
                        statsUser = {
                            pending: dataStatsUser.features[0].attributes.PENDIENTE,
                            attended: dataStatsUser.features[0].attributes.ATENDIDO
                        };
                    }
                    result.user['statsUser'] = statsUser;
                }
                return resolve(result);
            } catch (error) {
                reject(error);
            }

        });
    }

    async assigmentOperator(operator, nameOperator, workload, dateLimit, ubigeo): Promise<void> {
        this._fuseSplashScreenService.show();
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

            const dataWorkLoad = await this._webmap.findLayerById(idWorkLoadLayer).queryFeatures(queryWorkLoad);
            if (dataWorkLoad.features.length === 0) {
                return Promise.reject(`No se encontró la carga ${workload} para el distrito ${ubigeo} `);
            }

            const featuresWorkLoad = dataWorkLoad.features;
            featuresWorkLoad.forEach((feature) => {
                feature.attributes.ESTADO = workLoadStatus;
                feature.attributes.COD_USUARIO = operator;
                feature.attributes.NOM_USUARIO = nameOperator;
                feature.attributes.FEC_ENTREGA = dateLimit;
            });

            const resultUpdateWorkload = await this._webmap.findLayerById(idWorkLoadLayer).applyEdits({ updateFeatures: featuresWorkLoad });

            const updateFeatureResult = resultUpdateWorkload.updateFeatureResults[0];
            if (updateFeatureResult.error) {
                return Promise.reject(`Ocurrio un error al asignar el usuario ${nameOperator} a la carga de trabajo ${workload}\n${updateFeatureResult.error}`);
            }

            const queryTicket = new newQuery();
            queryTicket.where = `ID_CARGA = '${ubigeo}${workload}'`;
            queryTicket.outFields = ['*'];
            queryTicket.returnGeometry = false;
            const dataTicket = await this._webmap.findTableById(idTicketLayer).queryFeatures(queryTicket);

            const featuresTicket = dataTicket.features;
            featuresTicket.forEach((feature) => {
                feature.attributes.ESTADO = ticketStatus;
                feature.attributes.COD_USUARIO = operator;
                feature.attributes.FEC_ASIGNACION = dateUpdate;
                feature.attributes.FEC_ULTIMA_ACTUALIZACION = dateUpdate;
                feature.attributes.FEC_ENTREGA = dateLimit;
                feature.attributes.NOM_USUARIO = nameOperator;
            });

            const resultUpdateTicket = await this._webmap.findTableById(idTicketLayer).applyEdits({ updateFeatures: featuresTicket });

            const updateFeatureResultTicket = resultUpdateTicket.updateFeatureResults;

            for (const stateFeatureResult of updateFeatureResultTicket) {
                if (stateFeatureResult.error) {
                    console.log(stateFeatureResult);
                }
            }

            const queryObjectBlock = new newQuery();
            queryObjectBlock.where = `ID_CARGA = '${ubigeo}${workload}'`;
            queryObjectBlock.outFields = ['*'];
            queryObjectBlock.returnGeometry = false;
            const dataObjectBlock = await this._webmap.findLayerById(idFieldBlockLayer).queryFeatures(queryObjectBlock);

            if (dataObjectBlock.features.length > 0) {
                const featuresObjectBlock = dataObjectBlock.features;
                featuresObjectBlock.forEach((feature) => {
                    feature.attributes.Estado_tra = ticketStatus;
                });

                const resultUpdateObjectBlock = await this._webmap.findLayerById(idFieldBlockLayer).applyEdits({ updateFeatures: featuresObjectBlock });

                const updateFeatureResultObjectBlock = resultUpdateObjectBlock.updateFeatureResults;

                for (const stateFeatureResult of updateFeatureResultObjectBlock) {
                    if (stateFeatureResult.error) {
                        console.log(stateFeatureResult);
                    }
                }
            }

            const queryObjectPred = new newQuery();
            queryObjectPred.where = `ID_CARGA = '${ubigeo}${workload}'`;
            queryObjectPred.outFields = ['*'];
            queryObjectPred.returnGeometry = false;
            const dataObjectPred = await this._webmap.findLayerById(idFieldPointLayer).queryFeatures(queryObjectPred);

            if (dataObjectPred.features.length > 0) {
                const featuresObjectPred = dataObjectPred.features;
                featuresObjectPred.forEach((feature) => {
                    feature.attributes.Estado_tra = ticketStatus;
                });

                const resultUpdateObjectPred = await this._webmap.findLayerById(idFieldPointLayer).applyEdits({ updateFeatures: featuresObjectPred });

                const updateFeatureResultObjectPred = resultUpdateObjectPred.updateFeatureResults;

                for (const stateFeatureResult of updateFeatureResultObjectPred) {
                    if (stateFeatureResult.error) {
                        console.log(stateFeatureResult);
                    }
                }
            }

            const respt = (`Se ${operator ? 'asigno' : 'desasigno'} el usuario a la carga de trabajo ${workload}`);
            this._updateTable.next(true);
            this.getWidget(ubigeo);
            this._messageProviderService.showSnack(respt);
            this._fuseSplashScreenService.hide();
        }
        catch (error) {
            console.log(error);
            this._messageProviderService.showSnackError('Ocurrio un error al desasignar el operador');
            this._fuseSplashScreenService.hide();
            // console.log('EsriLoader: ', error);
            // this._fuseSplashScreenService.hide();
        }
    }
}
