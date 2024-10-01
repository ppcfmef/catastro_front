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
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { TitleCasePipe } from '@angular/common';


@Component({
    selector: 'app-show-map-point',
    templateUrl: './show-map-point.component.html',
    styleUrls: ['./show-map-point.component.scss'],
})
export class ShowMapPointComponent
    implements OnInit, AfterViewInit, OnChanges, OnDestroy
{
    @Input() landOwner: LandOwner;
    @Input() landRecord: LandRecord;
    @Input() points: Coordinates[] = [
        { latitude: -13.53063, longitude: -71.955921 },
        { latitude: -13.54, longitude: -71.955921 },
    ];
    @ViewChild('mapViewNode', { static: false }) private mapViewEl: ElementRef;
    renderMap: boolean = false;
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
    dataUrl: string;
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
                    title: 'CF_SECTOR',
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
                    },
                },
                {
                    id: 8,
                    visible: false,
                    title: 'CF_MANZANA',
                },

                {
                    id: 7,
                    visible: true,
                    title: 'CF_PARQUES',
                },
                {
                    id: 6,
                    visible: true,
                    title: 'CF_UNIDADES_URBANAS',
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
                    },
                },
                {
                    id: 4,
                    visible: true,
                    title: 'CF_ARANCEL',
                },
                {
                    id: 3,
                    visible: true,
                    title: 'CF_NUMERACION',
                },

                {
                    id: 2,
                    visible: true,
                    title: 'CF_EJE_VIAL',
                    /*labelingInfo: {
                        symbol: {
                            type: 'text', // autocasts as new TextSymbol()
                            color: 'black',
                            font: {
                                // autocast as new Font()
                                family: 'arial',
                                size: 10,
                                weight: 'bold'
                            },
                        },
                        labelPlacement: 'above-center',
                        labelExpressionInfo: {
                            expression:'$feature.DES_VIA +" "+ $feature.NOM_VIA',
                        },
                    },*/
                },
                {
                    id: 1,
                    visible: false,
                    title: 'CF_LOTES_PUN',
                },

                {
                    id: 0,
                    visible: false,
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
                    },
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
            visible:false,
            sublayers: [
                {
                    id: 0,
                    visible: false,
                    title: 'ACT_ARANCEL',
                },
                {
                    id: 1,
                    visible: false,
                    title: 'ACT_MANZANA',
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
            visible:false,
            sublayers: [
                {
                    id: 0,
                    visible: false,
                    title: 'TB_PUNTO_IMG',
                },
            ],
        },
    ];
   /* subscription: Subscription;*/
    inicio: false;
    constructor(
        private _landRecordService: LandRecordService,
        private _commonService: CommonService,
        private _userService: UserService,
        private _changeDetectorRef: ChangeDetectorRef
    ) {
        pdfMake.vfs = pdfFonts.pdfMake.vfs;
    }
    ngOnDestroy(): void {
        /*this.subscription.unsubscribe();*/
        this._landRecordService.setLandRecordDownloadCroquis(null);
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
        //
        //throw new Error('Method not implemented.');
    }

    ngOnInit(): void {
        this.loadImage();
        this._landRecordService
            .getLandRecordDownloadCroquis()
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((res: boolean) => {
                /*console.log('descargar pdf', res);*/

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
        this.renderMap = this.points.every(
            point => point.latitude != null || point.longitude != null
        );
        if (this.renderMap) {
            setTimeout(() => {
                this.initializeMap();
            }, 0.001);
        }

        //this.points=[{latitude: -13.53063, longitude: -71.955921}] ;
    }

    ngOnChanges(): void {

        this.renderMap = this.points.every(
            point => point.latitude != null || point.longitude != null
        );

        if (this.view && this.renderMap) {
            this.addPoints(this.points);
        }
        /*if (this.view) {
            this.addPoints(this.points);
        }
        else{
            this.renderMap = this.points.every(
                point => point.latitude != null || point.longitude != null
            );
            this._changeDetectorRef.markForCheck();
            if (this.renderMap) {
                setTimeout(() => {
                    this.initializeMap();
                }, 0.001);
            }
        }*/

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
                LayerList,
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
                } else {
                    options = {
                        url: l.urlBase,
                        sublayers: l.sublayers,
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


            const textSymbol = {
                type: 'text',  // autocasts as new TextSymbol()
                color: 'black',
                haloColor: 'white',
                haloSize: '2px',
                text: this.landRecord.cup,
                xoffset: 25,
                yoffset: 15,
                font: {  // autocasts as new Font()
                  size: 10,

                  weight: 'bold'
                }
            };


            /*this.textSymbol.text*/

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

                const pointGraphicText = new Graphic({
                    geometry: point,
                    symbol: textSymbol,
                });
                this.view.graphics.addMany([pointGraphic,pointGraphicText]);
            });
        }
    }

    async downloadPDF(): Promise<void> {
        const _districtResource: DistrictResource = await this._commonService
            .getDistrictResource(this.landRecord.ubigeo)
            .toPromise();
        const utm = _districtResource?.resources[0]?.utm;
        const screenshot = await this.view?.takeScreenshot({
            format: 'jpg',
            quality: 100,
            with: 1280,
        });

        const now = moment();
        const formattedDate = now.format('DD/MM/YYYY HH:mm:ss');
        const formatO = moment(this.landOwner?.creationDate).format(
            'DD/MM/YYYY'
        );

        const originalWidth = 3300;
        const originalHeight = 697;
        const desiredWidth = 200;
        const desiredHeight = (desiredWidth / originalWidth) * originalHeight;

        const dd = {
            pageOrientation: 'landscape',
            footer: {
                fontSize: 8,
                columns: [
                    {
                        ul: [
                            {
                                text: `Registrador: ${this.user?.name}`, listType: 'none',lineHeight: 1.2
                            },
                            {
                                text: `Puesto Laboral : ${
                                    this.user
                                        ?.jobTitle
                                        ? this
                                                .user
                                                ?.jobTitle
                                        : '-'
                                }`,
                                listType: 'none',lineHeight: 1.2
                            },
                            {
                                text: `Fecha de Registro : ${
                                    formatO
                                        ? formatO
                                        : '-'
                                }`,
                                listType: 'none',lineHeight: 1.2
                            }
                          ],
                          alignment: 'right',
                          width:'98%',
                    },
                    // {
                    //     text: `Fecha: ${formattedDate}`,
                    //     alignment: 'right',
                    //     style: 'footer',
                    // },
                ],
            },
            content: [
                {
                    style: 'header',
                    layout: 'noBorders',
                    table: {
                        widths: ['*', 10, '*'],
                        body: [
                            [
                                {
                                    image: this.dataUrl,
                                    cover: {
                                        width: desiredWidth,
                                        height: desiredHeight,
                                        valign: 'bottom',
                                        align: 'right',
                                    },
                                },

                                '',

                                {
                                    stack: [
                                        'CATASTRO FISCAL - FICHA DE PREDIO',
                                        // eslint-disable-next-line max-len
                                        {   text:  _districtResource?.municipalName ?  _districtResource?.municipalName.toUpperCase() :  `MUNICIPALIDAD DE ${_districtResource?.name ?  _districtResource?.name : ''}`,
                                            style: 'subheader'
                                        },

                                    ],
                                    style: 'title',
                                },
                            ],
                        ],
                    },
                },
                {
                    style: 'headerData',
                    layout: 'noBorders',
                    table: {
                        widths: ['*', 10, '*'],
                        body: [
                            [
                                {
                                    text: 'DATOS DEL PREDIO',
                                    style: 'cellHeader',
                                },

                                '',

                                {
                                    text: 'CROQUIS',
                                    style: 'cellHeader',
                                },
                            ],
                            [
                                this.landOwner
                                    ? [
                                        {
                                            text: 'DATOS DEL CONTRIBUYENTE                                                                                                  ',
                                            style: 'colC',
                                        },
                                        {
                                            layout: 'noBorders',
                                            style: 'tableC',
                                            table: {
                                                widths: [105, 10, '*'],
                                                body: [
                                                    [
                                                        'RUC / DNI',
                                                        ':',
                                                        {
                                                            text: `${this.landOwner?.dni}`,
                                                            style: 'value',
                                                        },
                                                    ],
                                                    [
                                                        'Nombres y apellidos',
                                                        ':',
                                                        {
                                                            text: `${this.landOwner?.name} ${this.landOwner?.paternalSurname} ${this.landOwner?.maternalSurname}`,
                                                            style: 'value',
                                                        },
                                                    ],
                                                    [
                                                        'Domicilio Fiscal',
                                                        ':',
                                                        {
                                                            text: '-',
                                                            style: 'value',
                                                        },
                                                    ],
                                                ],
                                            },
                                        },

                                        {
                                            text: 'DATOS DE LA PROPIEDAD                                                                                                     ',
                                            style: 'colC',
                                        },
                                        {
                                              layout: 'noBorders',
                                              style: 'tableC',
                                              table: {
                                                  widths: [105, 10, '*'],
                                                  body: [
                                                      [
                                                          'Ubigeo',
                                                          ':',
                                                          {
                                                              text: `${
                                                                  this
                                                                      .landRecord
                                                                      .ubigeo
                                                                      ? this
                                                                            .landRecord
                                                                            .ubigeo
                                                                      : '-'
                                                              }`,
                                                              style: 'value',
                                                          },
                                                      ],
                                                      [
                                                          'Código de Predio Único',
                                                          ':',
                                                          {
                                                              text: `${
                                                                  this
                                                                      .landRecord
                                                                      .cup
                                                                      ? this
                                                                            .landRecord
                                                                            .cup
                                                                      : '-'
                                                              }`,
                                                              style: 'value',
                                                          },
                                                      ],
                                                      [
                                                          'Latitud',
                                                          ':',
                                                          {
                                                              text: `${
                                                                  this
                                                                      .landRecord
                                                                      .latitude
                                                                      ? this
                                                                            .landRecord
                                                                            .latitude
                                                                      : '-'
                                                              }`,
                                                              style: 'value',
                                                          },
                                                      ],
                                                      [
                                                          'Longitud:',
                                                          ':',
                                                          {
                                                              text: `${
                                                                  this
                                                                      .landRecord
                                                                      .longitude
                                                                      ? this
                                                                            .landRecord
                                                                            .longitude
                                                                      : '-'
                                                              }`,
                                                              style: 'value',
                                                          },
                                                      ],
                                                      [
                                                          'Área terreno',
                                                          ':',
                                                          {
                                                              text: `${
                                                                  this
                                                                      .landRecord
                                                                      ?.landArea
                                                                      ? this
                                                                            .landRecord
                                                                            ?.landArea +
                                                                        'mt2'
                                                                      : '-'
                                                              } `,
                                                              style: 'value',
                                                          },
                                                      ],
                                                      [
                                                          'Nombre de habilitación',
                                                          ':',
                                                          {
                                                              text: `${
                                                                  this
                                                                      .landRecord
                                                                      .habilitacionName
                                                                      ? this
                                                                            .landRecord
                                                                            .habilitacionName
                                                                      : '-'
                                                              }`,
                                                              style: 'value',
                                                          },
                                                      ],
                                                  ],
                                              },
                                        },
                                    ]
                                    : [
                                        {
                                            text: 'DATOS DEL CONTRIBUYENTE                                                                                                  ',
                                            style: 'colC',
                                        },
                                        {
                                            text: 'Predio no tiene contribuyentes registrados.',
                                            colSpan: 3,
                                            style: 'noDataAvailable',
                                            alignment: 'left',
                                        },
                                        {
                                            text: 'DATOS DE LA PROPIEDAD                                                                                                     ',
                                            style: 'colC',
                                        },
                                        {
                                            layout: 'noBorders',
                                            style: 'tableC',
                                            table: {
                                                widths: [105, 10, '*'],
                                                body: [
                                                    [
                                                        'Ubigeo',
                                                        ':',
                                                        {
                                                            text: `${
                                                                this
                                                                    .landRecord
                                                                    .ubigeo
                                                                    ? this
                                                                            .landRecord
                                                                            .ubigeo
                                                                    : '-'
                                                            }`,
                                                            style: 'value',
                                                        },
                                                    ],
                                                    [
                                                        'Código de Predio Único',
                                                        ':',
                                                        {
                                                            text: `${
                                                                this
                                                                    .landRecord
                                                                    .cup
                                                                    ? this
                                                                            .landRecord
                                                                            .cup
                                                                    : '-'
                                                            }`,
                                                            style: 'value',
                                                        },
                                                    ],
                                                    [
                                                        'Latitud',
                                                        ':',
                                                        {
                                                            text: `${
                                                                this
                                                                    .landRecord
                                                                    .latitude
                                                                    ? this
                                                                            .landRecord
                                                                            .latitude
                                                                    : '-'
                                                            }`,
                                                            style: 'value',
                                                        },
                                                    ],
                                                    [
                                                        'Longitud:',
                                                        ':',
                                                        {
                                                            text: `${
                                                                this
                                                                    .landRecord
                                                                    .longitude
                                                                    ? this
                                                                            .landRecord
                                                                            .longitude
                                                                    : '-'
                                                            }`,
                                                            style: 'value',
                                                        },
                                                    ],
                                                    [
                                                        'Área terreno',
                                                        ':',
                                                        {
                                                            text: `${
                                                                this
                                                                    .landRecord
                                                                    ?.landArea
                                                                    ? this
                                                                            .landRecord
                                                                            ?.landArea +
                                                                        'mt2'
                                                                    : '-'
                                                            } `,
                                                            style: 'value',
                                                        },
                                                    ],
                                                    [
                                                        'Nombre de habilitación',
                                                        ':',
                                                        {
                                                            text: `${
                                                                this
                                                                    .landRecord
                                                                    .habilitacionName
                                                                    ? this
                                                                            .landRecord
                                                                            .habilitacionName
                                                                    : '-'
                                                            }`,
                                                            style: 'value',
                                                        },
                                                    ],
                                                ],
                                            },
                                        },
                                    ],
                                {},
                                {
                                    style: 'columImg',
                                    table: {
                                        widths: [370],
                                        body: [
                                            [
                                                {
                                                    image: screenshot.dataUrl,
                                                    cover: {
                                                        width: 370,
                                                        height: 250,
                                                        valign: 'bottom',
                                                        align: 'center',
                                                    },
                                                },
                                            ],
                                        ],
                                    },
                                },
                            ],
                        ],
                    },
                },
            ],

            styles: {
                header: {
                    fontSize: 14,
                    bold: true,
                    margin: [-20, -20, -20, 10],
                },
                title: {
                    alignment: 'center',
                    margin: [0, 14],
                },

                subheader: {
                    fontSize: 10,
                    bold: false,
                    margin: [0, 4, 0, 0],
                },
                headerData: {
                    bold: true,
                    margin: [-20, 0, 0 - 20],
                },

                cellHeader: {
                    margin: [5, 3, 0, 3],
                    fillColor: '#E6F0FB',
                    color: '#007bff',
                },

                colC: {
                    margin: [5, 15, 0, 5],
                    decoration: 'underline',
                    decorationColor: '#e2e8f0',
                    lineHeight: 1.9,
                },
                columImg: {
                    margin: [0, 15, 0, 15],
                    decorationColor: '#e2e8f0',
                },
                tableC: {
                    bold: false,
                    margin: [8, 0, 5, 15],
                },
                key: {
                    color: '#1a2934',
                    bold: true,
                },

                value: {
                    color: '#3d454b',
                },
                footerText: {
                    fontSize: 8,
                },
                footer: {
                    margin: [0, 15, 20, 15],
                },
                noDataAvailable: {
                    margin: [5, 5, 20, 5],
                    color: '#3d454b',
                }
            },

            defaultStyle: {
                fontSize: 10,
                columnGap: 20,
                bold: false,

                // alignment: 'justify'
            },
        };
        pdfMake.createPdf(dd).download(`Ficha de Predio-${formattedDate}.pdf`);
    }

    takeFhoto(): void {
        this.view.takeScreenshot().then((screenshot) => {
            const imageElement: any =
                document.getElementById('screenshotImage');
            imageElement.src = screenshot.dataUrl;
        });
    };

    getImageDataURL(path): Promise<string> {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = (): any => {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);
                const dataURL = canvas.toDataURL('image/png');
                resolve(dataURL);
            };
            img.onerror = reject;
            img.src = path;
        });
    }

    async loadImage(): Promise<void> {
        try {
            this.dataUrl = await this.getImageDataURL('assets/images/logo/logo_mef.jpg');
        } catch (error) {
            console.error('Error loading the image:', error);
        }
    }
}
