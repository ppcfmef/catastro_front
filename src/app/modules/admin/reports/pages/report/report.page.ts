import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss']
})
export class ReportPage implements OnInit {

  @ViewChild('matDrawer', {static: true}) matDrawer: MatDrawer;
    drawerMode: 'side' | 'over';

  constructor() { }

  ngOnInit(): void {
  }

}
