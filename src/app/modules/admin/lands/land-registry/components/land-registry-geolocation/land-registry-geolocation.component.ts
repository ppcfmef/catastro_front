import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { DistrictResource } from 'app/core/common/interfaces/common.interface';
import { CommonService } from 'app/core/common/services/common.service';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.types';
import { MapUtils } from 'app/shared/utils/map.utils';
import { loadModules } from 'esri-loader';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GestionPredios } from '../../interfaces/gestion-predios.interface';
import { LandMapIn } from '../../interfaces/land-map-in.interface';
import { LandRegistryMap } from '../../interfaces/land-registry-map.interface';
import { LandMapInModel, LandModel } from '../../models/land-map-in.model';
import { LandRegistryMapModel } from '../../models/land-registry-map.model';
import { LandRegistryMapService } from '../../services/land-registry-map.service';

import { arcgisToGeoJSON  } from '@esri/arcgis-to-geojson-utils';
import { geojsonToArcGIS } from '@esri/arcgis-to-geojson-utils';
import { FormUtils } from 'app/shared/utils/form.utils';


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
    /*projection: number=32717;*/
    proj4Catalog= 'EPSG';

    proj4Wkid=32718;
    proj4GestionPrediosWkid=4326;

    /*proj4ScrWkid=4326;*/
    proj4Src =this.proj4Catalog + ':' + String(this.proj4Wkid);
    layerList: any;
    groupLayers=[
        {
            id:0,
            title:'Zona 17',
            children:[0,1,2]
        },

        {
            id:1,
            title:'Zona 18',
            children:[3,4,5]
        },

        {
            id:2,
            title:'Zona 19',
            children:[6,7,8]
        },

    ];


    simpleMarkerSymbol = {
        type: 'picture-marker',  // autocasts as new PictureMarkerSymbol()
        url: '/assets/images/map/location2.png',
        width: '20px',
        height: '30px',
        yoffset : '15px'
      };

    simpleMarkerSymbolUndefined = {
        type: 'picture-marker',  // autocasts as new PictureMarkerSymbol()
        url: '/assets/images/map/location_out2.png',
        width: '20px',
        height: '30px',
        yoffset : '15px'
      };


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
            id: 1,
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
            id: 2,
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
            id: 3,
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
            id: 4,
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
            id: 5,
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
            id: 6,
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
            id: 7,
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
            id: 8,
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
    urlSearchZonaUrbana = 'https://ws.mineco.gob.pe/serverdf/rest/services/pruebas/CARTO_TEMATICA_INEI/MapServer/2';
    urlSearchDirecciones =  'https://ws.mineco.gob.pe/serverdf/rest/services/pruebas/CARTO_TEMATICA_INEI/MapServer/0';
    urlGestionPredios= 'https://ws.mineco.gob.pe/serverdf/rest/services/pruebas/GESTION_DE_PREDIOS/FeatureServer/0/addFeatures';


    urlSearchDistrito = 'https://ws.mineco.gob.pe/serverdf/rest/services/pruebas/CARTO_TEMATICA_INEI/MapServer/7';
    featureZonaUrbana: any;
    featureDistrito: any;
  constructor(private _userService: UserService,private commonService: CommonService ,private _landRegistryMapService: LandRegistryMapService) {

    this._userService.user$
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((user: User) => {
        this.user = user;
        this.ubigeo=(this.user.placeScope && this.user.placeScope.ubigeo)?this.user.placeScope.ubigeo:'010101';
        this.commonService.getDistrictResource(this.ubigeo).subscribe((data: DistrictResource)=>{

          console.log('data>>>',data);
        this.proj4Wkid =  parseInt('327'+data.resources[0].utm);
          /*this.projection= parseInt('327'+data.resources[0].utm);
          console.log('this.user>>>',this.projection);*/
        });
    });

  }

  ngOnInit(): void {

    this._landRegistryMapService.landIn$.pipe(takeUntil(this._unsubscribeAll)).subscribe((data: LandRegistryMap)=>{


        if(  data?.latitude && data?.longitude ){
            this.addPoint(data.latitude,data.longitude,this.simpleMarkerSymbol);
            if(this.view){
                this.view.center= [data.longitude,data.latitude];
                this.view.zoom=19;
            }
        }

        else if(data && data.ubigeo){

            const where=" UBIGEO='"+data.ubigeo+"'";
            setTimeout(() => {this.zoomToUbigeo(where); }, 1000);
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
// eslint-disable-next-line @typescript-eslint/naming-convention
        GroupLayer,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        BasemapGallery,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        MapImageLayer
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
        'esri/layers/GroupLayer',
        'esri/widgets/BasemapGallery',
        'esri/layers/MapImageLayer'

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
      const basemapGallery = new BasemapGallery({
        view: this.view,
      });

      basemapGallery.activeBasemap ='satellite';


      const baseMapGalleryExpand = new Expand({
        view: this.view,
        content: basemapGallery,
        id: 'mapGalleryBase'
      });


      const graphicsLayer = new GraphicsLayer();



      this.view.ui.add(baseMapGalleryExpand, {
        position: 'top-right',
      });


      this.featureZonaUrbana= new FeatureLayer(this.urlSearchZonaUrbana);
      this.featureDistrito= new FeatureLayer(this.urlSearchDistrito);

      const featureDirecciones= new FeatureLayer(this.urlSearchDirecciones);

      const searchWidget = new Search({
        view: this.view,
        sources: [
            {
                layer: this.featureZonaUrbana,
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




        //this.map.add(l.featureLayer);
      });

      this.groupLayers.reverse().map((g) => {
        const fs=g.children.map(c=>   this.layersInfo.find(l=>l.id===c)?.featureLayer );

        const demographicGroupLayer = new GroupLayer({
            title: g.title,
           /* visible: true,*/
            layers: fs,

          });
          this.map.add( demographicGroupLayer);

       /* if (l.title.includes('Via'))
        {   options['labelingInfo'] = [labelClassVias];
        }
        console.log(options);
        l.featureLayer = new FeatureLayer(
          options

        );*/

      });




/*
      const imageLayer1 = new MapImageLayer({
        url:'https://ws.mineco.gob.pe/serverdf/rest/services/pruebas/CARTO_FISCAL_17/MapServer',
        sublayers: [
            {
              id: 0,
              visible: false,
              title: 'Lotes  Zona 17',
            }, {
              id: 1,
              visible: true,
              title: 'Lotes Poligono  Zona 17',
            }, {
              id: 5,
              visible: true,
              title: 'Vias  Zona 17',
            }
          ]
      }

        );
        const imageLayer2 = new MapImageLayer(
            'https://ws.mineco.gob.pe/serverdf/rest/services/pruebas/CARTO_FISCAL_18/MapServer'
            );

      const imageLayer3 = new MapImageLayer(
        'https://ws.mineco.gob.pe/serverdf/rest/services/pruebas/CARTO_FISCAL_19/MapServer'
        );
        this.map.add(imageLayer1);
        this.map.add(imageLayer2);

        this.map.add(imageLayer3);*/
      const cs1 = new SpatialReference({
        wkid: 32717 //PE_GCS_ED_1950
      });


      this.view.on('click',   (event) => {
        // only include graphics from hurricanesLayer in the hitTest

        let graphic = event.mapPoint;
        let longitude=graphic.longitude;
        let latitude=graphic.latitude;


        this.addPoint(latitude,longitude,this.simpleMarkerSymbolUndefined);
        const point = { //Create a point
            type: 'point',
            longitude : longitude,
            latitude: latitude
          };
        const intersect= this.queryIntersectFeaturelayer(this.featureDistrito,point);
        intersect.then( (data: any)=> {

            if(data && data.attributes){

                const ubigeo = data.attributes['UBIGEO'];
                console.log('ubigeo>>',ubigeo);
                const landRegistryMapModel: LandRegistryMapModel = new LandRegistryMapModel();
                landRegistryMapModel.latitude = latitude;
                landRegistryMapModel.longitude = longitude;
                landRegistryMapModel.ubigeo = ubigeo;
                this._landRegistryMapService.landOut=landRegistryMapModel;
                  this.view.hitTest(event).then((response) => {

                    /*console.log('response.results>>>',response.results);*/
                    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                    const results=response.results.filter( (r) =>{ console.log(r , r.graphic , r.graphic.layer,  r.graphic.layer.layerId);
                        if (r && r.graphic && r.graphic.layer&&  r.graphic.layer.layerId===1){ return r;}  });
                    console.log(results);


                    if (results.length >0) {

                      const resultsLen =results.length - 1;

                      if(results[resultsLen ]  && results[resultsLen].graphic && results[resultsLen].graphic.geometry)
{

    graphic = results[resultsLen].graphic;
    //console.log('graphic>>', graphic);

    if(graphic   && graphic.attributes && graphic.attributes['ID_LOTE']  ){
      //  console.log('graphic.attributes>>', graphic.attributes);
latitude=graphic.geometry.latitude;
      longitude=graphic.geometry.longitude;

      latitude=graphic.attributes['COOR_Y'];
      longitude=graphic.attributes['COOR_X'];
      const lote =graphic.attributes;
      const _landRegistryMapModel: LandRegistryMapModel = new LandRegistryMapModel();
      _landRegistryMapModel.loteToLandRegistryMapModel(lote);
      this._landRegistryMapService.landOut=landRegistryMapModel;
      const _gestionPredio=_landRegistryMapModel.getGestionPredios();
      this.addPoint(latitude,longitude,this.simpleMarkerSymbol);
    }
}



                    }
                  });


            }



        });
      });

    } catch (error) {
      console.error('EsriLoader: ', error);
    }
  }

async addPoint(latitude,longitude,symbol): Promise<any>{
    try {
        const [
            // eslint-disable-next-line @typescript-eslint/naming-convention
            Graphic,

          ] = await loadModules([
            'esri/Graphic',
          ]);


        this.view.graphics.removeAll();
        const point = { //Create a point
          type: 'point',
          longitude : longitude,
          latitude: latitude
        };
        const pointGraphic = new Graphic({
          geometry: point,
          symbol:symbol
          /*symbol: this.simpleMarkerSymbolUndefined*/
        });
        this.view.graphics.addMany([pointGraphic]);

    } catch (error) {
        console.error('EsriLoader: ', error);
      }


}


async    zoomToUbigeo(where: string): Promise<any> {
  try {
        console.log('where>>>',where);

        MapUtils.zoomToFeature(this.view,this.featureZonaUrbana,where);
         /*const query = this.featureDistrito.createQuery();
          query.where = where;
          query.outSpatialReference = this.view.spatialReference;

          this.featureDistrito.queryExtent(query).then( (response) => {
            this.view.goTo(response.extent).catch( (error)=> {
               console.error(error);

            });
          });*/


  }
      catch (error) {
          console.error('EsriLoader: ', error);
}

}

//async saveGestionPredios(_landRegistryMap: LandRegistryMap): Promise<void>{

    async saveGestionPredios(_gestionPredios: GestionPredios): Promise<void>{
    if (_gestionPredios.ID_LOTE)
    {
        /*const _landRegistryMapModel = new LandRegistryMapModel(_landRegistryMap);
        const _gestionPredios: GestionPredios=_landRegistryMapModel.getGestionPredios();*/
        const json= await this.createArcgisJSON([_gestionPredios]);
        console.log('json>>>',json);
        const formData = new FormData();
        formData.append('features', JSON.stringify(json));


        fetch(`${this.urlGestionPredios}`, {
            method: 'POST',
            body: formData
        }).then((resObj) => {
                /*this._fuseSplashScreenService.hide();
                this._messageProviderService.showSnack('Registrados cargados correctamente');*/
                 })
            .catch((error) => {
                /*this._messageProviderService.showSnackError('Registrados no cargados');*/
        });

    }
}


/*/FeatureServer/0*/
async createArcgisJSON(features: GestionPredios[]): Promise<any[]>{
    const arcgisJson =[];
    /* eslint-disable @typescript-eslint/naming-convention */
    const [
      Graphic,
      Polyline,
      projection,
      SpatialReference,
    ] = await loadModules([

      'esri/Graphic',
      'esri/geometry/Polyline',
      'esri/geometry/projection',
      'esri/geometry/SpatialReference',
    ]);
    /* eslint-enable @typescript-eslint/naming-convention */
    const outSpatialReference= new SpatialReference(this.proj4GestionPrediosWkid);

    return projection.load().then(()=>{
      features.forEach((feature: GestionPredios)=>{

            const geometry = {
                x: feature.COOR_X,
                y: feature.COOR_Y
            };

            const attributes=FormUtils.deleteKeysNullInObject(feature);
            const geoFeature={
                geometry,
                attributes
            };
            arcgisJson.push(geoFeature);


      });
      return Promise.all(arcgisJson);
    });
  };



    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    async queryIntersectFeaturelayer(layer: any, geometry: any) {

    const parcelQuery = {
     spatialRelationship: 'intersects', // Relationship operation to apply
     geometry: geometry,  // The sketch feature geometry
     returnGeometry: true,
     outFields: ['UBIGEO'],
    };



    const results= await layer.queryFeatures(parcelQuery);
    let feature={};
    if(results.features && results.features.length>0)
        {feature=results.features[0];}
    return feature;
     //return results.features ;

    /*console.log('result>>',result);*/

  }



}
