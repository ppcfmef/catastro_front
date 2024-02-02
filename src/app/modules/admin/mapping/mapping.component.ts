import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDrawer} from '@angular/material/sidenav';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.types';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import {DomSanitizer,SafeResourceUrl,} from '@angular/platform-browser';
import { CommonService } from 'app/core/common/services/common.service';
@Component({
    selector: 'app-mapping',
    templateUrl: './mapping.component.html',
    styleUrls: ['./mapping.component.scss'],
    standalone: true,
})
export class MappingComponent implements OnInit {

    @ViewChild('matDrawer', {static: true}) matDrawer: MatDrawer;
    drawerMode: 'side' | 'over';

    userUbigeo: string;
    _unsubscribeAll: Subject<any> = new Subject<any>();
    user: User;
    x: number;
    y: number;
    zoom=15;
    url: SafeResourceUrl;
/*
    userUbigeo: string;
    _unsubscribeAll: Subject<any> = new Subject<any>();
    user: User;
    x: number;
    y: number;
    zoom=15;
    url: SafeResourceUrl;


*/
    title = 'Geovisor';
    urlString='https://ws.mineco.gob.pe/portaldf/apps/webappviewer/index.html?id=c12acab8ebcf4949979b8f6d7717ce7e';
    //urlString='https://ws.mineco.gob.pe/portaldfvisor/geovisor/';
    //urlString='https://ws.mineco.gob.pe/portaldfvisor/geovisor/';
    constructor(  private _userService: UserService,
        private _commonService: CommonService,
        public sanitizer: DomSanitizer) {
    }

    ngOnInit(): void {

        this._userService.user$
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((user: any) => {
            let paramsUbigeo ='';
            this.user = user;
            //console.log('this.user>>', this.user);
            this.userUbigeo =
                this.user.ubigeo && this.user.ubigeo
                    ? this.user.ubigeo
                    : '150101';
              this._commonService.getDistrictResource(this.userUbigeo).subscribe((data: any)=>{


                const ext: any=data.extensions[0];
                this.x=ext.x;
                this.y=ext.y;

                if(!this.user.ubigeo){
                    paramsUbigeo='';
                }
                else{
                    paramsUbigeo=`&ubigeo=${this.userUbigeo}`;
                }

                if (this.user.ubigeo)  {
                    if(this.urlString.includes('?')){
                        this.urlString=this.urlString+`&extent=${ext.xMin},${ext.yMin},${ext.xMax},${ext.yMax}${paramsUbigeo}`;
                      }
                    else{
                        this.urlString=this.urlString+`?extent=${ext.xMin},${ext.yMin},${ext.xMax},${ext.yMax}${paramsUbigeo}`;
                      }

                }

                console.log('this.urlString',this.urlString);
                this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.urlString);

            });

        });

    }

}
