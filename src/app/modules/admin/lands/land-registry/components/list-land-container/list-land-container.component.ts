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


@Component({
  selector: 'app-list-land-container',
  templateUrl: './list-land-container.component.html',
  styleUrls: ['./list-land-container.component.scss']
})
export class ListLandContainerComponent implements OnInit, OnDestroy, OnChanges {
  @Input() landId: number;
  @Input() ubigeo: string;
  landRecords: LandRegistryMap[];
  tableLength: number;

  private unsubscribeAll: Subject<any> = new Subject<any>();
  private landOwnerId!: number;
  private landOwner: LandOwner;
  private defaultTableLimit = 5;
    private servicesSubscribe;
  constructor(
    private landRegistryService: LandRegistryService,
    private landRegistryMapService: LandRegistryMapService,
    private navigationAuthorizationService: NavigationAuthorizationService
  ) { }
    ngOnChanges(changes: SimpleChanges): void {
        /*this.ubigeo=this.navigationAuthorizationService.ubigeoNavigation;
        console.log('ubigeo',this.ubigeo);*/
    }

  ngOnInit(): void {
    console.log('ubigeo',this.ubigeo);
    /*this.navigationAuthorizationService.userScopePermission(this.idView)
    .pipe(takeUntil(this.unsubscribeAll))
    .subscribe((data: any) => {
      if(!data?.limitScope){
        this.ubigeo = null;

      }
      else {

        this.ubigeo = data?.ubigeo;
      }

      this.navigationAuthorizationService.ubigeoNavigation = this.ubigeo;
    });*/
    //console.log('ubigeo',this.ubigeo);

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
            console.log('ownerResult>>',ownerResult);
          this.landOwnerId = registerLand?.owner;
        }
        if (this.landOwnerId && ownerResult) {
          console.log('landOwnerId>>',this.landOwnerId);
          const queryParams = CommonUtils.deleteKeysNullInObject( { limit: this.defaultTableLimit , ubigeo:this.ubigeo });

          if (this.landId) {
            queryParams['id'] = this.landId;
          }
          this.landRegistryService
          .getLandbyOwner(this.landOwnerId, queryParams)
          .toPromise()
          .then(
            (landResult) => {
              this.landRecords = landResult.results;
              this.tableLength = landResult.count;
              if (this.landId && this.tableLength > 0) {
                setTimeout(() => { // ToDo: Coordinar con frank porque demora tanto su mapa
                  this.seledRecord(this.landRecords[0]);
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

  createLandRecord(): void {
    this.landRegistryService.setLandCreate(true);
    //this.landRegistryMapService.landIn = null;
  }

  onChangePage(paginator: MatPaginator | {pageSize: number; pageIndex: number}): void {
    const ownerFilter = { owner: this.landOwnerId };
    const limit = paginator.pageSize;
    const offset = limit * paginator.pageIndex;
    //const queryParams = { limit, offset, ...ownerFilter };

    const queryParams = CommonUtils.deleteKeysNullInObject( {  ubigeo:this.ubigeo ,limit, offset, ...ownerFilter });
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

    this.unsubscribeAll.next(null);
    this.unsubscribeAll.complete();


  }

}
