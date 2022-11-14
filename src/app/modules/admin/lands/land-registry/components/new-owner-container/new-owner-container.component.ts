import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Component, OnInit, OnChanges, OnDestroy, Input, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CustomConfirmationService } from 'app/shared/services/custom-confirmation.service';
import { LandRegistryService } from '../../services/land-registry.service';
import { LandOwner } from '../../interfaces/land-owner.interface';

@Component({
  selector: 'app-new-owner-container',
  templateUrl: './new-owner-container.component.html',
  styleUrls: ['./new-owner-container.component.scss']
})
export class NewOwnerContainerComponent implements OnInit, OnChanges, OnDestroy {
  @Input() ownerId: number;
  showFormEdit: boolean | null;
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
    .subscribe((result) => {
      this.landOwner = result;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const ownerId = changes.ownerId?.currentValue;
    if (ownerId) {
      this.landRegistryService.getOwner(ownerId)
      .subscribe((res) => {
        this.receivedShowFormEdit(false);
        this.landRegistryService.setLandOwner(res);
        this.search.setValue(res.dni);
      });
    }
  }

  receivedShowFormEdit(event): void{
    this.showFormEdit = event;
  }

  newOwner(): void{
    this.showFormEdit = true;
    this.landRegistryService.setLandOwner(null);
    this.search.reset();
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
