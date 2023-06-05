import { Observable, of, Subject } from 'rxjs';
import { debounceTime, map, takeUntil } from 'rxjs/operators';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OverlayRef } from '@angular/cdk/overlay';
import { MatDrawerToggleResult } from '@angular/material/sidenav';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { Role, User, UserCreate } from 'app/core/user/user.types';
import { CommonUtils } from 'app/core/common/utils/common.utils';
import { CommonService } from 'app/core/common/services/common.service';
import { Department, District, Institute, Province } from 'app/core/common/interfaces/common.interface';
import { UserService } from 'app/core/user/user.service';
import { CustomConfirmationService } from 'app/shared/services/custom-confirmation.service';
import { ListComponent } from '../list/list.component';
import { UserValidator } from '../../validators/user.validator';

@Component({
    selector: 'app-add-edit',
    templateUrl: './add-edit.component.html',
    styleUrls: ['./add-edit.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddEditComponent implements OnInit, AfterViewInit, OnDestroy {

    @ViewChild('avatarFileInput') private _avatarFileInput: ElementRef;
    id: number;
    user: User;
    userForm: FormGroup;
    departments$: Observable<Department[]>;
    provinces$: Observable<Province[]>;
    districts$: Observable<District[]>;
    institutes$: Observable<Institute[]>;
    roles$: Observable<Role[]>;
    displayPassword = {
        icon: 'heroicons_solid:eye',
        field: 'password',
        visible: false
    };
    avatarUrl: SafeUrl;
    private _tagsPanelOverlayRef: OverlayRef;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _router: Router,
        private _commonService: CommonService,
        private _userService: UserService,
        private _listComponent: ListComponent,
        private _formBuilder: FormBuilder,
        private _fuseConfirmationService: FuseConfirmationService,
        private confirmationService: CustomConfirmationService,
        private domSanitizer: DomSanitizer,
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

        this.departments$ = this._commonService.getDepartments();
        this.institutes$ = this._commonService.getInstitutes();
        this.roles$ = this._userService.getRoleSelectable();

        // Open the drawer
        this._listComponent.matDrawer.open();

        // Create the contact form
        this.userForm = this._formBuilder.group({
            id: [''],
            avatarFile: [null],
            username: ['', [Validators.required]],
            password: [null],
            firstName: [''],
            lastName: [''],
            role: ['', [Validators.required]],
            email: ['', [Validators.email]],
            dni: ['',
                {
                    validators: [
                        Validators.required,
                        Validators.maxLength(8),
                        Validators.minLength(8)
                    ],
                    updateOn: 'blur'
                }
            ],
            institution: [''],
            jobTitle: [''],
            department: ['', {
                updateOn: 'blur'
            }],
            province: [
                {
                    value: '', disabled: true
                },
                {
                    updateOn: 'blur'
                }
            ],
            district: [{value: '', disabled: true}],
            observation: [''],
            isActive: [true, [Validators.required]],
            isWebStaff: [true, [Validators.required]],
            isMobileStaff: [false, [Validators.required]]
        },{
            validators: [UserValidator.passwordRequired],
            updateOn: 'blur' // todo: change submit
        });
    }

    ngAfterViewInit(): void {
        this.userForm.get('department')
            .valueChanges
            .pipe(debounceTime(300), takeUntil(this._unsubscribeAll))
            .subscribe((value: string) => {
                this.provinces$ = this._commonService.getProvinces({department: value});
                this.districts$ = of([]);
                this.userForm.get('province').enable({emitEvent: false});
                this.userForm.get('district').disable({emitEvent: false});
            });

        this.userForm.get('province')
            .valueChanges
            .pipe(debounceTime(300), takeUntil(this._unsubscribeAll))
            .subscribe((value: string) => {
                this.districts$ = this._commonService.getDistricts({province: value});
                this.userForm.get('district').enable({emitEvent: false});
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
            this._userService.getUserById(this.id)
                .subscribe((response: User) => {
                    this.user = response;
                    this.avatarUrl = this.user?.avatar;
                    this.userForm.patchValue(response, {emitEvent: false});
                    const keys = ['role', 'institution', 'department', 'province', 'district'];
                    keys.forEach((key: string) => {
                        this.setValueInForm(key, response);
                    });
                });
        }
    }

    /**
     * Set Form in Value Special
     */
    setValueInForm(key: string, response: User): void {
        switch (key) {
            case 'role':
            case 'institution':
                if (response && response[key]) {
                    this.userForm.get(key).setValue(response[key]?.id, {emitEvent: false});
                }
                break;
            case 'department':
            case 'province':
            case 'district':
                if (response && response[key]) {
                    this.userForm.get(key).setValue(response[key]?.code);
                }
                break;
        }
    }

    /**
     * Close the drawer
     */
    closeDrawer(): Promise<MatDrawerToggleResult> {
        return this._listComponent.matDrawer.close();
    }

    /**
     * Upload avatar
     *
     * @param fileList
     */
    uploadAvatar(fileList: FileList): void {
        // Return if canceled
        if (!fileList.length) {
            return;
        }

        const file = fileList[0];
        const allowedTypes = ['image/jpg', 'image/jpeg', 'image/png'];

        // Return if the file is not allowed
        if (!allowedTypes.includes(file.type)) {
            return;
        }
        this.userForm.get('avatarFile').setValue(file);
        this.avatarUrl = this.domSanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file));
    }

    removeAvatar(): void {
        // Get the form control for 'avatar'
        const avatarFormControl = this.userForm.get('avatarFile');

        // Set the avatar as null
        avatarFormControl.setValue(null);

        // Set the file input value as null
        this._avatarFileInput.nativeElement.value = null;

        // Update the contact
        this.avatarUrl = null;
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
     * Update the contact
     */
    updateContact(): void {
        if (this.userForm.valid) {
            const payload: UserCreate = this.userForm.getRawValue();
            this.createOrUpdateUser(payload).subscribe(
                (user: User) => {
                    this._userService._refreshUsers.next();
                    this._router.navigate(['security', 'users']);

                    this.confirmationService.success(
                        'Registro de usuarios',
                        'Se guardo el registro correctamente'
                    );
                },
                (error) => {
                    let msg = 'Error al guardar el usuario, verifique la informacion ingresada';
                    if ('username' in error?.error) {
                        msg = error?.error.username;
                    }
                    this.confirmationService.error(
                        'Registro de usuarios', msg
                    );
                }
            );
        } else {
            this.checkErrors();
            this.confirmationService.error(
                'Registro de usuarios',
                'Error al guardar el usuario, verifique la informacion ingresada'
            );
        }
    }

    /**
     * Update user transaction
     */
    createOrUpdateUser(payload: UserCreate): Observable<any> {
        if (payload?.id) {
            return this._userService.updateUserById(this.removeNullInUpdate(payload));
        }
        return this._userService.createUser(payload);
    }

    /**
     * Generate password string
     */
    generatePassword(): void {
        const passwordRandomString = CommonUtils.generateRandomPassword();
        this.userForm.get('password').setValue(passwordRandomString);
    }

    delete(): void {
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
                await this._userService.deleteUserById(this.id).toPromise();
                this._userService._refreshUsers.next();
                this._router.navigate(['security', 'users']);
            }
        });
    }

    onDniToUser(): void {
        const id = this.userForm.get('id');
        const dni = this.userForm.get('dni');
        const username = this.userForm.get('username');

        if ((dni.value && dni.value !== '') && (username.value === '' || !username.value)) {
            username.setValue(dni.value);
        }
        else if (id.value === '' &&  (dni.value && dni.value !== '') && (!username.dirty && !username.touched)) {
            username.setValue(dni.value);
        }
    }

    showPassword(): void {
        const showIcon = 'heroicons_solid:eye';
        const hideIcon = 'heroicons_solid:eye-off';
        const passwordField = 'password';
        const textfield = 'text';
        this.displayPassword.visible = !this.displayPassword.visible;
        this.displayPassword.icon = (this.displayPassword.visible) ? hideIcon : showIcon;
        this.displayPassword.field = (this.displayPassword.visible) ? textfield: passwordField;
    }

    get f(): {[key: string]: AbstractControl} {
        return this.userForm.controls;
    }

    private checkErrors(): void {
        if (this.userForm.errors?.passwordIsRequired) {
            this.userForm.get('password').setErrors({required: true});
        }
    }

    private removeNullInUpdate(object: UserCreate): UserCreate {
        if (!object?.id) {
            return object;
        }

        for (const property in object) {
            if(object[property] === null) {
                delete object[property];
            }
        }
        return object;
    }
}
