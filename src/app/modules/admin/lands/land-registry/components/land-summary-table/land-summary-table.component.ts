import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-land-summary-table',
  templateUrl: './land-summary-table.component.html',
  styleUrls: ['./land-summary-table.component.scss']
})
export class LandSummaryTableComponent implements OnInit {
  
  ELEMENT_DATA = [
    {position: 1, cup: '1234567890', cum: '1234567890', nameHab: 'Canto grande', nameVia: 'Canto grande'},
    {position: 2, cup: '1234567890', cum: '1234567890', nameHab: 'Canto grande', nameVia: 'Canto grande'},
    {position: 3, cup: '1234567890', cum: '1234567890', nameHab: 'Canto grande', nameVia: 'Canto grande'},
    {position: 4, cup: '1234567890', cum: '1234567890', nameHab: 'Canto grande', nameVia: 'Canto grande'},
    {position: 5, cup: '1234567890', cum: '1234567890', nameHab: 'Canto grande', nameVia: 'Canto grande'},
  ];

  displayedColumns: string[] = ['position', 'cup', 'cum', 'nameHab', 'via'];
  dataSource = this.ELEMENT_DATA;

  predioSelected = new Set<any>();

  constructor() { }

  ngOnInit(): void {
  }

  predioSelection(row){
    this.predioSelected.clear(); 
    this.predioSelected.add(row);
  }

}
