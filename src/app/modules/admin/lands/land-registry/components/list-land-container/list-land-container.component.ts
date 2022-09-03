import { Subject, combineLatest } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { LandRegistryService } from '../../services/land-registry.service';
import { LandRegistryMapService } from '../../services/land-registry-map.service';
import { LandRegistryMap } from '../../interfaces/land-registry-map.interface';
import { LandOwner } from '../../interfaces/land-owner.interface';


@Component({
  selector: 'app-list-land-container',
  templateUrl: './list-land-container.component.html',
  styleUrls: ['./list-land-container.component.scss']
})
export class ListLandContainerComponent implements OnInit, OnDestroy {

  landRecords: LandRegistryMap[];
  tableLength: number;
  private unsubscribeAll: Subject<any> = new Subject<any>();
  private landOwnerId!: number;
  private landOwner: LandOwner;
  private defaultTableLimit = 5;

  constructor(
    private landRegistryService: LandRegistryService,
    private landRegistryMapService: LandRegistryMapService,
  ) { }

  ngOnInit(): void {
    combineLatest([
      this.landRegistryService.getLandOwner(), // Se ejecuta cuando cambiamos de propietario
      this.landRegistryService.getLandRegister() // se ejecuta cuando agregamos o editamos registros
    ])
    .pipe(takeUntil(this.unsubscribeAll))
    .subscribe(
      (result) => {
        const ownerResult = result[0];
        const registerLand = result[1];
        if (ownerResult === null) {
          this.landRecords = null;
        }

        if (ownerResult) {
          this.landOwner = ownerResult;
          this.landOwnerId = ownerResult?.id;
        }
        else {
          this.landOwnerId = registerLand?.owner;
        }
        if (this.landOwnerId) {
          this.landRegistryService
          .getLandList({ limit: this.defaultTableLimit, owner: this.landOwnerId })
          .toPromise()
          .then(
            (landResult) => {
              this.landRecords = landResult.results;
              this.tableLength = landResult.count;
            }
          );
        }
      }
    );
  }

  seledRecord(landRecord: LandRegistryMap): void {
    this.landRegistryMapService.landIn = landRecord;
  }

  createLandRecord(): void {
    this.landRegistryService.setLandCreate(true);
    //this.landRegistryMapService.landIn = null;
  }

  onChangePage(paginator: MatPaginator): void {
    const ownerFilter = { owner: this.landOwnerId };
    const limit = paginator.pageSize;
    const offset = limit * paginator.pageIndex;
    const queryParams = { limit, offset, ...ownerFilter };
    this.landRegistryService.getLandList(queryParams)
    .toPromise()
    .then(result => this.landRecords = result.results);
  }

  downloadDeclaration(landRecord: LandRegistryMap): void {
    this.landRegistryMapService.emitPrint(
      landRecord,
      this.landOwner
    );
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

}
