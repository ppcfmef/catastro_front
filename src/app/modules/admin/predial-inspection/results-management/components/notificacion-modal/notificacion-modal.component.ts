import { Component, OnInit ,Inject, OnChanges, OnDestroy, } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-notificacion-modal',
  templateUrl: './notificacion-modal.component.html',
  styleUrls: ['./notificacion-modal.component.scss']
})
export class NotificacionModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<NotificacionModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    )
     {


     }


      save(): void{
        this.dialogRef.close( this.data);
      }
        ngOnInit(): void {
            this.data =' las ventanillas Nro 7 a 9';
        }

}
