import { Component, OnInit } from '@angular/core';
import { CommonService } from 'app/core/common/services/common.service';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.types';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import {DomSanitizer,SafeResourceUrl,} from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss']
})
export class DashboardPage implements OnInit {

  userUbigeo: string;
  _unsubscribeAll: Subject<any> = new Subject<any>();
  user: User;
  url: SafeResourceUrl;
  urlString: string = 'https://ws.mineco.gob.pe/portaldf/apps/dashboards/d50594627a154dab8a8f776b033335ea';

  constructor(
    private _userService: UserService,
    private _commonService: CommonService,
    public sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {

    this._userService.user$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((user: any) => {
          this.user = user;

          this.userUbigeo = this.user.ubigeo ?? '';

          if(this.userUbigeo.length > 0){
            this._commonService.getDistrictResource(this.userUbigeo).subscribe((data: any)=>{
              this.urlString=this.urlString+`#dpto=${data.department}&prov=${data.province}&ubigeo=${this.user.ubigeo}`;
              this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.urlString);
            });
          }else {
            this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.urlString);
          }
      });
    }
  }

