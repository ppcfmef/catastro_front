

import { Coordinates } from '../../maps.type';
import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild,OnChanges  } from '@angular/core';
import { loadModules } from 'esri-loader';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas'; // Todavía no lo usamos
@Component({
  selector: 'app-show-map-point',
  templateUrl: './show-map-point.component.html',
  styleUrls: ['./show-map-point.component.scss']
})
export class ShowMapPointComponent implements OnInit,AfterViewInit, OnChanges  {
    @Input() points: Coordinates[]=[{latitude: -13.53063, longitude: -71.955921},{latitude: -13.54, longitude: -71.955921}];
    @ViewChild('mapViewNode', { static: true }) private mapViewEl: ElementRef;
    title = 'Gestor Cartográfico';
    view: any = null;
    map: any;


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

  constructor() { }

  ngOnInit(): void {
    console.log(this.points);
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

  downloadPDF(): void{
    const doc = new jsPDF();
    const data: any = document.getElementById('divDownloadPDF');
    const options = {
        background: 'white',
        scale: 3
      };
      html2canvas(data, options).then((canvas) => {

        const img = canvas.toDataURL('image/PNG');

        // Add image Canvas to PDF
        const bufferX = 15;
        const bufferY = 15;
        const imgProps = (doc as any).getImageProperties(img);
        const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
        return doc;
      }).then((docResult) => {
        docResult.save(`${new Date().toISOString()}_tutorial.pdf`);
      });
    }


    //doc.text('Hello world!', 10, 10);
    /*const width = doc.internal.pageSize.getWidth();
    doc.text('Hello JS', 20, 20, { align: 'center' });*/
    //doc.save('hello-world.pdf');



  takeFhoto(): void{

    this.view.takeScreenshot().then((screenshot)=> {
        const imageElement: any = document.getElementById('screenshotImage');
        console.log('screenshot.dataUrl>>',screenshot.dataUrl);
        imageElement.src = screenshot.dataUrl;
    });
    }
}
