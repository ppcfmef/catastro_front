import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { NavigationService } from 'app/core/navigation/navigation.service';

@Component({
  selector: 'app-gap-analisys-menu',
  templateUrl: './gap-analisys-menu.component.html',
  styleUrls: ['./gap-analisys-menu.component.scss']
})
export class GapAnalisysMenuComponent implements OnInit {
  item: FuseNavigationItem;
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _navigationService: NavigationService,) { }

  ngOnInit(): void {
    this.item ={
        type:'basic',
        active:true,
        title:'Sin cartografia',
        link: 'land-inspection/gap-analisys/landwithoutgeo',
        subtitle:'200',
    };

  }

  redirectPage(element): void {
    if (element?.link) {
        this._router.navigateByUrl(element.link);
        return;
    }
}
}
