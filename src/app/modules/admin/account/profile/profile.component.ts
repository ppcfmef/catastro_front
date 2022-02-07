import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../../core/user/user.service';
import {switchMap, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

    @ViewChild('avatarFileInput') private _avatarFileInput: ElementRef;

    accountForm: FormGroup;

    unsubscribe = new Subject();

    typeInputPassword = 'password';

    constructor(
        private _formBuilder: FormBuilder,
        private _userService: UserService,
    ) {
    }

    ngOnInit(): void {
        // Create the form
        this.accountForm = this._formBuilder.group({
            id: [null],
            avatar: [''],
            fullName: [''],
            username: [''],
            password: [''],
            jobTitle: [''],
            institution: [''],
            observation: [''],
            email: ['', Validators.email],
            dni: ['', [Validators.required]],
            country: [''],
            language: ['']
        });

        this._userService.user$
            .pipe(
                switchMap((user) => {
                    return this._userService.getUserById(user.id);
                }),
                takeUntil(this.unsubscribe)
            )
            .subscribe((response: any) => {
                response.fullName = response.firstName + ' ' + response.lastName;
                response.institution = response.institution?.name || '';
                this.accountForm.patchValue(response);
            });
    }


    updateInformation(): void {
        if (this.accountForm.valid) {
            const payload = this.accountForm.getRawValue();
            if (!payload?.password) {
                delete payload.password;
                delete payload.institution;
            }
            payload.username = payload.dni;
            this.executeTransaction(payload);
        } else {
            this.accountForm.markAllAsTouched();
        }
    }

    async executeTransaction(payload): Promise<void> {
        try {
            await this._userService.updateUserById(payload).toPromise();
            this.accountForm.markAsUntouched();
        } catch (err) {
            throw new Error('Error: ' + err);
        }
    }

    showPassword(): void {
        this.typeInputPassword = this.typeInputPassword === 'password' ? 'text' : 'password';
    }

    uploadAvatar(fileList: FileList): void {
        // Return if canceled
        if (!fileList.length) {
            return;
        }

        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
        const file = fileList[0];

        // Return if the file is not allowed
        if (!allowedTypes.includes(file.type)) {
            return;
        }

        // Upload the avatar
        const formData = new FormData();
        formData.append('avatar', file);
        this._userService.updateAvatarUserById(this.accountForm.get('id').value, formData).subscribe();
    }

    removeAvatar(): void {
        // Get the form control for 'avatar'
        const avatarFormControl = this.accountForm.get('avatar');

        // Set the avatar as null
        avatarFormControl.setValue(null);

        // Set the file input value as null
        this._avatarFileInput.nativeElement.value = null;

        // Update the contact
        // this.user.avatar = null;
    }

}
