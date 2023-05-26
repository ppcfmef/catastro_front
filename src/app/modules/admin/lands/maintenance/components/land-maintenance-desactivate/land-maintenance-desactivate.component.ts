import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LandUI } from '../../interfaces/land.interface';

@Component({
  selector: 'app-land-maintenance-desactivate',
  templateUrl: './land-maintenance-desactivate.component.html',
  styleUrls: ['./land-maintenance-desactivate.component.scss']
})
export class LandMaintenanceDesactivateComponent implements OnInit {
land: LandUI;
  constructor( public dialogRef: MatDialogRef<LandMaintenanceDesactivateComponent>,
     @Inject(MAT_DIALOG_DATA) public data: any,) {
        if(this.data && this.data.land){
            this.land= this.data.land;
        }
    }

  ngOnInit(): void {
  }

  save(): void{
    this.dialogRef.close(true);
  }

  close(): void{
    this.dialogRef.close(false);
  }

}
