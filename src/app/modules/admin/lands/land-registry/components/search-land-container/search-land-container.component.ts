import { BehaviorSubject, Observable, of, Subject, Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import {FormControl, FormGroup, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { IPagination } from 'app/core/common/interfaces/common.interface';
import { ExportReportService } from 'app/shared/services/export-report.service';
import { LandOwner } from '../../interfaces/land-owner.interface';
import { LandRecord } from '../../interfaces/land-record.interface';
import { LandOwnerService } from '../../services/land-owner.service';
import { LandRecordService } from '../../services/land-record.service';
import { takeUntil } from 'rxjs/operators';
import { NavigationAuthorizationService } from 'app/shared/services/navigation-authorization.service';
import { CommonUtils } from 'app/core/common/utils/common.utils';
import { FuseValidators } from '@fuse/validators';
import { fuseAnimations } from '@fuse/animations';
import { LandOwnerDetailService } from '../../services/land-owner-detail.service';
import { LandOwnerDetail } from '../../interfaces/land-owner-detail.interface';
import moment from 'moment';


@Component({
  selector: 'app-search-land-container',
  templateUrl: './search-land-container.component.html',
  styleUrls: ['./search-land-container.component.scss'],
  animations : fuseAnimations
})
export class SearchLandContainerComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  changesSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  ownerLandSubscription: Subscription;

  formFilters: UntypedFormGroup;

  year: number;
  displayedColumns: string[] = ['#', 'tNivel', 'piso', 'aConstrucc','eConsv','muros','techos', 'puertas',
    'aConstruida', 'aComun'];
  showOwnerTable = false;
  detailLandByOwner$: Observable<LandOwnerDetail>;
  showLandsMap = false;
  isLoading: boolean = false;
  dataSource: LandOwner[] = [];
  dataSourceLands: LandRecord[] = [];
  lengthOwner: number = 0;
  lengthLandsOwner: number = 0;
  landOwner: LandOwner;
  landRecord: LandRecord;
  ubigeo: string;
  unsubscribeAll: Subject<any> = new Subject<any>();
  idView = 'gprpregist';
  hideSelectUbigeo = true;
  optionS = [
    {
      cod:'',
      option:'Todos'
    },
    {
      cod:'0',
      option:'Predios sin Cartografia'
    },
    {
      cod:'1',
      option:'Predios con Cartografia'
    },
    // {
    //   cod:'2',
    //   option:'Coordenada de Imagen'
    // },
    {
      cod:'3',
      option:'Predios Inactivos'
    }
  ];
  isVisible = false;
  constructor(
    private router: Router,
    private cdRef: ChangeDetectorRef,
    private _landOwnerService: LandOwnerService,
    private landRecordService: LandRecordService,
    private exportReportService: ExportReportService,
    private navigationAuthorizationService: NavigationAuthorizationService,
    private landOwnerDetailService: LandOwnerDetailService
  ) {};

  ngOnInit(): void {
    this.landRecordService.renderOption$.next(true);
    this.createFormFilters();
    this.navigationAuthorizationService.userScopePermission(this.idView)
    .pipe(takeUntil(this.unsubscribeAll))
    .subscribe((data: any) => {
      if(!data?.limitScope){
        this.ubigeo = null;
        this.hideSelectUbigeo = false;
      }
      else {
        this.hideSelectUbigeo = true;
        this.ubigeo = data?.ubigeo;
      }

      this.navigationAuthorizationService.ubigeoNavigation = this.ubigeo;
    });
  }

  ngAfterViewInit(): void {
    const queryParams = this.makeQueryParams();
    this.getLandRecords({limit: 10, ...queryParams});
    this.landRecordService.filtersOptions$.pipe(takeUntil(this.unsubscribeAll)).subscribe((option) => {
      if(FuseValidators.isEmptyInputValue(option)){
        this.formFilters.controls.status.setValue('');
      }else{
        this.formFilters.controls.status.setValue(option);
      }
      this.onFilterStatus();
    });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next(null);
    this.unsubscribeAll.complete();
  }

  onChangePage(data: {paginator: any; sort: Sort}): void {
    const filterQueryParams = this.makeQueryParams();
    const limit = data?.paginator.pageSize;
    const offset = limit * data?.paginator.pageIndex;
    const ordering = this.orderingFormater(data.sort);
    const queryParams = { limit, offset, ordering, ...filterQueryParams };
    this.getLandRecords(queryParams);
  }

  onShowLandsMap(landRecord: LandRecord): void {
    this._landOwnerService.getLandDetail(landRecord.id)
    .pipe(takeUntil(this.unsubscribeAll))
    .subscribe(
      (response) => {
        this.dataSource = response.results;
        this.lengthOwner = response.count;
        this.landOwner = response.results[0];
        this.landRecord = landRecord;
        if(this.landOwner){
            this.showOwnerTable = true;
        } else {
            this.showOwnerTable = false;
        }

        this.isVisible = false;
        this.showLandsMap = true;
        setTimeout(() => {
            document.getElementById('dowloandCroquis').scrollIntoView();
        }, 0.010);
      }
    );
  }

  onDowloandCroquis(): void{
    this.landRecordService.setLandRecordDownloadCroquis(true);
  }

  onClickSearch(): void {
    const queryParams = this.makeQueryParams();
    this.getLandRecords(queryParams);
    this.showOwnerTable = false;
    this.showLandsMap = false;
  }

  onCleanSearch(): void {
    this.formFilters.get('search').setValue(null);
    this.getDefaultData();

  }

  onChangeView(): void {
    const tabView = this.formFilters.get('view').value;
    if (tabView === 'predio') {
      this.landRecordService.renderOption$.next(true);
      this.router.navigate(['/land/registry/search/search-land']);
    }
    else if (tabView === 'Contribuyente') {
      this.landRecordService.renderOption$.next(false);
      this.router.navigate(['/land/registry/search/search-owner']);
    }
  }

  onFilterStatus(): void {
    const status = this.formFilters.get('status').value;
    this.showOwnerTable = false;
    this.showLandsMap = false;
    this.landRecordService.filtersOptionsSelect$.next(status);
    this.onClickSearch();
    // if (status !== undefined) {
    //   console.log(status, 'status2');
    //   this.onClickSearch(); // Todo: se debe unificar en un solo metodo
    // }else {
    //   console.log(status, 'status1');
    //   this.getDefaultData();
    // }
  }

  onDownloadReport(): void {
    const queryParams = this.makeQueryParams();
    const exportUrl = this.exportReportService.getUrlExportReport('/land/records/', queryParams);
    window.open(exportUrl, '_blank');
  }

  onSelectUbigeo(ubigeo: string): void {
    this.ubigeo = ubigeo;
    this.navigationAuthorizationService.ubigeoNavigation = this.ubigeo;
    const queryParams = this.makeQueryParams();
    this.getLandRecords(queryParams);
    this.showOwnerTable = false;
    this.showLandsMap = false;
  }

  onShowLandOwner(landOwner: LandOwner): void{
    this.landOwner = landOwner;
    this.isVisible = false;
    setTimeout(() => document.getElementById('dowloandCroquis').scrollIntoView(), 0.001);
  }

  scrollTo(): void{

    this.detailLandByOwner$ = this.landOwnerDetailService.getDetailLandByOwner(this.landRecord.id, this.landOwner.id);

    this.detailLandByOwner$.subscribe((response) => {
        this.year = moment(response.fechaDj).year();
            if (this.year < 2024) {
                this.displayedColumns = ['#', 'tNivel','piso', 'aConstrucc','eConsv','muros','techos', 'cPiso','puertas',
                    'revestimiento', 'bano','instSanitarias','aConstruida', 'aComun'];
            }
        });
    this.isVisible = !this.isVisible;

    if (this.isVisible) {
        setTimeout(() => {
            const element = document.getElementById('moreDetail');
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100);
      }
  }
  private makeQueryParams(): {[key: string]: string | number} {
    const rawValue = this.formFilters.getRawValue();
    let queryParams = {};
    const search = rawValue?.search || null;
    const status = rawValue?.status;
    const direccion: string = rawValue?.direccion;
    const ubigeo = this.ubigeo;
    queryParams['search'] = search;
    queryParams['status'] = status;
    queryParams['ubigeo'] = ubigeo;

    if (direccion && direccion.length>0){
      queryParams = { ... queryParams , ... this.parseAddress(direccion)};
    }


    /*if (search !== null) {
      queryParams['search'] = search;
    }

    if (status !== null && status !== undefined) {
      queryParams['status'] = status;
    }

    if (ubigeo !== null && ubigeo !== undefined) {
      queryParams['ubigeo'] = ubigeo;
    }*/

    return CommonUtils.deleteKeysNullInObject( queryParams);
  }


  private parseAddress(address: string ): any {

    const regex = /^(.*?)(?:\s+(\d+))?\s*(?:Mz\s+(\w+)\s*Lt\s+(\w+))?$/;
    const match = address.match(regex);
    if (match) {
        return {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          'street_name': match[1] || null,
            // eslint-disable-next-line @typescript-eslint/naming-convention
            'municipal_number': match[2] || null,
            // eslint-disable-next-line @typescript-eslint/naming-convention
            'urban_mza': match[3] || null,
            // eslint-disable-next-line @typescript-eslint/naming-convention
            'urb_lot_number': match[4] || null,
        };
    }
    return null;
    /*const regex = /^(?:(.*?)\s+(\d+))|(?:(.*?)\s+Mz\s+(\d+)\s+Lt\s+(\d+))|(?:Mz\s+(\d+)\s+Lt\s+(\d+))$/;
    const match = address.match(regex);
    if (match) {
        if (match[1] && match[2]) {
            // Formato: Nombre de la vía seguido por número de puerta
            return {
                streetName: match[1],
                municipalNumber: match[2],
            };
        } else if (match[3] && match[4] && match[5]) {
            // Formato: Nombre de la vía seguido por manzana y lote
            return {
                streetName: match[3],
                urbanMza: match[4],
                urbLotNumber: match[5],
            };
        } else if (match[6] && match[7]) {
            // Formato: Solo manzana y lote
            return {
              urbanMza: match[6],
              urbLotNumber: match[7],
            };
        }

    }
    return null;
*/

  }
  private createFormFilters(): void {
    this.formFilters = new FormGroup({
      search: new FormControl(),
      view: new FormControl('predio'),
      status: new FormControl(''),
      direccion:new FormControl(''),
    });
  }

  private getDefaultData(): void {
    this.showOwnerTable = false;
    this.showLandsMap = false;
    const queryParams = this.makeQueryParams();
    this.getLandRecords({limit: 10,... queryParams});
  }

  private getLandRecords(queryParams): void {
    this.ownerLandSubscription = this.landRecordService.getList(queryParams)
    .subscribe(
      (response: IPagination<LandRecord>) => {
        this.dataSourceLands = response.results;
        this.lengthLandsOwner = response.count;
        this.cdRef.detectChanges();
    });
  }

  private orderingFormater(sort: Sort): string {
    const orderingActive = sort?.active;
    return (sort?.direction === 'desc') ? '-'+orderingActive : orderingActive;
  }

}
