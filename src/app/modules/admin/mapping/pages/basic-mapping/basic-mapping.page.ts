import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-basic-mapping',
  templateUrl: './basic-mapping.page.html',
  styleUrls: ['./basic-mapping.page.scss']
})
export class BasicMappingPage implements OnInit {

  @ViewChild('matDrawer', {static: true}) matDrawer: MatDrawer;
    drawerMode: 'side' | 'over';

  constructor() { }

  ngOnInit(): void {
  }

}
