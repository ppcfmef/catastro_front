import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Component, OnInit, OnChanges, OnDestroy, Input, SimpleChanges } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { CustomConfirmationService } from 'app/shared/services/custom-confirmation.service';
import { LandRegistryService } from '../../services/land-registry.service';
import { LandOwner } from '../../interfaces/land-owner.interface';
import { NavigationAuthorizationService } from 'app/shared/services/navigation-authorization.service';
import { FuseSplashScreenService } from '@fuse/services/splash-screen';
import { CommonUtils } from 'app/core/common/utils/common.utils';
import { IntegrationService } from 'app/shared/services/integration.service';
import { SatLandOwner } from 'app/shared/interfaces/integrations.inteface';
import { LandOwnerModel } from '../../models/land-owner.model';
import { error } from 'console';

@Component({
  selector: 'app-new-owner-container',
  templateUrl: './new-owner-container.component.html',
  styleUrls: ['./new-owner-container.component.scss']
})
export class NewOwnerContainerComponent implements OnInit, OnChanges, OnDestroy {
  @Input() ownerId: number;
  @Input() ubigeo: string;
  showFormEdit: boolean | null;
  showButtons: boolean = false;
  params: any ={};
  search: UntypedFormControl = new UntypedFormControl();
  landOwner: LandOwnerModel = new LandOwnerModel();
  idView = 'gprpregist';
  hideSelectUbigeo = true;

  private unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private landRegistryService: LandRegistryService,
    private confirmationService: CustomConfirmationService,
    private navigationAuthorizationService: NavigationAuthorizationService,
    private _fuseSplashScreenService: FuseSplashScreenService,
    private integrationService: IntegrationService,
  ) {
    this.search = new UntypedFormControl('');
  }

  ngOnInit(): void {

    this.landRegistryService.getLandOwner()
    .pipe(takeUntil(this.unsubscribeAll))
    .subscribe((result) => {


      this.landOwner.setValue( result);

      console.log(' this.landOwner>>', this.landOwner);
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
    this.searchOwnerbyDocument(searchText);

  /*  if(searchText!==''){
        const params = CommonUtils.deleteKeysNullInObject({ ubigeo: this.ubigeo, code:searchText,limit:1,offset:5});



        this._fuseSplashScreenService.show();


          this.landRegistryService.searchOwnerbyDocument(params)
          .toPromise()
          .then(
            (result: any) => {
              console.log('result>>',result);
              this._fuseSplashScreenService.hide();

              if (result && result.length>0){
                  this.receivedShowFormEdit(false);
                  this.landRegistryService.setLandOwner(result[0]);

              }

              else{

                  const dialogRef = this.confirmationService.errorInfo(
                    `Contribuyente no encontrado`,
                    `Contribuyente "${searchText}" no esta registrado. <br>Por favor registrese en su sistema de renta`
                    );

                    dialogRef.afterClosed().subscribe((option) => {
                      // if (option === 'confirmed') {
                      //   this.receivedShowFormEdit(true);
                      //   console.log('pasar documento al formulario', searchText);
                      // }

                      this.search.reset();
                      this.showFormEdit = null;
                      this.landRegistryService.setLandOwner(null);
                    });
              }

            },
            (error) => {
              this._fuseSplashScreenService.hide();


            }
          );



    }
*/
  }

  searchOwnerbyDocument(searchText: any):void{
    if(searchText!==''){
        const params = CommonUtils.deleteKeysNullInObject({ ubigeo: this.ubigeo, code:searchText,limit:1,offset:5});
        this._fuseSplashScreenService.show();
          this.landRegistryService.searchOwnerbyDocument(params)
          .toPromise()
          .then(
            (result: any) => {
              console.log('result>>',result);
              this._fuseSplashScreenService.hide();

              if (result && result.length>0){
                  this.receivedShowFormEdit(false);
                  this.landRegistryService.setLandOwner(result[0]);
                  this.showButtons = true;

              }

              else{

                this.searhSrtm(searchText);

                  /*const dialogRef = this.confirmationService.errorInfo(
                    `Contribuyente no encontrado`,
                    `Contribuyente "${searchText}" no esta registrado. <br>Por favor registrese en su sistema de renta`
                    );

                    dialogRef.afterClosed().subscribe((option) => {


                      this.search.reset();
                      this.showFormEdit = null;
                      this.landRegistryService.setLandOwner(null);
                    });*/
              }

            },
            (error) => {
              this._fuseSplashScreenService.hide();


              /*const dialogRef = this.confirmationService.error(
                'Contribuyente no encontrado',
                `¿Desea crear un nuevo contribuyente con documento ${searchText}?`
              );

              dialogRef.afterClosed().subscribe((option) => {
                if (option === 'confirmed') {
                  this.receivedShowFormEdit(true);
                  console.log('pasar documento al formulario', searchText);
                }
                this.search.reset();
              });*/
            }
          );



/*
        this.landRegistryService.searchOwnerbyDocument(params)
        .toPromise()
        .then(
          (result: any) => {
            console.log('result>>',result);
            this._fuseSplashScreenService.hide();

            if (result && result.length>0){
                this.receivedShowFormEdit(false);
                this.landRegistryService.setLandOwner(result[0]);
                this.showButtons = true;
            }

            else{

                const dialogRef = this.confirmationService.errorInfo(
                  `Contribuyente no encontrado`,
                  `Contribuyente "${searchText}" no esta registrado. <br>Por favor registrese en el sistema de renta`
                  );

                  dialogRef.afterClosed().subscribe((option) => {
                    // if (option === 'confirmed') {
                    //   this.receivedShowFormEdit(true);
                    //   console.log('pasar documento al formulario', searchText);
                    // }

                    this.search.reset();
                    this.showFormEdit = null;
                    this.landRegistryService.setLandOwner(null);
                    this.showButtons = false;
                  });
            }

          },
          (error) => {
            this._fuseSplashScreenService.hide();
            const dialogRef = this.confirmationService.error(
              `Contribuyente no encontrado`,
              `Contribuyente "${searchText}" no esta registrado. <br>Por favor registrese en el sistema de renta`
              );


            dialogRef.afterClosed().subscribe((option) => {
              // if (option === 'confirmed') {
              //   this.receivedShowFormEdit(true);
              //   console.log('pasar documento al formulario', searchText);
              // }

              this.search.reset();
              this.showFormEdit = null;
              this.landRegistryService.setLandOwner(null);
            });
          }
        );*/

    }
  }

searhSrtm(searchText: any): void{
    const params = CommonUtils.deleteKeysNullInObject({ ubigeo: this.ubigeo, code:searchText,limit:1,offset:5});
    const landOwnerCode = searchText;
    const ubigeo = this.ubigeo;
    const address ={
        ubigeo: null,
        uuType: null,
        codUu: null,
        habilitacionName: null,
        codStreet: null,
        streetType: null,
        streetName: null,
        urbanMza: null,
        urbanLotNumber: null,
        block: null,
        indoor: null,
        floor: null,
        km: null
      };

    if (ubigeo === '220901') {
        this.integrationService.getSatLandOwner(ubigeo, landOwnerCode)
          .subscribe(
            (result: { data: SatLandOwner[] }) => {
                this._fuseSplashScreenService.hide();
              if (result && result.data && result.data.length > 0) {
                const landOwner: SatLandOwner = result.data[0];
                this.landOwner.dni = landOwner.nrodocumento;
                this.landOwner.maternalSurname = landOwner.apmaterno;
                this.landOwner.paternalSurname = landOwner.appaterno;
                this.landOwner.name = landOwner.nombre;
                this.landOwner.documentType ='01';
                this.landOwner.ubigeo = this.ubigeo;
                this.landOwner.code = searchText;
                this.landOwner.address =address;
                this.saveForm();
              }

            }, ()=>{
                const dialogRef = this.confirmationService.errorInfo(
                    'Contribuyente no encontrado',
                    `Contribuyente "${searchText}" no esta registrado. <br>Por favor registrese en el sistema de renta`
                    );

                    dialogRef.afterClosed().subscribe((option) => {

                      this.showButtons = false;
                      this.search.reset();
                      this.showFormEdit = null;
                      this.landRegistryService.setLandOwner(null);
                    });
            });
      }
      else {
          this.integrationService.getLandOwnerNSRTM(ubigeo, landOwnerCode)
          .subscribe(
            (result) => {
                /*console.log('holasss');
                console.log('result>>',result);*/
                if (result && result.codigo==='404' ){
                    const dialogRef = this.confirmationService.errorInfo(
                        'Contribuyente no encontrado',
                        `Contribuyente "${searchText}" no esta registrado. <br>Por favor registrese en el sistema de renta`
                        );
                        dialogRef.afterClosed().subscribe((option) => {
                          this.showButtons = false;
                          this.search.reset();
                          this.showFormEdit = null;
                          this.landRegistryService.setLandOwner(null);
                        });
                }

                else if(result){
                    this._fuseSplashScreenService.hide();
                    this.landOwner.dni =result.numeroDocumento;
                    if (result.tipoDocumento === 2) {
                        this.landOwner.documentType ='06';
                        this.landOwner.descriptionOwner =result.razonSocial;

                      } else {

                        this.landOwner.maternalSurname = result.materno;
                        this.landOwner.paternalSurname = result.paterno;
                        this.landOwner.name = result.nombres;
                        this.landOwner.documentType ='01';
                        this.landOwner.address =address;
                        }
                        this.landOwner.ubigeo = this.ubigeo;
                        this.landOwner.code = searchText;
                        this.landOwner.address =address;
                    this.saveForm();
                }

            }, ()=>{
                const dialogRef = this.confirmationService.errorInfo(
                    'Contribuyente no encontrado',
                    `Contribuyente "${searchText}" no esta registrado. <br>Por favor registrese en wl sistema de renta`
                    );
                    dialogRef.afterClosed().subscribe((option) => {
                      this.showButtons = false;
                      this.search.reset();
                      this.showFormEdit = null;
                      this.landRegistryService.setLandOwner(null);
                    });
            });

      }

}
  saveForm(): void {
    console.log('saveForm');
    //if (this.formEdit.valid) {
      this._fuseSplashScreenService.show();
      //this.landOwner.setValue(this.formEdit.value);
      this.landRegistryService.saveOwner(this.landOwner)
        .toPromise()
        .then(
          (result) => {
            this._fuseSplashScreenService.hide();
            this.landOwner.id=result.id;
            this.landRegistryService.setLandOwner(this.landOwner);

            /*this.searchOwner();*/
            /*this.emitShowFormEdit(false);*/
            /*this.confirmationService.success(
              'Registro de propietario',
              'Propietario registrado correctamente'
            );*/

          },
          (error) => {
            this._fuseSplashScreenService.hide();
            /*this.confirmationService.success(
              'Registro de propietario',
              //'Error al registrar propietario -  el codigo de predio dentro del distrito deben ser unico',
              `Error al registrar propietario - ${JSON.stringify(error?.error)}`
            );*/

          }
        );
    } /*else {
      this.confirmationService.success(
        'Registro de propietario',
        'Error al registrar propietario'
      );*/
   // }


  clean(): void{
    this.showButtons = false;
    this.search.reset();
    this.showFormEdit = null;
    this.landRegistryService.setLandOwner(null);
  }

  createLandRecord(): void {
    this.landRegistryService.setLandCreate(true);
    //this.landRegistryMapService.landIn = null;
  }
  ngOnDestroy(): void{
    this.landRegistryService.setLandOwner(null);
    this.unsubscribeAll.next(null);
    this.unsubscribeAll.complete();
  }

/*
  getIntegrationLandOwner(): void {
    const landOwnerCode = this.formEdit.get('code').value;
    const ubigeo = this.formEdit.get('ubigeo').value;

    this.cleanBeforeSearch();
    if (ubigeo === '220901') {
      this.integrationService.getSatLandOwner(ubigeo, landOwnerCode)
        .toPromise().then(
          (result: { data: SatLandOwner[] }) => {

            if (result && result.data && result.data.length > 0) {
              const landOwner: SatLandOwner = result.data[0];
              this.formEdit.get('dni').setValue(landOwner.nrodocumento);
              this.formEdit.get('maternalSurname').setValue(landOwner.apmaterno);
              this.formEdit.get('paternalSurname').setValue(landOwner.appaterno);
              this.formEdit.get('name').setValue(landOwner.nombre);
              this.formEdit.get('documentType').setValue('01');

            }

          });
    }
    else {
        this.integrationService.getLandOwnerNSRTM(ubigeo, landOwnerCode)
        .toPromise().then(
          (result) => {
            this.formEdit.get('dni').setValue(result.numeroDocumento);
            if (result.tipoDocumento === 2) {
              this.formEdit.get('documentType').setValue('06');
              this.formEdit.get('descriptionOwner').setValue(result.razonSocial);
            } else {
              this.formEdit.get('name').setValue(result.nombres);
              this.formEdit.get('documentType').setValue('01');
              this.formEdit.get('maternalSurname').setValue(result.materno);
              this.formEdit.get('paternalSurname').setValue(result.paterno);

            }
          });


    }

  }*/
}
