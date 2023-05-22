import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-maintenance-split',
  templateUrl: './maintenance-split.page.html',
  styleUrls: ['./maintenance-split.page.scss']
})
export class MaintenanceSplitPage implements OnInit {

    idLand: any;
    constructor(private _activatedRoute: ActivatedRoute) {
        this.idLand=this._activatedRoute.snapshot.paramMap.get('idLand');
   }

  ngOnInit(): void {
  }

}
