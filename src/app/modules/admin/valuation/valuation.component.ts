import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonService } from 'app/core/common/services/common.service';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.types';
import { loadModules } from 'esri-loader';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { arcgisToGeoJSON  } from '@esri/arcgis-to-geojson-utils';
import { geojsonToArcGIS } from '@esri/arcgis-to-geojson-utils';
//import * as shpwrite from 'shp-write';
declare var shpwrite: any;
import { saveAs } from 'file-saver';
import * as shp from 'shpjs';
/*declare var Terraformer : any;*/
/*import { NgxSpinnerService } from 'ngx-spinner';*/

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
    reader: any;
    layersInfo = [
        {
          title: 'Arancel',
          id: 0,
          urlBase:
            'https://ws.mineco.gob.pe/serverdf/rest/services/VALORIZACION/CARTO_VALORIZACION_18/MapServer',
          order: 0,
          featureLayer: null,
          definitionExpression:'1<>1',
        },


        {
            title: 'Arancel Carga',
            id: 1,
            urlBase:
              'https://ws.mineco.gob.pe/serverdf/rest/services/VALORIZACION/CARTO_VALORIZACION_18/MapServer',
            order: 0,
            featureLayer: null,
            definitionExpression:'1=1',
          },


        {
            title: 'Sectores',
            id: 7,
            urlBase:
              'https://ws.mineco.gob.pe/serverdf/rest/services/Pruebas/CARTO_FISCAL_19/MapServer',
            order: 1,
            featureLayer: null,
            definitionExpression:'1=1',
          },
        {
            title: 'Distritos',
            id: 0,
            urlBase:
              'https://ws.mineco.gob.pe/serverdf/rest/services/Pruebas/limites_nacional/MapServer',
            order: 2,
            featureLayer: null,
            definitionExpression:'1=1',
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
    constructor(
        //protected _ngxSpinner: NgxSpinnerService
        private _userService: UserService
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
        setTimeout(() => { this.initializeMap(); }, 1000);

    }

    ngOnInit(): void {

    }


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
            Search
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
            'esri/widgets/Search'
          ]);

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
          const query ='UBIGEO=\'080108\' ';
          this.zoomToUbigeo(query);



         this.layersInfo.reverse().map((l) => {
            l.featureLayer = new FeatureLayer(`${l.urlBase}/${l.id}`, {
              title: l.title,

              definitionExpression:l.definitionExpression,
              //renderer:rendererUniqueValue
            });


            this.map.add(l.featureLayer);
          });

          this.view.when(() => {
            this.visibility = 'visible';
           /* this._ngxSpinner.hide();*/
        });



        const layer = this.layersInfo.find(e=> e.title==='Arancel').featureLayer;

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




  async    zoomToUbigeo(where: string): Promise<any> {
    try {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        console.log('where>>>',where);

        this.featureLayer = this.layersInfo.find(e=> e.title==='Distritos').featureLayer;

        const layer1 = this.layersInfo.find(e=> e.title==='Arancel').featureLayer;
        const layer2 = this.layersInfo.find(e=> e.title==='Arancel Carga').featureLayer;
        /*layer1.definitionExpression = where;*/
        /*layer2.definitionExpression = where;*/


           const query = this.featureLayer.createQuery();
            query.where = where;
            query.outSpatialReference = this.view.spatialReference;

            this.featureLayer.queryExtent(query).then( (response) => {
              this.view.goTo(response.extent ).catch( (error)=> {
                 //console.error(error);

              });
            });


    }
        catch (error) {
            console.error('EsriLoader: ', error);
          }


}


buscar(params: any): void{


    const ubigeo=params.district;
    this.where = `UBIGEO='${ubigeo}'`;

    this.zoomToUbigeo(this.where);
    console.log(this.view.spatialReference);

}

 descargar(params: any): void{
    console.log(params);

    const options = {
        types: {
            'point': 'points',
            'polygon': 'polygons',
            'polyline': 'polylines',
            'line': 'lines'
        },
        wkt :4326
    };









    this.featureLayer = this.layersInfo.find(e=> e.title==='Arancel').featureLayer;

    const query = this.featureLayer.createQuery();

     query.outSpatialReference = 4326;
     query.where =this.where;


     this.featureLayer.queryFeatures(query).then( (response) => {

      const features: any[] = response.features;
      console.log('features>>>',features);
      this.createGeoJSON(features).then((data)=>{

        shpwrite.zip(data, options).then((content) =>{

            //console.log(content);


                saveAs(content, 'result.zip');
          });




      });




     });










}

downloadFile(content, mimeType, fileName, useBlob): any{
    mimeType = mimeType || 'application/octet-stream';
    let url = null;
    let dataURI = 'data:' + mimeType + ',' + content;
    this.link = document.createElement('a');
    let blob = new Blob([content], {
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
    for (const key in attr) {
      if (!attr[key]) {
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
 createArcgisJSON(features: any[]): any[]{
    const arcgisJson =[];
    features.forEach((feature)=>{
        const attr = feature.properties;

        for (const key in attr) {
          if (!attr[key] || key ==='OBJECTID' ) {
              delete attr[key];
          }
        }
        console.log(feature);
        if (feature.geometry) {

            const geoFeature = geojsonToArcGIS(feature);


             arcgisJson.push(geoFeature);


      }


      });

      return arcgisJson;

};
    cargar(params: any): void{
        /*console.log(params);*/
        const file = params;
        const reader = new FileReader();
        reader.onloadend = (e): void => {
            //console.log(reader.result);
            this.shapeToGeoJson(reader.result);
            //this.fileString = reader.result as string;
         };
        reader.readAsArrayBuffer(file);
    }

    shapeToGeoJson(data: any): void{
        shp(data).then((geojson: any) =>{
            //console.log(geojson.features);
            const json=this.createArcgisJSON(geojson.features);
            console.log('json>>>',json);
            const layerInfo = this.layersInfo.find(e=> e.title==='Arancel Carga');
            const  url=`${layerInfo.urlBase}/${layerInfo.id}/addFeatures`;
            const body ={features:json};

            let formData = new FormData();
            formData.append('features', JSON.stringify(json));

/*
            fetch(`${url}`, {
                method: 'POST',
                body: formData
            }).then((resObj) => {
                    console.log(resObj);

                                    })
                .catch((error) => {
                    console.log('UPLOAD ERROR', error);
                });*/

          });

    }


}
