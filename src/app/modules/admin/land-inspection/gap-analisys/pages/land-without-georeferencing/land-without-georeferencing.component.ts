import { Component, OnInit } from '@angular/core';
import { FuseNavigationItem } from '@fuse/components/navigation';

@Component({
  selector: 'app-land-without-georeferencing',
  templateUrl: './land-without-georeferencing.component.html',
  styleUrls: ['./land-without-georeferencing.component.scss']
})
export class LandWithoutGeoreferencingComponent implements OnInit {
    item: FuseNavigationItem;
    items: FuseNavigationItem[];
  constructor() { }

  ngOnInit(): void {
    this.items = [
        {
            type:'basic',
            active:true,
            title:'Predios sin cartografia inicial',
            subtitle:'400',
        },
        {
            type:'basic',
            active:true,
            title:'Predios enlazados',
            subtitle:'200',
        },
        {
            type:'basic',
            active:true,
            title:'Predios faltantes',
            subtitle:'180',
        },

    ];
    /*this.item ={
        type:'basic',
        active:true,
        title:'Predios sin cartografia inicial',
        subtitle:'400',
    };*/
  }

}
