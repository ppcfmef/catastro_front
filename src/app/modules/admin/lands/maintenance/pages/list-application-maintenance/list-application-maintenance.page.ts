import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-application-maintenance',
  templateUrl: './list-application-maintenance.page.html',
  styleUrls: ['./list-application-maintenance.page.scss']
})
export class ListApplicationMaintenancePage implements OnInit {

  constructor(
    private _router: Router,
  ) { }

  ngOnInit(): void {
  }
  onAddApplication(): void {
    this._router.navigate(['/land/maintenance/list']);
  }
}
