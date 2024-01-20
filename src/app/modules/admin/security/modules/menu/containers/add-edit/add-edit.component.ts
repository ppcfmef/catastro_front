import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CommonService} from '../../../../../../../core/common/services/common.service';
import {UserService} from '../../../../../../../core/user/user.service';
import {FuseConfirmationService} from '../../../../../../../../@fuse/services/confirmation';
import {ListComponent} from '../list/list.component';
import {OverlayRef} from '@angular/cdk/overlay';
import {Subject} from 'rxjs';
import {MatDrawerToggleResult} from '@angular/material/sidenav';

@Component({
    selector: 'app-add-edit',
    templateUrl: './add-edit.component.html',
    styleUrls: ['./add-edit.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddEditComponent implements OnInit, OnDestroy {

    id: number;

    menuForm: FormGroup;

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
    }

    ngOnInit(): void {
        // Open the drawer
        this._listComponent.matDrawer.open();

        // Create the contact form
        this.menuForm = this._formBuilder.group({
            id: [''],
        });
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
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
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any {
        return item.id || index;
    }

    delete(): void {
        // Open the confirmation dialog
        const confirmation = this._fuseConfirmationService.open({
            title: 'Eliminar opcion',
            message: 'Estas seguro de eliminar esta opcion? Esta accion no puede revertirse!',
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
                this._userService._refreshUsers.next();
                this._router.navigate(['security', 'users']);
            }
        });
    }

}
