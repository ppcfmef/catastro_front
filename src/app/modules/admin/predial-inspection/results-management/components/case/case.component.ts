import { Component, Input, OnInit, Output,EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { TypeGap } from 'app/shared/enums/type-gap.enum';
import { IPredio } from '../../interfaces/predio.interface';
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

    /*@Input() set ticket(data: any) {
        this.tickets = data;
    }*/
    @Input() predio: IPredio;
    @Input() registro: IRegistroTitularidad;
    @Input() item = {
        tipo:1,
        codCase: '00986',
        state:1,
        firstname: 'Jhon',
        lastname:'Perez',
        dni:'44458926'
    };

    @Output() eventGenerarPuntoImagen: EventEmitter<any> = new EventEmitter<any>();
    @Output() eventGenerarPredio: EventEmitter<any> = new EventEmitter<any>();
    @Output() eventNuevaDireccion: EventEmitter<any> = new EventEmitter<any>();
    @Output() eventValidarUbicacion: EventEmitter<any> = new EventEmitter<any>();

    @Output() eventOpenItem: EventEmitter<any> = new EventEmitter<any>();

    constructor() {

     }
    ngOnChanges(changes: SimpleChanges): void {
        console.log('changes>>',changes);
        this.refreshForm();
    }

    ngOnInit(): void {
        this.refreshForm();
    }

    refreshForm(): void{
        this.item.codCase = this.registro?.predio?.codPre;
        this.item.tipo = 0;
        this.item.dni = this.registro?.predio?.contribuyente?.docIden;
        this.item.firstname = this.registro?.predio?.contribuyente?.nombre;
        this.item.lastname = `${this.registro?.predio?.contribuyente?.apPat} ${this.registro?.predio?.contribuyente?.apMat}`;
        this.item.state = this.registro?.estado;
    }

    onClickGenerarPuntoImagen(): void{
        this.eventGenerarPuntoImagen.emit(this.registro);
    }

    onClickGenerarPredio(): void {
        this.eventGenerarPredio.emit(this.registro);
    }

    onClickOpenItem(): void{
        this.eventOpenItem.emit(this.registro);
    }

    onClickNuevaDireccion(): void {
        this.eventNuevaDireccion.emit(this.registro);
    }

    onClickValidarUbicacion(): void{
        this.eventValidarUbicacion.emit(this.registro);
    }
}
