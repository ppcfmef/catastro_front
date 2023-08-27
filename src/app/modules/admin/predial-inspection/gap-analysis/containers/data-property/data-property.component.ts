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
    event: string = ActionsGapAnalisys.LEER;
    dataPoint: any;
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _landGapAnalisysService: LandGapAnalisysService
    ) {}

    ngOnInit(): void {
        this._activatedRoute.params.subscribe((params) => {
            this.idLand = params.id;

            if (this.idLand) {
                this._landGapAnalisysService
                    .get(this.idLand)
                    .subscribe((res) => {
                        this.land = res;
                        this.ubigeo = this.land.ubigeo;
                        if (this.land.statusGapAnalisys === 0) {
                            this.event = ActionsGapAnalisys.ASIGNAR_PUNTO;
                        } else {
                            this.event = ActionsGapAnalisys.LEER;
                        }
                        /*console.log('this.land>>>',this.land);*/
                    });
            }
        });
    }

    asigLandEvent(e: any): void {
        this.event = e;
    }

    setPoint(e: any): void {
        this.dataPoint = e;
    }
}
