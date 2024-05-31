import { Component, Input, OnInit, Output,EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { TypeGap } from 'app/shared/enums/type-gap.enum';
import { IPredioInspeccion } from '../../interfaces/predio-inspeccion.interface';
import { IRegistroTitularidad } from '../../interfaces/registro-titularidad.interface';


@Component({
  selector: 'app-case',
  templateUrl: './case.component.html',
  styleUrls: ['./case.component.scss']
})
export class CaseComponent implements OnInit , OnChanges{
    /*@Input() puntoImagenButtonShow = false;
    @Input() predioButtonShow = false;
*/
    @Input() puntoImagenDisabled = true;
    @Input() predioButtonDisabled = true;
    @Input() defaultExpanded = false;

    @Input() codTypeGap = TypeGap.PREDIO_SIN_GEORREFERENCIACION;
    @Input() iniciar: boolean= false;
    /*@Input() set ticket(data: any) {
        this.tickets = data;
    }*/
    @Input() predio: IPredioInspeccion;
    @Input() registro: IRegistroTitularidad;
    @Input() item = {
        landStatus:null,
        codCase: null,
        state:null,
        firstname: null,
        lastname:null,
        dni:null,
        codCPU:''

    };

    @Output() eventGenerarPuntoImagen: EventEmitter<any> = new EventEmitter<any>();
    @Output() eventGenerarPredio: EventEmitter<any> = new EventEmitter<any>();
    @Output() eventReasignarPredio: EventEmitter<any> = new EventEmitter<any>();
    @Output() eventNuevaDireccion: EventEmitter<any> = new EventEmitter<any>();
    @Output() eventValidarUbicacion: EventEmitter<any> = new EventEmitter<any>();
    @Output() eventDescargarNotificacion: EventEmitter<any> = new EventEmitter<any>();
    @Output() eventOpenItem: EventEmitter<any> = new EventEmitter<any>();
    @Output() eventPrevisualizacion: EventEmitter<any> = new EventEmitter<any>();
    @Output() eventGenerarNotificacion: EventEmitter<any> = new EventEmitter<any>();

    //iniciar= false;
    constructor() {

     }
    ngOnChanges(changes: SimpleChanges): void {
        this.refreshForm();
    }

    ngOnInit(): void {
        this.refreshForm();
    }

    refreshForm(): void{
        console.log('this.registro>>>',this.registro);
        this.item.codCase = this.registro?.predioInspeccion?.codPre;
        this.item.landStatus = this.registro?.predioPadron?.status;
        if (this.registro?.predioInspeccion?.predioContribuyente.length>0){
            this.item.dni = this.registro?.predioInspeccion?.predioContribuyente[0]?.contribuyente?.docIden;
            this.item.firstname = this.registro?.predioInspeccion?.predioContribuyente[0]?.contribuyente?.nombre;
            this.item.lastname = `${this.registro?.predioInspeccion?.predioContribuyente[0]?.contribuyente?.apPat} `;
        }

        /*this.registro?.predioPadron?.address*/
        this.item.state = this.registro?.status;
        this.item.codCPU = this.registro?.predioInspeccion.codCpu;
    }

    onClickGenerarPuntoImagen(): void{
        this.eventGenerarPuntoImagen.emit(this.registro);
    }

    onClickGenerarPredio(): void {
        this.eventGenerarPredio.emit(this.registro);
    }

    onClickReasignarPredio(): void {
        this.eventReasignarPredio.emit(this.registro);
    }

    onClickOpenItem(): void{
        this.iniciar = true;
        console.log('this.registro',this.registro);
        this.eventOpenItem.emit(this.registro);
    }

    onClickNuevaDireccion(): void {
        this.eventNuevaDireccion.emit(this.registro);
    }

    onClickValidarUbicacion(): void{
        this.eventValidarUbicacion.emit(this.registro);
    }

    onClickPrevisualizacion(): void{
        this.eventPrevisualizacion.emit(this.registro);
    }

    onClickDescargarNotificacion(): void {
        this.eventDescargarNotificacion.emit(this.registro);
      }

      onClickGenerarNotificacion(): void {
        this.eventGenerarNotificacion.emit(this.registro);
      }


}
