import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, OnDestroy,
    OnInit,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {BehaviorSubject, from, merge, Observable, Subject} from 'rxjs';
import {MatPaginator} from '@angular/material/paginator';
import {debounceTime, mergeMap, switchMap, takeUntil, toArray} from 'rxjs/operators';
import {UserService} from '../../../../../../../core/user/user.service';
import {MatDrawer} from '@angular/material/sidenav';
import {ActivatedRoute, Router} from '@angular/router';
import {FuseMediaWatcherService} from '../../../../../../../../@fuse/services/media-watcher';
import {FuseConfirmationService} from '../../../../../../../../@fuse/services/confirmation';
import {FormGroup, UntypedFormBuilder, UntypedFormGroup} from '@angular/forms';
import {CommonUtils} from '../../../../../../../core/common/utils/common.utils';
import {Role} from '../../../../../../../core/user/user.types';
import * as moment from 'moment';
import { inject } from '@angular/core';
import { CommonService } from 'app/core/common/services/common.service';

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

    title = 'Gestión de usuarios';

    displayedColumns = ['nro', 'dni', 'username', 'institute', 'districtName','district',  'rol', 'status', 'creationDate', 'actions'];

    filters: FormGroup;
    search: FormGroup;

    roles$: Observable<Role[]>;

    dataSource = [];
    count = 0;
    pageIndex = 0;
    pageSize = 10;

    changesSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    #commonService = inject(CommonService);

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

        this.roles$ = this._userService.getRoleSelectable();

        this.filters = this._fb.group({
            // eslint-disable-next-line @typescript-eslint/naming-convention
            is_active: [''],
            role: [''],
            // eslint-disable-next-line @typescript-eslint/naming-convention
            init_date: [''],
            // eslint-disable-next-line @typescript-eslint/naming-convention
            end_date: [''],
        });

        this.search = this._fb.group({
            search: [''],
        });

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

        this._userService._refreshUsers
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
        this.filters.valueChanges.subscribe((changes)=> {
            this.paginator.pageIndex = 0;
            this.pageIndex = 0;
            this.paginator.pageSize = 10;
            this.initPagination();
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


    initPagination(): void {
        console.log('initPagination', this.filters.valueChanges);
        merge(this.paginator.page, this.changesSubject, this.filters.valueChanges)
            .pipe(
                debounceTime(300),
                switchMap(() => {
                    const queryParamsByPaginator = this.makeQueryParams();
                    return this._userService.getUsers(queryParamsByPaginator);
                }),
                mergeMap((response) => {
                    this.count = response.count;
                    return from(response.results).pipe(
                        mergeMap((user) => {
                            // Verificar si user.district tiene un valor válido
                            if (user.district) {
                                return this.#commonService.getDistrictResource(user.district.toString()).pipe(
                                    mergeMap((res) => {
                                        if (user.district.toString() === res.code) {
                                            user.districtName = res.name;
                                        }
                                        return from([user]);
                                    })
                                );
                            } else {
                                // Si user.district no tiene un valor válido, asigna un valor predeterminado
                                user.districtName = '';
                                return from([user]);
                            }
                        }),
                        toArray()
                    );
                })
            )
            .subscribe((modifiedUsers) => {
                this.dataSource = modifiedUsers;
                this._changeDetectorRef.markForCheck();
            });
    }

    makeQueryParams(): any {
        const filterRawValue = this.filters.getRawValue();
        filterRawValue.init_date = filterRawValue.init_date ? moment(filterRawValue.init_date).format('YYYY-MM-DD') : null;
        filterRawValue.end_date = filterRawValue.end_date ? moment(filterRawValue.end_date).format('YYYY-MM-DD') : null;
        const rawValueFilter = CommonUtils.deleteKeysNullInObject(filterRawValue);
        const queryParamsByPaginator = {...rawValueFilter} as any;
        queryParamsByPaginator.limit = this.paginator.pageSize;
        queryParamsByPaginator.offset = queryParamsByPaginator.limit * this.paginator.pageIndex;
        return queryParamsByPaginator;
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
            title: 'Eliminar usuario',
            message: 'Estas seguro de eliminar este usuario? Esta accion no puede revertirse!',
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
                await this._userService.deleteUserById(id).toPromise();
                this.changesSubject.next(true);
            }
        });
    }

    onPage(paginator: MatPaginator): void {
        this.pageIndex = paginator.pageIndex;
        this.pageSize = paginator.pageSize;
    }

    onSearch(): void {
        const search = this.search.get('search').value;
        this._userService.getUsers({ search }).subscribe((response) => {
            this.count = response.count;
            this.dataSource = response.results;
            // Mark for check
            this._changeDetectorRef.markForCheck();
        });
    }

    onCleanSearch(): void {
        this.search.get('search').setValue(null);
        this._userService.getUsers({}).subscribe((response) => {
            this.count = response.count;
            this.dataSource = response.results;
            // Mark for check
            this._changeDetectorRef.markForCheck();
        });
    }

}
