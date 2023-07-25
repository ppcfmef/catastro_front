import { Component, OnInit } from '@angular/core';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { LandUI } from 'app/modules/admin/lands/maintenance/interfaces/land.interface';

@Component({
  selector: 'app-land-without-georeferencing',
  templateUrl: './land-without-georeferencing.component.html',
  styleUrls: ['./land-without-georeferencing.component.scss']
})
export class LandWithoutGeoreferencingComponent implements OnInit {
    item: FuseNavigationItem;
    items: FuseNavigationItem[];
    dataSource: LandUI[]=[];
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
