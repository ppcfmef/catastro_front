import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { IRegistroTitularidad } from '../../interfaces/registro-titularidad.interface';
import { LandOwnerService } from 'app/modules/admin/lands/land-registry/services/land-owner.service';
import { LandOwner } from 'app/modules/admin/lands/land-registry/interfaces/land-owner.interface';
import { IPagination } from 'app/core/common/interfaces/common.interface';
import { FormControl, FormGroup } from '@angular/forms';

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
        landOwner: LandOwner;
        formFilters: FormGroup;
        foundLandOwner = true;

  constructor(  private _landOwnerService: LandOwnerService,) { }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes>>',changes);
    this.getDataItem();
  }

  ngOnInit(): void {
    this.createFormFilters();
    this.getDataItem();
  }

  getDataItem(): void{
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
    this.eventOpenItem.emit(this.registro);
  }

  onEventSearchContribuyente(): void{
    const rawValue = this.formFilters.getRawValue();
    const search = rawValue?.search || '';
    const queryParams = { search };
    if(search!==''){
      this._landOwnerService.getList(queryParams)
      .subscribe((response: IPagination<LandOwner>) => {
        if( response && response.results && response.results.length>0 ){
          this.landOwner = response.results[0];
          this.foundLandOwner =true;
        }
        else{
          this.foundLandOwner =false;
        }
  
      });
    }

  }
  private createFormFilters(): void {
    this.formFilters = new FormGroup({
      search: new FormControl(),
    });
  }

}
