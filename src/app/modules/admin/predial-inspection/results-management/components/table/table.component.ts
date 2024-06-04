import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output
} from '@angular/core';
import {TableActions} from '../../../shared/interfaces/table-actions.interface';
import { MatPaginator } from '@angular/material/paginator';

@Component({selector: 'app-table-manageresult', templateUrl: './table.component.html', styleUrls: ['./table.component.scss']})
export class TableComponent implements OnInit {
    @Input() length: number=0;
    @Output()
    public action: EventEmitter < TableActions > = new EventEmitter();
    @Output() changePage: EventEmitter<MatPaginator> = new EventEmitter();
    @Output() refreshPage: EventEmitter<any> = new EventEmitter();
    dataSource;
    displayedColumns;
    pageIndex = 0;
    pageSize = 5;
    @Input()set dataTable(data: any) {
        this.dataSource = data;
    }

    @Input()set colums(data: any) {
        this.displayedColumns = data;
    }


    // eslint-disable-next-line @typescript-eslint/member-ordering
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
