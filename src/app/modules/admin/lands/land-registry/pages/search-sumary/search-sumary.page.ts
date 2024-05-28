import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IPagination, ITabLayout } from 'app/core/common/interfaces/common.interface';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LandRecordSummary } from '../../interfaces/land-record-summary.interface';
import { LandRecordService } from '../../services/land-record.service';
import { NavigationAuthorizationService } from 'app/shared/services/navigation-authorization.service';
import { isObject } from 'lodash';
import { FuseValidators } from '@fuse/validators';
import { LandOwner } from '../../interfaces/land-owner.interface';
import { LandOwnerService } from '../../services/land-owner.service';


@Component({
  selector: 'app-search-sumary',
  templateUrl: './search-sumary.page.html',
  styleUrls: ['./search-sumary.page.scss']
})
export class SearchSumaryPage implements OnInit {

  tabs: ITabLayout[] = [
    {label: 'Consultar contribuyente', route: '/land/registry/search/search-owner'},
    {label: 'Consultar predio', route: '/land/registry/search/search-land'},
  ];
  idView = 'gprpregist';
  summary: LandRecordSummary;
  optionsLands: any[] = [
    {
      id:'',
      titleCard: 'Total de Predios Registrados',
      class:'',
      label:'totalRecords',
      total: null
    },
    {
      id:'1',
      titleCard: 'Predios con Cartografía',
      class:'green',
      label:'mappingRecords',
      total: null
    },
    {
      id:'0',
      titleCard: 'Predios sin Cartografía',
      class:'red',
      label:'withoutMappingRecords',
      total: null

    },
    {
      id:'3',
      titleCard: 'Predios Inactivos',
      class:'gray',
      label:'inactiveRecords',
      total: null

    }
  ];

  optionOwner: any[] = [
    {
      id:'',
      titleCard: 'Total de Contribuyentes Registrados',
      class:'',
      label:'totalRecords',
      total: null
    },
  ];
  ubigeo: string;
  unsubscribeAll: Subject<any> = new Subject<any>();
  selectedCardId;
  renderOption:boolean;
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private landRecordService: LandRecordService,
    private navigationAuthorizationService: NavigationAuthorizationService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _landOwnerService: LandOwnerService,
  ) { }

  ngOnInit(): void {

    this.landRecordService.renderOption$.subscribe(render => {
      this.renderOption = render;
    });
    this.navigationAuthorizationService.ubigeoNavigation$
    .pipe(takeUntil(this.unsubscribeAll))
    .subscribe((ubigeo: string | null) => {
      const queryParams = {};

      if (ubigeo !== null && ubigeo !== undefined) {
        queryParams['ubigeo'] = ubigeo;
      };

      this.landRecordService.getSummary(queryParams)
      .subscribe(summary => {
        this.updatePrediosValues(this.optionsLands, summary);
        this.summary = summary;
      });

      this._landOwnerService.getList(queryParams)
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(
        (response: IPagination<LandOwner>) => {
          this.optionOwner[0].total = response.count;

      });
    });






    this.landRecordService.filtersOptionsSelect$.subscribe(option => {

      if (FuseValidators.isEmptyInputValue(option)) {
          this.selectedCardId = '';
      }else{
        this.selectedCardId = option;
      }

    //   this._changeDetectorRef.detectChanges();
    });
  }



  onGoToNewRecord(): void {
    this._router.navigate(['/land/registry/new-owner'], {relativeTo: this._activatedRoute});
  }

  updatePrediosValues(options: any[], data: any) {
    options.forEach(option => {
      const dataKey = option.label;
      if (dataKey && data.hasOwnProperty(dataKey)) {
        option.total = data[dataKey];
      }
    });
  }

  onSelect(option):void{
    this.selectedCardId = option.id;
    this.landRecordService.filtersOptions$.next(option.id);
    console.log(this.selectedCardId, 'op')
  };

  onSelectOwner(option):void{

  }
}
