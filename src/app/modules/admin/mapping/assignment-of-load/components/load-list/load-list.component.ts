import { Component, OnInit } from '@angular/core';
import { TableColumn } from '../../interfaces/table-columns.interface';
import { TableActions } from '../../interfaces/table-actions.interface';
import { TableAction } from '../../enum/table-action.enum';


@Component({
  selector: 'app-load-list',
  templateUrl:'./load-list.component.html',
  styleUrls: ['./load-list.component.scss']
})
export class LoadListComponent implements OnInit {

    tableColumns: TableColumn[] =[];
    tableColumnsAssignment: TableColumn[] =[];

    dataSource = [
    { nro: '01', codCarga: '4567845', operdor:'Juan Diaz', fecha: '22/06/2023' },
    { nro: '02', codCarga: '4567845', operdor:'Pedro Salvatierra',fecha: '22/06/2023' },
    { nro: '03', codCarga: '4567845', operdor:'Carlos Alvarez',fecha: '22/06/2023' },
    { nro: '04', codCarga: '4567845', operdor:'Diego Gavilan', fecha: '22/06/2023' }
];

    constructor() { }

    ngOnInit(): void {
        this.setTableColumn();
    }

    setTableColumn(): void {
        this.tableColumns = [
            {matheaderdef:'Nro.', matcolumndef:'nro', matcelldef: 'nro'},
            {matheaderdef:'Cod. Carga', matcolumndef:'codCarga', matcelldef: 'codCarga'},
            {matheaderdef:'Fecha', matcolumndef:'fecha', matcelldef: 'fecha'},
        ];

        this.tableColumnsAssignment = [
            {matheaderdef:'Nro', matcolumndef:'nro', matcelldef: 'nro'},
            {matheaderdef:'Cod. Carga', matcolumndef:'codCarga', matcelldef: 'codCarga'},
            {matheaderdef:'Operador', matcolumndef:'operdor', matcelldef: 'operdor'},
            {matheaderdef:'Fecha', matcolumndef:'fecha', matcelldef: 'fecha'},
        ];

    }

    onTableAction(tableAction: TableActions): void {
        switch (tableAction.action) {
            case TableAction.edit:
            this.onEdit(tableAction.row);
            break;

            case TableAction.delete:
            this.onDelete(tableAction.row);
            break;

            default:
                break;
        }
    };

    //   Implementar logica
    onEdit(row: any): void {
        console.log('Edit',);
    }
    onDelete(row: any): void {
        console.log('Delete');
    }

}
