import { Component, ViewChild , OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { UserMonitoringServiceService } from '../../services/user-monitoring-service.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @ViewChild(MatPaginator) tablePaginator: MatPaginator;
  myControl = new FormControl('');
  options: any[] = [];
  filteredOptions: Observable<string[]>;

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

  displayTextAutocomplete ='';

  constructor(
    private userMonitoringService: UserMonitoringServiceService,
  ) { }

  ngOnInit(): void {
    this.userMonitoringService.getInstitutions().subscribe((res)=>{
      console.log(res);
      this.options = res;

      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value || '')),
      );
    });
    this.defaultPaginator = {previousPageIndex: 0, pageIndex: this.pageIndex, pageSize: this.pageSize, length: 0};

  }

  selectValue(value): void{
    this.displayTextAutocomplete = value.name;
    // Parametros para el servicio de lista de usuarios filtrado por la seleccion del option del search.
    const params = {
      department: value.department,
      province: value.province,
      district: value.district,
      institution: value.institution
    };
  }

  displayTextAutocompleteFn(value): any{
    return value.name;
  }

  private _filter(value: string): any[] {
    if(typeof value === 'object'){
      value = value['name'];
    }
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }
}
