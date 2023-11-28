import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ITabLayout } from 'app/core/common/interfaces/common.interface';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LandRecordSummary } from '../../interfaces/land-record-summary.interface';
import { LandRecordService } from '../../services/land-record.service';
import { NavigationAuthorizationService } from 'app/shared/services/navigation-authorization.service';


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
  ubigeo: string;
  unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private landRecordService: LandRecordService,
    private navigationAuthorizationService: NavigationAuthorizationService,
  ) { }

  ngOnInit(): void {
    this.navigationAuthorizationService.ubigeoNavigation$
    .pipe(takeUntil(this.unsubscribeAll))
    .subscribe((ubigeo: string | null) => {
      const queryParams = {};

      if (ubigeo !== null && ubigeo !== undefined) {
        queryParams['ubigeo'] = ubigeo;
      }
      this.landRecordService.getSummary(queryParams)
      .subscribe(summary => this.summary = summary);
    });
  }

  onGoToNewRecord(): void {
    this._router.navigate(['/land/registry/new-owner'], {relativeTo: this._activatedRoute});
  }
}
