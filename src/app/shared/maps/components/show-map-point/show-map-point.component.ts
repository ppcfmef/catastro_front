

import { Coordinates } from '../../maps.type';
import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild,OnChanges  } from '@angular/core';
import { loadModules } from 'esri-loader';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import html2canvas from 'html2canvas'; // Todavía no lo usamos
import { LandRecordService } from 'app/modules/admin/lands/land-registry/services/land-record.service';
import { LandRecord } from 'app/modules/admin/lands/land-registry/interfaces/land-record.interface';
import moment from 'moment';
import { CommonService } from 'app/core/common/services/common.service';
import { UserService } from 'app/core/user/user.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User } from 'app/core/user/user.types';
import { DistrictResource } from 'app/core/common/interfaces/common.interface';
import { LandOwner } from 'app/modules/admin/lands/land-registry/interfaces/land-owner.interface';
@Component({
  selector: 'app-show-map-point',
  templateUrl: './show-map-point.component.html',
  styleUrls: ['./show-map-point.component.scss']
})
export class ShowMapPointComponent implements OnInit,AfterViewInit, OnChanges  {
    @Input() points: Coordinates[]=[{latitude: -13.53063, longitude: -71.955921},{latitude: -13.54, longitude: -71.955921}];
    @ViewChild('mapViewNode', { static: true }) private mapViewEl: ElementRef;

    @Input()landOwner: LandOwner;
    @Input()landRecord: LandRecord;
    
    title = 'Gestor Cartográfico';
    view: any = null;
    map: any;
    user: User;
    _unsubscribeAll: Subject<any> = new Subject<any>();
    simpleMarkerSymbol = {
        type: 'picture-marker',  // autocasts as new PictureMarkerSymbol()
        url: '/assets/images/map/location2.png',
        width: '20px',
        height: '30px'
      };

      layersInfo = [


        {idServer:0,
          title:  ' Zona 17',
          id: 0,
          urlBase:
            'https://ws.mineco.gob.pe/serverdf/rest/services/pruebas/CARTO_FISCAL_17/MapServer',
          order: 0,
          featureLayer: null,
          definitionExpression:'1=1',
          featureTable:null,
          popupTemplate:null
        },

        {idServer:0,
            title:  ' Zona 18',
            id: 0,
            urlBase:
              'https://ws.mineco.gob.pe/serverdf/rest/services/pruebas/CARTO_FISCAL_18/MapServer',
            order: 0,
            featureLayer: null,
            definitionExpression:'1=1',
            featureTable:null,
            popupTemplate:null
          },


          {idServer:0,
            title:  ' Zona 19',
            id: 0,
            urlBase:
              'https://ws.mineco.gob.pe/serverdf/rest/services/pruebas/CARTO_FISCAL_19/MapServer',
            order: 0,
            featureLayer: null,
            definitionExpression:'1=1',
            featureTable:null,
            popupTemplate:null
          }
        ];

  constructor( 
    
    private _landRecordService: LandRecordService,
    private _commonService: CommonService,
    private _userService: UserService,
    
    ) { 



  }

  ngOnInit(): void {
    
    this._landRecordService.getLandRecordDownloadCroquis().subscribe((res :boolean)=>{
      if(res){
        this.downloadPDF();
      }
    });
   

    this._userService.user$
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((user: User) => {
        this.user = user;
        const ubigeo =
            this.user.placeScope && this.user.placeScope.ubigeo
                ? this.user.placeScope.ubigeo
                : '150101';
       /* this._commonService
            .getDistrictResource(ubigeo)
            .subscribe((data: DistrictResource) => {

           
           
            });*/
    });
  }

  ngAfterViewInit(): void {
    //this.points=[{latitude: -13.53063, longitude: -71.955921}] ;
    setTimeout(() => {this.initializeMap(); }, 1000);
    }

  ngOnChanges(): void {
    if(this.view){
        this.addPoints(this.points);
    }

    }
 /* eslint-disable @typescript-eslint/naming-convention */
  async initializeMap( ): Promise<void> {
    try {
      const container = this.mapViewEl.nativeElement;

      const [
        // eslint-disable-next-line @typescript-eslint/naming-convention
        Map,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        MapView,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        Graphic,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        GraphicsLayer,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        MapImageLayer,
        Expand,
        BasemapGallery
      ] = await loadModules([
        'esri/Map',
        'esri/views/MapView',
        'esri/Graphic',
        'esri/layers/GraphicsLayer',
        'esri/layers/MapImageLayer',
        'esri/widgets/Expand',
        'esri/widgets/BasemapGallery',
      ]);

      const mapProperties = {
        basemap: 'streets-vector',
      };

      this.map = new Map(mapProperties);

      const mapViewProperties = {
        container: this.mapViewEl.nativeElement,
        zoom: 18,

        map: this.map,
      };

      this.view = new MapView(mapViewProperties);

      const basemapGallery = new BasemapGallery({
        view: this.view,
      });

      basemapGallery.activeBasemap ='satellite';


      const baseMapGalleryExpand = new Expand({
        view: this.view,
        content: basemapGallery,
        id: 'mapGalleryBase',
        group: 'bottom-right'
      });

      this.layersInfo.forEach((l)=>{
        const layer = new MapImageLayer({
            url: l.urlBase
          });
        this.map.add(layer);
      });



    const screenshotDiv=document.getElementById('screenshotDiv');

    this.view.when(() => {
        this.addPoints(this.points);
                         //this.view.ui.add(print, "top-right");

                         this.view.ui.add([baseMapGalleryExpand,screenshotDiv], {
                            position: 'top-right',
                        });

    });

    } catch (error) {
      console.error('EsriLoader: ', error);
    }
  }


  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  async addPoints(inputPoints: Coordinates[]=[] ): Promise<void> {


    const [
        // eslint-disable-next-line @typescript-eslint/naming-convention
        Map,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        MapView,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        Graphic,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        GraphicsLayer,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        MapImageLayer
      ] = await loadModules([
        'esri/Map',
        'esri/views/MapView',
        'esri/Graphic',
        'esri/layers/GraphicsLayer',
        'esri/layers/MapImageLayer'
      ]);

      this.view.graphics.removeAll();
        if(inputPoints.length>0){

        const x=inputPoints[0].longitude;
        const y=inputPoints[0].latitude;
        this.view.center = [x,y];
        inputPoints.forEach((inputPoint: Coordinates)=>{

            const point = { //Create a point
                type: 'point',
                longitude : inputPoint.longitude,
                latitude: inputPoint.latitude
            };
            const pointGraphic = new Graphic({
                geometry: point,
                symbol: this.simpleMarkerSymbol
            });
            this.view.graphics.addMany([pointGraphic]);
        });
    }
  }



  async downloadPDF(): Promise<void>{

    const _districtResource: DistrictResource= await this._commonService.getDistrictResource(this.landRecord.ubigeo).toPromise();
    


    const doc = new jsPDF();
    const data: any = document.getElementById('divDownloadPDF');
    const options = {
        background: 'white',
        scale: 3
      };

      autoTable(doc, {
        body: [
          [{ content: 'FICHA DE PREDIO - CATASTRO FISCAL', colSpan: 2, styles: { halign: 'center' } },
        
        ],
        //`${l.urlBase}/${l.idServer}`
        [  { content: `MUNICIPALIDAD DE ${_districtResource.name} UBIGEO  ${this.landRecord.ubigeo}`, colSpan: 2, styles: { halign: 'center' } }],

        [  { content: `Fecha ${moment().format("DD/MM/YYYY")}` }, { content: `Usuario ${this.user.name}` }],

        [{ content: `Código Predial Único: ${this.landRecord.cup}` , colSpan: 2}],
        [{ content: `Código de Predio Municipal: ${this.landRecord.cpm}` , colSpan: 2}],
       [ { content: `Identificador geográfico: ${this.landRecord.municipalNumber }` , colSpan: 2}],
       [ { content: `Contribuyente: ${this.landOwner?.name} ${this.landOwner?.paternalSurname} ${this.landOwner?.maternalSurname}` , colSpan: 2}],
       [ { content: `RUC / DNI: ${this.landOwner?.dni }` , colSpan: 2}],
        [{ content: `Área terreno: ${ this.landRecord?.landArea } mt2  ` , colSpan: 2}],
       [ { content: `Área Construida:  mt2` , colSpan: 2},]
       //landOwner?.name + ' ' + landOwner?.paternalSurname + ' ' + landOwner?.maternalSurname 
        ],


      })


    const  screenshot=await  this.view.takeScreenshot({
      format: "jpg",
      quality: 100,
      
    })
    doc.addImage(screenshot.dataUrl, 'JPEG', 35, 100,135 , 75);
 
    

      doc.save('documneto.pdf');

     



    }





  takeFhoto(): void{

    this.view.takeScreenshot().then((screenshot)=> {
        const imageElement: any = document.getElementById('screenshotImage');
        console.log('screenshot.dataUrl>>',screenshot.dataUrl);
        imageElement.src = screenshot.dataUrl;
    });
    }


}
