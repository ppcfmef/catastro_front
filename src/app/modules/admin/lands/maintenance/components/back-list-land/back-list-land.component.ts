import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-back-list-land',
  templateUrl: './back-list-land.component.html',
  styleUrls: ['./back-list-land.component.scss']
})
export class BackListLandComponent implements OnInit {

  @Input() backLink: {
    title: string;
    routerLink: string;
  };
  
  constructor() { }

  ngOnInit(): void {
  }

}
