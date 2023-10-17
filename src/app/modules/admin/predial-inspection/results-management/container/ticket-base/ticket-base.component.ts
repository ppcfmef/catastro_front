import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageProviderService } from 'app/shared/services/message-provider.service';
import { ModalComponent } from '../../components/modal/modal.component';
import { UbicacionService } from '../../services/ubicacion.service';
import { IUbicacion } from '../../interfaces/ubicacion.interface';
import { TicketStatus } from 'app/shared/enums/ticket-status.enum';
import { ResultsService } from '../../services/results.service';
import { Estado } from 'app/shared/enums/estado-map.enum';
import { CustomConfirmationService } from 'app/shared/services/custom-confirmation.service';
import { CFPuntoImagenModel } from '../../models/cfpuntoimagen.model';
import { IPredio } from '../../interfaces/predio.interface';
import { CFPuntoImagenService } from '../../services/cfpuntoimagen.service';
import { Router } from '@angular/router';
import { CFPredioService } from '../../services/cfpredio.service';
import { CFPredioModel } from '../../models/cfpredio.model';
import { TypeModifier } from '@angular/compiler/src/output/output_ast';
import { TypePoint } from 'app/shared/enums/type-point.enum';

@Component({
  selector: 'app-ticket-base',
  templateUrl: './ticket-base.component.html',
  styleUrls: ['./ticket-base.component.scss']
})
export class TicketBaseComponent implements OnInit {
  utm=17;
  dataPoint: { point: any; type: string };
  dialogRef = null;
    ubicacion: IUbicacion;
    data = {
      codPre:'eee',
        dni: '48556932',
        name: 'Mario Palomino Pancca',
        email: 'mario@gmail.com',
        phone: '985622230',
        state:0
    };

    //este componente es para los casos punto de imagen y predio sin geo para predios sin geo accept debe ser true ;
    accept: boolean = true;

    hidden: boolean = true;
    predio: IPredio;
    puntoImagenDisabled: boolean= true;
    predioButtonDisabled: boolean= true;
    /*puntoImagenButtonShow: boolean= false;
    predioButtonShow: boolean= false;*/
  constructor(
    private _messageProviderService: MessageProviderService,
    private _ubicacionService: UbicacionService,
    private _resultsService: ResultsService,
    private _confirmationService: CustomConfirmationService,
    private _cfpuntoImagenService: CFPuntoImagenService,
    private _cfpredioService: CFPredioService,
    private _router: Router,
    ) {

     }


  ngOnInit(): void {

    const idUbicacion=localStorage.getItem('idUbicacion')?localStorage.getItem('idUbicacion'):'0';
    this._ubicacionService.get(parseInt(idUbicacion,10)).subscribe( (data: IUbicacion) =>{
      this.predio=data.registroTitularidad[0].predio;
      this.ubicacion =data;
      this.data.dni = this.predio?.contribuyente?.docIden;
      this.data.name = `${this.predio?.contribuyente?.nombre} ${this.predio?.contribuyente?.apPat} ${this.predio?.contribuyente?.apMat}`;
      this.data.email ='';
      this.data.phone ='';
      console.log('this.ubicacion.codEstado>>>',this.ubicacion.estado);
      this.hidden = (this.ubicacion.estado===TicketStatus.RESUELTO_GESTION_RESULTADOS)?true:false;
      this._resultsService.setUbicacionData(this.ubicacion);
      this._resultsService.setEstado(Estado.EDITAR);
    });

    this._resultsService.getPoint().subscribe( (res: any)=>{
        this.dataPoint = res;
        if(this.dataPoint.type === TypePoint.PUNTO_IMAGEN){
          this.puntoImagenDisabled= false;
          this.predioButtonDisabled = true;
        }

        else if(this.dataPoint.type === TypePoint.LOTE){
          this.puntoImagenDisabled= true;
          this.predioButtonDisabled = false;
        }

    });

  }


  aprobarTicket(): void {
    //this.hidden = true;
    const dialogRef = this._confirmationService.info(
      'Guardar',
      'Esta seguro de aprobar la ubicacion?'
    );

    /*this.dialogRef = this._confirmationService.info(
      'Guardar',
      'Esta seguro de guardar el punto para trabajo de campo?'
  );*/
    dialogRef.afterClosed().subscribe((result: any) => {

      if(result && result.option){
        console.log(result.data);
      }

    });
    //this._resultsService.setEstado(Estado.EDITAR);
  }

  obsTicket(): void {
    const dialogRef = this._messageProviderService.showModal(ModalComponent,{width:430} );
    dialogRef.afterClosed().subscribe((result: any) => {

      if(result && result.option){
        console.log(result.data);
      }

    });

  }



  generarPuntoImagen(event: any): void {
    if (!this.dataPoint) {
        this._confirmationService.info(
            'Alerta',
            'Por favor seleccione un punto de referencia'
        );
    }  else if (
        this.dataPoint
    ) {
        this.dialogRef = this._confirmationService.info(
            'Guardar',
            'Esta seguro de guardar el punto para trabajo de campo?'
        );

        this.dialogRef
            .afterClosed()
            .toPromise()
            .then((option) => {
                if (option === 'confirmed') {
                    const puntoImagen = new CFPuntoImagenModel(
                        this.dataPoint.point
                    );
                    //puntoImagen.COD_PRE = this.land.cpm;
                    puntoImagen.UBIGEO = this.ubicacion.ubigeo;
                    puntoImagen.COD_VIA = this.ubicacion.codVia;
                    puntoImagen.NUM_MUN = this.ubicacion.numMun;
                    puntoImagen.MZN_URB = this.ubicacion.mznUrb;
                    puntoImagen.LOT_URB = this.ubicacion.lotUrb;
                    puntoImagen.COD_UU = this.ubicacion.codUU;
                    puntoImagen.TIPO_UU = this.ubicacion.codTipoUU;
                    puntoImagen.KM = this.ubicacion.km;
                    puntoImagen.NOM_UU = this.ubicacion.nomUU;
                    puntoImagen.NOM_VIA = this.ubicacion.nomVia;
                    puntoImagen.COD_PRE = this.predio.codPre;
                    puntoImagen.PISO=this.predio.piso;
                    puntoImagen.TIP_DOC=this.predio.contribuyente.tipDoc;
                    puntoImagen.AP_MAT=this.predio.contribuyente.apMat;
                    puntoImagen.AP_PAT=this.predio.contribuyente.apPat;
                    puntoImagen.DOC_IDEN =this.predio.contribuyente.docIden;
                    puntoImagen.DIR_FISCAL = this.predio.contribuyente.dirFiscal;
                    puntoImagen.INTERIOR = this.predio.interior;
                    puntoImagen.BLOCK = this.predio.block;
                    puntoImagen.PISO=this.predio.piso;
                    puntoImagen.COD_PRE = this.predio.codPre;
                    puntoImagen.NOM_USER = '';
                    puntoImagen.NOM_PC = 'PLATAFORMA';

                    puntoImagen.REFERENCIA = this.ubicacion.nomRef;
                    this._cfpuntoImagenService.getMaxSecuen(this.ubicacion.ubigeo).then((res)=>{

                      const secuen=res+1;
                      const idImg=`i${this.utm}${this.ubicacion.ubigeo}${secuen}`;
                      puntoImagen.ID_IMG = idImg;
                      puntoImagen.SECUEN =secuen;


                      this._cfpuntoImagenService
                      .crearPunto(puntoImagen)
                      .then((result) => {
                          if (result) {
                            this._confirmationService
                            .success(
                                'Exito',
                                'punto guardado'
                            )
                            .afterClosed()
                            .toPromise()
                            .then((e) => {
                                /*this._router.navigate([
                                './land-inspection/gap-analysis/geo',
                                ]);*/
                            });


                          }
                      });
                    });
                }
            });
    }
}




generarPredio(event: any): void {
    if (!this.dataPoint) {
        this._confirmationService.info(
            'Alerta',
            'Por favor seleccione un punto '
        );
    }  else if (
        this.dataPoint
    ) {
        this.dialogRef = this._confirmationService.info(
            'Guardar',
            'Esta seguro de asignar el predio?'
        );

        this.dialogRef
            .afterClosed()
            .toPromise()
            .then((option) => {
                if (option === 'confirmed') {
                    this._cfpredioService
                        .generateMaxCPU(this.dataPoint.point)
                        .then((res) => {
                            const predio = new CFPredioModel(
                                this.dataPoint.point
                            );

                            if (res && res.COD_CPU) {
                                predio.UBIGEO = this.ubicacion.ubigeo;
                                predio.COD_PRE = this.predio.codPre;
                                predio.COD_CPU = res.COD_CPU;
                                predio.NOM_USER = '';
                                predio.NOM_PC = 'PLATAFORMA';
                                                    //puntoImagen.NOM_USER = this.user.username;

                                /*this.predio.codCPU = res.COD_CPU;
                                this.predio.longitude = predio.COORD_X;
                                this.predio.latitude = predio.COORD_Y;
                                this.land.statusGapAnalisys =
                                    LandGeorreferencingStatusGapAnalisys.UBICADO_CON_PREDIO;
                                this.land.status =
                                    LandStatus.CON_CARTOGRAFIA_LOTE;
                                this.land =
                                    FormUtils.deleteKeysNullInObject(
                                        this.land
                                    );*/
                                this._cfpredioService
                                    .crearPredio(predio)
                                    .then((result) => {
                                      if (result) {
                                        this._confirmationService
                                        .success(
                                            'Exito',
                                            'punto guardado'
                                        )
                                        .afterClosed()
                                        .toPromise()
                                        .then((e) => {
                                            /*this._router.navigate([
                                            './land-inspection/gap-analysis/geo',
                                            ]);*/
                                        });
                                    }
                                  });
                            }
                        });
                }
            });
    }
}



  action(): void {
    if(this.accept){
        console.log('generar punto de imagen');
    }else {
        console.log('validar ubicacion');
    }
  }
  actionTwo(): void {
    if(this.accept){
        console.log('Generar predio');
    }else {
        console.log('Nueva dirección');
    }
  }

  onClickPosition(event: any): void {
    console.log('event>>',event);
    this._resultsService.setUbicacionData(event);

  }
  /*onClickPosition(event: any): void {
    this.clickPosition.emit(event);
  }*/
}
