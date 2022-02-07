import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Role} from '../../../../../../../core/user/user.types';
import {UserService} from '../../../../../../../core/user/user.service';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
    selector: 'app-assignments',
    templateUrl: './assignments.component.html',
    styleUrls: ['./assignments.component.scss']
})
export class AssignmentsComponent implements OnInit {

    roles$: Observable<Role[]>;

    filters: FormGroup;

    constructor(
        private _userService: UserService,
        private _fb: FormBuilder,
    ) {
    }

    ngOnInit(): void {
        this.roles$ = this._userService.getRoleSelectable();

        this.filters = this._fb.group({
            role: [],
        });
    }

}
