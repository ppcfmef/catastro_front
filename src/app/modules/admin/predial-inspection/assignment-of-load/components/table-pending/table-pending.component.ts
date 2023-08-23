/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/naming-convention */
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { TableColumn } from '../../../shared/interfaces/table-columns.interface';
import { TableConifg } from '../../../shared/interfaces/table-config.interface';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TableActions } from '../../../shared/interfaces/table-actions.interface';
import { TableAction } from '../../../shared/enum/table-action.enum';
import { MatDialogDeletedComponent } from '../alert-confirm/mat-dialog-deleted.component';


import { loadModules } from 'esri-loader';
import * as moment from 'moment';

@Component({
  selector: 'app-table-pending',
  templateUrl: './table-pending.component.html',
  styleUrls: ['./table-pending.component.scss']
})
export class TablePendingComponent implements OnInit,AfterViewInit {

    _portalUrl = 'https://js.arcgis.com/4.27/';
    tableColumns: TableColumn[] =[];
    tableConfig: TableConifg = {
        isAction: true,
        isEdit: true,
        isDeleted: true,
    };

    dataSource = [];


    constructor(
        public dialog: MatDialog,
        private _router: Router,
        ) { }

    ngOnInit(): void {
        this.setTableColumn();
    }

    ngAfterViewInit(): void {
        this.dataAssigned();
    }

    setTableColumn(): void {
        this.tableColumns = [
            {matheaderdef:'Nro.', matcolumndef:'nro', matcelldef: 'nro'},
            {matheaderdef:'Cod. Carga', matcolumndef:'cod_carga', matcelldef: 'cod_carga'},
            {matheaderdef:'Operador', matcolumndef:'operador', matcelldef: 'operador'},
            {matheaderdef:'Fecha', matcolumndef:'fecha', matcelldef: 'fecha'},
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
    };

    onEditAssigned(row): void {
        this._router.navigate([`inspection/assignment-of-load/load-assigned/${row.cod_carga}`]);
    }
    onDelete(row: any): void {
            this.dialog.open(MatDialogDeletedComponent, {
            width: '420px',
            });

    }

    async dataAssigned() {
        try {
            const [ Query,query,esriConfig] = await loadModules([ 'esri/rest/support/Query','esri/rest/query','esri/config',]);
            esriConfig.portalUrl = this._portalUrl;
            // Url del servicio de cargas
            const urlCarga = 'https://ws.mineco.gob.pe/serverdf/rest/services/pruebas/carto_asignacion_carga/FeatureServer/0';

            // Realizamos el filtro
            const queryObjectPorAsignar = new Query();

            queryObjectPorAsignar.where = 'ESTADO = "1"';
            // Campos para el estado 1: OBJECTID, ID_CARGA, COD_CARGA, FEC_ENTREGA
            // Se utilizará el campo OBJECTID para desencadenar la eliminación de la carga,
            // ya que este valor es necesario para actualizar el estado de la carga a 0 (baja).
            // Asegúrate de que este valor esté disponible en algún lugar de la interfaz del usuario (id, value class, etc),
            // asociado a la fila correspondiente en la tabla.
            queryObjectPorAsignar.outFields = ['OBJECTID', 'ID_CARGA', 'COD_CARGA', 'FEC_ENTREGA'];

            // indicamos que no queremos retornar datos de geometria
            queryObjectPorAsignar.returnGeometry = false;

            // query to feature layer
            query.executeQueryJSON(urlCarga, queryObjectPorAsignar)
                .then((response)=> {

                    const data = response.features.map((feature, index) =>(
                        {
                            oid: feature.attributes.OBJECTID,
                            nro: index + 1,
                            cod_carga: feature.attributes.COD_CARGA,
                            fecha: moment(feature.attributes.FEC_ENTREGA).format('DD-MM-YYYY'),
                        })
                    );
                        this.dataSource = data;
                })
                .catch( error => console.log(error));
        }
        catch (error) {
            console.log('EsriLoader: ', error);
        }
    }
}

