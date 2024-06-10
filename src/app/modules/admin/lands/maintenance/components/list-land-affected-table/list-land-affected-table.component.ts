import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-list-land-affected-table',
    templateUrl: './list-land-affected-table.component.html',
    styleUrls: ['./list-land-affected-table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListLandAffectedTableComponent implements OnChanges {

    @Input() dataSource;

    displayedColumns: string[] = ['nro', 'cup', 'streetName', 'creationDate'];

    #unsubscribeAll: Subject<any> = new Subject<any>();

    constructor() {
    }
    ngOnChanges(changes: SimpleChanges): void {
        if (changes?.dataSource?.currentValue) {
            this.dataSource = changes.dataSource.currentValue;
        };
    }

}
