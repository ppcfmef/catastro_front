import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Component, OnInit, OnChanges, OnDestroy, Input, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CustomConfirmationService } from 'app/shared/services/custom-confirmation.service';
import { LandRegistryService } from '../../services/land-registry.service';
import { FuseSplashScreenService } from '@fuse/services/splash-screen';
import { CommonUtils } from 'app/core/common/utils/common.utils';
import { IntegrationService } from 'app/shared/services/integration.service';
import { SatLandOwner } from 'app/shared/interfaces/integrations.inteface';
import { LandOwnerModel } from '../../models/land-owner.model';
import { FuseValidators } from '@fuse/validators';
import { LandRegistryMapService } from '../../services/land-registry-map.service';
import { Estado } from 'app/shared/enums/estado-map.enum';

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
  search: FormControl = new FormControl();
  landOwner: LandOwnerModel = new LandOwnerModel();
  idView = 'gprpregist';
  hideSelectUbigeo = true;
  estadoIniciar = true;
  isShowButton: boolean = false;
  private unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private landRegistryService: LandRegistryService,
    private confirmationService: CustomConfirmationService,
    private _fuseSplashScreenService: FuseSplashScreenService,
    private integrationService: IntegrationService,
    private _landRegistryMapService: LandRegistryMapService,
  ) {
    this.search = new FormControl('');
  }

  ngOnInit(): void {

    this.landRegistryService.getLandOwner()
    .pipe(takeUntil(this.unsubscribeAll))
    .subscribe((result) => {


      this.landOwner.setValue( result);

    });

    // this._landRegistryMapService.getEstado().subscribe((estado: any)=>{

    //     console.log(estado, 'ESTADO');
    //   if (estado === Estado.INICIAR  ){
    //     this.estadoIniciar = true;
    //   }
    //   else{
    //     this.estadoIniciar = false;
    //   }
    // });

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
    this._landRegistryMapService.setEventCancel(true);


    const searchText = this.search.value;
    if(FuseValidators.isEmptyInputValue(searchText)){
      return;
    };
    this.searchOwnerbyDocument(searchText);
    /*if (this.estadoIniciar){
      if(FuseValidators.isEmptyInputValue(searchText)){
        return;
      };
      this.searchOwnerbyDocument(searchText);
    }*/

  }
  searchOwnerbyDocument(searchText: any): void{
    this.showFormEdit = false;
    if(!FuseValidators.isEmptyInputValue(searchText)){
        const params = CommonUtils.deleteKeysNullInObject({ ubigeo: this.ubigeo, code:searchText,limit:1,offset:5});
        this._fuseSplashScreenService.show();
          this.landRegistryService.searchOwnerbyDocument(params)
          .toPromise()
          .then(
            (result: any) => {
                this.showFormEdit = true;
                this.landRegistryService.setLandOwner(null);
                this.landRegistryService.showFormEdit.next(null);
              this._fuseSplashScreenService.hide();
              if (result && result.length>0){
                  this.receivedShowFormEdit(false);
                  this.landRegistryService.setLandOwner(result[0]);
                  this.showButtons = true;

              }

              else{
                this.searhSrtm(searchText);
              }

            },
            (errors) => {
              this._fuseSplashScreenService.hide();
            }
          );
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
                if (result && (result.codigo==='404' ||result.status===403 )  ){
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

                else if(result && result.tipoDocumento){
                    this._fuseSplashScreenService.hide();
                    this.landOwner.dni =result.numeroDocumento;
                    if (result.tipoDocumento === 2) {
                        this.landOwner.documentType ='06';
                        //this.landOwner.descriptionOwner =result.razonSocial;
                        this.landOwner.name = result.nombres;

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
    //if (this.formEdit.valid) {
      this._fuseSplashScreenService.show();
      this.landOwner.id=null;
      this.landRegistryService.saveOwner(this.landOwner)
        .toPromise()
        .then(
          (result) => {
            this._fuseSplashScreenService.hide();
            this.landOwner.id=result.id;
            this.landRegistryService.setLandOwner(this.landOwner);
            this.searchOwner();
          },
          (err) => {
            this._fuseSplashScreenService.hide();
          }
        );
    }


  clean(): void{
    this.showButtons = false;
    this.search.reset();
    this.showFormEdit = null;
    this.landRegistryService.setLandOwner(null);
    this.landRegistryService.showFormEdit.next(null);
  }

  crearPredio(): void {
    this.landRegistryService.setLandCreate(true);
    this._landRegistryMapService.setEstado(Estado.CREAR);
  }

  crearPredioSinCarto(): void {
    this.landRegistryService.setLandCreate(true);
    this._landRegistryMapService.setEstado(Estado.CREAR_PUNTO_SIN_CARTO);
  }
  
  ngOnDestroy(): void{
    this.landRegistryService.setLandOwner(null);
    this.unsubscribeAll.next(null);
    this.unsubscribeAll.complete();
  };

  closed(): void {
    this.isShowButton = false;
  }


  open(): void {
    this.isShowButton = true;
  }
}
