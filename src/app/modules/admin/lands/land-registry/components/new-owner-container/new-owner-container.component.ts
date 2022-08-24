import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CustomConfirmationService } from 'app/shared/services/custom-confirmation.service';
import { LandRegistryService } from '../../services/land-registry.service';
import { LandOwnerModel } from '../../models/land-owner.model';
import { LandOwner } from '../../interfaces/land-owner.interface';

@Component({
  selector: 'app-new-owner-container',
  templateUrl: './new-owner-container.component.html',
  styleUrls: ['./new-owner-container.component.scss']
})
export class NewOwnerContainerComponent implements OnInit, OnDestroy {
  showFormEdit = true;
  search: FormControl = new FormControl();
  landOwner: LandOwner;
  private unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private landRegistryService: LandRegistryService,
    private confirmationService: CustomConfirmationService,
  ) {
    this.search = new FormControl('');
  }

  ngOnInit(): void {
    this.landRegistryService.getLandOwner()
    .pipe(takeUntil(this.unsubscribeAll))
    .subscribe(result => this.landOwner = result);
  }

  receivedShowFormEdit(event): void{
    this.showFormEdit = event;
  }

  searchOwner(): void {
    const searchText = this.search.value;
    this.landRegistryService.searchOwnerbyDocument(searchText)
    .toPromise()
    .then(
      (result) => {
        this.receivedShowFormEdit(false);
        this.landRegistryService.setLandOwner(result);
      },
      (error) => {
        const dialogRef = this.confirmationService.error(
          'Contribuyente no encontrado',
          `¿Desea crear un nuevo contribuyente con documento ${searchText}?`
        );

        dialogRef.afterClosed().subscribe((option) => {
          if (option === 'confirmed') {
            this.receivedShowFormEdit(true);
            console.log('pasar documento al formulario', searchText);
          }
          this.search.reset();
        });
      }
    );
  }

  ngOnDestroy(): void{
    this.landRegistryService.setLandOwner(null);
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
}
