import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatLegacyPaginator as MatPaginator } from '@angular/material/legacy-paginator';
import { LandUI } from '../../interfaces/land.interface';
import { LandMaintenanceService } from '../../services/land-maintenance.service';

@Component({
  selector: 'app-search-land-table',
  templateUrl: './search-land-table.component.html',
  styleUrls: ['./search-land-table.component.scss']
})
export class SearchLandTableComponent implements OnInit {
    search: UntypedFormGroup;
    landRecords: LandUI[];
    // eslint-disable-next-line @typescript-eslint/member-ordering
    @Output() searchEvent: EventEmitter<any> = new EventEmitter();
    // eslint-disable-next-line @typescript-eslint/member-ordering
    @Output() cleanSearchEvent: EventEmitter<any> = new EventEmitter();
  constructor(private _fb: UntypedFormBuilder,private _landMaintenanceService: LandMaintenanceService) { }

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
    this.searchEvent.emit(search);

  }

}
