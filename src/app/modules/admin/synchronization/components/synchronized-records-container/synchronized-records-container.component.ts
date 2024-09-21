/* eslint-disable @typescript-eslint/naming-convention */
import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TableSynchronizationsProcessedComponent } from '../table-synchronizations-processed/table-synchronizations-processed.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, Subject, switchMap, takeUntil, filter, distinctUntilChanged, of, Observable, tap, catchError } from 'rxjs';
import { FiltersComponent } from '../filters/filters.component';
import { SynchronizationDjService } from '../../services/synchronization-dj.service';
import { DJ, DJResponse } from '../../interfaces/dj.interface';
import { FormUtils } from 'app/shared/utils/form.utils';
import moment from 'moment';
import { Console } from 'console';
import { CustomConfirmationService } from 'app/shared/services/custom-confirmation.service';
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

    tableSinchronizationsProcessed: Observable<DJ[]> = of([]) ;
    length: number = 0;
    isLoading: boolean = false;
    params: any;
    filtersForm: FormGroup;
    #changeDetectorRef = inject(ChangeDetectorRef);
    synchronizationDjService = inject(SynchronizationDjService);
    private unsubscribeAll: Subject<any> = new Subject<any>();
    private confirmationService = inject(CustomConfirmationService);
    constructor() {}
    ngOnInit(): void {
        this.filtersForm = new FormGroup({
            search: new FormControl(''),
        });

        this.params = {
            pageSize: 10,
            page: 1,
        };

        this.getDJ(this.params);

        this.filtersForm.get('search').valueChanges
            .pipe(
                    debounceTime(300),
                    takeUntil(this.unsubscribeAll),
                    distinctUntilChanged(),
                    tap(()=> this.isLoading = true)
                )
            .subscribe((value) => {
                this.params['contribuyenteNumero'] = value;
                this.getDJ(this.params);
            });
    }

    paginatorChange(event: any): void {
        this.params['pageSize'] = event.pageSize;
        this.params['page'] = event.pageIndex;
        this.getDJ(this.params);
    }

    filterOptions(options: any): void {
        this.params['procesado'] = options.status ?? '';
        this.params['municipalidadId'] = options.municipalidadId ?? '';
        this.params['fechaInicio'] = options?.start?.format('DD/MM/YYYY') ?? '';
        this.params['fechaFin'] = options?.end?.format('DD/MM/YYYY') ?? moment().format('DD/MM/YYYY');

        const filters = FormUtils.deleteKeysNullInObject(this.params);
        this.isLoading = true;
        this.getDJ(filters);

    }

    getDJ(params): void {
        this.synchronizationDjService.synchronizationAll(params).pipe(
            tap(() => this.isLoading = false),
            takeUntil(this.unsubscribeAll)
        ).subscribe((response)=> {
            this.length = response.pageable.totalElements;
            this.tableSinchronizationsProcessed = of(response.data);
            this.#changeDetectorRef.detectChanges();
            this.isLoading = false;
        });
    }
    sinchronizationsOne(row): void {
        console.log(row, 'row');
        const params = {
            movimiento_id: row.logIntegracionId,
            contribuyente_numero: row.contribuyenteNumero,
            dj_predial_numero: row.djPredialNumero,
        };
        this.synchronizationDjService.synchronizationIndividual(params).pipe(
            takeUntil(this.unsubscribeAll),
            catchError((error) => {
                console.log(error, 'error');
                this.confirmationService.errorInfo(
                    'Error en el Servicio',
                    'Error al sincronizar DJ, intente nuevamente'
                );
                return of(null);
            })
        ).subscribe((response) => {
            if (response) {
                const dialogRef = this.confirmationService.success(
                    'Sincronización',
                    'Se sincronizo correctamente'
                );
                dialogRef.afterClosed().subscribe(() => this.getDJ(this.params));
            }
        });
    }

    sinchronizeMasive(): void {
        this.synchronizationDjService.synchronizationMassive()
            .pipe(
                takeUntil(this.unsubscribeAll),
                catchError((error) => {
                    console.log(error, 'error');
                    this.confirmationService.errorInfo(
                        'Error en el Servicio',
                        'Error al sincronizar, intente nuevamente'
                    );
                    return of(null);
                })
            ).subscribe((response) => {
                if (response) {
                    const dialogRef = this.confirmationService.success(
                        'Sincronización',
                        'Se sincronizo correctamente'
                    );
                    dialogRef.afterClosed().subscribe(() => this.getDJ(this.params));
                }
            });
    }
}
