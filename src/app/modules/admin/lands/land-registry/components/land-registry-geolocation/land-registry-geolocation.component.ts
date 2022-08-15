import {
    AfterViewInit,
    Component,
    ElementRef,
    Input,
    OnInit,
    ViewChild,
} from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { DistrictResource } from 'app/core/common/interfaces/common.interface';
import { CommonService } from 'app/core/common/services/common.service';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.types';
import { MapUtils } from 'app/shared/utils/map.utils';
import { loadModules } from 'esri-loader';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GestionPredios } from '../../interfaces/gestion-predios.interface';
import { LandMapIn } from '../../interfaces/land-map-in.interface';
import { LandRegistryMap } from '../../interfaces/land-registry-map.interface';
import { LandMapInModel } from '../../models/land-map-in.model';
import { LandRegistryMapModel } from '../../models/land-registry-map.model';
import { LandRegistryMapService } from '../../services/land-registry-map.service';

import { arcgisToGeoJSON } from '@esri/arcgis-to-geojson-utils';
import { geojsonToArcGIS } from '@esri/arcgis-to-geojson-utils';
import { FormUtils } from 'app/shared/utils/form.utils';
import { MessageProviderService } from 'app/shared/services/message-provider.service';
import { Role } from 'app/shared/enums/role.enum';

@Component({
    selector: 'app-land-registry-geolocation',
    templateUrl: './land-registry-geolocation.component.html',
    styleUrls: ['./land-registry-geolocation.component.scss'],
})
export class LandRegistryGeolocationComponent implements OnInit, AfterViewInit {
    @Input() x: number = 639476.5456999997;
    @Input() y: number = 9265200.7227;
    @ViewChild('mapViewNode', { static: true }) private mapViewEl: ElementRef;
    title = 'Gestor Cartográfico';
    view: any = null;
    map: any;
    points: any[];
    user: any;
    _unsubscribeAll: Subject<any> = new Subject<any>();

    userUbigeo: string = '010101';
    /*projection: number=32717;*/
    proj4Catalog = 'EPSG';
    idCargo = 1;
    proj4Wkid = 32717;
    proj4GestionPrediosWkid = 4326;

    /*proj4ScrWkid=4326;*/
    proj4Src = this.proj4Catalog + ':' + String(this.proj4Wkid);
    layerList: any;
    groupLayers = [
        {
            id: 0,
            title: 'Zona 17',
            children: [0, 1, 2],
        },

        {
            id: 1,
            title: 'Zona 18',
            children: [3, 4, 5],
        },

        {
            id: 2,
            title: 'Zona 19',
            children: [6, 7, 8],
        },
    ];

    simpleMarkerSymbol = {
        type: 'picture-marker', // autocasts as new PictureMarkerSymbol()
        url: '/assets/images/map/location2.png',
        width: '20px',
        height: '30px',
        yoffset: '15px',
    };

    simpleMarkerSymbolUndefined = {
        type: 'picture-marker', // autocasts as new PictureMarkerSymbol()
        url: '/assets/images/map/location_out2.png',
        width: '20px',
        height: '30px',
        yoffset: '15px',
    };

    layersInfo = [
       /* {
            title: 'Lotes Zona 17',
            id: 0,
            idServer: 0,
            urlBase:
                'https://ws.mineco.gob.pe/serverdf/rest/services/pruebas/CARTO_FISCAL_17/MapServer',
            order: 0,
            featureLayer: null,
            definitionExpression: '1=1',
            featureTable: null,
            popupTemplate: null,
            utm: 17,
            projection: 32717,
        },*/

        {
            title: 'Lotes Zona 17',
            id: 0,
            idServer: 1,
            urlBase:
                'https://ws.mineco.gob.pe/serverdf/rest/services/pruebas/CARTO_FISCAL_17/MapServer',
            order: 0,
            featureLayer: null,
            definitionExpression: '1<>1',
            featureTable: null,
            popupTemplate: null,
            utm: 17,
            projection: 32717,
        },

        {
            title: 'Lotes Poligono Zona 17',
            id: 1,
            idServer: 5,
            urlBase:
                'https://ws.mineco.gob.pe/serverdf/rest/services/pruebas/CARTO_FISCAL_17/MapServer',
            order: 0,
            featureLayer: null,
            definitionExpression: '1<>1',
            featureTable: null,
            popupTemplate: null,
            utm: 17,
            projection: 32717,
        },

        {
            title: 'Via Zona 17',
            id: 2,
            idServer: 2,

            urlBase:
                'https://ws.mineco.gob.pe/serverdf/rest/services/pruebas/CARTO_FISCAL_17/MapServer',
            order: 0,
            featureLayer: null,
            definitionExpression: '1<>1',
            featureTable: null,
            popupTemplate: null,
            utm: 17,
            projection: 32717,
        },



        {
            title: 'Lotes Zona 18',
            id: 3,
            idServer: 1,
            urlBase:
                'https://ws.mineco.gob.pe/serverdf/rest/services/pruebas/CARTO_FISCAL_18/MapServer',
            order: 0,
            featureLayer: null,
            definitionExpression: '1<>1',
            featureTable: null,
            popupTemplate: null,
            utm: 18,
            projection: 32718,
        },

        {
            title: 'Lotes Poligono Zona 18',
            id: 4,
            idServer: 5,
            urlBase:
                'https://ws.mineco.gob.pe/serverdf/rest/services/pruebas/CARTO_FISCAL_18/MapServer',
            order: 0,
            featureLayer: null,
            definitionExpression: '1<>1',
            featureTable: null,
            popupTemplate: null,
            utm: 18,
            projection: 32718,
        },

        {
            title: 'Via Zona 18',
            id: 5,
            idServer: 2,
            urlBase:
                'https://ws.mineco.gob.pe/serverdf/rest/services/pruebas/CARTO_FISCAL_18/MapServer',
            order: 0,
            featureLayer: null,
            definitionExpression: '1<>1',
            featureTable: null,
            popupTemplate: null,
            utm: 18,
            projection: 32718,
        },

        {
            title: 'Lotes Zona 19',
            id: 6,
            idServer: 1,
            urlBase:
                'https://ws.mineco.gob.pe/serverdf/rest/services/pruebas/CARTO_FISCAL_19/MapServer',
            order: 0,
            featureLayer: null,
            definitionExpression: '1<>1',
            featureTable: null,
            popupTemplate: null,
            utm: 19,
            projection: 32719,
        },

        {
            title: 'Lotes Poligono Zona 19',
            id: 7,
            idServer: 5,
            urlBase:
                'https://ws.mineco.gob.pe/serverdf/rest/services/pruebas/CARTO_FISCAL_19/MapServer',
            order: 0,
            featureLayer: null,
            definitionExpression: '1<>1',
            featureTable: null,
            popupTemplate: null,
            utm: 19,
            projection: 32719,
        },

        {
            title: 'Via Zona 19',
            id: 8,
            idServer: 2,
            urlBase:
                'https://ws.mineco.gob.pe/serverdf/rest/services/pruebas/CARTO_FISCAL_19/MapServer',
            order: 0,
            featureLayer: null,
            definitionExpression: '1<>1',
            featureTable: null,
            popupTemplate: null,
            utm: 19,
            projection: 32719,
        },
    ];

    //urlSearchDistrito = 'https://ws.mineco.gob.pe/serverdf/rest/services/pruebas/CARTO_TEMATICA_INEI/MapServer/5';
    urlSearchZonaUrbana =
        'https://ws.mineco.gob.pe/serverdf/rest/services/pruebas/CARTO_TEMATICA_INEI/MapServer/2';
    urlSearchDirecciones =
        'https://ws.mineco.gob.pe/serverdf/rest/services/pruebas/CARTO_TEMATICA_INEI/MapServer/0';

    urlGestionPredios =
        'https://ws.mineco.gob.pe/serverdf/rest/services/pruebas/GESTION_DE_PREDIOS/FeatureServer/0/addFeatures';

    urlSearchDistrito =
        'https://ws.mineco.gob.pe/serverdf/rest/services/pruebas/CARTO_TEMATICA_INEI/MapServer/7';
    featureZonaUrbana: any;
    featureDistrito: any;
    constructor(
        private _userService: UserService,
        private _commonService: CommonService,
        private _landRegistryMapService: LandRegistryMapService,
        protected _messageProviderService: MessageProviderService
    ) {}

    ngOnInit(): void {
        this._landRegistryMapService.landIn$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((data: LandRegistryMap) => {
                console.log('LandRegistryMap>>',data);

                if (data?.latitude && data?.longitude) {
                    this.addPoint(
                        data.latitude,
                        data.longitude,
                        this.simpleMarkerSymbol
                    );
                    if (this.view) {
                        this.view.center = [data.longitude, data.latitude];
                        this.view.zoom = 19;
                    }
                } else if (data && data.ubigeo) {
                    const where = " UBIGEO='" + data.ubigeo + "'";
                    setTimeout(() => {
                        this.zoomToUbigeo(where);
                    }, 1000);
                }
            });

            this._landRegistryMapService.gestionPredios$.pipe(takeUntil(this._unsubscribeAll))
            .subscribe((data: LandRegistryMap) => {
              const _landRegistryMapModel=new LandRegistryMapModel(data);
              console.log('_landRegistryMapModel>>',_landRegistryMapModel);
              _landRegistryMapModel.idLote =1000;
              this.saveGestionPredios(_landRegistryMapModel);
            });
    }

    ngAfterViewInit(): void {
        this._userService.user$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((user: any) => {
                this.user = user;
                console.log('this.user>>', this.user);
                this.userUbigeo =
                    this.user.ubigeo && this.user.ubigeo
                        ? this.user.ubigeo
                        : '010101';
               
                this.idCargo = this.user.placeScope.id;
                setTimeout(() => {
                    this.initializeMap(this.points);
                }, 1000);
            });
    }

    async initializeMap(inputPoints: any[] = []): Promise<void> {
        try {
            const container = this.mapViewEl.nativeElement;

            const [
                // eslint-disable-next-line @typescript-eslint/naming-convention
                Map,
                // eslint-disable-next-line @typescript-eslint/naming-convention
                MapView,
                // eslint-disable-next-line @typescript-eslint/naming-convention
                Graphic,
                // eslint-disable-next-line @typescript-eslint/naming-convention
                GraphicsLayer,
                // eslint-disable-next-line @typescript-eslint/naming-convention
                Search,
                // eslint-disable-next-line @typescript-eslint/naming-convention
                FeatureLayer,
                // eslint-disable-next-line @typescript-eslint/naming-convention
                Point,
                projection,
                // eslint-disable-next-line @typescript-eslint/naming-convention
                SpatialReference,
                // eslint-disable-next-line @typescript-eslint/naming-convention
                LayerList,
                // eslint-disable-next-line @typescript-eslint/naming-convention
                Expand,
                // eslint-disable-next-line @typescript-eslint/naming-convention
                GroupLayer,
                // eslint-disable-next-line @typescript-eslint/naming-convention
                BasemapGallery,
                // eslint-disable-next-line @typescript-eslint/naming-convention
                MapImageLayer,
            ] = await loadModules([
                'esri/Map',
                'esri/views/MapView',
                'esri/Graphic',
                'esri/layers/GraphicsLayer',
                'esri/widgets/Search',
                'esri/layers/FeatureLayer',
                'esri/geometry/Point',
                'esri/geometry/projection',
                'esri/geometry/SpatialReference',
                'esri/widgets/LayerList',
                'esri/widgets/Expand',
                'esri/layers/GroupLayer',
                'esri/widgets/BasemapGallery',
                'esri/layers/MapImageLayer',
            ]);

            const mapProperties = {
                basemap: 'streets-vector',
            };

            this.map = new Map(mapProperties);

            const mapViewProperties = {
                container: this.mapViewEl.nativeElement,
                zoom: 17,
                center: [-71.955921, -13.53063],
                map: this.map,
            };
            this.view = new MapView(mapViewProperties);

            const layerList = new LayerList({
                view: this.view,
            });

            const layerListExpand = new Expand({
                view: this.view,
                content: layerList,
                id: 'maplayerListExpand',
                group: 'bottom-right',
            });

            const basemapGallery = new BasemapGallery({
                view: this.view,
            });

            basemapGallery.activeBasemap = 'satellite';

            const baseMapGalleryExpand = new Expand({
                view: this.view,
                content: basemapGallery,
                id: 'mapGalleryBaseExpand',
                group: 'bottom-right',
            });


            const toolbar = document.getElementById('toolbar');

            this.featureZonaUrbana = new FeatureLayer(this.urlSearchZonaUrbana);
            this.featureDistrito = new FeatureLayer(this.urlSearchDistrito);

            const featureDirecciones = new FeatureLayer(
                this.urlSearchDirecciones
            );

            const searchWidget = new Search({
                view: this.view,
                sources: [
                    {
                        layer: this.featureZonaUrbana,
                        searchFields: ['DISTRITO', 'UBIGEO'],
                        displayField: 'DISTRITO',
                        exactMatch: false,
                        outFields: ['UBIGEO', 'DISTRITO'],
                        name: 'DISTRITOS',
                    },

                    {
                        layer: featureDirecciones,
                        searchFields: ['DIR_MUN'],
                        displayField: 'DIR_MUN',
                        exactMatch: false,
                        outFields: ['DIR_MUN'],
                        name: 'DIRECCIONES',
                    },
                ],
            });

            searchWidget.on('select-result', (event) => {
                console.log('The selected search result: ', event);
                this.view.zoom = 16;
            });

            const labelClassVias = {
                // autocasts as new LabelClass()
                symbol: {
                    type: 'text', // autocasts as new TextSymbol()
                    color: 'black',
                    font: {
                        // autocast as new Font()
                        family: 'arial',
                        size: 8,
                        //weight: 'bold'
                    },
                },
                labelPlacement: 'above-center',
                labelExpressionInfo: {
                    expression: '$feature.TIP_VIA +" "+ $feature.NOM_VIA',
                },
            };

            this.layersInfo.reverse().map((l) => {
                const options = {
                    url: `${l.urlBase}/${l.idServer}`,
                    title: l.title,
                    outFields: ['*'],
                };

                if (l.title.includes('Via')) {
                    options['labelingInfo'] = [labelClassVias];
                }
                l.featureLayer = new FeatureLayer(options);
            });

            this.groupLayers.reverse().map((g) => {
                const fs = g.children.map(
                    (c) => this.layersInfo.find((l) => l.id === c)?.featureLayer
                );

                const demographicGroupLayer = new GroupLayer({
                    title: g.title,
                    layers: fs,
                });
                this.map.add(demographicGroupLayer);
            });

       
            const cs1 = new SpatialReference({
                wkid: 32717, //PE_GCS_ED_1950
            });

            this.view.on('click', (event) => {
                // only include graphics from hurricanesLayer in the hitTest

                let graphic = event.mapPoint;
                let longitude = graphic.longitude;
                let latitude = graphic.latitude;

                const point = {
                    //Create a point
                    type: 'point',
                    longitude: longitude,
                    latitude: latitude,
                };
                const intersect = this.queryIntersectFeaturelayer(
                    this.featureDistrito,
                    point
                );

                intersect.then((data: any) => {
                    if (data && data.attributes) {
                        const ubigeo = data.attributes['UBIGEO'];
                        console.log('ubigeo>>', ubigeo);

                        if (
                            this.idCargo === Role.DISTRITAL &&
                            this.userUbigeo !== ubigeo
                        ) {
                            this._messageProviderService.showAlert(
                                'El punto esta fuera de su ambito , porfavor seleccione un punto dentro del distrito'
                            );
                        } else {
                            const landRegistryMapModel: LandRegistryMapModel =
                                new LandRegistryMapModel();
                            landRegistryMapModel.latitude = latitude;
                            landRegistryMapModel.longitude = longitude;
                            landRegistryMapModel.ubigeo = ubigeo;

                            this.view.hitTest(event).then((response) => {
                                const results = response.results.filter((r) => {
                                    console.log(
                                        r,
                                        r.graphic,
                                        r.graphic.layer,
                                        r.graphic.layer.layerId
                                    );
                                    if (
                                        r &&
                                        r.graphic &&
                                        r.graphic.layer &&
                                        r.graphic.layer.layerId === 1
                                    ) {
                                        return r;
                                    }
                                });
                                console.log(results);

                                if (results.length > 0) {
                                    const resultsLen = results.length - 1;

                                    if (
                                        results[resultsLen] &&
                                        results[resultsLen].graphic &&
                                        results[resultsLen].graphic.geometry
                                    ) {
                                        graphic = results[resultsLen].graphic;
                                        //console.log('graphic>>', graphic);

                                        if (
                                            graphic &&
                                            graphic.attributes &&
                                            graphic.attributes['ID_LOTE']
                                        ) {
                                            //  console.log('graphic.attributes>>', graphic.attributes);
                                            latitude =
                                                graphic.geometry.latitude;
                                            longitude =
                                                graphic.geometry.longitude;

                                            latitude =
                                                graphic.attributes['COOR_Y'];
                                            longitude =
                                                graphic.attributes['COOR_X'];
                                            const lote = graphic.attributes;
                                            const _landRegistryMapModel: LandRegistryMapModel =
                                                new LandRegistryMapModel();
                                            console.log('lote>>',lote);
                                            _landRegistryMapModel.loteToLandRegistryMapModel(
                                                lote
                                            );

                                          
                              
                                            this.addPoint(
                                                latitude,
                                                longitude,
                                                this.simpleMarkerSymbol
                                            );
                                            this._landRegistryMapService.landOut =
                                            _landRegistryMapModel;

                                        }
                                    }
                                } else {

                                   
                                    this.addPoint(
                                        latitude,
                                        longitude,
                                        this.simpleMarkerSymbolUndefined
                                    );
                                    this._landRegistryMapService.landOut =
                                    landRegistryMapModel;
                                }
                            });
                        }
                    }
                });
            });

            const screenshotDiv = document.getElementById('screenshotDiv');

            this.view.when(() => {
                if (this.idCargo === Role.DISTRITAL && this.userUbigeo) {
                    const where = `UBIGEO='${this.userUbigeo}'`;
                    this.zoomToUbigeo(where);
                }

                this.view.ui.add(searchWidget, {
                    position: 'top-left',
                    index: 1,
                });

                this.view.ui.add([toolbar], {
                    position: 'top-right',
                });

                this.view.ui.add([baseMapGalleryExpand, layerListExpand], {
                    position: 'top-right',
                });

                this.view.ui.add([baseMapGalleryExpand, screenshotDiv], {
                    position: 'top-right',
                });
                /*const where = '\'UBIGEO = '
                zoomToUbigeo(where: string)*/
            });
        } catch (error) {
            console.error('EsriLoader: ', error);
        }
    }

    async addPoint(latitude, longitude, symbol): Promise<any> {
        try {
            const [
                // eslint-disable-next-line @typescript-eslint/naming-convention
                Graphic,
            ] = await loadModules(['esri/Graphic']);

            this.view.graphics.removeAll();

            console.log('latitude,longitude>>>', latitude, longitude);
            const point = {
                //Create a point
                type: 'point',
                longitude: longitude,
                latitude: latitude,
            };
            const pointGraphic = new Graphic({
                geometry: point,
                symbol: symbol,
                /*symbol: this.simpleMarkerSymbolUndefined*/
            });
            this.view.graphics.addMany([pointGraphic]);
        } catch (error) {
            console.error('EsriLoader: ', error);
        }
    }

    async zoomToUbigeo(where: string): Promise<any> {
        try {
            console.log('where>>>', where);
            console.log('this.featureZonaUrbana>>', this.featureZonaUrbana);
            MapUtils.zoomToFeature(this.view, this.featureZonaUrbana, where);
        } catch (error) {
            console.error('EsriLoader: ', error);
        }
    }

    async downloadPDF(): Promise<void> {

        const doc = new jsPDF();


        const screenshot = await this.view.takeScreenshot({
            format: 'jpg',
            quality: 100,
        });

        autoTable(doc, {
            theme: 'grid',
            styles: {
                lineWidth: 0,
                overflow: 'linebreak',
            },
            body: [
                [
                    {
                        content:
                            'DECLARACIÓN JURADA DE UBICACIÓN DE PREDIO - CATASTRO FISCAL',
                        colSpan: 2,
                        styles: {
                            halign: 'center',
                            fontStyle: 'bold',
                            fontSize: 16,
                        },
                    },

                    {
                        content: '',

                    },
                ],

                [
                    {
                        content: 'MUNICIPALIDAD DE  UBIGEO',
                        colSpan: 2,
                        styles: { halign: 'center', fontSize: 14 },
                    },
                    {
                        content: '',

                    },
                ],

                [
                    {
                        content:
                            'Yo,(CONTRIBUYENTE),  identificado(a) con DNI/RUC Nº (RUC/DNI), con datos de contacto (TELEFONO),(EMAIL), en pleno ejercicio de mis derechos ciudadanos ',
                            colSpan: 2,
                    },

                ],

                [
                    // eslint-disable-next-line max-len
                    {
                        content:
                            'DECLARO BAJO JURAMENTO: Que el predio con dirección (TIPO HABILITACIÓN, NOMBRE HABILITACIÓN, TIPO VIA, NOMBRE VIA, MANZANA, LOTE, N° ALTERNO, BLOQUE, INTERIOR, PISO, N° DEPARTAMENTO, KILOMETRO), se encuentra ubicado tal cual se muestra en el siguiente croquis:',
                            colSpan: 2,
                    },

                ],

                [
                    // eslint-disable-next-line max-len
                    {
                        content: 'CROQUIS DE UBICACIÓN',
                        colSpan: 2,
                        styles: {
                            halign: 'center',
                            fontStyle: 'bold',
                            fontSize: 14,
                        },
                    },
                    {
                        content: '',

                    },
                ],

                [
                    // eslint-disable-next-line max-len
                    {
                        content: '',
                        colSpan: 2,
                        styles: {
                            halign: 'center',
                            minCellHeight: 105
                            //fontStyle: 'bold',
                            //fontSize: 14,
                        },
                    },
                    {
                        content: '',

                    },
                ],



                [
                    // eslint-disable-next-line max-len
                    {
                        content: ' UBICACIÓN GEOGRÁFIA: (LATITUD/LONGITUD)',
                        colSpan: 2,
                        styles: {
                            halign: 'center',
                            fontStyle: 'bold',
                            //fontSize: 14,
                        },
                    },

                ],



                [
                    // eslint-disable-next-line max-len
                    {
                        content: 'Formulo la presente declaración jurada instruido(a) de las acciones administrativas, civiles y penales a las que me vería sujeto(a) en caso de falsedaden la presente declaración (Ley del Procedimiento Administrativo General, Ley Nº 27444, Artículo 32, numeral 32.3).',
                        colSpan: 2,
                    },

                ],

                [
                    // eslint-disable-next-line max-len
                    {
                        content: 'En señal de conformidad firmo el presente documento.',
                        colSpan: 2,

                    },

                    {
                        content: '',

                    },
                ],
                [
                    {
                        content: '',
                        styles: {
                            minCellWidth: 100
                        },
                    },

                    {
                        content: 'Distrito,(DIA) de (MES) del (AÑO)',

                    },
                ],

                [
                    {
                        content: '',
                        styles: {
                            minCellWidth: 100
                        },
                    },
                    // eslint-disable-next-line max-len
                    {
                        content: 'Firma : ____________________',

                    },
                ],

                [
                    {
                        content: '',
                        styles: {
                            minCellWidth: 100
                        },

                    },
                    // eslint-disable-next-line max-len
                    {
                        content: 'Huella : ____________________',

                    },
                ],

                [
                    {
                        content: 'Operador Plataforma: Jose Carlos Ramirez Tello',
                       colSpan:2,

                    },

                ],

            ],

            didDrawCell: (data: any) => {

                if (data.section === 'body' && data.column.index ===0 && data.row.index ===5){
                    console.log('data>>',data);
                    /*console.log('screenshot.dataUrl>>',screenshot.dataUrl);*/
                    doc.addImage(
                        screenshot.dataUrl,
                        'JPEG',
                        data.cell.x + 40,
                        data.cell.y ,
                        100,
                        100
                    );
                }

            },

        });


        doc.save('Declaración Jurada de Ubicación de Predio.pdf');
    }

    async saveGestionPredios(
        data: LandRegistryMapModel
        //_gestionPredios: GestionPredios

        ): Promise<void> {

        const district: DistrictResource =await this._commonService.getDistrictResource(data.ubigeo).toPromise();
        const utm=district.resources[0].utm;

                /*.subscribe((data: DistrictResource) => {
                    this.proj4Wkid = parseInt('327' + data.resources[0].utm, 10);
                });*/

        const _layer = this.layersInfo.find(
                    (e) =>  e.utm === utm
                );


        const wkid = parseInt('327' + utm, 10);
        /*const urlGestionPredios;*/
        ///0/addFeatures
        if (data.idLote) {
            const _predio=data.getPredios();
            const urlBase=`${_layer.urlBase}/0/addFeatures`;

            const json = await this.createArcgisJSON([_predio],wkid);

            console.log('json>>>', json);
            const formData = new FormData();
            formData.append('features', JSON.stringify(json));

            fetch(`${urlBase}`, {
                method: 'POST',
                body: formData,
            })
                .then((resObj) => {
                    this._messageProviderService.showSnack('Registro guardado correctamente');
                    /*this._fuseSplashScreenService.hide();
                this._messageProviderService.showSnack('Registrados cargados correctamente');*/
                })
                .catch((error) => {
                    this._messageProviderService.showSnack('Error de guardado');
                    /*this._messageProviderService.showSnackError('Registrados no cargados');*/
                });
        }else{
            const _gestionPredio=data.getGestionPredios();
            const urlBase = this.urlGestionPredios;
            const json = await this.createArcgisJSON([_gestionPredio],4326);

            const formData = new FormData();
            formData.append('features', JSON.stringify(json));

            fetch(`${urlBase}`, {
                method: 'POST',
                body: formData,
            })
                .then((resObj) => {
                    this._messageProviderService.showSnack('Registro guardado correctamente');
                    /*this._fuseSplashScreenService.hide();
                this._messageProviderService.showSnack('Registrados cargados correctamente');*/
                })
                .catch((error) => {
                    this._messageProviderService.showSnack('Error de guardado');
                    /*this._messageProviderService.showSnackError('Registrados no cargados');*/
                });

        }
    }

    /*/FeatureServer/0*/
    async createArcgisJSON(features: any[],projectionWkid: number): Promise<any[]> {
        const arcgisJson = [];
        /* eslint-disable @typescript-eslint/naming-convention */
        const [Graphic, Polyline,Point, projection, SpatialReference] =
            await loadModules([
                'esri/Graphic',
                'esri/geometry/Polyline',
                'esri/geometry/Point',
                'esri/geometry/projection',
                'esri/geometry/SpatialReference',
            ]);
        /* eslint-enable @typescript-eslint/naming-convention */
        const outSpatialReference = new SpatialReference(
            projectionWkid
        );


        return projection.load().then(() => {
            features.forEach((feature: any) => {

                if (projectionWkid!==4326)
                {
                    const geometryIni = new Point({
                        x: feature.COOR_X,
                        y: feature.COOR_Y,
                        spatialReference: {
                          wkid: 4326
                        }
                      });
                      const pointProject=projection.project(geometryIni, outSpatialReference);
                      feature.COOR_X=pointProject.x;
                      feature.COOR_Y=pointProject.y;
                }

                const geometry = {
                    x: feature.COOR_X,
                    y: feature.COOR_Y,
                };

                const attributes = FormUtils.deleteKeysNullInObject(feature);
                const geoFeature = {
                    geometry,
                    attributes,
                };
                arcgisJson.push(geoFeature);
            });
            return Promise.all(arcgisJson);
        });

    }

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    async queryIntersectFeaturelayer(layer: any, geometry: any) {
        const parcelQuery = {
            spatialRelationship: 'intersects', // Relationship operation to apply
            geometry: geometry, // The sketch feature geometry
            returnGeometry: true,
            outFields: ['UBIGEO'],
        };

        const results = await layer.queryFeatures(parcelQuery);
        let feature = {};
        if (results.features && results.features.length > 0) {
            feature = results.features[0];
        }
        return feature;
    }
}
