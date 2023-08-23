import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from 'app/core/user/user.service';
import { Subject } from 'rxjs';
import { LandGapAnalisysService } from '../../services/land-gap-analisys.service';
import { MessageProviderService } from 'app/shared/services/message-provider.service';
import { MatPaginator } from '@angular/material/paginator';
import { CommonUtils } from 'app/core/common/utils/common.utils';
import { Card } from '../../../shared/interfaces/card.interface';

@Component({
    selector: 'app-georeferencing',
    templateUrl: './georeferencing.component.html',
    styleUrls: ['./georeferencing.component.scss'],
})
export class GeoreferencingComponent implements OnInit {
    cards = [
        {
            title: 'predios sin cartografía inicial',
            numb: '400',
            border: '#003052',
            color: '#8BCDF9',
            arrayStatus: null,
        },
        {
            title: 'predios ubicados',
            numb: '200',
            border: '#073E0A',
            color: '#80C684',
            arrayStatus: [1, 2],
        },
        {
            title: 'predios faltantes',
            numb: '182',
            border: '#523100',
            color: '#FAC375',
            arrayStatus: [0],
        },
        {
            title: 'predios observados',
            numb: '20',
            border: '#6D0000',
            color: '#EB7070',
            arrayStatus: [3],
        },
    ];

    displayedColumns: string[] = [
        'nro',
        'cpm',
        'ownerName',
        'direccion',
        'estado',
        'actions',
    ];

    dataSource = [
        {
            nro: 1,
            cpm: '45678-4561381-22',
            ownerName: 'Abel Contreras Hinostroza',
            direccion: 'Av. Los Ciruelos 728 Piso 2 Depto 89 int2',
            estado: 'pendiente',
            actions: '',
        },
        {
            nro: 2,
            cpm: '45678-4561381-22',
            ownerName: 'Abel Contreras Hinostroza',
            direccion: 'Av. Los Ciruelos 728 Piso 2 Depto 89 int2',
            estado: 'ubicado',
            actions: '',
        },
        {
            nro: 3,
            cpm: '45678-4561381-22',
            ownerName: 'Abel Contreras Hinostroza',
            direccion: 'Av. Los Ciruelos 728 Piso 2 Depto 89 int2',
            estado: 'observado',
            actions: '',
        },
    ];

    tableLength: number;
    search: any;
    filterStatusGapAnalisys: any;
    private unsubscribeAll: Subject<any> = new Subject<any>();

    private defaultTableLimit = 5;
    constructor(
        private landGapAnalisysService: LandGapAnalisysService,
        private _userService: UserService,
        public dialog: MatDialog,
        private _router: Router,
        protected _messageProviderService: MessageProviderService
    ) {}

    ngOnInit(): void {
        this.getInitStadistics();
        this.getInitList();
    }

    getInitList(): void {
        const queryParams = { limit: this.defaultTableLimit };

        this.landGapAnalisysService
            .getList(queryParams)
            .toPromise()
            .then((landResult) => {
                this.dataSource = landResult.results;
                this.tableLength = landResult.count;
            });
    }

    getInitStadistics(): void {
        this.landGapAnalisysService
            .geStadistictsStatus()
            .toPromise()
            .then((results: any[]) => {
                this.cards.forEach((card) => {
                    if (card.arrayStatus){
                        let s = 0;
                        card.arrayStatus.forEach((idStatus) => {
                            const rs = results.find(
                                r => r.statusGapAnalisys === idStatus
                            );
                            s = s + (rs.count ? rs.count : 0);
                        });
                        card.numb = String(s);
                    }

                    else{
                        let s = 0;

                        results.forEach((rs) => {

                            s = s + (rs.count ? rs.count : 0);
                        });

                        card.numb = String(s);
                    }

                });
            });
    }


    onClearSearch(): void {
        this.search = {};
        this.getInitList();
    }

    onSearch(search: any): void {
        this.search = search;
        /*console.log('queryParams>>',queryParams);*/
        this.landGapAnalisysService
            .getList(this.search)
            .toPromise()
            .then((result) => {
                this.dataSource = result.results;
                this.tableLength = result.count;
            });
    }

    onFilterStatus(card: Card): void{

        const arrayStatus=card.arrayStatus;
        if (arrayStatus){
            // eslint-disable-next-line @typescript-eslint/naming-convention
            this.filterStatusGapAnalisys={ 'status_gap_analisys__in':arrayStatus.join(',')};
            this.landGapAnalisysService
            .getList(this.filterStatusGapAnalisys)
            .toPromise()
            .then((result) => {
                this.dataSource = result.results;
                this.tableLength = result.count;
            });
        }
        else{
            this.filterStatusGapAnalisys={};
            this.onClearSearch();
        }


    }

    onChangePage(
        paginator: MatPaginator | { pageSize: number; pageIndex: number }
    ): void {
        //const ownerFilter = { owner: this.landOwnerId };

        const limit = paginator.pageSize;
        const offset = limit * paginator.pageIndex;
        const filterRawValue = { limit, offset, ...this.search , ...this.filterStatusGapAnalisys};
        const queryParams = CommonUtils.deleteKeysNullInObject(filterRawValue);
        this.landGapAnalisysService
            .getList(queryParams)
            .toPromise()
            .then(result => (this.dataSource = result.results));
    }
}
