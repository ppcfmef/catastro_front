import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {UserService} from '../../../../../../../core/user/user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FuseConfirmationService} from '../../../../../../../../@fuse/services/confirmation';
import {OverlayRef} from '@angular/cdk/overlay';
import {Observable, Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {Role, RoleCreate, User, UserCreate} from '../../../../../../../core/user/user.types';
import {ListComponent} from '../list/list.component';
import {MatDrawerToggleResult} from '@angular/material/sidenav';
import {PermissionService} from '../../../../../../../shared/services/permission.service';
import {Permission} from '../../../../../../../shared/models/permission.interface';

@Component({
    selector: 'app-add-edit',
    templateUrl: './add-edit.component.html',
    styleUrls: ['./add-edit.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddEditComponent implements OnInit, OnDestroy {

    id: number;

    roleForm: FormGroup;

    permissions$: Observable<Permission[]>;

    private _tagsPanelOverlayRef: OverlayRef;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _permissionService: PermissionService,
        private _listComponent: ListComponent,
        private _formBuilder: FormBuilder,
        private _fuseConfirmationService: FuseConfirmationService,
    ) {
        this._activatedRoute
            .params
            .pipe(map((params: Params) => {
                this.id = +params?.id || null;
            })).subscribe((_) => {
            this.loadModel();
        });
    }

    ngOnInit(): void {

        this.permissions$ = this._permissionService.getSelectPermissions();

        // Open the drawer
        this._listComponent.matDrawer?.open();

        // Create the contact form
        this.roleForm = this._formBuilder.group({
            id: [''],
            name: ['', [Validators.required]],
            permissions: [[], [Validators.required]],
            description: [''],
            isActive: [true, [Validators.required]],
        });
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
        this.closeDrawer();

        // Dispose the overlays if they are still on the DOM
        if (this._tagsPanelOverlayRef) {
            this._tagsPanelOverlayRef.dispose();
        }
    }


    /**
     * Get User By Id
     */
    loadModel(): void {
        if (this.id) {
            this._userService.getRoleById(this.id)
                .subscribe((response: Role) => {
                    this.roleForm.patchValue(response, {emitEvent: false});
                });
        }
    }

    /**
     * Close the drawer
     */
    closeDrawer(): Promise<MatDrawerToggleResult> {
        return this._listComponent.matDrawer?.close();
    }

    /**
     * Update the contact
     */
    updateRole(): void {
        if (this.roleForm.valid && this.roleForm.dirty) {
            const payload: UserCreate = this.roleForm.getRawValue();
            payload.username = payload.dni;
            this.createOrUpdateRole(payload).subscribe((role: Role) => {
                this._userService._refreshRoles.next();
                this._router.navigate(['security', 'roles', role.id]);
            });
        } else {
            this.roleForm.markAllAsTouched();
        }
    }

    /**
     * Update user transaction
     */
    createOrUpdateRole(payload: RoleCreate): Observable<any> {
        if (payload?.id) {
            return this._userService.updateRoleById(payload);
        }
        return this._userService.createRole(payload);
    }


    delete(): void {
        // Open the confirmation dialog
        const confirmation = this._fuseConfirmationService.open({
            title: 'Eliminar rol',
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
                await this._userService.deleteRoleById(this.id).toPromise();
                this._userService._refreshRoles.next();
                this._router.navigate(['security', 'roles']);
            }
        });
    }

}
