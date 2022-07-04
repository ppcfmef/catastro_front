import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-owner-land-detail',
  templateUrl: './owner-land-detail.component.html',
  styleUrls: ['./owner-land-detail.component.scss']
})
export class OwnerLandDetailComponent implements OnInit {

  @Output()
  formEdit = new EventEmitter<boolean>();

  tipo_doc ="DNI";

  constructor() { }

  ngOnInit(): void {
  }

  emitShowFormEdit(){
    this.formEdit.emit(true);
  }

}
