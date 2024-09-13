import { Component, OnInit ,Inject, OnChanges, OnDestroy, } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-notificacion-modal',
  templateUrl: './notificacion-modal.component.html',
  styleUrls: ['./notificacion-modal.component.scss']
})
export class NotificacionModalComponent implements OnInit {
  texto1: string;
  texto2: string;

  texto =`Tenga  en  cuenta  que  el  incumplimiento  de  presentar  las  declaraciones  que  contengan  la  determinación  de  la  deuda  tributaria  dentro  de  los
  plazos  establecidos,  así  como  presentar  otras  declaraciones  o  comunicaciones  de  manera  incompleta  o  no  conformes  con  la  realidad,
  constituyen faltas según lo establecido en el Artículo 176, Numerales 1 y 4 del Código Tributario. Las sanciones por estas faltas pueden variar
  desde  el  30%  hasta  el  50%  de  la  UIT.  Para  lo  cual  tiene  5  días  hábiles  para  apersonase  a`;

  textoFinal ='bajo apercibimiento de iniciar el procedimiento de fiscalización y sanción.';

  constructor(
    public dialogRef: MatDialogRef<NotificacionModalComponent>,
    @Inject(MAT_DIALOG_DATA) public dataDialog: any,
    //@Inject(MAT_DIALOG_DATA)public dataDialog: any,
    )
     {


     }


      save(): void{
        this.dataDialog.textoEditar = `${this.texto} ${this.texto1} o  comunicarse a ${this.texto2} ${this.textoFinal}`;
        this.dialogRef.close( this.dataDialog.textoEditar);
      }
        ngOnInit(): void {
            //this.data =' las ventanillas Nro 7 a 9';
        }

}
