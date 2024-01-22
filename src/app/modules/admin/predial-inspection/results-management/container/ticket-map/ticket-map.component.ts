import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {environment} from 'environments/environment';
import {IUbicacion} from '../../interfaces/ubicacion.interface';
import {ResultsService} from '../../services/results.service';
import { TicketStatus } from 'app/shared/enums/ticket-status.enum';
import { Estado } from 'app/shared/enums/estado-map.enum';
import { Subject } from 'rxjs';
import { UserService } from 'app/core/user/user.service';
import { takeUntil } from 'rxjs/operators';
import { User } from 'app/core/user/user.types';

@Component({selector: 'app-ticket-map', templateUrl: './ticket-map.component.html', styleUrls: ['./ticket-map.component.scss']})
export class TicketMapComponent implements OnInit, OnDestroy {
    @Input() ubigeo: string ;
    @Input() user: User;
    ubicacion: IUbicacion;

    idManzanaLayer = 1;
    idLoteLayer = 4;
    idLotePoligonoLayer = 3;
    idUbicacionLayer=5;
    estado = Estado.LEER;
    idManzanaImagenLayer=5;
    idPuntoImagenLayer=6;
    idManzanaSinLote=7;
    layersInfo = [

        {
            title: 'Manzana',
            id: 1,
            layerId: 9,
            urlBase: `${
                environment.apiUrlArcGisServer
            }/pruebas/CARTO_FISCAL/MapServer`,
            order: 0,
            featureLayer: null,
            definitionExpressionBase: '1=1',
            definitionExpression: '1=1',
            featureTable: null,
            popupTemplate: null,
            utm: null,
            projection: null,
            visible: true,
            selected: false,
            labelClass: { // autocasts as new LabelClass()
                symbol: {
                    type: 'text', // autocasts as new TextSymbol()
                    color: 'black',
                    yoffset: 5,
                    font: { // autocast as new Font()
                        family: 'Playfair Display',
                        size: 12,
                        weight: 'bold'
                    }
                },
                labelPlacement: 'above-center',
/*
                labelExpressionInfo: {
                    expression: '$feature.MZN_URB',
                },*/
                labelExpressionInfo: {
                    expression: '$feature.MZN_URB'
                }
            },
            renderer: null

        }, {
            title: 'Ejes Viales',
            id: 2,
            layerId: 2,
            urlBase: `${
                environment.apiUrlArcGisServer
            }/pruebas/CARTO_FISCAL/MapServer`,
            order: 0,
            featureLayer: null,
            definitionExpressionBase: '1=1',
            definitionExpression: '1=1',
            featureTable: null,
            popupTemplate: null,
            utm: null,
            projection: null,
            visible: true,
            selected: false,
            labelClass: {
                symbol: {
                    type: 'text', // autocasts as new TextSymbol()
                    color: 'black',
                    font: { // autocast as new Font()
                        family: 'arial',
                        size: 8

                    }
                },
                labelPlacement: 'above-center',
                labelExpressionInfo: {
                    expression: '$feature.DES_VIA +" "+ $feature.NOM_VIA'
                }
            }

        }, {
            title: 'Lotes Poligono',
            id: 3,
            layerId: 5,
            urlBase: `${
                environment.apiUrlArcGisServer
            }/pruebas/CARTO_FISCAL/MapServer`,
            order: 0,
            featureLayer: null,
            definitionExpression: '1=1',
            definitionExpressionBase: '1=1',
            featureTable: null,
            popupTemplate: null,
            utm: null,
            projection: null,
            visible: true,
            selected: false,
            renderer: null,
            labelClass:{
              symbol: {
                type: 'text', // autocasts as new TextSymbol()
                color: 'black',
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
            tipo:1
        }, {
            title: 'Lotes',
            id: 4,
            layerId: 1,
            urlBase: `${
                environment.apiUrlArcGisServer
            }/pruebas/CARTO_FISCAL/FeatureServer`,
            order: 0,
            featureLayer: null,
            definitionExpression: '1=1',
            definitionExpressionBase: '1=1',
            featureTable: null,
            popupTemplate: null,
            utm: null,
            projection: 4326,
            visible: true,
            selected: false,
            renderer: null,


        },


        /*
        {
            title: 'Punto Imagen',
            id: 5,
            layerId: 0,
            urlBase: `${
                environment.apiUrlArcGisServer
            }/ACTUALIZACION/ACTUALIZACION_DE_PUNTO_IMG/FeatureServer`,
            order: 0,
            featureLayer: null,
            definitionExpression: '1=1',
            definitionExpressionBase: '1=1',
            featureTable: null,
            popupTemplate: null,
            utm: null,
            projection: 4326,
            visible: false,
            selected: false,

            renderer: null,
        },
*/

        {
            title: 'Manzanas crecimiento',
            id: 5,
            layerId: 3,
            urlBase: `${environment.apiUrlArcGisServer}/pruebas/CAPAS_INSPECCION/MapServer`,
            order: 0,
            featureLayer: null,
            definitionExpressionBase:'CONT_PIM >0',
            definitionExpression:'',
            //definitionExpression: this.ubigeo?`UBIGEO = '${this.ubigeo}' AND CONT_PIM >0`  : 'CONT_PIM >0',
            featureTable: null,
            popupTemplate: null,
            utm: null,
            projection: null,
            visible: false,
            selected: false,
            labelClass: {
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
                    expression: '$feature.ID_MZN_U',
                },
            },
            renderer: {
                type: 'simple',
                symbol: {
                    type: 'simple-fill', // autocasts as new SimpleFillSymbol()
                    color: [0, 255, 255, 0],
                    style: 'solid',
                    outline: {
                        // autocasts as new SimpleLineSymbol()
                        color: [0, 255, 255],
                        width: 1.5,
                    },
                },
            },
        },

        /*

             {
            title: 'Manzanas con Punto Imagen',
            id: 3,
            layerId: 3,
            urlBase: `${environment.apiUrlArcGisServer}/pruebas/CAPAS_INSPECCION/MapServer`,
            order: 0,
            featureLayer: null,
            definitionExpressionBase:'CONT_PIM >0',
            definitionExpression:'',
            //definitionExpression: this.ubigeo?`UBIGEO = '${this.ubigeo}' AND CONT_PIM >0`  : 'CONT_PIM >0',
            featureTable: null,
            popupTemplate: null,
            utm: null,
            projection: null,
            visible: true,
            selected: false,
            labelClass: {
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
                    expression: '$feature.ID_MZN_U',
                },
            },
            renderer: {
                type: 'simple',
                symbol: {
                    type: 'simple-fill', // autocasts as new SimpleFillSymbol()
                    color: [0, 255, 255, 0],
                    style: 'solid',
                    outline: {
                        // autocasts as new SimpleLineSymbol()
                        color: [0, 255, 255],
                        width: 1.5,
                    },
                },
            },
        },

        {
            title: 'Punto Imagen',
            id: 4,
            layerId: 0,
            urlBase: `${environment.apiUrlArcGisServer}/pruebas/CAPAS_INSPECCION/MapServer`,
            order: 0,
            featureLayer: null,
            definitionExpressionBase:'',
            definitionExpression:'',
            //definitionExpression: this.ubigeo?`UBIGEO = '${this.ubigeo}'`  : '1=1',
            featureTable: null,
            popupTemplate: null,
            utm: null,
            projection: null,
            visible: true,
            selected: false,
            renderer: {
                type: 'simple',
                symbol: {
                    type: 'simple-marker',
                    style: 'square',
                    size: '10px', // pixels
                    color: [0, 255, 255, 0.2],
                    fillOpacity: 0.2,
                    outline: {
                        color: [0, 255, 255], // White
                        width: 1.5,
                    },
                },
            },
        },

        */

       // https://ws.mineco.gob.pe/serverdf/rest/services/ACTUALIZACION/ACTUALIZACION_DE_PUNTO_IMG/FeatureServer
        {
            title: 'Ubicacion declarada',
            id: 6,
            layerId: 0,
            urlBase: `${environment.apiUrlArcGisServer}/ACTUALIZACION/ACTUALIZACION_DE_PUNTO_IMG/FeatureServer`,
            order: 0,
            featureLayer: null,
            definitionExpressionBase:' ESTADO=1  ',
            definitionExpression:' ',
            featureTable: null,
            popupTemplate: null,
            utm: null,
            projection: null,
            visible: false,
            selected: false,
            renderer: {
                type: 'simple',
                symbol: {
                    type: 'simple-marker',
                    style: 'square',
                    size: '10px', // pixels
                    color: [0, 255, 255, 0.2],
                    fillOpacity: 0.2,
                    outline: {
                        color: [0, 255, 255], // White
                        width: 1.5,
                    },
                },
            },
        },
        {
            title: 'Manzana sin Lotes',
            id: 7,
            layerId: 2,
            urlBase: `${environment.apiUrlArcGisServer}/pruebas/CAPAS_INSPECCION/MapServer`,
            order: 0,
            featureLayer: null,
            definitionExpressionBase:'',
            definitionExpression:'',
            featureTable: null,
            popupTemplate: null,
            utm: null,
            projection: 4326,
            visible: false,
            selected: false,
            labelClass: {
                symbol: {
                    type: 'text', // autocasts as new TextSymbol()
                    color:  [255, 255, 0],
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
                    expression: '$feature.ID_MZN_C',
                },
            },
            renderer: {
                type: 'simple',
                symbol: {
                    type: 'simple-fill', // autocasts as new SimpleFillSymbol()
                    color: [0, 0, 0, 0],
                    style: 'solid',
                    outline: {
                        // autocasts as new SimpleLineSymbol()
                        color: [255, 255, 0],
                        width: 1.5,
                    },
                },
            },
        },

        /*{
          title: 'Ubicacion',
          id: 5,
          source: [],
          geometryType: 'point',
          layerId: 0,
          urlBase: null,
          order:5,
          featureLayer: null,
          definitionExpression: '1=1',
          definitionExpressionBase: '1=1',
          featureTable: null,
          popupTemplate: null,
          utm: null,
          projection: 4326,
          visible: true,
          selected: false,
          renderer: {
            type: 'simple',
            symbol: {
              type: 'picture-marker', // autocasts as new PictureMarkerSymbol()
              url: '/assets/images/map/location2.png',
              width: '20px',
              height: '30px',
              yoffset: '15px',
            },
        },


      },*/
    ];

    listSourceSearchConfig = [
        {
            url: `${
                environment.apiUrlArcGisServer
            }/pruebas/CARTO_TEMATICA_INEI/MapServer/0`,
            searchFields: ['COD_CPU'],
            displayField: 'COD_CPU',
            exactMatch: false,
            outFields: ['COD_CPU'],
            name: 'CODIGO CPU'
        }, {
            url: `${
                environment.apiUrlArcGisServer
            }/pruebas/CARTO_FISCAL/MapServer/0`,

            searchFields: ['DIR_MUN'],
            displayField: 'DIR_MUN',
            exactMatch: false,
            outFields: ['DIR_MUN'],
            name: 'DIRECCION MUNICIPAL'
        }, {
            url: `${
                environment.apiUrlArcGisServer
            }/pruebas/CARTO_FISCAL/MapServer/0`,
            searchFields: ['COD_PRE'],
            displayField: 'COD_PRE',
            exactMatch: false,
            outFields: ['COD_PRE'],
            name: 'CODIGO DE PREDIO'
        },
    ];


  _unsubscribeAll: Subject<any> = new Subject<any>();

resetMap: number=0;
    constructor(private _resultsService: ResultsService) {}

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }



    ngOnInit(): void {

    }

    pointClickEvent(e: any): void{
        this._resultsService.setPoint(e);
    }



}
