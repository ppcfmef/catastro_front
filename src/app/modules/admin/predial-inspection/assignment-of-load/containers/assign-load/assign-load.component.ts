/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/naming-convention */
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StateService } from '../../services/state.service';
import { UserService } from 'app/core/user/user.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription, Subject } from 'rxjs';
import { User } from 'app/core/user/user.types';
import { FuseSplashScreenService } from '@fuse/services/splash-screen';
import { takeUntil } from 'rxjs/operators';
import { loadModules } from 'esri-loader';
import { PassThrough } from 'stream';
import { tick } from '@angular/core/testing';
import { IdataLoad } from '../../interfaces/dataload.interface';




@Component({
    selector: 'app-assign-load',
    templateUrl: './assign-load.component.html',
    styleUrls: ['./assign-load.component.scss'],
})
export class AssignLoadComponent implements OnInit, AfterViewInit {

    _currentUserUbigeo: string;
    _queryUbigeo: string;
    _field_ubigeo = 'UBIGEO';
    _unsubscribeAll: Subject<any> = new Subject<any>();
    tableData: IdataLoad[];
    webMapData: any;
    graphicsIdsData: any;
    ubigeoSubscription: Subscription;
    tableDataSubscription: Subscription;
    webMapSubscription: Subscription;
    graphicsIdSubscription: Subscription;
    user: boolean = true;
    cards = [
        {
            num: 21,
            text: 'MANZANAS ASIGNADAS ACTUALMENTE'
        },
        {
            num: 25,
            text: 'TICKETS ATENDIDOS'
        }
    ];
    form: FormGroup;


    constructor(
        private _router: Router,
        private route: ActivatedRoute,
        private _stateService: StateService,
        private _userService: UserService,
        protected _fuseSplashScreenService: FuseSplashScreenService,
    ) {
        this.form = new FormGroup({
            loadName: new FormControl(''),
            description: new FormControl('')
        });

    }

    ngOnInit(): void {
        this._userService.user$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((user: User) => {
                // @SETUBIGEO
                this._currentUserUbigeo = user.ubigeo ? user.ubigeo : '040703';
                this._queryUbigeo = `${this._field_ubigeo} = '${this._currentUserUbigeo}'`;
            });

        // Suscríbete al BehaviorSubject para datos de la tabla
        this.tableDataSubscription = this._stateService.getTableData().subscribe((data: IdataLoad[]) => {
            this.tableData = data;
        });

        this.webMapSubscription = this._stateService.getWebMap().subscribe((webMap) => {
            this.webMapData = webMap;
        });

        this.graphicsIdSubscription = this._stateService.getGraphicsId().subscribe((graphicsId) => {
            this.graphicsIdsData = graphicsId;
        });


    }

    ngAfterViewInit(): void {
    }

    redirecto(): void {
        console.log('redirect');
        this._router.navigate(['../'],{ relativeTo: this.route });
        this._stateService.state.emit(false);

    }

    async createWorkLoad() {
        // params
        const dataWorkLoad = this.tableData;
        const nameWorkLoad = this.form.value.loadName;
        const descWorlLoad = this.form.value.description;
        const ubigeo = this._currentUserUbigeo;
        const graphicsId = this.graphicsIdsData;
        const webMap = this.webMapData;
        const dateWorkLoad = new Date(2023, 7, 17).valueOf(); // Reemplazar cuando se tenga el servicio de operador de campo
        const codUserWorkLoad = '57';  // Reemplazar cuando se tenga el servicio de operador de campo
        const nomUserWorkLoad = 'defaultUser';  // Reemplazar cuando se tenga el servicio de operador de campo
        const id_mz_pred = 'CAPAS_INSPECCION_AC_1236';
        const id_carga = 'carto_asignacion_carga_8124';
        const id_predios = 'CARTO_PUNTO_CAMPO_4985';
        const id_lotes_sin_predio = 'CAPAS_INSPECCION_AC_3266';
        const id_punto_imagen = 'CAPAS_INSPECCION_AC_3611';
        const id_mz_inei = 'CAPAS_INSPECCION_AC_3891';
        const id_ticket = 'carto_asignacion_carga_9869';
        const mz_asignadas = 'CARTO_MANZANA_CAMPO_3194';
        const id_predio_sin_mz = 'CARTO_PUNTO_CAMPO_7359';
        const id_mz_pimg = 'CAPAS_INSPECCION_AC_3115';
        const idPredSinCartoAsignadoLayer = 'CARTO_PUNTO_CAMPO_7359_2477';
        let cod_carga = null;

        const stateCarga = codUserWorkLoad ? 2 : 1;
        const stateTicket = codUserWorkLoad ? 3 : 2;


        try {
            const [
                Query,
                query,
                Extent,
                webMercatorUtils,
                Graphic,
                Polygon
                // esriConfig
            ] = await loadModules([
                'esri/rest/support/Query',
                'esri/rest/query',
                'esri/geometry/Extent',
                'esri/geometry/support/webMercatorUtils',
                'esri/Graphic',
                'esri/geometry/Polygon'
                // 'esri/config',
            ]);
            this._fuseSplashScreenService.show(0);


            let xmin = Infinity;
            let ymin = Infinity;
            let xmax = -Infinity;
            let ymax = -Infinity;

            // check graphicsId is null
            if (graphicsId === null) {
                this._fuseSplashScreenService.hide();
                return;
            }

            // check graphicsId is empty
            if (Object.keys(graphicsId).length === 0) {
                this._fuseSplashScreenService.hide();
                return;
            }
            for (const key in graphicsId) {
                if (graphicsId.hasOwnProperty(key)) {
                    const graphic = graphicsId[key];
                    let extent = { xmin: 0, ymin: 0, xmax: 0, ymax: 0 };
                    if (graphic.geometry.type === 'point') {
                        extent = {
                            xmin: graphic.geometry.x - 5,
                            ymin: graphic.geometry.y - 5,
                            xmax: graphic.geometry.x + 5,
                            ymax: graphic.geometry.y + 5,
                        };
                    } else {
                        extent = graphic.geometry.extent;
                    }

                    xmin = Math.min(xmin, extent.xmin);
                    ymin = Math.min(ymin, extent.ymin);
                    xmax = Math.max(xmax, extent.xmax);
                    ymax = Math.max(ymax, extent.ymax);
                }
            }

            const fullExtent = new Extent({
                xmin: xmin,
                ymin: ymin,
                xmax: xmax,
                ymax: ymax,
                spatialReference: 102100
            });

            const fullExtent_g = webMercatorUtils.webMercatorToGeographic(fullExtent);

            const queryCarga = new Query();
            queryCarga.where = this._queryUbigeo;
            queryCarga.outStatistics = [{
                onStatisticField: 'COD_CARGA',
                outStatisticFieldName: 'resultado',
                statisticType: 'max'
            }];


            const getAttributesByWorkLoad = (response) => {
                cod_carga = response.features[0].attributes.resultado;
                if (!cod_carga) {
                    cod_carga = '00000';
                }
                let cod_carga_int = parseInt(cod_carga, 10);
                cod_carga_int = cod_carga_int + 1;
                cod_carga = cod_carga_int.toString().padStart(5, '0');

                const graphics = [];
                const graphic = new Graphic();
                graphic.attributes = {
                    ID_CARGA: `${ubigeo}${cod_carga}`,
                    COD_CARGA: cod_carga,
                    COD_USUARIO: codUserWorkLoad,
                    NOM_CARGA: nameWorkLoad,
                    DESCRIP: descWorlLoad,
                    FEC_ENTREGA: dateWorkLoad,
                    ESTADO: stateCarga,
                    UBIGEO: ubigeo,
                    XMIN: fullExtent_g.xmin,
                    YMIN: fullExtent_g.ymin,
                    XMAX: fullExtent_g.xmax,
                    YMAX: fullExtent_g.ymax,
                    NOM_USUARIO: nomUserWorkLoad
                };
                graphic.geometry = Polygon.fromExtent(fullExtent_g);
                graphics.push(graphic);
                return graphics;
            };


            webMap.findLayerById(id_carga).queryFeatures(queryCarga)
                .then(response => getAttributesByWorkLoad(response))
                .then(graphics => webMap.findLayerById(id_carga).applyEdits({ addFeatures: graphics }))
                .then(async (add, update, del) => {

                    const allPromises = [];
                    const orderPromises = [];
                    const prediosSinManzana = [];
                    for (const key of dataWorkLoad) {
                        if (key.tipo.toLowerCase() === 'manzana') {
                            switch (key.fuente) {
                                case 'CF':
                                    const queryCFPSG = new Query();
                                    queryCFPSG.where = webMap.findLayerById(id_predios).definitionExpression;
                                    queryCFPSG.outFields = ['*'];
                                    queryCFPSG.returnGeometry = true;
                                    queryCFPSG.geometry = graphicsId[key.oid].geometry;
                                    queryCFPSG.spatialRelationship = 'intersects';
                                    const promiseCF = webMap.findLayerById(id_predios).queryFeatures(queryCFPSG);
                                    allPromises.push(promiseCF);
                                    orderPromises.push({ type: 'CF', idmz: key.oid });

                                    const queryCFLSP = new Query();
                                    queryCFLSP.where = webMap.findLayerById(id_lotes_sin_predio).definitionExpression;
                                    queryCFLSP.outFields = ['*'];
                                    queryCFLSP.returnGeometry = true;
                                    queryCFLSP.geometry = graphicsId[key.oid].geometry;
                                    queryCFLSP.spatialRelationship = 'intersects';
                                    const promiseCFLSP = webMap.findLayerById(id_lotes_sin_predio).queryFeatures(queryCFLSP);
                                    allPromises.push(promiseCFLSP);
                                    orderPromises.push({ type: 'CFP', idmz: key.oid });

                                    break;
                                case 'CFA':
                                    const queryCFAPI = new Query();
                                    queryCFAPI.where = webMap.findLayerById(id_punto_imagen).definitionExpression;
                                    queryCFAPI.outFields = ['*'];
                                    queryCFAPI.returnGeometry = true;
                                    queryCFAPI.geometry = graphicsId[key.oid].geometry;
                                    queryCFAPI.spatialRelationship = 'intersects';
                                    const promiseCFAPI = webMap.findLayerById(id_punto_imagen).queryFeatures(queryCFAPI);
                                    allPromises.push(promiseCFAPI);
                                    orderPromises.push({ type: 'CFA', idmz: key.oid });
                                    break;
                                case 'EU':
                                    const queryEUMSL = new Query();
                                    queryEUMSL.where = webMap.findLayerById(id_mz_inei).definitionExpression;
                                    queryEUMSL.outFields = ['*'];
                                    orderPromises.push({ type: 'EU', idmz: key.oid });
                                    break;
                            }
                        } else {
                            prediosSinManzana.push(key);
                        }
                    }
                    const data = await Promise.all(allPromises);
                    return [data, orderPromises, prediosSinManzana];
                })
                .then(async (results) => {
                    const data = results[0];
                    const order = results[1];
                    const prediosSinManzana = results[2];

                    const tickets = [];
                    let controller = 0;


                    order.map((key, index) => {
                        if (data[index].features.length === 0) {
                            return null;
                        }
                        for (const row of data[index].features) {
                            controller = controller + 1;
                            // row = data[index].features[0].attributes
                            const ticket = {
                                COD_TICKET: `G${ubigeo}${cod_carga}${controller.toString().padStart(3, '0')}`,
                                ID_CARGA: `${ubigeo}${cod_carga}`,
                                ESTADO: stateTicket,
                                COD_USUARIO: codUserWorkLoad,
                                UBIGEO: ubigeo,
                                FEC_ASIGNACION: dateWorkLoad,
                                FEC_ULTIMA_ACTUALIZACION: new Date().valueOf(),
                                ID_MZN_C: key.idmz,
                                COD_EST_ENVIO_TICKET: 0,
                                ESTADO_V:'1',
                            };
                            switch (key.type) {
                                case 'CF':
                                    ticket['ID_ENTIDAD'] = `${ubigeo}${row.attributes.COD_PRE}`;
                                    ticket['TIPO'] = row.attributes.Cod_Tipo_Ticket;
                                    ticket['COD_TIPO_TICKET'] = row.attributes.Cod_Tipo_Ticket === '5' ? 'Predio subvaluado' : 'Predio sin georreferenciacion';
                                    ticket['OBS_TICKET_GABINETE'] = row.OBSERVACION;
                                    ticket['COD_PRE'] = row.attributes.COD_PRE;
                                    tickets.push({ attributes: ticket, geometry: null });
                                    break;
                                case 'CFP':
                                    ticket['ID_ENTIDAD'] = row.attributes.ID_LOTE;
                                    ticket['TIPO'] = 'Punto Lote sin predios';
                                    ticket['COD_TIPO_TICKET'] = '2';
                                    ticket['OBS_TICKET_GABINETE'] = 'Punto Lote sin predios';
                                    tickets.push({ attributes: ticket, geometry: null });
                                    break;
                                case 'CFA':
                                    ticket['ID_ENTIDAD'] = row.attributes.ID_IMG;
                                    ticket['TIPO'] = 'Punto imagen';
                                    ticket['COD_TIPO_TICKET'] = '3';
                                    ticket['OBS_TICKET_GABINETE'] = 'Punto imagen';
                                    tickets.push({ attributes: ticket, geometry: null });
                                    break;
                                case 'EU':
                                    ticket['ID_ENTIDAD'] = `E${ubigeo}${row.attributes.ID_MZN_C}`;
                                    ticket['TIPO'] = 'Manzana sin lotes';
                                    ticket['COD_TIPO_TICKET'] = '4';
                                    ticket['OBS_TICKET_GABINETE'] = 'Manzana sin lotes';
                                    tickets.push({ attributes: ticket, geometry: null });
                                    break;
                            }
                        }
                    });

                    prediosSinManzana.map((key) => {
                        controller = controller + 1;
                        const ticket = {
                            COD_TICKET: `G${ubigeo}${cod_carga}${controller.toString().padStart(3, '0')}`,
                            ID_ENTIDAD: `${ubigeo}${key.codigo}`,
                            ID_CARGA: `${ubigeo}${cod_carga}`,
                            ESTADO: stateTicket,
                            TIPO: 'Predios sin georreferenciacion',
                            COD_TIPO_TICKET: '1',
                            COD_USUARIO: codUserWorkLoad,
                            UBIGEO: ubigeo,
                            OBS_TICKET_GABINETE: 'Predios sin georreferenciacion',
                            FEC_ASIGNACION: dateWorkLoad,
                            FEC_ULTIMA_ACTUALIZACION: new Date().valueOf(),
                            ID_MZN_C: '9999',
                            COD_EST_ENVIO_TICKET: 0,
                            COD_PRE: key.codigo
                        };
                        tickets.push({ attributes: ticket, geometry: null });
                    });
                    const applyEdistsTickets = await webMap.findTableById(id_ticket).applyEdits({ addFeatures: tickets });
                    return { edits: applyEdistsTickets, tickets: tickets };
                })
                .then((results) => {
                    const applyEdistsTickets = results.edits;
                    const tickets = results.tickets;
                    const prediosTickets = tickets.reduce((acc, ticket) => {
                        if (ticket.attributes.COD_TIPO_TICKET === '1') {
                            acc.push(ticket.attributes.COD_PRE);
                        }
                        return acc;
                    }, []);
                    const queryPredios = new Query();
                    queryPredios.where = `UBIGEO = '${ubigeo}' and COD_PRE in ('${prediosTickets.join('\',\'')}')`;
                    queryPredios.outFields = ['*'];
                    queryPredios.returnGeometry = true;
                    return webMap.findLayerById(id_predios).queryFeatures(queryPredios);
                })
                .then((response) => {
                    const predioUpdateData = response.features.map(row => ({
                            attributes: {
                                OBJECTID: row.attributes.OBJECTID,
                                Estado_tra: stateTicket,
                                ID_CARGA: `${ubigeo}${cod_carga}`
                            }
                        }));

                    return webMap.findLayerById(id_predios).applyEdits({ updateFeatures: predioUpdateData });
                })
                .then((response) => {
                    console.log(response);
                    const graphics = [];
                    for (const key in graphicsId) {
                        if (graphicsId[key].geometry.type === 'polygon') {
                            const graphic = new Graphic();
                            graphic.attributes = {
                                ID_CARGA: `${ubigeo}${cod_carga}`,
                                ID_MZN_C: key,
                                Estado_tra: stateTicket,
                                UBIGEO: ubigeo,
                                FUENTE: dataWorkLoad.find(row => row.oid.toString() === key).fuente
                            };
                            graphic.geometry = graphicsId[key].geometry;
                            graphics.push(graphic);
                        }
                    }

                    return webMap.findLayerById(mz_asignadas).applyEdits({ addFeatures: graphics });
                })
                .then((add, update, del) => {
                    // agregar funcionalidad para cambiar el estado de los predios en la tabla punto campo
                    console.log(add);
                    this._stateService.triggerRefreshLayer(id_punto_imagen);
                    this._stateService.triggerRefreshLayer(id_lotes_sin_predio);
                    this._stateService.triggerRefreshLayer(id_predios);
                    this._stateService.triggerRefreshLayer(id_mz_inei);
                    this._stateService.triggerRefreshLayer(id_mz_pred);
                    this._stateService.triggerRefreshLayer(id_predio_sin_mz);
                    this._stateService.triggerRefreshLayer(id_mz_pimg);
                    this._stateService.triggerRefreshLayer(idPredSinCartoAsignadoLayer);
                    this._stateService.triggerClearAllGraphics();
                    this._fuseSplashScreenService.hide();
                })
                .catch((error) => {
                    this._fuseSplashScreenService.hide();
                    console.log(error);
                });
            // view.graphics.add(graphicExtent);
            // view.goTo(fullExtent_g);

        }
        catch (error) {
            console.log('EsriLoader: ', error);
        }


    }

}

