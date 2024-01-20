import {
    AfterViewInit, ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDrawer} from '@angular/material/sidenav';
import {BehaviorSubject, merge, of, Subject} from 'rxjs';
import {debounceTime, switchMap, takeUntil} from 'rxjs/operators';
import * as moment from 'moment';
import {CommonUtils} from '../../../../../../../core/common/utils/common.utils';
import {MatPaginator} from '@angular/material/paginator';
import {NavigationService} from '../../../../../../../core/navigation/navigation.service';
import {UserService} from '../../../../../../../core/user/user.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {FuseMediaWatcherService} from '../../../../../../../../@fuse/services/media-watcher';
import {FuseConfirmationService} from '../../../../../../../../@fuse/services/confirmation';

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

    title = 'Gestion de navegación';

    displayedColumns = ['nro', 'id', 'name', 'parent', 'type', 'order', 'status', 'actions'];

    dataSource = [];
    count = 0;

    filters: FormGroup;

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
        private _fb: FormBuilder,
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private _fuseConfirmationService: FuseConfirmationService,
    ) {
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.filters = this._fb.group({
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
    }

    /**
     * On AfterViewInit
     */
    ngAfterViewInit(): void {
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
            title: 'Eliminar opcion',
            message: 'Estas seguro de eliminar esta opcion? Esta accion no puede revertirse!',
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
                this.changesSubject.next(true);
            }
        });
    }
}
