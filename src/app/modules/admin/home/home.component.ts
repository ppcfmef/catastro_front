import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {MatDrawer} from '@angular/material/sidenav';
import {Navigation} from '../../../core/navigation/navigation.types';
import {FuseNavigationService} from '../../../../@fuse/components/navigation';
import {takeUntil} from 'rxjs/operators';
import {NavigationService} from '../../../core/navigation/navigation.service';
import {Subject} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit, OnDestroy {

    @ViewChild('matDrawer', {static: true}) matDrawer: MatDrawer;
    drawerMode: 'side' | 'over';
    navigationType: 'aside'
        | 'basic'
        | 'collapsable'
        | 'divider'
        | 'group'
        | 'spacer';

    title = 'Menú Principal';

    navigation: Navigation;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _fuseNavigationService: FuseNavigationService,
        private _navigationService: NavigationService,
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
                console.log('navigation', this.navigation);
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
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
     * On backdrop clicked
     */
    onBackdropClicked(): void
    {
        // Go back to the list
        this._router.navigate(['./'], {relativeTo: this._activatedRoute});

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

}
