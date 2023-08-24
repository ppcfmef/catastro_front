/* eslint-disable @typescript-eslint/naming-convention */
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
import { Predio } from 'app/modules/admin/lands/land-registry/interfaces/predio.interface';
import { LandRegistryMapModel } from 'app/modules/admin/lands/land-registry/models/land-registry-map.model';
import { ActionsGapAnalisys } from 'app/shared/enums/actions-gap-analisys.enum';
import { Actions } from 'app/shared/enums/actions.enum';
import { CustomConfirmationService } from 'app/shared/services/custom-confirmation.service';
import { FormUtils } from 'app/shared/utils/form.utils';
import { FormatUtils } from 'app/shared/utils/format.utils';
import { environment } from 'environments/environment';
import { loadModules } from 'esri-loader';
import { TypePoint } from 'app/shared/enums/type-point.enum';
import { PuntoCampoUI } from '../../interfaces/punto-campo.interface';
import { PredioUI } from '../../interfaces/predio.interface';
import { MapUtils } from 'app/shared/utils/map.utils';
import { TypeGapAnalisys } from 'app/shared/enums/type-gap-analisys.enum';
import { P } from '@angular/cdk/keycodes';
import { PredioModel } from 'app/modules/admin/land-inspection/gap-analisys/models/predio.model';
import { PuntoCampoModel } from 'app/modules/admin/land-inspection/gap-analisys/models/punto-campo.model';
import { PuntoCampoService } from '../../services/punto-campo.service';

let _this: any;
@Component({
    selector: 'app-gap-analysis-map',
    templateUrl: './gap-analysis-map.component.html',
    styleUrls: ['./gap-analysis-map.component.scss'],
})
export class GapAnalysisMapComponent implements OnInit, OnChanges {
    //@Input() view: any = null;
    @Input() rowZoom: any = null;
    @Input() typeGapAnalisys = TypeGapAnalisys.PREDIO_SIN_GEORREFERENCIACION;
    @Input() event: any;
    @Input() x: number = -71.955921;
    @Input() y: number = -13.53063;
    @Input() urlPredio = '';
    @Input() urlPuntoCampo = '';
    @Input() urlManzana = '';
    @Input() idManzana = 3;
    @Input() idPredio = 1;
    @Input() idPuntoCampo = 1;
    @Input() layersInfo = [];
    @Input() listSourceSearchConfig = [];

    @Output() setPointEvent: EventEmitter<any> = new EventEmitter<any>();
    @Output() refreshEvent: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild('mapViewNode', { static: true }) private mapViewEl: ElementRef;
    /*@Input() set rowZoom(value: any){
        this._rowZoom = value;
        this.onZoom();
    }*/



    _this = this;
    apiKey = environment.apiKeyArcgis;
    view: any = null;
    map: any;
    points: any[];
    estado = ActionsGapAnalisys.ASIGNAR_PUNTO;
    pointSelectSymbol = {
        type: 'simple-marker',
        style: 'square',
        size: '10px', // pixels
        color: [255, 241, 58, 0.5],
        fillOpacity: 0.2,
        outline: {
            color: [255, 241, 58], // White
            width: 1,
        },
    };
    polygonSelectSymbol = {
        type: 'simple-fill', // autocasts as new SimpleFillSymbol()
        color: [255, 241, 58, 0.5],
        style: 'solid',
        outline: {
            // autocasts as new SimpleLineSymbol()
            color: [255, 241, 58],
            width: 2,
        },
    };
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
    private _rowZoom: any;
    constructor(
        private _confirmationService: CustomConfirmationService,
        private _puntoCampoService: PuntoCampoService
    ) {}

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
                Search,
                // eslint-disable-next-line @typescript-eslint/naming-convention
                Popup,
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
                'esri/widgets/Popup',
            ]);

            const mapProperties = {
                basemap: 'streets-vector',
            };

            this.map = new Map(mapProperties);

            const mapViewProperties = {
                container: this.mapViewEl.nativeElement,
                zoom: 15,

                map: this.map,

                popup: {
                    autoOpenEnabled: false,
                },
                //highlightOptions: null,
                /*highlightOptions: {
                    color: [255, 241, 58],
                    fillOpacity: 0.4
                }*/
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
            console.log('this.layersInfo>>', this.layersInfo);
            const popupTrailheads = {
                title: 'Trailhead',
                content: 'Holass',
            };

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
            this.view.ui.add('logoDiv', 'bottom-right');
            this.view.when(() => {
                const verificarAction = {
                    // This text is displayed as a tooltip
                    title: 'Verificar',
                    // The ID by which to reference the action in the event handler
                    id: 'verificar',
                    // Sets the icon font used to style the action button
                    className: 'esri-icon-check-mark',
                };

                this.view.on('click', async (event) => {
                    /*function createPopupContent(target) {
                        return 'holassss';
                    };*/
                    this.points = [];
                    this.view.popup.close();
                    this.view.graphics.removeAll();
                    if (
                        this.typeGapAnalisys ===
                        TypeGapAnalisys.PREDIO_SUBVALUADO
                    ) {
                        const layerPredio = this.layersInfo.find(
                            (l: any) => l.id === this.idPredio
                        )?.featureLayer;

                        const layerManzana = this.layersInfo.find(
                            (l: any) => l.id === this.idManzana
                        )?.featureLayer;

                        console.log('event>', event.mapPoint);

                        const results: any[] =
                            await MapUtils.queryIntersectFeaturelayerResults(
                                layerPredio,
                                event.mapPoint,
                                5,
                                'meters'
                            );

                        if (results && results.length > 0) {
                            const r = results[0];
                            const geometry = r.geometry;
                            const graphic = new Graphic(
                                geometry,
                                this.pointSelectSymbol
                            );
                            this.view.graphics.add(graphic);
                            //const content='holass';
                            let content = `<table class="esri-widget__table">
                            <tr>
                              <th>Cod Manzana</th>
                              <th>Codigo de Predio</th>
                              <th></th>
                            </tr>
                            `;

                            content =
                                content +
                                `
                            <tr >
                              <td>${r.attributes['COD_MZN']}</td>
                              <td>${r.attributes['COD_PRE']}</td>

                            </tr>
                            `;
                            content = content + '</table>';
                            this.points.push(r);

                            this.view.popup.open({
                                location: event.mapPoint,
                                content: content,
                                actions: [verificarAction],
                            });
                        } else {
                            const resultsManzanas: any[] =
                                await MapUtils.queryIntersectFeaturelayerResults(
                                    layerManzana,
                                    event.mapPoint,
                                    1,
                                    'meters'
                                );

                            if (resultsManzanas && resultsManzanas.length > 0) {
                                const manzana = resultsManzanas[0];
                                const geometry = manzana.geometry;

                                const graphic = new Graphic(
                                    geometry,
                                    this.polygonSelectSymbol
                                );
                                this.view.graphics.add(graphic);

                                const resPoints: any[] =
                                    await MapUtils.queryIntersectFeaturelayerResults(
                                        layerPredio,
                                        geometry,
                                        1,
                                        'meters'
                                    );

                                if (resPoints && resPoints.length > 0) {
                                    let content = `<table class="esri-widget__table">
                                        <tr>
                                          <th>Cod Manzana</th>
                                          <th>Codigo de Predio</th>
                                        </tr>
                                        `;

                                    resPoints.forEach((r: any) => {
                                        const geometryPoint = r.geometry;
                                        const graphicPoint = new Graphic(
                                            geometryPoint,
                                            this.pointSelectSymbol
                                        );
                                        this.view.graphics.add(graphicPoint);

                                        content =
                                            content +
                                            `
                                                <tr >
                                                  <td>${r.attributes['COD_MZN']}</td>
                                                  <td>${r.attributes['COD_PRE']}</td>

                                                </tr>
                                                `;
                                        this.points.push(r);
                                    });

                                    content = content + '</table>';

                                    this.view.popup.open({
                                        location: event.mapPoint,
                                        content: content,
                                        actions: [verificarAction],
                                        declaredClass: 'customers',
                                    });
                                    //this.points
                                }
                            }


                        }
                    }
                });

                this.view.popup.on('trigger-action', (event) => {
                    if (event.action.id === 'verificar') {
                        const puntosCampo = this.points.map((p: any) => {
                            const puntoCampo = new PuntoCampoModel(
                                p.attributes
                            );
                            puntoCampo.Cod_Tipo_Ticket = String(
                                TypeGapAnalisys.PREDIO_SUBVALUADO
                            );
                            puntoCampo.Estado_tra = 1;
                            return puntoCampo;
                        });

                        const dialogRef = this._confirmationService.info(
                            'Guardar',
                            'Esta seguro de guardar el predio como predio subvaluado?'
                        );

                        dialogRef.afterClosed().toPromise()
                        .then(
                            (option) => {
                                if (option === 'confirmed') {
                                    this._puntoCampoService
                                    .crearPuntoCampo(puntosCampo)
                                    .then((results) => {
                                        this._confirmationService.success(
                                            'Exito',
                                            'puntos guardados'
                                        );
                                        this.view.popup.close();
                                        this.view.graphics.removeAll();
                                        const layerPuntoCampo = this.layersInfo.find(
                                            (l: any) => l.id === this.idPuntoCampo
                                        )?.featureLayer;

                                        layerPuntoCampo.refresh();
                                        this.refreshEvent.emit();
                                    });



                                }
                            }
                        );

                    }
                });
            });
        } catch (error) {
            console.error('EsriLoader: ', error);
        }
    }

    createPopupContent(feature: any): string {
        // Customize this HTML template based on your data's field names
        return `
          <div>

            <p>HOLASSS</p>

          </div>
        `;
        /*return `
          <div>
            <h3>${feature.attributes.COD_MZN}</h3>
            <p><b>Attribute 1:</b> ${feature.attributes.COD_PRE }</p>

          </div>
        `;*/
    }

    ngOnChanges(changes: SimpleChanges): void {
        const event = changes?.event?.currentValue;
        //console.log(event);
        if (event) {
            this.estado = event;
        }

        if (changes?.rowZoom) {
            this.rowZoom = changes?.rowZoom.currentValue;
            console.log(this.rowZoom);
            this.onZoom();
            //console.log('rowZoom>>',rowZoom);
        }
    }

    setPoint(point: any, type: string): void {
        this.setPointEvent.emit({ point, type });
    }

    async addPoint(point, symbol, estado: string = null): Promise<any> {
        try {
            const [
                // eslint-disable-next-line @typescript-eslint/naming-convention
                Graphic,
            ] = await loadModules(['esri/Graphic']);

            this.view?.graphics?.removeAll();

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

    async onZoom(): Promise<void> {
        if (this.view) {
            const feature=this.rowZoom.feature;
            const target = feature.geometry;
    /*view.goTo(parcel);
    //map.setExtent(parcelExtent);
    return (parcel);*/

            //this.view.zoom = 17;

            this.view.goTo(
                {
                    target: target,
                    //zoom: 18,
                },
                //zoom: 18,
            );
        }
    }
}
