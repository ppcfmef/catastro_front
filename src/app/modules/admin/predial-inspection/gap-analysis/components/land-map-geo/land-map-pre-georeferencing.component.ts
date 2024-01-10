import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
    ViewChild,
} from '@angular/core';

import { ActionsGapAnalisys } from 'app/shared/enums/actions-gap-analisys.enum';
import { CustomConfirmationService } from 'app/shared/services/custom-confirmation.service';
import { environment } from 'environments/environment';
import { loadModules } from 'esri-loader';
import { TypePoint } from 'app/shared/enums/type-point.enum';
import { MapUtils } from 'app/shared/utils/map.utils';
import { LandAnalisysUI } from '../../interfaces/land.interface';
import { LandGeorreferencingStatusGapAnalisys } from 'app/shared/enums/land-georreferencing-status-gap-analisys.enum';
import { FuseSplashScreenService } from '@fuse/services/splash-screen';

@Component({
    selector: 'app-land-map-pre-georeferencing',
    templateUrl: './land-map-pre-georeferencing.component.html',
    styleUrls: ['./land-map-pre-georeferencing.component.scss'],
})
export class LandMapPreGeoreferencingComponent implements OnInit, OnChanges {
    @Input() land: LandAnalisysUI;
    @Input() ubigeo ='040703';
    @Input() event: any;
    @Input() estado = ActionsGapAnalisys.ASIGNAR_PUNTO;

    @Input() x: number = -71.955921;
    @Input() y: number = -13.53063;
    //@Output() asigLandEvent: EventEmitter<any> = new EventEmitter<any>();
    @Output() setPointEvent: EventEmitter<any> = new EventEmitter<any>();
    @ViewChild('mapViewNode', { static: true }) private mapViewEl: ElementRef;

    apiKey = environment.apiKeyArcgis;
    view: any = null;
    map: any;
    points: any[];

    /*groupLayers = [
        {
            id: 0,
            title: 'Cartografia Fiscal',
            children: [0, 1, 2, 3, 4],
        },
    ];*/
    urlPredio =
        'https://ws.mineco.gob.pe/serverdf/rest/services/pruebas/CARTO_FISCAL/MapServer/0';
    urlPuntoCampo =
        'https://ws.mineco.gob.pe/serverdf/rest/services/pruebas/CARTO_PUNTO_CAMPO/FeatureServer/0';
        idManzana=1;
    layersInfo = [
/*

        {
            title: 'Predios',
            id: 0,
            idServer: 0,
            urlBase:
                'https://ws.mineco.gob.pe/serverdf/rest/services/pruebas/CARTO_FISCAL/MapServer',
            order: 0,
            featureLayer: null,
            definitionExpression: '1=1',
            featureTable: null,
            popupTemplate: null,
            utm: null,
            projection: null,
            visible: false,
        },

        {
            title: 'Lotes Zona',
            id: 1,
            idServer: 1,
            urlBase:
                'https://ws.mineco.gob.pe/serverdf/rest/services/pruebas/CARTO_FISCAL/MapServer',
            order: 0,
            featureLayer: null,
            definitionExpression: '1=1',
            featureTable: null,
            popupTemplate: null,
            utm: null,
            projection: null,
            visible: true,
        },

        {
            title: 'Lotes Poligono Zona',
            id: 2,
            idServer: 5,
            urlBase:
                'https://ws.mineco.gob.pe/serverdf/rest/services/pruebas/CARTO_FISCAL/MapServer',
            order: 0,
            featureLayer: null,
            definitionExpression: '1=1',
            featureTable: null,
            popupTemplate: null,
            utm: null,
            projection: null,
            visible: true,
        },

        {
            title: 'Via Zona',
            id: 3,
            idServer: 2,
            urlBase:
                'https://ws.mineco.gob.pe/serverdf/rest/services/pruebas/CARTO_FISCAL/MapServer',
            order: 0,
            featureLayer: null,
            definitionExpression: '1=1',
            featureTable: null,
            popupTemplate: null,
            utm: null,
            projection: null,
            visible: true,
        },



        {
            title: 'Manzana',
            id: 4,
            idServer: 8,
            urlBase:
                'https://ws.mineco.gob.pe/serverdf/rest/services/pruebas/CARTO_FISCAL/MapServer',
            order: 0,
            featureLayer: null,
            definitionExpression: '1=1',
            featureTable: null,
            popupTemplate: null,
            utm: null,
            projection: 4326,
            visible: false,
        },
*/



{
    title: 'Manzana',
    id: 1,
    layerId: 8,
    urlBase: `${environment.apiUrlArcGisServer}/pruebas/CARTO_FISCAL/MapServer`,
    order: 0,
    featureLayer: null,
    definitionExpression: '1=1',
    featureTable: null,
    popupTemplate: null,
    utm: null,
    projection: 4326,
    visible: true,
    selected: false,
    labelClass: {
        // autocasts as new LabelClass()
        symbol: {
            type: 'text', // autocasts as new TextSymbol()
            color: 'black',
            yoffset: 5,
            font: {
                // autocast as new Font()
                family: 'Playfair Display',
                size: 12,
                weight: 'bold',
            },
        },
        labelPlacement: 'above-center',
        labelExpressionInfo: {
            expression: '$feature.COD_MZN',
        },
    },
    renderer:null

},

{
    title: 'Via Zona',
    id: 2,
    layerId: 2,
    urlBase: `${environment.apiUrlArcGisServer}/pruebas/CARTO_FISCAL/MapServer`,
    order: 0,
    featureLayer: null,
    definitionExpression: '1=1',
    featureTable: null,
    popupTemplate: null,
    utm: null,
    projection: null,
    visible: true,
    selected: false,
    renderer:null,
    labelClass: {
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
        expression: '$feature.DES_VIA +" "+ $feature.NOM_VIA',
    },}
},

{
    title: 'Lotes Poligono Zona',
    id: 3,
    layerId: 5,
    urlBase: `${environment.apiUrlArcGisServer}/pruebas/CARTO_FISCAL/MapServer`,
    order: 0,
    featureLayer: null,
    definitionExpression: '1=1',
    featureTable: null,
    popupTemplate: null,
    utm: null,
    projection: null,
    visible: true,
    selected: false,
    renderer:null
},

{
    title: 'Lotes Zona',
    id: 4,
    layerId: 1,
    urlBase: `${environment.apiUrlArcGisServer}/pruebas/CARTO_FISCAL/FeatureServer`,
    order: 0,
    featureLayer: null,
    definitionExpression: '1=1',
    featureTable: null,
    popupTemplate: null,
    utm: null,
    projection: 4326,
    visible: true,
    selected: false,
    renderer:null

},
    ];



    listSourceSearchConfig = [
        {
            url: `${environment.apiUrlArcGisServer}/pruebas/CARTO_TEMATICA_INEI/MapServer/0`,
            searchFields: ['COD_CPU'],
            displayField: 'COD_CPU',
            exactMatch: false,
            outFields: ['COD_CPU'],
            name: 'CODIGO CPU',
        },


        {
            url: `${environment.apiUrlArcGisServer}/pruebas/CARTO_FISCAL/MapServer/0`,

            searchFields: ['DIR_MUN'],
            displayField: 'DIR_MUN',
            exactMatch: false,
            outFields: ['DIR_MUN'],
            name: 'DIRECCION MUNICIPAL',
        },

        {
            url: `${environment.apiUrlArcGisServer}/pruebas/CARTO_FISCAL/MapServer/0`,
            searchFields: ['COD_PRE'],
            displayField: 'COD_PRE',
            exactMatch: false,
            outFields: ['COD_PRE'],
            name: 'CODIGO DE PREDIO',
        },

        {
            url: `${environment.apiUrlArcGisServer}/pruebas/CARTO_FISCAL/MapServer/2`,
            searchFields: ['NOM_VIA'],
            displayField: 'NOM_VIA',
            exactMatch: false,
            outFields: ['NOM_VIA'],
            name: 'CODIGO DE VIA',
        },
    ];



    simpleMarkerSymbol = {
        /*type: 'picture-marker',
        url: '/assets/images/map/location2.png',
        width: '20px',
        height: '30px',
        yoffset: '15px',*/
        type: 'simple-marker',
        style: 'square',
        size: '10px', // pixels
        color: [0, 255, 0, 0.5],

        outline: {
            color: [0, 255, 0], // White
            width: 1.5,
        },
    };

    simpleMarkerSymbolUndefined = {
        type: 'simple-marker',
        style: 'square',
        size: '14px', // pixels
        color: [0, 255, 255, 0.5],

        outline: {
            color: [0, 255, 255], // White
            width: 1.5,
        },
    };

    layerIdSelectPoint = 1;
    urlManzana =
        'https://ws.mineco.gob.pe/serverdf/rest/services/pruebas/CARTO_FISCAL/MapServer/8';
    constructor(private _confirmationService: CustomConfirmationService,
        protected _fuseSplashScreenService: FuseSplashScreenService,
        ) {}

    ngOnInit(): void {
        this.points = [{ latitude: -13.53063, longitude: -71.955921 }];
        setTimeout(() => {
            this.initializeMap(this.points,this.ubigeo);
        }, 1000);
    }

    async initializeMap(  inputPoints: any[] = [],
        ubigeo?: string): Promise<void> {
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
                BasemapGallery,
                // eslint-disable-next-line @typescript-eslint/naming-convention
                LayerList,
                // eslint-disable-next-line @typescript-eslint/naming-convention
                FeatureLayer,
                // eslint-disable-next-line @typescript-eslint/naming-convention
                GroupLayer,
                // eslint-disable-next-line @typescript-eslint/naming-convention
                Expand,
                // eslint-disable-next-line @typescript-eslint/naming-convention
                Search,
                // eslint-disable-next-line @typescript-eslint/naming-convention
                Legend,
            ] = await loadModules([
                'esri/Map',
                'esri/views/MapView',
                'esri/Graphic',
                'esri/layers/GraphicsLayer',
                'esri/widgets/BasemapGallery',
                'esri/widgets/LayerList',
                'esri/layers/FeatureLayer',
                'esri/layers/GroupLayer',
                'esri/widgets/Expand',
                'esri/widgets/Search',
                'esri/widgets/Legend'
            ]);

            const mapProperties = {
                basemap: 'streets-vector',
            };

            this.map = new Map(mapProperties);

            const mapViewProperties = {
                container: this.mapViewEl.nativeElement,
                zoom: 15,

                map: this.map,
            };
            this.view = new MapView(mapViewProperties);


            const x = inputPoints[0]?.longitude;
            const y = inputPoints[0]?.latitude;
            const point = {
                //Create a point
                type: 'point',
                longitude: x,
                latitude: y,
            };

            const simpleMarkerSymbol = {
                type: 'simple-marker',
                color: [226, 119, 40], // Orange
                outline: {
                    color: [255, 255, 255], // White
                    width: 1,
                },
            };

            const pointGraphic = new Graphic({
                geometry: point,
                symbol: simpleMarkerSymbol,
            });

            this.view.graphics.addMany([pointGraphic]);
            this.view.center = [x, y];

            const basemapGallery = new BasemapGallery({
                view: this.view,
            });

            const layerList = new LayerList({
                view: this.view,
            });

            basemapGallery.activeBasemap = 'satellite';

            this.layersInfo.map((l) => {
                const options: any = {
                    url: `${l.urlBase}/${l.layerId}`,
                    title: l.title,
                    outFields: ['*'],
                    visible: l.visible,
                    //popupEnabled: l.selected ? true : false,
                    //popupTemplate: popupTrailheads,
                    id: l.id,
                    popupEnabled: true,
                };

                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                l.labelClass ? (options.labelingInfo = [l.labelClass]) : null;
                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                l.renderer ? (options.renderer = l.renderer) : null;
                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                l.definitionExpression? (options.definitionExpression = l.definitionExpression) : null;

                l.featureLayer = new FeatureLayer(options);

                this.map.add(l.featureLayer);
            });

            const sources: any[] = [
                {
                    name: 'ArcGIS World Geocoding Service',
                    placeholder: 'Buscar Direccion',
                    apiKey: this.apiKey,
                    countryCode: 'PE',
                    singleLineFieldName: 'SingleLine',
                    url: 'https://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer',
                },
            ];

            this.listSourceSearchConfig.forEach((s: any) => {
                sources.push({
                    layer: new FeatureLayer(s.url),
                    searchFields: s.outFields,
                    displayField: s.displayField,
                    exactMatch: s.exactMatch,
                    outFields: s.outFields,
                    name: s.name,
                });
            });

            /*this.groupLayers.reverse().map((g) => {
                const fs = g.children.map(
                    c => this.layersInfo.find(l => l.id === c)?.featureLayer
                );

                const demographicGroupLayer = new GroupLayer({
                    title: g.title,
                    layers: fs,
                });
                this.map.add(demographicGroupLayer);
            });*/

            const layerListExpand = new Expand({
                view: this.view,
                content: layerList,
                id: 'maplayerListExpand',
                group: 'bottom-right',
            });

            const baseMapGalleryExpand = new Expand({
                view: this.view,
                content: basemapGallery,
                id: 'mapGalleryBaseExpand',
                group: 'bottom-right',
            });

            const searchWidget = new Search({
                view: this.view,
                includeDefaultSources: false,
                sources: sources,
                popupEnabled: false,
            });

            const legend = new Legend({
                view: this.view
              });


            searchWidget.on('select-result', (event) => {
                this.view.zoom = 19;
                console.log('event>>', event);
            });

            this.view.ui.add(searchWidget, {
                position: 'top-left',
                index: 1,
            });
            this.view.ui.add([baseMapGalleryExpand, layerListExpand], {
                position: 'top-right',
            });

            this.view.ui.add(legend, 'bottom-right');

            this.view.when(() => {
                this._fuseSplashScreenService.hide();
                console.log('this.land>>',this.land);
                if (ubigeo && this.estado !== ActionsGapAnalisys.LEER) {
                    this.filterUbigeo(this.ubigeo);
                }
                else if (this.estado === ActionsGapAnalisys.LEER && this.land && this.land.statusGapAnalisys===LandGeorreferencingStatusGapAnalisys.OBSERVADO ){
                    this.filterUbigeo(this.ubigeo);
                }

                else if(this.estado === ActionsGapAnalisys.LEER && this.land && this.land.statusGapAnalisys!==LandGeorreferencingStatusGapAnalisys.OBSERVADO ){

                    const pointGeometry = {
                        //Create a point
                        type: 'point',
                        longitude: this.land.longitude,
                        latitude: this.land.latitude,
                    };
                    let symbol=null;
                    if(this.land?.statusGapAnalisys ){
                        if(this.land?.statusGapAnalisys === LandGeorreferencingStatusGapAnalisys.UBICADO_CON_PREDIO)
                        {
                            symbol = this.simpleMarkerSymbol;
                        }

                        else if(this.land?.statusGapAnalisys === LandGeorreferencingStatusGapAnalisys.UBICADO_CON_PUNTO_CAMPO)
                        {
                            symbol = this.simpleMarkerSymbolUndefined;
                        }


                    }

                    //const symbol = ()?this.simpleMarkerSymbol:this.simpleMarkerSymbolUndefined;

                    this.addPoint(
                        pointGeometry,
                        symbol
                    );

                    this.view.center = pointGeometry;
                    this.view.zoom = 18;
                }


                this.view.on('click', (event) => {

                    console.log('event.mapPoint',event.mapPoint);

                    if (this.estado === ActionsGapAnalisys.LEER) {
                        this.view.hitTest(event).then((response) => {});
                    }

                    if (this.estado !== ActionsGapAnalisys.LEER) {
                        this.view.hitTest(event).then((response) => {
                            const results = response.results.filter((r) => {
                                if (
                                    r &&
                                    r.graphic &&
                                    r.graphic.layer &&
                                    r.graphic.layer.layerId ===
                                        this.layerIdSelectPoint
                                ) {
                                    return r;
                                }
                            });

                            if (results.length > 0) {
                                const resultsLen = results.length - 1;

                                if (
                                    results[resultsLen] &&
                                    results[resultsLen].graphic &&
                                    results[resultsLen].graphic.geometry
                                ) {
                                    const graphic = results[resultsLen].graphic;

                                    const longitude =
                                        graphic.geometry.longitude;
                                    const latitude = graphic.geometry.latitude;

                                    if (
                                        graphic &&
                                        graphic.attributes &&
                                        graphic.attributes['ID_LOTE']
                                    ) {
                                        const pointGeometry = {
                                            //Create a point
                                            type: 'point',
                                            longitude: longitude,
                                            latitude: latitude,
                                        };
                                        this.addPoint(
                                            pointGeometry,
                                            this.simpleMarkerSymbol
                                        );

                                        graphic.attributes['COORD_X'] =
                                            longitude;
                                        graphic.attributes['COORD_Y'] =
                                            latitude;

                                        const lote = graphic.attributes;

                                        if(!lote['ID_MZN_C']){
                                            const intersectFeature =
                                            MapUtils.queryIntersectFeaturelayer(
                                                new FeatureLayer(this.urlManzana),
                                                pointGeometry,5,'meters'
                                            );

                                        intersectFeature.then((data: any) => {

                                            if (data && data.attributes) {
                                                lote['ID_MZN_C']=data.attributes['ID_MZN_C'];
                                            }

                                                this.setPoint(
                                                    lote,
                                                    TypePoint.NUEVO_PUNTO_CAMPO
                                                );
                                            });
                                        }
                                        else{
                                            //lote['ID_MZN_C']=9999;
                                            this.setPoint(lote, TypePoint.LOTE);
                                        }
                                    }
                                }
                            } else {
                                const graphic = event.mapPoint;
                                const longitude = graphic.longitude;
                                const latitude = graphic.latitude;
                                // eslint-disable-next-line @typescript-eslint/no-shadow
                                const pointGeometry = {
                                    //Create a point
                                    type: 'point',
                                    longitude: longitude,
                                    latitude: latitude,
                                };

                                this.addPoint(
                                    pointGeometry,
                                    this.simpleMarkerSymbolUndefined
                                );

                                const intersectFeature =
                                    MapUtils.queryIntersectFeaturelayer(
                                        new FeatureLayer(this.urlManzana),
                                        pointGeometry,5,'meters'
                                    );

                                intersectFeature.then((data: any) => {
                                    const pointData: any = {};
                                    pointData['COORD_X'] = longitude;
                                    pointData['COORD_Y'] = latitude;
                                    console.log('data>>>',data);
                                    if (data && data.attributes) {
                                        pointData['ID_MZN_C'] =
                                            data.attributes['ID_MZN_C'];
                                        pointData['UBIGEO'] =
                                            data.attributes['UBIGEO'];
                                    }
                                    else{
                                        pointData['ID_MZN_C'] =9999;
                                    }

                                    console.log('pointData>>',pointData);
                                    this.setPoint(
                                        pointData,
                                        TypePoint.NUEVO_PUNTO_CAMPO
                                    );
                                });
                            }
                        });
                    }
                });
            });
        } catch (error) {
            console.error('EsriLoader: ', error);
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes?.event &&  changes?.event.currentValue ) {
            this.estado = changes?.event.currentValue;
        }
    }

    setPoint(point: any, type: string): void {
        this.setPointEvent.emit({ point, type });
    }

    filterUbigeo(ubigeo: string): void {
        const where = `UBIGEO='${ubigeo}'`;
        this.layersInfo.forEach((l) => {
            if (l.featureLayer) {
                const featureLayer = l.featureLayer;
                console.log('where', where);
                featureLayer.definitionExpression = where;
            }
        });

        this.zoomToUbigeo(where);
    }

    async zoomToUbigeo(where: string): Promise<any> {
        try {
            const layerManzana = this.layersInfo.find(
                (l: any) => l.id === this.idManzana
            )?.featureLayer;

            /*console.log('where>>>', where);
            console.log('this.featureZonaUrbana>>', this.featureZonaUrbana);*/
            if (this.view) {
                MapUtils.zoomToFeature(this.view, layerManzana, where).then(()=>{
                    this.view.zoom=16;
                });

            }
        } catch (error) {
            console.error('EsriLoader: ', error);
        }
    }

    async addPoint(point, symbol, estado: string = null): Promise<any> {
        try {
            const [
                // eslint-disable-next-line @typescript-eslint/naming-convention
                Graphic,
            ] = await loadModules(['esri/Graphic']);

            this.view?.graphics?.removeAll();

            /*const point = {
                //Create a point
                type: 'point',
                longitude: longitude,
                latitude: latitude,
            };*/
            const pointGraphic = new Graphic({
                geometry: point,
                symbol: symbol,
                /*symbol: this.simpleMarkerSymbolUndefined*/
            });
            this.view?.graphics?.addMany([pointGraphic]);
        } catch (error) {
            console.error('EsriLoader: ', error);
        }
    }
}
