import { Component, OnInit } from '@angular/core';
import { District } from 'app/core/common/interfaces/common.interface';
import { CommonService } from 'app/core/common/services/common.service';
import { DistrictService } from '../../services/district.service';
import { UserService } from 'app/core/user/user.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { User } from 'app/core/user/user.types';
import { LandGapAnalisysService } from '../../services/land-gap-analisys.service';
import { TypeGapAnalisys } from 'app/shared/enums/type-gap-analisys.enum';
import { ManzanaPrediosSubvaluadosService } from '../../services/manzana-sub-valuado.service';

@Component({
    selector: 'app-gap-list',
    templateUrl: './gap-list.component.html',
    styleUrls: ['./gap-list.component.scss'],
})
export class GapListComponent implements OnInit {
    cards = [
        {
            type: TypeGapAnalisys.PUNTOS_LOTE_SIN_PREDIO,
            title: 'PUNTOS LOTES SIN PREDIOS',
            numb: '120',
            color: '#DE3F43',
            path: './points-without-land',
        },
        {
            type: TypeGapAnalisys.PREDIO_SIN_GEORREFERENCIACION,
            title: 'PREDIOS SIN GEOREFERENCIACION',
            numb: '284',
            color: '#0090F8',
            path: './geo',
        },
        {
            type: TypeGapAnalisys.PREDIO_SUBVALUADO,
            title: 'PREDIOS SUBVALUADOS',
            numb: '0',
            color: '#66BB6A',
            path: './sub-land',
        },
        {
            type: null,
            title: 'MANZANAS SIN LOTES',
            numb: '180',
            color: '#F89500',
            path: './apple-without-batch',
        },
        {
            type: null,
            title: 'PUNTOS EN IMAGEN',
            numb: '110',
            color: '#0090F8',
            path: './imagen',
        },
        {
            type: null,
            title: 'MANZANAS ACTUALIZACION',
            numb: '5',
            color: '#1E293B',
            path: './growth-apple',
        },
    ];

    ubigeo = '040703';
    districts: District[] = [];
    search: string;
    defaultTableLimit: number = 5;
    district: any;
    _unsubscribeAll: Subject<any> = new Subject<any>();
    user: User;
    constructor(
        private _userService: UserService,
        private _districtService: DistrictService,
        private _landGapAnalisysService: LandGapAnalisysService,
        private _manzanaPrediosSubvaluadosService: ManzanaPrediosSubvaluadosService,
    ) {}

    ngOnInit(): void {
        this._userService.user$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((user: User) => {
                this.user = user;
                this.ubigeo =
                    this.user && this.user.ubigeo
                        ? this.user.ubigeo
                        : this.ubigeo;
                this.updateUbigeoCards(this.ubigeo);
            });
    }
    searchDistrict(event: any): void {
        const search = event.target.value;
        if (search && search !== '' && search.length > 3) {
            const params = { search, limit: this.defaultTableLimit };
            this._districtService.getList(params).subscribe((res) => {
                this.districts = res.results;
            });
        } else {
            this.districts = [];
        }
    }

    async updateUbigeoCards(ubigeo: string): Promise<void> {
        console.log('ubigeo>>>',ubigeo);
        const params = { search: ubigeo, limit: this.defaultTableLimit };
        this._districtService.getList(params).subscribe((res)=>{
            console.log(res);
            this.districts = res.results;
            if (this.districts && this.districts.length > 0) {
                this.district = this.districts[0];
                this.cards.forEach(async (c) => {
                    if(c.type === TypeGapAnalisys.PREDIO_SIN_GEORREFERENCIACION){
                        const total = await this.getTotalPrediosSinGeorreferrencia(
                            ubigeo
                        );
                        console.log('total>>', total);
                        c.numb = String(total);
                    }
                    if(c.type === TypeGapAnalisys.PREDIO_SUBVALUADO){
                        const total = await this._manzanaPrediosSubvaluadosService.getTotalSubvaluados({ubigeo:ubigeo});
                        c.numb = String(total);
                    }

                    c.path = `${c.path}/${ubigeo}`;
                });
            }
        });

    }

    async getTotalPrediosSinGeorreferrencia(ubigeo: string): Promise<number> {
        let s = 0;

        const queryParams = { ubigeo };
        const results = await this._landGapAnalisysService.geStadistictsStatus(
            queryParams
        ).toPromise();
        results.forEach((rs) => {
            s = s + (rs.count ? rs.count : 0);
            console.log('s>>',s);
        });
        return s;
    }


    onSelect(event: any): void {
        this.district = event.option.value;
        this.ubigeo = this.district.code;
        this.updateUbigeoCards(this.ubigeo);
    }

    displayFn(option: any): string {
        return `${option.departmentName} - ${option.provinceName} - ${option.districtName}`;
    }
}
