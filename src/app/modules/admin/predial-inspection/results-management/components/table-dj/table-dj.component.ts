import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { FuseScrollbarModule } from '@fuse/directives/scrollbar';

@Component({
    selector: 'table-dj',
    standalone: true,
    imports: [
        CommonModule,
        FuseScrollbarModule,
        MatTableModule
    ],
    templateUrl: './table-dj.component.html',
    styleUrls: ['./table-dj.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableDjComponent {

    @Input() dataSource: any[] = [];
    displayedColumns: string[] = ['#', 'tNivel', 'aConstrucc','npiso', 'tmatpred','eConsv','muros','techos', 'piso', 'puertas',
        'revestimiento', 'bano', 'instSanitarias', 'aConstruida'];
}


