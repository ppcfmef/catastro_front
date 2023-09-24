import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  displayedColumns: string[] = ['nro', 'ticket', 'tipoBrecha', 'fecha', 'actions'];

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

  constructor() { }

  ngOnInit(): void {
  }

}
