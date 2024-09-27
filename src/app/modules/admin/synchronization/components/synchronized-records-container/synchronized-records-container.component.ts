/* eslint-disable @typescript-eslint/naming-convention */
import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    inject,
    OnInit,
    Output,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TableSynchronizationsProcessedComponent } from '../table-synchronizations-processed/table-synchronizations-processed.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
    debounceTime,
    Subject,
    switchMap,
    takeUntil,
    filter,
    distinctUntilChanged,
    of,
    Observable,
    tap,
    catchError,
} from 'rxjs';
import { FiltersComponent } from '../filters/filters.component';
import { SynchronizationDjService } from '../../services/synchronization-dj.service';
import { DJ, DJResponse } from '../../interfaces/dj.interface';
import { FormUtils } from 'app/shared/utils/form.utils';
import moment from 'moment';
import { Console } from 'console';
import { CustomConfirmationService } from 'app/shared/services/custom-confirmation.service';
import { SearchByLandPage } from '../../../lands/land-registry/pages/search-by-land/search-by-land.page';
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
    @Output() resetPage$: EventEmitter<any> = new EventEmitter<any>();
    tableSinchronizationsProcessed: Observable<DJ[]> = of([]);
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

        this.filtersForm
            .get('search')
            .valueChanges.pipe(
                debounceTime(300),
                takeUntil(this.unsubscribeAll),
                distinctUntilChanged(),
                tap(() => (this.isLoading = true))
            )
            .subscribe((value) => {
                this.params['contribuyenteNumero'] = value;
                this.resetPage();
                this.getDJ(this.params);
            });
    }

    paginatorChange(event: any): void {
        this.params['pageSize'] = event.pageSize;
        this.params['page'] = event.pageIndex;
        this.getDJ(this.params);
    }

    filterOptions(options: any): void {
        this.resetPage();
        this.params['procesado'] = options.status ?? '';
        this.params['municipalidadId'] = options.municipalidadId ?? '';
        this.params['fechaInicio'] = options?.start?.format('DD/MM/YYYY') ?? '';
        this.params['fechaFin'] =
            options?.end?.format('DD/MM/YYYY') ?? moment().format('DD/MM/YYYY');

        const filters = FormUtils.deleteKeysNullInObject(this.params);
        this.isLoading = true;
        this.getDJ(filters);
    }

    getDJ(params): void {
        this.synchronizationDjService
            .synchronizationAll(params)
            .pipe(
                tap(() => (this.isLoading = false)),
                takeUntil(this.unsubscribeAll)
            )
            .subscribe((response) => {
                this.length = response.pageable.totalElements;
                this.tableSinchronizationsProcessed = of(response.data);
                this.isLoading = false;
                this.#changeDetectorRef.detectChanges();
            });
    }
    sinchronizationsOne(row): void {
        const params = {
            log_integracion_id: row.logIntegracionId,
            contribuyente_numero: row.contribuyenteNumero,
            dj_predial_numero: row.djPredialNumero,
        };

        this.handleSynchronization(this.synchronizationDjService
            .synchronizationIndividual(params), 'Se sincronizo correctamente', 'Error al sincronizar DJ, intente nuevamente');
    }

    sinchronizeMasive(): void {
        this.isLoading = true;
        this.handleSynchronization(this.synchronizationDjService
            .synchronizationMassive(), 'Se sincronizo correctamente', 'Error al sincronizar DJ, intente nuevamente');
    }

    private handleSynchronization(
        observable: Observable<any>,
        successMessage: string,
        errorMessage: string
    ): void {
        this.isLoading = true;

        observable
            .pipe(
                takeUntil(this.unsubscribeAll),
                catchError((error) => {
                    this.isLoading = false;
                    this.#changeDetectorRef.detectChanges();
                    this.confirmationService.errorInfo(
                        'Error en el Servicio',
                        errorMessage
                    );
                    return of(null);
                })
            )
            .subscribe((response) => {
                this.isLoading = false;
                this.#changeDetectorRef.detectChanges();
                if (response) {
                    const dialogRef = this.confirmationService.success(
                        'Sincronización',
                        successMessage
                    );
                    dialogRef
                        .afterClosed()
                        .subscribe(() => this.getDJ(this.params));
                }
            });
    }

    private resetPage(): void {
        this.params['pageSize']=10;
        this.params['page']=1;

        const params = {
            pageSize: 10,
            pageIndex: 0,
        };

        this.synchronizationDjService.params$.next(params);
    }
}
