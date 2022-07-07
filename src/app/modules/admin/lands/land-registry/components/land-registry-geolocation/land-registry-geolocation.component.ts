import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { DistrictResource } from 'app/core/common/interfaces/common.interface';
import { CommonService } from 'app/core/common/services/common.service';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.types';
import { loadModules } from 'esri-loader';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LandMapIn } from '../../interfaces/land-map-in.interface';
import { LandMapInModel, LandModel } from '../../models/land-map-in.model';
import { LandRegistryMapModel } from '../../models/land-registry-map.model';
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
    layerList: any;
    layersInfo = [
        {
          title: 'Lotes Zona 17',
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

        {
            title: 'Lotes Poligono Zona 17',
            id: 0,
            idServer:5,
            /*'urlBase:'https://ws.mineco.gob.pe/portaldf/rest/services/VALORIZACION/CARTO_VALORIZACION_17/FeatureServer','*/
            urlBase:'https://ws.mineco.gob.pe/serverdf/rest/services/pruebas/CARTO_FISCAL_17/MapServer',
            order: 0,
            featureLayer: null,
            definitionExpression:'1<>1',
            featureTable:null,
            popupTemplate:null
          },


          {
            title: 'Via Zona 17',
            id: 0,
            idServer:2,

            urlBase:'https://ws.mineco.gob.pe/serverdf/rest/services/pruebas/CARTO_FISCAL_17/MapServer',
            order: 0,
            featureLayer: null,
            definitionExpression:'1<>1',
            featureTable:null,
            popupTemplate:null
          },

        {
            title: 'Lotes Zona 18',
            id: 0,
            idServer:1,
            /*'urlBase:'https://ws.mineco.gob.pe/portaldf/rest/services/VALORIZACION/CARTO_VALORIZACION_17/FeatureServer','*/
            urlBase:'https://ws.mineco.gob.pe/serverdf/rest/services/pruebas/CARTO_FISCAL_18/MapServer',
            order: 0,
            featureLayer: null,
            definitionExpression:'1<>1',
            featureTable:null,
            popupTemplate:null
          },

          {
            title: 'Lotes Poligono Zona 18',
            id: 0,
            idServer:5,
            /*'urlBase:'https://ws.mineco.gob.pe/portaldf/rest/services/VALORIZACION/CARTO_VALORIZACION_17/FeatureServer','*/
            urlBase:'https://ws.mineco.gob.pe/serverdf/rest/services/pruebas/CARTO_FISCAL_18/MapServer',
            order: 0,
            featureLayer: null,
            definitionExpression:'1<>1',
            featureTable:null,
            popupTemplate:null
          },

          {
            title: 'Via Zona 18',
            id: 0,
            idServer:2,
            urlBase:'https://ws.mineco.gob.pe/serverdf/rest/services/pruebas/CARTO_FISCAL_18/MapServer',
            order: 0,
            featureLayer: null,
            definitionExpression:'1<>1',
            featureTable:null,
            popupTemplate:null
          },

          {
            title: 'Lotes Zona 19',
            id: 0,
            idServer:1,
            /*'urlBase:'https://ws.mineco.gob.pe/portaldf/rest/services/VALORIZACION/CARTO_VALORIZACION_17/FeatureServer','*/
            urlBase:'https://ws.mineco.gob.pe/serverdf/rest/services/pruebas/CARTO_FISCAL_19/MapServer',
            order: 0,
            featureLayer: null,
            definitionExpression:'1<>1',
            featureTable:null,
            popupTemplate:null
          },


     {
            title: 'Lotes Poligono Zona 19',
            id: 0,
            idServer:5,
            /*'urlBase:'https://ws.mineco.gob.pe/portaldf/rest/services/VALORIZACION/CARTO_VALORIZACION_17/FeatureServer','*/
            urlBase:'https://ws.mineco.gob.pe/serverdf/rest/services/pruebas/CARTO_FISCAL_19/MapServer',
            order: 0,
            featureLayer: null,
            definitionExpression:'1<>1',
            featureTable:null,
            popupTemplate:null
          },

          {
            title: 'Via Zona 19',
            id: 0,
            idServer:2,
            urlBase:'https://ws.mineco.gob.pe/serverdf/rest/services/pruebas/CARTO_FISCAL_19/MapServer',
            order: 0,
            featureLayer: null,
            definitionExpression:'1<>1',
            featureTable:null,
            popupTemplate:null
          },

    ];

    //urlSearchDistrito = 'https://ws.mineco.gob.pe/serverdf/rest/services/pruebas/CARTO_TEMATICA_INEI/MapServer/5';
    urlSearchDistrito = 'https://ws.mineco.gob.pe/serverdf/rest/services/pruebas/CARTO_TEMATICA_INEI/MapServer/2';
    urlSearchDirecciones =  'https://ws.mineco.gob.pe/serverdf/rest/services/pruebas/CARTO_TEMATICA_INEI/MapServer/0';
    featureDistrito: any;



  constructor(private _userService: UserService,private commonService: CommonService ,private _landRegistryMapService: LandRegistryMapService) {

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
    });




  }

  ngOnInit(): void {

    this._landRegistryMapService.landIn$.pipe(takeUntil(this._unsubscribeAll)).subscribe((data: LandMapIn)=>{
               if (data &&  data.land && data.land.ubigeo && !data.land.x,!data.land.y)
        {  const where=" UBIGEO='"+data.land.ubigeo+"'";

        setTimeout(() => {this.zoomToUbigeo(where); }, 1500);

        }
    });

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
        SpatialReference,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        LayerList,
 // eslint-disable-next-line @typescript-eslint/naming-convention
        Expand,
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
        'esri/widgets/LayerList',
        'esri/widgets/Expand',
      ]);

      const mapProperties = {
        basemap: 'streets-vector',
      };

      this.map = new Map(mapProperties);

      const mapViewProperties = {
        container: this.mapViewEl.nativeElement,
        zoom: 17,
        center: [   -71.955921,-13.53063],
        map: this.map,
      };
      this.view = new MapView(mapViewProperties);
      this.layerList = new LayerList({
          view: this.view,
      });


      const layerListExpand = new Expand({
        view: this.view,
        content: this.layerList,
        id: 'maplayerList'
      });
      this.view.ui.add(layerListExpand, {
        position: 'top-right',
      });

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


      this.featureDistrito= new FeatureLayer(this.urlSearchDistrito);
      const featureDirecciones= new FeatureLayer(this.urlSearchDirecciones);
      const searchWidget = new Search({
        view: this.view,
        sources: [
            {
                layer: this.featureDistrito,
                searchFields: ['DISTRITO','UBIGEO'],
                displayField: 'DISTRITO',
                exactMatch: false,
                outFields: ['UBIGEO', 'DISTRITO' ],
                name: 'DISTRITOS',
              },

              {
                layer: featureDirecciones,
                searchFields: ['DIR_MUN'],
                displayField: 'DIR_MUN',
                exactMatch: false,
                outFields: ['DIR_MUN' ],
                name: 'DIRECCIONES',
              },

      ]});

      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      /*searchWidget.goToOverride = (view, goToParams) => {
        console.log('goToParams',goToParams);
        goToParams.scale = 2000;
        return view.goTo(goToParams.target, goToParams.options);
      };*/
      searchWidget.on('select-result', (event)=>{
        console.log('The selected search result: ', event);
        this.view.zoom = 16;
      });


      this.view.ui.add(searchWidget, {
        position: 'top-left',
        index: 1
      });



    const labelClassVias = {
        // autocasts as new LabelClass()
        symbol: {
        type: 'text',  // autocasts as new TextSymbol()
        color: 'black',
        font: {  // autocast as new Font()
            family: 'arial',
            size: 8,
            //weight: 'bold'
        }
        },
        labelPlacement: 'above-center',
        labelExpressionInfo: {
        expression: '$feature.TIP_VIA +" "+ $feature.NOM_VIA'
        }
    };

      this.layersInfo.reverse().map((l) => {
        const options = {
            url: `${l.urlBase}/${l.idServer}`,
            title: l.title,
            outFields: ['*']
        };


        if (l.title.includes('Via'))
        {   options['labelingInfo'] = [labelClassVias];
        }
        console.log(options);
        l.featureLayer = new FeatureLayer(
          options

        );


        this.map.add(l.featureLayer);
      });


      const cs1 = new SpatialReference({
        wkid: 32717 //PE_GCS_ED_1950
      });

      /*
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
*/

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

/*
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

            });
            */
            const lote =graphic.attributes;
            const landRegistryMapModel: LandRegistryMapModel = new LandRegistryMapModel();
            landRegistryMapModel.loteToLandRegistryMapModel(lote);
            this._landRegistryMapService.landOut=landRegistryMapModel;

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

          const landRegistryMapModel: LandRegistryMapModel = new LandRegistryMapModel();
          landRegistryMapModel.latitude = latitude;
          landRegistryMapModel.longitude = longitude;
          this._landRegistryMapService.landOut=landRegistryMapModel;

          this.view.graphics.addMany([pointGraphic]);
          }
        });

      });
/*
      const landMapIn = new LandMapInModel();
      landMapIn.land = new LandModel();
      landMapIn.land.ubigeo='010101';
      this._landRegistryMapService.landIn = landMapIn;*/

    } catch (error) {
      console.error('EsriLoader: ', error);
    }
  }


async    zoomToUbigeo(where: string): Promise<any> {
  try {
        console.log('where>>>',where);
         const query = this.featureDistrito.createQuery();
          query.where = where;
          query.outSpatialReference = this.view.spatialReference;

          this.featureDistrito.queryExtent(query).then( (response) => {
            this.view.goTo(response.extent).catch( (error)=> {
               console.error(error);

            });
          });


  }
      catch (error) {
          console.error('EsriLoader: ', error);
        }


}

}
