/* eslint-disable @typescript-eslint/naming-convention */
import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { loadModules } from 'esri-loader';

@Component({
  selector: 'app-geo-location',
  templateUrl: './geo-location.component.html',
  styleUrls: ['./geo-location.component.scss']
})
export class GeoLocationComponent implements OnInit,AfterViewInit {
    @Input() x: number=  -71.955921;
    @Input() y: number=  -13.53063;
    @ViewChild('mapViewNode', { static: true }) private mapViewEl: ElementRef;
    title = 'Gestor Cartográfico';
    view: any = null;
    map: any;
    points: any[];
  constructor() { }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    this.points=[{latitude: -13.53063, longitude: -71.955921}] ;
    setTimeout(() => {this.initializeMap(this.points); }, 1000);
    }


  async initializeMap(inputPoints: any[]=[] ): Promise<void> {
    try {
      const container = this.mapViewEl.nativeElement;

      const [
        // eslint-disable-next-line @typescript-eslint/naming-convention
        Map,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        MapView,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        Graphic,
        GraphicsLayer,
      ] = await loadModules([
        'esri/Map',
        'esri/views/MapView',
        'esri/Graphic',
        'esri/layers/GraphicsLayer'
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



      const graphicsLayer = new GraphicsLayer();

      const x=inputPoints[0]?.longitude;
      const y=inputPoints[0]?.latitude;
      const point = { //Create a point
        type: 'point',
        longitude : x,
        latitude: y

     };

     const simpleMarkerSymbol = {
        type: 'simple-marker',
        color: [226, 119, 40],  // Orange
        outline: {
            color: [255, 255, 255], // White
            width: 1
        }
     };

     const pointGraphic = new Graphic({
        geometry: point,
        symbol: simpleMarkerSymbol
     });

     this.view.graphics.addMany([pointGraphic]);
     this.view.center = [x,y];



    } catch (error) {
      console.error('EsriLoader: ', error);
    }
  }

}
