import { Component, OnChanges, OnInit } from '@angular/core';
import { TableColumn } from '../../../shared/interfaces/table-columns.interface';
import { TableConifg } from '../../../shared/interfaces/table-config.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'environments/environment';
import { TypeGapAnalisys } from 'app/shared/enums/type-gap-analisys.enum';
import { ManzanaPrediosSubvaluadosService } from '../../services/manzana-sub-valuado.service';
import { MatPaginator } from '@angular/material/paginator';
import { CommonUtils } from 'app/core/common/utils/common.utils';
import { UserService } from 'app/core/user/user.service';
import { Subject } from 'rxjs';
import { User } from 'app/core/user/user.types';
import { ExportUtils } from 'app/shared/utils/export.util';
import { ManzanaLotesSinPredioService } from '../../services/lotes-sin-predio.service';
import { ManzanaSinLoteService } from '../../services/manzana-sin-lote.service';

@Component({
  selector: 'app-without-batch',
  templateUrl: './without-batch.component.html',
  styleUrls: ['./without-batch.component.scss']
})
export class WithoutBatchComponent implements OnInit {
    _unsubscribeAll: Subject<any> = new Subject<any>();
    title ='Manzana sin lotes';
    ubigeo = '040703';
    rowZoom: any;
    typeGapAnalisys = TypeGapAnalisys.MANZANA_SIN_LOTES;

    tableColumns: TableColumn[] = [];

    dataSource = [];

    cards = [];
    manzanasSinLote = 0;
    tableConfig: TableConifg = {
        isAction: true,
        isZoom: true,
    };

    urlPredio = `${environment.apiUrlArcGisServer}/pruebas/CARTO_FISCAL/MapServer/0`;
    urlPuntoCampo = `${environment.apiUrlArcGisServer}/pruebas/CARTO_PUNTO_CAMPO/FeatureServer/0`;
    urlManzana = `${environment.apiUrlArcGisServer}/pruebas/CARTO_FISCAL/MapServer/8`;

    where = '';
    idManzana = 1;
    idPredio = 3;
    idPuntoCampo = 4;
    layersInfo = [
        {
            title: 'Manzana',
            id: 1,
            layerId: 8,
            urlBase: `${environment.apiUrlArcGisServer}/pruebas/CARTO_FISCAL/MapServer`,
            order: 0,
            featureLayer: null,
            definitionExpression: this.ubigeo?`UBIGEO = '${this.ubigeo}'`  : '1=1',
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
                        color: [0, 0, 255],
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
            definitionExpression: this.ubigeo?`UBIGEO = '${this.ubigeo}'`  : '1=1',
            featureTable: null,
            popupTemplate: null,
            utm: null,
            projection: null,
            visible: true,
            selected: false,
        },



        {
            title: 'Manzanas Sin Lote',
            id: 3,
            layerId: 2,
            urlBase: `${environment.apiUrlArcGisServer}/pruebas/CAPAS_INSPECCION/MapServer`,
            order: 0,
            featureLayer: null,
            definitionExpression: this.ubigeo?`UBIGEO = '${this.ubigeo}'`  : '1=1',
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
                    color: [255, 255, 0,0.2],
                    fillOpacity: 0.2,
                    outline: {
                        color: [255, 255, 0, 0], // White
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
    pageSize = 15;
    pageSizeOptions = [5, 10, 15];
    resetTable = false;
    private defaultTableLimit = this.pageSize;

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _manzanaSinLoteService: ManzanaSinLoteService,


    ) {}

    ngOnInit(): void {
        this._activatedRoute.params.subscribe((params) => {
            this.ubigeo = params.ubigeo;

            this.setTableColumn();
            this.getInitList();

            this.updateCards();
        });
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
        this._manzanaSinLoteService
            .getTotalManzanaSinLote({ ubigeo: this.ubigeo })
            .then((res) => {
                this.manzanasSinLote = res;
            });
    }

    updateCards(): void {
        this.cards = [
            {
                num: this.manzanasSinLote,
                text: 'MANZANAS SIN LOTE',
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
        this._manzanaSinLoteService
            .getList(queryParams)
            .then((result) => {
                if (result && result.features) {
                    const features: any[] = result.features;
                    const data = features.map((f: any) => ({
                        ubigeo: f.attributes['UBIGEO'],
                        codmzn: f.attributes['COD_MZN'],

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

        this._manzanaSinLoteService
            .getList(queryParams)
            .then((result) => {
                if (result && result.features) {
                    const features: any[] = result.features;
                    const data = features.map((f: any) => ({
                        // eslint-disable-next-line @typescript-eslint/naming-convention
                        'UBIGEO': f.attributes['UBIGEO'],
                        // eslint-disable-next-line @typescript-eslint/naming-convention
                        'CODIGO DE MANZANA': f.attributes['COD_MZN'],

                    }));
                    ExportUtils.exportToExcel(
                        data,
                        'Manzanas sin lote.xlsx'
                    );
                }
            });
    }


}
