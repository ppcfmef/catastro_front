import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
@Component({
  selector: 'app-land-maintenance-form',
  templateUrl: './land-maintenance-form.component.html',
  styleUrls: ['./land-maintenance-form.component.scss']
})
export class LandMaintenanceFormComponent implements OnInit {
    ubigeo: string;
    formLand: FormGroup;
    landModel = new LandModel();
    masterDomain: MasterDomain;
    readOnly= false;
    action: string;
    districts: District[];
    private unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private landRegistryService: LandRegistryService,

        //public dialogRef: MatDialogRef<HistoricalRecordDetailComponent>,
        private fb: FormBuilder,
        private _districtService: DistrictService,
        //private _commonService: CommonService,
        public dialogRef: MatDialogRef<LandMaintenanceFormComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,

      ) {

        this.landModel= new LandModel();
        console.log('landModel>>',this.landModel);


        if(data){
            this.landModel=(data && data.land)? new LandModel(data.land): new LandModel();
            this.action=(data && data.action)?data.action:'';

            if(this.action=== Actions.LEER){
                this.readOnly=true;
            }

            this.ubigeo = (data && data.ubigeo)?data.ubigeo:null;
            if(this.ubigeo){
                this._districtService.getDistrict(this.ubigeo).subscribe((result: any)=>{
                    this.districts = [result];
                    console.log('ubigeos>>>',result);
                    this.landModel.ubigeo = this.ubigeo;
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
            this.initForm();

        });
      }

      initForm(): void{
        this.formLand = this.fb.group({
            ubigeo: [ {value:this.landModel?.ubigeo,disabled:this.readOnly,}, [Validators.required]],
            cpm : [ {value:this.landModel?.cpm,disabled:this.readOnly}, [Validators.required]],
            resolutionType : [ {value:this.landModel?.resolutionType,disabled:this.readOnly}, [Validators.required]],
            resolutionDocument : [ {value:this.landModel?.resolutionDocument,disabled:this.readOnly}, [Validators.required]],
            uuType: [{value: this.landModel?.uuType,disabled:this.readOnly }],
            codUu: [ { value: this.landModel?.codUu,disabled: this.readOnly}],
            habilitacionName: [{value: this.landModel?.habilitacionName, disabled: this.readOnly}],
            codStreet: [{value: this.landModel?.codStreet,disabled: this.readOnly}],
            streetType: [{value: this.landModel?.streetType,disabled:this.readOnly}],
            streetName: [{value: this.landModel?.streetName,disabled: this.readOnly}],
            urbanMza: [{value:this.landModel?.urbanMza,disabled:this.readOnly}],
            urbanLotNumber: [{value: this.landModel?.urbanLotNumber,disabled:this.readOnly}],
            block: [{value:this.landModel?.block,disabled:this.readOnly}],
            indoor: [{value:this.landModel?.indoor,disabled:this.readOnly}],
            floor: [{value:this.landModel?.floor,disabled:this.readOnly}],
            km: [{value:this.landModel?.km,disabled:this.readOnly}],
            municipalNumber:[{value:this.landModel?.municipalNumber,disabled:this.readOnly}],
            apartmentNumber:[{value:this.landModel?.apartmentNumber,disabled:this.readOnly}],
          });
      }
      ngOnInit(): void {
        this.init();

      }

      save(): void{
        //results{}
        if(this.action!== Actions.LEER){
            this.dialogRef.close(this.formLand.value);
        }
        else{
            this.dialogRef.close();
        }

      }


}
