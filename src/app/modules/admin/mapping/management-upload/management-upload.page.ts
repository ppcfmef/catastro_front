import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
@Component({
    selector: 'app-management-upload-page',
    templateUrl: './management-upload.page.html',
    styleUrls: ['./management-upload.page.scss'],
})
export class ManagementUploadPage implements OnInit {
    @ViewChild('matDrawer', {static: true}) matDrawer: MatDrawer;
    drawerMode: 'side' | 'over';

    title = 'Gestor Cartográfico';
    constructor( ) {}

    ngOnInit(): void {}
}
