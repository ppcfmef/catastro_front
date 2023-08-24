import { AfterViewInit, Component, OnInit } from '@angular/core';
import { TableColumn } from '../../../shared/interfaces/table-columns.interface';
import { TableConifg } from '../../../shared/interfaces/table-config.interface';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';


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
    };

    dataSource = [];


    constructor(
        public dialog: MatDialog,
        private _router: Router,
        private _route: ActivatedRoute,
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
            {matheaderdef:'Cod. Carga', matcolumndef:'codCarga', matcelldef: 'codCarga'},
            {matheaderdef:'Operador', matcolumndef:'operador', matcelldef: 'operador'},
            {matheaderdef:'Fecha', matcolumndef:'fecha', matcelldef: 'fecha'},
        ];

    }

    onEdit(row): void {
        this._router.navigate([`load-attend/${row.codCarga}`], {relativeTo: this._route});
    }




    async dataAssigned(): Promise<void> {
        try {
            const [ newQuery,query,esriConfig] = await loadModules([ 'esri/rest/support/Query','esri/rest/query','esri/config',]);
            esriConfig.portalUrl = this._portalUrl;
            // Url del servicio de cargas
            const urlCarga = 'https://ws.mineco.gob.pe/serverdf/rest/services/pruebas/carto_asignacion_carga/FeatureServer/0';

            // Realizamos el filtro
            const queryObjectAtendido = new newQuery();
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
                            codCarga: feature.attributes.COD_CARGA,
                            fecha: moment(feature.attributes.FEC_ENTREGA).format('DD-MM-YYYY'),
                            codOperador: feature.attributes.COD_USUARIO,
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

