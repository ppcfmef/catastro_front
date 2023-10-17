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
import { ManzanaSinLoteService } from '../../services/manzana-sin-lote.service';
import { ManzanaPuntoImagenService } from '../../services/manzana-imagen.service';
import { ManzanaCrecimientoService } from '../../services/manzana-crecimiento.service';

@Component({
    selector: 'app-growing-block',
    templateUrl: './growing-block.component.html',
    styleUrls: ['./growing-block.component.scss'],
})
export class GrowingBlockComponent implements OnInit {
    _unsubscribeAll: Subject<any> = new Subject<any>();
    title = 'Manzanas crecimiento';
    ubigeo = '040703';
    rowZoom: any;
    typeGapAnalisys = TypeGap.ACTUALIZACION_CARTOGRAFICA;

    tableColumns: TableColumn[] = [];

    dataSource = [];

    cards = [];
    manzanasImagen = 0;
    tableConfig: TableConifg = {
        isAction: true,
        isZoom: true,
    };

    urlPredio = `${environment.apiUrlArcGisServer}/pruebas/CARTO_FISCAL/MapServer/0`;
    urlPuntoCampo = `${environment.apiUrlArcGisServer}/pruebas/CARTO_PUNTO_CAMPO/FeatureServer/0`;
    urlManzana = `${environment.apiUrlArcGisServer}/pruebas/CARTO_FISCAL/MapServer/8`;

    where = '';
    idManzana = 3;
    idPredio = 4;
    idPuntoCampo = 4;
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
            /*definitionExpression: this.ubigeo
                ? `UBIGEO = '${this.ubigeo}'`
                : '1=1',*/
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
            /*definitionExpression: this.ubigeo
                ? `UBIGEO = '${this.ubigeo}'`
                : '1=1',*/
            featureTable: null,
            popupTemplate: null,
            utm: null,
            projection: null,
            visible: true,
            selected: false,
        },

        {
            title: 'Manzanas en crecimiento',
            id: 3,
            layerId: 3,
            urlBase: `${environment.apiUrlArcGisServer}/pruebas/CAPAS_INSPECCION/MapServer`,
            order: 0,
            featureLayer: null,
            definitionExpressionBase:'',
            definitionExpression:'',
            /*definitionExpression: this.ubigeo
                ? `UBIGEO = '${this.ubigeo}' `
                : '1=1',*/
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
    pageIndex = 0;
    pageSize = 10;
    pageSizeOptions = [5, 10, 15];
    resetTable = false;
    private defaultTableLimit = this.pageSize;

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _manzanaCrecimientoService: ManzanaCrecimientoService
    ) {}

    ngOnInit(): void {
        this.ubigeo = localStorage.getItem('ubigeoBrechas') ? localStorage.getItem('ubigeoBrechas'):this.ubigeo;
        this.setTableColumn();
        this.getInitList();
        this.updateCards();
        /*this._activatedRoute.params.subscribe((params) => {
            this.ubigeo = params.ubigeo;

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
        this._manzanaCrecimientoService
            .getTotalManzanas({ ubigeo: this.ubigeo })
            .then((res) => {
                this.manzanasImagen = res;
            });
    }

    updateCards(): void {
        this.cards = [
            {
                num: this.manzanasImagen,
                text: 'MANZANAS CRECIMIENTO',
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
        ];
    }

    async onZoom(row: any): Promise<void> {
        this.rowZoom = row;
        this.rowZoom.where = `ubigeo ='${this.rowZoom.ubigeo}' AND  ID_MZN_U=${this.rowZoom.codmzn} `;
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
        this._manzanaCrecimientoService.getList(queryParams).then((result) => {
            if (result && result.features) {
                const features: any[] = result.features;
                console.log('features>>', features);
                const data = features.map((f: any) => ({
                    ubigeo: f.attributes['ubigeo'],
                    codmzn: f.attributes['ID_MZN_U'],
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

        this._manzanaCrecimientoService.getList(queryParams).then((result) => {
            if (result && result.features) {
                const features: any[] = result.features;
                const data = features.map((f: any) => ({
                    // eslint-disable-next-line @typescript-eslint/naming-convention
                    'UBIGEO': f.attributes['ubigeo'],
                    // eslint-disable-next-line @typescript-eslint/naming-convention
                    'CODIGO DE MANZANA': f.attributes['ID_MZN_U'],
                }));
                ExportUtils.exportToExcel(data, 'Manzanas en crecimiento.xlsx');
            }
        });
    }
}
