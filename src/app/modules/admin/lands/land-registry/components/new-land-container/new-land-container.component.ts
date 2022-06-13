import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-land-container',
  templateUrl: './new-land-container.component.html',
  styleUrls: ['./new-land-container.component.scss']
})
export class NewLandContainerComponent implements OnInit {

  showEditForm= true;

  constructor() { }

  ngOnInit(): void {
  }

  receivedShowFormEdit(event){
    console.log(event);
    this.showEditForm = event;
  }

}
