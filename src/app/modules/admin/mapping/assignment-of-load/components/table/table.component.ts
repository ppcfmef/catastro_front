import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TableColumn } from '../../interfaces/table-columns.interface';
import { TableActions } from '../../interfaces/table-actions.interface';
import { TableAction } from '../../enum/table-action.enum';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

    @Output()
    public action: EventEmitter<TableActions> = new EventEmitter();

    @Input() dataSource: [] ;

    @Input() iseditable: boolean = false;

    @Input() isdelete: boolean = false;
    @Input() zoom: boolean =false;

    @Input()
    set columns(colums: TableColumn[]) {
        this.tableColumns = colums;
        this.displayedColumns = this.tableColumns.map(col => col.matcolumndef);
    };

    @Input()
    set config(config: boolean) {
        if(config) {
            this.displayedColumns.push('actions');
        }
    };

    displayedColumns: string[];

    tableColumns: TableColumn[] =[];

    constructor() { }

    ngOnInit(): void {
    }

    onEdit(row: any): void {
        this.action.emit({ action: TableAction.edit, row });
        console.log('emit - edit', row);
    };

    onDelete(row: any): void {
        this.action.emit({ action: TableAction.delete, row });
        console.log('emit - deelte', row);
    }
}
