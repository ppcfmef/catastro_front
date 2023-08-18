/* eslint-disable @typescript-eslint/naming-convention */
import { AfterViewInit, ChangeDetectorRef, Component, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild, Renderer2 } from '@angular/core';
import { User } from 'app/core/user/user.types';
import { Subject } from 'rxjs';
import { TableConifg } from '../../../shared/interfaces/table-config.interface';
import { TableColumn } from '../../../shared/interfaces/table-columns.interface';
import { UserService } from 'app/core/user/user.service';
import { takeUntil } from 'rxjs/operators';
import { loadModules } from 'esri-loader';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { StateService } from '../../services/state.service';

@Component({
  selector: 'app-new-load',
  templateUrl: './new-load.component.html',
  styleUrls: ['./new-load.component.scss']
})
export class NewLoadComponent implements OnInit,AfterViewInit,OnDestroy {

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild('apptable') table: MatTable<any>;

    count = 0;

    _portalUrl = 'https://js.arcgis.com/4.27/';

    _queryUbigeo: string;
    _field_ubigeo = 'UBIGEO';



     // Properties app
    _currentUser: User;
    _currentUserUbigeo: string;
    _unsubscribeAll: Subject<any> = new Subject<any>();

    tableConfig: TableConifg = {
        isAction: true,
        isZoom: true,

    };
    tableColumns: TableColumn[] =[];

    dataSource: MatTableDataSource<any>;
    data: any[]=[];
    ngZone: any;
    constructor(
        private _userService: UserService,
        private _stateService: StateService,
        private cdr: ChangeDetectorRef
        ) { }


    ngOnInit(): void {
        this.setTableColumn();
        this._stateService.deleteAll.subscribe( (data) => {
                if(data) {
                    this.data.splice(0, this.data.length);
                    this.dataSource= new MatTableDataSource(this.data);
                    data = false;
                    console.log(data, 'act');
                    console.log(this.dataSource, 'datasource on init');
                }
            });

        this._stateService.row.subscribe((row: any) => {

            if(row[0].status === 1){
                this.data = [...this.data , row[0]];
            }
            else{
                console.log(row, 'row con ');
                const index = this.data.findIndex(data => data.codigo === row[0].codigo);
                console.log(index, 'index');
                if(index === -1) return;
                this.data.splice(index, 1);
            }

            console.log(this.data, 'data');
            this.dataSource= new MatTableDataSource(this.data);
            console.log(this.dataSource, 'datasource on init');
        } );
    }

    // public ngOnChanges(changes: SimpleChanges): void {
    //     this.dataSource = new MatTableDataSource(changes.data.currentValue);
    // }

    ngAfterViewInit(): void {
        this.dataSource = new MatTableDataSource(this.data);
        this.dataSource._updateChangeSubscription();

        console.log(this.dataSource, 'datasource');
    };

    ngOnDestroy(): void {
        this. _unsubscribeAll.next();
        this. _unsubscribeAll.complete();
    }

    setTableColumn(): void {
        this.tableColumns = [
            {matheaderdef:'Nro', matcolumndef:'status', matcelldef: 'status'},
            {matheaderdef:'Codigo', matcolumndef:'codigo', matcelldef: 'codigo'},
            {matheaderdef:'Tipo', matcolumndef:'tipo', matcelldef: 'tipo'},
            {matheaderdef:'Fuente', matcolumndef:'fuente', matcelldef: 'fuente'},
        ];
    }

  //   Implementar logica
    onZoom(row: any): void {
        console.log('zoom',);
    }


}
