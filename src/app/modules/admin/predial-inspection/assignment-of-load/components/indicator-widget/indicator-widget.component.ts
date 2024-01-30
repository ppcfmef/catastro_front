/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { WidgetService } from '../../services/widget.service';
import { UserService } from 'app/core/user/user.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { User } from 'app/core/user/user.types';
import { FuseSplashScreenService } from '@fuse/services/splash-screen';
import { TableService } from '../../services/table.service';
import { OperatorService } from '../../services/operator.service';
@Component({
    selector: 'app-indicator-widget',
    templateUrl: './indicator-widget.component.html',
    styleUrls: ['./indicator-widget.component.scss']
})
export class IndicatorWidgetComponent implements OnInit, OnDestroy {

    newCard = [];
    _currentUserUbigeo: string;
    _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private _widgetService: WidgetService,
        private _userService: UserService,
        private _tableService: TableService,
        private _fuseSplashScreenService: FuseSplashScreenService,
        private _operatorService: OperatorService,
    ) { }

    ngOnInit(): void {
        this._operatorService.getUbigeo().subscribe((ubigeo) => {
            this._currentUserUbigeo = ubigeo;
            setTimeout(() => {
                this._widgetService.listWidget(this._currentUserUbigeo);
            }, 2000);
            this._widgetService.getDataWidget().subscribe(data => this.newCard = data);
        });

    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

}
