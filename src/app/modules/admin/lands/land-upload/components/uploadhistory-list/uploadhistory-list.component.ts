import { BehaviorSubject, merge, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';

import { IPagination } from 'app/core/common/interfaces/common.interface';
import { UploadHistory } from '../../interfaces/upload-history.interface';
import { UploadhistoryService } from '../../services/uploadhistory.service';

@Component({
  selector: 'app-uploadhistory-list',
  templateUrl: './uploadhistory-list.component.html',
  styleUrls: ['./uploadhistory-list.component.scss'],
})
export class UploadhistoryListComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  changesSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  uploadHistorySubscription: Subscription;
  displayedColumns = ['nro', 'startDate', 'ubigeo', 'fileUpload', 'status', 'username', 'totalLand', 'totalLandMapping', 'totalNotLandMapping', 'actions'];
  dataSource: UploadHistory[] = [];
  count = 0;
  pageIndex = 0;
  pageSize = 10;

  constructor(
    private _uploadhistoryService: UploadhistoryService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this._initPagination();
  }

  _initPagination(): void {
    this.uploadHistorySubscription = merge(this.paginator?.page, this.changesSubject)
        .pipe(
            switchMap(() => {
              const limit = this.paginator.pageSize;
              const offset = limit * this.paginator.pageIndex;
              const queryParams = { limit, offset };
              return this._uploadhistoryService.getList(queryParams);
            })
        ).subscribe((response: IPagination<UploadHistory>) => {
          this.count = response.count;
          this.pageIndex = this.paginator.pageIndex;
          this.pageSize = this.paginator.pageSize;
          this.dataSource = response.results;
    });
  }

  onGoToUploadRecordDetail(uploadRecordId: number): void {
    this._router.navigate(['/land/upload/history', uploadRecordId], {relativeTo: this._activatedRoute});
  }

  ngOnDestroy(): void {
    this.uploadHistorySubscription.unsubscribe();
  }
}
