import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { DistrictResource } from 'app/core/common/interfaces/common.interface';
import { CommonService } from 'app/core/common/services/common.service';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.types';
import { loadModules } from 'esri-loader';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LandRegistryMapService } from '../../services/land-registry-map.service';
@Component({
  selector: 'app-land-registry-geolocation',
  templateUrl: './land-registry-geolocation.component.html',
  styleUrls: ['./land-registry-geolocation.component.scss']
})

export class LandRegistryGeolocationComponent  implements OnInit,AfterViewInit {
    @Input() x: number=  639476.5456999997;
    @Input() y: number=  9265200.7227;
    @ViewChild('mapViewNode', { static: true }) private mapViewEl: ElementRef;
    title = 'Gestor Cartográfico';
    view: any = null;
    map: any;
    points: any[];
    user: User;
    _unsubscribeAll: Subject<any> = new Subject<any>();

    ubigeo: string= '010101';
    projection: number=32717;
    layersInfo = [
        {
          title: '',
          id: 0,
          idServer:1,
          /*'urlBase:'https://ws.mineco.gob.pe/portaldf/rest/services/VALORIZACION/CARTO_VALORIZACION_17/FeatureServer','*/
          urlBase:'https://ws.mineco.gob.pe/serverdf/rest/services/pruebas/CARTO_FISCAL_17/MapServer',
          order: 0,
          featureLayer: null,
          definitionExpression:'1<>1',
          featureTable:null,
          popupTemplate:null
        },




/*
        {idServer:1,
            title: '',
            id: 0,
            urlBase:
              'https://ws.mineco.gob.pe/serverdf/rest/services/Pruebas/CARTO_FISCAL_18/MapServer',
            order: 0,
            featureLayer: null,
            definitionExpression:'1=1',
            featureTable:null,
            popupTemplate:null
          },
*/

      /*  {  title: '',
            id: 1,
            idServer:1,
            urlBase:
            'https://ws.mineco.gob.pe/serverdf/rest/services/Pruebas/CARTO_FISCAL_19/MapServer',
            order: 1,
            featureLayer: null,
            definitionExpression:'1=1',
            featureTable:null,
            popupTemplate:null
          },*/

        /*{   idServer:0,
            title: 'Distritos',
            id: 4,
            urlBase:
              'https://ws.mineco.gob.pe/serverdf/rest/services/Pruebas/limites_nacional/MapServer',
            order: 2,
            featureLayer: null,
            definitionExpression:'1=1',
            featureTable:null,
            popupTemplate:null
          },*/
    ];

  constructor(private _userService: UserService,private commonService: CommonService ,private landRegistryMapService: LandRegistryMapService) {

    this._userService.user$
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((user: User) => {
        this.user = user;
        this.ubigeo=(this.user.placeScope && this.user.placeScope.ubigeo)?this.user.placeScope.ubigeo:'010101';
        this.commonService.getDistrictResource(this.ubigeo).subscribe((data: DistrictResource)=>{

          console.log('data>>>',data);
          this.projection= parseInt('327'+data.resources[0].utm);
          console.log('this.user>>>',this.projection);
        });
        //console.log('this.user>>>',this.user);
    });


  }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    /*this.points=[{latitude: -13.53063, longitude: -71.955921}] ;*/
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
        // eslint-disable-next-line @typescript-eslint/naming-convention
        GraphicsLayer,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        Search,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        FeatureLayer,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        Point,
        projection,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        SpatialReference
      ] = await loadModules([
        'esri/Map',
        'esri/views/MapView',
        'esri/Graphic',
        'esri/layers/GraphicsLayer',
        'esri/widgets/Search',
        'esri/layers/FeatureLayer',
        'esri/geometry/Point',
        'esri/geometry/projection',
        'esri/geometry/SpatialReference',
      ]);

      const mapProperties = {
        basemap: 'streets-vector',
      };

      this.map = new Map(mapProperties);

      const mapViewProperties = {
        container: this.mapViewEl.nativeElement,
        zoom: 17,

        map: this.map,
      };
      this.view = new MapView(mapViewProperties);



      const graphicsLayer = new GraphicsLayer();
      const simpleMarkerSymbol = {
        type: 'picture-marker',  // autocasts as new PictureMarkerSymbol()
        url: '/assets/images/map/location2.png',
        width: '20px',
        height: '30px',
        yoffset : '15px'
      };

      const simpleMarkerSymbolUndefined = {
        type: 'picture-marker',  // autocasts as new PictureMarkerSymbol()
        url: '/assets/images/map/location_out2.png',
        width: '20px',
        height: '30px',
        yoffset : '15px'
      };

    /* const pointGraphic = new Graphic({
        geometry: point,
        symbol: simpleMarkerSymbol
     });*/
     const searchWidget = new Search({
        view: this.view,
      });
     this.view.ui.add(searchWidget, {
        position: 'top-left',
        index: 1
      });

      this.layersInfo.reverse().map((l) => {
        l.featureLayer = new FeatureLayer(`${l.urlBase}/${l.idServer}`, {
          title: l.title,
          //definitionExpression:l.definitionExpression,
          outFields: ['*'],
          //popupTemplate:popupTemp
        });


        this.map.add(l.featureLayer);
      });


      const cs1 = new SpatialReference({
        wkid: 32717 //PE_GCS_ED_1950
      });

      const outSpatialReference = new SpatialReference({
        wkid: 4326
      });

      const pt = new Point({
        x: 639476.5456999997,
        y: 9265200.7227,
        spatialReference: {
          wkid: 32717
        }
      });


      if (!projection.isLoaded()) {

        await projection.load();
      }
      const ptTrans = projection.project(pt, outSpatialReference);
      console.log('geogtrans>>>');

      this.view.center = [ptTrans.x,ptTrans.y];


      this.view.on('click', (event) => {
        // only include graphics from hurricanesLayer in the hitTest
        this.view.graphics.removeAll();
        this.view.hitTest(event).then((response) => {
          // check if a feature is returned from the hurricanesLayer
          // eslint-disable-next-line max-len

          console.log('results>>>',response.results);
          if (response.results.length && response.results[0]  && response.results[0].graphic && response.results[0].graphic.geometry) {

            const graphic = response.results[0].graphic;

            const latitude=graphic.geometry.latitude;
            const longitude=graphic.geometry.longitude;

            const point = { //Create a point
                type: 'point',
                longitude : longitude,
                latitude: latitude
            };
            const pointGraphic = new Graphic({
                geometry: point,
                symbol: simpleMarkerSymbol
            });

            this.view.graphics.addMany([pointGraphic]);
            
            
            
            // do something with the graphic
          }


          else{
            //wkid=102100;

            this.view.graphics.removeAll();

            const graphic = response.results[0].mapPoint;
            console.log('graphic>>>',graphic);
            const longitude=graphic.longitude;
            const latitude=graphic.latitude;

            const point = { //Create a point
              type: 'point',
              longitude : longitude,
              latitude: latitude
            };
            const pointGraphic = new Graphic({
              geometry: point,
              symbol: simpleMarkerSymbolUndefined
          });
          this.view.graphics.addMany([pointGraphic]);
          }
        });

      });

    } catch (error) {
      console.error('EsriLoader: ', error);
    }
  }
}
