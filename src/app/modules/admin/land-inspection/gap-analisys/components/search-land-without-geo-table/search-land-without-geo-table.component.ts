import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LandUI } from 'app/modules/admin/lands/maintenance/interfaces/land.interface';
import { LandMaintenanceService } from 'app/modules/admin/lands/maintenance/services/land-maintenance.service';

@Component({
  selector: 'app-search-land-without-geo-table',
  templateUrl: './search-land-without-geo-table.component.html',
  styleUrls: ['./search-land-without-geo-table.component.scss']
})
export class SearchLandWithoutGeoTableComponent implements OnInit {

    search: FormGroup;
    landRecords: LandUI[];
    // eslint-disable-next-line @typescript-eslint/member-ordering
    @Output() searchEvent: EventEmitter<any> = new EventEmitter();
    // eslint-disable-next-line @typescript-eslint/member-ordering
    @Output() cleanSearchEvent: EventEmitter<any> = new EventEmitter();
  constructor(private _fb: FormBuilder) { }

  ngOnInit(): void {
    this.search = this._fb.group({
        search: [''],
    });
  }
  onCleanSearch(): void{
    this.search.get('search').setValue(null);
    this.cleanSearchEvent.emit();
  }

  onClickSearch(): void {
    const search = this.search.get('search').value;
    const queryParams={search};
    console.log('datos',queryParams);
    this.searchEvent.emit(queryParams);

  }
}
