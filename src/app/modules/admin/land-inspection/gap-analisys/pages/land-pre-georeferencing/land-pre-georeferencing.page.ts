import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LandGapAnalisysService } from '../../services/land-maintenance.service';
import { LandAnalisysUI } from '../../interfaces/land.interface';
import { ActionsGapAnalisys } from 'app/shared/enums/actions-gap-analisys.enum';

@Component({
  selector: 'app-land-pre-georeferencing',
  templateUrl: './land-pre-georeferencing.page.html',
  styleUrls: ['./land-pre-georeferencing.page.scss']
})
export class LandPreGeoreferencingPage implements OnInit {
    idLand: any;
    land: LandAnalisysUI;
    event: string = ActionsGapAnalisys.ASIGNAR_PREDIO;

  constructor(private _activatedRoute: ActivatedRoute,private _landGapAnalisysService: LandGapAnalisysService) {

  }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe((params) => {
          this.idLand = params.idLand;
          console.log('params>>>',params);
          if (this.idLand)  {
            this._landGapAnalisysService.get(this.idLand).subscribe( (res)=>{
                this.land = res;
                console.log(this.land);
            });
          }
    });

  }

  asigLandEvent(e: any): void{
    this.event = e;
  }
}
