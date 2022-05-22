import {
  Component,
  OnInit,
  Input,
  ViewChild,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter
} from '@angular/core';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-table-files',
  templateUrl: './table-files.component.html',
  styleUrls: ['./table-files.component.scss']
})
export class TableFilesComponent implements OnInit, AfterViewInit, OnChanges {

  @ViewChild(MatTable) recordsTable: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @Input() styleTable = '';
  @Input() title = '';
  @Input() records: any[];
  @Input() isDownload = false;
  @Input() posicionExcel = false;

  @Output() eventDownload = new EventEmitter();
  params = {limit:50, offset:0};
  dataSource = new MatTableDataSource<any>([]);

  displayedColumns: string[];


  constructor() {
  }

  ngOnInit(): void {
      this.generateColumns();
  }

  ngAfterViewInit(): void {
      this.dataSource.paginator = this.paginator;
  }

  ngOnChanges(changes: SimpleChanges): void {
      if (changes.records.currentValue) {
          this.dataSource.data = this.records;
      }
  }


  page(ev: any): void{
      this.params['limit'] = ev.pageSize;
      this.params['offset'] = ev.pageSize * ev.pageIndex;
    }

  generateColumns(): void{
      if(this.posicionExcel){
          this.displayedColumns = ['index','codigo', 'depCensal',];
      }else{
          this.displayedColumns = ['index', 'depCensal', 'provCensal', 'distCensal','jb','empadronador','periodo','nivel','codigo', 'ruta', 'estadoUdra'];
      }

  }
}

