import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-alert-confirm',
  templateUrl: './alert-confirm.component.html',
  styleUrls: ['./alert-confirm.component.scss']
})
export class AlertConfirmComponent implements OnInit {
  @ViewChild('buttonYes', { static: true }) buttonYes: MatButton;
  @ViewChild('buttonNo', { static: true }) buttonNo: MatButton;
  constructor(public dialogRef: MatDialogRef<AlertConfirmComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  onKey(event: KeyboardEvent): void {
    if (Number(event.key) === 37) {
      this.buttonNo.focus();
    } else if (Number(event.key) === 39) {
      this.buttonYes.focus();
    }
  }

}
