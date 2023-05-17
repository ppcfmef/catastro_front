import { Component, OnInit } from '@angular/core';
import { ApplicationUI } from '../../interfaces/application';

@Component({
  selector: 'app-maintenance-application-container',
  templateUrl: './maintenance-application-container.component.html',
  styleUrls: ['./maintenance-application-container.component.scss']
})
export class MaintenanceApplicationContainerComponent implements OnInit {
    applicationRecords: ApplicationUI[];
  constructor() { }

  ngOnInit(): void {
  }

}
