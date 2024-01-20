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
import {MatLegacyTable as MatTable, MatLegacyTableDataSource as MatTableDataSource} from '@angular/material/legacy-table';
import {MatLegacyPaginator as MatPaginator} from '@angular/material/legacy-paginator';

@Component({
  selector: 'app-upload-table-files',
  templateUrl: './upload-table-files.component.html',
  styleUrls: ['./upload-table-files.component.scss']
})
export class UploadTableFilesComponent implements OnInit, AfterViewInit, OnChanges {

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
    this.displayedColumns = ['index','status', 'errorCode', 'line', 'data'];
  }
}
