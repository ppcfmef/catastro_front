import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-maintenance-independence',
  templateUrl: './maintenance-independence.page.html',
  styleUrls: ['./maintenance-independence.page.scss']
})
export class MaintenanceIndependencePage implements OnInit {

    idLand: any;
    constructor(private _activatedRoute: ActivatedRoute) {
        this.idLand=this._activatedRoute.snapshot.paramMap.get('idLand');
   }

  ngOnInit(): void {
  }

}
