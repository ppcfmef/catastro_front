import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {BehaviorSubject, merge, Subject} from 'rxjs';
import {MatPaginator} from '@angular/material/paginator';
import {debounceTime, switchMap} from 'rxjs/operators';
import {CommonUtils} from '../../../../../../../core/common/utils/common.utils';
import {PermissionService} from '../../../../../../../shared/services/permission.service';
import {FormBuilder} from '@angular/forms';
import {FuseMediaWatcherService} from '../../../../../../../../@fuse/services/media-watcher';
import {FuseConfirmationService} from '../../../../../../../../@fuse/services/confirmation';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, AfterViewInit {

    @ViewChild(MatPaginator) paginator: MatPaginator;

    displayedColumns = ['nro', 'name', 'actions'];

    dataSource = [];
    count = 0;

    changesSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private permissionService: PermissionService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _activatedRoute: ActivatedRoute,
        private _router: Router,
        private _fb: FormBuilder,
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private _fuseConfirmationService: FuseConfirmationService,
    ) {
    }

    ngOnInit(): void {
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
        merge(this.paginator.page, this.changesSubject)
            .pipe(
                debounceTime(300),
                switchMap(() => {
                    const queryParamsByPaginator = {} as any;
                    queryParamsByPaginator.limit = this.paginator.pageSize;
                    queryParamsByPaginator.offset = queryParamsByPaginator.limit * this.paginator.pageIndex;
                    return this.permissionService.getPermissions(queryParamsByPaginator);
                })
            ).subscribe((response) => {
            this.count = response.count;
            this.dataSource = response.results;

            // Mark for check
            this._changeDetectorRef.markForCheck();
        });
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
            title: 'Eliminar Permiso',
            message: 'Estas seguro de eliminar este permiso? Esta accion no puede revertirse!',
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
                await this.permissionService.deletePermissionById(id).toPromise();
                this.changesSubject.next(true);
            }
        });
    }
}
