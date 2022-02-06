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
import {ListComponent} from '../list/list.component';
import {OverlayRef} from '@angular/cdk/overlay';
import {Observable, of, Subject} from 'rxjs';
import {MatDrawerToggleResult} from '@angular/material/sidenav';
import {Role, User, UserCreate} from '../../../../../../../core/user/user.types';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CommonUtils} from '../../../../../../../core/common/utils/common.utils';
import {CommonService} from '../../../../../../../core/common/services/common.service';
import {
    Department,
    District,
    Institute,
    IPagination,
    Province
} from '../../../../../../../core/common/interfaces/common.interface';
import {debounceTime, map, subscribeOn, takeUntil} from 'rxjs/operators';
import {UserService} from '../../../../../../../core/user/user.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FuseConfirmationService} from '../../../../../../../../@fuse/services/confirmation';

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
            avatar: [null],
            username: [''],
            password: ['', [Validators.required]],
            firstName: [''],
            lastName: [''],
            role: ['', [Validators.required]],
            email: ['', [Validators.email]],
            dni: ['', [Validators.required]],
            institution: [''],
            jobTitle: [''],
            department: [''],
            province: [{value: '', disabled: true}],
            district: [{value: '', disabled: true}],
            observation: [''],
            isActive: [true, [Validators.required]],
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

        const allowedTypes = ['image/jpeg', 'image/png'];
        const file = fileList[0];

        // Return if the file is not allowed
        if (!allowedTypes.includes(file.type)) {
            return;
        }

        // Upload the avatar
        // this._contactsService.uploadAvatar(this.contact.id, file).subscribe();
    }

    removeAvatar(): void {
        // Get the form control for 'avatar'
        const avatarFormControl = this.userForm.get('avatar');

        // Set the avatar as null
        avatarFormControl.setValue(null);

        // Set the file input value as null
        this._avatarFileInput.nativeElement.value = null;

        // Update the contact
        this.user.avatar = null;
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
        if (this.userForm.valid && this.userForm.dirty) {
            const payload: UserCreate = this.userForm.getRawValue();
            payload.username = payload.dni;
            this.createOrUpdateUser(payload).subscribe((user: User) => {
                this._userService._refreshUsers.next();
                this._router.navigate(['security', 'users', user.id]);
            });
        } else {
            this.userForm.markAllAsTouched();
        }
    }

    /**
     * Update user transaction
     */
    createOrUpdateUser(payload: UserCreate): Observable<any> {
        if (payload?.id) {
            return this._userService.updateUserById(payload);
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
}
