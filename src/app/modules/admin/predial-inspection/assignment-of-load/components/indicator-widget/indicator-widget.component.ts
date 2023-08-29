/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { WidgetService } from '../../services/widget.service';
import { UserService } from 'app/core/user/user.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { User } from 'app/core/user/user.types';
import { FuseSplashScreenService } from '@fuse/services/splash-screen';
@Component({
    selector: 'app-indicator-widget',
    templateUrl: './indicator-widget.component.html',
    styleUrls: ['./indicator-widget.component.scss']
})
export class IndicatorWidgetComponent implements OnInit, OnDestroy{

    newCard =[];
    _currentUserUbigeo: string;
    _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private _widgetService: WidgetService,
        private _userService: UserService,
        private _fuseSplashScreenService: FuseSplashScreenService,
    ) {}

    ngOnInit(): void {
        this._userService.user$
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((user: User) => {
            this._currentUserUbigeo = user.ubigeo ? user.ubigeo : '040703';
        });
        this._widgetService.listWidget(this._currentUserUbigeo);
        this._widgetService.getDataWidget().subscribe(data =>  this.newCard = data
        );
    }

    ngOnDestroy(): void
    {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

}
