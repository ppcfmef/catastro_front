import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { LandUI } from '../../interfaces/land.interface';


@Component({
  selector: 'app-land-maintenance-desactivate',
  templateUrl: './land-maintenance-desactivate.component.html',
  styleUrls: ['./land-maintenance-desactivate.component.scss']
})
export class LandMaintenanceDesactivateComponent implements OnInit {
land: LandUI;
fileName: string;
file: any;
//fileEventEmit: EventEmitter<any>;
  constructor( public dialogRef: MatDialogRef<LandMaintenanceDesactivateComponent>,
     @Inject(MAT_DIALOG_DATA) public data: any,) {
        if(this.data && this.data.land){
            this.land= this.data.land;

        }
    }

  ngOnInit(): void {
  }

  save(): void{
    this.dialogRef.close({option: true,file: this.file});
  }

  close(): void{
    this.dialogRef.close({option: false});
  }
  fileUpload(file: any): void{

    this.file = file;

  }
}
