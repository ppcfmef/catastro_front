import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LandGapAnalisysService } from '../../services/land-gap-analisys.service';
import { LandAnalisysUI } from '../../interfaces/land.interface';
import { ActionsGapAnalisys } from 'app/shared/enums/actions-gap-analisys.enum';

@Component({
    selector: 'app-data-property',
    templateUrl: './data-property.component.html',
    styleUrls: ['./data-property.component.scss'],
})
export class DataPropertyComponent implements OnInit {
    ubigeo = '040703';
    idLand: any;
    land: LandAnalisysUI;
    estado: string = ActionsGapAnalisys.LEER;

    dataPoint: any;
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _landGapAnalisysService: LandGapAnalisysService
    ) {}

    ngOnInit(): void {
        this.idLand = localStorage.getItem('idLand');
        console.log('this.idLand>>',this.idLand);
        if (this.idLand) {
            this._landGapAnalisysService
                .get(this.idLand)
                .subscribe((res) => {
                    this.land = res;
                    this.ubigeo = this.land.ubigeo;
                    if (this.land.statusGapAnalisys === 0) {
                        this.estado = ActionsGapAnalisys.ASIGNAR_PUNTO;
                    } else {
                        this.estado = ActionsGapAnalisys.LEER;
                    }

                });
        }

        //localStorage.setItem('idLand',this.ubigeo);

        /*this._activatedRoute.params.subscribe((params) => {
            this.idLand = params.id;

            if (this.idLand) {
                this._landGapAnalisysService
                    .get(this.idLand)
                    .subscribe((res) => {
                        this.land = res;
                        this.ubigeo = this.land.ubigeo;
                        if (this.land.statusGapAnalisys === 0) {
                            this.estado = ActionsGapAnalisys.ASIGNAR_PUNTO;
                        } else {
                            this.estado = ActionsGapAnalisys.LEER;
                        }

                    });
            }
        });*/
    }

    asigLandEvent(e: any): void {
        this.estado = e;
    }

    setPoint(e: any): void {
        this.dataPoint = e;
    }
}
