import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, OnDestroy,
    OnInit,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {BehaviorSubject, merge, Subject} from 'rxjs';
import {MatPaginator} from '@angular/material/paginator';
import {switchMap, takeUntil} from 'rxjs/operators';
import {UserService} from '../../../../../../../core/user/user.service';
import {MatDrawer} from '@angular/material/sidenav';
import {ActivatedRoute, Router} from '@angular/router';
import {FuseMediaWatcherService} from '../../../../../../../../@fuse/services/media-watcher';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnInit, AfterViewInit, OnDestroy {

    @ViewChild(MatPaginator) paginator: MatPaginator;

    @ViewChild('matDrawer', {static: true}) matDrawer: MatDrawer;

    drawerMode: 'side' | 'over';

    title = 'Gestion de usuarios';

    displayedColumns = ['nro', 'username', 'rol', 'status', 'creationDate', 'actions'];

    dataSource = [];
    count = 0;

    changesSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _router: Router,
        private _changeDetectorRef: ChangeDetectorRef,
        private _userService: UserService,
        private _fuseMediaWatcherService: FuseMediaWatcherService
    ) {
    }

    /**
     * On init
     */
    ngOnInit(): void {
        // Subscribe to MatDrawer opened change
        this.matDrawer.openedChange.subscribe((opened) => {
            if (!opened) {
                // Remove the selected contact when drawer closed
                // this.selectedContact = null;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            }
        });

        // Subscribe to media changes
        this._fuseMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({matchingAliases}) => {

                // Set the drawerMode if the given breakpoint is active
                if (matchingAliases.includes('lg')) {
                    this.drawerMode = 'side';
                } else {
                    this.drawerMode = 'over';
                }

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
    }

    /**
     * On AfterViewInit
     */
    ngAfterViewInit(): void {
        this.initPagination();
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    /**
     * Init pagination results
     */
    initPagination(): void {
        merge(this.paginator.page, this.changesSubject)
            .pipe(
                switchMap(() => {
                    const queryParamsByPaginator = {} as any;
                    queryParamsByPaginator.limit = this.paginator.pageSize;
                    queryParamsByPaginator.offset = queryParamsByPaginator.limit * this.paginator.pageIndex;
                    return this._userService.getUsers(queryParamsByPaginator);
                })
            ).subscribe((response) => {
            this.count = response.count;
            this.dataSource = response.results;

            // Mark for check
            this._changeDetectorRef.markForCheck();
        });
    }

    /**
     * On backdrop clicked
     */
    onBackdropClicked(): void {
        // Go back to the list
        this._router.navigate(['./'], {relativeTo: this._activatedRoute});

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    redirectPage(id?: number): void {
        // Go back to the list
        this._router.navigate([id ? `./${id}` : './add'], {relativeTo: this._activatedRoute});

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

}
