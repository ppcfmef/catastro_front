import { Component, OnInit, AfterViewInit} from '@angular/core';
import { NavigationService } from '../../../core/navigation/navigation.service';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Console } from 'console';

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
      'order': 4151,
      'children': [],
      'hidden': (item): boolean => item?.id === 'gprpregistUsuer'
    },
    {
      'id': 'gprphistor',
      'title': 'Historial de Carga',
      'subtitle': null,
      'type': 'basic',
      'icon': 'heroicons_outline:archive',
      'link': '/land/upload/history',
      'order': 4130,
      'children': [],
      'hidden': (item): boolean => item?.id === 'gprphistor'
    },
    {
      'id': 'gprphistorDetail',
      'title': 'Historial de Carga - Detalle',
      'subtitle': null,
      'type': 'basic',
      'icon': 'heroicons_outline:archive',
      'link': '/land/upload/history',
      'order': 4130,
      'children': [],
      'hidden': (item): boolean => item?.id === 'gprphistorDetail'
    },
    {
      'id': 'gprpconsis',
      'title': 'Consistencia de Datos',
      'subtitle': null,
      'type': 'basic',
      'icon': 'heroicons_outline:clipboard-check',
      'link': '/land/upload/consistency',
      'order': 4132,
      'children': [],
      'hidden': (item): boolean => item?.id === 'gprpconsis'
    },
    {
      'id': 'gprpcondit',
      'title': 'Acondicionamiento de Datos',
      'subtitle': null,
      'type': 'basic',
      'icon': 'heroicons_outline:adjustments',
      'link': '/land/upload/conditioning',
      'order': 4134,
      'children': [],
      'hidden': (item): boolean => item?.id === 'gprpcondit'
    },

  ];
  rutasAdicionales2=[
    {
      'id': 'gapgeo',
      'title': 'Predios sin georreferenciacion',
      'subtitle': null,
      'type': 'basic',
      'icon': '',
      'link': '/land-inspection/gap-analysis/geo',
      'order': 4151,
      'children': [],
      'hidden': (item): boolean => item?.id === 'gapgeo'
    },

    {
      'id': 'gapgrowingblock',
      'title': 'Manzanas crecimiento',
      'subtitle': null,
      'type': 'basic',
      'icon': '',
      'link': '/land-inspection/gap-analysis/growing-block',
      'order': 4152,
      'children': [],
      'hidden': (item): boolean => item?.id === 'gapgrowingblock'
    },

    {
      'id': 'gapimagen',
      'title': 'Puntos en imagen',
      'subtitle': null,
      'type': 'basic',
      'icon': '',
      'link': '/land-inspection/gap-analysis/imagen',
      'order': 4153,
      'children': [],
      'hidden': (item): boolean => item?.id === 'gapimagen'
    },

    {
      'id': 'gapwithoutbatch',
      'title': 'Manzana sin lotes',
      'subtitle': null,
      'type': 'basic',
      'icon': '',
      'link': '/land-inspection/gap-analysis/without-batch',
      'order': 4154,
      'children': [],
      'hidden': (item): boolean => item?.id === 'gapwithoutbatch'
    },

    {
      'id': 'gapsubland',
      'title': 'Posibles predios subvaluados',
      'subtitle': null,
      'type': 'basic',
      'icon': '',
      'link': '/land-inspection/gap-analysis/sub-land',
      'order': 4155,
      'children': [],
      'hidden': (item): boolean => item?.id === 'gapsubland'
    },

    {
      'id': 'gappointswithoutland',
      'title': 'Posibles predios omisos',
      'subtitle': null,
      'type': 'basic',
      'icon': '',
      'link': '/land-inspection/gap-analysis/points-without-land',
      'order': 4156,
      'children': [],
      'hidden': (item): boolean => item?.id === 'gappointswithoutland'
    },

  ];

  rutasAdicionales3 =   [{
    'id': 'gapgeoland',
    'title': 'Detalle del predio',
    'subtitle': null,
    'type': 'basic',
    'icon': '',
    'link': '/land-inspection/gap-analysis/geo/land',
    'order': 4157,
    'children': [],
    'hidden': (item): boolean => item?.id === 'gapgeoland'
  },];


  constructor(
    private _navigationService: NavigationService,
    public router: Router,
  ) { }

  ngOnInit(): void {}

  ngAfterViewInit(): void{
    this._navigationService.get().subscribe((resp) =>{
      this.menuNavegacion = resp.default;

      this.rutasAdicionales.map((navigation) => {
        this.menuNavegacion[5].children.push(navigation);
     });

     this.rutasAdicionales2.map((navigation) => {
      this.menuNavegacion[6].children[0].children.push(navigation);
   });

   this.rutasAdicionales3.map((navigation) => {
    this.menuNavegacion[6].children[0].children[0].children.push(navigation);
 });
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
    this.isArrayReturnValue(breadCrumbs);
    /*for (const item of breadCrumbs) {
      this.isArrayReturnValue(item);
    }*/
  }

  isArrayReturnValue(item): void{

    if(Array.isArray(item)){
      for (const el of item) {
        this.isArrayReturnValue(el);
      }
      //this.isArrayReturnValue(item[0]);
    }else{
      this.breadCrumbTemplate.push(item);
    }

  }
    /**
     * Redirect page
     *
     * @param element
     */
    redirectPage(element): void {
      if (element?.link) {
          this.router.navigateByUrl(element.link);
          return;
      }

      const queryParams = {parentId: element.id};
      this.router.navigate(['home', 'items'], {queryParams});
  }
}
