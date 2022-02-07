import {Component, OnInit} from '@angular/core';
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

    accountForm: FormGroup;

    unsubscribe = new Subject();

    constructor(
        private _formBuilder: FormBuilder,
        private _userService: UserService,
    ) {
    }

    ngOnInit(): void {
        // Create the form
        this.accountForm = this._formBuilder.group({
            id: [null],
            fullName: [''],
            username: [''],
            password: [''],
            jobTitle: [''],
            institution: [''],
            observation: [''],
            email: ['', Validators.email],
            dni: [''],
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

}
