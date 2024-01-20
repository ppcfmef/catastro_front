import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Component, OnInit, OnChanges, OnDestroy, Input, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CustomConfirmationService } from 'app/shared/services/custom-confirmation.service';
import { LandRegistryService } from '../../services/land-registry.service';
import { LandOwner } from '../../interfaces/land-owner.interface';
import { NavigationAuthorizationService } from 'app/shared/services/navigation-authorization.service';
import { FuseSplashScreenService } from '@fuse/services/splash-screen';
import { CommonUtils } from 'app/core/common/utils/common.utils';

@Component({
  selector: 'app-new-owner-container',
  templateUrl: './new-owner-container.component.html',
  styleUrls: ['./new-owner-container.component.scss']
})
export class NewOwnerContainerComponent implements OnInit, OnChanges, OnDestroy {
  @Input() ownerId: number;
  @Input() ubigeo: string;
  showFormEdit: boolean | null;
  params: any ={};
  search: FormControl = new FormControl();
  landOwner: LandOwner;
  idView = 'gprpregist';
  hideSelectUbigeo = true;

  private unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private landRegistryService: LandRegistryService,
    private confirmationService: CustomConfirmationService,
    private navigationAuthorizationService: NavigationAuthorizationService,
    private _fuseSplashScreenService: FuseSplashScreenService,
  ) {
    this.search = new FormControl('');
  }

  ngOnInit(): void {

    this.landRegistryService.getLandOwner()
    .pipe(takeUntil(this.unsubscribeAll))
    .subscribe((result) => {
      this.landOwner = result;
    });

    /*this.navigationAuthorizationService.userScopePermission(this.idView)
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
    });*/
  }

  ngOnChanges(changes: SimpleChanges): void {
    const ownerId = changes.ownerId?.currentValue;
    if (ownerId) {
      this.landRegistryService.getOwner(ownerId)
      .subscribe((res) => {
        this.receivedShowFormEdit(false);
        this.landRegistryService.setLandOwner(res);
        this.search.setValue(res.dni);
      });
    }
  }

  receivedShowFormEdit(event): void{
    this.showFormEdit = event;
  }

  newOwner(): void{
    this.showFormEdit = true;
    this.landRegistryService.setLandOwner(null);
    this.search.reset();
  }

  searchOwner(): void {
    const searchText = this.search.value;
    if(searchText!==''){
        const params = CommonUtils.deleteKeysNullInObject({ ubigeo: this.ubigeo, code:searchText,limit:1,offset:5});

        this._fuseSplashScreenService.show();
        this.landRegistryService.searchOwnerbyDocument(params)
        .toPromise()
        .then(
          (result: any) => {
            this._fuseSplashScreenService.hide();
            if (result && result.length>0){
                this.receivedShowFormEdit(false);
                this.landRegistryService.setLandOwner(result[0]);

            }

            else{

                const dialogRef = this.confirmationService.error(
                    'Contribuyente no encontrado',
                    `¿Desea crear un nuevo contribuyente con documento ${searchText}?`
                  );

                  dialogRef.afterClosed().subscribe((option) => {
                    if (option === 'confirmed') {
                      this.receivedShowFormEdit(true);
                      console.log('pasar documento al formulario', searchText);
                    }
                    this.search.reset();
                  });
            }

          },
          (error) => {
            this._fuseSplashScreenService.hide();
            const dialogRef = this.confirmationService.error(
              'Contribuyente no encontrado',
              `¿Desea crear un nuevo contribuyente con documento ${searchText}?`
            );

            dialogRef.afterClosed().subscribe((option) => {
              if (option === 'confirmed') {
                this.receivedShowFormEdit(true);
                console.log('pasar documento al formulario', searchText);
              }
              this.search.reset();
            });
          }
        );
    }

  }

  ngOnDestroy(): void{
    this.landRegistryService.setLandOwner(null);
    this.unsubscribeAll.next(null);
    this.unsubscribeAll.complete();
  }
}
