import {
    AfterViewInit,
    Component,
    ElementRef,
    OnInit,
    ViewChild,
} from '@angular/core';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.types';
import { loadModules } from 'esri-loader';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { arcgisToGeoJSON } from '@esri/arcgis-to-geojson-utils';
import { geojsonToArcGIS } from '@esri/arcgis-to-geojson-utils';
import { MessageProviderService } from 'app/shared/services/message-provider.service';
import { FuseSplashScreenService } from '@fuse/services/splash-screen';
//import * as shpwrite from 'shp-write';
declare let shpwrite: any;
import { saveAs } from 'file-saver';
import * as shp from 'shpjs';

import proj4 from 'proj4';
/*declare var Terraformer : any;*/
import { NgxSpinnerService } from 'ngx-spinner';
import {
    DistrictResource,
    Extension,
} from 'app/core/common/interfaces/common.interface';
import { MapUtils } from 'app/shared/utils/map.utils';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, AfterViewInit {
    @ViewChild('mapViewNode', { static: true }) private mapViewEl: ElementRef;
    drawerMode: 'side' | 'over';
    title = 'Gestor Cartográfico';
    view: any = null;
    map: any;
    layerList: any;
    visibility = 'hidden';
    featureLayer: any;
    link: any;
    user: User;
    _unsubscribeAll: Subject<any> = new Subject<any>();
    proj4Catalog = 'EPSG';

    proj4DestWkid = 32717;
    proj4ScrWkid = 4326;
    proj4SrcKey = this.proj4Catalog + ':' + String(this.proj4ScrWkid);
    proj4DestKey = this.proj4Catalog + ':' + String(this.proj4DestWkid);
    // eslint-disable-next-line max-len
    proj4DestWKT ='';
    reader: any;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    TITLE_DESCARGA = 'Arancel';
    // eslint-disable-next-line @typescript-eslint/naming-convention
    TITLE_CARGA = 'Arancel Carga';
    displayTable = 'none';


    groupLayers=[
        {
            id:0,
            title:'Zona 17',
            children:[0,1]
        },

        {
            id:1,
            title:'Zona 18',
            children:[2,3]
        },

        {
            id:2,
            title:'Zona 19',
            children:[4,5]
        },

        {
            id:3,
            title:'Cartografia Tematica Inei',
            children:[6]
        },

    ];
    layersInfo = [
        {
            idServer: 0,
            title: this.TITLE_DESCARGA + ' Zona 17',
            id: 0,
            urlBase:
                'https://ws.mineco.gob.pe/serverdf/rest/services/VALORIZACION/CARTO_VALORIZACION_17/MapServer',
            order: 0,
            featureLayer: null,
            definitionExpression: '1=1',
            featureTable: null,
            popupTemplate: null,
            projection: 32717,
        },

        {
            idServer: 1,
            title: this.TITLE_CARGA + ' Zona 17',
            id: 1,
            urlBase:
                'https://ws.mineco.gob.pe/serverdf/rest/services/VALORIZACION/CARTO_VALORIZACION_17/MapServer',
            order: 0,
            featureLayer: null,
            definitionExpression: '1=1',
            featureTable: null,
            popupTemplate: null,
            projection: 32717,
        },

        {
            idServer: 0,
            title: this.TITLE_DESCARGA + ' Zona 18',
            id: 2,
            urlBase:
                'https://ws.mineco.gob.pe/serverdf/rest/services/VALORIZACION/CARTO_VALORIZACION_18/MapServer',
            order: 0,
            featureLayer: null,
            definitionExpression: '1=1',
            featureTable: null,
            popupTemplate: null,
            projection: 32718,
        },

        {
            idServer: 1,
            title: this.TITLE_CARGA + ' Zona 18',
            id: 3,
            urlBase:
                'https://ws.mineco.gob.pe/serverdf/rest/services/VALORIZACION/CARTO_VALORIZACION_18/MapServer',
            order: 0,
            featureLayer: null,
            definitionExpression: '1=1',
            featureTable: null,
            popupTemplate: null,
            projection: 32718,
        },

        {
            idServer: 0,
            title: this.TITLE_DESCARGA + ' Zona 19',
            id: 4,
            urlBase:
                'https://ws.mineco.gob.pe/serverdf/rest/services/VALORIZACION/CARTO_VALORIZACION_19/MapServer',
            order: 0,
            featureLayer: null,
            definitionExpression: '1=1',
            featureTable: null,
            popupTemplate: null,
            projection: 32719,
        },

        {
            idServer: 1,
            title: this.TITLE_CARGA + ' Zona 19',
            id: 5,
            urlBase:
                'https://ws.mineco.gob.pe/serverdf/rest/services/VALORIZACION/CARTO_VALORIZACION_19/MapServer',
            order: 0,
            featureLayer: null,
            definitionExpression: '1=1',
            featureTable: null,
            popupTemplate: null,
            projection: 32719,
        },


        {
            idServer: 7,
            title: 'Distritos',
            id: 6,
            urlBase:
                'https://ws.mineco.gob.pe/serverdf/rest/services/pruebas/CARTO_TEMATICA_INEI/MapServer',
            order: 2,
            featureLayer: null,
            definitionExpression: '1=1',
            featureTable: null,
            popupTemplate: null,
        },
    ];

    mzsSeleccion = {
        type: 'simple-fill', // autocasts as new SimpleFillSymbol()
        //color: "green",
        outline: {
            // autocasts as new SimpleLineSymbol()
            color: 'green',
            width: '3px',
        },
    };

    mzsNotSeleccion = {
        type: 'simple-fill', // autocasts as new SimpleFillSymbol()
        //color: "green",
        outline: {
            // autocasts as new SimpleLineSymbol()
            color: 'red',
            width: '1px',
        },
    };


    where = '';
    nameZip = '';
    constructor(
        protected _ngxSpinner: NgxSpinnerService,
        private _userService: UserService,
        protected _messageProviderService: MessageProviderService,
        protected _fuseSplashScreenService: FuseSplashScreenService,

    ) {
        this._userService.user$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((user: User) => {
                this.user = user;
                // Mark for check
                /*this._changeDetectorRef.markForCheck();
                 */
            });
    }

    ngAfterViewInit(): void {
        this._fuseSplashScreenService.show(0);
        setTimeout(() => {
            this.initializeMap();
        }, 1000);
    }

    ngOnInit(): void {}
    /* eslint-disable @typescript-eslint/naming-convention */
    async initializeMap(): Promise<void> {
        try {
            const container = this.mapViewEl.nativeElement;
            const [
                Map,
                MapView,
                BasemapGallery,
                Track,
                GraphicsLayer,
                Locate,
                Graphic,
                Expand,
                FeatureLayer,
                LayerList,
                Legend,
                MapImageLayer,
                Query,
                Draw,
                projection,
                SpatialReference,
                Point,
                Search,
                FeatureTable,
                Popup,
                GroupLayer,
            ] = await loadModules([
                'esri/Map',
                'esri/views/MapView',
                'esri/widgets/BasemapGallery',
                'esri/widgets/Track',
                'esri/layers/GraphicsLayer',
                'esri/widgets/Locate',
                'esri/Graphic',
                'esri/widgets/Expand',
                'esri/layers/FeatureLayer',
                'esri/widgets/LayerList',
                'esri/widgets/Legend',
                'esri/layers/MapImageLayer',
                'esri/tasks/support/Query',
                'esri/views/draw/Draw',
                'esri/geometry/projection',
                'esri/geometry/SpatialReference',
                'esri/geometry/Point',
                'esri/widgets/Search',
                'esri/widgets/FeatureTable',
                'esri/widgets/Popup',
                'esri/layers/GroupLayer',
            ]);
            /* eslint-enable @typescript-eslint/naming-convention */

            const mapProperties = {
                basemap: 'streets-vector',
            };

            this.map = new Map(mapProperties);

            const mapViewProperties = {
                container: this.mapViewEl.nativeElement,
                zoom: 13,
                center: [-71.955921, -13.53063],
                map: this.map,
            };

            this.view = new MapView(mapViewProperties);

            const searchWidget = new Search({
                view: this.view,
            });

            const filterElement = document.getElementById('filterElement');

            const incidenteSearchExpand = new Expand({
                view: this.view,
                content: filterElement,
                expandIconClass: 'esri-icon-globe',
                id: 'ubigeoSearch',
                group: 'bottom-right'
            });

            const layerList = new LayerList({
                view: this.view,
            });

            const layerListExpand = new Expand({
              view: this.view,
              content: layerList,
              id: 'maplayerList',
              group: 'bottom-right',
            });

            const basemapGallery = new BasemapGallery({
              view: this.view,
            });

            basemapGallery.activeBasemap ='satellite';


            const baseMapGalleryExpand = new Expand({
              view: this.view,
              content: basemapGallery,
              id: 'mapGalleryBase',
              group: 'bottom-right'
            });

            const loadElement = document.getElementById('loadElement');

            this.view.ui.add(searchWidget, {
                position: 'top-left',
                index: 2,
            });

            this.view.ui.add(incidenteSearchExpand, {
                position: 'top-left',
            });

            this.view.ui.add([baseMapGalleryExpand,layerListExpand], {
                position: 'top-right',
            });

            this.view.ui.remove('zoom'); // Remover el boton Zoom;

            const fieldInfos = [
                {
                    fieldName: 'ID_ARAN',
                    label: 'ID_ARAN',
                },

                {
                    fieldName: 'UBIGEO',
                    label: 'UBIGEO',
                },

                {
                    fieldName: 'COD_SECT',
                    label: 'COD_SECT',
                },

                {
                    fieldName: 'COD_MZN',
                    label: 'COD_MZN',
                },
                {
                    fieldName: 'FREN_MZN',
                    label: 'FREN_MZN',
                },

                {
                    fieldName: 'COD_FREN',
                    label: 'COD_FREN',
                },

                {
                    fieldName: 'COD_VIA',
                    label: 'COD_VIA',
                },
                {
                    fieldName: 'TIP_VIA',
                    label: 'TIP_VIA',
                },

                {
                    fieldName: 'NOM_VIA',
                    label: 'NOM_VIA',
                },

                {
                    fieldName: 'CUADRA',
                    label: 'CUADRA',
                },

                {
                    fieldName: 'VAL_ACT',
                    label: 'VAL_ACT',
                },
                {
                    fieldName: 'FUENTE',
                    label: 'FUENTE',
                },
            ];
            const fieldConfigs = fieldInfos.map((e: any) => ({
                name: e.fieldName,
                label: e.label,
            }));

            const popupTemp = {
                title: 'Arancel',
                content: [
                    {
                        type: 'fields',
                        fieldInfos: fieldInfos,
                    },
                ],
            };

            this.layersInfo.reverse().map((l) => {

                const options = {
                    url: `${l.urlBase}/${l.idServer}`,
                    title: l.title,
                    outFields: ['*'],
                    definitionExpression: l.definitionExpression,
                };

                l.featureLayer = new FeatureLayer(options);

                if ([0, 1].includes(l.idServer)) {
                    popupTemp.title = l.title;
                    l.featureLayer.popupTemplate = popupTemp;
                    const featureTable = new FeatureTable({
                        layer: l.featureLayer,
                        multiSortEnabled: true,
                        /* visibleElements: { selectionColumn: false },*/
                        fieldConfigs: fieldConfigs,
                        container: document.getElementById('tableDiv'),
                    });
                }
                //this.map.add(l.featureLayer);
            });

            this.groupLayers.reverse().map((g) => {
                const fs=g.children.map(c=>   this.layersInfo.find(l=>l.id===c)?.featureLayer );
                const demographicGroupLayer = new GroupLayer({
                    title: g.title,
                    layers: fs,
                  });
                  this.map.add(demographicGroupLayer);
              });


            this.view.when(() => {
                this.visibility = 'visible';

                this._fuseSplashScreenService.hide();

                const params = {
                    district: '150101',
                    namedistrict: 'LIMA',
                };

                this.buscar(params);
            });

            /* const layer = this.layersInfo.find(e=> e.title===this.TITLE_DESCARGA).featureLayer;*/

            const searchElement = document.getElementById('searchElement');

            const searchExpand = new Expand({
                view: this.view,
                content: searchElement,
                declaredClass: 'search',
            });

            this.view.ui.add(layerListExpand, {
                position: 'top-right',
            });

            /*return this.view;*/
        } catch (error) {
            console.error('EsriLoader: ', error);
        }
    }
    /* eslint-enable @typescript-eslint/naming-convention */

    async zoomToUbigeo(where: string): Promise<any> {
        try {
            console.log('where>>', where);
            const layerDistrito = this.layersInfo.find(
                e => e.title === 'Distritos'
            ).featureLayer;

            this._fuseSplashScreenService.show(0);
            MapUtils.zoomToFeature(this.view, layerDistrito, where);

            this._fuseSplashScreenService.hide();

        } catch (error) {
            console.error('EsriLoader: ', error);
        }
    }

    buscar(params: any): void {
        console.log('params', params);
        const ubigeo = params.district;
        this.where = `UBIGEO='${ubigeo}'`;
        this.zoomToUbigeo(this.where);
        this.layersInfo.forEach((l) => {
            const featureLayer = l.featureLayer;
            featureLayer.definitionExpression = this.where;
        });


    }

    async descargar(params: any): Promise<void> {
        console.log('params>>>',params);
        this._fuseSplashScreenService.show();
        this.proj4DestWkid = params.projection;
        this.proj4SrcKey = this.proj4Catalog + ':' + String(this.proj4DestWkid);
        this.nameZip = `${params.namedistrict}.zip`;
        console.log('this.proj4DestWkid', this.proj4DestWkid);
        const [
            // eslint-disable-next-line @typescript-eslint/naming-convention
            FeatureLayer,
            proj4DestWKT,
            shpWrite,
        ] = await loadModules([
            'esri/layers/FeatureLayer',
            'dojo/text!https://epsg.io/' + this.proj4DestWkid + '.esriwkt',
        ]);


        const _layer = this.layersInfo.find(
            e => e.idServer === 0 && e.projection === params.projection
        );
        const _featureLayer = new FeatureLayer(
            _layer.urlBase + '/' + _layer.idServer
        );

        const query = _featureLayer?.createQuery();
        const ubigeo = params.district;
        query.where = `UBIGEO='${ubigeo}'`;
        query.outSpatialReference = this.proj4DestWkid;
        query.returnGeometry = true;
        const features = await MapUtils.queryFeaturesInLayer(
            _featureLayer,
            query
        );

        const geojson = await MapUtils.arcgisToGeoJSON(features);

        const options = {
            types: {
                point: 'points',
                polygon: 'polygons',
                polyline: 'polylines',
            },
            wkt: proj4DestWKT,
        };

        shpwrite.zip(geojson, options).then((content) => {
            saveAs(content, this.nameZip);
            this._fuseSplashScreenService.hide();
            this._messageProviderService.showAlert(
                'Descarga Exitosa'
            );
        });
    }

    downloadFile(content, mimeType, fileName, useBlob): any {
        mimeType = mimeType || 'application/octet-stream';
        const url = null;
        const dataURI = 'data:' + mimeType + ',' + content;
        this.link = document.createElement('a');
        const blob = new Blob([content], {
            type: mimeType,
        });

        const a = document.createElement('a');
        const objectUrl = URL.createObjectURL(blob);
        a.href = objectUrl;
        a.download = 'archive.zip';
        a.click();

        window.focus();
    }
/*
    async createGeoJSON(
        features: any[],
        isProject: boolean = false
    ): Promise<any> {
        if (features.length < 1) {
            return null;
        }

        const geojson = {
            type: 'FeatureCollection',
            features: [],
        };
        const type = 'shapefile';
        let featureID = 1;

        await features.forEach(async (feature) => {
            const attr = feature.attributes;
            if (typeof attr.feature === 'object') {
                delete attr.feature;
            }

            for (const key in attr) {
                if (key.includes('.')) {
                    delete attr[key];
                }
            }

            if (feature.geometry) {
                if (isProject) {
                    const g = MapUtils.projectGeometry(feature.geometry,this.proj4DestWkid);
                    feature.geometry = g;
                }

                const geoFeature = arcgisToGeoJSON(feature);
                const geom = geoFeature.geometry;

                if (
                    type === 'shapefile' &&
                    (geom.type === 'MultiPolygon' ||
                        geom.type === 'MultiLineString')
                ) {
                    const props = feature.properties;
                    for (
                        let i = 0, len = geom.coordinates.length;
                        i < len;
                        i++
                    ) {
                        const feat = {
                            geometry: {
                                type: geom.type.replace('Multi', ''),
                                coordinates: geom.coordinates[i],
                            },
                            id: featureID++,
                            properties: props,
                            type: 'Feature',
                        };
                        geojson.features.push(feat);
                    }
                } else {
                    geoFeature.id = featureID++;
                    geojson.features.push(geoFeature);
                }
            } else {
            }
        });

        return geojson;
    }
*/
    /*/FeatureServer/0*/
    async createArcgisJSON(features: any[]): Promise<any[]> {
        const arcgisJson = [];
        /* eslint-disable @typescript-eslint/naming-convention */
        const [Graphic, Polyline, projection, SpatialReference] =
            await loadModules([
                'esri/Graphic',
                'esri/geometry/Polyline',
                'esri/geometry/projection',
                'esri/geometry/SpatialReference',
            ]);
        /* eslint-enable @typescript-eslint/naming-convention */

        const outSpatialReference = new SpatialReference(this.proj4DestWkid);

        return projection.load().then(() => {
            features.forEach((feature) => {
                const attr = feature.properties;

                for (const key in attr) {
                    if (!attr[key] || key === 'OBJECTID') {
                        delete attr[key];
                    }
                }

                if (feature.geometry) {
                    const geoFeature = geojsonToArcGIS(feature);
                    const newGeometry = projection.project(
                        geoFeature.geometry,
                        outSpatialReference
                    );
                    geoFeature.geometry = {
                        paths: newGeometry.paths,
                        spatialReference: {
                            wkid: newGeometry.spatialReference.wkid,
                        },
                    };
                    arcgisJson.push(geoFeature);
                }
            });
            return Promise.all(arcgisJson);
            //  return arcgisJson;
        });

        //return arcgisJson;
    }

    cargar(params: any): void {
        /*console.log(params);*/
        const file = params.fileToUpload;

        this.proj4DestWkid = params.projection;
        const reader = new FileReader();
        this._fuseSplashScreenService.show(0);
        reader.onloadend = (e): void => {
            //console.log(reader.result);
            this.shapeToGeoJson(reader.result);
            //this.fileString = reader.result as string;
        };
        reader.readAsArrayBuffer(file);
    }

    shapeToGeoJson(data: any): void {
        shp(data).then((geojson: any) => {
            this.createArcgisJSON(geojson.features).then((json) => {
               /* const layerInfo = this.layersInfo.find((e) =>
                    e.title.includes(this.TITLE_CARGA)
                );*/

                const _layer = this.layersInfo.find(
                    e => e.idServer === 1 && e.projection === this.proj4DestWkid
                );
                const url =
                    `${_layer.urlBase}/${_layer.idServer}/addFeatures`.replace(
                        'MapServer',
                        'FeatureServer'
                    );
                const body = { features: json };

                const formData = new FormData();
                formData.append('features', JSON.stringify(json));

                fetch(`${url}`, {
                    method: 'POST',
                    body: formData,
                })
                    .then((resObj) => {
                        this._fuseSplashScreenService.hide();
                       /* this._messageProviderService.showConfirm(
                            'Descarga Exitosa'
                        );*/
                        this._messageProviderService.showAlert(
                            'Carga Exitosa'
                        );
                    })
                    .catch((error) => {
                        this._messageProviderService.showAlert(
                            'Registrados no cargados'
                        );
                    });
            });
        });
    }



}
