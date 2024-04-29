import { Component, OnInit } from '@angular/core';
import { DistrictResource } from 'app/core/common/interfaces/common.interface';
import { CommonService } from 'app/core/common/services/common.service';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.types';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ResultsService } from '../../services/results.service';
//import { parseString } from 'rrule/dist/esm/src/parsestring';

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
  idView='resmanagi';
  constructor(  private _userService: UserService,
    private _commonService: CommonService,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    private _resultsService: ResultsService) { }

  ngOnInit(): void {

    this._userService.user$
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((user: User) => {
        this.user = user;
        const permissionsNavigation: any[]=this.user?.permissionsNavigation;
        const readAll = permissionsNavigation.filter((p: any)=>(p?.navigationView===this.idView && p?.type==='read_all'));
        if(!(readAll.length>0 || this.user.isSuperuser === true)){

            this.isAdmin = false;
        }

        localStorage.setItem('isAdmin', this.isAdmin.toString());
        localStorage.setItem('user',JSON.stringify(this.user));
        this.ubigeo =
        this.user && this.user.ubigeo
            ? this.user.ubigeo
            : null;
        if(this.ubigeo){
            this._resultsService.setUbigeo(this.ubigeo);
            this._commonService
            .getDistrictResource(this.ubigeo)
            .subscribe((data: DistrictResource) => {
              localStorage.setItem('distrito',JSON.stringify(data));
            });

        }
    });

  }



}
