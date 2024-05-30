import {
    Component,
    OnDestroy,
    OnInit,
} from '@angular/core';
import {Navigation} from '../../../../../core/navigation/navigation.types';
import {forkJoin, Subject, zip} from 'rxjs';
import {NavigationService} from '../../../../../core/navigation/navigation.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {map, mergeAll, startWith, switchMap, take, takeUntil} from 'rxjs/operators';
import {FuseNavigationItem} from '../../../../../../@fuse/components/navigation';

@Component({
    selector: 'app-detail-item',
    templateUrl: './detail-item.component.html',
    styleUrls: ['./detail-item.component.scss'],
})
export class DetailItemComponent implements OnInit, OnDestroy {

    navigationItems: FuseNavigationItem[];

    queryParams: Params;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _router: Router,
        private _navigationService: NavigationService,
    ) {
        this._activatedRoute.queryParams
            .pipe(
                switchMap((params: Params) => {
                    this.queryParams = params;
                    return this._navigationService.navigation$;
                })
            ).subscribe((navigation: Navigation) => {
            // set values in queryPrams
            this.navigationItems = this.getNavigationItems(navigation);
            const filtrados = this.navigationItems.filter((item)=>{
                const orders = [4151, 4130, 4132, 4134];
                // eslint-disable-next-line @typescript-eslint/prefer-for-of
                for (let index = 0; index < orders.length; index++) {
                    if(item['order'] === orders[index]){
                        return false;
                    }
                }

                return item;
            });

            this.navigationItems = filtrados;
        });
    }

    /**
     * On init
     */
    ngOnInit(): void {
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
     * Get navigation items
     *
     * @param navigation
     */
    getNavigationItems(navigation: Navigation): FuseNavigationItem[] {
        const filterNavigation = navigation.default.filter(el => el.id === this.queryParams.parentId);
        return filterNavigation?.length > 0 ? filterNavigation[0].children : [];
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
    }

}
