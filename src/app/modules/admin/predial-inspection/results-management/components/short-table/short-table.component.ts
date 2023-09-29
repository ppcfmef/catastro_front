import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-short-table',
  templateUrl: './short-table.component.html',
  styleUrls: ['./short-table.component.scss']
})
export class ShortTableComponent implements OnInit {

data= {
    title:'Long. Frente',
    total:6
};

@Input()
set dataTable(data: any) {
    this.data = data;
}
  constructor() { }

  ngOnInit(): void {
  }

}
