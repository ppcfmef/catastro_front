import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { LandUI } from 'app/modules/admin/lands/maintenance/interfaces/land.interface';
import { LandMaintenanceService } from 'app/modules/admin/lands/maintenance/services/land-maintenance.service';

@Component({
  selector: 'app-search-land-without-geo-table',
  templateUrl: './search-land-without-geo-table.component.html',
  styleUrls: ['./search-land-without-geo-table.component.scss']
})
export class SearchLandWithoutGeoTableComponent implements OnInit {
    cleanSearch: any;
    search: UntypedFormGroup;
    landRecords: LandUI[];
    // eslint-disable-next-line @typescript-eslint/member-ordering
    @Output() searchEvent: EventEmitter<any> = new EventEmitter();
    // eslint-disable-next-line @typescript-eslint/member-ordering
    @Output() cleanSearchEvent: EventEmitter<any> = new EventEmitter();
  constructor(private _fb: UntypedFormBuilder) { }

  ngOnInit(): void {
    this.search = this._fb.group({
        search: [''],
    });
  }
  onCleanSearch(): void{
    this.search.get('search').setValue(null);

    this.cleanSearch=false;
    this.cleanSearchEvent.emit();
  }

  onClickSearch(): void {
    const search = this.search.get('search').value;
    if(search && search!==''){
        this.cleanSearch=true;
    }

    const queryParams={search};
    this.searchEvent.emit(queryParams);
  }

}
