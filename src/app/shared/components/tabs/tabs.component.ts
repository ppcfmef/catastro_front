import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { ITabLayout } from 'app/core/common/interfaces/common.interface';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {

  @Input() navLinks: ITabLayout[] = [];

  constructor(private _router: Router) { }

  ngOnInit(): void {
  }

}
