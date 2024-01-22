import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {MatDrawer} from '@angular/material/sidenav';
import {ActivatedRoute, Router} from '@angular/router';
import {BehaviorSubject, merge, Subject} from 'rxjs';
import {MatLegacyPaginator as MatPaginator} from '@angular/material/legacy-paginator';
import {UserService} from '../../../../../../../core/user/user.service';
import {FuseMediaWatcherService} from '../../../../../../../../@fuse/services/media-watcher';
import {FuseConfirmationService} from '../../../../../../../../@fuse/services/confirmation';
import {debounceTime, switchMap, takeUntil} from 'rxjs/operators';
import {CommonUtils} from '../../../../../../../core/common/utils/common.utils';
import {UntypedFormBuilder, UntypedFormGroup} from '@angular/forms';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnInit, AfterViewInit {

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild('matDrawer', {static: true}) matDrawer: MatDrawer;

    drawerMode: 'side' | 'over';

    title = 'Gestion de roles y permisos';

    filters: UntypedFormGroup;

    displayedColumns = ['nro', 'name', 'description', 'status', 'actions'];

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
        private _fb: UntypedFormBuilder,
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private _fuseConfirmationService: FuseConfirmationService,
    ) {
    }

    /**
     * On init
     */
    ngOnInit(): void {

        this.filters = this._fb.group({
            search: ['']
        });

        // Subscribe to MatDrawer opened change
        this.matDrawer?.openedChange?.subscribe((opened) => {
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

        this._userService._refreshRoles
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((_) => {
                this.changesSubject.next(true);
            });
    }

    /**
     * On AfterViewInit
     */
    ngAfterViewInit(): void {
        this.initPagination();
    }

    /**
     * Init pagination results
     */
    initPagination(): void {
        merge(this.paginator?.page, this.changesSubject, this.filters.valueChanges)
            .pipe(
                debounceTime(300),
                switchMap(() => {
                    const rawValueFilter = CommonUtils.deleteKeysNullInObject(this.filters.getRawValue());
                    const queryParamsByPaginator = {...rawValueFilter} as any;
                    queryParamsByPaginator.limit = this.paginator?.pageSize;
                    queryParamsByPaginator.offset = queryParamsByPaginator.limit * this.paginator?.pageIndex;
                    return this._userService.getRoles(queryParamsByPaginator);
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

    delete(id: number): void {
        // Open the confirmation dialog
        const confirmation = this._fuseConfirmationService.open({
            title: 'Eliminar Rol',
            message: 'Estas seguro de eliminar este rol? Esta accion no puede revertirse!',
            actions: {
                confirm: {
                    label: 'Eliminar'
                }
            }
        });

        // Subscribe to the confirmation dialog closed action
        confirmation.afterClosed().subscribe(async (result) => {

            // If the confirm button pressed...
            if (result === 'confirmed') {
                await this._userService.deleteRoleById(id).toPromise();
                this.changesSubject.next(true);
            }
        });
    }

}
