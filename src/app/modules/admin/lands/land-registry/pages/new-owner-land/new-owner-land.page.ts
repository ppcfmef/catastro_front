import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavigationAuthorizationService } from 'app/shared/services/navigation-authorization.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-new-owner-land',
  templateUrl: './new-owner-land.page.html',
  styleUrls: ['./new-owner-land.page.scss']
})
export class NewOwnerLandPage implements OnInit {
  expandMap = true;
  initialPage = false;
  ownerId: number;
  landId: number;
  idView = 'gprpregist';
  hideSelectUbigeo = true;
  unsubscribeAll: Subject<any> = new Subject<any>();
  ubigeo: string;
  constructor(
    private route: ActivatedRoute,
    private navigationAuthorizationService: NavigationAuthorizationService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.ownerId = params.ownerId ? Number(params.ownerId) : params.ownerId;
      this.landId = params.landId ? Number(params.landId) : params.landId;
      this.initialPage = true;
    });

//  this.navigationAuthorizationService.ubigeoNavigation = this.ubigeo;
    if(!this.navigationAuthorizationService.ubigeoNavigation){
        this.navigationAuthorizationService.userScopePermission(this.idView)
        .pipe(takeUntil(this.unsubscribeAll))
        .subscribe((data: any) => {
          if(!data?.limitScope){
            this.ubigeo = null;
            this.hideSelectUbigeo = false;
          }
          else {
            this.hideSelectUbigeo = true;
            this.ubigeo = data?.ubigeo;
          }

          this.navigationAuthorizationService.ubigeoNavigation = this.ubigeo;

        });
    }
    else{
         this.ubigeo=this.navigationAuthorizationService.ubigeoNavigation ;
    }

  }

}
