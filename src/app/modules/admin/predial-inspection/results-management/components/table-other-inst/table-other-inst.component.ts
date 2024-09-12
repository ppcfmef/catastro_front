import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { FuseScrollbarModule } from '@fuse/directives/scrollbar';

@Component({
    selector: 'table-other-inst',
    standalone: true,
    imports: [
        CommonModule,
        FuseScrollbarModule,
        MatTableModule,
    ],
    templateUrl: './table-other-inst.component.html',
    styleUrls: ['./table-other-inst.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableOtherInstComponent {

    @Input() dataSource: any[] = [];
    displayedColumns: string[] = ['#', 'numPiso', 'tipObraComplementariaNombre','tipMaterialNombre', 'estConservacionNombre','anioConstruccion','categoria',
        'cantidad', 'metroRedondeado', 'totalMetrado'];
}
