import { merge } from 'rxjs';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { IncomesDataService } from '../../services/incomes-data.service';
import { startWith, switchMap } from 'rxjs/operators';
import { IPagination } from 'app/core/common/interfaces/common.interface';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-rtarancel-container',
  templateUrl: './rtarancel-container.component.html',
  styleUrls: ['./rtarancel-container.component.scss']
})
export class RTArancelContainerComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  formFilters: FormGroup;
  displayedColumns = ['nro', 'ubigeo', 'documentoDesc', 'numDoc', 'nombre', 'apellidoPaterno', 'apellidoMaterno', 'estado'];
  dataSource = [];
  count = 0;
  pageIndex = 0;
  pageSize = 5;
  listFormatMultiple = [
    { code: 'RT_CONTRIBUYENTE', text: 'Tabla RT_Contribuyente', path: '/rtcontribuyente' },
    { code: 'RT_MARCO_PREDIO', text: 'Tabla RT_MarcoPredio', path: '/rtmarco-predrio' },
    { code: 'RT_ARANCEL', text: 'Tabla RT_Arancel', path: '/rtarancel' },
    { code: 'RT_PREDIO_DATO', text: 'Tabla RT_Predio_dato', path: '' },
    { code: 'RT_PREDIO_CARACT', text: 'Tabla RT_Predio_caract', path: '' },
    { code: 'RT_RECAUDACION', text: 'Tabla RT_Recaudacion', path: '' },
    { code: 'RT_DEUDA', text: 'Tabla RT_Deuda', path: '' },
    { code: 'RT_EMISION', text: 'Tabla RT_Emision', path: '' },
    { code: 'RT_BIMPONIBLE', text: 'Tabla RT_BImponible', path: '' },
    { code: 'RT_ALICUOTA', text: 'Tabla RT_Alicuota', path: '' },
    { code: 'RT_AMNCONTRIBUYENTE', text: 'Tabla RT_AmnContribuyente', path: '' },
    { code: 'RT_AMNMUNICIPA', text: 'Tabla RT_AmnMunicipal', path: '' },
    { code: 'RT_VAREM_MUN', text: 'Tabla RT_VarEm_muni', path: '' }
  ];

  constructor(
    private incomesDataService: IncomesDataService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.formFilters = new FormGroup({
      incomePage: new FormControl('')
    });

    this.formFilters.get('incomePage').setValue(this.listFormatMultiple[0]?.path);
  }

  ngAfterViewInit(): void {
    merge(this.paginator?.page)
    .pipe(
      startWith({}),
      switchMap(() => {
        const limit = this.paginator.pageSize;
        const offset = limit * this.paginator.pageIndex;
        const queryParams = { limit, offset };
        return this.incomesDataService.getRTContribuyente(queryParams);
      })
    ).subscribe((response: IPagination<any>) => {
        this.count = response.count;
        this.pageIndex = this.paginator.pageIndex;
        this.pageSize = this.paginator.pageSize;
        this.dataSource = response.results;
    });
  }

  onChangeIncomePage(itemSelect): void {
    this.router.navigate([`/land/incomes${itemSelect.value}`]);
  }

}
