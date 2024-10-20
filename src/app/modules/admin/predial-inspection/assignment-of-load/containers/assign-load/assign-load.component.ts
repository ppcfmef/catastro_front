/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/naming-convention */
import { AfterViewInit, Component, inject, INJECTOR, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NewLoadService } from '../../services/new-load.service';
import { UserService } from 'app/core/user/user.service';
import { UntypedFormControl, UntypedFormGroup, MaxLengthValidator, Validators, FormGroup, FormControl } from '@angular/forms';
import { Subscription, Subject, Observable, of } from 'rxjs';
import { FuseSplashScreenService } from '@fuse/services/splash-screen';
import { debounceTime, distinctUntilChanged, map, startWith, switchMap, takeUntil } from 'rxjs/operators';
import { loadModules } from 'esri-loader';
import { IdataLoad } from '../../interfaces/dataload.interface';
import { WidgetService } from '../../services/widget.service';
import { TableService } from '../../services/table.service';
import moment from 'moment';
import { OperatorService } from '../../services/operator.service';
import { IOperator } from '../../interfaces/operator.interface';
import { MessageProviderService } from 'app/shared/services/message-provider.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'environments/environment';
import { Icard } from '../../interfaces/card.interface';



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
    user: boolean = false;
    cards: Icard[] = [];
    form: FormGroup;
    params = { is_active: true, isMobileStaff: true };
    operator: IOperator;

    dataPicker: boolean = true;
    options: Observable<string[]>;


    constructor(
        private _router: Router,
        private route: ActivatedRoute,
        private _newLoadService: NewLoadService,
        private _userService: UserService,
        private _tableService: TableService,
        private _fuseSplashScreenService: FuseSplashScreenService,
        private _widgetService: WidgetService,
        private _operatorsService: OperatorService,
        private _messageProviderService: MessageProviderService,
        private _ngxSpinner: NgxSpinnerService,
    ) {
        this.form = new FormGroup({
            loadName: new FormControl(''),
            description: new FormControl(''),
            dni: new FormControl(''),
            fEntrega: new FormControl(''),
        });

    }

    ngOnInit(): void {
        this._operatorsService.getUbigeo().subscribe((ubigeo) => {
            this._currentUserUbigeo = ubigeo ? ubigeo : environment.defaultUbigeo;
            this._queryUbigeo = `${this._field_ubigeo} = '${this._currentUserUbigeo}'`;
            this.params['district'] = this._currentUserUbigeo;
        });

        // this.filteredOptions = this.form.controls['dni'].valueChanges.pipe(
        //     startWith(''),
        //     map(value => this._filter(value || '')),
        //   );


        // Suscríbete al BehaviorSubject para datos de la tabla
        this.tableDataSubscription = this._newLoadService.getTableData().subscribe((data: IdataLoad[]) => {
            this.tableData = data;
        });

        this.webMapSubscription = this._tableService.getWebMap().subscribe((webMap) => {
            this.webMapData = webMap;
        });

        this.graphicsIdSubscription = this._newLoadService.getGraphicsId().subscribe((graphicsId) => {
            this.graphicsIdsData = graphicsId;
        });


    }

    // private _filter(value: string): string[] {
    //     const filterValue = value.toLowerCase();

    //     return this.options.filter(option => option.toLowerCase().includes(filterValue));
    //   }
    ngAfterViewInit(): void {

        //this.emitFilter();
        this.form.controls['dni'].valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap(value => this.getOptions(value))
        ).subscribe((response) => {
            this.options = of([]);
            const opt = response['results'].map(item => item['dni'] + ' - ' + item['firstName'] + ' ' + item['lastName']);
            this.options = of(opt);
        });

    }

    redirecto(): void {
        this._router.navigate(['../'], { relativeTo: this.route });
        this._newLoadService.showIcon.next(false);
        this._newLoadService.triggerClearAllGraphics();

    }

    getWidget(): void {
        this._widgetService.listWidget(this._currentUserUbigeo);
    }

    getOptions(value): Observable<string[]> {
        this.params['search'] = value;
        return this._operatorsService.getOperador(this.params).pipe(
            map(response => response || [])
        );
    }


    async getOperator(): Promise<any> {
        await this._operatorsService.getOperador(this.params).subscribe(async (data) => {
            this._fuseSplashScreenService.show();
            this.operator = data.results[0];
            if (this.operator) {
                this.user = true;
                await this._widgetService.widgetUser(this._currentUserUbigeo, this.operator.id).then(({ attended, pending }) => {
                    this.cards.push({ num: pending, text: 'TICKETS PENDIENTES' });
                    this.cards.push({ num: attended, text: 'TICKETS ATENDIDOS' });
                });
                this._fuseSplashScreenService.hide();
            }
            else {
                this._messageProviderService.showSnackInfo('No existe Operador');
                this._fuseSplashScreenService.hide();
                this.user = false;
            }
        });

    }

    selected(value) {
        if (value.length === 0) {
            this.dataPicker = true;
            this.operator = null;
            this.cards = [];
        } else {
            const dni = value.split(' - ')[0];
            this.params['search'] = dni;
            this.params['limit'] = 10;
            this.dataPicker = false;
            this.user = true;
            this.cards = [];
            this.getOperator();
        }

    }
    // emitFilter(): void {
    //     this.form.controls['dni'].valueChanges
    //         .pipe(
    //             debounceTime(600),
    //         ).subscribe((dni) => {
    //             console.log(dni, 'dni');
    //             if (!dni) {
    //                 this.operator = null;
    //                 this.user = false;
    //                 this.form.controls['fEntrega'].disable();
    //                 return;
    //             }
    //             this.params['search'] = dni;
    //             this.form.controls['fEntrega'].enable();
    //             this.user = true;
    //             this.cards = [];
    //             this.getOperator();
    //         });
    // }

    async createWorkLoad() {
        if (this.tableData.length === 0) {
            this._messageProviderService.showSnackError('Debe seleccionar al menos una manzana');
            return;
        }
        if (!this.form.value.loadName) {
            this._messageProviderService.showSnackError('Debe ingresar el nombre de la carga');
            return;
        }

        if (this.operator) {
            if (!this.form.value.fEntrega) {
                this._messageProviderService.showSnackError('Debe seleccionar fecha de entrega');
                return;
            }
        }


        const mensaje = this.form.value.dni
                        ?`Desea crear la carga de trabajo ${this.form.value.loadName} para el operador ${this.form.value.dni}?`
                        : `¿Desea crear la carga de trabajo ${this.form.value.loadName}?`;

        this._messageProviderService.showConfirm('' + mensaje)
            .afterClosed()
            .subscribe(async (confirm) => {
                this._fuseSplashScreenService.show();
                if (confirm) {
                    // params
                    const dataWorkLoad = this.tableData;
                    const nameWorkLoad = this.form.value.loadName;
                    const descWorlLoad = this.form.value.description;
                    const ubigeo = this._currentUserUbigeo;
                    // console.log(ubigeo, 'personal');
                    const graphicsId = this.graphicsIdsData;
                    const webMap = this.webMapData;
                    const codUserWorkLoad = this.operator ? this.operator.id : null;
                    const nomUserWorkLoad = this.operator ? `${this.operator.firstName} ${this.operator.lastName}` : null;
                    const dateWorkLoad = this.operator ? moment(this.form.controls.fEntrega.value).format('YYYY-MM-DD') : null;
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
                        this._fuseSplashScreenService.show();


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
                                NOM_USUARIO: nomUserWorkLoad,
                                ANIO: new Date().getFullYear(),
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
                                // const manzanasInei = [];
                                for (const key of dataWorkLoad) {
                                    if (key.tipo.toLowerCase() === 'manzana') {
                                        switch (key.fuente) {
                                            case 'CF':
                                                const queryCFPSG = new Query();
                                                queryCFPSG.where = webMap.findLayerById(id_predios).definitionExpression;
                                                queryCFPSG.outFields = ['*'];
                                                queryCFPSG.returnGeometry = true;
                                                queryCFPSG.geometry = graphicsId[key.oid].geometry;
                                                queryCFPSG.distance = 1;
                                                queryCFPSG.units = 'meters';
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
                                                queryCFLSP.distance = 1;
                                                queryCFLSP.units = 'meters';
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
                                                queryCFAPI.distance = 1;
                                                queryCFAPI.units = 'meters';
                                                queryCFAPI.spatialRelationship = 'intersects';
                                                const promiseCFAPI = webMap.findLayerById(id_punto_imagen).queryFeatures(queryCFAPI);
                                                allPromises.push(promiseCFAPI);
                                                orderPromises.push({ type: 'CFA', idmz: key.oid });
                                                break;
                                            case 'EU':
                                                // manzanasInei.push(key.oid.slice(1));
                                                const queryEUMSL = new Query();
                                                queryEUMSL.where = `UBIGEO = '${ubigeo}' AND ID_MZN_C = ${key.oid.slice(1)}`; //@daniel6
                                                queryEUMSL.outFields = ['*'];
                                                const promiseEUMSL = webMap.findLayerById(id_mz_inei).queryFeatures(queryEUMSL);
                                                allPromises.push(promiseEUMSL);
                                                orderPromises.push({ type: 'EU', idmz: key.oid });
                                                break;
                                        }
                                    } else {
                                        prediosSinManzana.push(key);
                                    }
                                    // console.log("revisaqui")
                                    // if (manzanasInei.length > 0) {
                                    //     const queryEUMSL = new Query();
                                    //     queryEUMSL.where = `UBIGEO = '${ubigeo}' AND ID_MZN_C = ${key.oid.slice(1)}`; //@daniel6
                                    //     queryEUMSL.outFields = ['*'];
                                    //     const promiseEUMSL = webMap.findLayerById(id_mz_inei).queryFeatures(queryEUMSL);
                                    //     allPromises.push(promiseEUMSL);
                                    //     orderPromises.push({ type: 'EU', idmz: key.oid });
                                    // }

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
                                            ESTADO_V: '1',
                                            ANIO: new Date().getFullYear(),
                                            FEC_ENTREGA: dateWorkLoad,
                                            NOM_USUARIO: nomUserWorkLoad,
                                        };
                                        switch (key.type) {
                                            case 'CF':
                                                ticket['ID_ENTIDAD'] = `${ubigeo}${row.attributes.COD_PRE}`;
                                                ticket['TIPO'] = row.attributes.Cod_Tipo_Ticket === '5' ? 'Predio subvaluado' : 'Predio sin georreferenciacion';
                                                ticket['COD_TIPO_TICKET'] = row.attributes.Cod_Tipo_Ticket;
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
                                                ticket['ID_ENTIDAD'] = `${ubigeo}E${row.attributes.ID_MZN_C}`;
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
                                        ESTADO_V: '1', //@daniel6
                                        COD_PRE: key.codigo,
                                        ANIO: new Date().getFullYear(),
                                        FEC_ENTREGA: dateWorkLoad,
                                        NOM_USUARIO: nomUserWorkLoad,
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
                                    if (ticket.attributes.COD_TIPO_TICKET === '1' || ticket.attributes.COD_TIPO_TICKET === '5') {
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
                            .then(async (add, update, del) => {
                                // agregar funcionalidad para cambiar el estado de los predios en la tabla punto campo
                                console.log(add);
                                this._newLoadService.triggerRefreshLayer(id_punto_imagen);
                                this._newLoadService.triggerRefreshLayer(id_lotes_sin_predio);
                                this._newLoadService.triggerRefreshLayer(id_predios);
                                this._newLoadService.triggerRefreshLayer(id_mz_inei);
                                this._newLoadService.triggerRefreshLayer(id_mz_pred);
                                this._newLoadService.triggerRefreshLayer(id_predio_sin_mz);
                                this._newLoadService.triggerRefreshLayer(id_mz_pimg);
                                this._newLoadService.triggerRefreshLayer(idPredSinCartoAsignadoLayer);
                                this._newLoadService.triggerClearAllGraphics();
                                this.getWidget();
                                this.form.reset({
                                    loadName: '',
                                    description: '',
                                    dni: '',
                                    fEntrega: ''
                                });
                                this.operator = null;
                                this.user = false;
                                await this._fuseSplashScreenService.hide();
                                this._messageProviderService.showAlert('Cargado correctamente');
                            })
                            .catch((error) => {
                                this._messageProviderService.showSnackError('Error al crear la carga');
                                this._fuseSplashScreenService.hide();
                            });
                        // view.graphics.add(graphicExtent);
                        // view.goTo(fullExtent_g);

                    }
                    catch (error) {
                        this._messageProviderService.showSnackError('Error al crear la carga');
                        this._fuseSplashScreenService.hide();
                    }
                }else {
                    this._fuseSplashScreenService.hide();
                };
            });
    };

};

