import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

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
            totalCase:4
        },
        {
            id:'002',
            totalCase:4
        },
        {
            id:'003',
            totalCase:3
        },
        {
            id:'004',
            totalCase:2
        },
        {
            id:'005',
            totalCase:4
        },
        {
            id:'006',
            totalCase:4
        }
    ];
  constructor(
    private _router: Router,
    private _activeRoure: ActivatedRoute,
  ) { }

  ngOnInit(): void {
  }

  navegateTo(item: any): void {
    this.itemSelect = `${item.id}. Ubicación`;
    this.isOpen=false;
    console.log(item, 'item');
    this._router.navigate([`ticket/${item.id}`] , {relativeTo: this._activeRoure});
  }
}
