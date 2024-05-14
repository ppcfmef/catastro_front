import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { ChangeDetectorRef, Component, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

import { CustomConfirmationService } from 'app/shared/services/custom-confirmation.service';
import {PermissionService} from 'app/shared/services/permission.service';
import {NavigationView, Permission} from 'app/shared/models/permission.interface';

import {PermissionListComponent} from '../../components/permission-list/permission-list.component';

@Component({
    selector: 'app-assignments',
    templateUrl: './assignments.component.html',
    styleUrls: ['./assignments.component.scss'],
})
export class AssignmentsComponent implements OnInit {

    @ViewChild(PermissionListComponent) permissionListComponent: PermissionListComponent;
    title = 'Gestión de Roles y Permisos';
    id: number;
    editForm: UntypedFormGroup;
    permissionsNavigation: NavigationView[] = [];

    constructor(
        private _permissionService: PermissionService,
        private _fb: UntypedFormBuilder,
        private _activatedRoute: ActivatedRoute,
        private _router: Router,
        private _changeDetectorRef: ChangeDetectorRef,
        private confirmationService: CustomConfirmationService,
    ) {}

    ngOnInit(): void {
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
                        return this._permissionService.getNavigationPermissionById(this.id);
                    }
                    return of([]);
                })
            ).subscribe((response) => {
            this.permissionsNavigation = response;
        });
    }

    createFormAddEdit(): void {
        this.editForm = this._fb.group({
            id: [null],
            description: ['', [Validators.required]],
        });
    }

    onBackdropClicked(): void {
        this._router.navigate(['./'], {relativeTo: this._activatedRoute});
        this._changeDetectorRef.markForCheck();
    }

    redirectPage(): void {
        this._router.navigate(['../'], {relativeTo: this._activatedRoute});
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
            )
            .afterClosed()
            .subscribe((result) => {
                if (result === 'confirmed') {
                    this._router.navigate(['../'], {relativeTo: this._activatedRoute});
                }
            });
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
            console.log('here');
            return this._permissionService.updatePermissionById(payload.id, payload);
        }
        return this._permissionService.createPermission(payload);
    }
}
