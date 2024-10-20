/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable space-before-function-paren */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
    AfterViewInit,
    Component,
    ElementRef,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    SimpleChanges,
    ViewChild,
} from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {
    DistrictResource,
    IPagination,
} from 'app/core/common/interfaces/common.interface';

import { CommonService } from 'app/core/common/services/common.service';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.types';
import { MapUtils } from 'app/shared/utils/map.utils';
import { loadModules } from 'esri-loader';
import { Subject, forkJoin } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GestionPredio } from '../../interfaces/gestion-predios.interface';
import { Land, LandMapIn } from '../../interfaces/land-map-in.interface';
import { LandRegistryMap } from '../../interfaces/land-registry-map.interface';
import { LandMapInModel } from '../../models/land-map-in.model';
import { LandRegistryMapModel } from '../../models/land-registry-map.model';
import { LandRegistryMapService } from '../../services/land-registry-map.service';
import { environment } from 'environments/environment';
import { arcgisToGeoJSON } from '@esri/arcgis-to-geojson-utils';
import { geojsonToArcGIS } from '@esri/arcgis-to-geojson-utils';
import { FormUtils } from 'app/shared/utils/form.utils';
import { MessageProviderService } from 'app/shared/services/message-provider.service';
import { Role } from 'app/shared/enums/role.enum';
import { FormatUtils } from 'app/shared/utils/format.utils';
import { Estado } from 'app/shared/enums/estado-map.enum';
import { LandRegistryService } from '../../services/land-registry.service';
import { LandOwnerModel } from '../../models/land-owner.model';
//import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import moment from 'moment';
import { CustomConfirmationService } from 'app/shared/services/custom-confirmation.service';
import { LandOwner } from '../../interfaces/land-owner.interface';
import { MasterDomain } from '../../interfaces/master-domain.interface';
import { Lote } from '../../interfaces/lote.interface';
import { FuseSplashScreenService } from '@fuse/services/splash-screen';
import { LandRecordService } from '../../services/land-record.service';
import { LandOwnerService } from '../../services/land-owner.service';
import { LandRecord } from '../../interfaces/land-record.interface';
import { MatDialog } from '@angular/material/dialog';
import { AlertLandOwnerComponent } from '../alert-land-owner/alert-land-owner.component';
import { CommonUtils } from 'app/core/common/utils/common.utils';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

moment.locale('es');
@Component({
    selector: 'app-land-registry-geolocation',
    templateUrl: './land-registry-geolocation.component.html',
    styleUrls: ['./land-registry-geolocation.component.scss'],
})
export class LandRegistryGeolocationComponent
    implements OnInit, AfterViewInit, OnDestroy, OnChanges {

    @Input() ownerId: number = 639476.5456999997;
    @Input() x: number = 639476.5456999997;
    @Input() y: number = 9265200.7227;
    @Input() cancelEvent: boolean = false;
    @ViewChild('mapViewNode', { static: true }) private mapViewEl: ElementRef;

    apiKey =
        'AAPKd8485a61542546879a30f6253592219eTlqeQbra0smKAuDW-tcUE55FiZCbyzYoD8Fvpqa_HtEfQJa-NEibqLyQOuYQEap9';
    masterDomain: MasterDomain;
    title = 'Gestor Cartográfico';
    view: any = null;
    map: any;
    points: any[];
    user: User;
    _unsubscribeAll: Subject<any> = new Subject<any>();
    estado = Estado.INICIAR;
    dataUrl: string;
    userUbigeo: string = '010101';
    /*projection: number=32717;*/
    proj4Catalog = 'EPSG';
    idCargo = 1;
    proj4Wkid = 32717;
    proj4GestionPrediosWkid = 4326;
    displayImprimir = 'none';
    displaySave = 'none';
    displayEditPoint = 'none';
    /*proj4ScrWkid=4326;*/
    proj4Src = this.proj4Catalog + ':' + String(this.proj4Wkid);
    layerList: any;
    lote: Lote;
    groupLayers = [
        /* {
            id: 0,
            title: 'Zona 17',
            children: [0, 1, 2,101],
        },

        {
            id: 1,
            title: 'Zona 18',
            children: [3, 4, 5,102],
        },

        {
            id: 2,
            title: 'Zona 19',
            children: [6, 7, 8,103],
        },
*/

        {
            id: 0,
            title: 'Cartografia Fiscal',
            children: [2, 3, 4,0, -1],
        },

        {
            id: 3,
            title: 'Actualizacion Cartografica',
            children: [9, 10],
        },

        {
            id: 4,
            title: 'Gestión de Predios',
            children: [11],
        },
    ];
    landRegistryMapModel: LandRegistryMapModel;
    simpleMarkerSymbol = {
        /*type: 'web-style',
        name: 'tear-pin-1',
        styleName: 'Esri2DPointSymbolsStyle',
        width: '20px'*/
        type: 'picture-marker',
        url: 'https://static.arcgis.com/images/Symbols/Shapes/RedPin1LargeB.png',
        //url: '/assets/images/map/location2.png',
        width: '50px',
        height: '50px',
        yoffset: '15px',
    };

    simpleMarkerSymbolUndefined = {
        type: 'picture-marker',
        url: 'https://static.arcgis.com/images/Symbols/Shapes/BluePin1LargeB.png',
        width: '50px',
        height: '50px',
        yoffset: '15px',
    };


    simpleMarkerSymbolEntrada = {
        type: 'simple-marker',
        style: 'square',
        size: '10px', // pixels
        color: [0, 255, 0, 0.5],

        outline: {
            color: [0, 255, 0], // White
            width: 1.5,
        },
    };


    simpleMarkerSymbolEntrada2 = {
        type: 'picture-marker',
        url: 'https://static.arcgis.com/images/Symbols/Shapes/GreenPin1LargeB.png',
        width: '30px',
        height: '30px',
        yoffset: '15px',
    };
    /*simpleMarkerSearch = {
        type: 'simple-marker',
        style: 'square',
        size: '10px', // pixels
        color: [0, 255, 0, 0.5],

        outline: {
            color: [0, 255, 0], // White
            width: 1.5,
        },
    };*/

    simpleMarkerSearch = {
        /* type: 'web-style',*/

        type: 'picture-marker',
        url: 'https://static.arcgis.com/images/Symbols/Shapes/GreenPin1LargeB.png',

        /* name: 'push-pin-1',
        styleName: 'Esri2DPointSymbolsStyle',*/
        width: '30px',
        height: '30px',
    };
    /*simpleMarkerSymbolUndefined = {
        type: 'web-style',
        name: 'tear-pin-2',
        styleName: 'Esri2DPointSymbolsStyle',
        width: '20px'

    };



    var popupTemplate = new PopupTemplate({
  title: "{Name}",
  content: `
    <b>Nombre:</b> {Name} <br>
    <b>Tipo:</b> {Type} <br>
    <b>Descripción:</b> {Description} <br>
    <img src="{ImageUrl}" alt="{Name}" width="200" height="150">
  `
});

    */

    layersInfo = [
        {
            title: 'Predios',
            id: -1,
            idServer: 0,
            urlBase:
                `${environment.apiUrlArcGisServer}/pruebas/CARTO_FISCAL/FeatureServer`,
            order: 0,
            featureLayer: null,
            definitionExpression: 'ESTADO=1',
            featureTable: null,
            popupTemplate: {
                title: 'Predios',

                content: [{
                    type: 'fields',



                    fieldInfos: [{
                      fieldName: "COD_PRE",
                      label: "Cod. Predio",
                      visible: true
                    }, {
                      fieldName: "COD_CPU",
                      label: "cpu",
                      visible: true
                    }
                    , {
                        fieldName: "TIPO_UU",
                        label: "Tipo de unidad urb.",
                        visible: true
                      }


                    , {
                        fieldName: "NOM_UU",
                        label: "Nombre de unidad urb.",
                        visible: true
                      }


                    , {
                      fieldName: "MZN_URB",
                      label: "Manzana urb.",
                      visible: true
                    }

                    , {
                        fieldName: "LOT_URB",
                        label: "Lote urb.",
                        visible: true
                      }

                      , {
                        fieldName: "TIP_VIA",
                        label: "Tipo de via",
                        visible: true
                      }

                      , {
                        fieldName: "NOM_VIA",
                        label: "Nombre de via",
                        visible: true
                      }


                      , {
                        fieldName: "NOM_ALT",
                        label: "Nombre de via alt.",
                        visible: true
                      }


                      , {
                        fieldName: "NUM_MUN",
                        label: "Número domiciliaro",
                        visible: true
                      }
                      ,
                      {
                        fieldName: "NUM_ALT ",
                        label: "Número alterno",
                        visible: true
                      }
                      ,
                      {
                        fieldName: "BLOCK",
                        label: "Block",
                        visible: true
                      } ,
                      {
                        fieldName: "NUM_DEP",
                        label: "Número de departamento",
                        visible: true
                      } ,
                      {
                        fieldName: "INTERIOR",
                        label: "Interior",
                        visible: true
                      },
                      {
                        fieldName: "PISO",
                        label: "Piso",
                        visible: true
                      },
                      {
                        fieldName: "KM",
                        label: "km",
                        visible: true
                      },
                      {
                        fieldName: "REFEREN",
                        label: "Referencia",
                        visible: true
                      },
                      {
                        fieldName: "CUADRA",
                        label: "Cuadra",
                        visible: true
                      },
                      {
                        fieldName: "LADO",
                        label: "Lado",
                        visible: true
                      },
                      {
                        fieldName: "PARTIDA",
                        label: "Partida registral",
                        visible: true
                      }
                      ,
                      {
                        fieldName: "ANO_CART",
                        label: "Año de info",
                        visible: true
                      }
                      ,
                      {
                        fieldName: "FUENTE",
                        label: "Origen de info.",
                        visible: true
                      }
                      ,
                      {
                        fieldName: "COD_CUC",
                        label: "CUC",
                        visible: true
                      }

                      ,
                      {
                        fieldName: "VAL_ACT",
                        label: "Arancel",
                        visible: true
                      }

                ]
                  }]
                /*content: `
                 holasss
                `*/
              },


            utm: null,
            projection: null,
            visible: true,
            popupEnabled: true
        },

        {
            title: 'Lotes Zona',
            id: 0,
            idServer: 1,
            urlBase:
                `${environment.apiUrlArcGisServer}/pruebas/CARTO_FISCAL/FeatureServer`,
            order: 1,
            featureLayer: null,
            definitionExpression: '1=1',
            featureTable: null,
            popupTemplate: null,
            utm: null,
            projection: null,
            visible: true,
            popupEnabled: false,
        },
        {
            title: 'Polígono de Lotes',
            id: 1,
            idServer: 5,
            urlBase:
                `${environment.apiUrlArcGisServer}/pruebas/CARTO_FISCAL/FeatureServer`,
            order: 0,
            featureLayer: null,
            definitionExpression: '1=1',
            featureTable: null,
            popupTemplate: null,
            utm: null,
            projection: null,
            visible: true,
            renderer: {
                type: 'class-breaks', // autocasts as new UniqueValueRenderer()
                field: 'ESTADO_INS',
                legendOptions: {
                    title: " ",
                },

                classBreakInfos: [
                    {
                        minValue: 0, // 0 acres
                        maxValue: 0, // 200,000 acres,
                        label: 'Sin predios registrados',
                        symbol: {
                            type: 'simple-fill',
                            color: [205, 102, 102, 0.5],
                            style: 'solid',

                            outline: {
                                color: [205, 102, 102, 0.8],
                                width: 0.5,
                            },
                        }, // will be assigned sym1
                    },
                    {
                        minValue: 1, // 200,001 acres
                        maxValue: 162, // 500,000 acres
                        label: 'Con predios registrados',
                        symbol: {
                            type: 'simple-fill',
                            color: [68, 101, 137, 0.5],
                            style: 'solid',

                            outline: {
                                color: [68, 101, 137, 0.8],
                                width: 0.5,
                            },
                        },
                    },
                ],
            },
            labelingInfo: {
                symbol: {
                    type: 'text', // autocasts as new TextSymbol()
                    color: 'black',
                    xoffset: 8,
                    yoffset: 4,
                    font: {
                        // autocast as new Font()
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
            popupEnabled: false,
        },

        {
            title: 'Via Zona',
            id: 2,
            idServer: 2,

            urlBase:
                `${environment.apiUrlArcGisServer}/pruebas/CARTO_FISCAL/MapServer`,
            order: 0,
            featureLayer: null,
            definitionExpression: '1=1',
            featureTable: null,
            popupTemplate: null,
            utm: null,
            projection: null,
            visible: true,
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
            },
        },

        {
            title: 'Manzana Urbana Zona',
            id: 3,
            idServer: 9,
            urlBase:
                `${environment.apiUrlArcGisServer}/pruebas/CARTO_FISCAL/MapServer`,
            order: 0,
            featureLayer: null,
            definitionExpression: '1=1',
            featureTable: null,
            popupTemplate: null,
            utm: null,
            projection: null,
            visible: true,
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
            title: 'Unidades Urbanas',
            id: 4,
            idServer: 6,
            urlBase:
                `${environment.apiUrlArcGisServer}/pruebas/CARTO_FISCAL/MapServer`,
            order: 0,
            featureLayer: null,
            definitionExpression: '1=1',
            featureTable: null,
            popupTemplate: null,
            utm: null,
            projection: null,
            visible: true,

            renderer: {
                type: 'simple',
                symbol:{
                    type: 'simple-line',
                    width: '3px',
                    style: 'solid',
                    color:'#E64C00'
                }


            },
        },

        {
            title: 'Arancel',
            id: 9,
            idServer: 0,
            urlBase:
                `${environment.apiUrlArcGisServer}/ACTUALIZACION/CARTO_ACT/MapServer`,

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
                `${environment.apiUrlArcGisServer}/ACTUALIZACION/CARTO_ACT/MapServer`,


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
                `${environment.apiUrlArcGisServer}/ACTUALIZACION/ACTUALIZACION_DE_PUNTO_IMG/MapServer`,
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

    //urlSearchDistrito = 'https://ws.mineco.gob.pe/serverdf/rest/services/pruebas/CARTO_TEMATICA_INEI/MapServer/5';
    urlSearchZonaUrbana =

        'https://ws.mineco.gob.pe/serverdf/rest/services/pruebas/CARTO_TEMATICA_INEI/MapServer/2';
    urlSearchDirecciones =
        'https://ws.mineco.gob.pe/serverdf/rest/services/pruebas/CARTO_TEMATICA_INEI/MapServer/0';
    urlSearchDireccionesMunicipales =
        'https://ws.mineco.gob.pe/serverdf/rest/services/pruebas/CARTO_FISCAL/FeatureServer/0';
    /*urlGestionPredios =
        'https://ws.mineco.gob.pe/serverdf/rest/services/pruebas/GESTION_DE_PREDIOS/FeatureServer/0/addFeatures';
        https://ws.mineco.gob.pe/serverdf/rest/services/ACTUALIZACION/ACTUALIZACION_DE_PUNTO_IMG/FeatureServer
        */

    urlGestionPredios =
        'https://ws.mineco.gob.pe/serverdf/rest/services/ACTUALIZACION/ACTUALIZACION_DE_PUNTO_IMG/FeatureServer';

    urlSearchDistrito =

        'https://ws.mineco.gob.pe/serverdf/rest/services/pruebas/CARTO_TEMATICA_INEI/MapServer/7';
    featureZonaUrbana: any;
    featureDistrito: any;

    landOwner: LandOwnerModel = new LandOwnerModel();
    screenshotDiv: any;
    saveNewPointDiv: any;
    editPointDiv: any;
    district: DistrictResource;

    displayPopupDiv = 'none';
    popupDiv: any;
    landRegistryMapServiceSubscription: any;
    pointEntradaGraphic: any;
    constructor(
        private _userService: UserService,
        private _commonService: CommonService,
        private _landRegistryMapService: LandRegistryMapService,
        protected _messageProviderService: MessageProviderService,
        private _landRegistryService: LandRegistryService,
        private confirmationService: CustomConfirmationService,
        private _fuseSplashScreenService: FuseSplashScreenService,
        private _landRecordService: LandRecordService,
        private _landOwnerService: LandOwnerService,
        public dialog: MatDialog
    ) {
        pdfMake.vfs = pdfFonts.pdfMake.vfs;
    }

    ngOnDestroy(): void {
        this._messageProviderService = null;
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }


    ngOnChanges(changes: SimpleChanges) {
        /*if (changes['cancelEvent']) {
            this.cancelEvent = changes['cancelEvent'].currentValue;
            this.onCancel();


        }*/
    }


    onCancel(): void {
        if(this.view){
            this.view.graphics.removeAll();
        }

        this.estado = Estado.INICIAR;
        this._landRegistryMapService.setEstado(
            Estado.INICIAR
        );

        const puntosLote = this.layersInfo.find(
            l => l.id === 0
        )?.featureLayer;


        puntosLote['definitionExpression'] = this.layersInfo.find(
            l => l.id === 0
        )?.definitionExpression;


        const puntosPredio = this.layersInfo.find(
            l => l.id === -1
        )?.featureLayer;

        puntosPredio['definitionExpression'] =  this.layersInfo.find(
            l => l.id === -1
        )?.definitionExpression;

        puntosPredio['popupEnabled']= true;

        /*this.cancelEvent = false;*/
    }

    ngOnInit(): void {
        this.loadImage();


        this._landRegistryService
            .getMasterDomain()
            .subscribe(result => this.masterDomain = result);

        this._landRegistryMapService.setEstado(Estado.INICIAR);

        this._landRegistryMapService.getEventCancel().subscribe((cancel: any)=>{
            if(cancel){
                this.onCancel();
            }
        });


        this._landRegistryMapService
            .getEstado()
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((estado: any) => {
                if (this.view) {
                    this.view.popup.close();
                }
                this.estado = estado;
                this.changeUI();
            });

        this._landRegistryMapService.landIn$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((land: LandRegistryMap) => {

                if (land) {
                    this.onCancel();
                    this.landRegistryMapModel = new LandRegistryMapModel(land);
                    if (land?.latitude && land?.longitude) {
                        //this.onCancel();
                        let symbol = this.simpleMarkerSymbolUndefined;
                        if (
                            this.landRegistryMapModel?.idCartographicImg &&
                            !this.landRegistryMapModel?.idPlot
                        ) {
                            symbol = this.simpleMarkerSymbolUndefined;
                        } else {
                            symbol = this.simpleMarkerSymbol;
                        }

                        this.addPoint(
                            land.latitude,
                            land.longitude,
                            symbol,

                        );

                        if (this.view) {
                            this.view.center = [land.longitude, land.latitude];
                            this.view.zoom = 19;

                            if(land.idLotePuerta){
                                this.addPoint(
                                    land.latitudePuerta,
                                    land.longitudePuerta,
                                    this.simpleMarkerSymbolEntrada2,
                                    false
                                );
                            }
                            this.view.popup.close();
                        }

                        //this._landRegistryMapService.setEstado(Estado.INICIAR);
                    } else if (land && land.ubigeo) {
                        //this.onCancel();
                        this.resetMap();
                        //this._landRegistryMapService.setEstado(Estado.EDITAR);
                    }
                } else {
                    this._messageProviderService.showAlert(
                        'Por favor elija un punto en el mapa'
                    );
                    this.landRegistryMapModel = new LandRegistryMapModel();
                    if (this.landOwner.id) {
                        this.resetMap();
                        this._landRegistryMapService.setEstado(Estado.CREAR);
                    }
                }

                //this.estado = Estado.EDITAR;
            });

        this._landRegistryMapService.gestionPredios$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((result: LandRegistryMap) => {
                const _landRegistryMapModel = new LandRegistryMapModel(result);
                console.log('_landRegistryMapModel',_landRegistryMapModel);


                if (!_landRegistryMapModel.id)
                {this.saveLandRegistryMap(_landRegistryMapModel);}


                this._landRegistryMapService.setEstado(Estado.INICIAR);
            });

        this._landRegistryService
            .getLandOwner()
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((result) => {
                this.landOwner.setValue(result);
                //this.estado =Estado.INICIAR;
                this.resetMap();
                this._landRegistryMapService.setEstado(Estado.INICIAR);
            });

        this._landRegistryMapService
            .getPrint()
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((result) => {
                if (result && result.land && result.owner) {
                    this.generatePDF(this.view, result.land, result.owner);
                }
            });

        this._userService.user$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((user: any) => {
                this.user = user;
                this.userUbigeo =
                    this.user.ubigeo && this.user.ubigeo
                        ? this.user.ubigeo
                        : '150101';

                this._commonService
                    .getDistrictResource(this.userUbigeo)
                    .subscribe((data) => {
                        this.district = data;
                    });
                this.idCargo = this.user.placeScope.id;
                setTimeout(() => {
                    this._fuseSplashScreenService.show();
                    this.initializeMap(this.points);
                }, 1000);
            });
    }

    ngAfterViewInit(): void {

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
                // eslint-disable-next-line @typescript-eslint/naming-convention
                Legend,
                  // eslint-disable-next-line @typescript-eslint/naming-convention
                Home,
                 // eslint-disable-next-line @typescript-eslint/naming-convention
                PopupTemplate,
 // eslint-disable-next-line @typescript-eslint/naming-convention
                Viewpoint

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
                'esri/widgets/Legend',
                 'esri/widgets/Home',
                 'esri/PopupTemplate',
                 'esri/Viewpoint'
            ]);

            const mapProperties = {
                basemap: 'streets-vector',
            };

            this.map = new Map(mapProperties);

            const actionEdit = {
                // This text is displayed as a tooltip
                title: 'Editar',
                // The ID used to reference this action in the event handler
                id: 'edit',
                // Sets the icon font used to style the action button
                className: 'esri-icon-edit',
            };

            const mapViewProperties = {
                container: this.mapViewEl.nativeElement,
                zoom: 17,
                center: [-71.955921, -13.53063],
                map: this.map,
                /*popup: {
                    dockEnabled: false,
                    dockOptions: {
                        //buttonEnabled: false,
                        breakpoint: false,
                    },
                    alignment: 'top-right',
                    autoOpenEnabled: false,
                    actions: [actionEdit],
                },*/
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

            const featureDireccionesMunicipales = new FeatureLayer(
                this.urlSearchDireccionesMunicipales
            );

            this.layersInfo.reverse().map((l) => {
                const options = {
                    url: `${l.urlBase}/${l.idServer}`,
                    title: l.title,
                    outFields: ['*'],
                    visible: l.visible,
                };

                if (l['renderer']) {

                    options['renderer'] = l['renderer'];
                }

                if (l['definitionExpression']) {
                    options['definitionExpression'] = l['definitionExpression'];
                }


                if (l['popupEnabled']) {
                    options['popupEnabled'] = l['popupEnabled'];
                }

                if (l['popupTemplate']) {
                    const popupTemplate= new PopupTemplate(l['popupTemplate']);
                    //popupTemplate: popupTemplate
                    options['popupTemplate'] = popupTemplate;
                }



                if (this.idCargo === Role.DISTRITAL) {
                    const where = `UBIGEO='${this.userUbigeo}'`;
                    if (l['definitionExpression'].length > 0) {
                        options['definitionExpression'] = `${l['definitionExpression']} and ${where}`;
                    }
                    else {
                        options['definitionExpression'] = `${where}`;
                    }

                }

                //const where = `UBIGEO='${this.userUbigeo}'`;

                /*this.layersInfo.forEach((l) => {
                    if (l.featureLayer) {
                        const featureLayer = l.featureLayer;
                        console.log('where', where);
                        featureLayer.definitionExpression = where;
                    }
                });*/


                if (l['labelingInfo']) {

                    options['labelingInfo'] = l['labelingInfo'];
                }

                l.featureLayer = new FeatureLayer(options);
            });

            const layerTematico = this.layersInfo.find(
                l => l.id === 1
            )?.featureLayer;
            this.map.add(layerTematico);

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

            /*const subtypeGroupLayer = this.view.layers.getItemAt(0);*/
            const legend = new Legend({
                view: this.view,
                layerInfos: [
                    {
                        layer: layerTematico,
                    },
                ],
            });

            const cs1 = new SpatialReference({
                wkid: 32717, //PE_GCS_ED_1950
            });

            this.screenshotDiv = document.getElementById('screenshotDiv');

            this.saveNewPointDiv = document.getElementById('saveNewPointDiv');
            this.editPointDiv = document.getElementById('editPointDiv');

            this.popupDiv = document.getElementById('popupDiv');
            this.view.when(() => {
                this._fuseSplashScreenService.hide();
                const homeWidget = new Home({
                    view: this.view,

                });


                if (
                    this.userUbigeo &&
                    (this.estado === Estado.INICIAR ||
                        this.estado === Estado.CREAR) &&
                    this.idCargo === Role.DISTRITAL
                ) {

                    const where = `UBIGEO='${this.userUbigeo}'`;
                    this.zoomToUbigeo(where).then(( res)=>{

                    homeWidget.viewpoint = new Viewpoint({
                        targetGeometry: res.extent
                    });

                    });

                }

                this.view.on('click', (event) => {

                    const puntosPredio = this.layersInfo.find(
                        l => l.id === -1
                    )?.featureLayer;

                    if (this.estado === Estado.LEER) {
                        //puntosPredio.popupEnabled = true;
                        this.view.hitTest(event).then((response) => {
                            const results = response.results.filter((r) => {
                                if (
                                    r &&
                                    r.graphic &&
                                    r.graphic.sourceLayer == null
                                ) {
                                    return r;
                                }
                            });



                            if (results.length > 0) {
                                /*this.displayPopupDiv='inline';*/
                                /*this.view.popup.open({
                                    title: 'Predio',
                                    //container: this.popupDiv,
                                    location: event.mapPoint,
                                content: ' <button class="btn-confirm mr-4" (click)="editPointEvent()">Editar</button>'
                                });*/
                            }
                        });


                    }

                    if (
                        this.estado === Estado.EDITAR ||
                        this.estado === Estado.CREAR ||
                        this.estado === Estado.NUEVO_PUNTO
                    ) {
                        puntosPredio.popupEnabled = false;
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
                            }); // layer Id es de lotes
                            const resultsPredio = response.results.filter(
                                (r) => {
                                    if (
                                        r &&
                                        r.graphic &&
                                        r.graphic.layer &&
                                        r.graphic.layer.layerId === 0
                                    ) {
                                        return r;
                                    }
                                }
                            );

                            const resultsLote = response.results.filter((r) => {
                                if (
                                    r &&
                                    r.graphic &&
                                    r.graphic.layer &&
                                    r.graphic.layer.layerId === 5
                                ) {
                                    return r;
                                }
                            });// layer Id es de poligono de lotes

                            if (results.length > 0) {
                                const resultsLen = results.length - 1;

                                if (
                                    results[resultsLen] &&
                                    results[resultsLen].graphic &&
                                    results[resultsLen].graphic.geometry
                                ) {
                                    graphic = results[resultsLen].graphic;

                                    //let graphic = event.mapPoint;
                                    longitude = graphic.geometry.longitude;
                                    latitude = graphic.geometry.latitude;

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
                                        let dialogRef = null;
                                        if (this.landRegistryMapModel.cup) {
                                            if (
                                                !this.landRegistryMapModel
                                                    .idPlot &&
                                                this.landRegistryMapModel
                                                    .idCartographicImg
                                            ) {
                                                dialogRef =
                                                    this.confirmationService.info(
                                                        'Convertir a predio',
                                                        'Desea actualizar esta ubicacion a predio ?'
                                                    );
                                            } else {
                                                dialogRef =
                                                    this.confirmationService.info(
                                                        'Actualizar Predio',
                                                        'Desea actualizar el predio?'
                                                    );
                                            }
                                        } else {


                                            const tipoLote = graphic.attributes['TIP_LOT'];




                                            if (
                                                resultsLote.length > 0 &&
                                                resultsLote[0].graphic
                                                    .attributes['ESTADO_INS'] >
                                                0
                                            ) {
                                                this._fuseSplashScreenService.show();
                                                graphic =
                                                    resultsLote[0].graphic;
                                                const layerPredio =
                                                    this.layersInfo.find(
                                                        l => l.id === -1
                                                    )?.featureLayer;
                                                const params = {
                                                    // eslint-disable-next-line @typescript-eslint/naming-convention
                                                    UBIGEO: graphic.attributes[
                                                        'UBIGEO'
                                                    ],
                                                    // eslint-disable-next-line @typescript-eslint/naming-convention
                                                    COD_UU: graphic.attributes[
                                                        'COD_UU'
                                                    ],
                                                    // eslint-disable-next-line @typescript-eslint/naming-convention
                                                    MZN_URB:
                                                        graphic.attributes[
                                                        'MZN_URB'
                                                        ].replace('\'','\'\''),
                                                    // eslint-disable-next-line @typescript-eslint/naming-convention
                                                    LOT_URB:
                                                        graphic.attributes[
                                                        'LOT_URB'
                                                        ],
                                                };
                                                const where =
                                                    CommonUtils.generateWhereArgis(
                                                        params,
                                                        true
                                                    );
                                                MapUtils.queryFeaturelayer(
                                                    layerPredio,
                                                    where
                                                ).then((featurePredios) => {
                                                    const featurePredio =
                                                        featurePredios[0];
                                                    const filters = {
                                                        cup: featurePredio
                                                            ?.attributes[
                                                            'COD_CPU'
                                                        ],
                                                        ubigeo: featurePredio
                                                            ?.attributes[
                                                            'UBIGEO'
                                                        ],
                                                    };

                                                    this._landRecordService
                                                        .getList(filters)
                                                        .subscribe(
                                                            (
                                                                r: IPagination<LandRecord>
                                                            ) => {
                                                                this._fuseSplashScreenService.hide();
                                                                const landRecords: LandRecord[] =
                                                                    r.results;
                                                                if (
                                                                    landRecords.length >
                                                                    0
                                                                ) {
                                                                    const id =
                                                                        landRecords[0]
                                                                            .id;

                                                                    const hasApplications = landRecords.filter( r=> ( r.hasApplications ===true) ).length> 0?true:false;

                                                                    if (hasApplications){
                                                                        const landRecord = landRecords.filter( r=> ( r.hasApplications ===true) )[0];
                                                                        const application =landRecord.applications;

                                                                        const dialogRef2 =
                                                                        this.confirmationService.errorInfo(
                                                                            'Error de registro',
                                                                            `Los predios asociados a este lote tiene una solicitud pendiente de tipo ${application.type} `,

                                                                        );

                                                                        dialogRef2.afterClosed().toPromise().then((option)=>{
                                                                            this.onCancel();

                                                                        });
                                                                        return;



                                                                    }



                                                                    const arrayService = landRecords.map((l) => {
                                                                        return this._landOwnerService
                                                                            .getLandDetail(
                                                                                l.id
                                                                            );
                                                                    });


                                                                    forkJoin(arrayService).subscribe((res: any[]) => {
                                                                        let owners = [];


                                                                        res.forEach((responseOwner: any) => {
                                                                            /*owners.concat(responseOwner.results);*/
                                                                            owners = [...owners, ...responseOwner.results];
                                                                            /*return   responseOwner.results;*/
                                                                        });

                                                                        /*const owners =
                                                                        responseOwner.results;*/

                                                                        dialogRef =
                                                                            this.dialog.open(
                                                                                AlertLandOwnerComponent,
                                                                                {
                                                                                    data: {
                                                                                        owners: owners,
                                                                                        ownerId: this.ownerId
                                                                                    },
                                                                                    width: '600px',
                                                                                }
                                                                            );



                                                    dialogRef.afterClosed().toPromise().then(
                                                                            (
                                                                                option
                                                                            ) => {
                                                                                if (
                                                                                    option ===
                                                                                    'confirmed'
                                                                                ) {

                                                                                    graphic =
                                                                                    results[0].graphic;

                                                                                    graphic.attributes[
                                                                                        'COORD_X'
                                                                                    ] =
                                                                                        longitude;
                                                                                    graphic.attributes[
                                                                                        'COORD_Y'
                                                                                    ] =
                                                                                        latitude;
                                                                                    this.lote =
                                                                                        graphic.attributes;
                                                                                    this.landRegistryMapModel =
                                                                                        FormatUtils.formatLoteToLandRegistryMapModel(
                                                                                            this
                                                                                                .lote
                                                                                        );



                                                                                    if( tipoLote === '2'){
                                                                                        const dialogRef2 =
                                                                                        this.confirmationService.info(
                                                                                            'Lote paso de servidumbre',
                                                                                            'Ahora debe seleccionar el lote paso de servidumbre',

                                                                                        );


                                                                                        dialogRef2.afterClosed().toPromise().then(
                                                                                            (
                                                                                                option2
                                                                                            ) => {
                                                                                                if (
                                                                                                    option2 ===
                                                                                                    'confirmed'
                                                                                                ) {
                                                                                                    this.estado = Estado.NUEVO_PUNTO_MEDITERRANEO;

                                                                                                    this._landRegistryMapService
                                                                                                    .setEstado(Estado.NUEVO_PUNTO_MEDITERRANEO);
                                                                                                    const puntosLote = this.layersInfo.find(
                                                                                                        l => l.id === 0
                                                                                                    )?.featureLayer;

                                                                                                    /*
                                                                                                    console.log('this.lote>>',this.lote);*/

                                                                                                    puntosLote['definitionExpression'] = `MZN_URB = '${this.lote.MZN_URB.replace('\'','\'\'')}' AND UBIGEO = '${this.lote.UBIGEO}'  and COD_UU = '${this.lote.COD_UU}'  and TIP_LOT="1" `;




                                                                                                    const puntosPredio = this.layersInfo.find(
                                                                                                        l => l.id === -1
                                                                                                    )?.featureLayer;

                                                                                                    puntosPredio['definitionExpression'] = '1<>1';


                                                                                                    const manzanaUrbana = this.layersInfo.find(
                                                                                                        l => l.id === 3
                                                                                                    )?.featureLayer;

                                                                                                    const where =   `MZN_URB = '${this.lote.MZN_URB.replace('\'','\'\'')}' AND UBIGEO = '${this.lote.UBIGEO}'  and COD_UU = '${this.lote.COD_UU}'  `;
                                                                                                    MapUtils.zoomToFeature(
                                                                                                        this.view,
                                                                                                        manzanaUrbana,
                                                                                                        where
                                                                                                    ).then(()=>{
                                                                                                        //console.log(this.view.zoom);
                                                                                                        this.view.zoom = this.view.zoom - 1;
                                                                                                        //console.log(this.view.zoom);
                                                                                                    });



                                                                                                }

                                                                                                else{
                                                                                                    this.onCancel();
                                                                                                }

                                                                                            });






                                                                                    }

                                                                                    else{

                                                                                        this._landRegistryMapService.landOut =
                                                                                        this.landRegistryMapModel;
                                                                                        this.estado =   Estado.LEER;

                                                                                    }



                                                                                } else {


                                                                                    this.onCancel();
                                                                                }
                                                                      }  );

                                                                    });

                                                                }

                                                                else {
                                                                    dialogRef =
                                                                    /*

                                                                    this.confirmationService.info(
                                                                        'Error del predio',
                                                                    `El predio  ${featurePredio
                                                                        ?.attributes[
                                                                        'COD_CPU'
                                                                    ]} no se encuentra registrado en el Catastro Fiscal `,false
                                                                    );*/

                                                                    this.confirmationService.errorInfo(
                                                                        'Error del predio','No es posible continuar con el registro en esta ubicacion, porfavor contactese con el administrador de la plataforma'
                                                                    );

                                                                    this.onCancel();

                                                                    /*if (this.view) {
                                                                        this.view.popup.close();
                                                                        this.view.graphics.removeAll();
                                                                    }


                                                                    this.estado =   Estado.LEER;
                                                                                                this._landRegistryMapService.setEstado(
                                                                                                    Estado.LEER
                                                                                                );*/

                                                                    /*dialogRef
                                                                    .afterClosed()
                                                                    .toPromise().then((option) => {

                                                                    });*/
                                                                }

                                                            }
                                                        );
                                                });
                                            } else {
                                                dialogRef =
                                                    this.confirmationService.info(
                                                        'Asignar Lote',
                                                        'Desea asignar este lote?'
                                                    );

                                                dialogRef
                                                    .afterClosed()
                                                    .toPromise()
                                                    .then((option) => {
                                                        if (
                                                            option ===
                                                            'confirmed'
                                                        ) {
                                                            graphic.attributes[
                                                                'COORD_X'
                                                            ] = longitude;
                                                            graphic.attributes[
                                                                'COORD_Y'
                                                            ] = latitude;
                                                            this.lote =
                                                                graphic.attributes;

                                                            this.landRegistryMapModel =
                                                                FormatUtils.formatLoteToLandRegistryMapModel(
                                                                    this.lote
                                                                );
                                                            this._landRegistryMapService.setEstado(
                                                                Estado.LEER
                                                            );

                                                            if (tipoLote === '2') {
                                                                dialogRef =
                                                                this.confirmationService.info(
                                                                    'Puerta de Ingreso',
                                                                    'Debe seleccionar la puerta de ingreso',
                                                                    false
                                                                );


                                                                this.estado = Estado.NUEVO_PUNTO_MEDITERRANEO;

                                                                this._landRegistryMapService
                                                                .setEstado(Estado.NUEVO_PUNTO_MEDITERRANEO);

                                                                const puntosLote = this.layersInfo.find(
                                                                    l => l.id === 0
                                                                )?.featureLayer;





                                                                puntosLote['definitionExpression'] = `MZN_URB = '${this.lote.MZN_URB.replace('\'','\'\'')}' AND UBIGEO = '${this.lote.UBIGEO}'  and COD_UU = '${this.lote.COD_UU}' and  TIP_LOT="1" `;
                                                                const puntosPredio = this.layersInfo.find(
                                                                    l => l.id === -1
                                                                )?.featureLayer;

                                                                puntosPredio['definitionExpression'] = '1<>1';


                                                                 const manzanaUrbana = this.layersInfo.find(
                                                                    l => l.id === 3
                                                                )?.featureLayer;

                                                                const where =   `MZN_URB = '${this.lote.MZN_URB.replace('\'','\'\'')}' AND UBIGEO = '${this.lote.UBIGEO}'  and COD_UU = '${this.lote.COD_UU}'  `;

                                                                MapUtils.zoomToFeature(
                                                                    this.view,
                                                                    manzanaUrbana,
                                                                    where
                                                                ).then(()=>{

                                                                    this.view.zoom = this.view.zoom - 1;

                                                                });

                                                                //this.view.zoom = this.view.zoom - 1;

                                                            }

                                                            else {
                                                                this._landRegistryMapService.landOut = this.landRegistryMapModel;
                                                                this.estado = Estado.LEER;
                                                                /*this._landRegistryMapService.setEstado(
                                                                                                Estado.LEER
                                                                                            );*/
                                                            }


                                                        } else {
                                                            this.onCancel();
                                                            /*if (this.view) {
                                                                this.view.popup.close();
                                                                this.view.graphics.removeAll();
                                                            }


                                                            this.estado =   Estado.LEER;
                                                            this._landRegistryMapService.setEstado(
                                                                                            Estado.LEER
                                                                                        );*/
                                                        }
                                                    });
                                            }
                                        }
                                    }
                                } else {
                                    if (!this.landRegistryMapModel.cup) {
                                        intersect.then((data: any) => {
                                            if (data && data.attributes) {
                                                const ubigeo =
                                                    data.attributes['UBIGEO'];

                                                if (
                                                    this.idCargo ===
                                                    Role.DISTRITAL &&
                                                    this.userUbigeo !== ubigeo
                                                ) {
                                                    this._messageProviderService.showAlert(
                                                        'El punto esta fuera de su ambito , porfavor seleccione un punto dentro del distrito'
                                                    );
                                                } else {
                                                    this.addPoint(
                                                        latitude,
                                                        longitude,
                                                        this
                                                            .simpleMarkerSymbolUndefined
                                                    );

                                                    const dialogRef =
                                                        this.confirmationService.info(
                                                            'Guardar Nueva Ubicacion',
                                                            'Desea guardar esta nueva ubicación'
                                                        );

                                                    dialogRef
                                                        .afterClosed()
                                                        .toPromise()
                                                        .then((option) => {
                                                            if (
                                                                option ===
                                                                'confirmed'
                                                            ) {
                                                                this.landRegistryMapModel =
                                                                    new LandRegistryMapModel();
                                                                this.landRegistryMapModel.latitude =
                                                                    latitude;
                                                                this.landRegistryMapModel.longitude =
                                                                    longitude;
                                                                this.landRegistryMapModel.ubigeo =
                                                                    ubigeo;

                                                                this.saveNewPointGestionPredio();
                                                                this._landRegistryMapService.setEstado(
                                                                    Estado.LEER
                                                                );



                                                            } else {
                                                            }
                                                        });
                                                }
                                            }
                                        });
                                    }





                                }
                            }
                        });
                    }


                    else if (this.estado === Estado.NUEVO_PUNTO_MEDITERRANEO) {
                        puntosPredio.popupEnabled = false;
                        this.view.hitTest(event).then((response) => {

                            const puntosEntrada = response.results.filter((r) => {
                                if (
                                    r &&
                                    r.graphic &&
                                    r.graphic.layer &&
                                    r.graphic.layer.layerId === 1
                                ) {
                                    return r;
                                }
                            });

                            if (puntosEntrada.length > 0) {
                                const puntoEntrada = puntosEntrada[0];
                                ;

                                const pointEntrada = {
                                    //Create a point
                                    type: 'point',
                                    longitude: puntoEntrada?.graphic?.geometry?.longitude,
                                    latitude: puntoEntrada?.graphic?.geometry?.latitude,
                                };

                                this.pointEntradaGraphic = new Graphic({
                                    geometry: pointEntrada,
                                    symbol: this.simpleMarkerSymbolEntrada,
                                    /*symbol: this.simpleMarkerSymbolUndefined*/
                                });

                                if (this.pointEntradaGraphic) {
                                    this.view?.graphics?.remove(this.pointEntradaGraphic);
                                }
                                this.view?.graphics?.add(this.pointEntradaGraphic);


                                const dialogRef =
                                    this.confirmationService.info(
                                        'Asignar Lote Paso de servidumbre',
                                        'Desea asignar este lote paso de servidumbre?'
                                    );


                                dialogRef
                                    .afterClosed()
                                    .toPromise()
                                    .then((option) => {
                                        if (
                                            option ===
                                            'confirmed'
                                        ) {

                                            /*this.landRegistryMapModel.*/


                                            /*puntoEntrada?.graphic.attributes*/
                                            this.landRegistryMapModel.codStreet = puntoEntrada?.graphic.attributes['COD_VIA'];
                                            this.landRegistryMapModel.idAranc = puntoEntrada?.graphic.attributes['ID_ARANC'];
                                            this.landRegistryMapModel.streetType = puntoEntrada?.graphic.attributes['TIP_VIA'];
                                            this.landRegistryMapModel.streetName = puntoEntrada?.graphic.attributes['NOM_VIA'];
                                            this.landRegistryMapModel.loteUrbanoPuerta = puntoEntrada?.graphic.attributes['LOT_URB'];
                                            this.landRegistryMapModel.manzanaUrbanaPuerta = puntoEntrada?.graphic.attributes['MZN_URB'];
                                            this.landRegistryMapModel.longitudePuerta = puntoEntrada?.graphic.attributes['COORD_X'];
                                            this.landRegistryMapModel.latitudePuerta = puntoEntrada?.graphic.attributes['COORD_Y'];
                                            this.landRegistryMapModel.idLotePuerta = puntoEntrada?.graphic.attributes['ID_LOTE'];
                                            this._landRegistryMapService.landOut = this.landRegistryMapModel;
                                            this.estado = Estado.CREAR;
                                            this._landRegistryMapService.setEstado(
                                                Estado.CREAR
                                            );

                                            const puntosLote = this.layersInfo.find(
                                                l => l.id === 0
                                            )?.featureLayer;


                                            puntosLote['definitionExpression'] = this.layersInfo.find(
                                                l => l.id === 0
                                            )?.definitionExpression;


                                            const puntosPredio = this.layersInfo.find(
                                                l => l.id === -1
                                            )?.featureLayer;

                                        puntosPredio['definitionExpression'] =  this.layersInfo.find(
                                            l => l.id === -1
                                        )?.definitionExpression;
                                    }

                                    else {
                                        /*if (
                                            this
                                                .view
                                        ) {

                                            this.view.graphics.removeAll();
                                        }

                                        this._landRegistryMapService.setEstado(
                                            Estado.LEER
                                        );*/


                                        this.onCancel();

                                    }
                            });



                            }

                        });
                    }
                });

                //this.resetMap();

                let sources = [];

                if (this.idCargo === Role.DISTRITAL) {
                    const where = `UBIGEO='${this.userUbigeo}'`;
                    /*this.layersInfo.forEach((l) => {
                        if (l.featureLayer) ${}{;
                            const featureLayer = l.featureLayer;
                            console.log('where', where);
                            featureLayer.definitionExpression = where;
                        }
                    });*/

                    const outSpatialReference = new SpatialReference(4326);

                    const layer = new FeatureLayer(this.urlSearchDistrito);
                    const queryLayer = layer.createQuery();
                    queryLayer.where = where;
                    queryLayer.outSpatialReference = outSpatialReference;

                    layer.queryExtent(queryLayer).then((res) => {
                        const extent = res.extent;

                        const searchFilter = {
                            geometry: extent,
                        };

                        sources = [
                            {
                                name: 'ArcGIS World Geocoding Service',
                                placeholder: 'Buscar Direccion',
                                apiKey: this.apiKey,
                                countryCode: 'PE',
                                singleLineFieldName: 'SingleLine',
                                url: 'https://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer',
                                filter: searchFilter,
                                resultSymbol: {
                                    type: 'picture-marker', // autocasts as new PictureMarkerSymbol()
                                    url: 'https://static.arcgis.com/images/Symbols/Shapes/RedPin1LargeB.png',
                                    width: '30px',
                                    height: '30px',
                                    yoffset: '15px',
                                    /*url: '/assets/images/map/location2.png',
                                    width: '20px',
                                    height: '30px',
                                    yoffset: '15px',*/
                                },
                            },

                            {
                                layer: featureDirecciones,
                                searchFields: ['DIR_MUN'],
                                displayField: 'DIR_MUN',
                                exactMatch: false,
                                outFields: ['DIR_MUN'],
                                name: 'DIRECCION INEI',
                                filter: searchFilter,
                                resultSymbol: {
                                    type: 'picture-marker', // autocasts as new PictureMarkerSymbol()
                                    url: 'https://static.arcgis.com/images/Symbols/Shapes/RedPin1LargeB.png',
                                    width: '20px',
                                    height: '30px',
                                    yoffset: '15px',
                                    /*url: '/assets/images/map/location2.png',
                                    width: '20px',
                                    height: '30px',
                                    yoffset: '15px',*/
                                },
                            },
                            {
                                layer: this.featureZonaUrbana,
                                searchFields: ['DISTRITO', 'UBIGEO'],
                                displayField: 'DISTRITO',
                                exactMatch: false,
                                outFields: ['UBIGEO', 'DISTRITO'],
                                name: 'DISTRITOS',
                                filter: searchFilter,
                                resultSymbol: {
                                    type: 'picture-marker', // autocasts as new PictureMarkerSymbol()
                                    url: 'https://static.arcgis.com/images/Symbols/Shapes/RedPin1LargeB.png',
                                    width: '20px',
                                    height: '30px',
                                    yoffset: '15px',
                                    /*url: '/assets/images/map/location2.png',
                                    width: '20px',
                                    height: '30px',
                                    yoffset: '15px',*/
                                },
                            },

                            {
                                layer: featureDireccionesMunicipales,
                                searchFields: ['DIR_MUN'],
                                displayField: 'DIR_MUN',
                                exactMatch: false,
                                outFields: ['DIR_MUN'],
                                name: 'DIRECCION MUNICIPAL',
                                filter: searchFilter,
                                resultSymbol: {
                                    type: 'picture-marker', // autocasts as new PictureMarkerSymbol()
                                    url: 'https://static.arcgis.com/images/Symbols/Shapes/RedPin1LargeB.png',
                                    width: '20px',
                                    height: '30px',
                                    yoffset: '15px',
                                    /*url: '/assets/images/map/location2.png',
                                    width: '20px',
                                    height: '30px',
                                    yoffset: '15px',*/
                                },
                            },
                            {
                                layer: featureDireccionesMunicipales,
                                searchFields: ['COD_PRE'],
                                displayField: 'COD_PRE',
                                exactMatch: false,
                                outFields: ['COD_PRE'],
                                name: 'CODIGO DE PREDIO',
                                filter: searchFilter,
                                resultSymbol: {
                                    type: 'picture-marker', // autocasts as new PictureMarkerSymbol()
                                    url: 'https://static.arcgis.com/images/Symbols/Shapes/RedPin1LargeB.png',
                                    width: '20px',
                                    height: '30px',
                                    yoffset: '15px',
                                    /*url: '/assets/images/map/location2.png',
                                    width: '20px',
                                    height: '30px',
                                    yoffset: '15px',*/
                                },
                            },
                            {
                                layer: featureDireccionesMunicipales,
                                searchFields: ['COD_CPU'],
                                displayField: 'COD_CPU',
                                exactMatch: false,
                                outFields: ['COD_CPU'],
                                name: 'CODIGO CPU',
                                filter: searchFilter,
                                resultSymbol: {
                                    type: 'picture-marker', // autocasts as new PictureMarkerSymbol()
                                    url: 'https://static.arcgis.com/images/Symbols/Shapes/RedPin1LargeB.png',
                                    width: '20px',
                                    height: '30px',
                                    yoffset: '15px',
                                    /*url: '/assets/images/map/location2.png',
                                    width: '20px',
                                    height: '30px',
                                    yoffset: '15px',*/
                                },
                            },
                        ];

                        /*const searchWidget = new Search({
                            view: this.view,
                            includeDefaultSources: false,
                            sources:sources

                        });*/

                        /*searchWidget.on('select-result', (event) => {
                            this.view.zoom = 19;
                            const template =event.getEffectivePopupTemplate();
                            console.log(template);
                        });*/

                        // this.view.ui.add(searchWidget, {
                        //     position: 'top-left',
                        //     index: 1,
                        // });
                    });
                } else {
                    sources = [
                        {
                            name: 'ArcGIS World Geocoding Service',
                            placeholder: 'Buscar Direccion',
                            apiKey: this.apiKey,
                            countryCode: 'PE',
                            singleLineFieldName: 'SingleLine',
                            url: 'https://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer',
                            resultSymbol: {
                                type: 'picture-marker', // autocasts as new PictureMarkerSymbol()
                                url: 'https://static.arcgis.com/images/Symbols/Shapes/RedPin1LargeB.png',
                                width: '20px',
                                height: '30px',
                                yoffset: '15px',
                                /*url: '/assets/images/map/location2.png',
                                width: '20px',
                                height: '30px',
                                yoffset: '15px',*/
                            },
                        },

                        {
                            layer: featureDirecciones,
                            searchFields: ['DIR_MUN'],
                            displayField: 'DIR_MUN',
                            exactMatch: false,
                            outFields: ['DIR_MUN'],
                            name: 'DIRECCION INEI',
                            resultSymbol: {
                                type: 'picture-marker', // autocasts as new PictureMarkerSymbol()
                                url: 'https://static.arcgis.com/images/Symbols/Shapes/RedPin1LargeB.png',
                                width: '20px',
                                height: '30px',
                                yoffset: '15px',
                                /*url: '/assets/images/map/location2.png',
                                width: '20px',
                                height: '30px',
                                yoffset: '15px',*/
                            },
                        },
                        {
                            layer: this.featureZonaUrbana,
                            searchFields: ['DISTRITO', 'UBIGEO'],
                            displayField: 'DISTRITO',
                            exactMatch: false,
                            outFields: ['UBIGEO', 'DISTRITO'],
                            name: 'DISTRITOS',
                            resultSymbol: {
                                type: 'picture-marker', // autocasts as new PictureMarkerSymbol()
                                url: 'https://static.arcgis.com/images/Symbols/Shapes/RedPin1LargeB.png',
                                width: '20px',
                                height: '30px',
                                yoffset: '15px',
                                /*url: '/assets/images/map/location2.png',
                                width: '20px',
                                height: '30px',
                                yoffset: '15px',*/
                            },
                        },

                        {
                            layer: featureDireccionesMunicipales,
                            searchFields: ['DIR_MUN'],
                            displayField: 'DIR_MUN',
                            exactMatch: false,
                            outFields: ['DIR_MUN'],
                            name: 'DIRECCION MUNICIPAL',
                            resultSymbol: {
                                type: 'picture-marker', // autocasts as new PictureMarkerSymbol()
                                url: 'https://static.arcgis.com/images/Symbols/Shapes/RedPin1LargeB.png',
                                width: '20px',
                                height: '30px',
                                yoffset: '15px',
                                /*url: '/assets/images/map/location2.png',
                                width: '20px',
                                height: '30px',
                                yoffset: '15px',*/
                            },
                        },
                        {
                            layer: featureDireccionesMunicipales,
                            searchFields: ['COD_PRE'],
                            displayField: 'COD_PRE',
                            exactMatch: false,
                            outFields: ['COD_PRE'],
                            name: 'CODIGO DE PREDIO',
                            resultSymbol: {
                                type: 'picture-marker', // autocasts as new PictureMarkerSymbol()
                                url: 'https://static.arcgis.com/images/Symbols/Shapes/RedPin1LargeB.png',
                                width: '20px',
                                height: '30px',
                                yoffset: '15px',
                                /*url: '/assets/images/map/location2.png',
                                width: '20px',
                                height: '30px',
                                yoffset: '15px',*/
                            },
                        },
                        {
                            layer: featureDireccionesMunicipales,
                            searchFields: ['COD_CPU'],
                            displayField: 'COD_CPU',
                            exactMatch: false,
                            outFields: ['COD_CPU'],
                            name: 'CODIGO CPU',
                            resultSymbol: {
                                type: 'picture-marker', // autocasts as new PictureMarkerSymbol()
                                url: 'https://static.arcgis.com/images/Symbols/Shapes/RedPin1LargeB.png',
                                width: '20px',
                                height: '30px',
                                yoffset: '15px',
                                /*url: '/assets/images/map/location2.png',
                                width: '20px',
                                height: '30px',
                                yoffset: '15px',*/
                            },
                        },
                    ];

                    //remove widget search
                    // const searchWidget = new Search({
                    //     view: this.view,
                    //     includeDefaultSources: false,
                    //     sources:sources,
                    //     popupEnabled:false
                    // });

                    // searchWidget.on('select-result', (event) => {
                    //     this.view.zoom = 19;
                    //     console.log('event>>',event);
                    // });

                    // this.view.ui.add(searchWidget, {
                    //     position: 'top-left',
                    //     index: 1,
                    // });
                }

                // this.view.popup.collapseEnabled= false;



                this.view.ui.add([toolbar,homeWidget ], {
                    position: 'top-left',
                });

                this.view.ui.add([baseMapGalleryExpand, layerListExpand], {
                    position: 'top-right',
                });

                this.view.ui.add([legend], {
                    position: 'bottom-left',
                });





                /* this.view.ui.add([baseMapGalleryExpand], {
                    position: 'top-right',
                });*/

                this.changeUI();

                this.view.popup.on('trigger-action', (event) => {
                    // Execute the measureThis() function if the measure-this action is clicked
                    if (event.action.id === 'edit') {
                        this._landRegistryMapService.setEstado(Estado.EDITAR);
                    }
                });
            });
        } catch (error) {
            console.error('EsriLoader: ', error);
        }
    }

    resetMap(): void {
        this.landRegistryMapModel = new LandRegistryMapModel();
        if (this.view) {
            this.view.popup.close();
            this.view.graphics.removeAll();
        }
        if (
            this.userUbigeo &&
            (this.estado === Estado.INICIAR || this.estado === Estado.CREAR) &&
            this.idCargo === Role.DISTRITAL
        ) {
            //this.buscar(this.userUbigeo);
            /*const where = `UBIGEO='${this.userUbigeo}'`;*/
            /*
            this.layersInfo.forEach((l) => {
                if(l.featureLayer){
                    const featureLayer = l.featureLayer;
                    console.log('where',where);
                    featureLayer.definitionExpression = where;
                }
            });*/
            /*this.zoomToUbigeo(where);*/
        }
    }

    buscar(ubigeo: string): void {
        const where = `UBIGEO='${ubigeo}'`;
        /*this.layersInfo.forEach((l) => {
            if (l.featureLayer) {
                const featureLayer = l.featureLayer;
                console.log('where', where);
                featureLayer.definitionExpression = where;
            }
        });*/
        this.zoomToUbigeo(where);
    }

    changeUI(): void {
        //this.resetDisplayUI();

        if (this.screenshotDiv && this.saveNewPointDiv && this.editPointDiv) {
            this.resetDisplayUI();
            /*if (this.estado===Estado.INICIAR){
                this.resetDisplayUI();

            }*/

            if (this.estado === Estado.LEER) {
                /*

                this.displayImprimir='flex';
                this.displayEditPoint='flex';
                this.view.ui.add([this.screenshotDiv,this.editPointDiv], {
                    position: 'top-right',
                });*/
                /*this.view.ui.add([this.screenshotDiv,this.saveNewPointDiv], {
                    position: 'top-right',
                });
                this.displayImprimir='flex';*/
            } else if (this.estado === Estado.NUEVO_PUNTO) {
                this.displaySave = 'flex';
                this.view.ui.add([this.saveNewPointDiv], {
                    position: 'top-right',
                });
                /*this.resetDisplayUI();
                this.displayImprimir='flex';
                this.view.ui.add([this.screenshotDiv], {
                    position: 'top-right',
                });*/
            }

            /* else if (this.estado === Estado.CREAR){

            }
    */
            /*  else{

                this.view.ui.remove([this.screenshotDiv,this.saveNewPointDiv]);
                this.displayImprimir='none';
            }*/
        }
    }

    resetDisplayUI(): void {
        this.displayImprimir = 'none';
        this.displaySave = 'none';
        this.displayEditPoint = 'none';

        this.view.ui.remove([
            this.screenshotDiv,
            this.saveNewPointDiv,
            this.editPointDiv,
        ]);
    }

    editPointEvent(): void {
        this._landRegistryMapService.setEstado(Estado.EDITAR);
    }

    async addPoint(
        latitude,
        longitude,
        symbol,
        reset: boolean= true
    ): Promise<any> {
        try {
            const [
                // eslint-disable-next-line @typescript-eslint/naming-convention
                Graphic,
            ] = await loadModules(['esri/Graphic']);
            if (reset){
                this.view?.graphics?.removeAll();

            }
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

    async generateMaxSecuen(
        layer: any,
        land: LandRegistryMapModel
    ): Promise<number> {
        const query = layer.createQuery();
        query.where = `UBIGEO='${land.ubigeo}'`;

        const maxCPU = {
            onStatisticField: 'SECUEN', // service field for 2015 population
            outStatisticFieldName: 'max_SECUEN',
            statisticType: 'max',
        };

        query.outStatistics = [maxCPU];
        const response = await layer.queryFeatures(query);
        const stats = response.features[0].attributes;
        const maxSecuen = stats.max_SECUEN ? stats.max_SECUEN : 0;

        return maxSecuen;
    }

    async zoomToUbigeo(where: string): Promise<any> {
        const r = null;
        try {
            if (this.view) {
                const r: any =MapUtils.zoomToFeature(
                    this.view,
                    this.featureZonaUrbana,
                    where
                );

                return r;
                //extent =r.extent;
            }
        } catch (error) {
            // console.error('EsriLoader: ', error);
        }
    }

    downloadPDF(): void {
        this._landRegistryMapService.emitPrint(
            this.landRegistryMapModel,
            this.landOwner
        );
        //this.generatePDF(this.view,this.landRegistryMapModel,this.landOwner);
    }

    isNullOrBlank(data: any): boolean {
        let resp = true;
        if (
            data &&
            typeof data === 'number' &&
            data.toString().replace(' ', '').length > 0
        ) {
            resp = false;
        } else if (
            data &&
            typeof data === 'string' &&
            data.replace(' ', '').length > 0
        ) {
            resp = false;
        }
        return resp;
    }

    getFrase(data: any, frase: string = 'Holas'): string {
        let resp = '';

        if (!this.isNullOrBlank(data)) {
            resp = `${frase} ${data}`;
        }
        return resp;
    }

    toTitleCase(text) {
        return text.replace(/\w\S*/g, function (word) {
            return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
        });
    }
    async generatePDF(
        view: any,
        land: LandRegistryMap,
        landOwner: LandOwner
    ): Promise<void> {
        const doc = new jsPDF();
        const district = await this._commonService
            .getDistrictResource(land.ubigeo)
            .toPromise();
        const uuType = land.uuType
            ? this.masterDomain.uuType.find(e => e.id === land?.uuType)
            : null;
        const streetType = land.uuType
            ? this.masterDomain.codStreet.find(e => e.id === land?.streetType)
            : null;

        if (view) {
            view.center = [land.longitude, land.latitude];
            view.zoom = 20;
            this.addPoint(
                land.latitude,
                land.longitude,
                this.simpleMarkerSymbol,


            );

            if(land.idLotePuerta){
                this.addPoint(
                    land.latitudePuerta,
                    land.longitudePuerta,
                    this.simpleMarkerSymbolEntrada2,
                    false
                );
            }


        }
        setTimeout(async () => {

            const screenshot = await view.takeScreenshot({
                format: 'jpg',
                quality: 100,
            });
            // eslint-disable-next-line max-len
            const name = `${landOwner?.name ? landOwner?.name : ''} ${landOwner?.paternalSurname ? landOwner?.paternalSurname : ''} ${landOwner?.maternalSurname ? landOwner?.maternalSurname : ''} `;
            const newName = name === '' ? '-' : this.toTitleCase(name);
            const documentType = {
                '0': 'S/N',
                '01': 'DNI',
                '04': 'CARNET DE EXTRANGERIA',
                '06': 'RUC',
                '08': 'SUCESION INTESTADA',
                '09': 'PASAPORTE'
            };

            const originalWidth = 3300; // por ejemplo, 600px
            const originalHeight = 697; // por ejemplo, 400px
            // Nuevo ancho deseado
            const desiredWidth = 150; // Nuevo ancho, por ejemplo, 250px
            // Calcular el nuevo alto para mantener la proporción
            const desiredHeight = (desiredWidth / originalWidth) * originalHeight;



            const pdf = {
                pageMargins: [55, 25],
                pageSize: 'A4',
                content: [

                    {
                        columns: [
                            {
                                width: '30%',
                                margin: [0, 5, 0, 5],
                                image: this.dataUrl,
                                cover: {
                                    width: desiredWidth,
                                    height: desiredHeight,
                                    valign: 'bottom',
                                    align: 'right',
                                },
                            },
                            {
                                width: '70%',
                                stack: [
                                    'DECLARACIÓN JURADA DE UBICACIÓN DE PREDIO  \n CATASTRO FISCAL',
                                    { text:  district?.municipalName ?  district?.municipalName.toUpperCase() :  `MUNICIPALIDAD DE ${district?.name ?  district?.name : ''}`,
                                    style: 'subheader'
                                    },
                                    //{ text: `MUNICIPALIDAD DE ${district?.name ?  district?.name : ''}`, style: 'subheader' },
                                ],
                                style: 'title'
                            },
                        ]
                    },
                    {
                        columns: [
                            {
                                style: 'p1',
                                width: '100%',
                                text: ['Fecha de Registro: ',
                                    { text: `${land.updateDate ? moment(land.updateDate).format('DD/MM/YYYY') : '-'} `, style: 'textR' }
                                ]
                            }
                        ]
                    },
                    {
                        columns: [
                            {
                                style: 'p2',
                                width: '100%',
                                text: ['Yo, ',
                                    { text: newName, style: 'textR' },
                                    'identificado(a) con DNI/RUC,',
                                    { text: ` Nº ${this.landOwner.dni ? this.landOwner.dni : '-'}`, style: 'textR' },
                                    // eslint-disable-next-line max-len
                                    landOwner.phone || landOwner.email ? { text: ['con datos de contacto:', { text: `Telefono: ${landOwner.phone ? landOwner.phone : '-'} , Email: ${landOwner.email ? landOwner.email : '-'}`, style: 'textR' } || ''], style: 'textR' } : ''
                                    // eslint-disable-next-line max-len
                                    ,
                                    '; en pleno ejercicio de mis derechos ciudadanos. \n',
                                ]
                            }
                        ]
                    },

                    {
                        columns: [
                            {
                                style: 'p2',
                                width: '100%',
                                text: ['DECLARO BAJO JURAMENTO : Tener un predio ubicado en el',
                                    // eslint-disable-next-line max-len
                                    { text: `${uuType ? this.toTitleCase(uuType.name) : ''} ${this.getFrase(this.toTitleCase(land.habilitacionName), '')} ${this.getFrase(land.urbanMza, ', Manzana ')} ${this.getFrase(land.urbanLotNumber, ', Lote ')} ${this.getFrase(land.block, ',Bloque ')} ${this.getFrase(land.municipalNumber, ',Nro Puerta ')} ${this.getFrase(land.apartmentNumber, ',Nro Dpto ')} ${this.getFrase(land.km, ',Kilometro ')}`, style: 'textR' },

                                    //cambiar los campos segun servicio
                                    // eslint-disable-next-line max-len
                                    {text: `${land.idLotePuerta ? ', el cual cuenta con paso de servidumbre en':'' }`},
                                    // eslint-disable-next-line max-len
                                    { text: `${land.idLotePuerta ? `${streetType ? this.toTitleCase(streetType.name) : ' '} ${streetType && land.streetName ? ' ' + this.toTitleCase(land.streetName) : ''} ${this.getFrase(land.urbanMza, ', Manzana ')} ${this.getFrase(land.loteUrbanoPuerta, ', Lote ')}` : ''}`, style: 'textR' }, ', conforme al siguiente croquis: \n'
                                ]
                            }

                        ]
                    },
                    {
                        columns: [
                            {
                                style: 'p3',
                                width: '100%',
                                text: 'CROQUIS DE UBICACIÓN ',
                            },

                        ],
                    },
                    {
                        layout: {
                            // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
                            hLineWidth: function (i, node) { return 1; },
                            hLineColor: function (i, node) { return '#94a3b8'; },
                            vLineColor: function (i, node) { return '#94a3b8'; },
                        },
                        table: {
                            widths: ['30%', '70%'],
                            body: [
                                [
                                    {
                                        border: [false, false, false, false],

                                        table: {
                                            widths: ['100%'],
                                            heights: [20, 20, 20, 30],
                                            body: [
                                                [{
                                                    border: [false, false, false, true],
                                                    stack: ['Ubigeo \n', { text: `${land?.ubigeo ? land?.ubigeo : '-'}`, style: 'cellSub' }], style: 'cell'
                                                }],
                                                [{
                                                    border: [false, false, false, true],
                                                    // eslint-disable-next-line max-len
                                                    stack: [{ text: `${land.cup ? 'CPU \n' : 'Codigo Imagen \n'}` }, { text: ` ${land.cup ? land.cup : land.idCartographicImg}`, style: 'cellSub' }], style: 'cell'
                                                }],
                                                [{
                                                    border: [false, false, false, true],
                                                    stack: ['Latitud \n', { text: `${land.latitude ? land.latitude : '-'}`, style: 'cellSub' }], style: 'cell'
                                                }],
                                                [{
                                                    border: [false, false, false, true],
                                                    stack: ['Longitud \n', { text: `${land.longitude ? land.longitude : '-'}`, style: 'cellSub' }], style: 'cell'
                                                }],
                                                [{
                                                    border: [false, false, false, true],
                                                    stack: [
                                                        [
                                                            {text:'Leyenda', style: 'legend'},
                                                        ],
                                                        {
                                                            layout: 'noBorders',
                                                            table: {
                                                                    widths:[12,'*'],
                                                                    heights: ['*', 25],
                                                                    style:'img',
                                                                body: [
                                                                    [
                                                                          // eslint-disable-next-line max-len
                                                                        {svg: '<svg xmlns="http://www.w3.org/2000/svg" width="13" height="16" viewBox="0 0 13 16" fill="none"><path d="M10.688 11.3137L6.26087 16L1.83374 11.3137C0.958151 10.3868 0.361869 9.20592 0.120298 7.92033C-0.121273 6.63474 0.00271781 5.30219 0.47659 4.0912C0.950463 2.8802 1.75293 1.84514 2.78253 1.11692C3.81212 0.388689 5.02259 0 6.26087 0C7.49915 0 8.70962 0.388689 9.73921 1.11692C10.7688 1.84514 11.5713 2.8802 12.0452 4.0912C12.519 5.30219 12.643 6.63474 12.4014 7.92033C12.1599 9.20592 11.5636 10.3868 10.688 11.3137Z" fill="#FD2C19"/></svg>'},
                                                                        {text:'Predio Registrado', style:'text_img'},
                                                                    ],
                                                                    land.idLotePuerta ? [
                                                                          // eslint-disable-next-line max-len
                                                                        {svg: '<svg xmlns="http://www.w3.org/2000/svg" width="13" height="16" viewBox="0 0 13 16" fill="none"><path d="M10.688 11.3137L6.26087 16L1.83374 11.3137C0.958151 10.3868 0.361869 9.20592 0.120298 7.92033C-0.121273 6.63474 0.00271781 5.30219 0.47659 4.0912C0.950463 2.8802 1.75293 1.84514 2.78253 1.11692C3.81212 0.388689 5.02259 0 6.26087 0C7.49915 0 8.70962 0.388689 9.73921 1.11692C10.7688 1.84514 11.5713 2.8802 12.0452 4.0912C12.519 5.30219 12.643 6.63474 12.4014 7.92033C12.1599 9.20592 11.5636 10.3868 10.688 11.3137Z" fill="#5DB62F"/></svg>'},
                                                                        {text:'Paso de Servidumbre', style:'text_img'},
                                                                    ]:['',''],
                                                                ]
                                                            },
                                                        }
                                                    ],
                                                }],
                                            ]
                                        },
                                        layout: {
                                            hLineWidth: function (i, node) { return 1; },
                                            hLineColor: function (i, node) {
                                                return '#94a3b8';
                                            },
                                        }
                                    },
                                    {
                                        alignment: 'center',
                                        border: [true, true, true, true],
                                        image: screenshot.dataUrl,
                                        cover: { width: 330, height: 300, valign: 'bottom', align: 'right' },
                                    },
                                ],
                            ]
                        },
                    },
                    {
                        columns: [
                            {
                                style: 'p5',
                                width: '100%',
                                // eslint-disable-next-line max-len
                                text: 'Formulo la presente declaración jurada instruido(a) de las acciones administrativas, civiles y penales a las que me vería sujeto(a) en caso de falsedad en la presente declaración (Ley del Procedimiento Administrativo General, Ley Nº 27444, Artículo 32, numeral 32.3).',
                            },
                        ],
                    },
                    {
                        columns: [
                            {
                                style: 'p3',
                                bold: false,
                                width: '100%',
                                text: 'En señal de conformidad firmo el presente documento.',
                            },
                        ],
                    },
                    {
                        columns: [
                            {
                                margin: [0, 15, 0, 10],
                                bold: false,
                                width: '100%',
                                text: `${district.name ? this.toTitleCase(this.district?.name) : ''},${moment(new Date()).format('DD [de] MMMM [del] YYYY')
                                .replace(moment(new Date()).format('MMMM'), this.toTitleCase(moment(new Date()).format('MMMM')))}`,
                            },
                        ],
                    },
                    {
                        columns: [
                            {

                                margin: [0, 5, 0, 10],
                                width: '50%',
                                alignment: 'center',
                                table: {
                                    heights: [80],
                                    widths: [150, 5, 70],
                                    body: [
                                        [{ text: '', border: [false, false, false, false] }, { text: '', border: [false, false, false, false] }, ''],
                                        // eslint-disable-next-line max-len
                                        [{ text: 'Firma', border: [false, true, false, false], style: 'textF' }, { text: '', border: [false, false, false, false] }, { text: 'Huella', border: [false, true, false, false], style: 'textF' }],
                                    ]
                                },
                            },
                            {
                                layout: 'noBorders',
                                margin: [55, 75, 0, 0],
                                style: 'tableU',
                                width: '*',
                                table: {
                                    widths: [32, 1, '*'],
                                    body: [
                                        [{ text: 'Usuario' }, ':', { text: `${this.user.name ? this.user.name : '-'}`, }],
                                        [{ text: 'DNI', }, ':', { text: `${this.user.dni ? this.user.dni : '-'}`, }],
                                        [{ text: 'Cargo', }, ':', { text: `${this.user.role?.name ? this.user?.jobTitle : '-'}`, }],
                                    ]
                                },
                            },
                        ],
                    },

                ],
                styles: {
                    text_img: {
                        margin: [0, 3, 0, 0],
                        bold: true,
                    },
                    legend: {
                        fontSize: 11,
                        bold: false,
                        margin: [0,5]
                    },
                    title: {
                        fontSize: 13,
                        bold: true,
                        alignment: 'center',
                    },
                    subheader: {
                        bold: false,
                        margin: [0, 8, 0, 0],
                        fontSize: 11,
                    },

                    p1: {

                        margin: [0, 25, 0, 5],
                        alignment: 'justify',
                        lineHeight: 1.3
                    },
                    textR: {
                        bold: true,
                    },
                    p2: {
                        lineHeight: 1.3,
                        alignment: 'justify',
                        margin: [0, 0, 0, 10],
                    },

                    p3: {
                        bold: true,
                        margin: [0, 4, 0, 5],
                    },
                    p4: {
                        margin: [0, 40, 0, 20],
                    },

                    p5: {

                        margin: [0, 15, 0, 10],
                        alignment: 'justify',
                        lineHeight: 1.3
                    },

                    cell: {
                        margin: [0, 10, 0, 10],
                    },

                    cellSub: {
                        margin: [0, 3, 0, 0],
                        bold: true,
                    },
                    tableU: {
                        fontSize: 9,
                        alignment: 'rigth',
                    },
                    textF: {
                        margin: [0, 5, 0, 0],
                    },

                },
                defaultStyle: {
                    columnGap: 10,
                    fontSize: 11,
                    color: '#1e293b'
                }

            };
            pdfMake.createPdf(pdf).download('Declaración Jurada de Ubicación de Predio.pdf');

        }, 2000);
    }

    async saveNewPointGestionPredio(): Promise<void> {
        const [
            // eslint-disable-next-line @typescript-eslint/naming-convention
            FeatureLayer,
        ] = await loadModules(['esri/layers/FeatureLayer']);

        this.district = await this._commonService
            .getDistrictResource(this.landRegistryMapModel.ubigeo)
            .toPromise();
        const utm = this.district.resources[0].utm;

        const urlBase = `${this.urlGestionPredios}/0`;
        const feature = new FeatureLayer(urlBase);
        const secuen =
            (await this.generateMaxSecuen(feature, this.landRegistryMapModel)) +
            1;
        const idImg = `i${utm}${this.landRegistryMapModel.ubigeo}${secuen}`;

        this.landRegistryMapModel.idCartographicImg = idImg;
        this.landRegistryMapModel.secuen = secuen;

        this.landRegistryMapModel = await this.saveLandRegistryMap(
            this.landRegistryMapModel
        );


        this._landRegistryMapService.landOut = this.landRegistryMapModel;
    }

    async saveLandRegistryMap(
        data: LandRegistryMapModel
        //_gestionPredios: GestionPredios
    ): Promise<LandRegistryMapModel> {
        //this._fuseSplashScreenService.show(0);
        this.district = await this._commonService
            .getDistrictResource(data.ubigeo)
            .toPromise();
        const utm = this.district.resources[0].utm;
        const _urlBase =
            'https://ws.mineco.gob.pe/serverdf/rest/services/pruebas/CARTO_FISCAL/MapServer';

        const wkid = 4326;

        if (data.idPlot && !data.id)  {
            console.log('aqui  se guarda');
            const _predio =
                FormatUtils.formatLandRegistryMapModelToPredio(data);

                console.log('_predio>>',_predio);
            _predio.NOM_USER = this.user.username;
            _predio.NOM_PC = 'PLATAFORMA';
            _predio.ID_LOTE_P =
                this.lote && this.lote?.ID_LOTE_P ? this.lote.ID_LOTE_P : null;
            _predio.COD_MZN =
                this.lote && this.lote?.COD_MZN ? this.lote.COD_MZN : null;
            _predio.COD_SECT =
                this.lote && this.lote?.COD_SECT ? this.lote.COD_SECT : null;
            _predio.ZONA_UTM =
                this.lote && this.lote?.ZONA_UTM ? this.lote.ZONA_UTM : null;
            _predio.SEC_EJEC =
                this.lote && this.lote?.SEC_EJEC ? this.lote.SEC_EJEC : null;
            _predio.ID_ARANC =
                this.lote && this.lote?.ID_ARANC ? this.lote.ID_ARANC : null;
            _predio.COD_VIA =
                this.lote && this.lote?.COD_VIA ? this.lote.COD_VIA : null;
            _predio.CUADRA =
                this.lote && this.lote?.CUADRA ? this.lote.CUADRA : null;
            _predio.LADO = this.lote && this.lote?.LADO ? this.lote.LADO : null;
            _predio.ANIO_CART =
                this.lote && this.lote?.ANIO_CART ? this.lote.ANIO_CART : null;
            _predio.FUENTE =
                this.lote && this.lote?.FUENTE ? this.lote.FUENTE : null;
            _predio.VAL_ACT =
                this.lote && this.lote?.VAL_ACT ? this.lote.VAL_ACT : null;
            _predio.ESTADO = 1;
            _predio.COD_LOTE = this.lote.COD_LOTE;
            const urlBase = `${_urlBase.replace(
                'MapServer',
                'FeatureServer'
            )}/0/addFeatures`;

            const json = await this.createArcgisJSON([_predio], wkid);

            const formData = new FormData();
            formData.append('features', JSON.stringify(json));
            formData.append('F', 'json');

            const response = await fetch(`${urlBase}`, {
                method: 'POST',
                body: formData,
            });
            const responseJson = await response.json();

            const layerTematico = this.layersInfo.find(
                l => l.id === 1
            )?.featureLayer;

            const query = layerTematico.createQuery();
            query.where = `MZN_URB = '${this.lote.MZN_URB.replace('\'','\'\'')}' AND UBIGEO = '${this.lote.UBIGEO}'  AND LOT_URB = '${this.lote.LOT_URB}' and COD_UU = '${this.lote.COD_UU}'`;

            layerTematico
                .queryFeatures(query)
                .then((response: any) => {
                    // 3. Update Attributes
                    const feature = response.features[0]; // Assuming you found only one feature
                    feature.attributes.ESTADO_INS =
                        feature.attributes.ESTADO_INS + 1; // Update the attribute
                    layerTematico
                        .applyEdits({
                            updateFeatures: [feature],
                        })
                        .then((editsResult) => {
                            console.log('Attributes updated successfully!');
                        })
                        .catch((error) => {
                            console.error('Error applying edits:', error);
                        });
                })
                .catch((error) => {
                    console.error('Error querying features:', error);
                });

        }

        else if (data.idPlot && data.id){

        }

        else if (!data.idPlot) {
            const _gestionPredio =
                FormatUtils.formatLandRegistryMapModelToGestionPredio(data);

            _gestionPredio.NOM_USER = this.user.username;
            _gestionPredio.NOM_PC = 'PLATAFORMA';
            _gestionPredio.ESTADO = 0;
            /*_gestionPredio.COD_MZN = (this.lote && this.lote?.COD_MZN)?this.lote.COD_MZN:null;
            _gestionPredio.COD_SECT = (this.lote && this.lote?.COD_SECT)?this.lote.COD_SECT:null;*/
            const urlBase = `${this.urlGestionPredios}/0/addFeatures`;
            const json = await this.createArcgisJSON([_gestionPredio], 4326);

            const formData = new FormData();

            formData.append('features', JSON.stringify(json));
            formData.append('F', 'json');

            const response = await fetch(`${urlBase}`, {
                method: 'POST',
                body: formData,
            });
            const responseJson: any = await response.json();

            if (responseJson?.addResults) {
                const addFeature = responseJson?.addResults[0];
                data.idObjectImg = addFeature.objectId;
            }
        }

        // this._fuseSplashScreenService.hide();

        return data;
    }

    async updateLandRegistryMap(
        data: LandRegistryMapModel
        //_gestionPredios: GestionPredios
    ): Promise<void> {
        //this._fuseSplashScreenService.show(0);
        const _gestionPredio =
            FormatUtils.formatLandRegistryMapModelToGestionPredio(data);
        _gestionPredio.NOM_USER = this.user.username;
        _gestionPredio.NOM_PC = 'PLATAFORMA';

        const urlBase = `${this.urlGestionPredios}/0/updateFeatures`;
        const json = await this.createArcgisJSON([_gestionPredio], 4326);

        const formData = new FormData();

        formData.append('features', JSON.stringify(json));
        formData.append('F', 'json');

        const response = await fetch(`${urlBase}`, {
            method: 'POST',
            body: formData,
        });
        const responseJson = await response.json();

        //this._fuseSplashScreenService.hide();
    }
    /*/FeatureServer/0*/
    async createArcgisJSON(
        features: any[],
        projectionWkid: number
    ): Promise<any[]> {
        const arcgisJson = [];
        /* eslint-disable @typescript-eslint/naming-convention */
        const [Graphic, Polyline, Point, projection, SpatialReference] =
            await loadModules([
                'esri/Graphic',
                'esri/geometry/Polyline',
                'esri/geometry/Point',
                'esri/geometry/projection',
                'esri/geometry/SpatialReference',
            ]);
        /* eslint-enable @typescript-eslint/naming-convention */
        const outSpatialReference = new SpatialReference(projectionWkid);

        return projection.load().then(() => {
            features.forEach((feature: any) => {
                if (projectionWkid !== 4326) {
                    const geometryIni = new Point({
                        x: feature.COORD_X,
                        y: feature.COORD_Y,
                        spatialReference: {
                            wkid: 4326,
                        },
                    });
                    const pointProject = projection.project(
                        geometryIni,
                        outSpatialReference
                    );
                    feature.COORD_X = pointProject.x;
                    feature.COORD_Y = pointProject.y;
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

    eventOnGo(r: any): void {
        /*const x=r.COORD_X;
        const y = r.COORD_Y;*/

        if (this.view) {
            if (r.geometry.type === 'point') {
                this.view.center = [r.geometry.x, r.geometry.y];
                this.view.zoom = 19;
                this.addPoint(
                    r.geometry.y,
                    r.geometry.x,
                    this.simpleMarkerSearch
                );
            }

            if (r.geometry.type === 'polyline') {
                const center = MapUtils.getCenterOfPolyline(r.geometry);
                this.view.center = center;
                this.view.zoom = 18;

                this.addPoint(center.y, center.x, this.simpleMarkerSearch);
            } else {
                this.view.goTo({ target: r.geometry }); //= r.geometry.extent.center;
            }
        }
    }

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

/*
function data(data: any, arg1: (LandRegistryMapModel: any) => void): any {
    throw new Error('Function not implemented.');
}*/
