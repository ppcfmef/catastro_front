/* eslint-disable @typescript-eslint/naming-convention */
import {
    Component,
    OnInit,
    ViewChild,
    ElementRef,
    AfterViewInit,
} from '@angular/core';
import { loadModules } from 'esri-loader';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.types';
import { FuseSplashScreenService } from '@fuse/services/splash-screen';
import { takeUntil } from 'rxjs/operators';
import { BehaviorSubject, Subject } from 'rxjs';
import { NewLoadService } from '../../../assignment-of-load/services/new-load.service';
import { IdataLoad } from '../../../assignment-of-load/interfaces/dataload.interface';
import { NavigationAuthorizationService } from 'app/shared/services/navigation-authorization.service';
import { MessageProviderService } from 'app/shared/services/message-provider.service';
import { TableService } from '../../../assignment-of-load/services/table.service';
import { OperatorService } from '../../../assignment-of-load/services/operator.service';
import { environment } from 'environments/environment';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, AfterViewInit {
    @ViewChild('mapViewAOL', { static: false }) mapViewAOLContainer: ElementRef;
    @ViewChild('pointButton', { static: false })
    pointButtonContainer: ElementRef;
    @ViewChild('clearSelection', { static: false })
    clearButtonContainer: ElementRef;
    @ViewChild('select', { static: false }) selectContainer: ElementRef;
    changesSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    // @ViewChild('createCarga', { static: false }) createCargaContainer: ElementRef;
    // create string to the id of the map element that will be created
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

    idLimitesLayer = 'limites_nacional_6496';
    idCfSectorLayer = 'CARTO_FISCAL_6033';
    idCfManzanaUrbLayer = 'CARTO_FISCAL_3571';
    idCfManzanaLayer = 'CARTO_FISCAL_8574';
    idCfParquesLayer = 'CARTO_FISCAL_4241';
    idCfUnidadesUrbanasLayer = 'CARTO_FISCAL_9795';
    idCfLotesLayer = 'CARTO_FISCAL_8149';
    idCfArancelLayer = 'CARTO_FISCAL_8360';
    idCfNumeracionLayer = 'CARTO_FISCAL_9596';
    idCfEjeVialLayer = 'CARTO_FISCAL_8524';
    idCfLotesPunLayer = 'CARTO_FISCAL_2829';
    idCfPredioLayer = 'CARTO_FISCAL_869';

    defaultFilters = {};

    hideSelectUbigeo: boolean = true;
    _queryUbigeo: string;
    _fieldUbigeo = 'UBIGEO';
    _view = null;
    _graphicsIds = {};
    _webmap = null;
    newQuery;
    // Properties app
    _currentUser: User;
    _currentUserUbigeo: string;
    _unsubscribeAll: Subject<any> = new Subject<any>();
    homeButton;


    idView = 'inspre';
    constructor(
        protected _fuseSplashScreenService: FuseSplashScreenService,
        private _userService: UserService,
        private _newLoadService: NewLoadService,
        private _tableService: TableService,
        private _operatorService: OperatorService,
        private navigationAuthorizationService: NavigationAuthorizationService,
        private _messageProvider: MessageProviderService,
    ) { }

    ngAfterViewInit(): void {
        this._fuseSplashScreenService.show();
        setTimeout(() => {
            this.initializeMapAOL();
        }, 2000);

    }

    ngOnInit(): void {

        this._userService.user$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((user: User) => {
                this._currentUser = user;
                // @SETUBIGEO
                this._currentUserUbigeo = this._currentUser.ubigeo ? this._currentUser.ubigeo : environment.defaultUbigeo;
                this._queryUbigeo = `${this._fieldUbigeo} = '${this._currentUserUbigeo}'`;
                localStorage.setItem('ubigeo', this._currentUserUbigeo);
                this._operatorService.updateUbigeo();

                if (this._currentUser.isSuperuser) {
                    this.hideSelectUbigeo = false;
                }

            });
        this._newLoadService.clearAllGraphics.subscribe(() => this.clearSelection());
        this._newLoadService.oid.subscribe(oid => this.clearSelectionById(oid));
        this._newLoadService.refreshLayer.subscribe(id => this.refreshLayerById(id));
        this._newLoadService.getRowZoomNewWorkLoad().subscribe(row => this.zoomRowByNewWorkLoad(row));  // @daniel
    }

    clearSelection(): void {
        Object.entries(this._graphicsIds).forEach(([key]) => {
            this._view.graphics.remove(this._graphicsIds[key]);
        });
        this._graphicsIds = {};
        this._newLoadService.deleteAllGraphicsMap.next(true);
        this._tableService.setWebMap(this._webmap);
        this._newLoadService.setGraphicsId(this._graphicsIds);
    }

    clearSelectionById(oid: string): void {
        this._view.graphics.remove(this._graphicsIds[oid]);
        delete this._graphicsIds[oid];
        this._tableService.setWebMap(this._webmap);
        this._newLoadService.setGraphicsId(this._graphicsIds);
    }


    refreshLayerById(id): void {
        this._webmap.findLayerById(id).refresh();
    }

    onSelectUbigeo(ubigeo: any): void {
        this._currentUserUbigeo = ubigeo;
        console.log('this.ubigeo ', this._currentUserUbigeo);
        localStorage.setItem('ubigeo', this._currentUserUbigeo);
        this._operatorService.updateUbigeo();
        this._queryUbigeo = `${this._fieldUbigeo} = '${this._currentUserUbigeo}'`;
        this._fuseSplashScreenService.show();
        setTimeout(async () => {
            try {
                const [query] = await loadModules([
                    'esri/rest/query',
                ]);
                this._view.when(() => {
                    // Filter layers by ubigeo
                    const _layersMap = this._webmap.allLayers;
                    this._webmap.findLayerById(this.idCfSectorLayer).definitionExpression = this._queryUbigeo;
                    this._webmap.findLayerById(this.idCfManzanaUrbLayer).definitionExpression = this._queryUbigeo;
                    this._webmap.findLayerById(this.idCfManzanaLayer).definitionExpression = this._queryUbigeo;
                    this._webmap.findLayerById(this.idCfParquesLayer).definitionExpression = this._queryUbigeo;
                    this._webmap.findLayerById(this.idCfUnidadesUrbanasLayer).definitionExpression = this._queryUbigeo;
                    this._webmap.findLayerById(this.idCfLotesLayer).definitionExpression = this._queryUbigeo;
                    this._webmap.findLayerById(this.idCfArancelLayer).definitionExpression = this._queryUbigeo;
                    this._webmap.findLayerById(this.idCfNumeracionLayer).definitionExpression = this._queryUbigeo;
                    this._webmap.findLayerById(this.idCfEjeVialLayer).definitionExpression = this._queryUbigeo;
                    this._webmap.findLayerById(this.idCfLotesPunLayer).definitionExpression = this._queryUbigeo;
                    this._webmap.findLayerById(this.idCfPredioLayer).definitionExpression = this._queryUbigeo;

                    // Para el caso de las manzanas de predios se debe mantener la expresion definida desde portal y agregar el ubigeo
                    // this._webmap.findLayerById(this.idManzanaPrediosLayer).definitionExpression += ` AND (${this._queryUbigeo})`
                    this._webmap.findLayerById(this.idManzanaPrediosLayer).definitionExpression = this._queryUbigeo;
                    this._webmap.findLayerById(this.idManzanaIneiLayer).definitionExpression = this._queryUbigeo;
                    this._webmap.findLayerById(this.idLotesSinPredioLayer).definitionExpression = this._queryUbigeo;
                    this._webmap.findLayerById(this.idPuntoImagenLayer).definitionExpression = this._queryUbigeo;
                    this._webmap.findLayerById(this.idFieldBlockLayer).definitionExpression = this._queryUbigeo;

                    // console.log(this._webmap.findLayerById(this.idManzanaPrediosLayer).definitionExpression)
                    this._webmap.findLayerById(this.idManzanaPuntoImagenLayer).definitionExpression =
                        `${this.defaultFilters[this.idManzanaPuntoImagenLayer]} AND (${this._queryUbigeo})`;
                    this._webmap.findLayerById(this.idWorkLoadLayer).definitionExpression =
                        `(${this.defaultFilters[this.idWorkLoadLayer]}) AND (${this._queryUbigeo})`;
                    this._webmap.findLayerById(this.idPredioSinManzanaLayer).definitionExpression =
                        `${this.defaultFilters[this.idPredioSinManzanaLayer]} AND (${this._queryUbigeo})`;
                    this._webmap.findLayerById(this.idFieldPointLayer).definitionExpression =
                        `${this.defaultFilters[this.idFieldPointLayer]} AND (${this._queryUbigeo})`;
                    this._webmap.findLayerById(this.idPredSinCartoAsignadoLayer).definitionExpression =
                        `${this.defaultFilters[this.idPredSinCartoAsignadoLayer]} AND (${this._queryUbigeo})`;

                    // zoom extent by ubigeo
                    const limitesNacionalesUrl = this._webmap.findLayerById(this.idLimitesLayer).url;

                    query.executeForExtent(`${limitesNacionalesUrl}/2`, {
                        where: this._queryUbigeo,
                    })
                        .then((response) => {
                            this._view.goTo(response.extent);
                            this.homeButton.viewpoint = {
                                targetGeometry: response.extent,
                            };
                            this._fuseSplashScreenService.hide();

                            this._tableService.setWebMap(this._webmap);
                        })
                        .catch((error) => {
                            console.log('EsriLoader: ', error);
                        });
                });
            }
            catch (error) {
                this._fuseSplashScreenService.hide();
            }
            // this.initializeMapAOL();
        }, 0);
    }


    async initializeMapAOL(): Promise<void> {
        try {
            // add map to the view
            const [
                MapView,
                WebMap,
                esriConfig,
                query,
                Home,
                LayerList,
                Expand,
                BasemapGallery,
                Search,
                Draw,
                Graphic,
                Point,
                Query,
                Legend,
                Polygon,
                Extent,
                webMercatorUtils,
            ] = await loadModules([
                'esri/views/MapView',
                'esri/WebMap',
                'esri/config',
                'esri/rest/query',
                'esri/widgets/Home',
                'esri/widgets/LayerList',
                'esri/widgets/Expand',
                'esri/widgets/BasemapGallery',
                'esri/widgets/Search',
                'esri/views/draw/Draw',
                'esri/Graphic',
                'esri/geometry/Point',
                'esri/rest/support/Query',
                'esri/widgets/Legend',
                'esri/geometry/Polygon',
                'esri/geometry/Extent',
                'esri/geometry/support/webMercatorUtils',
            ]);
            // Properties of the map
            const _idWebMap = '66adf64572f7438c892056ad832ea39d';
            let _layersMap = [];

            this.newQuery = Query;
            const self = this;
            // let graphicsIds = {};

            // symbol selected
            const symbolSelectedPolygon = {
                type: 'simple-fill', // autocasts as SimpleFillSymbol
                color: [255, 0, 0, 0.5],
                style: 'solid',
                outline: {
                    // autocasts as SimpleLineSymbol
                    color: 'red',
                    width: 2,
                },
            };

            const symbolSelectedPoint = {
                type: 'simple-marker', // autocasts as new SimpleMarkerSymbol()
                color: [255, 0, 0, 0.5],
                outline: {
                    color: [255, 0, 0],
                    width: 2,
                },
            };

            esriConfig.portalUrl = environment.portalUrl;

            self._webmap = new WebMap({
                portalItem: {
                    id: _idWebMap,
                },
            });

            self._view = new MapView({
                map: self._webmap,
                container: this.mapViewAOLContainer.nativeElement,
            });
            this._tableService.setWiev(self._view);


            this.homeButton = new Home({
                view: self._view,
            });

            self._view.ui.add(this.homeButton, 'top-left');

            const layerList = new LayerList({
                view: self._view,
            });

            const layerListExpand = new Expand({
                expandIcon: 'layers',
                view: self._view,
                content: layerList,
            });

            self._view.ui.add(layerListExpand, 'top-right');

            const basemapGallery = new BasemapGallery({
                view: self._view,
            });

            const basemapGalleryExpand = new Expand({
                view: self._view,
                content: basemapGallery,
            });

            self._view.ui.add(basemapGalleryExpand, 'top-right');

            const searchWidget = new Search({
                view: self._view,
            });

            self._view.ui.add(searchWidget, {
                position: 'top-left',
                index: 0,
            });

            const legend = new Legend({
                view: self._view,
            });

            self._view.ui.add(legend, 'bottom-right');
            self._view.ui.add(this.selectContainer.nativeElement, {
                position: 'top-right',
                index: 0,
                style: { visibility: 'visible' },
            });
            self._view.ui.add(
                this.pointButtonContainer.nativeElement,
                'top-left'
            );
            self._view.ui.add(
                this.clearButtonContainer.nativeElement,
                'top-left'
            );

            this._newLoadService.showIcon
                .pipe(takeUntil(this._unsubscribeAll))
                .subscribe((state) => {
                    if (state) {
                        // view.ui.add(this.createCargaContainer.nativeElement, 'top-left');
                        // change stile of the button
                        this.pointButtonContainer.nativeElement.style =
                            'visibility: visible;';
                        this.clearButtonContainer.nativeElement.style =
                            'visibility: visible;';
                        // this.createCargaContainer.nativeElement.style = "visibility: visible;"
                    } else {
                        this.pointButtonContainer.nativeElement.style =
                            'visibility: false;';
                        this.pointButtonContainer.nativeElement.classList.remove('active');
                        draw.reset();   //@daniel4
                        this.clearButtonContainer.nativeElement.style =
                            'visibility: false;';
                        // this.createCargaContainer.nativeElement.style = "visibility: false;"
                    }
                });

            const draw = new Draw({
                view: self._view,
            });

            const createPointGraphics = (evt): Promise<IdataLoad[]> => {
                self._fuseSplashScreenService.show();
                // view.graphics.removeAll();
                const coordinates = evt.vertices.slice(-1)[0];
                const pointG = new Point({
                    x: coordinates[0],
                    y: coordinates[1],
                    spatialReference: self._view.spatialReference,
                });

                // query manzanas
                // const urlManzanas = webmap.findLayerById(self.idManzanaPrediosLayer).url;
                const queryManzanas = new Query();
                queryManzanas.where =
                    self._webmap.findLayerById(
                        self.idManzanaPrediosLayer
                    ).definitionExpression;
                queryManzanas.geometry = pointG;
                queryManzanas.spatialRelationship = 'intersects';
                queryManzanas.returnGeometry = true;
                queryManzanas.outFields = [
                    'UBIGEO',
                    'COD_SECT',
                    'COD_MZN',
                    'ID_MZN_C',
                ];

                // query manzanas punto imagen
                // const urlManzanasPuntoImagen = webmap.findLayerById(self.idManzanaPuntoImagenLayer).url;
                // console.log(urlManzanasPuntoImagen)
                const queryManzanasPuntoImagen = new Query();
                queryManzanasPuntoImagen.where =
                    self._webmap.findLayerById(
                        self.idManzanaPuntoImagenLayer
                    ).definitionExpression;
                queryManzanasPuntoImagen.geometry = pointG;
                queryManzanasPuntoImagen.spatialRelationship = 'intersects';
                queryManzanasPuntoImagen.returnGeometry = true;
                queryManzanasPuntoImagen.outFields = ['UBIGEO', 'ID_MZN_U'];

                // query manzanas inei
                // const urlManzanasInei = webmap.findLayerById(self.idManzanaIneiLayer).url;
                const queryManzanasInei = new Query();
                queryManzanasInei.where =
                    self._webmap.findLayerById(
                        self.idManzanaIneiLayer
                    ).definitionExpression;
                queryManzanasInei.geometry = pointG;
                queryManzanasInei.spatialRelationship = 'intersects';
                queryManzanasInei.returnGeometry = true;
                queryManzanasInei.outFields = ['UBIGEO', 'ID_MZN_C'];

                // query predios sin manzana
                const queryPrediosSinManzana = new Query();
                queryPrediosSinManzana.where =
                    self._webmap.findLayerById(
                        self.idPredioSinManzanaLayer
                    ).definitionExpression;
                // generate buffer as point_g 10 meter
                queryPrediosSinManzana.distance = 5;
                queryPrediosSinManzana.units = 'meters';
                queryPrediosSinManzana.geometry = pointG;
                queryPrediosSinManzana.spatialRelationship = 'contains';
                queryPrediosSinManzana.returnGeometry = true;
                queryPrediosSinManzana.outFields = ['COD_PRE'];

                // query promises
                const promiseManzanas = self._webmap
                    .findLayerById(self.idManzanaPrediosLayer)
                    .queryFeatures(queryManzanas);
                const promiseManzanasPuntoImagen = self._webmap
                    .findLayerById(self.idManzanaPuntoImagenLayer)
                    .queryFeatures(queryManzanasPuntoImagen);
                const promiseManzanasInei = self._webmap
                    .findLayerById(self.idManzanaIneiLayer)
                    .queryFeatures(queryManzanasInei);
                const promisePrediosSinManzana = self._webmap
                    .findLayerById(self.idPredioSinManzanaLayer)
                    .queryFeatures(queryPrediosSinManzana);

                evt.preventDefault();

                return Promise.all([
                    promiseManzanas,
                    promiseManzanasPuntoImagen,
                    promiseManzanasInei,
                    promisePrediosSinManzana,
                ])
                    .then((results) => {
                        const responseManzanas = results[0].features.map(
                            (row) => {
                                // const oid = `${row.attributes.UBIGEO}${row.attributes.COD_SECT}${row.attributes.COD_MZN}`;
                                const oid = row.attributes.ID_MZN_C;
                                let status = 1;
                                if (self._graphicsIds[oid]) {
                                    self._view.graphics.remove(
                                        self._graphicsIds[oid]
                                    );
                                    delete self._graphicsIds[oid];
                                    status = 0;
                                } else {
                                    const graphic = new Graphic({
                                        geometry: row.geometry,
                                        symbol: symbolSelectedPolygon,
                                    });
                                    self._view.graphics.add(graphic);
                                    self._graphicsIds[oid] = graphic;
                                }

                                return {
                                    oid: oid,
                                    codigo: `${row.attributes.COD_SECT}-${row.attributes.COD_MZN}`,
                                    tipo: 'Manzana',
                                    fuente: 'CF',
                                    status: status,
                                };
                            }
                        );

                        const responseManzanasPuntoImagen =
                            results[1].features.map((row) => {
                                // const oid = `${row.attributes.ubigeo}${row.attributes.ID_MZN_U}`
                                const oid = `I${row.attributes.ID_MZN_U}`;
                                let status = 1;
                                if (self._graphicsIds[oid]) {
                                    self._view.graphics.remove(
                                        self._graphicsIds[oid]
                                    );
                                    delete self._graphicsIds[oid];
                                    status = 0;
                                } else {
                                    const graphic = new Graphic({
                                        geometry: row.geometry,
                                        symbol: symbolSelectedPolygon,
                                    });
                                    self._view.graphics.add(graphic);
                                    self._graphicsIds[oid] = graphic;
                                }
                                return {
                                    oid: oid,
                                    codigo: `${row.attributes.ID_MZN_U}`,
                                    tipo: 'Manzana',
                                    fuente: 'CFA',
                                    status: status,
                                };
                            });

                        const responseManzanasInei = results[2].features.map(
                            (row) => {
                                // const oid = `E${row.attributes.UBIGEO}${row.attributes.ID_MZN_C}`
                                const oid = `E${row.attributes.ID_MZN_C}`;
                                let status = 1;
                                if (self._graphicsIds[oid]) {
                                    self._view.graphics.remove(
                                        self._graphicsIds[oid]
                                    );
                                    delete self._graphicsIds[oid];
                                    status = 0;
                                } else {
                                    const graphic = new Graphic({
                                        geometry: row.geometry,
                                        symbol: symbolSelectedPolygon,
                                    });
                                    self._view.graphics.add(graphic);
                                    self._graphicsIds[oid] = graphic;
                                }
                                return {
                                    oid: oid,
                                    codigo: `${row.attributes.ubigeo}E${row.attributes.ID_MZN_C}`, //@daniel6
                                    tipo: 'Manzana',
                                    fuente: 'EU',
                                    status: status,
                                };
                            }
                        );

                        const responsePrediosSinManzana =
                            results[3].features.map((row) => {
                                const oid = `${row.attributes.COD_PRE}`;
                                let status = 1;
                                if (self._graphicsIds[oid]) {
                                    self._view.graphics.remove(
                                        self._graphicsIds[oid]
                                    );
                                    delete self._graphicsIds[oid];
                                    status = 0;
                                } else {
                                    const graphic = new Graphic({
                                        geometry: row.geometry,
                                        symbol: symbolSelectedPoint,
                                    });
                                    self._view.graphics.add(graphic);
                                    self._graphicsIds[oid] = graphic;
                                }
                                return {
                                    oid: oid,
                                    codigo: `${row.attributes.COD_PRE}`,
                                    tipo: 'Predio',
                                    fuente: 'CF',
                                    status: status,
                                };
                            });

                        const data = responseManzanas
                            .concat(responseManzanasPuntoImagen)
                            .concat(responseManzanasInei)
                            .concat(responsePrediosSinManzana);
                        // Aqui se debe enviar la data al componente tabla
                        self._newLoadService.dataMap.next(data);
                        self._fuseSplashScreenService.hide();
                        self._tableService.setWebMap(self._webmap);
                        self._newLoadService.setGraphicsId(self._graphicsIds);
                        return data;
                    })
                    .catch((error) => {
                        self._fuseSplashScreenService.hide();
                        self._tableService.setWebMap(self._webmap);
                        console.log(error);
                    });
            };

            const enableCreatePoint = (evt): void => {
                evt.currentTarget.classList.toggle('active');
                if (!evt.currentTarget.classList.contains('active')) {
                    draw.reset();
                    return;
                }

                const action = draw.create('point');
                action.on('draw-complete', (ev => createPointGraphics(ev)));
            };

            this.pointButtonContainer.nativeElement.addEventListener(
                'click',
                enableCreatePoint.bind(this)
            );
            this.clearButtonContainer.nativeElement.addEventListener(
                'click',
                self.clearSelection.bind(this)
            );
            // this.createCargaContainer.nativeElement.addEventListener('click', createCargaTrabajo.bind(this));

            self._view.when(() => {
                // Filter layers by ubigeo
                _layersMap = self._webmap.allLayers;
                self._webmap.findLayerById(self.idCfSectorLayer).definitionExpression = this._queryUbigeo;
                self._webmap.findLayerById(self.idCfManzanaUrbLayer).definitionExpression = this._queryUbigeo;
                self._webmap.findLayerById(self.idCfManzanaLayer).definitionExpression = this._queryUbigeo;
                self._webmap.findLayerById(self.idCfParquesLayer).definitionExpression = this._queryUbigeo;
                self._webmap.findLayerById(self.idCfUnidadesUrbanasLayer).definitionExpression = this._queryUbigeo;
                self._webmap.findLayerById(self.idCfLotesLayer).definitionExpression = this._queryUbigeo;
                self._webmap.findLayerById(self.idCfArancelLayer).definitionExpression = this._queryUbigeo;
                self._webmap.findLayerById(self.idCfNumeracionLayer).definitionExpression = this._queryUbigeo;
                self._webmap.findLayerById(self.idCfEjeVialLayer).definitionExpression = this._queryUbigeo;
                self._webmap.findLayerById(self.idCfLotesPunLayer).definitionExpression = this._queryUbigeo;
                self._webmap.findLayerById(self.idCfPredioLayer).definitionExpression = this._queryUbigeo;

                // Para el caso de las manzanas de predios se debe mantener la expresion definida desde portal y agregar el ubigeo
                // self._webmap.findLayerById(self.idManzanaPrediosLayer).definitionExpression += ` AND (${this._queryUbigeo})`
                self._webmap.findLayerById(self.idManzanaPrediosLayer).definitionExpression = this._queryUbigeo;
                self._webmap.findLayerById(self.idManzanaIneiLayer).definitionExpression = this._queryUbigeo;
                self._webmap.findLayerById(self.idLotesSinPredioLayer).definitionExpression = this._queryUbigeo;
                self._webmap.findLayerById(self.idPuntoImagenLayer).definitionExpression = this._queryUbigeo;
                self._webmap.findLayerById(self.idFieldBlockLayer).definitionExpression = this._queryUbigeo;

                // console.log(self._webmap.findLayerById(self.idManzanaPrediosLayer).definitionExpression)
                self.defaultFilters[self.idManzanaPuntoImagenLayer] = self._webmap.findLayerById(self.idManzanaPuntoImagenLayer).definitionExpression;
                self._webmap.findLayerById(self.idManzanaPuntoImagenLayer).definitionExpression += ` AND (${this._queryUbigeo})`;

                self.defaultFilters[self.idWorkLoadLayer] = self._webmap.findLayerById(self.idWorkLoadLayer).definitionExpression;
                self._webmap.findLayerById(self.idWorkLoadLayer).definitionExpression =
                    `(${self._webmap.findLayerById(self.idWorkLoadLayer).definitionExpression}) AND (${this._queryUbigeo})`;

                self.defaultFilters[self.idPredioSinManzanaLayer] = self._webmap.findLayerById(self.idPredioSinManzanaLayer).definitionExpression;
                self._webmap.findLayerById(self.idPredioSinManzanaLayer).definitionExpression += ` AND (${this._queryUbigeo})`;

                self.defaultFilters[self.idFieldPointLayer] = self._webmap.findLayerById(self.idFieldPointLayer).definitionExpression;
                self._webmap.findLayerById(self.idFieldPointLayer).definitionExpression += ` AND (${this._queryUbigeo})`;

                self.defaultFilters[self.idPredSinCartoAsignadoLayer] = self._webmap.findLayerById(self.idPredSinCartoAsignadoLayer).definitionExpression;
                self._webmap.findLayerById(self.idPredSinCartoAsignadoLayer).definitionExpression += ` AND (${this._queryUbigeo})`;

                // zoom extent by ubigeo
                const limitesNacionalesUrl = self._webmap.findLayerById(self.idLimitesLayer).url;

                query.executeForExtent(`${limitesNacionalesUrl}/2`, {
                    where: this._queryUbigeo,
                })
                    .then((response) => {
                        self._view.goTo(response.extent);
                        this.homeButton.viewpoint = {
                            targetGeometry: response.extent,
                        };
                        this._fuseSplashScreenService.hide();

                        self._tableService.setWebMap(self._webmap);
                    })
                    .catch((error) => {
                        console.log('EsriLoader: ', error);
                    });
            });
        } catch (error) {
            console.log('EsriLoader: ', error);
            //window.location.reload();
        }
    }

    zoomRowByNewWorkLoad(unitData): void {
        this._view.goTo(this._graphicsIds[unitData.oid]);
    }
}
