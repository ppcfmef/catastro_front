import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { LandRegistryMap } from '../../interfaces/land-registry-map.interface';
import { LandRegistryService } from '../../services/land-registry.service';

@Component({
  selector: 'app-land-summary-table',
  templateUrl: './land-summary-table.component.html',
  styleUrls: ['./land-summary-table.component.scss']
})
export class LandSummaryTableComponent implements OnInit {

  @Input() dataSource: LandRegistryMap[];
  @Input() length: number;
  @Input() selectedId: number;
  @Output() changePage: EventEmitter<MatPaginator> = new EventEmitter();
  @Output() seledRecord: EventEmitter<LandRegistryMap> = new EventEmitter();
  @Output() downloadDeclaration: EventEmitter<LandRegistryMap> = new EventEmitter();

  displayedColumns: string[] = ['nro', 'cup', 'cpm', 'print', 'steetName'];
  landSelected = new Set<any>();
  pageIndex = 0;
  pageSize = 5;
  pageSizeOptions = [1, 5, 10, 25, 50, 100, 250, 500];
  clickedRow: string | null = null;
  private unsubscribeAll = new Subject<any>();

  constructor(
    private landRegistryService: LandRegistryService
  ) { }

  ngOnInit(): void {
    this.landRegistryService.getLandCreate()
    .pipe(takeUntil(this.unsubscribeAll))
    .subscribe((result) => {
      if (result) {
        this.landSelected?.clear();
      }
    });
    if (this.selectedId && this.dataSource?.length === 1) {
      this.landSelected.add(this.dataSource[0]);
    }
  }

  landSelection(landRecord: LandRegistryMap): void{
    this.landSelected.clear();
    this.landSelected.add(landRecord);
    this.seledRecord.emit(landRecord);
    this.clickedRow = landRecord.id.toString();
  }


  isIconClicked(id: string): boolean {
    return this.clickedRow === id;
  }
  onPage(paginator: MatPaginator): void {
    this.pageIndex = paginator.pageIndex;
    this.changePage.emit(paginator);
  }

  onDownloadDeclaration(landRecord: LandRegistryMap): void {
    this.downloadDeclaration.emit(landRecord);
  }
}
