import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { loadModules } from 'esri-loader';
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



    layersInfo = [
        {
          title: 'Manzanas',
          id: 1,
          urlBase:
            'https://arcgis.inei.gob.pe:6443/arcgis/rest/services/CENEC/CENEC007_AGS_EXP/MapServer',
          order: 0,
          featureLayer: null,
        }
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

    constructor() { }



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
            center: [-77.1298, -12.0328],
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

          const incidenteSearchElement = document.getElementById(
            'incidenteSearchElement'
          );
          const incidenteSearchExpand = new Expand({
            view: this.view,
            content: incidenteSearchElement,
            declaredClass: 'incidente-search',
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

          const query ='UBIGEO=\'010201\' and ZONA=\'00200\'';


          const rendererUniqueValue = {
            type: 'unique-value',
            field: 'IDMANZANA',
            defaultSymbol:this.mzsNotSeleccion,
            uniqueValueInfos: [
              {
                value: 'ABIERTO',
                symbol: this.mzsSeleccion,
              },
            ],
            legendOptions: { title: 'Estado' },
          };

          const idManzanas= ['01020100200033','01020100200039','01020100200038','01020100200037','01020100200034C'];
          rendererUniqueValue.uniqueValueInfos = idManzanas.map(m=>({
          value: m,
          symbol: this.mzsSeleccion,}));

          this.layersInfo.reverse().map((l) => {
            l.featureLayer = new FeatureLayer(`${l.urlBase}/${l.id}`, {
              title: l.title,
              definitionExpression:query,
              renderer:rendererUniqueValue
            });


            this.map.add(l.featureLayer);
          });


          /*layer.queryFeatures(query).then((featureSet)=>{

            if(featureSet.features.length > 0) {
                const extent = featureSet.features[0].geometry.getExtent();
                featureSet.features.forEach((feature) =>{
                    extent = extent.union(feature.geometry.getExtent());
                })

                zoomTo(extent.expand(1.3));

            }
        );


        */







        this.view.when(() => {
            /*const layer = this.layersInfo.find(e=> e.title==='Manzanas').featureLayer;
            this.view.extent=layer.fullExtent;*/
        });

        const layer = this.layersInfo.find(e=> e.title==='Manzanas').featureLayer;

        layer
        .when(() => layer.queryExtent())
        .then((response) => {
          this.view.goTo(response.extent);
        });






          this.view.ui.add(layerListExpand, {
            position: 'top-right',
          });

          /*return this.view;*/
        } catch (error) {
          console.error('EsriLoader: ', error);
        }
      }

}
