/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/naming-convention */
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StateService } from '../../services/state.service';
import { UserService } from 'app/core/user/user.service';

@Component({
  selector: 'app-assign-load',
  templateUrl: './assign-load.component.html',
  styleUrls: ['./assign-load.component.scss']
})
export class AssignLoadComponent implements OnInit, AfterViewInit{


    user: boolean = true;
    cards =[
        {
            num: 21,
            text: 'MANZANAS ASIGNADAS ACTUALMENTE'
        },
        {
            num: 25,
            text: 'TICKETS ATENDIDOS'
        }
    ];
    constructor(
        private _router: Router,
        private _stateService: StateService,
        private _userService: UserService,
        ) { }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
    }

    redirecto(): void {
        console.log('redirect'); this._router.navigate(['/inspection/assignment-of-load']);
        this._stateService.state.emit(false);

    }


}

