import {
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
import {Subject} from 'rxjs';
import {MatDrawerToggleResult} from '@angular/material/sidenav';
import {User} from '../../../../../../../core/user/user.types';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-add-edit',
    templateUrl: './add-edit.component.html',
    styleUrls: ['./add-edit.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddEditComponent implements OnInit, OnDestroy {

    @ViewChild('avatarFileInput') private _avatarFileInput: ElementRef;

    user: User;

    userForm: FormGroup;

    private _tagsPanelOverlayRef: OverlayRef;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private _listComponent: ListComponent,
        private _formBuilder: FormBuilder,
    ) {
    }

    ngOnInit(): void {

        // Open the drawer
        this._listComponent.matDrawer.open();

        // Create the contact form
        this.userForm = this._formBuilder.group({
            id: [''],
            avatar: [null],
            username: [''],
            firstName: [''],
            lastName: [''],
            email: ['', [Validators.email]],
            documentNumber: [''],
            institution: [''],
            jobTitle: [''],
            department: [''],
            province: [''],
            district: [''],
            observation: [''],
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
     * Delete the contact
     */
    deleteContact(): void {
    }

    /**
     * Update the contact
     */
    updateContact(): void {
    }
}
