import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { LandOwnerDetail } from '../../interfaces/land-owner-detail.interface';
import {MatTableModule} from '@angular/material/table';
@Component({
    selector: 'app-detail-predio-by-owner',
    standalone: true,
    imports: [
        CommonModule,
        MatTableModule,
    ],
    templateUrl: './detail-predio-by-owner.component.html',
    styleUrls: ['./detail-predio-by-owner.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailPredioByOwnerComponent implements OnInit{

    @Input() detailLand: LandOwnerDetail;
    displayedColumns: string[] = ['#', 'tNivel', 'aConstrucc', 'piso', 'eConstruc', 'muros', 'aConstruida', 'aComun'];
    constructor() {}
    ngOnInit(): void {
        // console.log(this.detailLand, 'this.detailLand');
    }



}
