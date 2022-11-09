import { Component, OnInit, OnDestroy } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { IPagination } from 'app/core/common/interfaces/common.interface';
import { GisMetadataService } from '../../services/gis-metadata.service';
import { GisCatalog } from '../../interfaces/gis-catalog.interface';

@Component({
  selector: 'app-metadata-container',
  templateUrl: './metadata-container.component.html',
  styleUrls: ['./metadata-container.component.scss']
})
export class MetadataContainerComponent implements OnInit, OnDestroy {

  catalogs: GisCatalog[];
  catalogDetail?: GisCatalog;
  catelogsPagination: IPagination<GisCatalog>;
  paginationLimit = 20;
  private unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(private metadataService: GisMetadataService) { }

  ngOnInit(): void {
    this.getData({limit: this.paginationLimit});
  }

  onShowDetail(catalog: GisCatalog): void {
    this.metadataService.getCatalogDetail(catalog.id)
    .pipe(takeUntil(this.unsubscribeAll))
    .subscribe(
      res => this.catalogDetail = res,
      err => this.catalogDetail = undefined
    );
  }

  onCloseDetail(): void {
    this.catalogDetail = undefined;
  }

  onChangePage(paginator: MatPaginator): void {
    const paginationParamenters = {
      offset: paginator.pageSize * paginator.pageIndex,
      limit: paginator.pageSize
    };
    this.getData(paginationParamenters);
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  private getData(queryParameters: {[key: string]: string | number}): void {
    this.metadataService.getCatalogList(queryParameters)
    .pipe(takeUntil(this.unsubscribeAll))
    .subscribe((res: IPagination<GisCatalog>) => {
      this.catelogsPagination = res;
      this.catalogs = res.results;
    });
  }
}
