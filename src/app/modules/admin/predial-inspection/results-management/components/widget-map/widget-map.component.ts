/* eslint-disable @typescript-eslint/naming-convention */
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';

import {ActionsGapAnalisys} from 'app/shared/enums/actions-gap-analisys.enum';

import {CustomConfirmationService} from 'app/shared/services/custom-confirmation.service';

import {environment} from 'environments/environment';
import {loadModules} from 'esri-loader';
import {MapUtils} from 'app/shared/utils/map.utils';
import {TypeGap} from 'app/shared/enums/type-gap.enum';

import {FuseSplashScreenService} from '@fuse/services/splash-screen';
import { AuthService } from 'app/core/auth/auth.service';
import { Actions } from 'app/shared/enums/actions.enum';
import { IUbicacion } from '../../interfaces/ubicacion.interface';
import { Estado } from 'app/shared/enums/estado-map.enum';
import { ResultsService } from '../../services/results.service';
import { TicketStatus } from 'app/shared/enums/ticket-status.enum';
import { TypePoint } from 'app/shared/enums/type-point.enum';
import { User } from 'app/core/user/user.types';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ITicket } from '../../interfaces/ticket.interface';

@Component({
  selector: 'app-widget-map',
  templateUrl: './widget-map.component.html',
  styleUrls: ['./widget-map.component.scss']
})
export class WidgetMapComponent implements OnInit ,OnChanges, OnDestroy{

  @Input()x: number = -71.955921;
  @Input()y: number = -13.53063;
  @Input() layersInfo=[];
  @Input() listSourceSearchConfig=[];
  @Input() ubigeo: string;
  @Input() user: User;
  @Input() idManzanaLayer =3;
  @Input() idLoteLayer =1;
  @Input() idPredioLayer =1;
  @Input() idUbicacionLayer=5;

  @Input() ubicacion: IUbicacion;
  @Input() estado = Estado.LEER;
  @Input() resetMap =0;
  @Output() pointClickEvent = new EventEmitter();
  
  @ViewChild('mapViewNode', {static: true})private mapViewEl: ElementRef;
  
  ticket: ITicket;
  typeGap = TypeGap.PREDIO_SIN_GEORREFERENCIACION;
  pointIni: any;
  apiKey = environment.apiKeyArcgis;
  view: any = null;
  map: any;
  predioSymbol = {
    type: 'simple-marker',
    style: 'square',
    size: '10px',
    color: [0, 255, 0, 0.5],
    outline: {
        color: [0, 255, 0],
        width: 1.5,
    },
};

puntoImagenSymbol = {
    type: 'simple-marker',
    style: 'square',
    size: '14px',
    color: [0, 255, 255, 0.5],

    outline: {
        color: [0, 255, 255],
        width: 1.5,
    },
};


ubicacionSymbol ={
  type: 'picture-marker', // autocasts as new PictureMarkerSymbol()
  url: '/assets/images/map/location2.png',
  width: '20px',
  height: '30px',
  yoffset: '15px',
};

graphics: any[]=[];

ubicacionGraphic: any ;
_unsubscribeAll: Subject<any> = new Subject<any>();
  constructor(
    private _fuseSplashScreenService: FuseSplashScreenService,
    private  _authService: AuthService,
    private _resultsService: ResultsService,
    private _confirmationService: CustomConfirmationService,
    ) { }


    ngOnDestroy(): void {
      this._unsubscribeAll.next();
      this._unsubscribeAll.complete();
    }


  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes>>',changes);
    if(changes.ubicacion && this.ubicacion && this.view){
      this.onUbicacion(this.ubicacion);
    }
    /*if(changes.ubicacion && this.ubicacion && this.view){
      this.onUbicacion(this.ubicacion);
    }

    if(changes.resetMap){
      this.onResetMap(this.resetMap);

    }*/
  }

  ngOnInit(): void {

    this._resultsService.getUbicacionData().pipe(takeUntil(this._unsubscribeAll)).subscribe((res: {ubicacion: IUbicacion;ticket: ITicket}) => {
      if (res) {
          this.ticket = res.ticket;
          this.ubicacion = res.ubicacion;
          this.typeGap = this.ticket.codTipoTicket;
          /*this.estado = Estado.LEER;*/
          console.log('this.ubicacion.estado',this.ubicacion.estado);
          console.log('this.typeGap',this.typeGap);
          this.estado = (  this.ubicacion.estado===0  &&
            [TypeGap.PREDIO_SIN_GEORREFERENCIACION,TypeGap.PUNTO_IMAGEN].includes(this.typeGap))? Estado.EDITAR: Estado.LEER;
            console.log('this.estado>>',this.estado);
          this.onUbicacion(this.ubicacion);
      }
  });


  this._resultsService.getEstado().pipe(takeUntil(this._unsubscribeAll)).subscribe((res: any)=>{
    if(res){
      this.estado = res;
    }
  });

  this._resultsService.getResetMap().pipe(takeUntil(this._unsubscribeAll)).subscribe((res: any )=>{
      console.log('resetEvent',res);
      if(res){
          this.resetMap=res;
          this.onResetMap(res);
      }
  });



    this._fuseSplashScreenService.show(0);


    this.pointIni = [{
            latitude: this.y,
            longitude: this.x
        }];
    setTimeout(() => {
        this.initializeMap(this.pointIni, this.ubigeo);
    }, 1000);

    /*
    this._resultsService.getUbicacionData().subscribe((res: IUbicacion) => {

      if(this.ubicacion && this.view){
        this.onUbicacion(this.ubicacion);
      }

    });
*/
  }

  async initializeMap(inputPoint: any, ubigeo?: string): Promise < void > {
    try {
        const container = this.mapViewEl.nativeElement;

        const [// eslint-disable-next-line @typescript-eslint/naming-convention
            Map,
            // eslint-disable-next-line @typescript-eslint/naming-convention
            MapView,
            // eslint-disable-next-line @typescript-eslint/naming-convention
            Graphic,
            // eslint-disable-next-line @typescript-eslint/naming-convention
            GraphicsLayer,
            // eslint-disable-next-line @typescript-eslint/naming-convention
            BasemapGallery,
            // eslint-disable-next-line @typescript-eslint/naming-convention
            LayerList,
            // eslint-disable-next-line @typescript-eslint/naming-convention
            FeatureLayer,
            // eslint-disable-next-line @typescript-eslint/naming-convention
            GroupLayer,
            // eslint-disable-next-line @typescript-eslint/naming-convention
            Expand,
            // eslint-disable-next-line @typescript-eslint/naming-convention
            Search,
            // eslint-disable-next-line @typescript-eslint/naming-convention
            Popup,
           // eslint-disable-next-line @typescript-eslint/naming-convention
           Legend,
          // eslint-disable-next-line @typescript-eslint/naming-convention
          esriConfig,
          // eslint-disable-next-line @typescript-eslint/naming-convention
          MapImageLayer
        ] = await loadModules([
            'esri/Map',
            'esri/views/MapView',
            'esri/Graphic',
            'esri/layers/GraphicsLayer',
            'esri/widgets/BasemapGallery',
            'esri/widgets/LayerList',
            'esri/layers/FeatureLayer',
            'esri/layers/GroupLayer',
            'esri/widgets/Expand',
            'esri/widgets/Search',
            'esri/widgets/Popup',
            'esri/widgets/Legend',
            'esri/config',
            'esri/layers/MapImageLayer'
        ]);

        esriConfig.request.interceptors.push({

        before: (params)=> {
            params.requestOptions.query = params.requestOptions.query || {};
            params.requestOptions.query.token = this._authService.accessTokenArcGis;
        },

        });
        const mapProperties = {
            basemap: 'streets-vector'
        };

        this.map = new Map(mapProperties);

        const mapViewProperties = {
            container: this.mapViewEl.nativeElement,
            zoom: 15,

            map: this.map,

        };
        this.view = new MapView(mapViewProperties);

        const graphicsLayer = new GraphicsLayer();

        const x = inputPoint?. longitude;
        const y = inputPoint?. latitude;
        const point = { // Create a point
            type: 'point',
            longitude: x,
            latitude: y
        };


        this.view.center = [x, y];

        const basemapGallery = new BasemapGallery({view: this.view});

        const layerList = new LayerList({view: this.view});

        basemapGallery.activeBasemap = 'satellite';

        this.layersInfo.map((l) => {
            const options: any = {
                url: `${
                    l.urlBase
                }/${
                    l.layerId
                }`,
                title: l.title,
                outFields: ['*'],
                visible: l.visible,
                // popupEnabled: l.selected ? true : false,
                // popupTemplate: popupTrailheads,
                id: l.id,
                /*popupEnabled: true*/
            };

            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            l.labelClass ? (options.labelingInfo =[l.labelClass]) : null;
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            l.renderer ? (options.renderer = l.renderer) : null;
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            l.url ? (options.url = `${l.urlBase}/${l.layerId}`) : null;
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            l.source ? (options.source =l.source ) : null;
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            l.geometryType ? (options.geometryType =l.geometryType ) : null;
            if (this.ubigeo && this.ubigeo !== '') {
                //console.log('options.definitionExpressionBase>>', l.definitionExpressionBase);
                if (l.definitionExpressionBase && l.definitionExpressionBase !== '') {
                    l.definitionExpression = `${
                        l.definitionExpressionBase
                    } AND UBIGEO ='${
                        this.ubigeo
                    }'`;

                } else {
                    l.definitionExpression = ` UBIGEO ='${
                        this.ubigeo
                    }'`;
                }

            }
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            l.definitionExpression ? (options.definitionExpression = l.definitionExpression) : null;
            //console.log(options);
            if (l.tipo ===2){
              l.featureLayer = new MapImageLayer({
                url:l.urlBase,

                sublayers:[{
                  title: l.title,
                  id: l.layerId,
                  visible: true,
                  definitionExpression:l.definitionExpression,
                  labelingInfo:l.labelClass
                }]
              });
            }
            else {
              l.featureLayer = new FeatureLayer(options);
            
            }
            //console.log('l.definitionExpression>>', l.definitionExpression);
            this.map.add(l.featureLayer);
        });

        const sources: any[] = [{
                name: 'ArcGIS World Geocoding Service',
                placeholder: 'Buscar Direccion',
                apiKey: this.apiKey,
                countryCode: 'PE',
                singleLineFieldName: 'SingleLine',
                url: 'https://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer'
            },];

        this.listSourceSearchConfig.forEach((s: any) => {
            sources.push({
                layer: new FeatureLayer(s.url),
                searchFields: s.outFields,
                displayField: s.displayField,
                exactMatch: s.exactMatch,
                outFields: s.outFields,
                name: s.name
            });
        });

   
        


        const legend = new Legend({
            view: this.view,
            style : 'classic',
            layout: 'stack'
          });

          const layerListExpand = new Expand({view: this.view, content: layerList, id: 'maplayerListExpand', group: 'bottom-right'});

          const baseMapGalleryExpand = new Expand({view: this.view, content: basemapGallery, id: 'mapGalleryBaseExpand', group: 'bottom-right'});
          const legendExpand = new Expand({view: this.view, content: legend, id: 'legendExpand', group: 'bottom-right'});
          const searchWidget = new Search({view: this.view, includeDefaultSources: false, sources: sources, popupEnabled: false});
        searchWidget.on('select-result', (event) => {
            this.view.zoom = 19;
            console.log('event>>', event);
        });

        this.view.ui.add(searchWidget, {
            position: 'top-left',
            index: 1
        });
        this.view.ui.add([
            baseMapGalleryExpand, layerListExpand
        ], {position: 'top-right'});

        this.view.ui.add(legendExpand, 'bottom-right');

        this.view.when(() => {
            this._fuseSplashScreenService.hide();
            console.log('ubigeo>>',this.ubigeo);
            if(this.ubicacion){
              this.onUbicacion(this.ubicacion);
            }
            
            else if (this.ubigeo) {
              this.filterUbigeo(this.ubigeo);
            }



            const verificarAction = { // This text is displayed as a tooltip
                title: 'Verificar',
                // The ID by which to reference the action in the event handler
                id: 'verificar',
                // Sets the icon font used to style the action button
                className: 'esri-icon-check-mark'
            };


        });


        this.view.on('click', async (event) => {

          console.log('event>>',event);
          this.view.popup.close();

          this.graphics.forEach(g=>{
            this.view.graphics.remove(g);
          });
          this.graphics = [];
          if(this.estado === Estado.EDITAR){

              const layerManzana = this.layersInfo.find((l: any) => l.id === this.idManzanaLayer) ?. featureLayer;

              const loteLayer = this.layersInfo.find((l: any) => l.id === this.idLoteLayer) ?. featureLayer;
              const results: any[] = await MapUtils.queryIntersectFeaturelayerResults(loteLayer, event.mapPoint, 3, 'meters');

              if (results && results.length > 0) {
                  const r = results[0];

                  const pointGeometry = r.geometry;
                  const predio = r.attributes;
                  const graphic = new Graphic(pointGeometry, this.predioSymbol);
                  r.attributes['COORD_X'] =pointGeometry.longitude;
                  r.attributes['COORD_Y'] =pointGeometry.latitude;
                  /*predio['NOM_USER'] = this.user.username;
                  predio['NOM_PC'] = 'PLATAFORMA';*/
                  if(!predio['ID_MZN_C']){
                      const intersectFeature =
                      MapUtils.queryIntersectFeaturelayer(
                        layerManzana,
                        pointGeometry,5,'meters'
                      );

                      intersectFeature.then((data: any) => {
                          if (data && data.attributes) {
                              predio['ID_MZN_C']=data['ID_MZN_C'];
                          }

                          this.pointClickEvent.emit({point:predio, type:TypePoint.LOTE});

                      });
                  }
                  else{
                    this.pointClickEvent.emit({point:predio,type:TypePoint.LOTE});
                  }

                  this.view.graphics.add(graphic);
                  this.graphics.push(graphic);

              }

              else{
                const puntoImagen: any = {};
                const pointGeometry =  event.mapPoint;
                const graphic = new Graphic(pointGeometry, this.puntoImagenSymbol);

                this.view.graphics.add(graphic);
                this.graphics.push(graphic);

                puntoImagen['COORD_X'] = pointGeometry.longitude;
                puntoImagen['COORD_Y'] = pointGeometry.latitude;


                const intersectFeature =
                MapUtils.queryIntersectFeaturelayer(
                  layerManzana,
                  pointGeometry,5,'meters'
                );

                intersectFeature.then((data: any) => {

                  if (data && data.attributes) {
                      puntoImagen['ID_MZN_C']=data['ID_MZN_C'];
                  }
                    this.pointClickEvent.emit({point:puntoImagen, type:TypePoint.PUNTO_IMAGEN});
                });

              }

          }

      });

      this.view.popup.on('trigger-action', (event) => {

      });
    } catch (error) {
        console.error('EsriLoader: ', error);
    }
}


filterUbigeo(ubigeo: string): void {
  const where = `UBIGEO='${ubigeo}'`;

  this.zoomToUbigeo(where);
}


async zoomToUbigeo(where: string): Promise < any > {
  try {
      const layerManzana = this.layersInfo.find((l: any) => l.id === this.idManzanaLayer) ?. featureLayer;


      if (this.view) {
          this._fuseSplashScreenService.show(0);
          MapUtils.zoomToFeature(this.view, layerManzana, where).then(() => {
              this.view.zoom = 16;
              this._fuseSplashScreenService.hide();
          });
      }
  } catch (error) {
      console.error('EsriLoader: ', error);
  }

}

async onUbicacion(ubicacion: IUbicacion):  Promise <void>{

  const [// eslint-disable-next-line @typescript-eslint/naming-convention

  Graphic,
  // eslint-disable-next-line @typescript-eslint/naming-convention

] = await loadModules([

  'esri/Graphic',

]);

if(this.view){
    this.view.center=[ubicacion.x,ubicacion.y];
    this.view.zoom = 20;
    /*const ubicacionLayer = this.layersInfo.find((l: any) => l.id === this.idUbicacionLayer) ?. featureLayer;*/


    const point = {
      //Create a point
      type: 'point',
      longitude: ubicacion.x,
      latitude: ubicacion.y,
  };
  this.ubicacionGraphic = new Graphic({
      geometry: point,
      symbol: this.ubicacionSymbol,
      /*symbol: this.simpleMarkerSymbolUndefined*/
  });


  this.view.graphics.removeAll();
  /*
  if(this.ubicacionGraphic){
    this.view.graphics.remove(this.ubicacionGraphic);
  }*/
  this.view?.graphics?.add(this.ubicacionGraphic);

}


}

onResetMap(tipo: number): void {
  if(this.view){
   //tipo 1 limpiar todo
   if(tipo===1){
    this.view.graphics.removeAll();
    this.estado = Estado.LEER;
  }
// tipo 2 removiendo punto seleccionado
  else if(tipo ===2){
    /*this.estado = Estado.EDITAR;*/
    this.graphics.forEach(g=>{
      this.view.graphics.remove(g);
    });

  }
  }



}

}
