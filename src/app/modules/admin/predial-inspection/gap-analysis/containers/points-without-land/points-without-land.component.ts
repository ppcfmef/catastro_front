/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnChanges, OnInit } from '@angular/core';
import { TableColumn } from '../../../shared/interfaces/table-columns.interface';
import { TableConifg } from '../../../shared/interfaces/table-config.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'environments/environment';
import { TypeGap } from 'app/shared/enums/type-gap.enum';
import { ManzanaPrediosSubvaluadosService } from '../../services/manzana-sub-valuado.service';
import { MatPaginator } from '@angular/material/paginator';
import { CommonUtils } from 'app/core/common/utils/common.utils';
import { UserService } from 'app/core/user/user.service';
import { Subject } from 'rxjs';
import { User } from 'app/core/user/user.types';
import { ExportUtils } from 'app/shared/utils/export.util';
import { ManzanaLotesSinPredioService } from '../../services/lotes-sin-predio.service';

@Component({
  selector: 'app-points-without-land',
  templateUrl: './points-without-land.component.html',
  styleUrls: ['./points-without-land.component.scss']
})
export class PointsWithoutLandComponent implements OnInit {
    _unsubscribeAll: Subject<any> = new Subject<any>();
    title ='Puntos lotes sin predio';
    ubigeo = '040703';
    rowZoom: any;
    typeGapAnalisys = TypeGap.PUNTOS_LOTE_SIN_PREDIO;

    tableColumns: TableColumn[] = [];

    dataSource = [];

    cards = [];
    totalLotesSinPredio = 0;
    tableConfig: TableConifg = {
        isAction: true,
        isZoom: true,
    };

    urlPredio = `${environment.apiUrlArcGisServer}/pruebas/CARTO_FISCAL/MapServer/0`;
    urlPuntoCampo = `${environment.apiUrlArcGisServer}/pruebas/CARTO_PUNTO_CAMPO/FeatureServer/0`;
    urlManzana = `${environment.apiUrlArcGisServer}/pruebas/CARTO_FISCAL/MapServer/8`;

    where = '';
    idManzana = 1;
    idPredio = 4;
    idPuntoCampo = null;
    layersInfo = [
        {
            title: 'Manzana',
            id: 1,
            layerId: 8,
            urlBase: `${environment.apiUrlArcGisServer}/pruebas/CARTO_FISCAL/MapServer`,
            order: 0,
            featureLayer: null,
            definitionExpressionBase:'',
            definitionExpression:'',
            //definitionExpression: this.ubigeo?`UBIGEO = '${this.ubigeo}'`  : '1=1',
            featureTable: null,
            popupTemplate: null,
            utm: null,
            projection: 4326,
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
                    expression: '$feature.COD_MZN',
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
                        color: [0, 0, 0],
                        width: 1.5,
                    },
                },
            },
        },

        /*{
            title: 'Via Zona',
            id: 2,
            layerId: 2,
            urlBase: `${environment.apiUrlArcGisServer}/pruebas/CARTO_FISCAL/MapServer`,
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
        },*/

        {
            title: 'Polígono de Lotes',
            id: 3,
            layerId: 5,
            urlBase: `${environment.apiUrlArcGisServer}/pruebas/CARTO_FISCAL/MapServer`,
            order: 0,
            featureLayer: null,
            definitionExpressionBase:'',
            definitionExpression:'',
            featureTable: null,
            popupTemplate: null,
            utm: null,
            projection: null,
            visible: true,
            selected: false,
            renderer: {
                type: 'class-breaks', // autocasts as new UniqueValueRenderer()
                field: 'ESTADO_INS',
                legendOptions: {
                    title: 'Estado',
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
            labelClass: {
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
        },

        {
            title: 'Lotes',
            id: 4,
            layerId: 1,
            urlBase: `${environment.apiUrlArcGisServer}/pruebas/CARTO_FISCAL/MapServer`,
            order: 0,
            featureLayer: null,
            definitionExpressionBase:'',
            definitionExpression:'',
            featureTable: null,
            popupTemplate: null,
            utm: null,
            projection: null,
            visible: true,
            selected: false,
            renderer:null
        },
        {
            title: 'Lotes sin predio',
            id: 5,
            layerId: 1,
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
                    color: [255, 0, 0,0.6],
                    fillOpacity: 0.2,
                    outline: {
                        color: [255, 0, 0], // White
                        width: 2,
                    },
                },
            },
        },

        /*{
            title: 'Predios Subvaluados',
            id: 4,
            layerId: 0,
            urlBase: `${environment.apiUrlArcGisServer}/pruebas/CARTO_PUNTO_CAMPO/FeatureServer`,
            order: 0,
            featureLayer: null,
            definitionExpression: '1=1',
            featureTable: null,
            popupTemplate: null,
            utm: null,
            projection: 4326,
            visible: true,
            selected: false,
            renderer: {
                type: 'simple',
                symbol: {
                    type: 'simple-marker',
                    style: 'square',
                    size: '10px', // pixels
                    color: [15, 255, 255, 0.2],
                    fillOpacity: 0.2,
                    outline: {
                        color: [15, 255, 255], // White
                        width: 2,
                    },
                },
            },
        },*/
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
    ];

    queryParams = {};
    tableLength: number;
    user: User;
    pageIndex = 0;
    pageSize = 10;
    pageSizeOptions = [5, 10, 25, 50, 100, 250, 500];
    resetTable = false;
    private defaultTableLimit = this.pageSize;

    constructor(
        private _manzanaLotesSinPredio: ManzanaLotesSinPredioService,
        private _activatedRoute: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.ubigeo = localStorage.getItem('ubigeoBrechas') ? localStorage.getItem('ubigeoBrechas'):this.ubigeo;
        this.setTableColumn();
        this.getInitList();
        this.updateCards();
        /*this._activatedRoute.params.subscribe((params) => {
            this.ubigeo = params.ubigeo;

            this.setTableColumn();
            this.getInitList();

            this.updateCards();
        });*/
    }

    getInitList(): void {
        const queryParams = {
            resultRecordCount: this.defaultTableLimit,
            resultOffset: 0,
            ubigeo: this.ubigeo,
            count: true,
        };
        this.getDataTable(queryParams);
        this.resetTable = true;
        this.getTotalPredios();
    }

    getTotalPredios(): void {
        this._manzanaLotesSinPredio
            .getTotalLotesSinPredio({ ubigeo: this.ubigeo })
            .then((res) => {
                this.totalLotesSinPredio = res;
            });
    }

    updateCards(): void {
        this.cards = [
            {
                num: this.totalLotesSinPredio,
                text: 'LOTES SIN PREDIO',
            },
        ];
    }

    setTableColumn(): void {
        this.tableColumns = [
            //{ matheaderdef: 'Nro', matcolumndef: 'nro', matcelldef: 'nro' },
            {
                matheaderdef: 'Ubigeo.',
                matcolumndef: 'ubigeo',
                matcelldef: 'ubigeo',
            },
            {
                matheaderdef: 'Mz.',
                matcolumndef: 'codmzn',
                matcelldef: 'codmzn',
            },
            {
                matheaderdef: 'Sin predio',
                matcolumndef: 'contlsp',
                matcelldef: 'contlsp',
            },
        ];
    }

    async onZoom(row: any): Promise<void> {
        this.rowZoom = row;

    }

    onChangePage(
        paginator: MatPaginator | { pageSize: number; pageIndex: number }
    ): void {
        console.log('paginator', paginator);
        const resultRecordCount = paginator.pageSize;
        const resultOffset = resultRecordCount * paginator.pageIndex;
        const filterRawValue = {
            resultRecordCount,
            resultOffset,
            where: this.where,
            ubigeo: this.ubigeo,
            count: false,
        };
        const queryParams = CommonUtils.deleteKeysNullInObject(filterRawValue);
        this.resetTable = false;
        this.getDataTable(queryParams);

    }

    getDataTable(queryParams: any): void {
        this._manzanaLotesSinPredio
            .getList(queryParams)
            .then((result) => {
                if (result && result.features) {
                    const features: any[] = result.features;
                    const data = features.map((f: any) => ({
                        ubigeo: f.attributes['UBIGEO'],
                        codmzn: f.attributes['COD_MZN'],
                        idmznc: f.attributes['ID_MZN_C'],
                        contlsp: f.attributes['CONT_LSP'],
                    }));
                    this.dataSource = data;
                    if (queryParams.count) {
                        this.tableLength = result.count;
                        this.updateCards();
                    }
                }
            });
    }

    exportDataToExcel(): void {
        const filterRawValue = {
            ubigeo: this.ubigeo,
            count: false,
            resultOffset: 0,
            resultRecordCount: this.tableLength,
        };
        const queryParams = CommonUtils.deleteKeysNullInObject(filterRawValue);

        this._manzanaLotesSinPredio
            .getList(queryParams)
            .then((result) => {
                if (result && result.features) {
                    const features: any[] = result.features;
                    const data = features.map((f: any) => ({
                        'UBIGEO': f.attributes['UBIGEO'],
                        'CODIGO DE MANZANA': f.attributes['COD_MZN'],
                        'CANTIDAD DE LOTES SIN PREDIO':
                            f.attributes['CONT_LSP'],
                    }));
                    ExportUtils.exportToExcel(
                        data,
                        'Manzanas con lotes sin predio.xlsx'
                    );
                }
            });
    }

}
