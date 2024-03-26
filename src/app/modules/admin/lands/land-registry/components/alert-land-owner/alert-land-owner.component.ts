import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-alert-land-owner',
  templateUrl: './alert-land-owner.component.html',
  styleUrls: ['./alert-land-owner.component.scss']
})
export class AlertLandOwnerComponent {
    owners: any[];
    dataSource: any[];
    displayedColumns =['dni','name'];
    constructor(

        public dialogRef: MatDialogRef<AlertLandOwnerComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,

      ) {
        this.dataSource =data.owners;
        this.owners=data.owners;
      }
    continuar(): void{
        this.dialogRef.close('confirmed');
    }

    close(): void{
        this.dialogRef.close();
    }

    /*const dialogRef = this.dialog.open(LandMaintenanceFormComponent, {
        //data: {action:Actions.CREAR,ubigeo:this.landRecords[0].ubigeo},
        data: {action:Actions.CREAR,land:this.landRecords[0], landRecords:this.landRecords,results:this.results },
        width: '600px',
        height:'100%'
      });*/
}
