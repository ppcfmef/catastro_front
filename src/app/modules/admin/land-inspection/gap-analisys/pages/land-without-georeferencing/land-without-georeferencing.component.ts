import { Component, OnInit } from '@angular/core';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { LandUI } from 'app/modules/admin/lands/maintenance/interfaces/land.interface';
import { LandGapAnalisysService } from '../../services/land-gap-analisys.service';
import { UserService } from 'app/core/user/user.service';
import { MatDialog } from '@angular/material/dialog';
import { MessageProviderService } from 'app/shared/services/message-provider.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User } from 'app/core/user/user.types';
import { CommonUtils } from 'app/core/common/utils/common.utils';
import { MatPaginator } from '@angular/material/paginator';

@Component({
    selector: 'app-land-without-georeferencing',
    templateUrl: './land-without-georeferencing.component.html',
    styleUrls: ['./land-without-georeferencing.component.scss'],
})
export class LandWithoutGeoreferencingComponent implements OnInit {
    user: User;
    item: FuseNavigationItem;
    items: FuseNavigationItem[];
    dataSource: LandUI[] = [];
    _unsubscribeAll: Subject<any> = new Subject<any>();
    landRecords: LandUI[];
    tableLength: number;
    search: any;
    private unsubscribeAll: Subject<any> = new Subject<any>();

    private defaultTableLimit = 5;
    constructor(
        private landGapAnalisysService: LandGapAnalisysService,
        private _userService: UserService,
        public dialog: MatDialog,
        private _router: Router,
        protected _messageProviderService: MessageProviderService
    ) {
        this._userService.user$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((user: any) => {
                this.user = user;
            });
    }

    ngOnInit(): void {
        this.items = [
            {
                type: 'basic',
                active: true,
                title: 'Predios sin cartografia inicial',
                subtitle: '400',
            },
            {
                type: 'basic',
                active: true,
                title: 'Predios enlazados',
                subtitle: '200',
            },
            {
                type: 'basic',
                active: true,
                title: 'Predios faltantes',
                subtitle: '180',
            },
        ];

        this.getInitList();

    }

    onClearSearch(): void{
        this.search={};
        this.getInitList();
    }

    onChangePage(paginator: MatPaginator | {pageSize: number; pageIndex: number}): void {
        //const ownerFilter = { owner: this.landOwnerId };

        const limit = paginator.pageSize;
        const offset = limit * paginator.pageIndex;
        const filterRawValue = { limit, offset, ...this.search };
        const queryParams=CommonUtils.deleteKeysNullInObject(filterRawValue);
        this.landGapAnalisysService.getList(queryParams)
        .toPromise()
        .then(result => this.landRecords = result.results);
      }


    getInitList(): void {

        const queryParams = { limit: this.defaultTableLimit };

        this.landGapAnalisysService.getList(queryParams)
            .toPromise()
            .then(
            (landResult) => {
                this.landRecords = landResult.results;
                this.tableLength =landResult.count;
            }
            );
      }

      onSearch( search: any ): void{
        this.search = search;
        /*console.log('queryParams>>',queryParams);*/
        this.landGapAnalisysService.getList(this.search)
        .toPromise()
        .then((result) => {
            this.landRecords = result.results;
            this.tableLength =result.count;
        });
      }
}
