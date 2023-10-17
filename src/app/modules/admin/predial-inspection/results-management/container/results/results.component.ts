import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResultsService } from '../../services/results.service';
import { TicketService } from '../../services/ticket.service';
import { ITicket } from '../../interfaces/ticket.interface';
import { type } from 'os';
import { TicketStatus } from 'app/shared/enums/ticket-status.enum';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  displayedColumns: string[] = ['nro', 'codTicket', 'tipoBrecha', 'fecha', 'actions'];

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
  constructor(
    private _route: Router,
    private _activeRouter: ActivatedRoute,
    private _tickerService: TicketService,
    private _resultService: ResultsService
    ) { }

  ngOnInit(): void {
    this.getTicketsPendientes();
    this.getTicketsAceptados();
    this.getTicketsObservados();
    this._resultService.setResetMap(1);
  }

  getTicketsPendientes(): void{
    const params= {codEstTrabajoTicket: TicketStatus.PENDIENTE_GESTION_RESULTADOS};
    this._tickerService.getList( params).subscribe( (res: any)=>{

      this.dataSourcePendiente =res.results.map((r: ITicket)=>({
          id:r.id,
          codTicket: r.codTicket,
          tipoBrecha: r.tipoTicket,
          fechaBrecha: r.fecAsignacion,
          direccion: '',
          fecha: r.fecUltimaActualizacion}));
    });
  }
  getTicketsObservados(): void {
    const params= {codEstTrabajoTicket: TicketStatus.OBSERVADO_GESTION_RESULTADOS};
    this._tickerService.getList( params).subscribe( (res: any)=>{

      this.dataSourceObservado =res.results.map((r: ITicket)=>({
          id:r.id,
          codTicket: r.codTicket,
          tipoBrecha: r.tipoTicket,
          fechaBrecha: r.fecAsignacion,
          direccion: '',
          fecha: r.fecUltimaActualizacion}));
    });
  }

  getTicketsAceptados(): void{
    const params= {codEstTrabajoTicket: TicketStatus.RESUELTO_GESTION_RESULTADOS};
    this._tickerService.getList( params).subscribe( (res: any)=>{

      this.dataSourceAceptado =res.results.map((r: ITicket)=>({
          id:r.id,
          codTicket: r.codTicket,
          tipoBrecha: r.tipoTicket,
          fechaBrecha: r.fecAsignacion,
          direccion: '',
          fecha: r.fecUltimaActualizacion}));
    });
    
  }
  /*onZoom(row: any): void {
    this._route.navigate([`ticket-pending/${row.ticket}`], {relativeTo: this._activeRouter});
    console.log('onZoom', row);
  }*/

  onZoom(row: any): void {
    this._route.navigate([`ticket/${row.id}`], {relativeTo: this._activeRouter});
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
}
