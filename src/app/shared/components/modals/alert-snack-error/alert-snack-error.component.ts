import {Component, Inject, OnInit} from '@angular/core';
import {MAT_LEGACY_SNACK_BAR_DATA as MAT_SNACK_BAR_DATA} from '@angular/material/legacy-snack-bar';

@Component({
  selector: 'app-alert-snack-error',
  templateUrl: './alert-snack-error.component.html',
  styleUrls: ['./alert-snack-error.component.scss']
})
export class AlertSnackErrorComponent implements OnInit {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
  }

  ngOnInit(): void {
  }

}
