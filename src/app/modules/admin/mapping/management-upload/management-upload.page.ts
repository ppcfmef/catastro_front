import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.types';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import {DomSanitizer,SafeResourceUrl,} from '@angular/platform-browser';
import { CommonService } from 'app/core/common/services/common.service';
@Component({
    selector: 'app-management-upload-page',
    templateUrl: './management-upload.page.html',
    styleUrls: ['./management-upload.page.scss'],
})
export class ManagementUploadPage implements OnInit {

    @ViewChild('matDrawer', {static: true}) matDrawer: MatDrawer;
    title = 'Gestión y Carga de Cartografia Base';
    drawerMode: 'side' | 'over';
    userUbigeo: string;
    _unsubscribeAll: Subject<any> = new Subject<any>();
    user: User;
    x: number;
    y: number;
    zoom=15;
    url: SafeResourceUrl;

    urls=[

    ];
        urlString='https://ws.mineco.gob.pe/portaldf/apps/webappviewer/index.html?id=e64744d6454b4ad19e95bcc97a32e1e1';
    //urlString='https://ws.mineco.gob.pe/portaldfvisor/carga/';
    constructor(     private _userService: UserService,
        private _commonService: CommonService,
        public sanitizer: DomSanitizer) {}

    ngOnInit(): void {
        this._userService.user$
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((user: any) => {
            this.user = user;
            console.log('user>>>',user);
            let paramsUbigeo ='';
            this.userUbigeo =
                this.user.ubigeo
                    ? this.user.ubigeo
                    : '150101';

              this._commonService.getDistrictResource(this.userUbigeo).subscribe((data: any)=>{
                console.log(data);

                const ext: any=data.extensions[0];
                this.x=ext.x;
                this.y=ext.y;

                if(!this.user.ubigeo){
                    paramsUbigeo='';
                }
                else{
                    paramsUbigeo=`&ubigeo=${this.userUbigeo}`;
                }


                if(this.urlString.includes('?')){
                    this.urlString=this.urlString+`&extent=${ext.xMin},${ext.yMin},${ext.xMax},${ext.yMax}${paramsUbigeo}`;
                }
                else{
                    this.urlString=this.urlString+`?extent=${ext.xMin},${ext.yMin},${ext.xMax},${ext.yMax}${paramsUbigeo}`;
                }
                console.log('this.urlString',this.urlString);
                this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.urlString);

            });

        });


    }
}
