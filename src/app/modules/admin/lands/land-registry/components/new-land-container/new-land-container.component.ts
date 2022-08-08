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
  private unsubscribeInAll = new Subject<any>();
  private unsubscribeAll = new Subject<any>();

  constructor(
    private landRegistryMapService: LandRegistryMapService,
    private landRegistryService: LandRegistryService,
  ) { }

  ngOnInit(): void {

    this.landRegistryMapService.landIn$
    .pipe(takeUntil(this.unsubscribeInAll))
    .subscribe(result => this.landRecordIn = result);

    this.landRegistryMapService.landOut$
    .pipe(takeUntil(this.unsubscribeAll))
    .subscribe((result) => {
      if(result) {
        this.landRecordOut = result;
        this.showEditForm = true;
      }
    });

    this.landRegistryService.getLandCreate()
    .pipe(takeUntil(this.unsubscribeAll))
    .subscribe((result) => {
      if (result) {
        this.showEditForm = result;
      }
    });
  }

  receivedShowFormEdit(event): void{
    this.showEditForm = event;
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

}
