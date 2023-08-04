import {
    AfterViewInit,
    Component,
    ElementRef,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
    ViewChild,
} from '@angular/core';
import { Predio } from 'app/modules/admin/lands/land-registry/interfaces/predio.interface';
import { LandRegistryMapModel } from 'app/modules/admin/lands/land-registry/models/land-registry-map.model';
import { ActionsGapAnalisys } from 'app/shared/enums/actions-gap-analisys.enum';
import { Actions } from 'app/shared/enums/actions.enum';
import { CustomConfirmationService } from 'app/shared/services/custom-confirmation.service';
import { FormUtils } from 'app/shared/utils/form.utils';
import { FormatUtils } from 'app/shared/utils/format.utils';
import { environment } from 'environments/environment';
import { loadModules } from 'esri-loader';
import { InspectionPointUI } from '../../interfaces/inspection-point.interface';

@Component({
    selector: 'app-land-map-pre-georeferencing',
    templateUrl: './land-map-pre-georeferencing.component.html',
    styleUrls: ['./land-map-pre-georeferencing.component.scss'],
})
export class LandMapPreGeoreferencingComponent implements OnInit,OnChanges {
    @Input() event: any;
    @Input() x: number = -71.955921;
    @Input() y: number = -13.53063;

    @ViewChild('mapViewNode', { static: true }) private mapViewEl: ElementRef;
    apiKey = environment.apiKeyArcgis;
    view: any = null;
    map: any;
    points: any[];
    estado = ActionsGapAnalisys.LEER;
    groupLayers = [
        {
            id: 0,
            title: 'Cartografia Fiscal',
            children: [-1, 0, 1, 2, 101],
        },
    ];
    urlPredio='https://ws.mineco.gob.pe/serverdf/rest/services/pruebas/CARTO_FISCAL/MapServer/0';
    urlReferencia='https://ws.mineco.gob.pe/serverdf/rest/services/pruebas/CAPAS_INSPECCION/MapServer/0';
    layersInfo = [
        {
            title: 'Predios',
            id: -1,
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
            id: 0,
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
            id: 1,
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
            id: 2,
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
            title: 'Manzana Urbana Zona',
            id: 101,
            idServer: 9,

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
            title: 'Arancel',
            id: 9,
            idServer: 0,
            urlBase:
                'https://ws.mineco.gob.pe/serverdf/rest/services/ACTUALIZACION/CARTO_ACT/MapServer',
            order: 0,
            featureLayer: null,
            definitionExpression: '1=1',
            featureTable: null,
            popupTemplate: null,
            utm: null,
            projection: 4326,
            visible: false,
        },

        {
            title: 'Manzana',
            id: 10,
            idServer: 1,
            urlBase:
                'https://ws.mineco.gob.pe/serverdf/rest/services/ACTUALIZACION/CARTO_ACT/FeatureServer',
            order: 0,
            featureLayer: null,
            definitionExpression: '1=1',
            featureTable: null,
            popupTemplate: null,
            utm: null,
            projection: 4326,
            visible: false,
        },

        {
            title: 'Punto Imagen',
            id: 11,
            idServer: 0,
            urlBase:
                'https://ws.mineco.gob.pe/serverdf/rest/services/ACTUALIZACION/ACTUALIZACION_DE_PUNTO_IMG/MapServer',
            order: 0,
            featureLayer: null,
            definitionExpression: '1=1',
            featureTable: null,
            popupTemplate: null,
            utm: null,
            projection: 4326,
            visible: false,
        },
    ];



    listSourceSearchConfig = [
        {
            url: 'https://ws.mineco.gob.pe/serverdf/rest/services/pruebas/CARTO_TEMATICA_INEI/MapServer/0',
            searchFields: ['COD_CPU'],
            displayField: 'COD_CPU',
            exactMatch: false,
            outFields: ['COD_CPU'],
            name: 'CODIGO CPU',
        },

        {
            url: 'https://ws.mineco.gob.pe/serverdf/rest/services/pruebas/CARTO_TEMATICA_INEI/MapServer/2',
            searchFields: ['DISTRITO', 'UBIGEO'],
            displayField: 'DISTRITO',
            exactMatch: false,
            outFields: ['DISTRITO', 'UBIGEO'],
            name: 'DISTRITOS',
        },

        {
            url: 'https://ws.mineco.gob.pe/serverdf/rest/services/pruebas/CARTO_FISCAL/FeatureServer/0',
            searchFields: ['DIR_MUN'],
            displayField: 'DIR_MUN',
            exactMatch: false,
            outFields: ['DIR_MUN'],
            name: 'DIRECCION MUNICIPAL',
        },

        {
            url: 'https://ws.mineco.gob.pe/serverdf/rest/services/pruebas/CARTO_FISCAL/FeatureServer/0',
            searchFields: ['COD_PRE'],
            displayField: 'COD_PRE',
            exactMatch: false,
            outFields: ['COD_PRE'],
            name: 'CODIGO DE PREDIO',
        },

        {
            url: 'https://ws.mineco.gob.pe/serverdf/rest/services/pruebas/CARTO_FISCAL/FeatureServer/0',
            searchFields: ['COD_CPU'],
            displayField: 'COD_CPU',
            exactMatch: false,
            outFields: ['COD_CPU'],
            name: 'CODIGO CPU',
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

    constructor(  private _confirmationService: CustomConfirmationService) {}

    ngOnInit(): void {
        this.points = [{ latitude: -13.53063, longitude: -71.955921 }];
        setTimeout(() => {
            this.initializeMap(this.points);
        }, 1000);
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
                Search
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

            const graphicsLayer = new GraphicsLayer();

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

            this.layersInfo.reverse().map((l) => {
                const options = {
                    url: `${l.urlBase}/${l.idServer}`,
                    title: l.title,
                    outFields: ['*'],
                    visible: l.visible,
                };

                l.featureLayer = new FeatureLayer(options);
            });

            const sources: any[] =[
                {
                    name: 'ArcGIS World Geocoding Service',
                    placeholder: 'Buscar Direccion',
                    apiKey: this.apiKey,
                    countryCode:'PE',
                    singleLineFieldName: 'SingleLine',
                    url: 'https://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer'}
            ];


            this.listSourceSearchConfig.forEach((s: any)=>{
                sources.push({

                    layer: new FeatureLayer(s.url),
                    searchFields: s.outFields,
                    displayField: s.displayField,
                    exactMatch: s.exactMatch,
                    outFields: s.outFields,
                    name: s.name,

                }
                );});




            this.groupLayers.reverse().map((g) => {
                const fs = g.children.map(
                    c => this.layersInfo.find(l => l.id === c)?.featureLayer
                );

                const demographicGroupLayer = new GroupLayer({
                    title: g.title,
                    layers: fs,
                });
                this.map.add(demographicGroupLayer);
            });



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
                sources:sources,
                popupEnabled:false
            });

            searchWidget.on('select-result', (event) => {
                this.view.zoom = 19;
                console.log('event>>',event);
            });


            this.view.ui.add(searchWidget, {
                position: 'top-left',
                index: 1,
            });
            this.view.ui.add([baseMapGalleryExpand, layerListExpand], {
                position: 'top-right',
            });


            this.view.when(() => {

                this.view.on('click', (event) => {
                    console.log('this.estado>>',this.estado);
                    if(this.estado === ActionsGapAnalisys.LEER){

                        this.view.hitTest(event).then((response) => {

                        });
                    }

                    if(this.estado !== ActionsGapAnalisys.LEER ){


                        this.view.hitTest(event).then((response) => {
                            const results = response.results.filter((r) => {
                                if (
                                    r &&
                                    r.graphic &&
                                    r.graphic.layer &&
                                    r.graphic.layer.layerId === 1
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
                                    console.log('graphic>>', graphic);

                                    //let graphic = event.mapPoint;
                                    const longitude = graphic.geometry.longitude;
                                    const latitude = graphic.geometry.latitude;

                                    if (
                                        graphic &&
                                        graphic.attributes &&
                                        graphic.attributes['ID_LOTE']
                                    ) {


                                        this.addPoint(
                                            latitude,
                                            longitude,
                                            this.simpleMarkerSymbol
                                        );


 /*
                                    const dialogRef = this._confirmationService.info(
                                        'Asignar Predio',
                                        'Desea asignar este predio?'
                                    );

                                    dialogRef.afterClosed().toPromise().then( (option) => {
                                        if (option === 'confirmed') {
                                            graphic.attributes['COORD_X'] = longitude;
                                            graphic.attributes['COORD_Y'] =latitude;


                                            const lote = graphic.attributes;
                                            console.log('lote>>',lote);

                                            const landRegistryMapModel = FormatUtils.formatLoteToLandRegistryMapModel(lote);
                                            console.log('landRegistryMapModel>>',landRegistryMapModel);
                                        }

                                        else{


                                        }


                                    });

                                    */

}
                                }
                            }

                            else{
                                const graphic = event.mapPoint;
                                const longitude = graphic.longitude;
                                const latitude = graphic.latitude;

                                this.addPoint(
                                    latitude,
                                    longitude,
                                    this.simpleMarkerSymbolUndefined
                                );
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

        const event=changes?.event.currentValue;
        console.log(event);
        if (event){
            this.estado =event;
        }

    }


    async addPoint(latitude, longitude, symbol,estado: string=null): Promise<any> {
        try {
            const [
                // eslint-disable-next-line @typescript-eslint/naming-convention
                Graphic,
            ] = await loadModules(['esri/Graphic']);

            this.view?.graphics?.removeAll();


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
            this.view?.graphics?.addMany([pointGraphic]);



        } catch (error) {
            console.error('EsriLoader: ', error);
        }
    }


    async savePredio(data: Predio): Promise<void> {

        const wkid = 4326;
        const _predio=data;
        //if (data.idPlot) {
            //const _predio= FormatUtils.formatLandRegistryMapModelToPredio(data);
            /*_predio.NOM_USER = this.user.username;
            _predio.NOM_PC = 'PLATAFORMA';
            _predio.ID_LOTE_P =this.lote.ID_LOTE_P;
            _predio.COD_MZN = (this.lote && this.lote?.COD_MZN)?this.lote.COD_MZN:null;
            _predio.COD_SECT = (this.lote && this.lote?.COD_SECT)?this.lote.COD_SECT:null;*/


            const urlBase=`${this.urlPredio.replace('MapServer','FeatureServer')}/addFeatures`;

            const json = await this.createArcgisJSON([_predio],wkid);

            const formData = new FormData();
            formData.append('features', JSON.stringify(json));
            formData.append('F', 'json');


            const response =   await fetch(`${urlBase}`, {
                method: 'POST',
                body: formData,
            });
            const responseJson = await response.json();
            //console.log('responseJson>>',responseJson);


                if(responseJson?.addResults){
                    const addFeature=responseJson?.addResults[0];

                }

        //}else{
            /*
            const _gestionPredio=  FormatUtils.formatLandRegistryMapModelToGestionPredio(data);

            _gestionPredio.NOM_USER = this.user.username;
            _gestionPredio.NOM_PC = 'PLATAFORMA';
            _gestionPredio.ESTADO=0;
            _gestionPredio.COD_MZN = (this.lote && this.lote?.COD_MZN)?this.lote.COD_MZN:null;
            _gestionPredio.COD_SECT = (this.lote && this.lote?.COD_SECT)?this.lote.COD_SECT:null;
            const urlBase = `${this.urlGestionPredios}/0/addFeatures`;
            const json = await this.createArcgisJSON([_gestionPredio],4326);

            const formData = new FormData();

            formData.append('features', JSON.stringify(json));
            formData.append('F', 'json');


            const response =   await fetch(`${urlBase}`, {
                method: 'POST',
                body: formData,
            });
            const responseJson: any = await response.json();
            console.log('responseJson>>',responseJson);
            if(responseJson?.addResults){
                const addFeature=responseJson?.addResults[0];
                data.idObjectImg=addFeature.objectId;
            }*/

        //}

        //return data;
    }

    async savePuntoInspeccion(data: InspectionPointUI): Promise<void> {
        const wkid = 4326;
        const _point=data;

            const urlBase=`${this.urlReferencia.replace('MapServer','FeatureServer')}/addFeatures`;

            const json = await this.createArcgisJSON([_point],wkid);

            const formData = new FormData();
            formData.append('features', JSON.stringify(json));
            formData.append('F', 'json');


            const response =   await fetch(`${urlBase}`, {
                method: 'POST',
                body: formData,
            });
            const responseJson = await response.json();


                if(responseJson?.addResults){
                    const addFeature=responseJson?.addResults[0];

                }
    }


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
                        x: feature.COORD_X,
                        y: feature.COORD_Y,
                        spatialReference: {
                          wkid: 4326
                        }
                      });
                      const pointProject=projection.project(geometryIni, outSpatialReference);
                      feature.COORD_X=pointProject.x;
                      feature.COORD_Y=pointProject.y;
                }

                const geometry = {
                    x: feature.COORD_X,
                    y: feature.COORD_Y,
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


}
