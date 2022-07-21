import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.types';
import { loadModules } from 'esri-loader';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { arcgisToGeoJSON  } from '@esri/arcgis-to-geojson-utils';
import { geojsonToArcGIS } from '@esri/arcgis-to-geojson-utils';
import { MessageProviderService } from 'app/shared/services/message-provider.service';
import { FuseSplashScreenService } from '@fuse/services/splash-screen';
//import * as shpwrite from 'shp-write';
declare let shpwrite: any;
import { saveAs } from 'file-saver';
import * as shp from 'shpjs';

import proj4 from 'proj4';
/*declare var Terraformer : any;*/
import { NgxSpinnerService } from 'ngx-spinner';
import { DistrictResource, Extension } from 'app/core/common/interfaces/common.interface';
import { MapUtils } from 'app/shared/utils/map.utils';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit,AfterViewInit {

    @ViewChild('mapViewNode', { static: true }) private mapViewEl: ElementRef;
    drawerMode: 'side' | 'over';
    title = 'Gestor Cartográfico';
    view: any = null;
    map: any;
    layerList: any;
    visibility = 'hidden';
    featureLayer: any;
    link: any;
    user: User;
    _unsubscribeAll: Subject<any> = new Subject<any>();
    proj4Catalog= 'EPSG';

    proj4DestWkid=32718;
    proj4ScrWkid=4326;
    proj4SrcKey =this.proj4Catalog + ':' + String(this.proj4ScrWkid);
    proj4DestKey=this.proj4Catalog + ':' + String(this.proj4DestWkid);
    reader: any;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    TITLE_DESCARGA= 'Arancel';
    // eslint-disable-next-line @typescript-eslint/naming-convention
    TITLE_CARGA= 'Arancel Carga';
    displayTable ='none';
    layersInfo = [


      {idServer:0,
        title: this.TITLE_DESCARGA + ' Zona 17',
        id: 0,
        urlBase:
          'https://ws.mineco.gob.pe/serverdf/rest/services/VALORIZACION/CARTO_VALORIZACION_17/MapServer',
        order: 0,
        featureLayer: null,
        definitionExpression:'1=1',
        featureTable:null,
        popupTemplate:null,
        projection:32717
      },

      {idServer:1,
        title: this.TITLE_CARGA + ' Zona 17',
        id: 1,
        urlBase:
          'https://ws.mineco.gob.pe/serverdf/rest/services/VALORIZACION/CARTO_VALORIZACION_17/MapServer',
        order: 0,
        featureLayer: null,
        definitionExpression:'1=1',
        featureTable:null,
        popupTemplate:null,
        projection:32717
      },




        {idServer:0,
          title: this.TITLE_DESCARGA + ' Zona 18',
          id: 0,
          urlBase:
            'https://ws.mineco.gob.pe/serverdf/rest/services/VALORIZACION/CARTO_VALORIZACION_18/MapServer',
          order: 0,
          featureLayer: null,
          definitionExpression:'1=1',
          featureTable:null,
          popupTemplate:null,
          projection:32718
        },





        {idServer:1,
            title: this.TITLE_CARGA+ ' Zona 18',
            id: 1,
            urlBase:
              'https://ws.mineco.gob.pe/serverdf/rest/services/VALORIZACION/CARTO_VALORIZACION_18/MapServer',
            order: 0,
            featureLayer: null,
            definitionExpression:'1=1',
            featureTable:null,
            popupTemplate:null,
            projection:32718
          },



        {idServer:0,
          title: this.TITLE_DESCARGA + ' Zona 19',
          id: 1,
          urlBase:
            'https://ws.mineco.gob.pe/serverdf/rest/services/VALORIZACION/CARTO_VALORIZACION_19/MapServer',
          order: 0,
          featureLayer: null,
          definitionExpression:'1=1',
          featureTable:null,
          popupTemplate:null,
          projection:32719
        },

        {idServer:1,
          title: this.TITLE_CARGA + ' Zona 19',
          id: 1,
          urlBase:
            'https://ws.mineco.gob.pe/serverdf/rest/services/VALORIZACION/CARTO_VALORIZACION_19/MapServer',
          order: 0,
          featureLayer: null,
          definitionExpression:'1=1',
          featureTable:null,
          popupTemplate:null,
          projection:32719
        },


/*

        {   idServer:7,
            title: 'Sectores',
            id: 3,
            urlBase:
              'https://ws.mineco.gob.pe/serverdf/rest/services/Pruebas/CARTO_FISCAL_19/MapServer',
            order: 1,
            featureLayer: null,
            definitionExpression:'1=1',
            featureTable:null,
            popupTemplate:null

            https://ws.mineco.gob.pe/serverdf/rest/services/pruebas/CARTO_TEMATICA_INEI/MapServer/6
          },*/
        {   idServer:7,
            title: 'Distritos',
            id: 4,
            urlBase:
              'https://ws.mineco.gob.pe/serverdf/rest/services/pruebas/CARTO_TEMATICA_INEI/MapServer',
            order: 2,
            featureLayer: null,
            definitionExpression:'1=1',
            featureTable:null,
            popupTemplate:null
          },
    ];

    mzsSeleccion =  {
    type: 'simple-fill',  // autocasts as new SimpleFillSymbol()
    //color: "green",
    outline: {  // autocasts as new SimpleLineSymbol()
      color: 'green',
      width: '3px'
      }
    };

    mzsNotSeleccion =  {
      type: 'simple-fill',  // autocasts as new SimpleFillSymbol()
      //color: "green",
      outline: {  // autocasts as new SimpleLineSymbol()
        color: 'red',
        width: '1px'
      }
    };

    /*rendererUniqueValue = {
      type: 'unique-value',
      field: 'EST_NOMBRE',

      uniqueValueInfos: [
        {
          value: 'ABIERTO',
          symbol: this.markerSymbolAbierto,
        },
        { value: 'CERRADO', symbol: this.markerSymbolCerrado },
      ],
      legendOptions: { title: 'Estado' },
    };*/
    where ='';
    nameZip='';
    constructor(
        protected _ngxSpinner: NgxSpinnerService,
        private _userService: UserService,
        protected _messageProviderService: MessageProviderService,
        protected _fuseSplashScreenService: FuseSplashScreenService
        ) {
            this._userService.user$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((user: User) => {
                this.user = user;
                // Mark for check
                /*this._changeDetectorRef.markForCheck();
            */
            });


        }



    ngAfterViewInit(): void {
        this._fuseSplashScreenService.show(0);
        setTimeout(() => { this.initializeMap(); }, 1000);

    }

    ngOnInit(): void {

    }
    /* eslint-disable @typescript-eslint/naming-convention */
    async initializeMap(): Promise<void> {
      try {
        const container = this.mapViewEl.nativeElement;
        const [
          Map,
          MapView,
          BasemapGallery,
          Track,
          GraphicsLayer,
          Locate,
          Graphic,
          Expand,
          FeatureLayer,
          LayerList,
          Legend,
          MapImageLayer,
          Query,
          Draw,
          projection,
          SpatialReference,
          Point,
          Search,
          FeatureTable,
          Popup
        ] = await loadModules([
          'esri/Map',
          'esri/views/MapView',
          'esri/widgets/BasemapGallery',
          'esri/widgets/Track',
          'esri/layers/GraphicsLayer',
          'esri/widgets/Locate',
          'esri/Graphic',
          'esri/widgets/Expand',
          'esri/layers/FeatureLayer',
          'esri/widgets/LayerList',
          'esri/widgets/Legend',
          'esri/layers/MapImageLayer',
          'esri/tasks/support/Query',
          'esri/views/draw/Draw',
          'esri/geometry/projection',
          'esri/geometry/SpatialReference',
          'esri/geometry/Point',
          'esri/widgets/Search',
          'esri/widgets/FeatureTable',
          'esri/widgets/Popup'
        ]);
        /* eslint-enable @typescript-eslint/naming-convention */

        const mapProperties = {
          basemap: 'streets-vector',
        };

        this.map = new Map(mapProperties);

        const mapViewProperties = {
          container: this.mapViewEl.nativeElement,
          zoom: 13,
          center: [-71.955921, -13.53063],
          map: this.map,
        };

        this.view = new MapView(mapViewProperties);


        this.layerList = new LayerList({
          view: this.view,

        });

        const basemapGallery = new BasemapGallery({
          view: this.view,
        });

        const searchWidget = new Search({
          view: this.view,
        });

        const filterElement = document.getElementById(
          'filterElement'
        );


        const incidenteSearchExpand = new Expand({
          view: this.view,
          content: filterElement,
          expandIconClass: 'esri-icon-globe',
          id: 'ubigeoSearch'
        });


        const baseMapGalleryExpand = new Expand({
          view: this.view,
          content: basemapGallery,
          id: 'mapGalleryBase'
        });

        const layerListExpand = new Expand({
          view: this.view,
          content: this.layerList,
          id: 'maplayerList'
        });

        const loadElement = document.getElementById('loadElement');
        this.view.ui.add(searchWidget, {
          position: 'top-left',
          index: 2
        });

        this.view.ui.add(incidenteSearchExpand, {
          position: 'top-left',
        });
        this.view.ui.add(baseMapGalleryExpand, {
          position: 'top-right',
        });


        this.view.ui.remove('zoom'); // Remover el boton Zoom;


        const fieldInfos=[
          {
              fieldName: 'ID_ARAN',
              label: 'ID_ARAN',
            },

            {
              fieldName: 'UBIGEO',
              label: 'UBIGEO',
            },

            {
              fieldName: 'COD_SECT',
              label: 'COD_SECT',
            },

            {
              fieldName: 'COD_MZN',
              label: 'COD_MZN',
            },
            {
              fieldName: 'FREN_MZN',
              label: 'FREN_MZN',
            },

            {
              fieldName: 'COD_FREN',
              label: 'COD_FREN',
            },

            {
              fieldName: 'COD_VIA',
              label: 'COD_VIA',
            },
            {
              fieldName: 'TIP_VIA',
              label: 'TIP_VIA',
            },

            {
              fieldName: 'NOM_VIA',
              label: 'NOM_VIA',
            },

            {
              fieldName: 'CUADRA',
              label: 'CUADRA',
            },

            {
              fieldName: 'VAL_ACT',
              label: 'VAL_ACT',
            },
            {
              fieldName: 'FUENTE',
              label: 'FUENTE',
            },

        ];
        const fieldConfigs = fieldInfos.map((e: any)=> ({ name:e.fieldName,label:e.label}));

        const popupTemp = {

          title: 'Arancel',
          content: [
            {
              type: 'fields',
              fieldInfos: fieldInfos,
            },
          ],
        };

       this.layersInfo.reverse().map((l) => {
          l.featureLayer = new FeatureLayer(`${l.urlBase}/${l.idServer}`, {
            title: l.title,
            definitionExpression:l.definitionExpression,
            outFields: ['*'],
            //popupTemplate:popupTemp
          });

          if([0,1].includes(l.id)){
            popupTemp.title = l.title;
            l.featureLayer.popupTemplate=popupTemp;
            const featureTable = new FeatureTable({
                layer: l.featureLayer,
                multiSortEnabled: true,
               /* visibleElements: { selectionColumn: false },*/
                fieldConfigs: fieldConfigs,
                container:document.getElementById('tableDiv')
            });
          }
          this.map.add(l.featureLayer);
        });


        this.view.when(() => {
          this.visibility = 'visible';

          this._fuseSplashScreenService.hide();

          const params ={
            district:'150101',
            namedistrict:'LIMA'
          };

          this.buscar(params);
      });



     /* const layer = this.layersInfo.find(e=> e.title===this.TITLE_DESCARGA).featureLayer;*/

      const searchElement = document.getElementById(
          'searchElement'
        );

        const searchExpand = new Expand({
          view: this.view,
          content: searchElement,
          declaredClass: 'search',
        });



        this.view.ui.add(layerListExpand, {
          position: 'top-right',
        });

        /*return this.view;*/
      } catch (error) {
        console.error('EsriLoader: ', error);
      }
    }
     /* eslint-enable @typescript-eslint/naming-convention */




async    zoomToUbigeo(where: string): Promise<any> {
  try {

        console.log('where>>',where);
      const layerDistrito = this.layersInfo.find(e=> e.title==='Distritos').featureLayer;


      this._fuseSplashScreenService.show(0);
      MapUtils.zoomToFeature(this.view,layerDistrito,where);

      this._fuseSplashScreenService.hide();
/*
         const query = this.featureLayer.createQuery();
          query.where = where;
          query.outSpatialReference = this.view.spatialReference;

          this.featureLayer.queryExtent(query).then( (response) => {
              this._fuseSplashScreenService.hide();
            this.view.goTo(response.extent ).catch( (error)=> {
               //console.error(error);

            });
          });*/


  }
      catch (error) {
          console.error('EsriLoader: ', error);
        }


}


buscar(params: any): void{

console.log('params',params);
  const ubigeo=params.district;
  this.where = `UBIGEO='${ubigeo}'`;
  /*this.nameZip = `${params.namedistrict}.zip`;*/
  this.zoomToUbigeo(this.where);
  this.layersInfo.forEach(l=>{
    const featureLayer= l.featureLayer;
    featureLayer.definitionExpression = this.where;
  });

  /*const layer1 = this.layersInfo.find(e=> e.title.includes(this.TITLE_DESCARGA)).featureLayer;
  const layer2 = this.layersInfo.find(e=> e.title.includes(this.TITLE_CARGA)).featureLayer;
  layer1.definitionExpression = this.where;
  layer2.definitionExpression = this.where;*/


}

async descargar(params: any): Promise<void>{
  /*console.log(params);*/
  this.proj4DestWkid=params.projection;
  this.proj4SrcKey =this.proj4Catalog + ':' + String(this.proj4ScrWkid);
  this.nameZip =`${params.namedistrict}.zip`;
  const options = {
      types: {
          'point': 'points',
          'polygon': 'polygons',
          'polyline': 'polylines',
          'line': 'lines'
      },
      wkt :4326
  };
  /*console.log(this.layersInfo.find(e=> e.title.includes( this.TITLE_DESCARGA) && e.projection===params.projection ));*/
  const featureLayer = this.layersInfo.find(e=> e.idServer===0 && e.projection===params.projection ).featureLayer;
  console.log('this.featureLayer>>>',featureLayer);
  const query = featureLayer.createQuery();
  const ubigeo=params.district;
   /*query.outSpatialReference = 4326;*/
   query.where =`UBIGEO='${ubigeo}'`;

   query.outSpatialReference = 4326;
   //query.outFields = '*';
   query.returnGeometry = true;
   //query.returnDistinctValues = true;
   const features = await MapUtils.queryFeaturesInLayer(featureLayer,query);
   console.log('features>>',features);
   this._fuseSplashScreenService.show(0);
   this.createGeoJSON(features).then((data)=>{
    shpwrite.zip(data, options).then((content) =>{

            saveAs(content, this.nameZip);
            this._fuseSplashScreenService.hide();
      });
  });


/*
   featureLayer.queryFeatures(query).then( (response) => {

    const features: any[] = response.features;


    console.log('features>>>',features);
    this.createGeoJSON(features).then((data)=>{
      shpwrite.zip(data, options).then((content) =>{

              saveAs(content, this.nameZip);
        });
    });
   });*/
}

downloadFile(content, mimeType, fileName, useBlob): any{
  mimeType = mimeType || 'application/octet-stream';
  const url = null;
  const dataURI = 'data:' + mimeType + ',' + content;
  this.link = document.createElement('a');
  const blob = new Blob([content], {
      'type': mimeType
  });


const a = document.createElement('a');
const objectUrl = URL.createObjectURL(blob);
a.href = objectUrl;
a.download = 'archive.zip';
a.click();

  window.focus();

}

async createGeoJSON(features: any[]): Promise<any>{
if(features.length<1){
  return null;
}

const geojson = {
  type: 'FeatureCollection',
  features: [],

};
const type= 'shapefile';
let featureID = 1;

features.forEach((feature)=>{
  const attr = feature.attributes;
  if (typeof attr.feature === 'object') {
    delete attr.feature;
  }
  // eslint-disable-next-line guard-for-in
  for (const key in attr) {
    //console.log(key);
    /*if (!attr[key] || key.includes('.') ) {
        delete attr[key];
    }*/

    if ( key.includes('.') ) {
      delete attr[key];
  }
  }

  if (feature.geometry) {

      const geoFeature = arcgisToGeoJSON(feature);


    const geom = geoFeature.geometry;
    // split multi-polygon/linestrings geojson into multiple single polygons/linstrings
    if ((type === 'shapefile') && (geom.type === 'MultiPolygon' || geom.type === 'MultiLineString')) {
        const props = feature.properties;
        for (let i = 0, len = geom.coordinates.length; i < len; i++) {
            const feat = {
                geometry: {
                    type: geom.type.replace('Multi', ''),
                    coordinates: geom.coordinates[i]
                },
                id: featureID++,
                properties: props,
                type: 'Feature'
            };
            geojson.features.push(feat);
        }

        // not a multi-polygon, so just push it
    } else {
       geoFeature.id = featureID++;
        geojson.features.push(geoFeature);
    }

} else {
    /*topic.publish('viewer/handleError', 'feature has no geometry');*/
}




});

return geojson;
}
/*/FeatureServer/0*/
async createArcgisJSON(features: any[]): Promise<any[]>{
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

  const outSpatialReference= new SpatialReference(this.proj4DestWkid);
  return projection.load().then(()=>{
    features.forEach((feature)=>{
      const attr = feature.properties;

      for (const key in attr) {
        if (!attr[key] || key ==='OBJECTID' ) {
            delete attr[key];
        }
      }

      if (feature.geometry) {

          const geoFeature = geojsonToArcGIS(feature);
          const newGeometry = projection.project(geoFeature.geometry, outSpatialReference);
          geoFeature.geometry= {paths:newGeometry.paths, spatialReference:{wkid: newGeometry.spatialReference.wkid}};
          arcgisJson.push(geoFeature);



    }


    });
    return Promise.all(arcgisJson);
  //  return arcgisJson;
  });


  //return arcgisJson;

};
  cargar(params: any): void{
      /*console.log(params);*/
      const file = params;
      const reader = new FileReader();
      this._fuseSplashScreenService.show(0);
      reader.onloadend = (e): void => {
          //console.log(reader.result);
          this.shapeToGeoJson(reader.result);
          //this.fileString = reader.result as string;
       };
      /*reader.readAsArrayBuffer(file);*/
  }

   shapeToGeoJson(data: any): void{

      shp(data).then((geojson: any) =>{
          this.createArcgisJSON(geojson.features).then((json)=>{
            const layerInfo = this.layersInfo.find(e=> e.title.includes(this.TITLE_CARGA));

            const  url=`${layerInfo.urlBase}/${layerInfo.id}/addFeatures`.replace('MapServer','FeatureServer');
            const body ={features:json};

            const formData = new FormData();
            formData.append('features', JSON.stringify(json));

            fetch(`${url}`, {
              method: 'POST',
              body: formData
          }).then((resObj) => {
                  this._fuseSplashScreenService.hide();
                  this._messageProviderService.showSnack('Registrados cargados correctamente');
              })
              .catch((error) => {
                  this._messageProviderService.showSnackError('Registrados no cargados');
              });

          });



        });

  }


  async projectGeometry(geometry: any): Promise<any> {


    const [

      // eslint-disable-next-line @typescript-eslint/naming-convention
      SpatialReference,
       // eslint-disable-next-line @typescript-eslint/naming-convention
       Point
    ] = await loadModules([

      'esri/geometry/SpatialReference',
      'esri/geometry/Point',
    ]);

    let pt = null;
        let newPt = null;
    let type ='point';
        if (geometry.paths || geometry.rings) {
          type ='polyline';

        }
    switch (type) {
    case 'point':
        newPt = this.projectPoint(geometry);
        geometry = new Point({
            x: newPt.x,
            y: newPt.y,
            spatialReference: new SpatialReference(this.proj4DestWkid)
        });
        break;

    case 'polyline':
    case 'polygon':
        const paths = geometry.paths || geometry.rings;
        const len = paths.length;
        for (let k = 0; k < len; k++) {
            const len2 = paths[k].length;
            for (let j = 0; j < len2; j++) {
                pt = geometry.getPoint(k, j);
                newPt = this.projectPoint(pt);
                geometry.setPoint(k, j, new Point({
                    x: newPt.x,
                    y: newPt.y,
                    spatialReference: new SpatialReference(this.proj4DestWkid)
                }));
            }
        }
        geometry.spatialReference=new SpatialReference(this.proj4DestWkid);
        break;

    default:
        break;
    }

    return geometry;
}


projectPoint(point: any ): any{
 return proj4(proj4.defs[this.proj4SrcKey],proj4.defs[this.proj4DestKey] ).forward(point);
}


}
