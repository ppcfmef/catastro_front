import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonService } from 'app/core/common/services/common.service';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.types';
import { loadModules } from 'esri-loader';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { arcgisToGeoJSON  } from '@esri/arcgis-to-geojson-utils';
import { geojsonToArcGIS } from '@esri/arcgis-to-geojson-utils';
import { MessageProviderService } from 'app/shared/services/message-provider.service';
//import * as shpwrite from 'shp-write';
declare let shpwrite: any;
import { saveAs } from 'file-saver';
import * as shp from 'shpjs';

import proj4 from 'proj4';
/*declare var Terraformer : any;*/
import { NgxSpinnerService } from 'ngx-spinner';
import { DistrictResource, Extension } from 'app/core/common/interfaces/common.interface';

@Component({
  selector: 'app-valuation',
  templateUrl: './valuation.component.html',
  styleUrls: ['./valuation.component.scss']
})


export class ValuationComponent implements OnInit,AfterViewInit {
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
          title: this.TITLE_DESCARGA,
          id: 0,
          urlBase:
            'https://ws.mineco.gob.pe/serverdf/rest/services/VALORIZACION/CARTO_VALORIZACION_18/MapServer',
          order: 0,
          featureLayer: null,
          definitionExpression:'1<>1',
          featureTable:null,
          popupTemplate:null
        },


        {idServer:1,
            title: this.TITLE_CARGA,
            id: 1,
            urlBase:
              'https://ws.mineco.gob.pe/serverdf/rest/services/VALORIZACION/CARTO_VALORIZACION_18/MapServer',
            order: 0,
            featureLayer: null,
            definitionExpression:'1<>1',
            featureTable:null,
            popupTemplate:null
          },


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
          },
        {   idServer:0,
            title: 'Distritos',
            id: 4,
            urlBase:
              'https://ws.mineco.gob.pe/serverdf/rest/services/Pruebas/limites_nacional/MapServer',
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
        protected _messageProviderService: MessageProviderService
        ) {
            this._userService.user$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((user: User) => {
                this.user = user;
                console.log('user',this.user);
                // Mark for check
                /*this._changeDetectorRef.markForCheck();
            */
            });


        }



    ngAfterViewInit(): void {
        this._ngxSpinner.show();
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

          });

          const baseMapGalleryExpand = new Expand({
            view: this.view,
            content: basemapGallery,
          });

          const layerListExpand = new Expand({
            view: this.view,
            content: this.layerList,
          });

          const loadElement = document.getElementById('loadElement');
          this.view.ui.add(searchWidget, {
            position: 'top-right',
            index: 2
          });

          this.view.ui.add(incidenteSearchExpand, 'top-left');
          this.view.ui.add(baseMapGalleryExpand, {
            position: 'top-right',
          });
          const query ='UBIGEO=\'150101\' ';
          this.zoomToUbigeo(query);



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
              console.log(l.id);
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

            this._ngxSpinner.hide();
        });



        const layer = this.layersInfo.find(e=> e.title===this.TITLE_DESCARGA).featureLayer;

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




  async    zoomToUbigeo(where: string,extent: Extension=null): Promise<any> {
    try {


        const [
            // eslint-disable-next-line @typescript-eslint/naming-convention
            Extent
          ] = await loadModules([
            'esri/geometry/Extent'
          ]);
        // eslint-disable-next-line @typescript-eslint/naming-convention
        console.log('where>>>',where,extent);

        this.featureLayer = this.layersInfo.find(e=> e.title==='Distritos').featureLayer;


        this._ngxSpinner.show();


        if (!extent){

            const query = this.featureLayer.createQuery();
            query.where = where;
            query.outSpatialReference = this.view.spatialReference;

            this.featureLayer.queryExtent(query).then( (response) => {
                this._ngxSpinner.hide();
              this.view.goTo(response.extent ).catch( (error)=> {
                  });
            });



        }

        else{

const newExtent =  new Extent({
    xmin:parseFloat(extent.xMin),
    ymin:parseFloat(extent.yMin),
    xmax:parseFloat(extent.xMax),
    ymax:parseFloat(extent.yMax),
    spatialReference: {
        wkid: 4326
 }
});

console.log('extent>>',newExtent);
this.view.extent = newExtent;
this._ngxSpinner.hide();

        }
    }
        catch (error) {
            console.error('EsriLoader: ', error);
          }


}


buscar(params: DistrictResource): void{
console.log('params>>',params);

    const ubigeo=params.code;
    this.where = `UBIGEO='${ubigeo}'`;
    this.nameZip = `${params.name}.zip`;
    this.zoomToUbigeo(this.where,params.extensions[0]);

    const layer1 = this.layersInfo.find(e=> e.title===this.TITLE_DESCARGA).featureLayer;
    /*this.layersInfo.find(e=> e.title===this.TITLE_DESCARGA).urlBase = params.;*/
    /*const layer1 = this.layersInfo.find(e=> e.title===this.TITLE_DESCARGA).featureLayer;*/
    const layer2 = this.layersInfo.find(e=> e.title===this.TITLE_CARGA).featureLayer;
    layer1.definitionExpression = this.where;
    layer2.definitionExpression = this.where;


}

 descargar(params: DistrictResource): void{
    //console.log(params);


    const options = {
        types: {
            'point': 'points',
            'polygon': 'polygons',
            'polyline': 'polylines',
            'line': 'lines'
        },
        wkt :4326
    };





    this.featureLayer = this.layersInfo.find(e=> e.title===this.TITLE_DESCARGA).featureLayer;

    const query = this.featureLayer.createQuery();

     query.outSpatialReference = 4326;
     query.where =this.where;


     this.featureLayer.queryFeatures(query).then( (response) => {

      const features: any[] = response.features;
      /*console.log('features>>>',features);*/
      this.createGeoJSON(features).then((data)=>{
        console.log('data>>>',data);
        shpwrite.zip(data, options).then((content) =>{

                saveAs(content, this.nameZip);
          });




      });




     });










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
            console.log('geoFeature>>>',geoFeature);
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
        this._ngxSpinner.show();
        reader.onloadend = (e): void => {
            //console.log(reader.result);
            this.shapeToGeoJson(reader.result);
            //this.fileString = reader.result as string;
         };
        reader.readAsArrayBuffer(file);
    }

     shapeToGeoJson(data: any): void{

        shp(data).then((geojson: any) =>{
            console.log(geojson.features);
            this.createArcgisJSON(geojson.features).then((json)=>{
              console.log('json>>>',json);
              const layerInfo = this.layersInfo.find(e=> e.title===this.TITLE_CARGA);

              const  url=`${layerInfo.urlBase}/${layerInfo.id}/addFeatures`.replace('MapServer','FeatureServer');
              const body ={features:json};

              const formData = new FormData();
              formData.append('features', JSON.stringify(json));

              fetch(`${url}`, {
                method: 'POST',
                body: formData
            }).then((resObj) => {
                    console.log(resObj);
                    this._ngxSpinner.hide();
                    this._messageProviderService.showSnack('Registrados cargados correctamente');
                })
                .catch((error) => {
                    this._messageProviderService.showSnackError('Registrados no cargados');
                    console.log('UPLOAD ERROR', error);
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
          console.log('geometry>>>',geometry);
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
    console.log('point>>>',point);
   return proj4(proj4.defs[this.proj4SrcKey],proj4.defs[this.proj4DestKey] ).forward(point);
  }


}
