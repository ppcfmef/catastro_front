import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TableActions } from '../../../shared/interfaces/table-actions.interface';

@Component({
  selector: 'app-table-manageresult',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

    @Output()
    public action: EventEmitter<TableActions> = new EventEmitter();

    dataSource;
    displayedColumns;

    @Input() set dataTable(data: any) {
        this.dataSource = data;
    }

    @Input() set colums(data: any) {
        this.displayedColumns = data;
    }
  constructor() { }

  ngOnInit(): void {
  }

  rowTicket(element: any): void {
    this.action.emit(element);
  }
}
