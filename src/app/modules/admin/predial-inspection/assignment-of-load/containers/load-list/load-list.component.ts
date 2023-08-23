import { Component, OnInit } from '@angular/core';
import { TableColumn } from '../../../shared/interfaces/table-columns.interface';
import { TableActions } from '../../../shared/interfaces/table-actions.interface';
import { TableAction } from '../../../shared/enum/table-action.enum';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogDeletedComponent } from '../../components/alert-confirm/mat-dialog-deleted.component';
import { Router } from '@angular/router';
import { TableConifg } from '../../../shared/interfaces/table-config.interface';
import { StateService } from '../../services/state.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';



@Component({
  selector: 'app-load-list',
  templateUrl:'./load-list.component.html',
  styleUrls: ['./load-list.component.scss']
})
export class LoadListComponent implements OnInit {

    tableColumns: TableColumn[] =[];
    tableColumnsAssignment: TableColumn[] =[];
    tableConfig: TableConifg = {
        isAction: true,
        isEdit: true,
        isDeleted:true,
    };

    tableConfigAttend: TableConifg = {
        isAction: true,
        isEdit: true,
    };

    dataSource = [
    { nro: '01', codCarga: '4567845', operdor:'Juan Diaz', fecha: '22/06/2023' },
    { nro: '02', codCarga: '4567845', operdor:'Pedro Salvatierra',fecha: '22/06/2023' },
    { nro: '03', codCarga: '4567845', operdor:'Carlos Alvarez',fecha: '22/06/2023' },
    { nro: '04', codCarga: '4567845', operdor:'Diego Gavilan', fecha: '22/06/2023' }
    ];

    private _unsuscribe = new Subject();
    constructor(
        public dialog: MatDialog,
        private _router: Router,
        private _stateService: StateService,
        ) { }

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

    onAction(tableAction: TableActions): void {
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

    onTableAction2(tableAction: TableActions): void {
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

    onEdit(row: any): void {
        this._router.navigate(['land-inspection/assignment-of-load/load-pending-assigment']);
    }

    //   Implementar logica
    onEditAssigned(row: any): void {
        this._router.navigate(['land-inspection/assignment-of-load/load-assigned']);
    }
    onDelete(row: any): void {
            this.dialog.open(MatDialogDeletedComponent, {
            width: '420px',
            });

    }

    redirecto(): void {
        this._router.navigate(['land-inspection/assignment-of-load/assign-load']);
        this._stateService.state.emit(true);
    }

    onEditattend(row: any): void {
        this._router.navigate(['land-inspection/assignment-of-load/load-attend']);
    }



}
