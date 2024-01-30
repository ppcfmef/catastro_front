import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {Navigation} from '../../../../../core/navigation/navigation.types';
import {NavigationService} from '../../../../../core/navigation/navigation.service';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';

@Component({
    selector: 'app-menu-items',
    templateUrl: './menu-items.component.html',
    styleUrls: ['./menu-items.component.scss'],
})
export class MenuItemsComponent implements OnInit, OnDestroy {

    navigation: Navigation;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private _navigationService: NavigationService,
        private _router: Router,
    ) {
    }

    /**
     * On init
     */
    ngOnInit(): void {
        // Subscribe to navigation data
        this._navigationService.navigation$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((navigation: Navigation) => {
                this.navigation = navigation;
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any {
        return item.id || index;
    }

    /**
     * Redirect page
     *
     * @param element
     */
    redirectPage(element): void {
        if (element?.link) {
            this._router.navigateByUrl(element.link);
            return;
        }

        const queryParams = {parentId: element.id};
        this._router.navigate(['home', 'items'], {queryParams});
    }

}
