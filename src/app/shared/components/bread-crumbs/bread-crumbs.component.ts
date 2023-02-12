import { Component, OnInit, AfterViewInit} from '@angular/core';
import { NavigationService } from '../../../core/navigation/navigation.service';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-bread-crumbs',
  templateUrl: './bread-crumbs.component.html',
  styleUrls: ['./bread-crumbs.component.scss']
})
export class BreadCrumbsComponent implements OnInit, AfterViewInit{

  subscriber: Subscription;
  menuNavegacion = [];
  breadCrumPath: any;
  breadCrumbTemplate = [];
  isHome=false;
  rutasAdicionales=[
    {
      'id': 'gprpregistUsuer',
      'title': 'Registros cargados - Contribuyentes',
      'subtitle': null,
      'type': 'basic',
      'icon': 'heroicons_outline:receipt-refund',
      'link': '/land/registry/search/search-owner',
      'order': 4150,
      'children': [],
      'hidden': (item): boolean => item?.id === 'gprpregistUsuer'
    },
  ];

  constructor(
    private _navigationService: NavigationService,
    public router: Router,
  ) { }

  ngOnInit(): void {}

  ngAfterViewInit(): void{
    this._navigationService.get().subscribe((resp) =>{
      this.menuNavegacion = resp.default;
      this.menuNavegacion[5].children.push(this.rutasAdicionales[0]);

      this.isHome = this.router.url.includes('home');
      this.limpiarUrl(this.router.url);
    });

    this.subscriber = this.router.events.pipe(
      filter(route => route instanceof NavigationEnd)
    ).subscribe((route) => {
      this.isHome = false;
      this.isHome = route['url'].includes('home');
      this.limpiarUrl(route['url']);
    });
  }

  separarUrl(cadenaUrl): void{
    const cadenaSeparada = cadenaUrl.split('/');
    if(cadenaSeparada.length === 0 ){
      return;
    }
      for (const index in cadenaSeparada) {
        if(cadenaSeparada[index] === ''){
          cadenaSeparada.splice(index, 1);
        }
      }

      if(cadenaSeparada.length > 0 ){
        this.obtenerLabelsDeRutas(cadenaSeparada);
      }

  }

  limpiarUrl(path): void{
    let inicio; let cadenaLimpia;

      for (let index = 0; index < path.length; index++) {
        const element = path[index];
        if( !isNaN(element) || element === '?' ){
          cadenaLimpia = path.substring(0,index-1);
          break;
        }

      }
      if(cadenaLimpia=== undefined){
        cadenaLimpia = path;
      }
      this.obtenerLabelsDeRutas(cadenaLimpia);
  }

  obtenerLabelsDeRutas(urlString): void{
    this.breadCrumPath = [];
    for (const item of this.menuNavegacion) {
      this.obtenerHijosDeRutasRecursivo(item, urlString);
    }
    this.limpiarBreadCrumbs(this.breadCrumPath);
  }

  obtenerHijosDeRutasRecursivo(itemMenu, urlString, pathParent = null): void{

    if(itemMenu.link === urlString){
      let pathSend = [];
      if(pathParent !== null){
        pathSend = [pathParent];
      }
        pathSend.push(itemMenu);
        this.breadCrumPath =  pathSend;
        return;

    }else{
     if(itemMenu.children.length  > 0){
      for (const element of itemMenu.children) {
        const pathSendFor = pathParent !== null ? [pathParent] : [];
        pathSendFor.push(itemMenu);
        this.obtenerHijosDeRutasRecursivo(element,urlString, pathSendFor);
      }
     }
    }
  }

  limpiarBreadCrumbs(breadCrumbs): void{
    this.breadCrumbTemplate = [];
    for (const item of breadCrumbs) {
      this.isArrayReturnValue(item);
    }
  }

  isArrayReturnValue(item): void{

    if(Array.isArray(item)){
      this.isArrayReturnValue(item[0]);
    }else{
      this.breadCrumbTemplate.push(item);
    }

  }

}
