import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ITabLayout } from 'app/core/common/interfaces/common.interface';


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

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
  ) { }

  ngOnInit(): void {
  }

  onGoToNewRecord(): void {
    this._router.navigate(['/land/registry/upload'], {relativeTo: this._activatedRoute});
  }
}
