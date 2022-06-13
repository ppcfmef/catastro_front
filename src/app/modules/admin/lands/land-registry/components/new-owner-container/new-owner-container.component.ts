import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-owner-container',
  templateUrl: './new-owner-container.component.html',
  styleUrls: ['./new-owner-container.component.scss']
})
export class NewOwnerContainerComponent implements OnInit {
  showFormEdit = false;

  constructor() { }

  ngOnInit(): void {
  }

  receivedShowFormEdit(event){
    this.showFormEdit = event;
  }

}
