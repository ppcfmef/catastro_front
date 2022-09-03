import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { LandRegistryMapService } from '../../services/land-registry-map.service';
import { LandRegistryService } from '../../services/land-registry.service';
import { LandRegistryMap } from '../../interfaces/land-registry-map.interface';

@Component({
  selector: 'app-new-land-container',
  templateUrl: './new-land-container.component.html',
  styleUrls: ['./new-land-container.component.scss']
})
export class NewLandContainerComponent implements OnInit, OnDestroy {

  showEditForm = false;
  landRecordIn: LandRegistryMap;
  landRecordOut: LandRegistryMap;
  ownerId: number;
  private unsubscribeInAll = new Subject<any>();
  private unsubscribeAll = new Subject<any>();

  constructor(
    private landRegistryMapService: LandRegistryMapService,
    private landRegistryService: LandRegistryService,
  ) { }

  ngOnInit(): void {

    this.landRegistryService.getLandOwner()
    .subscribe(result => this.ownerId = result?.id);

    this.landRegistryMapService.landIn$
    .pipe(takeUntil(this.unsubscribeInAll))
    .subscribe(result => this.landRecordIn = result);

    this.landRegistryMapService.landOut$
    .pipe(takeUntil(this.unsubscribeAll))
    .subscribe((result) => {
      if(result) {
        this.landRecordOut = result;
        console.log('landOut result',result);
        this.showEditForm = true;
      }
    });

    // Evento que reacciona al dar click en crear nuevo predio
    this.landRegistryService.getLandCreate()
    .pipe(takeUntil(this.unsubscribeAll))
    .subscribe((result) => {
      if (result) {
        this.showEditForm = false; // muestra el formulario
        this.landRegistryMapService.landIn = null; // Inicializa data en null
      }
    });
  }

  receivedShowFormEdit(event): void{
    this.showEditForm = event;
  }

  registerLand(landRecord: LandRegistryMap): void {
    this.landRegistryMapService.gestionPredios = landRecord;
    this.landRegistryService.setLandRegister(landRecord);
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

}
