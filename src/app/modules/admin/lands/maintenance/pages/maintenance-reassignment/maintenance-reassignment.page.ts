import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-maintenance-reassignment',
  templateUrl: './maintenance-reassignment.page.html',
  styleUrls: ['./maintenance-reassignment.page.scss']
})
export class MaintenanceReassignmentPage implements OnInit {

    idLand: any;
    constructor(private _activatedRoute: ActivatedRoute) {

        this.idLand=this._activatedRoute.snapshot.paramMap.get('idLand');
        console.log('this.idLand>>',this.idLand);
   }

  ngOnInit(): void {
  }

}
