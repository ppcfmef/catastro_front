import { Component, OnInit, AfterViewInit} from '@angular/core';
import { NavigationService } from '../../../core/navigation/navigation.service'
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
      "id": "gprpregistUsuer",
      "title": "Registros cargados",
      "subtitle": null,
      "type": "basic",
      "icon": "heroicons_outline:receipt-refund",
      "link": "/land/registry/search/search-owner",
      "order": 4150,
      "children": []
    },
  ];


  constructor(
    

    private _navigationService : NavigationService,
    public router: Router,
  ) { }

  ngOnInit(): void {
    

  }

  ngAfterViewInit():void{
    this._navigationService.get().subscribe(resp =>{
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

  separarUrl(cadenaUrl):void{
    let cadenaSeparada = cadenaUrl.split('/');

    if(cadenaSeparada.length === 0 ){
      return
    }

      for (let index = 0; index < cadenaSeparada.length; index++) {
        if(cadenaSeparada[index] === ""){
          cadenaSeparada.splice(index, 1);
        }
      }
      if(cadenaSeparada.length > 0 ){
        this.obtenerLabelsDeRutas(cadenaSeparada);
      }
      
  }

  limpiarUrl(path):void{
    let inicio,cadenaLimpia;
 
      for (let index = 0; index < path.length; index++) {
        const element = path[index];
        if( !isNaN(element) || element === '?' ){
          console.log(path);   
          console.log(index);  
          console.log(isNaN(element));    
          cadenaLimpia = path.substring(0,index-1);

          break;
        }
         
      }
      if(cadenaLimpia=== undefined){
        cadenaLimpia = path;
      }

      console.log(cadenaLimpia);

      this.obtenerLabelsDeRutas(cadenaLimpia);

      

  }

  obtenerLabelsDeRutas(urlString): void{
    console.log(urlString);
    this.breadCrumPath = [];
    for (let index = 0; index < this.menuNavegacion.length; index++) {
       let item = this.menuNavegacion[index];        
      this.obtenerHijosDeRutasRecursivo(item, urlString);
    }
    this.limpiarBreadCrumbs(this.breadCrumPath);
  }

  obtenerHijosDeRutasRecursivo(itemMenu, urlString, pathParent = null){
    
    if(itemMenu.link === urlString){
      let pathSend = [];
      if(pathParent !== null){        
        pathSend = [pathParent];
      } 
        console.log('Encontrado');
        pathSend.push(itemMenu);
        this.breadCrumPath =  pathSend;
        return
      
    }else{
     if(itemMenu.children.length  > 0){
      
      for (let index = 0; index < itemMenu.children.length; index++) {
        let pathSendFor = [];
        if(pathParent !== null){        
          pathSendFor = [pathParent];
        } 
        const element = itemMenu.children[index];
        pathSendFor.push(itemMenu);      
        this.obtenerHijosDeRutasRecursivo(element,urlString, pathSendFor);
      }
      
     }
    }
  }

  limpiarBreadCrumbs(breadCrumbs){     
    this.breadCrumbTemplate = [];
    for (let index = 0; index < breadCrumbs.length; index++) {
       this.isArrayReturnValue(breadCrumbs[index]);          
    }
     
  }
  isArrayReturnValue(item){
    
    if(Array.isArray(item)){
      this.isArrayReturnValue(item[0]);
    }else{
      this.breadCrumbTemplate.push(item);
      console.log(this.breadCrumbTemplate);
    }
     
  }

}
