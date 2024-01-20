/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnChanges, OnInit } from '@angular/core';
import { TableColumn } from '../../../shared/interfaces/table-columns.interface';
import { TableConifg } from '../../../shared/interfaces/table-config.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'environments/environment';
import { TypeGap } from 'app/shared/enums/type-gap.enum';
import { ManzanaPrediosSubvaluadosService } from '../../services/manzana-sub-valuado.service';
import { MatLegacyPaginator as MatPaginator } from '@angular/material/legacy-paginator';
import { CommonUtils } from 'app/core/common/utils/common.utils';
import { UserService } from 'app/core/user/user.service';
import { Subject } from 'rxjs';
import { User } from 'app/core/user/user.types';
import { ExportUtils } from 'app/shared/utils/export.util';

@Component({
    selector: 'app-sub-land',
    templateUrl: './sub-land.component.html',
    styleUrls: ['./sub-land.component.scss'],
})
export class SubLandComponent implements OnInit {
    _unsubscribeAll: Subject<any> = new Subject<any>();
    title='Predios para verificacion';
    ubigeo = '040703';
    rowZoom: any;
    typeGapAnalisys = TypeGap.PREDIO_SUBVALUADO;

    tableColumns: TableColumn[] = [];

    dataSource = [];

    cards = [];
    totalPredios = 0;
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
    idPuntoCampo = 5;
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

        {
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
        },

        {
            title: 'Lotes Poligono Zona',
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
            renderer:null
        },

        {
            title: 'Predios',
            id: 4,
            layerId: 0,
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
        },

        {
            title: 'Predios para verificacion',
            id: 5,
            layerId: 0,
            urlBase: `${environment.apiUrlArcGisServer}/pruebas/CARTO_PUNTO_CAMPO/FeatureServer`,
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
            renderer: {
                type: 'simple',
                symbol: {
                    type: 'simple-marker',
                    style: 'square',
                    size: '10px', // pixels
                    color: [0, 255, 0, 0.2],
                    fillOpacity: 0.2,
                    outline: {
                        color: [0, 255, 0], // White
                        width: 1.5,
                    },
                },
                /*symbol: {
                    type: 'simple-marker',
                    style: 'square',
                    size: '10px', // pixels
                    color: [15, 255, 255, 0.2],
                    fillOpacity: 0.2,
                    outline: {
                        color: [15, 255, 255], // White
                        width: 2,
                    },
                },*/
            },
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
    ];

    queryParams = {};
    tableLength: number;
    user: User;
    pageIndex = 0;
    pageSize = 10;
    pageSizeOptions = [5, 10, 15];
    resetTable = false;
    private defaultTableLimit = this.pageSize;

    constructor(
        private _router: Router,
        private _manzanaPrediosSubvaluadosService: ManzanaPrediosSubvaluadosService,
        private _userService: UserService,
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
        this._manzanaPrediosSubvaluadosService
            .getTotalSubvaluados({ ubigeo: this.ubigeo })
            .then((res) => {
                this.totalPredios = res;
            });
    }

    updateCards(): void {
        this.cards = [
            {
                num: this.totalPredios,
                text: 'PREDIOS PARA VERIFICACION EN CAMPO',
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
                matheaderdef: 'Sub',
                matcolumndef: 'contps',
                matcelldef: 'contps',
            },
        ];
    }

    async onZoom(row: any): Promise<void> {
        this.rowZoom = row;
        /*
        const [FeatureLayer] = await loadModules(['esri/layers/FeatureLayer']);

        const queryFeature = {
            where: `UBIGEO = ${row.ubigeo} and ID_MZN_C = ${row.idmznc}`,
            returnGeometry: true,
        };

        const featureLayer = new FeatureLayer(this.urlManzana);

        featureLayer
            .queryFeatures(queryFeature)
            .then((results) => {
                if (results.features.length > 0) {
                    const feature = results.features[0];
                    row.feature = feature;
                    this.rowZoom = row;
                }
            })
            .catch((error) => {
                console.log(error);
            });*/
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
            count: false,
            ubigeo: this.ubigeo,
        };
        const queryParams = CommonUtils.deleteKeysNullInObject(filterRawValue);
        this.resetTable = false;
        this.getDataTable(queryParams);
        //paginator.firstPage();
    }

    getDataTable(queryParams: any): void {
        this._manzanaPrediosSubvaluadosService
            .getList(queryParams)
            .then((result) => {
                if (result && result.features) {
                    const features: any[] = result.features;
                    const data = features.map((f: any) => ({
                        ubigeo: f.attributes['UBIGEO'],
                        codmzn: f.attributes['COD_MZN'],
                        idmznc: f.attributes['ID_MZN_C'],
                        contps: f.attributes['CONT_PS'],
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

        this._manzanaPrediosSubvaluadosService
            .getList(queryParams)
            .then((result) => {
                if (result && result.features) {
                    const features: any[] = result.features;
                    const data = features.map((f: any) => ({
                        'UBIGEO': f.attributes['UBIGEO'],
                        'CODIGO DE MANZANA': f.attributes['COD_MZN'],
                        'CANTIDAD DE PUNTOS SUBVALUADOS':
                            f.attributes['CONT_PS'],
                    }));
                    ExportUtils.exportToExcel(
                        data,
                        'Manzanas subvaluadas.xlsx'
                    );
                }
            });
    }
}
