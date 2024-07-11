import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TableSynchronizationsProcessedComponent } from '../table-synchronizations-processed/table-synchronizations-processed.component';
import { stat } from 'fs';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, Subject, switchMap, takeUntil, filter, distinctUntilChanged } from 'rxjs';
import { debounce } from 'lodash';
import { FiltersComponent } from '../filters/filters.component';

@Component({
    selector: 'app-synchronized-records-container',
    standalone: true,
    imports: [
        CommonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        TextFieldModule,
        MatButtonModule,
        ReactiveFormsModule,
        TableSynchronizationsProcessedComponent,
        FiltersComponent,
        ],
    templateUrl: './synchronized-records-container.component.html',
    styleUrls: ['./synchronized-records-container.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SynchronizedRecordsContainerComponent implements OnInit {

    tableSinchronizationsProcessed  = [
        {
            codigoDeclaracionJurada: '123456789',
            codigoPredio: '73042128-0001-1',
            codigoContribuyente: '0854',
            falloDescripcion: 'Fallo de conexción',
            secuenciaEjecutora: 'Tarapoto',
            fecha: '17/18/2024 23:18:02',
            estado: 'Sincronizado'
        },
        {
            codigoDeclaracionJurada: '123457444',
            codigoPredio: '73042128-0005-1',
            codigoContribuyente: '0853',
            falloDescripcion: 'Fallo de conexción Fallo de conexción Fallo de conexción Fallo de conexción Fallo de conexción Fallo de conexción',
            secuenciaEjecutora: 'Tarapoto',
            fecha: '17/18/2024 23:17:04',
            estado: 'Sincronizado'
        },
        {
            codigoDeclaracionJurada: '17457444',
            codigoPredio: '73042128-0705-1',
            codigoContribuyente: '8853',
            falloDescripcion: 'Fallo de conexción',
            secuenciaEjecutora: 'Tarapoto',
            fecha: '17/18/2024 23:17:03',
            estado: 'Sincronizado'
        },
        {
            codigoDeclaracionJurada: '17457444',
            codigoPredio: '73042728-0705-1',
            codigoContribuyente: '8853',
            falloDescripcion: 'Fallo de conexción',
            secuenciaEjecutora: 'Tarapoto',
            fecha: '17/18/2024 23:17:02',
            estado: 'No Sincronizado'
        },
        {
            codigoDeclaracionJurada: '123456789',
            codigoPredio: '73042128-0001-1',
            codigoContribuyente: '0854',
            falloDescripcion: 'Fallo de conexción',
            secuenciaEjecutora: 'Tarapoto',
            fecha: '17/18/2024 12:17:02',
            estado: 'Sincronizado'
        },
        {
            codigoDeclaracionJurada: '123457444',
            codigoPredio: '73042128-0005-1',
            codigoContribuyente: '0853',
            falloDescripcion: 'Fallo de conexción',
            secuenciaEjecutora: 'Tarapoto',
            fecha: '17/18/2024 23:15:02',
            estado: 'Sincronizado'
        },
        {
            codigoDeclaracionJurada: '17457444',
            codigoPredio: '73042128-0705-1',
            codigoContribuyente: '8853',
            falloDescripcion: 'Fallo de conexción',
            secuenciaEjecutora: 'Tarapoto',
            fecha: '17/18/2024 23:15:02',
            estado: 'Sincronizado'
        },
        {
            codigoDeclaracionJurada: '17457444',
            codigoPredio: '73042728-0705-1',
            codigoContribuyente: '8853',
            falloDescripcion: 'Fallo de conexción',
            secuenciaEjecutora: 'Tarapoto',
            fecha: '17/18/2024 22:15:02',
            estado: 'No Sincronizado'
        },
        {
            codigoDeclaracionJurada: '123456789',
            codigoPredio: '73042128-0001-1',
            codigoContribuyente: '0854',
            falloDescripcion: 'Fallo de conexción',
            secuenciaEjecutora: 'Tarapoto',
            fecha: '17/18/2024 12:15:02',
            estado: 'Sincronizado'
        },
        {
            codigoDeclaracionJurada: '123457444',
            codigoPredio: '73042128-0005-1',
            codigoContribuyente: '0853',
            falloDescripcion: 'Fallo de conexción',
            secuenciaEjecutora: 'Tarapoto',
            fecha: '17/18/2024',
            estado: 'Sincronizado'
        },
        {
            codigoDeclaracionJurada: '17457444',
            codigoPredio: '73042128-0705-1',
            codigoContribuyente: '8853',
            falloDescripcion: 'Fallo de conexción',
            secuenciaEjecutora: 'Tarapoto',
            fecha: '17/18/2024',
            estado: 'Sincronizado'
        },
        {
            codigoDeclaracionJurada: '17457444',
            codigoPredio: '73042728-0705-1',
            codigoContribuyente: '8853',
            falloDescripcion: 'Fallo de conexción',
            secuenciaEjecutora: 'Tarapoto',
            fecha: '17/18/2024',
            estado: 'No Sincronizado'
        },
    ];

    isLoading: boolean = false;
    filtersForm: FormGroup;
    #changeDetectorRef = inject(ChangeDetectorRef);

    private unsubscribeAll: Subject<any> = new Subject<any>();

    constructor() {}
    ngOnInit(): void {
        this.filtersForm = new FormGroup({
            search: new FormControl(''),
            status: new FormControl(''),
        });

        this.filtersForm.get('search').valueChanges
            .pipe(
                    debounceTime(300),
                    takeUntil(this.unsubscribeAll),
                    distinctUntilChanged()
                )
            .subscribe(() => {
                this.filterTable();
            });
    }


    filterTable(): void {
        const filters = this.filtersForm.getRawValue();
        this.isLoading = true;
        this.#changeDetectorRef.markForCheck();

        setTimeout(() => {
            const respFilter =
                this.tableSinchronizationsProcessed.filter(row => String(row.codigoContribuyente).includes(filters.search));
                this.isLoading = false;
                this.tableSinchronizationsProcessed = respFilter;
                this.#changeDetectorRef.markForCheck();
        },1000);
    }
}
