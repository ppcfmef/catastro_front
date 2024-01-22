import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output
} from '@angular/core';
import {TableActions} from '../../../shared/interfaces/table-actions.interface';
import { MatLegacyPaginator as MatPaginator } from '@angular/material/legacy-paginator';

@Component({selector: 'app-table-manageresult', templateUrl: './table.component.html', styleUrls: ['./table.component.scss']})
export class TableComponent implements OnInit {
    @Input()pageIndex = 0;
    @Input()pageSize = 5;
    @Input() length: number=0;
    @Output()
    public action: EventEmitter < TableActions > = new EventEmitter();
    @Output() changePage: EventEmitter<MatPaginator> = new EventEmitter();
    @Output() refreshPage: EventEmitter<any> = new EventEmitter();
    dataSource;
    displayedColumns;
    pageSizeOptions = [1, 5, 10, 25, 50, 100, 250, 500];
    @Input()set dataTable(data: any) {
        this.dataSource = data;
    }

    @Input()set colums(data: any) {
        this.displayedColumns = data;
    }


    constructor() {}

    ngOnInit(): void {}

    rowTicket(element: any): void {
        this.action.emit(element);
    }

    onPage(paginator: MatPaginator): void {
        this.pageIndex = paginator.pageIndex;
        this.changePage.emit(paginator);
      }
      onRefreshPage(): void {
        this.refreshPage.emit();
      }
}
