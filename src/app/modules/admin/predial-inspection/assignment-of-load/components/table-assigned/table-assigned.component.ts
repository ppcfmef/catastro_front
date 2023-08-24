import { AfterViewInit, Component, OnInit } from '@angular/core';
import { TableColumn } from '../../../shared/interfaces/table-columns.interface';
import { TableConifg } from '../../../shared/interfaces/table-config.interface';
import { TableActions } from '../../../shared/interfaces/table-actions.interface';
import { TableAction } from '../../../shared/enum/table-action.enum';

import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogDeletedComponent } from '../alert-confirm/mat-dialog-deleted.component';

import { loadModules } from 'esri-loader';
import * as moment from 'moment';



@Component({
    selector: 'app-table-assigned',
    templateUrl: './table-assigned.component.html',
    styleUrls: ['./table-assigned.component.scss'],
})
export class TableAssignedComponent implements OnInit, AfterViewInit {
    _portalUrl = 'https://js.arcgis.com/4.27/';
    tableColumns: TableColumn[] = [];
    tableConfig: TableConifg = {
        isAction: true,
        isEdit: true,
        isDeleted: true,
    };

    dataSource = [];

    constructor(
        public dialog: MatDialog,
        private _router: Router,
        private _route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.setTableColumn();
    }

    ngAfterViewInit(): void {
        this.dataAssigned();
    }

    setTableColumn(): void {
        this.tableColumns = [
            { matheaderdef: 'Nro.', matcolumndef: 'nro', matcelldef: 'nro' },
            {
                matheaderdef: 'Cod. Carga',
                matcolumndef: 'codCarga',
                matcelldef: 'codCarga',
            },
            {
                matheaderdef: 'Operador',
                matcolumndef: 'operador',
                matcelldef: 'operador',
            },
            {
                matheaderdef: 'Fecha',
                matcolumndef: 'fecha',
                matcelldef: 'fecha',
            },
        ];
    }

    onAction(tableAction: TableActions): void {
        switch (tableAction.action) {
            case TableAction.edit:
                this.onEditAssigned(tableAction.row);
                break;

            case TableAction.delete:
                this.onDelete(tableAction.row);
                break;

            default:
                break;
        }
    }

    onEditAssigned(row): void {
        this._router.navigate([`load-assigned/${row.cod_carga}`], {
            relativeTo: this._route,
        });
    }
    onDelete(row: any): void {
        this.dialog.open(MatDialogDeletedComponent, {
            width: '420px',
        });
    }

    async dataAssigned(): Promise<void> {
        try {
            const [newQuery, query, esriConfig] = await loadModules([
                'esri/rest/support/Query',
                'esri/rest/query',
                'esri/config',
            ]);
            esriConfig.portalUrl = this._portalUrl;
            // Url del servicio de cargas
            const urlCarga =
                'https://ws.mineco.gob.pe/serverdf/rest/services/pruebas/carto_asignacion_carga/FeatureServer/0';
            const queryObjectAsignado = new newQuery();
            // ESTADO IN ('2', '3')(asignado)
            queryObjectAsignado.where = 'ESTADO IN ("2", "3")';
            queryObjectAsignado.outFields = [
                'OBJECTID',
                'ID_CARGA',
                'COD_CARGA',
                'FEC_ENTREGA',
                'COD_USUARIO',
                'NOM_USUARIO',
            ];

            // indicamos que no queremos retornar datos de geometria
            queryObjectAsignado.returnGeometry = false;

            query
                .executeQueryJSON(urlCarga, queryObjectAsignado)
                .then((response) => {
                    const data = response.features.map((feature, index) => ({
                        oid: feature.attributes.OBJECTID,
                        nro: index + 1,
                        codCarga: feature.attributes.COD_CARGA,
                        fecha: moment(feature.attributes.FEC_ENTREGA).format(
                            'DD-MM-YYYY'
                        ),
                        codOperador: feature.attributes.COD_USUARIO,
                        operador: feature.attributes.NOM_USUARIO,
                    }));
                    this.dataSource = data;
                })
                .catch(error => console.log(error));
        } catch (error) {
            console.log('EsriLoader: ', error);
        }
    }
}

