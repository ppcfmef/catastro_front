import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatDrawer} from '@angular/material/sidenav';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

    constructor() {
    }

    ngOnInit(): void {
    }

}
