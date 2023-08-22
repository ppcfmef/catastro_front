import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TableActions } from '../../interfaces/table-actions.interface';
import { TableConifg } from '../../interfaces/table-config.interface';
import { TableColumn } from '../../interfaces/table-columns.interface';
import { SelectionModel } from '@angular/cdk/collections';
import { TableAction } from '../../enum/table-action.enum';




@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
    @Output()
    public action: EventEmitter<TableActions> = new EventEmitter();

    @Output()
    public selected: EventEmitter<any> = new EventEmitter();

    @Input() dataSource: [];

    tableConfig: TableConifg = {
        isAction: false,
        isEdit: false,
        isZoom: false,
        isDeleted: false,
        isSelect: false,
    };

    @Input()
    set columns(colums: TableColumn[]) {
        this.tableColumns = colums;
        this.displayedColumns = this.tableColumns.map(col => col.matcolumndef);
    }

    @Input()
    set config(config: TableConifg) {
        this.tableConfig = config;
        if (this.tableConfig.isAction) {
            this.displayedColumns.push('actions');
        }
        if (this.tableConfig.isSelect) {
            this.displayedColumns.push('select');
        }
    }

    displayedColumns: string[];

    tableColumns: TableColumn[] = [];

    selection = new SelectionModel<any>(true, []);

    constructor() { }

    ngOnInit(): void { }

    onSelect(): void {
        this.selected.emit(this.selection.selected);
    }

    onEdit(row: any): void {
        this.action.emit({ action: TableAction.edit, row });
        console.log('emit - edit', row);
    }

    onDelete(row: any): void {
        this.action.emit({ action: TableAction.delete, row });
        console.log('emit - deelte', row);
    }

    onZoom(row: any): void {
        this.action.emit({ action: TableAction.zoom, row });
        console.log('emit - zoom', row);
    }

    isAllSelected(): boolean {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.length;
        return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    toggleAllRows() {
        if (this.isAllSelected()) {
            this.selection.clear();
            this.onSelect();
            return;
        }

        this.selection.select(...this.dataSource);
        this.onSelect();
    }

    /** The label for the checkbox on the passed row */
    checkboxLabel(row?: any): string {
        if (!row) {
            return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
        }
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1
            }`;
    }
}
