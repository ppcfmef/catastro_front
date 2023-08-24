import { Component, OnChanges, OnInit } from '@angular/core';
import { TableColumn } from '../../../shared/interfaces/table-columns.interface';
import { TableConifg } from '../../../shared/interfaces/table-config.interface';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { TypeGapAnalisys } from 'app/shared/enums/type-gap-analisys.enum';
import { ManzanaPrediosSubvaluadosService } from '../../services/manzana-sub-valuado.service';
import { MatPaginator } from '@angular/material/paginator';
import { CommonUtils } from 'app/core/common/utils/common.utils';
import { loadModules } from 'esri-loader';
@Component({
    selector: 'app-sub-land',
    templateUrl: './sub-land.component.html',
    styleUrls: ['./sub-land.component.scss'],
})
export class SubLandComponent implements OnInit {
    ubigeo = '140204';
    rowZoom: any;
    typeGapAnalisys = TypeGapAnalisys.PREDIO_SUBVALUADO;

    tableColumns: TableColumn[] = [];

    dataSource = [{ ubigeo: '010101', codmzn: 'A', contps: 5 }];

    cards = [
        {
            num: 21,
            text: 'PREDIOS PARA VERIFICACION EN CAMPO',
        },
        {
            num: 21,
            text: 'PREDIOS EN TRABAJO DE CAMPO',
        },
    ];

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
            definitionExpression: '1=1',
            featureTable: null,
            popupTemplate: null,
            utm: null,
            projection: 4326,
            visible: true,
            selected: false,
            labelClass: {
                // autocasts as new LabelClass()
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
                    color: [0, 0, 255, 0],
                    style: 'solid',
                    outline: {
                        // autocasts as new SimpleLineSymbol()
                        color: [0, 0, 255],
                        width: 2,
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
            definitionExpression: '1=1',
            featureTable: null,
            popupTemplate: null,
            utm: null,
            projection: null,
            visible: true,
            selected: false,
        },

        {
            title: 'Predios',
            id: 3,
            layerId: 0,
            urlBase: `${environment.apiUrlArcGisServer}/pruebas/CARTO_FISCAL/MapServer`,
            order: 0,
            featureLayer: null,
            definitionExpression: '1=1',
            featureTable: null,
            popupTemplate: null,
            utm: null,
            projection: null,
            visible: true,
            selected: false,
        },

        {
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
                        width: 1,
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
            url: `${environment.apiUrlArcGisServer}/pruebas/CARTO_TEMATICA_INEI/MapServer/2`,
            searchFields: ['DISTRITO', 'UBIGEO'],
            displayField: 'DISTRITO',
            exactMatch: false,
            outFields: ['DISTRITO', 'UBIGEO'],
            name: 'DISTRITOS',
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
    private defaultTableLimit = 5;

    constructor(
        private _router: Router,
        private _manzanaPrediosSubvaluadosService: ManzanaPrediosSubvaluadosService
    ) {}

    ngOnInit(): void {
        //this.where = `UBIGEO='${this.ubigeo}' AND CONT_PS >0`;
        this.where = 'CONT_PS >0';
        if (this.ubigeo && this.ubigeo!==''){this.where = `${this.where} AND UBIGEO='${this.ubigeo}' `;}

        this.setTableColumn();
        this.getInitList();
    }

    getInitList(): void {
        const queryParams = {
            resultRecordCount: this.defaultTableLimit,
            resultOffset: 0,
            where: this.where,
        };

        this.getDataTable(queryParams);
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
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const [FeatureLayer] = await loadModules(['esri/layers/FeatureLayer']);

        const queryFeature = {
            where: `UBIGEO = ${row.ubigeo} and ID_MZN_C = ${row.idmznc}`, // Relationship operation to apply
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
            });
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
        };
        const queryParams = CommonUtils.deleteKeysNullInObject(filterRawValue);
        this.getDataTable(queryParams);
    }

    getDataTable(queryParams: any): void {
        this._manzanaPrediosSubvaluadosService
            .get(queryParams)
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
                    this.tableLength = result.count;
                }
            });
    }
}
