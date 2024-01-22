import { Component, OnInit } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';

@Component({
    selector: 'app-mat-dialog-deleted',
    templateUrl: './mat-dialog-deleted.component.html',
    styleUrls: ['./mat-dialog-deleted.component.scss'],
})
export class MatDialogDeletedComponent implements OnInit {
    constructor(public dialogRef: MatDialogRef<MatDialogDeletedComponent>) {}

    ngOnInit(): void {}
}
