import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {UserService} from '../../../../../../../core/user/user.service';
import {Form, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDrawer} from '@angular/material/sidenav';
import {ActivatedRoute, Router} from '@angular/router';
import {PermissionService} from '../../../../../../../shared/services/permission.service';
import {map, switchMap} from 'rxjs/operators';
import {NavigationView, Permission} from '../../../../../../../shared/models/permission.interface';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-assignments',
    templateUrl: './assignments.component.html',
    styleUrls: ['./assignments.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AssignmentsComponent implements OnInit {

    @ViewChild('matDrawer', {static: true}) matDrawer: MatDrawer;

    drawerMode: 'side' | 'over';

    title = 'Gestion de permisos';

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
    ) {
        this.createFormAddEdit();
        this._activatedRoute.params
            .pipe(
                switchMap((params) => {
                    this.id = +params?.id || null;
                    return this._permissionService.getPermissionById(this.id);
                }),
                switchMap((permission: Permission) => {
                    this.editForm.patchValue(permission);
                    return this._permissionService.getNavigationPermissionById(this.id);
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
            payload.permissionsNavigation = [];
            this.validateTransaction(payload);
        } else {
            this.editForm.markAllAsTouched();
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
