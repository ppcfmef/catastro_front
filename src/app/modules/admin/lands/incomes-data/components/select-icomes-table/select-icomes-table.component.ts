import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-select-icomes-table',
  templateUrl: './select-icomes-table.component.html',
  styleUrls: ['./select-icomes-table.component.scss']
})
export class SelectIcomesTableComponent implements OnInit {
  @Input() selectedTable: string;
  formFilters: FormGroup;

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
    { code: 'RT_AMNMUNICIPAL', text: 'Tabla RT_AmnMunicipal', path: '' },
    { code: 'RT_VAREM_MUNI', text: 'Tabla RT_VarEm_muni', path: '' }
  ];

  constructor(
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.formFilters = new FormGroup({
      incomePage: new FormControl('')
    });

    const selectedTablePath = this.listFormatMultiple.filter((item) => item.code === this.selectedTable) || this.listFormatMultiple[0];
    this.formFilters.get('incomePage').setValue(selectedTablePath[0]?.path);
  }

  onChangeIncomePage(itemSelect): void {
    this.router.navigate([`/land/incomes${itemSelect.value}`]);
  }

}
