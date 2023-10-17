import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { IRegistroTitularidad } from '../../interfaces/registro-titularidad.interface';

@Component({
  selector: 'app-case-suministro',
  templateUrl: './case-suministro.component.html',
  styleUrls: ['./case-suministro.component.scss']
})
export class CaseSuministroComponent implements OnInit, OnChanges {

    @Input() registro: IRegistroTitularidad;
    @Output() eventGenerarNotificacion: EventEmitter<any> = new EventEmitter<any>();
    @Output() eventOpenItem: EventEmitter<any> = new EventEmitter<any>();
    /*@Input() set ticket(data: any) {
        this.tickets = data;
    }*/
    item =
        {
            tipo:1,
            codCase: '00986',
            firstname: 'Jhon',
            lastname:'Perez',
            dni:'44458926',
            state:1
        };
        isOpen = false;
  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes>>',changes);
    this.refreshForm();
  }

  ngOnInit(): void {
    this.refreshForm();
  }

  refreshForm(): void{
    this.item.codCase = this.registro?.suministro?.numSumis;
    this.item.tipo = 2;
    this.item.dni = this.registro?.predio?.contribuyente?.docIden;
    this.item.firstname = this.registro?.predio?.contribuyente?.nombre;
    this.item.lastname = `${this.registro?.predio?.contribuyente?.apPat} ${this.registro?.predio?.contribuyente?.apMat}`;
    this.item.state = this.registro?.estado;
  }

  onClickGenerarNotificacion(): void {
    this.eventGenerarNotificacion.emit(this.registro);
  }

  onClickOpenItem(): void{
    this.eventOpenItem.emit();
}
}
