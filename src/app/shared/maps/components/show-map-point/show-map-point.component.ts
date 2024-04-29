import { Coordinates } from '../../maps.type';
import {
    AfterViewInit,
    Component,
    ElementRef,
    Input,
    OnInit,
    ViewChild,
    OnChanges,
    OnDestroy,
    ChangeDetectorRef,
} from '@angular/core';
import { loadModules } from 'esri-loader';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { LandRecordService } from 'app/modules/admin/lands/land-registry/services/land-record.service';
import { LandRecord } from 'app/modules/admin/lands/land-registry/interfaces/land-record.interface';
import moment from 'moment';
import { CommonService } from 'app/core/common/services/common.service';
import { UserService } from 'app/core/user/user.service';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User } from 'app/core/user/user.types';
import { DistrictResource } from 'app/core/common/interfaces/common.interface';
import { LandOwner } from 'app/modules/admin/lands/land-registry/interfaces/land-owner.interface';
@Component({
    selector: 'app-show-map-point',
    templateUrl: './show-map-point.component.html',
    styleUrls: ['./show-map-point.component.scss'],
})
export class ShowMapPointComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
    @Input() landOwner: LandOwner;
    @Input() landRecord: LandRecord;
    @Input() points: Coordinates[] = [
        { latitude: -13.53063, longitude: -71.955921 },
        { latitude: -13.54, longitude: -71.955921 },
    ];
    @ViewChild('mapViewNode', { static: false }) private mapViewEl: ElementRef;
    renderMap: boolean;
    title = 'Gestor Cartográfico';
    view: any = null;
    map: any;
    user: User;
    _unsubscribeAll: Subject<any> = new Subject<any>();
    simpleMarkerSymbol = {
        type: 'picture-marker', // autocasts as new PictureMarkerSymbol()
        url: 'https://static.arcgis.com/images/Symbols/Shapes/RedPin1LargeB.png',
        width: '30px',
        height: '30px',
        yoffset: '15px',
        /*url: '/assets/images/map/location2.png',
        width: '20px',
        height: '30px',*/
    };

    layersInfo: any[] = [
        {
            title: 'Cartografia Fiscal',
            id: 0,
            idServer: 0,
            urlBase:
                'https://ws.mineco.gob.pe/serverdf/rest/services/pruebas/CARTO_FISCAL/MapServer',
            order: 0,
            featureLayer: null,
            definitionExpression: '1=1',
            featureTable: null,
            popupTemplate: null,
            legend: null,
            sublayers: [
                {
                    id: 10,
                    visible: true,
                    title: 'CF_SECTOR'
                },
                {
                    id: 9,
                    visible: true,
                    title: 'CF_MANZANA_URB',
                    labelingInfo: {
                        symbol: {
                            type: 'text', // autocasts as new TextSymbol()
                            color: 'blue',
                            haloColor: 'white',
                            haloSize: 1,
                            font: {
                                // autocast as new Font()
                                family: 'arial',
                                size: 10,
                                weight: 'bold',

                            },
                        },
                        labelPlacement: 'above-center',
                        labelExpressionInfo: {
                            expression: '$feature.MZN_URB',
                        },
                    }

                },
                {
                    id: 8,
                    visible: false,
                    title: 'CF_MANZANA'

                },


                {
                    id: 7,
                    visible: true,
                    title: 'CF_PARQUES'

                },
                {
                    id: 6,
                    visible: true,
                    title: 'CF_UNIDADES_URBANAS'
                },
                {
                    id: 5,
                    visible: true,
                    title: 'CF_LOTES',
                    labelingInfo: {
                        symbol: {
                            type: 'text',
                            color: 'black',
                            font: {

                                family: 'arial',
                                size: 10,
                                weight: 'bold',

                            },
                        },
                        labelPlacement: 'above-center',
                        labelExpressionInfo: {
                            expression: '$feature.LOT_URB',
                        },
                    }

                },
                {
                    id: 4,
                    visible: true,
                    title: 'CF_ARANCEL'
                },
                {
                    id: 3,
                    visible: true,
                    title: 'CF_NUMERACION'

                },

                {
                    id: 2,
                    visible: true,
                    title: 'CF_EJE_VIAL',
                    labelingInfo: {
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
                        },
                    }

                },
                {
                    id: 1,
                    visible: true,
                    title: 'CF_LOTES_PUN'

                },

                {
                    id: 0,
                    visible: true,
                    title: 'CF_PREDIO',
                    definitionExpression: 'ESTADO =1',
                    labelingInfo: {
                        symbol: {
                            type: 'text', // autocasts as new TextSymbol()
                            color: 'black',
                            font: {
                                // autocast as new Font()
                                family: 'arial',
                                size: 10,
                                //weight: 'bold'
                            },
                        },
                        labelPlacement: 'above-center',
                        labelExpressionInfo: {
                            expression: '$feature.COD_CPU',
                        },
                    }
                },
            ],
        },

        {
            idServer: 0,
            title: 'Actualizacion Cartográfica',
            id: 0,
            urlBase:
                'https://ws.mineco.gob.pe/serverdf/rest/services/ACTUALIZACION/CARTO_ACT/MapServer',
            order: 0,
            featureLayer: null,
            definitionExpression: '1=1',
            featureTable: null,
            popupTemplate: null,
            legend: null,
            sublayers: [
                {
                    id: 0,
                    visible: true,
                    title: 'ACT_ARANCEL'
                },
                {
                    id: 1,
                    visible: true,
                    title: 'ACT_MANZANA'
                },
            ],
        },

        {
            idServer: 0,
            title: 'Gestión de Predios',
            id: 0,
            urlBase:
                'https://ws.mineco.gob.pe/serverdf/rest/services/pruebas/GESTION_DE_PREDIOS/MapServer',
            order: 0,
            featureLayer: null,
            definitionExpression: '1=1',
            featureTable: null,
            popupTemplate: null,
            legend: null,
            sublayers: [
                {
                    id: 0,
                    visible: true,
                    title: 'TB_PUNTO_IMG'
                }
            ],
        },
    ];
    subscription: Subscription;
    constructor(
        private _landRecordService: LandRecordService,
        private _commonService: CommonService,
        private _userService: UserService,
        private _changeDetectorRef: ChangeDetectorRef,
    ) { }
    ngOnDestroy(): void {

        this.subscription.unsubscribe();
        //this._landRecordService.setLandRecordDownloadCroquis(false);
        //throw new Error('Method not implemented.');
    }

    ngOnInit(): void {
        console.log(this.landOwner, 'landOwner')
        console.log(this.landRecord, 'landRecord')
        console.log(this.points, 'points')
        this.subscription = this._landRecordService
            .getLandRecordDownloadCroquis()
            .subscribe((res: boolean) => {
                if (res) {
                    this.downloadPDF();
                }
            });

        this._userService.user$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((user: User) => {
                this.user = user;
                const ubigeo =
                    this.user.placeScope && this.user?.ubigeo
                        ? this.user?.ubigeo
                        : '150101';
            });

            this._changeDetectorRef.markForCheck();
    }

    ngAfterViewInit(): void {
        this.renderMap = this.points.every(point => point.latitude != null || point.longitude != null);
        console.log(this.renderMap, 'renderMap');
        if(this.renderMap) {
            console.log(this.renderMap, ' volver a reiniciar mapa');
            setTimeout(() => {
                this.initializeMap();
            }, 0.0010);
        }
        //this.points=[{latitude: -13.53063, longitude: -71.955921}] ;
    }

    ngOnChanges(): void {
        if (this.view) {
            console.log(this.view,'this.view');
            this.addPoints(this.points);
        }
        this.renderMap = this.points.every(point => point.latitude != null || point.longitude != null);
        this._changeDetectorRef.markForCheck();
        if(this.renderMap) {
            console.log(this.renderMap, ' volver a reiniciar mapa');
            setTimeout(() => {
                this.initializeMap();
            }, 0.0010);
        }
        console.log(this.renderMap, 'renderMap onchange');
        console.log(this.landRecord, 'landRecord onchange');
        console.log(this.points, 'points onchange');


    }
    /* eslint-disable @typescript-eslint/naming-convention */
    async initializeMap(): Promise<void> {
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
                MapImageLayer,
                Expand,
                BasemapGallery,
                LayerList
            ] = await loadModules([
                'esri/Map',
                'esri/views/MapView',
                'esri/Graphic',
                'esri/layers/GraphicsLayer',
                'esri/layers/MapImageLayer',
                'esri/widgets/Expand',
                'esri/widgets/BasemapGallery',
                'esri/widgets/LayerList',
            ]);

            const mapProperties = {
                basemap: 'streets-vector',
            };

            this.map = new Map(mapProperties);

            const mapViewProperties = {
                container: this.mapViewEl.nativeElement,
                zoom: 19,

                map: this.map,
            };

            this.view = new MapView(mapViewProperties);



            this.layersInfo.reverse().forEach(async (l) => {
                let options: any = {};

                if (l.sublayers === 'all') {
                    options = {
                        url: l.urlBase,
                    };
                }

                else {
                    options = {
                        url: l.urlBase,
                        sublayers: l.sublayers
                    };
                }

                const mapImageLayer = new MapImageLayer(options);

                this.map.add(mapImageLayer);

                const urlLegend = l.urlBase + '/legend?f=pjson';
                const response = await fetch(urlLegend);
                const legendLayers: any = await response.json();
                l.legend = legendLayers;
            });

            const basemapGallery = new BasemapGallery({
                view: this.view,
            });

            const baseMapGalleryExpand = new Expand({
                view: this.view,
                content: basemapGallery,
                id: 'mapGalleryBase',
                group: 'bottom-right',
            });

            const layerList = new LayerList({
                view: this.view,
            });

            const layerListExpand = new Expand({
                view: this.view,
                content: layerList,
                id: 'maplayerListExpand',
                group: 'bottom-right',
            });


            this.view.when(() => {
                this.addPoints(this.points);
                this.view.ui.add([baseMapGalleryExpand, layerListExpand], {
                    position: 'top-right',
                });
            });
        } catch (error) {
            console.error('EsriLoader: ', error);
        }
    }

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    async addPoints(inputPoints: Coordinates[] = []): Promise<void> {
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
            MapImageLayer,
        ] = await loadModules([
            'esri/Map',
            'esri/views/MapView',
            'esri/Graphic',
            'esri/layers/GraphicsLayer',
            'esri/layers/MapImageLayer',
        ]);

        this.view.graphics.removeAll();
        if (inputPoints.length > 0) {
            const x = inputPoints[0].longitude;
            const y = inputPoints[0].latitude;
            this.view.center = [x, y];
            inputPoints.forEach((inputPoint: Coordinates) => {
                const point = {
                    //Create a point
                    type: 'point',
                    longitude: inputPoint.longitude,
                    latitude: inputPoint.latitude,
                };
                const pointGraphic = new Graphic({
                    geometry: point,
                    symbol: this.simpleMarkerSymbol,
                });
                this.view.graphics.addMany([pointGraphic]);
            });
        }
    }

    async downloadPDF(): Promise<void> {
        const _districtResource: DistrictResource = await this._commonService
            .getDistrictResource(this.landRecord.ubigeo)
            .toPromise();
        const utm = _districtResource?.resources[0]?.utm;

        const legendJson = [];

        this.layersInfo
            .filter(l => l.title.includes(utm?.toString()))
            .forEach((l) => {
                const legendLayers = l.legend.layers;
                legendLayers.forEach((lf) => {
                    const layerName = lf.layerName;
                    const legend = lf.legend[0];
                    const imageData = legend.imageData;
                    legendJson.push({ layerName, imageData });
                });
            });

        console.log('legendJson>>', legendJson);

        const doc = new jsPDF();
        const data: any = document.getElementById('divDownloadPDF');
        const options = {
            background: 'white',
            scale: 3,
        };

        autoTable(doc, {
            theme: 'grid',
            styles: {
                overflow: 'hidden',
                lineWidth: 0,
                cellPadding: 2,
            },

            body: [
                [
                    {
                        content: 'FICHA DE PREDIO - CATASTRO FISCAL',
                        colSpan: 2,
                        styles: { halign: 'center', fontStyle: 'bold', fontSize: 14},
                    },
                ],

                [
                    {
                        content: `MUNICIPALIDAD DE ${_districtResource?.name} UBIGEO  ${this.landRecord.ubigeo}`,
                        colSpan: 2,
                        styles: { halign: 'center', fontStyle: 'normal', fontSize: 10,},
                    },
                ],

                [
                    { content: `Fecha:  ${moment().format('DD/MM/YYYY')}`,
                        styles: { halign: 'left', fontSize: 11,cellPadding: [12,4,4,8] , fontStyle: 'bold'},
                    },
                ],


                [
                    { content: `Datos del predio`,
                         styles: { halign: 'left', fontSize: 11,cellPadding: [1,4,4,8] , fontStyle: 'bold'}

                    },

                    {
                        content: `Datos del contribuyente`,
                        styles: { halign: 'left', fontSize: 10,cellPadding:[1,4,4,8], fontStyle: 'bold'},

                    },

                ],

                [
                    {
                        content: `Código Predial Único: ${this.landRecord.cup ? this.landRecord.cup : ''}`,
                        styles: { halign: 'left', fontSize: 10 ,cellPadding: [1,1,2,8]},

                    },
                    { content: `RUC / DNI: ${this.landOwner?.dni}`,
                      styles: { halign: 'left', fontSize: 10 ,cellPadding: [1,1,2,8]},
                    }

                ],
                [
                    {
                        content: `Código de Predio Municipal: ${this.landRecord.cpm ? this.landRecord.cpm : ''}`,
                        styles: { halign: 'left', fontSize: 10 ,cellPadding: [1,1,2,8]},

                    },
                    {
                        content: `Contribuyente: ${this.landOwner?.name} ${this.landOwner?.paternalSurname} ${this.landOwner?.maternalSurname}`,
                        styles: { halign: 'left', fontSize: 10 ,cellPadding: [1,1,2,8]},
                    }
                ],

                [
                    {
                        content: `Latitud: ${this.landRecord.latitude ? this.landRecord.latitude : ''}`,
                        styles: { halign: 'left', fontSize: 10 ,cellPadding: [1,1,2,8]},

                    },

                    { content: `Puesto Laboral: ${this.user?.jobTitle ? this.user?.jobTitle : '-'}`,
                        styles: { halign: 'left', fontSize: 10 ,cellPadding: [1,1,2,8]},

                    },
                ],

                [
                    {
                        content: `Longitud: ${this.landRecord.longitude ? this.landRecord.longitude : ''}`,
                        styles: { halign: 'left', fontSize: 10 ,cellPadding: [1,1,2,8]},

                    },
                    { content: `Usuario: ${this.user?.name}`,
                      styles: { halign: 'left', fontSize: 10 ,cellPadding: [1,1,2,8]},
                    },
                ],

                [
                    {
                        content: `Área terreno: ${this.landRecord?.landArea ? this.landRecord?.landArea + 'mt2' : '-'}   `,
                        colSpan: 2,
                        styles: { halign: 'left', fontSize: 10 ,cellPadding: [1,1,2,8]},
                    },
                ],


            ],
        });

        const screenshot = await this.view?.takeScreenshot({
            format: 'jpg',
            quality: 100,
        });

        doc.addImage(screenshot?.dataUrl, 'JPEG', 35, 100, 135, 75);
        const x: number = 35;
        const y: number = 200;
        const bodyLegend = [];

        const columns = 3;
        let array1 = [];

        // eslint-disable-next-line @typescript-eslint/no-shadow
        legendJson.forEach((l, i) => {
            array1 = array1.concat([{ content: '' }, { content: l.layerName }]);
            // eslint-disable-next-line eqeqeq
            if (i + 1 === legendJson.length || (i + 1) % columns === 0) {
                //array1  = array1.concat([{'content':''},{'content':l.layerName}]);
                bodyLegend.push(array1);
                array1 = [];
                //bodyLegend.push([{'content':''},{'content':l.layerName}]);
            } else {
                //array1  = array1.concat([{'content':''},{'content':l.layerName}]);
            }

            /*const l =[{'content':''},{'content':l.layerName}];*/

            /*doc.addImage(`data:image/jpeg;base64,${l.imageData}`, 'JPEG', x,y+i*5,4,4);
        doc.text(l.layerName, x+10,y+i*5);*/
        });

        console.log('bodyLegend>>>', bodyLegend);
        let i = 0;
        autoTable(doc, {
            theme: 'grid',
            startY: y,
            body: bodyLegend,
            columnStyles: {
                0: { cellWidth: 10 },
                1: { cellWidth: 50 },
                2: { cellWidth: 10 },
                3: { cellWidth: 50 },
                4: { cellWidth: 10 },
                5: { cellWidth: 50 },
                // etc
            },

            styles: {
                overflow: 'hidden',
                lineWidth: 0,
                //lineColor: [217, 216, 216]
            },
            // eslint-disable-next-line @typescript-eslint/no-shadow
            didDrawCell: (data: any) => {
                if (data.section === 'body' && data.column.index % 2 === 0) {
                    if (i + 1 <= legendJson.length) {
                        const base64Img = `data:image/jpeg;base64,${legendJson[i].imageData}`;
                        doc.addImage(
                            base64Img,
                            'JPEG',
                            data.cell.x + 2,
                            data.cell.y + 2,
                            4,
                            4
                        );
                    }

                    i = i + 1;
                }
            },
        });

        doc.save('Ficha de Predio.pdf');
    }

    takeFhoto(): void {
        this.view.takeScreenshot().then((screenshot) => {
            const imageElement: any =
                document.getElementById('screenshotImage');
            console.log('screenshot.dataUrl>>', screenshot.dataUrl);
            imageElement.src = screenshot.dataUrl;
        });
    }
}
