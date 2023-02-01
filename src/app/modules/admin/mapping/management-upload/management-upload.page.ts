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
    title = 'Gestion y Carga de Cartografia Base';
    drawerMode: 'side' | 'over';
    userUbigeo: string;
    _unsubscribeAll: Subject<any> = new Subject<any>();
    user: User;
    x: number;
    y: number;
    zoom=15;
    url: SafeResourceUrl;

    urls=[
     /*   {urlString:'https://ws.mineco.gob.pe/portaldf/apps/webappviewer/index.html?id=f3764f9245d046f89078bed24b7ae670', utm: 17},
        {urlString:'https://ws.mineco.gob.pe/portaldf/apps/webappviewer/index.html?id=6417eb15e5a342d8a74a4dca41d5e6e0', utm: 18},
        {urlString:'https://ws.mineco.gob.pe/portaldf/apps/webappviewer/index.html?id=09e986dd996d4fbbabbea13083619035', utm: 19}
        */

        /*{urlString:'https://ws.mineco.gob.pe/portaldf/apps/webappviewer/index.html?id=e64744d6454b4ad19e95bcc97a32e1e1'}*/

    ];
        urlString='https://ws.mineco.gob.pe/portaldf/apps/webappviewer/index.html?id=e64744d6454b4ad19e95bcc97a32e1e1';

    constructor(     private _userService: UserService,
        private _commonService: CommonService,
        public sanitizer: DomSanitizer) {}

    ngOnInit(): void {
        this._userService.user$
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((user: any) => {
            this.user = user;
            //console.log('this.user>>', this.user);
            this.userUbigeo =
                this.user.ubigeo && this.user.ubigeo
                    ? this.user.ubigeo
                    : '140204';
              this._commonService.getDistrictResource(this.userUbigeo).subscribe((data: any)=>{
                //console.log(data);
                const utm = data.resources[0].utm;
                //this.urlString=this.urls.find(e=>e.utm ===utm).urlString;
                const ext: any=data.extensions[0];
                this.x=ext.x;
                this.y=ext.y;
                //console.log(this.x,this.y);
                if(this.urlString.includes('?')){
                    this.urlString=this.urlString+`&extent=${ext.xMin},${ext.yMin},${ext.xMax},${ext.yMax}&ubigeo=${this.userUbigeo}`;
                }
                else{
                    this.urlString=this.urlString+`?extent=${ext.xMin},${ext.yMin},${ext.xMax},${ext.yMax}&ubigeo=${this.userUbigeo}`;
                }
                //console.log('this.urlString',this.urlString);
                this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.urlString);

            });

        });


    }
}
