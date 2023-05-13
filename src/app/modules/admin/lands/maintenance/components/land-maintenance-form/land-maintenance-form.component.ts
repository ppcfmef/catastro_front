import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { MasterDomain } from '../../../land-registry/interfaces/master-domain.interface';
import { LandRegistryService } from '../../../land-registry/services/land-registry.service';
import { LandModel } from '../../models/land.model';
import { takeUntil } from 'rxjs/operators';
import { Actions } from 'app/shared/enums/actions.enum';
@Component({
  selector: 'app-land-maintenance-form',
  templateUrl: './land-maintenance-form.component.html',
  styleUrls: ['./land-maintenance-form.component.scss']
})
export class LandMaintenanceFormComponent implements OnInit {
    formLand: FormGroup;
    landModel = new LandModel();
    masterDomain: MasterDomain;
    readOnly= false;
    private unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private landRegistryService: LandRegistryService,
        //public dialogRef: MatDialogRef<HistoricalRecordDetailComponent>,
        private fb: FormBuilder,
        public dialogRef: MatDialogRef<LandMaintenanceFormComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
      ) {

        console.log('landModel>>',this.landModel);
        if(data){
            this.landModel=(data && data.land)? new LandModel(data.land): new LandModel();
            const action=(data && data.action)?data.action:'';

            if(action=== Actions.LEER){
                this.readOnly=true;
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
            ubigeo: [ {value:this.landModel?.ubigeo,disabled:this.readOnly}],
            resolutionType : [ {value:this.landModel?.resolutionType,disabled:this.readOnly}],
            resolutionDocument : [ {value:this.landModel?.resolutionDocument,disabled:this.readOnly}],
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
        this.dialogRef.close();
      }


}
