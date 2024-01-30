/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResultsService } from '../../services/results.service';
import { TicketService } from '../../services/ticket.service';
import { ITicket } from '../../interfaces/ticket.interface';
//import { type } from 'os';
import { TicketStatus } from 'app/shared/enums/ticket-status.enum';
import { FormBuilder, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { CommonUtils } from 'app/core/common/utils/common.utils';
import { MatPaginator } from '@angular/material/paginator';
import { User } from 'app/core/user/user.types';
import { ExportUtils } from 'app/shared/utils/export.util';
@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
    tabIndex=0;
  displayedColumns: string[] = ['nro', 'codTicket', 'tipoBrecha', 'fecha', 'actions'];
  user: User;
  dataSource = [
    {
      nro: 1,
      ticket: 125,
      tipoBrecha: 'Punto image',
      fechaBrecha: '30/05/2023',
      direccion: 'Calle San Juan de Miraflores 123',
      fecha: 'Fecha 1',
    },
    {
      nro: 2,
      ticket: 126,
      tipoBrecha: 'Punto image',
      fechaBrecha: '30/05/2023',
      direccion: 'Calle San Juan de Miraflores 124',
      fecha: 'Fecha 2',
    },
    {
      nro: 3,
      ticket: 127,
      tipoBrecha: 'Punto image',
      fechaBrecha: '30/05/2023',
      direccion: 'Calle San Juan de Miraflores 125',
      fecha: 'Fecha 3',
    },
    {
      nro: 4,
      ticket: 128,
      tipoBrecha: 'Punto image',
      fechaBrecha: '30/05/2023',
      direccion: 'Calle San Juan de Miraflores 126',
      fecha: 'Fecha 4',
    },
    {
      nro: 5,
      ticket: 129,
      tipoBrecha: 'Punto image',
      fechaBrecha: '30/05/2023',
      direccion: 'Calle San Juan de Miraflores 127',
      fecha: 'Fecha 5',
    },
  ];

  dataSourcePendiente=[];
  dataSourceObservado=[];
  dataSourceAceptado=[];
  tablePendienteLength=0;
  tableObservadoLength=0;
  tableAceptadoLength=0;
  form: UntypedFormGroup;
  queryParams: any;
  ubigeo: string;
  pageSize = 5;

  constructor(
    private _route: Router,
    private _activeRouter: ActivatedRoute,
    private _tickerService: TicketService,
    private _resultService: ResultsService,

    private _fb: FormBuilder
    ) {

        const isAdmin =localStorage.getItem('isAdmin') ==='true'? true: false;

            this._resultService.getUbigeo().subscribe((ubigeo)=>{
                console.log('results ubigeo>>>',ubigeo);
                if (ubigeo){

                    this.ubigeo= ubigeo;
                    this.queryParams.codTicket = this.ubigeo;
                }
                this.getTicketsPendientes();
                this.getTicketsAceptados();
                this.getTicketsObservados();
                this._resultService.setResetMap(1);

            });



    }


  ngOnInit(): void {
    this.initForm();

    this.queryParams={limit: this.pageSize};
    this.user=localStorage.getItem('user')?JSON.parse(localStorage.getItem('user')):null;

    /*localStorage.setItem('user',JSON.stringify(this.user));*/

    this.ubigeo =
    this.user && this.user.ubigeo
        ? this.user.ubigeo
        : null;

        if (this.ubigeo){

            this.queryParams.codTicket = this.ubigeo;
        }
        this.getTicketsPendientes();
        this.getTicketsAceptados();
        this.getTicketsObservados();
        this._resultService.setResetMap(1);


    /*this.queryParams={limit: this.pageSize};

    this.getTicketsPendientes();
    this.getTicketsAceptados();
    this.getTicketsObservados();

    this.user=localStorage.getItem('user')?JSON.parse(localStorage.getItem('user')):null;*/


  }



  initForm(): void {

    this.form = this._fb.group({
      search: [''],
    });
  }

  onSearch(e: any): void {
    const search = this.form.get('search').value;
    this.queryParams.search=search;
    /*this.queryParams={ search:search,cod_ticket__contains: this.ubigeo};*/
    this.getTicketsPendientes();
    this.getTicketsAceptados();
    this.getTicketsObservados();

  }

  onCleanSearch(e: any): void {
    this.queryParams.search=null;

    this.form.get('search').setValue(null);
    this.getTicketsPendientes();
    this.getTicketsAceptados();
    this.getTicketsObservados();

  }

  getTicketsPendientes(): void{
    /*const params= {codEstTrabajoTicket: TicketStatus.PENDIENTE_GESTION_RESULTADOS,search: this.ubigeo, ...this.queryParams };*/
    const filterRawValue = {
        codEstTrabajoTicket: TicketStatus.PENDIENTE_GESTION_RESULTADOS, ...this.queryParams
    };
    console.log('filterRawValue',filterRawValue);
    /*this.getData(filterRawValue,this.dataSourcePendiente,this.tablePendienteLength);*/
    const queryParams = CommonUtils.deleteKeysNullInObject(filterRawValue);

    this._tickerService.getList2(queryParams).subscribe( (res: any)=>{

      this.dataSourcePendiente =res.results.map((r: ITicket)=>({
          id:r.id,
          codTicket: r.codTicket,
          tipoBrecha: r.tipoTicket,
          fechaBrecha: r.fecAsignacion,
          direccion: '',
          fecha: r.fecUltimaActualizacion}));
        this.tablePendienteLength= res.count;
    });
  }
  getTicketsObservados(): void {
    const filterRawValue = {
        codEstTrabajoTicket: TicketStatus.OBSERVADO_GESTION_RESULTADOS, ...this.queryParams
    };

   /* this.getData(filterRawValue,this.dataSourceObservado,this.tableObservadoLength);*/
    const queryParams = CommonUtils.deleteKeysNullInObject(filterRawValue);

    this._tickerService.getList2(queryParams).subscribe( (res: any)=>{

      this.dataSourceObservado =res.results.map((r: ITicket)=>({
          id:r.id,
          codTicket: r.codTicket,
          tipoBrecha: r.tipoTicket,
          fechaBrecha: r.fecAsignacion,
          direccion: '',
          fecha: r.fecUltimaActualizacion}));

          this.tableObservadoLength = res.count;
    });

    /*const params= {codEstTrabajoTicket: TicketStatus.OBSERVADO_GESTION_RESULTADOS,...this.queryParams};
    this._tickerService.getList( params).subscribe( (res: any)=>{

      this.dataSourceObservado =res.results.map((r: ITicket)=>({
          id:r.id,
          codTicket: r.codTicket,
          tipoBrecha: r.tipoTicket,
          fechaBrecha: r.fecAsignacion,
          direccion: '',
          fecha: r.fecUltimaActualizacion}));
    });*/
  }


  getTicketsAceptados(): void{

    const filterRawValue = {
        codEstTrabajoTicket: TicketStatus.RESUELTO_GESTION_RESULTADOS, ...this.queryParams
    };

    const queryParams = CommonUtils.deleteKeysNullInObject(filterRawValue);

    this._tickerService.getList2(queryParams).subscribe( (res: any)=>{

        this.dataSourceAceptado =res.results.map((r: ITicket)=>({
          id:r.id,
          codTicket: r.codTicket,
          tipoBrecha: r.tipoTicket,
          fechaBrecha: r.fecAsignacion,
          direccion: '',
          fecha: r.fecUltimaActualizacion}));
        this.tableAceptadoLength = res.count;
    });
    /*this.getData(filterRawValue,this.dataSourceAceptado,this.tableAceptadoLength);*/


  }

   getData(filterRawValue: any,dataTable?: any,tableLength?: number): void {

    const queryParams = CommonUtils.deleteKeysNullInObject(filterRawValue);
    /*const res=await this._tickerService.getList2(queryParams).toPromise();*/
    /*dataTable =res.results.map((r: ITicket)=>({
        id:r.id,
        codTicket: r.codTicket,
        tipoBrecha: r.tipoTicket,
        fechaBrecha: r.fecAsignacion,
        direccion: '',
        fecha: r.fecUltimaActualizacion}));

        tableLength = res.count;

    return {dataTable,tableLength};*/
    this._tickerService.getList2(queryParams).subscribe( (res: any)=>{

        dataTable =res.results.map((r: ITicket)=>({
          id:r.id,
          codTicket: r.codTicket,
          tipoBrecha: r.tipoTicket,
          fechaBrecha: r.fecAsignacion,
          direccion: '',
          fecha: r.fecUltimaActualizacion}));

          tableLength = res.count;
    });


}


onChangePagePendiente(
    paginator: MatPaginator | { pageSize: number; pageIndex: number }
): void {
    //console.log('paginator', paginator);
    const limit = paginator.pageSize;
    const offset = limit * paginator.pageIndex;
    const filterRawValue = {
        limit,
        offset,
        codEstTrabajoTicket: TicketStatus.PENDIENTE_GESTION_RESULTADOS,
        ...this.queryParams
    };

    const queryParams = CommonUtils.deleteKeysNullInObject(filterRawValue);

    this._tickerService.getList2(queryParams).subscribe( (res: any)=>{

      this.dataSourcePendiente =res.results.map((r: ITicket)=>({
          id:r.id,
          codTicket: r.codTicket,
          tipoBrecha: r.tipoTicket,
          fechaBrecha: r.fecAsignacion,
          direccion: '',
          fecha: r.fecUltimaActualizacion}));

          this.tablePendienteLength = res.count;
    });

    /*this.getData(filterRawValue,this.dataSourcePendiente,this.tablePendienteLength);*/
 }

 onChangePageAceptado(
    paginator: MatPaginator | { pageSize: number; pageIndex: number }
): void {
    console.log('paginator', paginator);
    const limit = paginator.pageSize;
    const offset = limit * paginator.pageIndex;
    const filterRawValue = {
        limit,
        offset,
        codEstTrabajoTicket: TicketStatus.RESUELTO_GESTION_RESULTADOS,
        ...this.queryParams
    };

    const queryParams = CommonUtils.deleteKeysNullInObject(filterRawValue);

    this._tickerService.getList2(queryParams).subscribe( (res: any)=>{

      this.dataSourceAceptado =res.results.map((r: ITicket)=>({
          id:r.id,
          codTicket: r.codTicket,
          tipoBrecha: r.tipoTicket,
          fechaBrecha: r.fecAsignacion,
          direccion: '',
          fecha: r.fecUltimaActualizacion}));

          this.tableAceptadoLength = res.count;
    });
;
 }

 onChangePageObservado(
    paginator: MatPaginator | { pageSize: number; pageIndex: number }
): void {

    const limit = paginator.pageSize;
    const offset = limit * paginator.pageIndex;
    const filterRawValue = {
        limit,
        offset,
        codEstTrabajoTicket: TicketStatus.OBSERVADO_GESTION_RESULTADOS,
        ...this.queryParams
    };

    const queryParams = CommonUtils.deleteKeysNullInObject(filterRawValue);

    this._tickerService.getList2(queryParams).subscribe( (res: any)=>{

      this.dataSourceObservado =res.results.map((r: ITicket)=>({
          id:r.id,
          codTicket: r.codTicket,
          tipoBrecha: r.tipoTicket,
          fechaBrecha: r.fecAsignacion,
          direccion: '',
          fecha: r.fecUltimaActualizacion}));

          this.tableObservadoLength = res.count;
    });

 }

  onZoom(row: any): void {
    this._route.navigate([`ticket/${row.codTicket}`], {relativeTo: this._activeRouter});
    console.log('onZoom', row);
  }

  onZoomObservado(row: any): void {
    this._route.navigate([`ticket-rejected/${row.id}`], {relativeTo: this._activeRouter});
    console.log('onZoomObservado', row);
  }

  onZoomTerminado(row: any): void {
    this._route.navigate([`ticket-done/${row.id}`], {relativeTo: this._activeRouter});
    console.log('onZoomTerminado', row);
  }

  getSelectedIndex(): any  {
    this.tabIndex=parseInt(localStorage.getItem('tabIndex'),10);
    return this.tabIndex;
  }

  onTabChange(event: any): any {

    this.tabIndex = event.index;
    localStorage.setItem('tabIndex',String(this.tabIndex));

  }

  exportDataToExcel(): void {
    const filterRawValue = {

        ...this.queryParams
    };
    const queryParams = CommonUtils.deleteKeysNullInObject(filterRawValue);
    this._tickerService.getList2(queryParams).subscribe( (res: any)=>{

        const dataExcel =res.results.map((r: ITicket)=>({
            'Codigo de Ticket': r.codTicket,
            'Tipo de brecha': r.tipoTicket,
            'Fecha de Atencion': r.fecUltimaActualizacion,
            'Estado de Trabajo': r.estTrabajoTicket,
        }));
        ExportUtils.exportToExcel(dataExcel, 'Tickets.xlsx');

      });

}
}
