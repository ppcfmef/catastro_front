import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
} from '@angular/core';
import { LandAnalisysUI } from '../../interfaces/land.interface';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActionsGapAnalisys } from 'app/shared/enums/actions-gap-analisys.enum';
import { TypePoint } from 'app/shared/enums/type-point.enum';
import { FormUtils } from 'app/shared/utils/form.utils';
import { loadModules } from 'esri-loader';
import { Predio } from 'app/modules/admin/lands/land-registry/interfaces/predio.interface';
import { PuntoCampoUI } from '../../interfaces/punto-campo.interface';
import { PredioUI } from '../../interfaces/predio.interface';
import { PredioService } from '../../services/predio.service';
import { PredioModel } from '../../models/predio.model';
import { PuntoCampoModel } from '../../models/punto-campo.model';
import { LoteUI } from '../../interfaces/lote.interface';
import { PuntoCampoService } from '../../services/punto-campo.service';
import { LandStatus } from 'app/shared/enums/land-status.enum';
import { LandGapAnalisysService } from '../../services/land-gap-analisys.service';
import { CustomConfirmationService } from 'app/shared/services/custom-confirmation.service';
import { Router } from '@angular/router';
import { TypeGapAnalisys } from 'app/shared/enums/type-gap-analisys.enum';
import { LandGeorreferencingStatusGapAnalisys } from 'app/shared/enums/land-georreferencing-status-gap-analisys.enum';
@Component({
    selector: 'app-land-detail-pre-georeferencing',
    templateUrl: './land-detail-pre-georeferencing.component.html',
    styleUrls: ['./land-detail-pre-georeferencing.component.scss'],
})
export class LandDetailPreGeoreferencingComponent implements OnInit, OnChanges {
    @Input() land: LandAnalisysUI;
    @Input() dataPoint: { point: any; type: string };
    @Output() asigLandEvent: EventEmitter<any> = new EventEmitter<any>();

    showAddres = true;
    formEdit: FormGroup;
    point: any;
    type: string;
    dialogRef = null;
    constructor(
        private fb: FormBuilder,
        private _predioService: PredioService,
        private _puntoCampoService: PuntoCampoService,
        private _landService: LandGapAnalisysService,
        private _confirmationService: CustomConfirmationService,
        private _router: Router
    ) {}

    ngOnInit(): void {
        console.log('land>>>', this.land);
        this.createFormEdit();
    }

    createFormEdit(): void {
        this.formEdit = this.fb.group({
            referenceName: [this.land?.referenceName],
        });
    }

    guardarPuntoSinReferencia(): void {
        this.dialogRef = this._confirmationService.info(
            'Guardar Sin referencia',
            'Esta seguro de guardar el punto sin referencia?'
        );

        this.dialogRef
            .afterClosed()
            .toPromise()
            .then((option) => {
                if (option === 'confirmed') {
                    this.land.status = LandGeorreferencingStatusGapAnalisys.OBSERVADO;
                    this.land = FormUtils.deleteKeysNullInObject(this.land);
                    this._landService.update(this.land.id, this.land).subscribe(
                        (resp) => {
                            this._confirmationService.success(
                                'Exito',
                                'punto guardado'
                            );
                        },
                        (error) => {
                            this._confirmationService.error(
                                'Error',
                                'Error al guardar el punto'
                            );
                        }
                    );
                }
            });
    }

    nuevoPuntoCampo(): void {
        if (!this.dataPoint) {
            this._confirmationService.info(
                'Alerta',
                'Por favor seleccione un punto de referencia'
            );
        } /*else if (
            this.dataPoint &&
            this.dataPoint.type !== TypePoint.NUEVO_PUNTO_CAMPO
        ) {
            this._confirmationService.info(
                'Alerta',
                'Por favor seleccione un punto de referencia'
            );
        }*/ else if (
            this.dataPoint
            //&& this.dataPoint.type === TypePoint.NUEVO_PUNTO_CAMPO
        ) {
            this.dialogRef = this._confirmationService.info(
                'Guardar',
                'Esta seguro de guardar el punto para trabajo de campo?'
            );

            this.dialogRef
                .afterClosed()
                .toPromise()
                .then((option) => {
                    if (option === 'confirmed') {
                        const puntoCampo = new PuntoCampoModel(
                            this.dataPoint.point
                        );
                        puntoCampo.COD_PRE = this.land.cpm;
                        puntoCampo.UBIGEO = this.land.ubigeo;
                        puntoCampo.REFEREN = this.land.referenceName;
                        this.land.longitude = puntoCampo.COORD_X;
                        this.land.latitude = puntoCampo.COORD_Y;
                        this.land.status = LandGeorreferencingStatusGapAnalisys.UBICADO_CON_PUNTO_CAMPO;
                        this.land = FormUtils.deleteKeysNullInObject(this.land);
                        this._puntoCampoService
                            .crearPuntoCampo([puntoCampo])
                            .then((result) => {
                                if (result) {
                                    this._landService
                                        .update(this.land.id, this.land)
                                        .subscribe(
                                            (resp) => {
                                                this._confirmationService.success(
                                                    'Exito',
                                                    'punto guardado'
                                                ).afterClosed().toPromise()
                                                .then(
                                                    (e) => {
                                                        this._router.navigate(
                                                            [
                                                                '/land-inspection/gap-analisys/landwithoutgeo',
                                                            ]
                                                        );
                                                    }
                                                );
                                            },
                                            (error) => {
                                                this._confirmationService.error(
                                                    'Error',
                                                    'Error al guardar el punto'
                                                );
                                            }
                                        );
                                }
                            });
                    }
                });
        }
    }

    asignarPredio(): void {
        if (!this.dataPoint) {
            this._confirmationService.info(
                'Alerta',
                'Por favor seleccione un punto '
            );
        } /*else if (
            this.dataPoint &&
            this.dataPoint.type !== TypePoint.LOTE
        ) {
            this._confirmationService.info(
                'Alerta',
                'Por favor seleccione un lote'
            );
        } */ else if (
            this.dataPoint
            //&& this.dataPoint.type === TypePoint.NUEVO_PUNTO_CAMPO
        ) {
            this.dialogRef = this._confirmationService.info(
                'Guardar',
                'Esta seguro de asignar el predio?'
            );

            this.dialogRef
                .afterClosed()
                .toPromise()
                .then((option) => {
                    if (option === 'confirmed') {
                        this._predioService
                            .generateMaxCPU(this.dataPoint.point)
                            .then((res) => {
                                const predio = new PredioModel(
                                    this.dataPoint.point
                                );

                                if (res && res.COD_CPU) {
                                    predio.UBIGEO = this.land.ubigeo;
                                    predio.COD_PRE = this.land.cpm;
                                    predio.COD_CPU = res.COD_CPU;
                                    predio.REFEREN = this.land.referenceName;
                                    this.land.cup = res.COD_CPU;
                                    this.land.longitude = predio.COORD_X;
                                    this.land.latitude = predio.COORD_Y;
                                    this.land.status =
                                        LandStatus.CON_CARTOGRAFIA_LOTE;
                                    this.land =
                                        FormUtils.deleteKeysNullInObject(
                                            this.land
                                        );
                                    this._predioService
                                        .crearPredio(predio)
                                        .then((result) => {
                                            this._landService
                                                .update(this.land.id, this.land)
                                                .subscribe(
                                                    (resp) => {
                                                        this._confirmationService
                                                            .success(
                                                                'Exito',
                                                                'punto guardado'
                                                            )
                                                            .afterClosed().toPromise()
                                                            .then(
                                                                (e) => {
                                                                    this._router.navigate(
                                                                        [
                                                                            '/land-inspection/gap-analisys/landwithoutgeo',
                                                                        ]
                                                                    );
                                                                }
                                                            );
                                                    },
                                                    (error) => {
                                                        this._confirmationService.error(
                                                            'Error',
                                                            'Error al guardar el punto'
                                                        );
                                                    }
                                                );
                                        });
                                }
                            });
                    }
                });
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes?.dataPoint) {
            this.dataPoint = changes?.dataPoint.currentValue;
            console.log('this.dataPoint>>', this.dataPoint);
        }
    }
}
