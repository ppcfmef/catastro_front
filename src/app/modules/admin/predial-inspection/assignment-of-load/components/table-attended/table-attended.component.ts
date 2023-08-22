/* eslint-disable @typescript-eslint/naming-convention */

import { AfterViewInit, Component, OnInit } from '@angular/core';
import { TableColumn } from '../../../shared/interfaces/table-columns.interface';
import { TableConifg } from '../../../shared/interfaces/table-config.interface';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TableActions } from '../../../shared/interfaces/table-actions.interface';
import { TableAction } from '../../../shared/enum/table-action.enum';
import { MatDialogDeletedComponent } from '../alert-confirm/mat-dialog-deleted.component';


import { loadModules } from 'esri-loader';
import * as moment from 'moment';
@Component({
  selector: 'app-table-attended',
  templateUrl: './table-attended.component.html',
  styleUrls: ['./table-attended.component.scss']
})
export class TableAttendedComponent implements OnInit,AfterViewInit {

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
        private _route:ActivatedRoute,
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

    onEdit(row): void {
        this._router.navigate([`load-attend/${row.cod_carga}`], {relativeTo: this._route});
    }



    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    async dataAssigned() {
        try {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            const [ Query,query,esriConfig] = await loadModules([ 'esri/rest/support/Query','esri/rest/query','esri/config',]);
            esriConfig.portalUrl = this._portalUrl;
            // Url del servicio de cargas
            const urlCarga = 'https://ws.mineco.gob.pe/serverdf/rest/services/pruebas/carto_asignacion_carga/FeatureServer/0';

            // Realizamos el filtro
            const queryObjectAtendido = new Query();


             // ESTADO = 4 (atendido)
                queryObjectAtendido.where = 'ESTADO = "4"';
             // Campos para el estado 4: OBJECTID, ID_CARGA, COD_CARGA, FEC_ENTREGA, COD_USUARIO, NOM_USUARIO
             // Se utilizará el campo OBJECTID para desencadenar la eliminación de la carga,
             // ya que este valor es necesario para actualizar el estado de la carga a 0 (baja).
             // Asegúrate de que este valor esté disponible en algún lugar de la interfaz del usuario (id, value class, etc),
             // asociado a la fila correspondiente en la tabla.
                queryObjectAtendido.outFields = ['OBJECTID', 'ID_CARGA', 'COD_CARGA', 'FEC_ENTREGA', 'COD_USUARIO', 'NOM_USUARIO'];
             // indicamos que no queremos retornar datos de geometria
                queryObjectAtendido.returnGeometry = false;
                query.executeQueryJSON(urlCarga, queryObjectAtendido)
                .then((response)=> {

                    const data = response.features.map((feature, index) =>(
                        {
                            oid: feature.attributes.OBJECTID,
                            nro: index + 1,
                            // eslint-disable-next-line @typescript-eslint/naming-convention
                            cod_carga: feature.attributes.COD_CARGA,
                            fecha: moment(feature.attributes.FEC_ENTREGA).format('DD-MM-YYYY'),
                            cod_operador: feature.attributes.COD_USUARIO,
                            operador: feature.attributes.NOM_USUARIO
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

