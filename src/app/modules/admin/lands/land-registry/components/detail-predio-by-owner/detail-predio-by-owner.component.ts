import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { LandOwnerDetail } from '../../interfaces/land-owner-detail.interface';
import {MatTableModule} from '@angular/material/table';
import moment from 'moment';
import { FuseScrollbarModule } from '@fuse/directives/scrollbar';
@Component({
    selector: 'app-detail-predio-by-owner',
    standalone: true,
    imports: [
        CommonModule,
        MatTableModule,
        FuseScrollbarModule,
    ],
    templateUrl: './detail-predio-by-owner.component.html',
    styleUrls: ['./detail-predio-by-owner.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailPredioByOwnerComponent implements OnInit, OnChanges{

    @Input() detailLand: LandOwnerDetail;
    @Input() displayedColumns: string[];

    constructor() {
    }
    ngOnChanges(changes: SimpleChanges): void {

    }
    ngOnInit(): void {
        console.log(this.detailLand, 'this.detailLand');
        console.log(this.displayedColumns, 'this.displayedColumns');
    }


}
