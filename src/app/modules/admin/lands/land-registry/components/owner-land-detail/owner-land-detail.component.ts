import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Component, OnInit, OnDestroy, Input, Output,EventEmitter } from '@angular/core';
import { LandOwnerModel } from '../../models/land-owner.model';
import { LandRegistryService } from '../../services/land-registry.service';

@Component({
  selector: 'app-owner-land-detail',
  templateUrl: './owner-land-detail.component.html',
  styleUrls: ['./owner-land-detail.component.scss']
})
export class OwnerLandDetailComponent implements OnInit, OnDestroy {
  @Output() formEdit = new EventEmitter<boolean>();
  landOwner: LandOwnerModel = new LandOwnerModel();
  showAddress = false;
  private unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private landRegistryService: LandRegistryService
  ) { }

  ngOnInit(): void {
    this.landRegistryService.getLandOwner()
    .pipe(takeUntil(this.unsubscribeAll))
    .subscribe((result) => {
      this.landOwner.setValue(result);
    });
  }

  emitShowFormEdit(): void{
    this.formEdit.emit(true);
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

}
