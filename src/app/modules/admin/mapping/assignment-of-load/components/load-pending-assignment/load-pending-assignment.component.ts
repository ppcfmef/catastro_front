import { Component, OnInit } from '@angular/core';
import { TableColumn } from '../../interfaces/table-columns.interface';
import { TableActions } from '../../interfaces/table-actions.interface';
import { TableAction } from '../../enum/table-action.enum';

@Component({
  selector: 'app-load-pending-assignment',
  templateUrl: './load-pending-assignment.component.html',
  styleUrls: ['./load-pending-assignment.component.scss']
})
export class LoadPendingAssignmentComponent implements OnInit {

    tableColumns: TableColumn[] =[];


    dataSource = [
        { nro: '01', sector: '1', mzurb:'A', tipo: 'CF' },
        { nro: '01', sector: '1', mzurb:'A', tipo: 'CF' },
        { nro: '01', sector: '1', mzurb:'A', tipo: 'CF' },
        { nro: '01', sector: '1', mzurb:'A', tipo: 'CF' },
    ];

    user: boolean=true;

    constructor() { }

    ngOnInit(): void {
    this.setTableColumn();
    }

    setTableColumn(): void {
        this.tableColumns = [
            {matheaderdef:'Nro', matcolumndef:'nro', matcelldef: 'nro'},
            {matheaderdef:'Sector', matcolumndef:'sector', matcelldef: 'sector'},
            {matheaderdef:'Mz.Urb.', matcolumndef:'mzurb', matcelldef: 'mzurb'},
            {matheaderdef:'Tipo', matcolumndef:'tipo', matcelldef: 'tipo'},
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

}

}
