import { Component, OnDestroy, OnInit } from '@angular/core';
import { District } from 'app/core/common/interfaces/common.interface';
import { CommonService } from 'app/core/common/services/common.service';
import { DistrictService } from '../../services/district.service';
import { UserService } from 'app/core/user/user.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { User } from 'app/core/user/user.types';
import { LandGapAnalisysService } from '../../services/land-gap-analisys.service';
import { TypeGap } from 'app/shared/enums/type-gap.enum';
import { ManzanaPrediosSubvaluadosService } from '../../services/manzana-sub-valuado.service';
import { ManzanaLotesSinPredioService } from '../../services/lotes-sin-predio.service';
import { ManzanaSinLoteService } from '../../services/manzana-sin-lote.service';
import { ManzanaPuntoImagenService } from '../../services/manzana-imagen.service';
import { ManzanaCrecimientoService } from '../../services/manzana-crecimiento.service';
import {NgxSpinnerService} from 'ngx-spinner';
import { FuseSplashScreenService } from '@fuse/services/splash-screen';
@Component({
    selector: 'app-gap-list',
    templateUrl: './gap-list.component.html',
    styleUrls: ['./gap-list.component.scss'],
})
export class GapListComponent implements OnInit , OnDestroy{
    ubigeo = '040703';
    cards = [
        {
            type: TypeGap.PUNTOS_LOTE_SIN_PREDIO,
            title: 'PUNTOS LOTES SIN PREDIOS',
            numb: '120',
            color: '#DE3F43',
            pathBase: './points-without-land',
            path: `./points-without-land/${this.ubigeo}`,
        },
        {
            type: TypeGap.PREDIO_SIN_GEORREFERENCIACION,
            title: 'PREDIOS SIN GEOREFERENCIACION',
            numb: '284',
            color: '#0090F8',
            pathBase: './geo',
            path: `./geo/${this.ubigeo}`,
        },
        {
            type: TypeGap.PREDIO_SUBVALUADO,
            title: 'PREDIOS PARA VERIFICACION',
            numb: '0',
            color: '#66BB6A',
            pathBase:'./sub-land',
            path: `./sub-land/${this.ubigeo}`,
        },
        {
            type: TypeGap.MANZANA_SIN_LOTES,
            title: 'MANZANAS SIN LOTES',
            numb: '180',
            color: '#F89500',
            pathBase:'./without-batch',
            path: `./without-batch/${this.ubigeo}`,
        },
        {
            type: TypeGap.PUNTO_IMAGEN,
            title: 'PUNTOS EN IMAGEN',
            numb: '110',
            color: '#0090F8',
            pathBase:'./imagen',
            path: `./imagen/${this.ubigeo}`,
        },
        {
            type: TypeGap.ACTUALIZACION_CARTOGRAFICA,
            title: 'MANZANAS ACTUALIZACION',
            numb: '5',
            color: '#1E293B',
            pathBase:'./growing-block',
            path: `./growing-block/${this.ubigeo}`,
        },
    ];

    idView='gapana';
    districts: District[] = [];
    search: string;
    defaultTableLimit: number = 5;
    district: any;
    _unsubscribeAll: Subject<any> = new Subject<any>();
    user: User;
    loadData: boolean = false;
    _emailUserAdmin='jcramireztello@gmail.com';
    isAdmin = true;
    constructor(
        private _userService: UserService,
        private _districtService: DistrictService,
        private _landGapAnalisysService: LandGapAnalisysService,
        private _manzanaPrediosSubvaluadosService: ManzanaPrediosSubvaluadosService,
        private _manzanaLotesSinPredioService: ManzanaLotesSinPredioService,
        private _manzanaSinLoteService: ManzanaSinLoteService,
        private _manzanaPuntoImagenService: ManzanaPuntoImagenService,
        private _manzanaCrecimientoService: ManzanaCrecimientoService,
        private _ngxSpinner: NgxSpinnerService,

        protected _fuseSplashScreenService: FuseSplashScreenService,
    ) {}
    ngOnDestroy(): void {
        console.log('destroy');
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    ngOnInit(): void {

        this._userService.user$
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((user: User) => {
            this.user = user;


            const permissionsNavigation: any[]=this.user?.permissionsNavigation;
            console.log('permissionsNavigation>>',permissionsNavigation);
            const readAll = permissionsNavigation.filter((p: any)=>(p?.navigationView===this.idView && p?.type==='read_all'));
            console.log('readAll>>',readAll);
            console.log('this._emailUserAdmin>>',this._emailUserAdmin);
            console.log('this.user.email>>',this.user);
            if(!(readAll.length>0 || this.user.isSuperuser === true)){

            this.isAdmin = false;
            }

            const ubigeo = localStorage.getItem('ubigeoBrechas');

            if (this.isAdmin){
                if (ubigeo){
                    this.ubigeo = ubigeo;
                }else{
                    this.ubigeo =
                    this.user && this.user.ubigeo
                        ? this.user.ubigeo
                        : this.ubigeo;
                        localStorage.setItem('ubigeoBrechas',this.ubigeo);
                }

            }

            else
                {
                    this.ubigeo =
                    this.user && this.user.ubigeo
                        ? this.user.ubigeo
                        : this.ubigeo;
                    localStorage.setItem('ubigeoBrechas',this.ubigeo);
            }


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
        //this._ngxSpinner.show();
        const params = { search: ubigeo, limit: this.defaultTableLimit };
        this._districtService.getList(params).subscribe(async (res)=>{
            /*console.log(res);*/
            this.districts = res.results;
            this._fuseSplashScreenService.show();
            if (this.districts && this.districts.length > 0) {
                this.district = this.districts[0];

                const [total1, total2, total3,total4,total5,total6] = await Promise.all([
                    this.getTotalPrediosSinGeorreferrencia(
                        ubigeo
                    ),
                    this._manzanaPrediosSubvaluadosService.getTotalSubvaluados({ubigeo:ubigeo}),
                    this._manzanaLotesSinPredioService.getTotalLotesSinPredio({ubigeo:ubigeo}),
                    this._manzanaSinLoteService.getTotalManzanaSinLote({ubigeo:ubigeo}),
                    this._manzanaPuntoImagenService
                        .getTotalPuntoImagen({ ubigeo: this.ubigeo }),
                        this._manzanaCrecimientoService
                        .getTotalManzanas({ ubigeo: this.ubigeo })
                  ]);

                  this._fuseSplashScreenService.hide();

                this.cards.forEach( (c) => {

                    if(c.type === TypeGap.PREDIO_SIN_GEORREFERENCIACION){
                        c.numb = String(total1);
                    }
                    if(c.type === TypeGap.PREDIO_SUBVALUADO){
                        c.numb = String(total2);
                    }
                    if(c.type === TypeGap.PUNTOS_LOTE_SIN_PREDIO){
                        c.numb = String(total3);
                    }

                    if(c.type === TypeGap.MANZANA_SIN_LOTES){
                        c.numb = String(total4);
                    }

                    if(c.type === TypeGap.PUNTO_IMAGEN){
                        c.numb = String(total5);
                    }
                    if(c.type === TypeGap.ACTUALIZACION_CARTOGRAFICA){
                        c.numb = String(total6);
                    }


                    c.path = `${c.pathBase}`;
                   // c.path = `${c.pathBase}/${ubigeo}`;
                });
                this._ngxSpinner.hide();

            }
        });

    }

    async getTotalPrediosSinGeorreferrencia(ubigeo: string): Promise<number> {
        let s = 0;

        const queryParams = { ubigeo };
        const results = await this._landGapAnalisysService.getStadistictsStatus(
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
        localStorage.setItem('ubigeoBrechas',this.ubigeo);
        this.updateUbigeoCards(this.ubigeo);
    }

    displayFn(option: any): string {
        return `${option.departmentName} - ${option.provinceName} - ${option.districtName}`;
    }
}
