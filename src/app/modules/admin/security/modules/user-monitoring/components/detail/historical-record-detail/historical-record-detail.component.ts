import { Component, Inject } from '@angular/core';
import {MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA} from '@angular/material/legacy-dialog';


@Component({
  selector: 'historical-record-detail',
  templateUrl: './historical-record-detail.component.html',
  styleUrls: ['./historical-record-detail.component.scss']
})
export class HistoricalRecordDetailComponent {

    displayedColumns: string[] = ['key', 'value'];

    constructor(
    public dialogRef: MatDialogRef<HistoricalRecordDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  close(): void {
    this.dialogRef.close();
  }
}
