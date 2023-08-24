import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StateService } from '../../services/state.service';
import { Subject } from 'rxjs';




@Component({
  selector: 'app-load-list',
  templateUrl:'./load-list.component.html',
  styleUrls: ['./load-list.component.scss']
})
export class LoadListComponent implements OnInit {
    states: string[] = [
        'Ubigeo',
        'Unidad urbana'
    ];
    private _unsuscribe = new Subject();
    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _stateService: StateService,
        ) { }

    ngOnInit(): void {
    }

    redirecto(): void {
        this._router.navigate(['assign-load'], { relativeTo: this._route });
        this._stateService.state.emit(true);
    }

}
