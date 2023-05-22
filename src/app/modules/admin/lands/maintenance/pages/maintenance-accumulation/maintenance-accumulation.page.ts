import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LandUI } from '../../interfaces/land.interface';

@Component({
  selector: 'app-maintenance-accumulation',
  templateUrl: './maintenance-accumulation.page.html',
  styleUrls: ['./maintenance-accumulation.page.scss']
})
export class MaintenanceAccumulationPage implements OnInit {
    //land: LandUI;
    idLand: any;
    constructor(private _activatedRoute: ActivatedRoute) {

        this.idLand=this._activatedRoute.snapshot.paramMap.get('idLand');

   }

  ngOnInit(): void {
  }

}
