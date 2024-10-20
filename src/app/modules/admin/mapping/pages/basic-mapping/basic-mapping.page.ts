import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { CommonService } from 'app/core/common/services/common.service';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.types';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import {DomSanitizer,SafeResourceUrl,} from '@angular/platform-browser';
@Component({
  selector: 'app-basic-mapping',
  templateUrl: './basic-mapping.page.html',
  styleUrls: ['./basic-mapping.page.scss']
})
export class BasicMappingPage implements OnInit {

  @ViewChild('matDrawer', {static: true}) matDrawer: MatDrawer;
    drawerMode: 'side' | 'over';
    title = 'Actualizacion Cartografica';
    userUbigeo: string;
    _unsubscribeAll: Subject<any> = new Subject<any>();
    user: User;
    x: number;
    y: number;
    zoom=15;
    url: SafeResourceUrl;
    //urlString='https://ws.mineco.gob.pe/portaldf/apps/webappviewer/index.html?id=90568c02bd8c44789b16c200aab65d08';
    //https://frank:3344/webappbuilder/apps/3/?ubigeo=140201
urls=[


/*
{urlString:'https://ws.mineco.gob.pe/portaldf/apps/webappviewer/index.html?id=90568c02bd8c44789b16c200aab65d08', utm: 17},
{urlString:'https://ws.mineco.gob.pe/portaldf/apps/webappviewer/index.html?id=5289ded8ea68461b951ece0fb395b3a6', utm: 18},
{urlString:'https://ws.mineco.gob.pe/portaldf/apps/webappviewer/index.html?id=adbbe634ae2943e6ac85be2d8f635444', utm: 19}
*/

];
//urlString='https://ws.mineco.gob.pe/portaldf/apps/webappviewer/index.html?id=90568c02bd8c44789b16c200aab65d08';

urlString='https://ws.mineco.gob.pe/portaldfvisor/actcarto/';


  constructor(
    private _userService: UserService,
    private _commonService: CommonService,
    public sanitizer: DomSanitizer
    ) { }

  ngOnInit(): void {


    this._userService.user$
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((user: any) => {
        let paramsUbigeo ='';
        this.user = user;
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


            if(this.urlString.includes('?')){
              this.urlString=this.urlString+`&extent=${ext.xMin},${ext.yMin},${ext.xMax},${ext.yMax}${paramsUbigeo}&userPcf=${this.user.username}`;
            }
          else{
              this.urlString=this.urlString+`?extent=${ext.xMin},${ext.yMin},${ext.xMax},${ext.yMax}${paramsUbigeo}&userPcf=${this.user.username}`;
            }
            console.log('this.urlString',this.urlString);
            this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.urlString);

        });

    });
  }



}
