import { Subject, combineLatest } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { Component, OnInit, OnDestroy, Input, OnChanges, SimpleChanges } from '@angular/core';
import { LandRegistryService } from '../../services/land-registry.service';
import { LandRegistryMapService } from '../../services/land-registry-map.service';
import { LandRegistryMap } from '../../interfaces/land-registry-map.interface';
import { LandOwner } from '../../interfaces/land-owner.interface';
import { NavigationAuthorizationService } from 'app/shared/services/navigation-authorization.service';
import { CommonUtils } from 'app/core/common/utils/common.utils';
import { MasterDomain } from '../../interfaces/master-domain.interface';


@Component({
  selector: 'app-list-land-container',
  templateUrl: './list-land-container.component.html',
  styleUrls: ['./list-land-container.component.scss']
})
export class ListLandContainerComponent implements OnInit, OnDestroy, OnChanges {
  @Input() landId: number;
  @Input() ubigeo: string;
  landRecords: LandRegistryMap[];
  landRecords2: LandRegistryMap[];
  displayedColumns: string[] = ['nro', 'cup', 'cpm', 'print', 'steetName'];
  displayedColumns2: string[] = ['nro',  'codPredioSinCarto', 'print', 'steetName'];
  tableLength: number;
  tableLength2: number;
  masterDomain: MasterDomain;
  panelOpenState = false;

  private unsubscribeAll: Subject<any> = new Subject<any>();
  private landOwnerId!: number;
  private landOwner: LandOwner;
  private defaultTableLimit = 5;
    private servicesSubscribe;
  constructor(
    private landRegistryService: LandRegistryService,
    private landRegistryMapService: LandRegistryMapService,
    private navigationAuthorizationService: NavigationAuthorizationService
  ) {
    this.landRegistryService.getMasterDomain()
    .pipe(takeUntil(this.unsubscribeAll))
    .subscribe((result) => {
      this.masterDomain = result;
  });
   }
    ngOnChanges(changes: SimpleChanges): void {
        /*this.ubigeo=this.navigationAuthorizationService.ubigeoNavigation;
        console.log('ubigeo',this.ubigeo);*/
    }

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

        if (ownerResult && ownerResult !== null) {

          this.landOwner = ownerResult;
          this.landOwnerId = ownerResult?.id;
        }
        else {
          this.landOwnerId = registerLand?.owner;
        }
        if (this.landOwnerId && ownerResult) {
          const queryParams = CommonUtils.deleteKeysNullInObject( { limit: this.defaultTableLimit , ubigeo:this.ubigeo, status:1 });

          if (this.landId) {
            queryParams['id'] = this.landId;
          }


          this.landRegistryService
          .getLandbyOwner(this.landOwnerId, queryParams)
          .toPromise()
          .then(
            (landResult) => {
                this.updateDataSourceWithStreetNames(landResult.results);
              this.landRecords = landResult.results;
              this.tableLength = landResult.count;
              if (this.landId && this.tableLength > 0) {
                setTimeout(() => { // ToDo: Coordinar con frank porque demora tanto su mapa
                  this.seledRecord(this.landRecords[0]);
                }, 6000);
              }
            }
          );

          const queryParams2 = CommonUtils.deleteKeysNullInObject( { limit: this.defaultTableLimit , ubigeo:this.ubigeo, status:2 });
          
          this.landRegistryService
          .getLandbyOwner(this.landOwnerId, queryParams2)
          .toPromise()
          .then(
            (landResult) => {
                this.updateDataSourceWithStreetNames(landResult.results);
              this.landRecords2 = landResult.results;
              this.tableLength2 = landResult.count;
              if (this.landId && this.tableLength2 > 0) {
                setTimeout(() => { // ToDo: Coordinar con frank porque demora tanto su mapa
                  this.seledRecord(this.landRecords2[0]);
                }, 6000);
              }
            }
          );

        }
      }
    );
  }

  seledRecord(landRecord: LandRegistryMap): void {
    this.landRegistryMapService.landIn = landRecord;
  }

  onChangePage(paginator: MatPaginator | {pageSize: number; pageIndex: number}): void {
    const ownerFilter = { owner: this.landOwnerId };
    const limit = paginator.pageSize;
    const offset = limit * paginator.pageIndex;

    const queryParams = CommonUtils.deleteKeysNullInObject( {  ubigeo:this.ubigeo ,limit, offset, status:1  });
    this.landRegistryService
    .getLandbyOwner(ownerFilter.owner, queryParams)
    .toPromise()
    .then(result => this.landRecords = result.results);

  }


  onChangePage2(paginator: MatPaginator | {pageSize: number; pageIndex: number}): void {
    const ownerFilter = { owner: this.landOwnerId };
    const limit = paginator.pageSize;
    const offset = limit * paginator.pageIndex;

    const queryParams = CommonUtils.deleteKeysNullInObject( {  ubigeo:this.ubigeo ,limit, offset, status:2  });
    this.landRegistryService
    .getLandbyOwner(ownerFilter.owner, queryParams)
    .toPromise()
    .then(result => this.landRecords2 = result.results);

  }

  downloadDeclaration(landRecord: LandRegistryMap): void {
    this.landRegistryMapService.emitPrint(
      landRecord,
      this.landOwner
    );
  }

  updateDataSourceWithStreetNames(data): void {
    data.forEach((item) => {
      // Encuentra el nombre de la calle correspondiente al streetType del item
      const matchingStreet = this.masterDomain.codStreet.find(street => street.id === item.streetType);
      if (matchingStreet) {
        item.typeStreetName = matchingStreet.name;
      }
    });
  };
  ngOnDestroy(): void {

    this.unsubscribeAll.next(null);
    this.unsubscribeAll.complete();


  }

}
