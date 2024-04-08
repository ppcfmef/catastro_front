import { Component, OnInit, OnChanges, Input, Output,EventEmitter, SimpleChanges } from '@angular/core';
import { LandOwner } from '../../interfaces/land-owner.interface';
import { LandOwnerModel } from '../../models/land-owner.model';

@Component({
  selector: 'app-owner-land-detail',
  templateUrl: './owner-land-detail.component.html',
  styleUrls: ['./owner-land-detail.component.scss']
})
export class OwnerLandDetailComponent implements OnInit, OnChanges {
  @Input() landOwnerIn: LandOwner;
  // @Output() formEdit = new EventEmitter<boolean>();
  @Input()landOwner = new LandOwnerModel();
  showAddress = false;
  typeDocs = [
    {val: '01', name:'DNI'},
    {val: '06', name:'RUC'},
  ];

  constructor() { }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    const ownerCurentValue = changes?.landOwnerIn?.currentValue;
    if (ownerCurentValue) {
      this.landOwner.setValue(ownerCurentValue);
      console.log('ownerCurentValue',ownerCurentValue);
      console.log('landOwner',this.landOwner);
    }
  }


  // emitShowFormEdit(): void{
  //   this.formEdit.emit(true);
  // }

  getDocumentType(code): string {
    const typeDocument = this.typeDocs.find(element => element.val === code);
    return typeDocument?.name;
  }
}
