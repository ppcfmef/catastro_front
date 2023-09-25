import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { state } from '@angular/animations';

@Component({
  selector: 'app-select-tickets',
  templateUrl: './select-tickets.component.html',
  styleUrls: ['./select-tickets.component.scss']
})
export class SelectTicketsComponent implements OnInit {

    isOpen = false;
    itemSelect = 'Seleccione Ubicación';
    tickets = [
        {
            id:'001',
            totalCase:4,
            state:0
        },
        {
            id:'002',
            totalCase:4,
            state:0
        },
        {
            id:'003',
            totalCase:3,
            state:0
        },
        {
            id:'004',
            totalCase:2,
            state:0
        },
        {
            id:'005',
            totalCase:4,
            state:1
        },
        {
            id:'006',
            totalCase:4,
            state:1
        }
    ];
  constructor(
    private _router: Router,
    private _activeRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {

  }

  navegateTo(item: any): void {
    this.itemSelect = `${item.id}. Ubicación`;
    console.log(item, 'item');
    this._router.navigate([`predio/${item.id}`] , {relativeTo: this._activeRoute});
  }

}
