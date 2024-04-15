import { Component, Inject, Input, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { MasterDomain } from '../../../land-registry/interfaces/master-domain.interface';
import { LandRegistryService } from '../../../land-registry/services/land-registry.service';
import { LandModel } from '../../models/land.model';
import { takeUntil } from 'rxjs/operators';
import { Actions } from 'app/shared/enums/actions.enum';
import { CommonService } from 'app/core/common/services/common.service';
import { DistrictService } from '../../services/district.service';
import { District } from 'app/core/common/interfaces/common.interface';
import { keys } from 'lodash';
import { LandUI } from '../../interfaces/land.interface';
import { ResultUI } from '../../interfaces/result.interface';
import { CustomConfirmationService } from 'app/shared/services/custom-confirmation.service';

let _this: any;
@Component({
  selector: 'app-land-maintenance-form',
  templateUrl: './land-maintenance-form.component.html',
  styleUrls: ['./land-maintenance-form.component.scss']
})
export class LandMaintenanceFormComponent implements OnInit {
    ubigeo: string;
    formLand: UntypedFormGroup;
    landModel = new LandModel();
    masterDomain: MasterDomain;
    readOnly= false;
    action: string;
    districts: District[];
    codigoPredio: string='';
    _this = this;
    typeMaintenace ='';
    landRecords: LandUI[]=[];
    results : ResultUI[];
    private unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private landRegistryService: LandRegistryService,

        //public dialogRef: MatDialogRef<HistoricalRecordDetailComponent>,
        private fb: UntypedFormBuilder,
        private _districtService: DistrictService,
        //private _commonService: CommonService,
        public dialogRef: MatDialogRef<LandMaintenanceFormComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private confirmationService: CustomConfirmationService,

      ) {

        this.landModel= new LandModel();
        console.log('landModel>>',this.landModel);
        this.action=(data && data.action)?data.action:Actions.CREAR;
        this.typeMaintenace =(data && data.typeMaintenace)?data.typeMaintenace:'';


        if(data){
            this.codigoPredio = data.land.cpm;
            console.log('data.land.cpm>>',data.land.cpm);
            if(this.action!==Actions.CREAR){
                this.landModel=(data && data.land)? new LandModel(data.land): new LandModel();
            }
            else{
                this.landModel = new LandModel();
            }

            this.landRecords = data?.landRecords?data?.landRecords:[];
            this.results = data?.results?data?.results:[];

            this.ubigeo = (data && data.land && data.land.ubigeo)?data.land.ubigeo:null;

            if(this.action=== Actions.LEER){
                this.readOnly=true;
            }

            else if (this.action=== Actions.CREAR){
                const keysData=['ubigeo','uuType','streetType','codStreet','codUu','streetName','habilitacionName','urbanMza','habilitacionName',];
                keysData.forEach((key)=> {
                    if(this.landModel.hasOwnProperty(key)){
                        this.landModel[key] = data.land[key];
                    }

                });


            }




            if(this.ubigeo){
                this._districtService.getDistrict(this.ubigeo).subscribe((result: any)=>{
                    this.districts = [result];

                });
            }

        }

       }

      close(): void {
        this.dialogRef.close();
      }

      init(): void{
        this.landRegistryService.getMasterDomain()
        .pipe(takeUntil(this.unsubscribeAll))
        .subscribe((result) => {
            this.masterDomain = result;
            /*console.log('this.masterDomain.resolutionType>>',this.masterDomain.resolutionType);*/

            const indexConstancia=this.masterDomain.resolutionType.findIndex(e=> e.id ==='3');
            this.masterDomain.resolutionType.splice(indexConstancia,1);
            this.initForm();
            this.toggleRequired();
        });
      }

      initForm(): void{
        if (this.typeMaintenace === 'Reasignar'){
            this.formLand = this.fb.group({
                cpm2 : [ {value: this.codigoPredio,disabled:this.readOnly}],
                ubigeo: [ {value:this.landModel?.ubigeo,disabled:this.readOnly,}, [Validators.required]],
                cpm : [ {value:this.landModel?.cpm,disabled:this.readOnly}],
                resolutionType : [ {value:this.landModel?.resolutionType,disabled:this.readOnly}, [Validators.required]],
                resolutionDocument : [ {value:this.landModel?.resolutionDocument,disabled:this.readOnly}, [Validators.required]],
                uuType: [{value: this.landModel?.uuType,disabled:this.readOnly }],
                codUu: [ { value: this.landModel?.codUu,disabled: this.readOnly}],
                habilitacionName: [{value: this.landModel?.habilitacionName, disabled: this.readOnly}],
                codStreet: [{value: this.landModel?.codStreet,disabled: this.readOnly}],
                streetType: [{value: this.landModel?.streetType,disabled:this.readOnly}, [Validators.required]],
                streetName: [{value: this.landModel?.streetName,disabled: this.readOnly}, [Validators.required]],
                urbanMza: [{value:this.landModel?.urbanMza,disabled:this.readOnly} , [Validators.required]],
                urbanLotNumber: [{value: this.landModel?.urbanLotNumber,disabled:this.readOnly}, [Validators.required]],
                block: [{value:this.landModel?.block,disabled:this.readOnly}],
                indoor: [{value:this.landModel?.indoor,disabled:this.readOnly}],
                floor: [{value:this.landModel?.floor,disabled:this.readOnly}],
                km: [{value:this.landModel?.km,disabled:this.readOnly}],
                municipalNumber:[{value:this.landModel?.municipalNumber,disabled:this.readOnly}],
                apartmentNumber:[{value:this.landModel?.apartmentNumber,disabled:this.readOnly}],
              });
              //this.toggleRequired();
        }

        else {
            this.formLand = this.fb.group({
                cpm2 : [ {value: this.codigoPredio,disabled:this.readOnly}],
                ubigeo: [ {value:this.landModel?.ubigeo,disabled:this.readOnly,}, [Validators.required]],
                cpm : [ {value:this.landModel?.cpm,disabled:this.readOnly}, ],
                resolutionType : [ {value:this.landModel?.resolutionType,disabled:this.readOnly}, [Validators.required]],
                resolutionDocument : [ {value:this.landModel?.resolutionDocument,disabled:this.readOnly}, [Validators.required]],
                uuType: [{value: this.landModel?.uuType,disabled:this.readOnly }],
                codUu: [ { value: this.landModel?.codUu,disabled: this.readOnly}],
                habilitacionName: [{value: this.landModel?.habilitacionName, disabled: this.readOnly}],
                codStreet: [{value: this.landModel?.codStreet,disabled: this.readOnly}],
                streetType: [{value: this.landModel?.streetType,disabled:this.readOnly}, [Validators.required]],
                streetName: [{value: this.landModel?.streetName,disabled: this.readOnly}, [Validators.required]],
                urbanMza: [{value:this.landModel?.urbanMza,disabled:this.readOnly} , [Validators.required]],
                urbanLotNumber: [{value: this.landModel?.urbanLotNumber,disabled:this.readOnly}, [Validators.required]],
                block: [{value:this.landModel?.block,disabled:this.readOnly}],
                indoor: [{value:this.landModel?.indoor,disabled:this.readOnly}],
                floor: [{value:this.landModel?.floor,disabled:this.readOnly}],
                km: [{value:this.landModel?.km,disabled:this.readOnly}],
                municipalNumber:[{value:this.landModel?.municipalNumber,disabled:this.readOnly}],
                apartmentNumber:[{value:this.landModel?.apartmentNumber,disabled:this.readOnly}],
              });
              //this.toggleRequired();
        }
        console.log('formLand>>',this.formLand);
        console.log('formLand.valid>>',this.formLand.valid);


      }

      cpmValidator(control: AbstractControl): {[s: string ]: boolean} {

        const group = control.parent;
        /*if (!group.controls['cpm'].value) {
            return null;
        }*/

        if (!group  ) {

            return null;

          /*console.log(group.controls['cpm'].value);
          console.log('cpm2>>',group.controls['cpm2'].value);*/
        }

        else{
            console.log(group.controls['cpm']);
        }

        if(group.controls['cpm'].value===group.controls['cpm2'].value)
            {return {'cpm': true}; }
        else
            {return null;}
      }

      ngOnInit(): void {
        this.init();

      }

      save(): void{
        //results{}
        if(this.action!== Actions.LEER){

            const codUu=this.formLand.get('codUu').value;
            const urbanMza=this.formLand.get('urbanMza').value;
            const urbanLotNumber=this.formLand.get('urbanLotNumber').value;
            const cantRepetidos=
            this.landRecords.filter(r=>  r.codUu === codUu && r.urbanMza === urbanMza && r.urbanLotNumber===urbanLotNumber ).length
            + this.results.filter(r=>  r.codUu === codUu && r.urbanMza === urbanMza && r.urbanLotNumber===urbanLotNumber ).length;

            if(cantRepetidos>0){
                const diag=this.confirmationService.error(
                    'Registro de predio',
                    'Existe un lote urbano con la misma denominación, dentro del mismo ámbito de unidad urbana y manzana urbana.Desea continuar con el registro?'
                  );

                  diag.afterClosed().subscribe((option)=>{
                    if(option==='confirmed'){
                        this.dialogRef.close(this.formLand.value);
                    }

                  });

            }

            else{
                this.dialogRef.close(this.formLand.value);
            }


        }
        else{
            this.dialogRef.close();
        }

      }

      toggleRequired(): void {
        const municipalNumberControl = this.formLand.get('municipalNumber');
        const  urbanMzaControl = this.formLand.get('urbanMza');
        const urbanLotNumberControl = this.formLand.get('urbanLotNumber');

        if (municipalNumberControl && municipalNumberControl.value) {
          if (municipalNumberControl.value!=='') {
            urbanMzaControl.clearValidators();
            urbanLotNumberControl.clearValidators();
          } else {
            urbanMzaControl.setValidators(Validators.required);
            urbanLotNumberControl.setValidators(Validators.required);
          }
          urbanMzaControl.updateValueAndValidity();
          urbanLotNumberControl.updateValueAndValidity();
        }



        if (urbanMzaControl && urbanMzaControl.value && urbanMzaControl && urbanMzaControl.value ) {
          if (urbanMzaControl.value!=='') {
            municipalNumberControl.clearValidators();
          } else {
            municipalNumberControl.setValidators(Validators.required);
          }
          municipalNumberControl.updateValueAndValidity();

        }


      }



}
