import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-land-create-and-edit',
  templateUrl: './land-create-and-edit.component.html',
  styleUrls: ['./land-create-and-edit.component.scss']
})
export class LandCreateAndEditComponent implements OnInit {
  
  @Output()
  showFormEdit = new EventEmitter<Boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  emitShowFormEdit(){
    this.showFormEdit.emit(true);
  }

}
