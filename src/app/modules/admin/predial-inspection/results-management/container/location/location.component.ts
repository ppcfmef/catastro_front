/* eslint-disable max-len */
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, Type } from '@angular/core';
import { MessageProviderService } from 'app/shared/services/message-provider.service';
import { ModalComponent } from '../../components/modal/modal.component';
import { UbicacionService } from '../../services/ubicacion.service';
import { IUbicacion } from '../../interfaces/ubicacion.interface';
import { TicketStatus } from 'app/shared/enums/ticket-status.enum';
import { ResultsService } from '../../services/results.service';
import { Estado } from 'app/shared/enums/estado-map.enum';
import { CustomConfirmationService } from 'app/shared/services/custom-confirmation.service';
import { CFPuntoImagenModel } from '../../models/cfpuntoimagen.model';
import { IPredioInspeccion } from '../../interfaces/predio-inspeccion.interface';
import { CFPuntoImagenService } from '../../services/cfpuntoimagen.service';
import { Router } from '@angular/router';
import { CFPredioService } from '../../services/cfpredio.service';
import { CFPredioModel } from '../../models/cfpredio.model';
import { TypePoint } from 'app/shared/enums/type-point.enum';
import { ITicket } from '../../interfaces/ticket.interface';
import { TypeGap } from 'app/shared/enums/type-gap.enum';
import { IRegistroTitularidad } from '../../interfaces/registro-titularidad.interface';
import { TicketService } from '../../services/ticket.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import moment from 'moment';
import { User } from 'app/core/user/user.types';
import { DistrictResource } from 'app/core/common/interfaces/common.interface';
import { PrevisualizacionComponent } from '../previsualizacion/previsualizacion.component';
import { CommonService } from 'app/core/common/services/common.service';
import { RegistroTitularidadService } from '../../services/registro-titularidad.service';
import { PredioInpeccionService } from '../../services/predio-inspeccion.service';
import { FormUtils } from 'app/shared/utils/form.utils';
import { SuministroService } from '../../services/suministro.service';
import { FormatUtils } from 'app/shared/utils/format.utils';
import { CommonUtils } from 'app/core/common/utils/common.utils';
import { CFLoteService } from '../../services/cflote.service';
import { CFLoteModel } from '../../models/cflote.model';
import { CFTicketService } from '../../services/cfticket.service';
import { forkJoin } from 'rxjs';
import { PredioPadronService } from '../../services/predio-padron.service';
import { NotificacionModalComponent } from '../../components/notificacion-modal/notificacion-modal.component';
import { saveAs } from 'file-saver';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { FuseSplashScreenModule, FuseSplashScreenService } from '@fuse/services/splash-screen';
moment.locale('es');

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit , OnChanges {
  @Input() ubigeo: string;
  @Input() ticket: ITicket;
  @Input() user: User;
  @Input() distrito: DistrictResource;
  /*@Output() eventResetMap: EventEmitter<any> = new EventEmitter();*/
  @Input() ubicacion: IUbicacion;
  @Output() eventUpdateLocation: EventEmitter<any> = new EventEmitter();
  @Output() eventCloseLocation: EventEmitter<any> = new EventEmitter();

    items =[
        {
            tipo:0,
            codCase: '00986',
            firstname: 'Jhon',
            lastname:'Perez',
            dni:'44458926',
            state:0,
        },
        {
            tipo:1,
            codCase: '00987',
            firstname: 'Jhon',
            lastname:'Perez',
            dni:'44458926',
            state:0,
        },
        {
            tipo:2,
            codCase: '2010525888',
            firstname: 'Jhon',
            lastname:'Perez',
            dni:'44458926',
            state:0,
        },
        {
            tipo:3,
            codCase: '20158968552',
            firstname: 'Jhon',
            lastname:'Perez',
            dni:'44458926',
            state:1,
        },
    ];
    utm=17;
    dataPoint: { point: any; type: string };
    puntoImagenDisabled: boolean= true;
    predioButtonDisabled: boolean= true;
    appButtonDisabled: boolean= true;
    obsButtonDisabled: boolean= false;
    /*typeGap= this.;*/

    dialogRef: any;
    predio: IPredioInspeccion;
    codTipoTicket =0;
    view: any;
    /*distrito: DistrictResource;*/

  constructor(
    private _messageProviderService: MessageProviderService,
    private _ubicacionService: UbicacionService,
    private _resultsService: ResultsService,
    private _confirmationService: CustomConfirmationService,
    private _cfpuntoImagenService: CFPuntoImagenService,
    private _cfpredioService: CFPredioService,
    private _cfloteService: CFLoteService,
    private _router: Router,
    private _ticketService: TicketService,
    private _commonService: CommonService,
    private _registroTitularidadService: RegistroTitularidadService,
    private _predioInspeccionService: PredioInpeccionService,
    private _suministroService: SuministroService,
    private _cfTicketService: CFTicketService,
    private _predioPadronService: PredioPadronService,
    private _fuseSplashScreenService: FuseSplashScreenService
    ) {
        pdfMake.vfs = pdfFonts.pdfMake.vfs;


    }
    ngOnChanges(changes: SimpleChanges): void {

        if (this.ticket && this.ubicacion){
            this.codTipoTicket=this.ticket.codTipoTicket?this.ticket.codTipoTicket:0;


             this._resultsService.getPoint().subscribe( (res: any)=>{
                 this.dataPoint = res;
                 if(this.dataPoint.type === TypePoint.PUNTO_IMAGEN){
                     if (   [TypeGap.PREDIO_SIN_GEORREFERENCIACION,TypeGap.PUNTOS_LOTE_SIN_PREDIO,TypeGap.PUNTO_IMAGEN].includes(this.ticket.codTipoTicket))
                     {
                       this.puntoImagenDisabled= false;
                       this.predioButtonDisabled = true;
                     }


                 }

                 else if(this.dataPoint.type === TypePoint.NUEVO_PUNTO_CAMPO){
                    this.predioButtonDisabled = false;
                  }


                 else if(this.dataPoint.type === TypePoint.LOTE){
                   this.puntoImagenDisabled= true;
                   this.predioButtonDisabled = false;
                 }

             });

             this.getStatusButton();


        }

    }



  ngOnInit(): void {

    this.user=localStorage.getItem('user')?JSON.parse(localStorage.getItem('user')):null;
    console.log('this.user>>',this.user);

    this._resultsService.getView().subscribe((view) =>{
        console.log('view subscribe>>',view);
        this.view = view;
    });
  }

  onClickAprTicket(): void {
    this.dialogRef = this._confirmationService.info(
      'Guardar',
      'Esta seguro de aprobar la ubicacion?'
    );

    this.dialogRef.afterClosed().subscribe((result: any) => {
      console.log(result);
      if(result && result==='confirmed'){
        //console.log(result.data);
        this.ubicacion.status = TicketStatus.RESUELTO_GESTION_RESULTADOS;
        this._ubicacionService.update(this.ubicacion.codUbicacion,{status:TicketStatus.RESUELTO_GESTION_RESULTADOS}).subscribe(res=>{
            this.updateLocation(this.ubicacion,this.ticket.nroNotificacion);
            if(this.ticket.codTipoTicket ===TypeGap.MANZANA_SIN_LOTES){
                this.eventCloseLocation.emit(this.ubicacion);
            }

        });
      }

    });
  }



  onClickObsTicket(): void {
    this.dialogRef = this._messageProviderService.showModal(ModalComponent,{width:600} );
    this.dialogRef.afterClosed().subscribe((result: any) => {
      console.log('result obs',result);
      if(result && result.option){
        //console.log(result.data);
        this.ubicacion.obsUbicacion= result.data;
        /*this.ubicacion.status = TicketStatus.OBSERVADO_GESTION_RESULTADOS;*/

        this.ubicacion.status = TicketStatus.OBSERVADO_GESTION_RESULTADOS;
        const data = CommonUtils.deleteKeysNullInObject( {
            status:TicketStatus.OBSERVADO_GESTION_RESULTADOS,
            obsUbicacion: result?.data,
            fileObs:result?.file
        });

        console.log('data obs>>>',data);
        this._ubicacionService.updateObs(this.ubicacion.codUbicacion,data).subscribe((res)=>{
            if(this.ticket.codTipoTicket === TypeGap.MANZANA_SIN_LOTES  ){
                const requestArray =this.ubicacion.registrosTitularidad.map((r)=> this._registroTitularidadService.update(r.codTit,{status:TicketStatus.OBSERVADO_GESTION_RESULTADOS}));
                /*this._registroTitularidadService.update();*/
                forkJoin(requestArray).subscribe((results) => {

                    this.updateLocation(this.ubicacion);
                    if(this.ticket.codTipoTicket ===TypeGap.MANZANA_SIN_LOTES){
                        this.eventCloseLocation.emit(this.ubicacion);
                    }
                  });

            }


            else if(this.ticket.codTipoTicket === TypeGap.PUNTOS_LOTE_SIN_PREDIO ){
                const requestArray =this.ubicacion.registrosTitularidad.map((r)=> this._registroTitularidadService.update(r.codTit,{status:TicketStatus.OBSERVADO_GESTION_RESULTADOS}));
                /*this._registroTitularidadService.update();*/
                forkJoin(requestArray).subscribe((results) => {
                    //this.actualizarCFTicket(this.ticket.codTicket,TicketStatus.OBSERVADO_GESTION_RESULTADOS);
                    this.updateLocation(this.ubicacion);
                    /*this._router.navigate([
                        './land-inspection/results-management',
                        ]);*/


                  });

                /*this._registroTitularidadService.update(this.ubicacion.registrosTitularidad[0].codTit,{status:TicketStatus.OBSERVADO_GESTION_RESULTADOS}).subscribe((r2)=>{

                    this._ticketService.update(this.ticket.codTicket,{codEstTrabajoTicket:TicketStatus.OBSERVADO_GESTION_RESULTADOS}).subscribe(r=>{

                        this.actualizarCFTicket(this.ticket.codTicket,TicketStatus.OBSERVADO_GESTION_RESULTADOS);

                        this.updateLocation(this.ubicacion);
                        this._router.navigate([
                          './land-inspection/results-management',
                          ]);
                    });


                  });*/
            }


            else {

            this._registroTitularidadService.update(this.ubicacion.registrosTitularidad[0].codTit,{status:TicketStatus.OBSERVADO_GESTION_RESULTADOS}).subscribe((r2)=>{

                this._ticketService.update(this.ticket.codTicket,{codEstTrabajoTicket:TicketStatus.OBSERVADO_GESTION_RESULTADOS}).subscribe(r=>{
                    this.actualizarCFTicket(this.ticket.codTicket,TicketStatus.OBSERVADO_GESTION_RESULTADOS);
                    this.updateLocation(this.ubicacion);
                    this._router.navigate([
                    './land-inspection/results-management',
                    ]);



                });
                /*this._ubicacionService.update(this.ubicacion.codUbicacion,{status:TicketStatus.OBSERVADO_GESTION_RESULTADOS}).subscribe( (res: any) =>{


                });*/

            });
        }




});

      }

    });
  }


actualizarCFTicket(codTicket: string, estado: any): void{
    console.log('actualizarCFTicket...');
    this._cfTicketService.getTicket({'COD_TICKET':codTicket, 'ESTADO_V':1}).then((responseJson)=>{
        console.log('responseJson>>',responseJson);
        if (responseJson && responseJson.features) {
            const features: any[] = responseJson.features;

            const id=features[0].attributes['OBJECTID'];

            this._cfTicketService.updateTicket({'OBJECTID':id, 'ESTADO':estado}).then((response)=>{
                console.log('return actualizar CF Ticket',response);
            });
        }

    });

}

resolverPredio(): void{
    if ([TypeGap.PREDIO_SIN_GEORREFERENCIACION,TypeGap.PUNTO_IMAGEN,TypeGap.PREDIO_SUBVALUADO].includes(this.ticket.codTipoTicket)){
        this.ubicacion.status = TicketStatus.RESUELTO_GESTION_RESULTADOS;
        this._ubicacionService.update(this.ubicacion.codUbicacion,{status:TicketStatus.RESUELTO_GESTION_RESULTADOS}).subscribe( (res) =>{
            this.updateLocation(this.ubicacion);
            this._ticketService.update(this.ticket.codTicket,{codEstTrabajoTicket:TicketStatus.RESUELTO_GESTION_RESULTADOS}).subscribe(r=>{
                this.actualizarCFTicket(this.ticket.codTicket,TicketStatus.RESUELTO_GESTION_RESULTADOS);
                this._router.navigate([
                  './land-inspection/results-management',
                  ]);
              });
            //this.updateIicket(this.ticket);
        });
    }
    else{
        this.updateLocation(this.ubicacion);
    }


}


  generarPuntoImagen(data: IRegistroTitularidad): void {
    this.predio = data.predioInspeccion;
    if (!this.dataPoint) {
        this._confirmationService.error(
            'Alerta',
            'Por favor seleccione un punto de referencia'
        );
    }  else if (
        this.dataPoint
    ) {
        this.dialogRef = this._confirmationService.info(
            'Guardar',
            'Esta seguro de guardar el punto imagen?'
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
                    puntoImagen.TIPO_UU = this.ubicacion.codTipoUu;
                    puntoImagen.KM = this.ubicacion.km;
                    puntoImagen.NOM_UU = this.ubicacion.nomUu;
                    puntoImagen.NOM_VIA = this.ubicacion.nomVia;
                    puntoImagen.COD_PRE = this.predio.codPre;
                    puntoImagen.PISO=this.predio.piso;
                    puntoImagen.TIP_DOC=this.predio.predioContribuyente[0].contribuyente.tipDoc;
                    puntoImagen.AP_MAT=this.predio.predioContribuyente[0].contribuyente.apMat;
                    puntoImagen.AP_PAT=this.predio.predioContribuyente[0].contribuyente.apPat;
                    puntoImagen.DOC_IDEN =this.predio.predioContribuyente[0].contribuyente.docIden;
                    puntoImagen.DIR_FISCAL = this.predio.predioContribuyente[0].contribuyente.dirFiscal;
                    puntoImagen.INTERIOR = this.predio.interior;
                    puntoImagen.BLOCK = this.predio.block;
                    puntoImagen.PISO=this.predio.piso;

                    puntoImagen.NOM_USER = '';
                    puntoImagen.NOM_PC = 'PLATAFORMA';

                    puntoImagen.REFERENCIA = this.ubicacion.nomRef;


                    data.status =1;

                    const index=this.ubicacion.registrosTitularidad.findIndex(r=>data.id===r.id);
                    this.ubicacion.registrosTitularidad[0]= data;
                    this._cfpuntoImagenService.getMaxSecuen(this.ubicacion.ubigeo).then((res)=>{

                      const secuen=res+1;
                      const idImg=`i${this.utm}${this.ubicacion.ubigeo}${secuen}`;
                      puntoImagen.ID_IMG = idImg;
                      puntoImagen.SECUEN =secuen;


                      this._ubicacionService.update(this.ubicacion.id,this.ubicacion).subscribe( (r)=>{
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

                                const requestArray =
                                [
                                 this._predioPadronService.updateLand(data.predioPadron.id,{idCartographicImg: idImg})
                                ];

                                forkJoin(requestArray).subscribe((results) => {
                                    this.resolverPredio();
                                    this.getStatusButton();
                                    this._resultsService.setResetMap(2);
                                    this._resultsService.setEstado(Estado.LEER);

                                  });


                               /* this.resolverPredio();
                                this.ubicacion= r;
                                this.getStatusButton();
                                this._resultsService.setResetMap(2);
                                this._resultsService.setEstado(Estado.LEER);*/
                              });
                            }
                        });
                      });

                    });
                }
            });
    }
  }

  reasignarPredio(data: IRegistroTitularidad): void {
    this.predio = data.predioInspeccion;
    if (!this.dataPoint) {
        this._confirmationService.error(
            'Alerta',
            'Por favor seleccione un punto '
        );
    }  else if (
        this.dataPoint
    ) {
        this.dialogRef = this._confirmationService.info(
            'Guardar',
            'Esta seguro de reasignar el predio?'
        );

        this.dialogRef
            .afterClosed()
            .toPromise()
            .then((option) => {
                if (option === 'confirmed') {
                    this._cfpredioService
                        .generateMaxCPU(this.dataPoint.point)
                        .then((res) => {
                            const predio = new CFPredioModel();
                            console.log(predio);
                            console.log(this.dataPoint.point);
                            predio.COORD_X=this.dataPoint.point['COORD_X'];
                            predio.COORD_Y=this.dataPoint.point['COORD_Y'];
                            if (res && res.COD_CPU) {
                                predio.COD_CPU = res.COD_CPU;
                                predio.NOM_PC = 'PLATAFORMA';
                                data.predioInspeccion.codCpu=res.COD_CPU;


                                this._registroTitularidadService.update(data.codTit,{status:6}).subscribe((r)=>{
                                    const query={
                                        // eslint-disable-next-line @typescript-eslint/naming-convention
                                        'COD_PRE':data.predioInspeccion.codPre,
                                        // eslint-disable-next-line @typescript-eslint/naming-convention
                                        'UBIGEO':data.predioInspeccion.ubigeo
                                    };
                                    const params=CommonUtils.deleteKeysNullInObject(query);
                                    this._cfpredioService.getPredios(params).then((responseJson)=>{
                                        if (responseJson && responseJson.features) {
                                            const features: any[] = responseJson.features;
                                            predio.OBJECTID=features[0].OBJECTID;
                                            predio.ESTADO = 5;
                                            this._cfpredioService
                                            .crearPredio(predio)
                                            .then((result) => {
                                            if (result) {
                                                this._confirmationService
                                                .success(
                                                    'Exito',
                                                    'Punto Actualizado'
                                                )
                                                .afterClosed()
                                                .toPromise()
                                                .then((e) => {

                                                    if(data.predioInspeccion.id && data.predioPadron.id){
                                                        const requestArray =
                                                        [
                                                        this._predioInspeccionService.update(data.predioInspeccion.id,{codCPU:res.COD_CPU}),
                                                         //this._predioPadronService.updateLand(data.predioPadron.id,{cup:predio.COD_CPU,longitude:predio.COORD_X,latitude: predio.COORD_Y,ubigeo:data.predioPadron.ubigeo})
                                                        ];

                                                        forkJoin(requestArray).subscribe((results) => {
                                                            this.resolverPredio();
                                                            this.getStatusButton();
                                                            this._resultsService.setResetMap(2);
                                                            this._resultsService.setEstado(Estado.LEER);

                                                          });
                                                    }

                                                /*this._predioInspeccionService.update(data.predioInspeccion.id,{codCPU:res.COD_CPU}).subscribe((r2)=>{






                                                });*/

                                                });
                                            }
                                            });

                                        }
                                    });


                                });
                            }
                        });
                }
            });
    }
}

generarPredio(data: IRegistroTitularidad): void {
    this.predio = data.predioInspeccion;
    if (!this.dataPoint) {
        this._confirmationService.error(
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
                                predio.ID_LOTE = this.dataPoint.point.ID_LOTE;
                                predio.ID_LOTE_P = this.dataPoint.point.ID_LOTE_P;
                                predio.UBIGEO = data.predioInspeccion.ubigeo;
                                predio.COD_PRE =  data.predioPadron.cpm;
                                predio.COD_CPU = res.COD_CPU;
                                predio.NOM_USER = this.user.username;
                                predio.NOM_PC = 'PLATAFORMA';
                                predio.COD_CPU = res.COD_CPU;
                                predio.ESTADO =5;
                                predio.RAN_CPU=this.dataPoint.point.RAN_CPU;
                                predio.COD_UI = res.COD_CPU ? parseInt(res.COD_CPU.split('-')[1], 10) : null;
                                predio.COD_VER= res.COD_CPU ?  parseInt(res.COD_CPU.split('-')[2], 10) : null;
                                this._registroTitularidadService.update(data.codTit,{status:6}).subscribe((r)=>{
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

                                                if(data.predioPadron.id && data.predioInspeccion.id){
                                                    const requestArray =
                                                    [

                                                        this._predioInspeccionService.update(data.predioInspeccion.id,{codCPU:res.COD_CPU}),

                                                    //this._predioPadronService.updateLand(data.predioPadron.id,{status:1,ubigeo:data.predioPadron.ubigeo})
                                                     //this._predioPadronService.updateLand(data.predioPadron.id,{cup:predio.COD_CPU,longitude:predio.COORD_X,latitude: predio.COORD_Y,status:1,ubigeo:data.predioPadron.ubigeo})
                                                    ];

                                                    forkJoin(requestArray).subscribe((results) => {
                                                        this.resolverPredio();
                                                        this.getStatusButton();
                                                        this._resultsService.setResetMap(2);
                                                        this._resultsService.setEstado(Estado.LEER);

                                                      });
                                                }

                                              /*this._predioInspeccionService.update(data.predioInspeccion.id,{codCPU:res.COD_CPU}).subscribe((r2)=>{



                                              });*/

                                            });
                                        }
                                      });

                                    });
                            }
                        });
                }
            });
    }
}



generarNuevaDireccionPuntoImagen(data: IRegistroTitularidad): void {
  this.predio = data.predioInspeccion;
  /*this.predio = data;*/

  if (!this.dataPoint) {
      this._confirmationService.error(
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
                  puntoImagen.TIPO_UU = this.ubicacion.codTipoUu;
                  puntoImagen.KM = this.ubicacion.km;
                  puntoImagen.NOM_UU = this.ubicacion.nomUu;
                  puntoImagen.NOM_VIA = this.ubicacion.nomVia;
                  puntoImagen.COD_PRE = data.predioPadron.cpm;
                  puntoImagen.PISO=     data.predioPadron.floor;
                  puntoImagen.INTERIOR = data.predioPadron.block;
                  puntoImagen.BLOCK = data.predioPadron.block;
                  puntoImagen.TIP_DOC=this.predio.predioContribuyente[0].contribuyente.tipDoc;
                  puntoImagen.AP_MAT=this.predio.predioContribuyente[0].contribuyente.apMat;
                  puntoImagen.AP_PAT=this.predio.predioContribuyente[0].contribuyente.apPat;
                  puntoImagen.DOC_IDEN =this.predio.predioContribuyente[0].contribuyente.docIden;
                  puntoImagen.DIR_FISCAL = this.predio.predioContribuyente[0].contribuyente.dirFiscal;
                  puntoImagen.ESTADO=3;
                  puntoImagen.ESTADO_P=1;
                  puntoImagen.NOM_USER = '';
                  puntoImagen.NOM_PC = 'PLATAFORMA';
                  puntoImagen.REFERENCIA = this.ubicacion.nomRef;
                  this._cfpuntoImagenService.getMaxSecuen(this.ubicacion.ubigeo).then((res)=>{
                    const secuen=res+1;
                    const idImg=`i${this.utm}${this.ubicacion.ubigeo}${secuen}`;
                    puntoImagen.ID_IMG = idImg;
                    puntoImagen.SECUEN =secuen;
                    this._ubicacionService.update(this.ubicacion.id,this.ubicacion).subscribe( (r)=>{
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
                                if(data.predioPadron.id){
                                    this._registroTitularidadService.update(data.codTit,{status:6}).subscribe((r)=>{
                                        const requestArray =
                                        [
                                         this._predioPadronService.updateLand(data.predioPadron.id,{idCartographicImg: idImg,longitude:puntoImagen.COORD_X,latitude: puntoImagen.COORD_Y,status:2,ubigeo:data.predioPadron.ubigeo})
                                        ];

                                        forkJoin(requestArray).subscribe((results) => {
                                            this.resolverPredio();
                                            this.getStatusButton();
                                            this._resultsService.setResetMap(2);
                                            this._resultsService.setEstado(Estado.LEER);

                                          });

                                    });
                                }


                            });
                          }
                      });
                    });

                  });
              }
          });
  }
}


validarUbicacionPuntoImagen(data: IRegistroTitularidad): void {
  this.predio = data.predioInspeccion;
  if (!this.dataPoint) {
      this._confirmationService.error(
          'Alerta',
          'Por favor seleccione un punto '
      );
  }  else if (
      this.dataPoint
  ) {
      this.dialogRef = this._confirmationService.info(
          'Guardar',
          'Esta seguro de validar la ubicacion?'
      );

      this.dialogRef
      .afterClosed()
      .toPromise()
      .then((option) => {
          if (option === 'confirmed') {
            this._cfloteService.generateRANCPU(data.predioInspeccion.ubigeo).then((rancpu)=>{
                const lote = new CFLoteModel(
                    this.dataPoint.point
                );

                if(rancpu){
                    lote.RAN_CPU = rancpu;
                    lote.UBIGEO = data.predioInspeccion.ubigeo;
                    this._cfloteService.crearLote(lote).then((resLote)=>{
                        console.log('lote creado');
                        this._cfpredioService
                        .generateMaxCPU(lote)
                        .then((res) => {
                            const predio = new CFPredioModel(
                                this.dataPoint.point
                            );

                            if (res && res.COD_CPU) {
                                predio.ID_LOTE = lote.ID_LOTE;
                                predio.ID_LOTE_P = lote.ID_LOTE_P;
                                predio.UBIGEO = data.predioInspeccion.ubigeo;
                                predio.COD_PRE =  data.predioPadron.cpm;
                                predio.COD_CPU = res.COD_CPU;
                                predio.NOM_USER = this.user.username;
                                predio.NOM_PC = 'PLATAFORMA';
                                predio.COD_CPU = res.COD_CPU;
                                predio.ESTADO =5;
                                predio.RAN_CPU=lote.RAN_CPU;
                                predio.COD_UI = res.COD_CPU ? parseInt(res.COD_CPU.split('-')[1], 10) : null;
                                predio.COD_VER= res.COD_CPU ?  parseInt(res.COD_CPU.split('-')[2], 10) : null;
                                this._registroTitularidadService.update(data.codTit,{status:6}).subscribe((r)=>{
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

                                              this._predioInspeccionService.update(data.predioInspeccion.id,{codCPU:res.COD_CPU}).subscribe((r2)=>{
                                                if(data.predioPadron.id){
                                                    const requestArray =
                                                    [
                                                     this._predioPadronService.updateLand(data.predioPadron.id,{cup:predio.COD_CPU,longitude:predio.COORD_X,latitude: predio.COORD_Y,status:2,ubigeo:data.predioPadron.ubigeo})
                                                    ];

                                                    forkJoin(requestArray).subscribe((results) => {
                                                        this.resolverPredio();
                                                        this.getStatusButton();
                                                        this._resultsService.setResetMap(2);
                                                        this._resultsService.setEstado(Estado.LEER);

                                                      });
                                                }


                                              });

                                            });
                                        }
                                      });

                                    });
                            }
                        });
                    });
                }

            });


          }
      });
  }
}


generarNuevoLotePredio(data: IRegistroTitularidad): void {
    this.predio = data.predioInspeccion;
    if (!this.dataPoint) {
        this._confirmationService.error(
            'Alerta',
            'Por favor seleccione un punto '
        );
    }  else if (
        this.dataPoint
    ) {
        this.dialogRef = this._confirmationService.info(
            'Guardar',
            'Esta seguro de generar el Predio?'
        );

        this.dialogRef
        .afterClosed()
        .toPromise()
        .then((option) => {
            if (option === 'confirmed') {
              this._cfloteService.generateRANCPU(data.predioInspeccion.ubigeo).then((rancpu)=>{
                  const lote = new CFLoteModel(
                      this.dataPoint.point
                  );

                  if(rancpu){
                      lote.RAN_CPU = rancpu;
                      lote.UBIGEO = data.predioInspeccion.ubigeo;
                      this._cfloteService.crearLote(lote).then((resLote)=>{
                          console.log('lote creado');
                          this._cfpredioService
                          .generateMaxCPU(lote)
                          .then((res) => {
                              const predio = new CFPredioModel(
                                  this.dataPoint.point
                              );

                              if (res && res.COD_CPU) {
                                  predio.ID_LOTE = lote.ID_LOTE;
                                  predio.ID_LOTE_P = lote.ID_LOTE_P;
                                  predio.UBIGEO = data.predioInspeccion.ubigeo;
                                  predio.COD_PRE =  data.predioPadron.cpm;
                                  predio.COD_CPU = res.COD_CPU;
                                  predio.NOM_USER = this.user.username;
                                  predio.NOM_PC = 'PLATAFORMA';
                                  predio.COD_CPU = res.COD_CPU;
                                  predio.ESTADO =1;
                                  predio.RAN_CPU=lote.RAN_CPU;
                                  predio.COD_UI = res.COD_CPU ? parseInt(res.COD_CPU.split('-')[1], 10) : null;
                                  predio.COD_VER= res.COD_CPU ?  parseInt(res.COD_CPU.split('-')[2], 10) : null;
                                  this._registroTitularidadService.update(data.codTit,{status:6}).subscribe((r)=>{
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
                                                if(data.predioPadron.id){
                                                    const requestArray =
                                                    [this._predioInspeccionService.update(data.predioInspeccion.id,{codCPU:res.COD_CPU}),
                                                     this._predioPadronService.updateLand(data.predioPadron.id,{cup:predio.COD_CPU,longitude:predio.COORD_X,latitude: predio.COORD_Y,status:1,ubigeo:data.predioPadron.ubigeo})
                                                    ];

                                                    forkJoin(requestArray).subscribe((results) => {
                                                        this.resolverPredio();
                                                        this.getStatusButton();
                                                        this._resultsService.setResetMap(2);
                                                        this._resultsService.setEstado(Estado.LEER);

                                                      });
                                                }
                                                /*this._predioInspeccionService.update(data.predioInspeccion.id,{codCPU:res.COD_CPU}).subscribe((r2)=>{
                                                    this.resolverPredio();
                                                  this.getStatusButton();
                                                  this._resultsService.setResetMap(2);
                                                  this._resultsService.setEstado(Estado.LEER);

                                                });*/

                                              });
                                          }
                                        });

                                      });
                              }
                          });
                      });
                  }

              });


            }
        });
    }
  }

getStatusButton(): void{
  const cantResueltos=this.ubicacion.registrosTitularidad.filter(r=> r.status===6).length;
  const total = this.ubicacion.registrosTitularidad.length;
  console.log('cantResueltos',cantResueltos);
  console.log('total',cantResueltos);
  if(total=== cantResueltos){
    this.appButtonDisabled= false;
  }

  else{
    this.appButtonDisabled= true;
  }
}

onClickPosition(event: any): void {
  this._resultsService.setUbicacionData({ubicacion:this.ubicacion, ticket: this.ticket});

}

resetMap(type: number): void {
  this._resultsService.setResetMap(type);
}

eventIniciarItem(registro: IRegistroTitularidad): void{
    this.ubicacion.registrosTitularidad.map(r=> {
        r.inicio = false;
        if (registro.codTit === r.codTit){
            r.inicio = true;
        }

  });
  /*console.log('this.ubicacion.status>>>',this.ubicacion.status);
  console.log('registro.codTipoTit>>>',registro.codTipoTit);

  console.log('this.ticket.codTipoTicket>>>',this.ticket.codTipoTicket);*/

  if(this.ubicacion.status=== 0 && registro.codTipoTit ===1 &&  this.ticket.codTipoTicket !== TypeGap.MANZANA_SIN_LOTES){
    this.resetMap(2);
    this._resultsService.setEstado(Estado.EDITAR);

  }
  else if(this.ubicacion.status=== 0 && registro.codTipoTit ===1 &&  this.ticket.codTipoTicket === TypeGap.MANZANA_SIN_LOTES){
    console.log('this.ubicacion.status>>>',this.ubicacion.status);
    console.log('registro.codTipoTit>>>',registro.codTipoTit);

    console.log('this.ticket.codTipoTicket>>>',this.ticket.codTipoTicket);
    this._resultsService.setEstado(Estado.INICIAR);
  }
  else{
    this.resetMap(2);
    this._resultsService.setEstado(Estado.LEER);
  }



}


descargarNotificacion(data: IRegistroTitularidad): void{
    window.open(data.fileNotificacion);
    /*this.generarPdf(data);*/
}

descargarNotificacionPredio(data: IRegistroTitularidad): void{
    window.open(data.fileNotificacion);
    /*this.generarPdf(data);*/
}

generarNotificacion(r: IRegistroTitularidad): void{

    const texto = `Nos dirigimos a usted en representación de la Municipalidad Distrital de ${this.distrito?.name}, a través de la Gerencia de Administración Tributaria ,con el propósito de recordarle la importancia de cumplir con sus obligaciones tributarias.Hemos observado que hasta la fecha no ha presentado la Declaración Jurada correspondiente a su propiedad. Es fundamental recordarle la importancia de cumplir con esta obligación tributaria, así como con el pago puntual del impuesto predial y los arbitrios municipales.`;



    this.dialogRef = this._confirmationService.info(
        'Notificar',
        'Esta seguro de generar la notificacion?'
    );

    this.dialogRef
          .afterClosed()
          .toPromise()
          .then( (option) => {
              if (option === 'confirmed') {

                const dialogRef2= this._messageProviderService.showModal(NotificacionModalComponent,
                    {width:'650px',
                    data: {registrosTitularidad: r,textoEditar: texto,textoFijo:''},
                });

                dialogRef2
                .afterClosed()
                .toPromise()
                    .then((text2) => {


                        const contribuyente=
                        (r.suministro?.contribuyente)? `${r.suministro?.contribuyente?.nombre} ${r.suministro?.contribuyente?.apPat} ${r.suministro?.contribuyente?.apMat}`:
                        (r.predioInspeccion?.predioContribuyente[0]?.contribuyente)? `${r.predioInspeccion?.predioContribuyente[0]?.contribuyente?.nombre} ${r.predioInspeccion?.predioContribuyente[0]?.contribuyente?.apPat} ${r.predioInspeccion?.predioContribuyente[0]?.contribuyente?.apMat}`:
                        (r.predioPadron?.predioContribuyente[0]?.contribuyente)? `${r.predioPadron?.predioContribuyente[0]?.contribuyente?.nombre} ${r.predioPadron?.predioContribuyente[0]?.contribuyente?.apPat} ${r.predioPadron?.predioContribuyente[0]?.contribuyente?.apMat}`:
                        '';
                        console.log('this.user>>',this.user);
                        const payload = {
                            'codTicket':this.ticket.codTicket,
                            'contribuyente':contribuyente,
                            'codTit' :r.codTit,
                            'texto':text2,
                            'usuario': this.user.name,
                            'rol': this.user.role?.name?this.user.role?.name:'',
                        };

                        /*console.log('payload>>',payload);*/
                        /*this.user.fullName;*/


                        this._registroTitularidadService.generarNotificacion(payload).subscribe((response)=>{

                            const blob = new Blob([response], { type: 'application/pdf' });
                            saveAs(blob, 'CARTA DE INVITACION INSCRIPCION.pdf');



                            this._confirmationService.success(
                                'Notificar',
                                'Notificacion generada'
                            ).afterClosed().toPromise().then((res)=>{

                                const form = { codContr: r.suministro?.codContr};
                                const dataForm = FormUtils.deleteKeysNullInObject(form);
                                if(r?.suministro?.codSuministro){
                                    this._suministroService.update(r.suministro.codSuministro,dataForm).subscribe((s)=>{
                                        this._registroTitularidadService.update(r.codTit,{'status':6,'fileNotificacion':blob}).subscribe((res)=>{
                                            this.resolverPredio();
                                            this.getStatusButton();
                                            this._resultsService.setResetMap(2);
                                            this._resultsService.setEstado(Estado.LEER);

                                        });

                                    });

                                }

                            });
                        });



                    });



              }



            });




}

generarNotificacionPredio(r: IRegistroTitularidad): void{
    //const  direccion = `${this.ubicacion.address}`;
    const texto = `Nos dirigimos a usted en representación de la Municipalidad Distrital de ${this.distrito?.name}, a través de la Gerencia de Administración Tributaria ,con el propósito de recordarle la importancia de cumplir con sus obligaciones tributarias.Hemos observado que hasta la fecha no ha presentado la Declaración Jurada correspondiente a su propiedad. Es fundamental recordarle la importancia de cumplir con esta obligación tributaria, así como con el pago puntual del impuesto predial y los arbitrios municipales.`;


        this.dialogRef = this._confirmationService.info(
            'Notificar',
            'Esta seguro de generar la notificacion?'
        );

        this.dialogRef
              .afterClosed()
              .toPromise()
              .then( (option) => {
                  if (option === 'confirmed') {

                    const dialogRef2= this._messageProviderService.showModal(NotificacionModalComponent,
                        {width:'650px',
                        data: {registrosTitularidad: r,textoEditar: texto,textoFijo:''},
                    });

                    dialogRef2
                    .afterClosed()
                    .toPromise()
                        .then((text2) => {

                            this._resultsService.setGenerarNotificacion(this.ubicacion);
                            this._fuseSplashScreenService.show();
                            setTimeout(async () => {
                                console.log('this.view>>',this.view);
                                const screenshot = await this.view.takeScreenshot({
                                    format: 'jpg',
                                    quality: 100,
                                });



                                const contribuyente=
                                (r.suministro?.contribuyente)? `${r.suministro?.contribuyente?.nombre} ${r.suministro?.contribuyente?.apPat} ${r.suministro?.contribuyente?.apMat}`:
                                (r.predioInspeccion?.predioContribuyente[0]?.contribuyente)? `${r.predioInspeccion?.predioContribuyente[0]?.contribuyente?.nombre} ${r.predioInspeccion?.predioContribuyente[0]?.contribuyente?.apPat} ${r.predioInspeccion?.predioContribuyente[0]?.contribuyente?.apMat}`:
                                (r.predioPadron?.predioContribuyente[0]?.contribuyente)? `${r.predioPadron?.predioContribuyente[0]?.contribuyente?.nombre} ${r.predioPadron?.predioContribuyente[0]?.contribuyente?.apPat} ${r.predioPadron?.predioContribuyente[0]?.contribuyente?.apMat}`:
                                '';
                                const payload = {
                                    'codTicket':this.ticket.codTicket,
                                    'contribuyente':contribuyente,
                                    'codTit' :r.codTit,
                                    'texto':text2,
                                    'usuario': this.user.name,
                                    'rol': this.user.role?.name?this.user.role?.name:'',
                                    'idLand':r.predioInspeccion.id,
                                    /*'screenshot':screenshot*/
                                };
                               /* console.log('payload>>',payload);*/

                               this._fuseSplashScreenService.hide();


                                /*const pdf=this.generarPdf(payload);*/

                                this._registroTitularidadService.generarNotificacion(payload).subscribe((response)=>{

                                    const blob = new Blob([response], { type: 'application/pdf' });
                                    saveAs(blob, 'CARTA DE INVITACION INSCRIPCION.pdf');

                                    this._confirmationService.success(
                                        'Notificar',
                                        'Notificacion generada'
                                    ).afterClosed().toPromise().then((res)=>{

                                        this._registroTitularidadService.update(r.codTit,{'status':6,'fileNotificacion':blob}).subscribe((res)=>{
                                            this.resolverPredio();
                                            this.getStatusButton();
                                            this._resultsService.setResetMap(2);
                                            this._resultsService.setEstado(Estado.LEER);
                                        });

                                    });
                                });


                            },2000);




                        });



                  }



                });



  }

/*
async generatePDF(
    view: any,
    land: LandRegistryMap,
    landOwner: LandOwner
): Promise<void> {

    setTimeout(async () => {

        const screenshot = await view.takeScreenshot({
            format: 'jpg',
            quality: 100,
        });
        // eslint-disable-next-line max-len
        const name = `${landOwner?.name ? landOwner?.name : ''} ${landOwner?.paternalSurname ? landOwner?.paternalSurname : ''} ${landOwner?.maternalSurname ? landOwner?.maternalSurname : ''} `;
        const newName = name === '' ? '-' : this.toTitleCase(name);
        const documentType = {
            '0': 'S/N',
            '01': 'DNI',
            '04': 'CARNET DE EXTRANGERIA',
            '06': 'RUC',
            '08': 'SUCESION INTESTADA',
            '09': 'PASAPORTE'
        };

        const originalWidth = 3300; // por ejemplo, 600px
        const originalHeight = 697; // por ejemplo, 400px
        // Nuevo ancho deseado
        const desiredWidth = 150; // Nuevo ancho, por ejemplo, 250px
        // Calcular el nuevo alto para mantener la proporción
        const desiredHeight = (desiredWidth / originalWidth) * originalHeight;



    const pdf = {
        pageMargins: [ 55, 25],
        pageSize: 'A4',
        content: [

            {
                columns: [
                    {
                        width: '30%',
                        margin: [ 0, 5, 0, 5 ],
                        image: this.dataUrl,
                        cover: {
                            width: desiredWidth,
                            height: desiredHeight,
                            valign: 'bottom',
                            align: 'right',
                        },
                    },
                    {
                        width: '70%',
                        stack: [
                            'DECLARACIÓN JURADA DE UBICACIÓN DE PREDIO  \n CATASTRO FISCAL',
                            {text: `MUNICIPALIDAD DE ${ district?.name ? district?.name:''}`, style: 'subheader'},
                        ],
                        style: 'title'
                    },
                ]
            },
            {
                columns: [
                    {
                        style: 'p1',
                        width: '100%',
                        text: [ 'Yo, ',
                                { text: newName , style:'textR'},
                                'identificado(a) con DNI/RUC,' ,
                                {text:` Nº ${this.landOwner.dni?this.landOwner.dni:'-'}` , style:'textR'} ,
                                // eslint-disable-next-line max-len
                                landOwner.phone || landOwner.email ? {text:['con datos de contacto:', {text:`Telefono: ${landOwner.phone ? landOwner.phone : '-'} , Email: ${landOwner.email ? landOwner.email : '-'}` , style:'textR'} || ''] , style:'textR'}:''
                                // eslint-disable-next-line max-len
                                ,
                                '; en pleno ejercicio de mis derechos ciudadanos. \n',
                            ]
                    }
                ]
            },

            {
                columns: [
                    {
                        style: 'p2',
                        width: '100%',
                        text: [ 'DECLARO BAJO JURAMENTO : Que el predio con dirección ',
                                // eslint-disable-next-line max-len
                                { text: `${uuType ? this.toTitleCase(uuType.name) : ''} ${this.getFrase(this.toTitleCase(land.habilitacionName), '')} ${streetType ? ', ' + this.toTitleCase(streetType.name) : ' '} ${streetType && land.streetName ? ' ' + this.toTitleCase(land.streetName) : ''} ${this.getFrase(land.urbanMza,', Manzana ')} ${this.getFrase(land.urbanLotNumber , ', Lote ' )} ${this.getFrase(land.block,',Bloque ')} ${this.getFrase(land.municipalNumber ,',Nro Puerta ')} ${this.getFrase(land.apartmentNumber,',Nro Dpto ')} ${this.getFrase(land.km, ',Kilometro ')}` , style:'textR'} ,
                                'se encuentra ubicado tal cual se muestra en el siguiente croquis. \n'
                            ]
                    }

                ]
            },
            {
                columns: [
                    {
                        style: 'p3',
                        width: '100%',
                        text: 'CROQUIS DE UBICACIÓN ' ,
                    },

                ],
            },
            {
                layout: {
                        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
                        hLineWidth: function (i, node) { return  1;},
                        hLineColor: function (i, node) {return '#94a3b8';},
                        vLineColor: function (i, node) { return '#94a3b8';},
                },
                table: {
                    widths:['30%', '70%'],
                    body: [
                            [
                                {
                                    border: [false, false, false, false],

                                    table: {
                                        widths:['100%'],
                                        heights: [40, 40, 40],
                                        body: [
                                            [{
                                                border: [false, false, false, true],
                                                stack:['Ubigeo \n', {text:`${land?.ubigeo ? land?.ubigeo : '-'}` , style:'cellSub'}], style:'cell'
                                            }],
                                            [{
                                                border: [false, false, false, true],
                                                // eslint-disable-next-line max-len
                                                stack:[{text:`${land.cup ? 'CPU \n' : 'Codigo Imagen \n'}`}, {text: ` ${ land.cup ? land.cup : land.idCartographicImg}`, style:'cellSub'}] , style:'cell'
                                            }],
                                            [{
                                                border: [false, false, false, true],
                                                stack:['Latitud \n', {text:`${land.latitude ? land.latitude : '-'}` , style:'cellSub'}], style:'cell'
                                            }],
                                            [{
                                                border: [false, false, false, true],
                                                stack:['Longitud \n', {text:`${land.longitude ? land.longitude : '-'}` , style:'cellSub'}], style:'cell'
                                            }],
                                        ]
                                    },
                                    layout: {
                                            hLineWidth: function (i, node) { return  1 ;},
                                            hLineColor: function (i, node) {
                                                return '#94a3b8';
                                            },
                                    }
                                },
                                {
                                    alignment:'center',
                                    border: [true, true, true, true],
                                    image: screenshot.dataUrl,
                                    cover: { width: 330, height: 300, valign: 'bottom', align: 'right' },
                                },
                            ],
                        ]
                },
            },
            {
                    columns: [
                    {
                        style: 'p5',
                        width: '100%',
                        // eslint-disable-next-line max-len
                        text: 'Formulo la presente declaración jurada instruido(a) de las acciones administrativas, civiles y penales a las que me vería sujeto(a) en caso de falsedad en la presente declaración (Ley del Procedimiento Administrativo General, Ley Nº 27444, Artículo 32, numeral 32.3).' ,
                    },
                ],
            },
            {
                    columns: [
                    {
                        style: 'p3',
                        bold: false,
                        width: '100%',
                        text: 'En señal de conformidad firmo el presente documento.' ,
                    },
                ],
            },
            {
                    columns: [
                    {
                        margin: [ 0, 15, 0, 10 ],
                        bold: false,
                        width: '100%',
                        text: `${this.toTitleCase(this.district?.name)}, ${moment(new Date()).format('DD [de] MMMM [del] YYYY')}`,
                    },
                ],
            },
            {
                    columns: [
                    {

                    margin: [ 0, 5, 0, 10 ],
                    width: '50%',
                    alignment:'center',
                    table: {
                                heights:[80],
                                widths:[150,5, 70],
                                body: [
                                        [{text:'', border: [false, false, false, false]}, {text:'', border: [false, false, false, false]}, ''],
                                        // eslint-disable-next-line max-len
                                        [{text:'Firma', border: [false, true, false, false], style:'textF'},{text:'', border: [false, false, false, false]}, {text:'Huella', border: [false, true, false, false],style:'textF'}],
                                    ]
                            },
                    },
                    {
                    layout:'noBorders',
                    margin: [ 55, 75, 0, 0],
                    style:'tableU',
                    width: '*',
                    table: {
                                widths:[32,1, '*'],
                                body: [
                                        [ {text:'Usuario'}, ':', {text:`${this.user.name ? this.user.name : '-'}`,}],
                                        [ {text:'DNI',},':', {text:`${this.user.dni ? this.user.dni : '-'}`,}],
                                        [ {text:'Cargo',}, ':' , {text:`${this.user.role?.name ? this.user.role?.name : '-'}`,}],
                                    ]
                            },
                    },
                ],
            },

        ],
        styles: {
            title: {
                fontSize: 13,
                bold: true,
                alignment:'center',
            },
            subheader: {
                bold: false,
                margin: [ 0, 8, 0, 0 ],
                fontSize: 11,
            },

            p1: {

            margin: [ 0, 25, 0, 10 ],
            alignment:'justify',
            lineHeight:1.3
            },
            textR: {
            bold: true,
            },

            p2: {
                lineHeight:1.3,
                alignment:'justify',
                margin: [ 0, 0, 0, 10 ],
            },

            p3: {
                bold: true,
                margin: [ 0, 4, 0,5],
            },
            p4:{
                margin: [ 0, 40, 0, 20 ],
            },

            p5:{

            margin: [ 0, 15, 0, 10 ],
            alignment:'justify',
            lineHeight:1.3
            },

            cell : {
            margin: [ 0, 20, 0, 20 ],
            },

            cellSub: {
            margin: [ 0, 3, 0,0 ],
            bold: true,
            },
            tableU:{
                fontSize: 9,
                alignment:'rigth',
            },
            textF: {
            margin: [ 0, 5, 0, 0 ],
            },

        },
        defaultStyle: {
            columnGap: 10,
            fontSize: 11,
            color:'#1e293b'
        }

    };
    pdfMake.createPdf(pdf).download('Declaración Jurada de Ubicación de Predio.pdf');

    }, 2000);
}*/


generarPdf(data: any): void{

    const pdf = {
        pageMargins: [ 55, 25],
        pageSize: 'A4',
        content: [

            {
                columns: [

                    {
                        width: '70%',
                        stack: [
                            'DECLARACIÓN JURADA DE UBICACIÓN DE PREDIO  \n CATASTRO FISCAL',
                            {text: 'MUNICIPALIDAD DE ', style: 'subheader'},
                        ],
                        style: 'title'
                    },
                ]
            },
            {
                columns: [
                    {
                        style: 'p1',
                        width: '100%',
                        text: [ 'Yo, ',
                                { text: '', style:'textR'},
                                'identificado(a) con DNI/RUC,' ,
                                {text:' Nº ' , style:'textR'} ,
                                // eslint-disable-next-line max-len
                                '',
                                '; en pleno ejercicio de mis derechos ciudadanos. \n',
                            ]
                    }
                ]
            },

            {
                columns: [
                    {
                        style: 'p2',
                        width: '100%',
                        text: [ 'DECLARO BAJO JURAMENTO : Que el predio con dirección ',
                                // eslint-disable-next-line max-len
                                { text: '' , style:'textR'} ,
                                'se encuentra ubicado tal cual se muestra en el siguiente croquis. \n'
                            ]
                    }

                ]
            },
            {
                columns: [
                    {
                        style: 'p3',
                        width: '100%',
                        text: 'CROQUIS DE UBICACIÓN ' ,
                    },

                ],
            },
            {
                layout: {
                        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
                        hLineWidth: function (i, node) { return  1;},
                        hLineColor: function (i, node) {return '#94a3b8';},
                        vLineColor: function (i, node) { return '#94a3b8';},
                },
                table: {
                    widths:['30%', '70%'],
                    body: [
                            [
                                {
                                    border: [false, false, false, false],

                                    table: {
                                        widths:['100%'],
                                        heights: [40, 40, 40],
                                        body: [
                                            [{
                                                border: [false, false, false, true],
                                                text :'1', style:'cell'
                                            }],
                                            [{
                                                border: [false, false, false, true],
                                                // eslint-disable-next-line max-len
                                                text :'2', style:'cell'
                                            }],
                                            [{
                                                border: [false, false, false, true],
                                                text:'3', style:'cell'
                                            }],

                                        ]
                                    },
                                    layout: {
                                            hLineWidth: function (i, node) { return  1 ;},
                                            hLineColor: function (i, node) {
                                                return '#94a3b8';
                                            },
                                    }
                                },
                                {
                                    alignment:'center',
                                    border: [true, true, true, true],
                                    image: data.screenshot.dataUrl,
                                    cover: { width: 330, height: 300, valign: 'bottom', align: 'right' },
                                },
                            ],
                        ]
                },
            },
            {
                    columns: [
                    {
                        style: 'p5',
                        width: '100%',
                        // eslint-disable-next-line max-len
                        text: 'Formulo la presente declaración jurada instruido(a) de las acciones administrativas, civiles y penales a las que me vería sujeto(a) en caso de falsedad en la presente declaración (Ley del Procedimiento Administrativo General, Ley Nº 27444, Artículo 32, numeral 32.3).' ,
                    },
                ],
            },
            {
                    columns: [
                    {
                        style: 'p3',
                        bold: false,
                        width: '100%',
                        text: 'En señal de conformidad firmo el presente documento.' ,
                    },
                ],
            },
            {
                    columns: [
                    {
                        margin: [ 0, 15, 0, 10 ],
                        bold: false,
                        width: '100%',
                        text: 'kk',
                    },
                ],
            },


        ],
        styles: {
            title: {
                fontSize: 13,
                bold: true,
                alignment:'center',
            },
            subheader: {
                bold: false,
                margin: [ 0, 8, 0, 0 ],
                fontSize: 11,
            },

            p1: {

            margin: [ 0, 25, 0, 10 ],
            alignment:'justify',
            lineHeight:1.3
            },
            textR: {
            bold: true,
            },

            p2: {
                lineHeight:1.3,
                alignment:'justify',
                margin: [ 0, 0, 0, 10 ],
            },

            p3: {
                bold: true,
                margin: [ 0, 4, 0,5],
            },
            p4:{
                margin: [ 0, 40, 0, 20 ],
            },

            p5:{

            margin: [ 0, 15, 0, 10 ],
            alignment:'justify',
            lineHeight:1.3
            },

            cell : {
            margin: [ 0, 20, 0, 20 ],
            },

            cellSub: {
            margin: [ 0, 3, 0,0 ],
            bold: true,
            },
            tableU:{
                fontSize: 9,
                alignment:'rigth',
            },
            textF: {
            margin: [ 0, 5, 0, 0 ],
            },

        },
        defaultStyle: {
            columnGap: 10,
            fontSize: 11,
            color:'#1e293b'
        }

    };
    return pdfMake.createPdf(pdf).download('Carta DE Invitacion de Inscripcion.pdf');
}



updateLocation(ubicacion: IUbicacion, nroNoticacion: number=null): void{
    this.eventUpdateLocation.emit({codUbicacion:ubicacion.codUbicacion,nroNoticacion:nroNoticacion});
}

previsualizacion(registroTitularidad: IRegistroTitularidad): void {

    const dialogRef= this._messageProviderService.showModal(PrevisualizacionComponent,
            {width:'100%', height:'100%',
            data: {registrosTitularidad: registroTitularidad,fotos: this.ubicacion.fotos},
        });

    dialogRef
    .afterClosed()
    .toPromise()
    .then((option) => {
        console.log('option',option);
            if (option === 'confirmar') {

                this._registroTitularidadService.update(registroTitularidad.codTit,{status:6}).subscribe((r2)=>{

                    this.resolverPredio();

                });

            }

            else if (option === 'subvaluar'){
                const dialogRef2= this._messageProviderService.showModal(NotificacionModalComponent,
                    {width:'650px',
                    data: {registrosTitularidad: registroTitularidad,texto_editar:`las ventanillas Nro 7 a 9`,texto_fijo:`Si encontrara divergencias en lo que obra en su Declaración Jurada de Autoavaluo con lo señalado en la Ficha
                    adjunta sírvase cumplir con modificar su Declaración acercándose a la Municipalidad y llenar los formularios HR y
                    PU que serán proporcionados en`},
                });

                dialogRef2
                .afterClosed()
                .toPromise()
                    .then((text) => {
                        this.generarNotificacionSubvaluado(registroTitularidad, text);
                    });
            }

            else{

            }


        });

}


generarNotificacionSubvaluado(data: IRegistroTitularidad,text): void{

    //const notificacionBlob = this.generarPdfPredioSubvaluado(data,text);
    const payload = {
        'codTicket':this.ticket.codTicket,
        'contribuyente':`${data.predioPadron?.predioContribuyente[0]?.contribuyente?.nombre} ${data.predioPadron?.predioContribuyente[0]?.contribuyente?.apPat} ${data.predioPadron?.predioContribuyente[0]?.contribuyente?.apMat}`,
        'codTit' :data.codTit,
        'texto':text
    };

    this._registroTitularidadService.generarNotificacionSubvaluado(payload).subscribe((response)=>{

        const blob = new Blob([response], { type: 'application/pdf' });
        saveAs(blob, 'CARTA DE INVITACION INSCRIPCION.pdf');

        this._confirmationService.success(
            'Notificar',
            'Notificacion generada'
        ).afterClosed().toPromise().then((res)=>{

            this._registroTitularidadService.update(data.codTit,{'status':6,'fileNotificacion':blob}).subscribe((res)=>{
                this.resolverPredio();
                this.getStatusButton();
                this._resultsService.setResetMap(2);
                this._resultsService.setEstado(Estado.LEER);
            });

        });
    });



}




descargarNotificacionPredioSubvaluado(data: IRegistroTitularidad): void{
    //const blob = new Blob([data.fileNotificacion]);
    //const url = window.URL.createObjectURL(data.fileNotificacion);

    /*const link = document.createElement('a');
    link.href = data.fileNotificacion;
    link.download = 'CARTA DE INVITACION INSCRIPCION.pdf';
    link.click();
    window.URL.revokeObjectURL(data.fileNotificacion);
    link.remove();*/
    window.open(data.fileNotificacion);
    /*this._registroTitularidadService.get(data.codTit).subscribe((res : )=>{
        const blob = new Blob([data]);
            const url = window.URL.createObjectURL(blob);
            window.open(url);

    });*/

}




generarPdfPredioSubvaluadoOld(data: IRegistroTitularidad,text): any{
    const doc = new jsPDF();

    autoTable(doc, {
      theme: 'grid',
      styles: {
          overflow: 'linebreak',
          lineWidth: 0,
      },
      body: [
          [
              {
                  content: 'GERENCIA DE ADMINISTRACION TRIBUTARIA',
                  styles: { halign: 'center' },
              },
          ],

          [
              {
                  content: `CARTA DE ACTUALIZACION DE VALOR Nº${this.ticket.codTicket}-${this.ticket.nroNotificacion?this.ticket.nroNotificacion+1:1 }-2023`,
                  styles: { halign: 'center' },
              },
          ],

          [

            {
              content: `Municipalidad ${this.distrito?.name}, Mes ${moment().format('MMMM')} ${moment().format('YYYY')}`,
              styles: { halign: 'right' },
          },

          ],

          [

            {
              content:  'Estimado vecino(a)',
              styles: { halign: 'left' },
          },

          ],
          [

            {
              content:  `SR. ${data.predioPadron?.predioContribuyente[0]?.contribuyente?.nombre} ${data.predioPadron?.predioContribuyente[0]?.contribuyente?.apPat} ${data.predioPadron?.predioContribuyente[0]?.contribuyente?.apMat}`,
              styles: { halign: 'left' },
          },

          ],
          /*SR. BREINER A. CONDORI LIMA (Titular del predio)
          AA.HH. ASOCIACION DE VIVIENDA “30 DE MARZO” DE ALTO CAYMA MZ. A LOTE 6 (dirección del Predio)
          */

          [

            {
              content: 'Presente.-',
              styles: { halign: 'left' },
          },

          ],

          [

            {
              content: 'De mi mayor consideración:',
              styles: { halign: 'left' },
          },

          ],

          [

            {
              content: `La Municipalidad Distrital de ${this.distrito?.name}, a través de la Gerencia de Administración Tributaria le hace llegar saludos cordiales y a la vez comunicarle que se ha realizado un proceso de inspección de los predios del distrito, a fin de verificar la fehaciencia de la información brindada por los contribuyentes en su Declaración Jurada de Autoavaluo, es por ello que hacemos llegar a usted la Ficha de levantamiento de campo de(l/los) predio(s) a su nombre y detallamos a continuación:`,
              styles: { halign: 'justify' },
          },

          ],

          [

            {
              content: `Si encontrara divergencias en lo que obra en su Declaración Jurada de Autoavaluo con lo señalado en la Ficha adjunta sírvase cumplir con modificar su Declaración acercándose a la Municipalidad y llenar los formularios HR y PU que serán proporcionados en ${text}`,
              styles: { halign: 'justify' },
          },

          ],


          [

            {
              content: 'Tenga en cuenta que omitir información en la declaración jurada del Impuesto Predial constituye una infracción tipificada en el Código Tributario Art 176 Numeral 4 “Presentar otras declaraciones o comunicaciones en forma incompleta o no conformes con la realidad” siendo la sanción el pago del 30% de la UIT(S/.4950.00) que equivale a S/.1,485.00.',
              styles: { halign: 'justify' },
          },

          ],
          [

            {
              content: 'Estimado vecino, tributar es el camino al desarrollo de nuestro distrito, del mismo modo el pago de los arbitrios municipales (limpieza pública, parques y jardines y serenazgo) garantizamos la prestación eficiente y eficaz de estos servicios como también la seguridad ciudadana del distrito; mejorando así nuestra calidad de vida.',
              styles: { halign: 'justify' },
          },

          ],
          [

            {
              content: 'Atentamente',
              styles: { halign: 'left' },
          },

          ],

      ],
    });


    autoTable(doc, {
        theme: 'grid',
        styles: {
            overflow: 'linebreak',
            lineWidth: 1,
        },
        body: [

            [

              {
                content: 'INFORMACIÓN RESULTANTE DE LA INSPECCION PREDIAL',
                styles: { halign: 'justify', },
                colSpan: 8
            },

            ],
/*

      {
                title: 'Long. Frente',
                total: this.dataGabinete.caracteristicas?. longitudFrente
            }, {
                title: 'Arancel',
                total: this.dataGabinete.caracteristicas?. arancel
            }, {
                title: 'Area Terreno',
                total: this.dataGabinete.caracteristicas?. areaTerreno
            }, {
                title: 'Predio',
                total: []
            },
*/

            [
              {
                content: 'Long. Frente',

            },
            {
                content: data.caracteristicas?. longitudFrente,
            },
            {
                content: 'Arancel',

            },
            {
                content: data.caracteristicas?.arancel,

            },
            {
                content: 'Area de terreno',
            },

            {
                content: data.caracteristicas?.areaTerreno,
            },
            {
                content: 'Predio',
            },
            {
                content: '',
            },
            ],
            [

              {
                content: 'Atentamente',
                styles: { halign: 'left' },
            },

            ],

        ],
      });


    this.ticket.nroNotificacion = this.ticket.nroNotificacion? this.ticket.nroNotificacion+1 : 1;
    doc.save('CARTA DE INVITACION INSCRIPCION.pdf');
    return  doc.output('blob');

}


}
