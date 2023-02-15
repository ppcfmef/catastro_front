import { Component, ViewChild , OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { UserMonitoringServiceService } from '../../services/user-monitoring-service.service';
import {UserService} from '../../../../../../../core/user/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @ViewChild(MatPaginator) tablePaginator: MatPaginator;
  myControl = new FormControl('');
  options: any[] = [];
  userLogged: any = null;
  filteredOptions: Observable<string[]>;

  length: number = 0;
  pageIndex = 0;
  pageSize = 10;
  displayedColumns: string[] = ['nro', 'user', 'names', 'role', 'actions'];
  dataSource = [];
  detailDataSource = [];
  showDetail = false;
  defaultPaginator = null;
  user = null;

  displayTextAutocomplete ='';

  constructor(
    private userMonitoringService: UserMonitoringServiceService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userMonitoringService.getInstitutions().subscribe((res)=>{
      this.options = res;
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value || '')),
      );
    });
    this.defaultPaginator = {previousPageIndex: 0, pageIndex: this.pageIndex, pageSize: this.pageSize, length: 0};
    this.userService.user$.subscribe((user) => {
        this.userService.getUserById(user.id).subscribe((res) => {
            this.userLogged = res;
        });
    });
  }

  selectValue(value): void{
    this.displayTextAutocomplete = value.name;
    const params = {
      department: value.department,
      province: value.province,
      district: value.district,
      institution: value.institution
    };
    this.userMonitoringService.getHistoryAcctions(params).subscribe((res) => {
        this.dataSource = res;
    });
  }

  displayTextAutocompleteFn(value): any{
    return value.name;
  }

  handlerShowDetail(flag: boolean): void {
    this.showDetail = !flag;
  }

  showHistoryDetail(user: any): void {
    this.showDetail = !this.showDetail;
    this.userService.getUserById(user.id).subscribe((detailUser) => {
        this.user = detailUser;
        let nameOf = '';
        if (this.user.placeScope.id === 2) {
            nameOf = `${this.user.institution.name} de ${this.user.department.name}`;
        }
        else if (this.user.placeScope.id === 3) {
            nameOf = `${this.user.institution.name} de ${this.user.province.name}`;
        }
        else if (this.user.placeScope.id === 4){
            nameOf = `${this.user.institution.name} de ${this.user.district.name}`;
        }
        this.user.institutionLabel = nameOf;
        const params = {
            username: this.user.username
        };
        this.userMonitoringService.getHistoryDetail(params).subscribe((data) => {
            this.detailDataSource = data;
        });
    });
  }

  private _filter(value: string): any[] {
    if(typeof value === 'object'){
      value = value['name'];
    }
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }
}
