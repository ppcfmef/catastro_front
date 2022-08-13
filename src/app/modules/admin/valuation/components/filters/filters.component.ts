/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
    Department,
    District,
    DistrictResource,
    Province,
} from 'app/core/common/interfaces/common.interface';
import { CommonService } from 'app/core/common/services/common.service';
import { UserService } from 'app/core/user/user.service';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { User } from 'app/core/user/user.types';
import { FuseSplashScreenService } from '@fuse/services/splash-screen';
@Component({
    selector: 'app-filters',
    templateUrl: './filters.component.html',
    styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent implements OnInit {
    user: User;
    _unsubscribeAll: Subject<any> = new Subject<any>();
    departments$: Observable<Department[]>;
    provinces$: Observable<Province[]>;
    districts$: Observable<District[]>;
    isValid = true;
    fileName: string;
    isDisabled = true;
    isDisabledDescargar = true;
    // eslint-disable-next-line @typescript-eslint/member-ordering
    @Output()
    buscarEventEmitter = new EventEmitter<any>();

    // eslint-disable-next-line @typescript-eslint/member-ordering
    @Output()
    descargarEventEmmiterr = new EventEmitter<any>();

    // eslint-disable-next-line @typescript-eslint/member-ordering
    @Output()
    cargarEventEmmiterr = new EventEmitter<any>();

    fileToUpload: any;
    params = {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        department: '',
        province: '',
        district: '',
        namedistrict: '',
        projection: 0,
        fileToUpload:null,
    };

    dataSearch: DistrictResource;

    isReadOnly = false;
    constructor(
        private _commonService: CommonService,
        private _userService: UserService,
        private commonService: CommonService,
        private _fuseSplashScreenService: FuseSplashScreenService
    ) {}

    ngOnInit(): void {
        this._userService.user$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((user: User) => {
                this.user = user;
                const ubigeo =
                    this.user.placeScope && this.user.placeScope.ubigeo
                        ? this.user.placeScope.ubigeo
                        : '150101';
                this.commonService
                    .getDistrictResource(ubigeo)
                    .subscribe((data: DistrictResource) => {
                        this.params.department = data.department;
                        this.params.province = data.province;
                        this.params.district = ubigeo;

                        this.initParams();
                    });
            });
    }

    initParams(): void {
        this.departments$ = this._commonService.getDepartments();

        this.params.department ? this.selectDep() : false;
        this.params.province ? this.selectProv() : false;
        this.params.district ? this.selectDist() : false;
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        //(this.params.department)? this.selectDep():false;
        //(this.params.province)? this.selectProv():false;
    }

    selectDep(): void {
        this.provinces$ = this._commonService.getProvinces({
            department: this.params.department,
        });
    }

    selectProv(): void {
        this.districts$ = this._commonService.getDistricts({
            province: this.params.province,
        });
    }

    selectDist(): void {
        if (this.params.district && this.params.district !== '') {
            this.isDisabledDescargar = false;

            // eslint-disable-next-line @typescript-eslint/no-shadow
            this._commonService
                .getDistrictResource(this.params.district)
                .subscribe((data: DistrictResource) => {
                    this.dataSearch = data;
                    this.params.projection = parseInt(
                        '327' + this.dataSearch.resources[0].utm,
                        10
                    );
                    /*this.params.department= data.department;
           this.params.province= data.province;*/
                    this.params.namedistrict = data.name;
                });
        }
    }

    buscar(): void {
        this.buscarEventEmitter.emit(this.params);
    }

    descargar(): void {
        this.descargarEventEmmiterr.emit(this.params);
    }

    uploadFile(event: any): void {
        //this._fuseSplashScreenService.show(0);
        console.log('holass');
        this.fileToUpload = event.target.files[0];
        this.fileName = event.target.value;
        this.fileName = this.fileName.split(/(\\|\/)/g).pop();
        this.fileName = this.fileName.toString();
        const ext = this.fileName.split('.').pop();
        console.log('ext>>',ext);
        this.isDisabled = false;
        //this._fuseSplashScreenService.hide();
    }

    subirDato(): void {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        this.params.fileToUpload = this.fileToUpload;
        console.log(this.params.fileToUpload);
        this.cargarEventEmmiterr.emit(this.params);
    }
}
