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
    userUbigeo: string;
    _unsubscribeAll: Subject<any> = new Subject<any>();
    user: User;
    x: number;
    y: number;
    zoom=15;
    url: SafeResourceUrl;
    urlString='https://ws.mineco.gob.pe/portaldf/apps/webappviewer/index.html?id=90568c02bd8c44789b16c200aab65d08';
  constructor( private _userService: UserService,
    private _commonService: CommonService,
    public sanitizer: DomSanitizer
    ) { }

  ngOnInit(): void {


    this._userService.user$
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((user: any) => {
        this.user = user;
        console.log('this.user>>', this.user);
        this.userUbigeo =
            this.user.ubigeo && this.user.ubigeo
                ? this.user.ubigeo
                : '140204';
          this._commonService.getDistrictResource(this.userUbigeo).subscribe((data: any)=>{
            console.log(data);

            const ext: any=data.extensions[0];
            this.x=ext.x;
            this.y=ext.y;
            console.log(this.x,this.y);
            this.urlString=this.urlString+`&extent=${ext.xMin},${ext.yMin},${ext.xMax},${ext.yMax}`;
            //this.urlString=this.urlString+`&extent=${this.x},${this.y}&level=${this.zoom}`;
            this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.urlString);
        });
       /* this.idCargo = this.user.placeScope.id;
        setTimeout(() => {
            this.initializeMap(this.points);
        }, 1000);*/
    });
  }



}
