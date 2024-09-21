import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { CommonModule, JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Output, TemplateRef, ViewChild, ViewContainerRef, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormUtils } from 'app/shared/utils/form.utils';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-filters',
    standalone: true,
    imports: [
        CommonModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        MatSelectModule,
        MatFormFieldModule,
        MatDatepickerModule,
        FormsModule,
        ReactiveFormsModule,
        JsonPipe
    ],
    templateUrl: './filters.component.html',
    styleUrls: ['./filters.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersComponent {

    @Output() filters: EventEmitter<any> = new EventEmitter<any>();
    @ViewChild('filtersOrigin') private _filtersOrigin: MatButton;
    @ViewChild('filtersPanel') private _filtersPanel: TemplateRef<any>;

    range = new FormGroup({
        start: new FormControl<Date | null>(null),
        end: new FormControl<Date | null>(null),
        status: new FormControl(''),
        municipalidadId: new FormControl(''),
      });

    private _unsubscribeAll: Subject<any> = new Subject<any>();
    private _overlayRef: OverlayRef;

    //inject dependencies
    private _changeDetectorRef = inject(ChangeDetectorRef);
    private _overlay = inject(Overlay);
    private _viewContainerRef = inject(ViewContainerRef);


    openFilters(): void {
         // Return if the shortcuts panel or its origin is not defined
         if ( !this._filtersPanel || !this._filtersOrigin ) {
            return;
         }


            // Create the overlay if it doesn't exist
            if ( !this._overlayRef )
            {
                this._createOverlay();
            }
            // Attach the portal to the overlay
            this._overlayRef.attach(new TemplatePortal(this._filtersPanel, this._viewContainerRef));
    }

    clearFilters(): void {
        this._overlayRef.detach();
        this.range.reset({
            start: null,
            end: null,
            status: '',
            municipalidadId: ''
        });

        this.filters.emit(FormUtils.deleteKeysNullInObject(this.range.getRawValue()));
    }

    applyFilters(): void {
        const filters = this.range.getRawValue();
        this.filters.emit(filters);
        this._overlayRef.detach();
    }

    private _createOverlay(): void
    {
        // Create the overlay
        this._overlayRef = this._overlay.create({
            hasBackdrop     : true,
            backdropClass   : '',
            scrollStrategy  : this._overlay.scrollStrategies.block(),
            positionStrategy: this._overlay.position()
                .flexibleConnectedTo(this._filtersOrigin._elementRef.nativeElement)
                .withLockedPosition(true)
                .withPush(true)
                .withPositions([
                    {
                        originX : 'start',
                        originY : 'bottom',
                        overlayX: 'start',
                        overlayY: 'top',
                    },
                    {
                        originX : 'start',
                        originY : 'top',
                        overlayX: 'start',
                        overlayY: 'bottom',
                    },
                    {
                        originX : 'end',
                        originY : 'bottom',
                        overlayX: 'end',
                        overlayY: 'top',
                    },
                    {
                        originX : 'end',
                        originY : 'top',
                        overlayX: 'end',
                        overlayY: 'bottom',
                    },
                ]),
        });

        // Detach the overlay from the portal on backdrop click
        this._overlayRef.backdropClick().subscribe(() =>
        {
            this._overlayRef.detach();
        });
    }

}

