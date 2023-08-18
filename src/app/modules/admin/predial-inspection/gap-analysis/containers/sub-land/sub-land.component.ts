import { Component, OnInit } from '@angular/core';
import { TableColumn } from '../../../shared/interfaces/table-columns.interface';
import { TableConifg } from '../../../shared/interfaces/table-config.interface';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { TypeGapAnalisys } from 'app/shared/enums/type-gap-analisys.enum';

@Component({
    selector: 'app-sub-land',
    templateUrl: './sub-land.component.html',
    styleUrls: ['./sub-land.component.scss'],
})
export class SubLandComponent implements OnInit {
    typeGapAnalisys = TypeGapAnalisys.PREDIO_SUBVALUADO;
    //apiUrlPuntoCampo = `${environment.apiUrlArcGisServer}/pruebas/CARTO_PUNTO_CAMPO/MapServer/0`;
    tableColumns: TableColumn[] = [];
    dataSource = [
        { nro: '01', estado: '1', mzurb: 'A', tipo: '5' },
        { nro: '02', estado: '1', mzurb: 'Z1', tipo: '7' },
        { nro: '03', estado: '3', mzurb: 'P', tipo: '1' },
        { nro: '04', estado: '12', mzurb: 'Z1', tipo: '1' },
    ];

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
    urlManzana = `${environment.apiUrlArcGisServer}/pruebas/CARTO_PUNTO_CAMPO/MapServer/8`;

    idManzana = 3;
    idPredio = 1;
    layersInfo = [
        {
            title: 'Predios',
            id: 1,
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
            title: 'Manzana',
            id: 3,
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
                    type: 'simple-fill',  // autocasts as new SimpleFillSymbol()
                    color: [ 0, 0, 255,0 ],
                    style: 'solid',
                    outline: {  // autocasts as new SimpleLineSymbol()
                      color: [ 0, 0, 255 ],
                      width: 2
                    }
                }
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
    constructor(private _router: Router) {}

    ngOnInit(): void {
        this.setTableColumn();
    }
    setTableColumn(): void {
        this.tableColumns = [
            { matheaderdef: 'Nro', matcolumndef: 'nro', matcelldef: 'nro' },
            {
                matheaderdef: 'Mz.Urb.',
                matcolumndef: 'mzurb',
                matcelldef: 'mzurb',
            },
            { matheaderdef: 'Sub', matcolumndef: 'tipo', matcelldef: 'tipo' },
            /*{
                matheaderdef: 'Estado',
                matcolumndef: 'estado',
                matcelldef: 'estado',
            },*/
        ];
    }

    onZoom(row: any): void {
        console.log('zoom');
    }
}
