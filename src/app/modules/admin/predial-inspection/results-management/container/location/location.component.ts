/* eslint-disable max-len */
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
import { ITicket } from '../../interfaces/ticket.interface';
import { TypeGap } from 'app/shared/enums/type-gap.enum';
import { IRegistroTitularidad } from '../../interfaces/registro-titularidad.interface';
import { TicketService } from '../../services/ticket.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import moment from 'moment';

moment.locale('es');

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {
  @Input() ticket: ITicket;
  /*@Output() eventResetMap: EventEmitter<any> = new EventEmitter();*/
  ubicacion: IUbicacion;
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
    predio: IPredio;

   
  constructor(
    private _messageProviderService: MessageProviderService,
    private _ubicacionService: UbicacionService,
    private _resultsService: ResultsService,
    private _confirmationService: CustomConfirmationService,
    private _cfpuntoImagenService: CFPuntoImagenService,
    private _cfpredioService: CFPredioService,
    private _router: Router,
    private _ticketService: TicketService
    ) { }

  ngOnInit(): void {

    const idUbicacion=localStorage.getItem('idUbicacion')?localStorage.getItem('idUbicacion'):'0';
    this._ubicacionService.get(parseInt(idUbicacion,10)).subscribe( (data: IUbicacion) =>{
      /*this.predio=data.registroTitularidad[0].predio;*/

      this.ubicacion =data;
      this._resultsService.setUbicacionData({ubicacion:this.ubicacion,ticket:this.ticket});
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

  onClickAprTicket(): void {
    this.dialogRef = this._confirmationService.info(
      'Guardar',
      'Esta seguro de aprobar la ubicacion?'
    );

    this.dialogRef.afterClosed().subscribe((result: any) => {
      console.log(result);
      if(result && result==='confirmed'){
        //console.log(result.data);
        this.ubicacion.estado = TicketStatus.RESUELTO_GESTION_RESULTADOS;
        this._ubicacionService.update(this.ubicacion.id,this.ubicacion).subscribe(r=>{
          this.ubicacion= r;
          const index=this.ticket.ubicacion.findIndex(u=>u.id === this.ubicacion.id);
          this.ticket.ubicacion[index] = this.ubicacion;
          this.updateIicket(this.ticket);



        });


      }

    });
  }



  onClickObsTicket(): void {
    this.dialogRef = this._messageProviderService.showModal(ModalComponent,{width:430} );
    this.dialogRef.afterClosed().subscribe((result: any) => {

      if(result && result==='confirmed'){
        console.log(result.data);
        this.ubicacion.obsUbicacion= result.data;
        this.ubicacion.estado = TicketStatus.OBSERVADO_GESTION_RESULTADOS;
        this._ubicacionService.update(this.ubicacion.id,this.ubicacion).subscribe(r=>{
          this.ubicacion= r;
          const index=this.ticket.ubicacion.findIndex(u=>u.id === this.ubicacion.id);
          this.ticket.ubicacion[index] = this.ubicacion;
          this.updateIicket(this.ticket);
        });
      }

    });
  }


  updateIicket(ticket: ITicket): void{
    const cantUbiAprob= this.ticket.ubicacion.filter(u=> u.estado ===TicketStatus.RESUELTO_GESTION_RESULTADOS).length;
    const cantUbiObs= this.ticket.ubicacion.filter(u=> u.estado ===TicketStatus.OBSERVADO_GESTION_RESULTADOS).length;
    const totalUbicaciones =this.ticket.ubicacion.length;
    console.log('totalUbicaciones',totalUbicaciones);
    console.log('cantUbiObs',cantUbiObs);
    console.log('cantUbiAprob',cantUbiAprob);
    if(cantUbiObs === totalUbicaciones || cantUbiAprob === totalUbicaciones ){
      if(cantUbiObs === totalUbicaciones){
        this.ticket.codEstTrabajoTicket = TicketStatus.OBSERVADO_GESTION_RESULTADOS;
      }
      else if(cantUbiAprob === totalUbicaciones){
        this.ticket.codEstTrabajoTicket = TicketStatus.RESUELTO_GESTION_RESULTADOS;
      }
      this._ticketService.update(this.ticket.id,this.ticket).subscribe(r=>{
        /*se resetea el mapa a nivel de ticket */
        this._router.navigate([
          './land-inspection/results-management',
          ]);
      });

    }

  }

  generarPuntoImagen(data: IRegistroTitularidad): void {
    this.predio = data.predio;
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


                    data.estado =1;

                    const index=this.ubicacion.registroTitularidad.findIndex(r=>data.id===r.id);
                    this.ubicacion.registroTitularidad[0]= data;
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
                                this.ubicacion= r;
                                this.getStatusButton();
                                this._resultsService.setResetMap(2);
                                this._resultsService.setEstado(Estado.LEER);
                              });
                            }
                        });
                      });

                    });
                }
            });
    }
  }



generarPredio(data: IRegistroTitularidad): void {
    this.predio = data.predio;
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
                                predio.UBIGEO = this.ubicacion.ubigeo;
                                predio.COD_PRE = this.predio.codPre;
                                predio.COD_CPU = res.COD_CPU;
                                predio.NOM_USER = '';
                                predio.NOM_PC = 'PLATAFORMA';
                                                    //puntoImagen.NOM_USER = this.user.username;
                                data.estado=1;
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

                                    const index=this.ubicacion.registroTitularidad.findIndex(r=>data.id===r.id);
                                    this.ubicacion.registroTitularidad[index]= data;
                                    this._ubicacionService.update(this.ubicacion.id,this.ubicacion).subscribe( (r)=>{

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

                                            this._ubicacionService.get(this.ubicacion.id).subscribe((u)=>{
                                              console.log('u>>',u);
                                              this.ubicacion= { ...u};
                                            });
                                            this.getStatusButton();
                                            this._resultsService.setResetMap(2);
                                            this._resultsService.setEstado(Estado.LEER);

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


generarNuevaDireccion(data: IRegistroTitularidad): void {
  console.log('data>>',data);
}

validarUbicacion(data: IRegistroTitularidad): void {
  console.log('data>>',data);
}

getStatusButton(): void{
  const cantResueltos=this.ubicacion.registroTitularidad.filter(r=> r.estado===1).length;
  const total = this.ubicacion.registroTitularidad.length;
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

eventOpenItem(registro: IRegistroTitularidad): void{

  if(this.ubicacion.estado=== 0 && registro.codTipoTit ===1 ){
    this._resultsService.setEstado(Estado.EDITAR);
  }else{
    this._resultsService.setEstado(Estado.LEER);
  }


  this.resetMap(2);
}

generarNotificacion(data: IRegistroTitularidad): void{

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
                content: 'CARTA DE INVITACION Nº1-2023',
                styles: { halign: 'center' },
            },
        ],

        [

          {
            content: `Mes ${moment().format('MMMM')} ${moment().format('YYYY')}`,
            styles: { halign: 'right' },
        },

        ],

        /*[

          {
            content: `
            Presente.-

            De mi mayor consideración:

            La Municipalidad Distrital de (Municipalidad), a través de la Gerencia de Administración Tributaria le hace llegar saludos cordiales y a la vez comunicarle que se ha detectado que usted ha omitido en inscribir oportunamente su propiedad ubicada en (dirección del Predio), por lo que lo invitamos a cumplir con la inscripción y la presentación de la Declaración Jurada de su predio seguido del pago de sus obligaciones tributarias, como es el Impuesto Predial y los Arbitrios Municipales.
            
            Tenga en cuenta que la no presentación de la declaración jurada del Impuesto Predial conlleva a ser calificado como evasor ha dicho impuesto por lo que correspondería la aplicación de una multa por infringir lo señalado en el Código Tributario.
            
            Estimado vecino, tributar es el camino al desarrollo de nuestro distrito, del mismo modo el pago de los arbitrios municipales (limpieza pública, parques y jardines y serenazgo) garantizamos la prestación eficiente y eficaz de estos servicios como también la seguridad ciudadana del distrito; mejorando así nuestra calidad de vida.

            Atentamente
            `,
           
        },

        ],*/



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
            content: 'La Municipalidad Distrital de (Municipalidad), a través de la Gerencia de Administración Tributaria le hace llegar saludos cordiales y a la vez comunicarle que se ha detectado que usted ha omitido en inscribir oportunamente su propiedad ubicada en (dirección del Predio), por lo que lo invitamos a cumplir con la inscripción y la presentación de la Declaración Jurada de su predio seguido del pago de sus obligaciones tributarias, como es el Impuesto Predial y los Arbitrios Municipales.',
            styles: { halign: 'justify' },
        },

        ],

        [

          {
            content: 'Tenga en cuenta que la no presentación de la declaración jurada del Impuesto Predial conlleva a ser calificado como evasor ha dicho impuesto por lo que correspondería la aplicación de una multa por infringir lo señalado en el Código Tributario.',
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

  doc.save('CARTA DE INVITACION INSCRIPCION.pdf');

  data.estado=1;
  const index=this.ubicacion.registroTitularidad.findIndex(r=>data.id===r.id);
  this.ubicacion.registroTitularidad[index]= data;

  this._ubicacionService.update(this.ubicacion.id,this.ubicacion).subscribe( (r)=>{

    this._confirmationService
    .success(
        'Notificacion',
        'Notificacion generada.'
    )
    .afterClosed()
    .toPromise()
    .then((e) => {

      this._ubicacionService.get(this.ubicacion.id).subscribe((u)=>{
        console.log('u>>',u);
        this.ubicacion= { ...u};
      });
      this.getStatusButton();
      this._resultsService.setResetMap(2);
      this._resultsService.setEstado(Estado.LEER);

    });



  });

}
}
