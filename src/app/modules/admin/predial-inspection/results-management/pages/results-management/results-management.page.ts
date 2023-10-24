import { Component, OnInit } from '@angular/core';
import { DistrictResource } from 'app/core/common/interfaces/common.interface';
import { CommonService } from 'app/core/common/services/common.service';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.types';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  templateUrl: './results-management.page.html',
  styleUrls: ['./results-management.page.scss']
})
export class ResultsManagementPage implements OnInit {

  user: User;
  isAdmin = true;
  ubigeo: string='040703';;
  _emailUserAdmin='jcramireztello@gmail.com';
  _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(  private _userService: UserService,private _commonService: CommonService,) { }

  ngOnInit(): void {

    this._userService.user$
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((user: any) => {
        this.user = user;
        const permissionsNavigation: any[]=this.user?.permissionsNavigation;
        console.log('this.user',this.user);
        this.ubigeo =
        this.user && this.user.ubigeo
            ? this.user.ubigeo
            : this.ubigeo;

        localStorage.setItem('ubigeo',this.ubigeo);

        this._commonService
        .getDistrictResource(this.ubigeo)
        .subscribe((data: DistrictResource) => {
          localStorage.setItem('distrito',JSON.stringify(data));
        });
        /*const readAll = permissionsNavigation.filter((p: any)=>(p?.navigationView===this.idView && p?.type==='read_all'));
        console.log('readAll>>',readAll);

        if(!(readAll.length>0 || this.user.email === this._emailUserAdmin)){
            this.isAdmin = false;
        }*/

    });

  }



}
