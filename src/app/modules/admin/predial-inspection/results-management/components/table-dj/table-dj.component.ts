import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { FuseScrollbarModule } from '@fuse/directives/scrollbar';

@Component({
    selector: 'app-table-dj',
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
    displayedColumns: string[] = ['#', 'tNivel','tmatpred', 'eConsv','aConstrucc','muros','techos', 'piso', 'puertas',
        'revestimiento', 'bano', 'instSanitarias', 'aConstruida'];


    dataSource: any[] = [
            // eslint-disable-next-line max-len
            { tNivel: '1', tmatpred: 'Ladrillo', eConsv: 'Buena',aConstrucc: '2020',muros: 'Ladrillo',techos: 'Concreto',  piso: 'P1', puertas: 'Madera',revestimiento:'ladrillo', bano:'ladrillo', instSanitarias:'ladrillo', aConstruida: '100m2'},
            { tNivel: '2', tmatpred: 'Ladrillo', eConsv: 'Buena',aConstrucc: '2020',muros: 'Ladrillo',techos: 'Concreto',  piso: 'P1', puertas: 'Madera',revestimiento:'ladrillo', bano:'ladrillo', instSanitarias:'ladrillo', aConstruida: '100m2'},

            // eslint-disable-next-line max-len
            // eslint-disable-next-line max-len
            // Agrega más objetos si necesitas más filas
          ];
}
