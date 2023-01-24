import { Component, ViewChild , OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import {MatTable} from '@angular/material/table';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  myControl = new FormControl('');
  options: any[] = [
    {dist:'Municipalidad de San Borja'},
    {dist:'Municipalidad de Jesus María'},
    {dist:'Municipalidad de Breña'},
    {dist:'Municipalidad de Santiago de Surco'}
     ];
  filteredOptions: Observable<string[]>;
  @ViewChild(MatPaginator) tablePaginator: MatPaginator;

  length: number = 0;
  pageIndex = 0;
  pageSize = 10;
  displayedColumns: string[] = ['nro', 'user', 'names', 'role', 'actions'];
  dataSource = [
    {user: '45797127', nombres: 'Adán Mateos-Gallart', rol: 'Operador cartográfico', acciones: 6},
    {user: '45797127', nombres: 'Adán Mateos-Gallart', rol: 'Operador cartográfico', acciones: 6},
    {user: '45797127', nombres: 'Adán Mateos-Gallart', rol: 'Operador cartográfico', acciones: 6},
    {user: '45797127', nombres: 'Adán Mateos-Gallart', rol: 'Operador cartográfico', acciones: 6},
    {user: '45797127', nombres: 'Adán Mateos-Gallart', rol: 'Operador cartográfico', acciones: 6},
  ];
  defaultPaginator;

  constructor() { }

  

  ngOnInit() {
    this.defaultPaginator = {previousPageIndex: 0, pageIndex: this.pageIndex, pageSize: this.pageSize, length: 0};
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): any[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.dist.toLowerCase().includes(filterValue));
  }
}