import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { CustomConfirmationService } from 'app/shared/services/custom-confirmation.service';
import {UserService} from '../../../../../../../core/user/user.service';
import {Form, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDrawer} from '@angular/material/sidenav';
import {ActivatedRoute, Router} from '@angular/router';
import {PermissionService} from '../../../../../../../shared/services/permission.service';
import {map, switchMap, tap} from 'rxjs/operators';
import {NavigationView, Permission} from '../../../../../../../shared/models/permission.interface';
import {Observable, of} from 'rxjs';
import {PermissionListComponent} from '../../components/permission-list/permission-list.component';

@Component({
    selector: 'app-assignments',
    templateUrl: './assignments.component.html',
    styleUrls: ['./assignments.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AssignmentsComponent implements OnInit {

    @ViewChild(PermissionListComponent) permissionListComponent: PermissionListComponent;

    @ViewChild('matDrawer', {static: true}) matDrawer: MatDrawer;

    drawerMode: 'side' | 'over';

    title = 'Gestion de Roles y Permisos';

    // roles$: Observable<Role[]>;

    id: number;

    editForm: FormGroup;
    permissionsNavigation: NavigationView[] = [];

    constructor(
        private _userService: UserService,
        private _permissionService: PermissionService,
        private _fb: FormBuilder,
        private _activatedRoute: ActivatedRoute,
        private _router: Router,
        private _changeDetectorRef: ChangeDetectorRef,
        private confirmationService: CustomConfirmationService,
    ) {
        this.createFormAddEdit();
        this._activatedRoute.params
            .pipe(
                switchMap((params) => {
                    this.id = +params?.id || null;
                    if (this.id) {
                        return this._permissionService.getPermissionById(this.id);
                    }
                    return of(null);
                }),
                switchMap((permission: Permission) => {
                    if (this.id) {
                        this.editForm.patchValue(permission);
                        return this._permissionService.getNavigationPermissionById(this.id)
                            .pipe(tap(console.log));
                    }
                    return of([]);
                })
            ).subscribe((response) => {
            this.permissionsNavigation = response;
        });
    }

    ngOnInit(): void {

    }

    createFormAddEdit(): void {
        this.editForm = this._fb.group({
            id: [null],
            name: [''],
            description: ['', [Validators.required]],
            isActive: [true, [Validators.required]],
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

    redirectPage(): void {
        // Go back to the list
        this._router.navigate(['../'], {relativeTo: this._activatedRoute});

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    saveOrUpdateItem(): void {
        if (this.editForm.valid) {
            const payload = this.editForm.getRawValue();
            payload.permissionsNavigation = this.permissionListComponent.parsedResponse();
            this.validateTransaction(payload);
            this.confirmationService.success(
                'Registro de Role y Permiso',
                'Se guardo el registro correctamente'
            );
        } else {
            this.editForm.markAllAsTouched();
            this.confirmationService.error(
                'Registro de Role y Permiso',
                'Error al guardar Role'
            );
        }
    }

    async validateTransaction(payload): Promise<void> {
        try {
            await this.executeTransactionByPermission(payload).toPromise();
        } catch (err) {
            throw new Error('Error: ' + err);
        }
    }

    executeTransactionByPermission(payload): Observable<any> {
        if (payload?.id) {
            return this._permissionService.updatePermissionById(payload.id, payload);
        }
        return this._permissionService.createPermission(payload);
    }

}
