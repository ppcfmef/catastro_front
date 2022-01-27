import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

    displayedColumns = ['nro', 'name', 'description', 'status', 'actions'];

    dataSource = [];
    count = 0;

    /**
     * Constructor
     */
    constructor() {
    }

    /**
     * On init
     */
    ngOnInit(): void {
    }

}
