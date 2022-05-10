

import { Coordinates } from '../../maps.type';
import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { loadModules } from 'esri-loader';
@Component({
  selector: 'app-show-map-point',
  templateUrl: './show-map-point.component.html',
  styleUrls: ['./show-map-point.component.scss']
})
export class ShowMapPointComponent implements OnInit,AfterViewInit {
    @Input() points: Coordinates[]=[{latitude: -13.53063, longitude: -71.955921},{latitude: -13.54, longitude: -71.955921}];
    @ViewChild('mapViewNode', { static: true }) private mapViewEl: ElementRef;
    title = 'Gestor Cartográfico';
    view: any = null;
    map: any;


  constructor() { }

  ngOnInit(): void {
    console.log(this.points);
  }

  ngAfterViewInit(): void {
    //this.points=[{latitude: -13.53063, longitude: -71.955921}] ;
    setTimeout(() => {this.initializeMap(this.points); }, 1000);
    }




  async initializeMap(inputPoints: Coordinates[]=[] ): Promise<void> {
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
        MapImageLayer
      ] = await loadModules([
        'esri/Map',
        'esri/views/MapView',
        'esri/Graphic',
        'esri/layers/GraphicsLayer',
        'esri/layers/MapImageLayer'
      ]);

      const mapProperties = {
        basemap: 'streets-vector',
      };

      this.map = new Map(mapProperties);

      const mapViewProperties = {
        container: this.mapViewEl.nativeElement,
        zoom: 15,

        map: this.map,
      };
      this.view = new MapView(mapViewProperties);
      const layer = new MapImageLayer({
        url: 'https://ws.mineco.gob.pe/serverdf/rest/services/Pruebas/CARTO_FISCAL_17/MapServer'
      });
      this.map.add(layer);
/*
      const simpleMarkerSymbol = {
        type: 'simple-marker',
        color: [3, 128, 255],  // Orange
        outline: {
            color: [255, 255, 255], // White
            width: 1
        }
     };
*/
     const simpleMarkerSymbol = {
        type: 'picture-marker',  // autocasts as new PictureMarkerSymbol()
        url: '/assets/images/map/location2.png',
        width: '20px',
        height: '30px'
      };


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
                symbol: simpleMarkerSymbol
            });
            this.view.graphics.addMany([pointGraphic]);
        });
    }


    } catch (error) {
      console.error('EsriLoader: ', error);
    }
  }


}
