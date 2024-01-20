import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import {MatLegacyDialog as MatDialog} from '@angular/material/legacy-dialog';
import { MatLegacyPaginator as MatPaginator } from '@angular/material/legacy-paginator';
import {User} from 'app/core/user/user.types';
import {HistoricalRecordDetailComponent} from '../detail/historical-record-detail/historical-record-detail.component';
import { UserMonitoringServiceService } from '../../services/user-monitoring-service.service';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  @Input() showMe = false;
  @Input() dataSource = [];
  @Input() selectedUser: User;
  @Output() showList = new EventEmitter<boolean>();
  @ViewChild(MatPaginator) tablePaginator: MatPaginator;

  length: number = 0;
  pageIndex = 0;
  pageSize = 10;
  displayedColumns: string[] = ['nro', 'module', 'action', 'date'];
  defaultPaginator;

  constructor(
    public dialog: MatDialog,
    private userMonitoringService: UserMonitoringServiceService
  ) { }

  ngOnInit(): void {
  }

  showHistoryList(): void {
    this.showList.emit(!this.showMe);
  }

  print(): void{
    window.print();
  }

  showHistoricalRecordDetail(data: any): void {
    this.userMonitoringService.getHistoricalObjectDetail(data.id).subscribe((res) => {
        this.dialog.open(HistoricalRecordDetailComponent, {
            data: res.contentObject,
            width: '550px'
        });
    });

  }
}
