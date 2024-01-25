import {Component, Inject, OnInit} from '@angular/core';
import {MAT_SNACK_BAR_DATA} from '@angular/material/snack-bar';

@Component({
  selector: 'app-alert-snack-info',
  templateUrl: './alert-snack-info.component.html',
  styleUrls: ['./alert-snack-info.component.scss']
})
export class AlertSnackInfoComponent implements OnInit {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
  }

  ngOnInit(): void {
  }

}
