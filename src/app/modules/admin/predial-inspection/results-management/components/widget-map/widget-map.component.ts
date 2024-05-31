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
import { E } from '@angular/cdk/keycodes';
import { IFoto } from '../../interfaces/foto.interface';

@Component({
  selector: 'app-widget-map',
  templateUrl: './widget-map.component.html',
  styleUrls: ['./widget-map.component.scss']
})
export class WidgetMapComponent implements OnInit ,OnChanges, OnDestroy, AfterViewInit {

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
  @Input() idManzanaImagenLayer=5;
  @Input() idPuntoImagenLayer=6;
  @Input() idManzanaSinLote=7;
  @Input() ubicacion: IUbicacion;
  @Input() estado = Estado.LEER;
  @Input() resetMap =0;
  @Input()isAdmin =false;
  @Output() pointClickEvent = new EventEmitter();

  @ViewChild('mapViewNode', {static: true})private mapViewEl: ElementRef;
  fotos: IFoto[]=[];
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
 textSymbol = {
    type: 'text',  // autocasts as new TextSymbol()
    color: 'blue',
    haloColor: 'white',
    haloSize: '2px',
    text: 'Ubicacion de campo',
    xoffset: 65,
    yoffset: 15,
    font: {  // autocasts as new Font()
      size: 12,

      weight: 'bold'
    }
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


puntoImagenSymbol2 = {
  type: 'simple-marker',
  style: 'circle',
  size: '16px',
  color: [0, 255, 0, 0.8],

  outline: {
      color: [0, 255, 0],
      width: 3,
  },
};


ubicacionSymbol ={
  type: 'picture-marker', // autocasts as new PictureMarkerSymbol()
  url:'https://static.arcgis.com/images/Symbols/Shapes/RedPin1LargeB.png',
  //url: '/assets/images/map/location2.png',
  width: '30px',
  height: '30px',
  yoffset: '15px',
};

graphics: any[]=[];

ubicacionGraphic: any ;
_unsubscribeAll: Subject<any> = new Subject<any>();
currentIndex = 0;
hideSelectUbigeo = false;

  constructor(
    private _fuseSplashScreenService: FuseSplashScreenService,
    private  _authService: AuthService,
    private _resultsService: ResultsService,
    private _confirmationService: CustomConfirmationService,
    ) {

      this.isAdmin=(localStorage.getItem('isAdmin') ==='true')?true:false;

      this._resultsService.getGenerarNotificacion().subscribe((ubicacion)=>{
        this.addUbicacion(ubicacion);
      });
    }

    ngAfterViewInit(): void {
        this._resultsService.getUbicacionData().pipe(takeUntil(this._unsubscribeAll)).subscribe((res: {ubicacion: IUbicacion;ticket: ITicket}) => {
          if (res) {

              this.ticket = res.ticket;
              this.ubicacion = res.ubicacion;
              this.typeGap = this.ticket.codTipoTicket;
              this.fotos = this.ubicacion.fotos;

                this.estado = Estado.LEER;
                const featureLayer=this.layersInfo.find(e=> e.id === this.idPuntoImagenLayer).featureLayer;
                const featureManzanaLayer=this.layersInfo.find(e=> e.id === this.idManzanaImagenLayer).featureLayer;
                const featureManzanaSinLoteLayer = this.layersInfo.find(e=> e.id === this.idManzanaSinLote).featureLayer;

                if(this.typeGap === TypeGap.PUNTO_IMAGEN)
                {
                  featureLayer.visible=true;
                  featureManzanaLayer.visible=true;
                }

                else if(this.typeGap === TypeGap.MANZANA_SIN_LOTES)
                {
                  featureManzanaSinLoteLayer.visible=true;
                }

                else
                {
                  featureLayer.visible=false;
                  featureManzanaLayer.visible=false;
                  featureManzanaSinLoteLayer.visible= false;
                }

              this.onChangeUbicacion(this.ubicacion);
          }
        });


        this._resultsService.getEstado().pipe(takeUntil(this._unsubscribeAll)).subscribe((res: any)=>{
            if(res){
            this.estado = res;
            console.log('this.estado>>>',this.estado);
            if(this.estado === Estado.INICIAR){
                this.addUbicacion(this.ubicacion);
                this.estado = Estado.LEER;
            }
            }
        });

      this._resultsService.getResetMap().pipe(takeUntil(this._unsubscribeAll)).subscribe((res: any )=>{
          console.log('resetEvent',res);
          if(res){
              this.resetMap=res;
              this.onResetMap(res);
          }
      });



        this._fuseSplashScreenService.show();


        this.pointIni = {
                latitude: this.y,
                longitude: this.x
            };
        setTimeout(() => {
            this.initializeMap(this.pointIni, this.ubigeo);
        }, 1000);

        this._resultsService.getUbigeo().pipe(takeUntil(this._unsubscribeAll)).subscribe((ubigeo: any )=>{
            this.ubigeo = ubigeo;
            if(ubigeo){
                this.filterUbigeo(this.ubigeo);
            }
        });

    }


    ngOnDestroy(): void {
      this._unsubscribeAll.next(null);
      this._unsubscribeAll.complete();

    }


  ngOnChanges(changes: SimpleChanges): void {

    if(changes.ubicacion && this.ubicacion && this.view){
      this.fotos = this.ubicacion.fotos;
      this.onChangeUbicacion(this.ubicacion);
    }
    /*if(changes.ubicacion && this.ubicacion && this.view){
      this.onUbicacion(this.ubicacion);
    }

    if(changes.resetMap){
      this.onResetMap(this.resetMap);

    }*/
  }

  ngOnInit(): void {



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


          const fotosElement = document.getElementById('fotosElement');

          const selectElement = document.getElementById('selectElement');


          const layerListExpand = new Expand({view: this.view, content: layerList, id: 'maplayerListExpand', group: 'bottom-right'});
          const fotosExpand = new Expand({
            view: this.view,
            content: fotosElement,
            expandIconClass: 'esri-icon-media',
            id: 'fotosElement',
            group: 'top-right'

        });


        const selectUbigeoExpand = new Expand({
            view: this.view,
            content: selectElement,
            //expandIconClass: 'esri-icon-',
            id: 'selectElement',
            group: 'top-right'

        });

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
        if(this.isAdmin){
            this.view.ui.add([fotosExpand,selectUbigeoExpand], {
                position: 'top-left',
            });
        }
        else {
            this.view.ui.add([fotosExpand], {
                position: 'top-left',
            });
        }

        this.view.when(() => {
            this._fuseSplashScreenService.hide();


            console.log('ubigeo>>',this.ubigeo);
            if(this.ubicacion){
              this.onChangeUbicacion(this.ubicacion);
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
          this.view.popup.close();

          this.graphics.forEach(g=>{
            this.view.graphics.remove(g);
          });
          this.graphics = [];
          if(this.estado === Estado.EDITAR &&  [TypeGap.PREDIO_SIN_GEORREFERENCIACION].includes(this.typeGap) ){

              const layerManzana = this.layersInfo.find((l: any) => l.id === this.idManzanaLayer) ?. featureLayer;

              const loteLayer = this.layersInfo.find((l: any) => l.id === this.idLoteLayer) ?. featureLayer;
              const results: any[] = await MapUtils.queryIntersectFeaturelayerResults(loteLayer, event.mapPoint, 3, 'meters');

              if (results && results.length > 0) {
                  const r = results[0];

                  const pointGeometry = r.geometry;
                  const predio = r.attributes;
                  const graphic = new Graphic(pointGeometry, this.predioSymbol);

                  //const graphic2 = new Graphic(pointGeometry, this.textSymbol);

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
                              predio['ID_MZN_C']=data.attributes['ID_MZN_C'];
                          }

                          this.pointClickEvent.emit({point:predio, type:TypePoint.LOTE});

                      });
                  }
                  else{
                    this.pointClickEvent.emit({point:predio,type:TypePoint.LOTE});
                  }

                  //this.view.graphics.add(graphic);
                  //this.view.graphics.add(graphic2);
                  this.view.graphics.add(graphic);
                  this.graphics.push(graphic);
                  //this.graphics.push(graphic2);
              }

              else{
                const puntoImagen: any = {};
                const pointGeometry =  event.mapPoint;
                const graphic = new Graphic(pointGeometry, this.puntoImagenSymbol);
                //const graphic2 = new Graphic(pointGeometry, this.textSymbol);

                puntoImagen['COORD_X'] = pointGeometry.longitude;
                puntoImagen['COORD_Y'] = pointGeometry.latitude;


                const intersectFeature =
                MapUtils.queryIntersectFeaturelayer(
                  layerManzana,
                  pointGeometry,5,'meters'
                );
                this.pointClickEvent.emit({point:puntoImagen, type:TypePoint.PUNTO_IMAGEN});
                /*intersectFeature.then((data: any) => {

                  if (data && data.attributes) {
                      puntoImagen['ID_MZN_C']=data['ID_MZN_C'];
                  }
                    this.pointClickEvent.emit({point:puntoImagen, type:TypePoint.PUNTO_IMAGEN});
                });*/
                this.view.graphics.add(graphic);
                //this.view.graphics.add(graphic2);
                this.graphics.push(graphic);
                //this.graphics.push(graphic2);
              }

          }

          else if(this.estado === Estado.EDITAR &&  [ TypeGap.PUNTOS_LOTE_SIN_PREDIO].includes(this.typeGap) ){
            const layerManzana = this.layersInfo.find((l: any) => l.id === this.idManzanaLayer) ?. featureLayer;

            const loteLayer = this.layersInfo.find((l: any) => l.id === this.idLoteLayer) ?. featureLayer;
            const results: any[] = await MapUtils.queryIntersectFeaturelayerResults(loteLayer, event.mapPoint, 3, 'meters');
            if (results && results.length > 0) {
                const r = results[0];
                const pointGeometry = r.geometry;
                const predio = r.attributes;
                const graphic = new Graphic(pointGeometry, this.predioSymbol);
                //const graphic2 = new Graphic(pointGeometry, this.textSymbol);
                r.attributes['COORD_X'] =pointGeometry.longitude;
                r.attributes['COORD_Y'] =pointGeometry.latitude;

                if(!predio['ID_MZN_C']){
                    const intersectFeature =
                    MapUtils.queryIntersectFeaturelayer(
                      layerManzana,
                      pointGeometry,5,'meters'
                    );

                    intersectFeature.then((data: any) => {
                        if (data && data.attributes) {
                            predio['ID_MZN_C']=data.attributes['ID_MZN_C'];
                        }

                        this.pointClickEvent.emit({point:predio, type:TypePoint.LOTE});

                    });
                }
                else{
                  this.pointClickEvent.emit({point:predio,type:TypePoint.LOTE});
                }

                this.view.graphics.add(graphic);
                //this.view.graphics.add(graphic2);
                this.graphics.push(graphic);
                //this.graphics.push(graphic2);

            }
          }
          else if(this.estado === Estado.EDITAR &&  [TypeGap.PUNTO_IMAGEN].includes(this.typeGap) ){

            const loteLayer = this.layersInfo.find((l: any) => l.id === this.idLoteLayer) ?. featureLayer;
            const puntoImagenLayer = this.layersInfo.find((l: any) => l.id === this.idPuntoImagenLayer) ?. featureLayer;

            const layerManzana = this.layersInfo.find((l: any) => l.id === this.idManzanaLayer) ?. featureLayer;
            const results: any[] = await MapUtils.queryIntersectFeaturelayerResults(puntoImagenLayer, event.mapPoint, 3, 'meters');
            //const results2: any[] = await MapUtils.queryIntersectFeaturelayerResults(puntoImagenLayer, event.mapPoint, 3, 'meters');

            if (results && results.length > 0) {
              const r = results[0];

              const pointGeometry = r.geometry;
              const predio = r.attributes;
              const graphic = new Graphic(pointGeometry, this.predioSymbol);
              //const graphic2 = new Graphic(pointGeometry, this.textSymbol);

              r.attributes['COORD_X'] =pointGeometry.longitude;
              r.attributes['COORD_Y'] =pointGeometry.latitude;
              this.pointClickEvent.emit({point:predio, type:TypePoint.LOTE});

              /*



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
              }*/

              this.view.graphics.add(graphic);
              //this.view.graphics.add(graphic2);
              this.graphics.push(graphic);
              //this.graphics.push(graphic2);
          }

          /*else if (results2 && results2.length > 0) {
            const r = results2[0];

            const pointGeometry = r.geometry;
            const predio = r.attributes;
            const graphic = new Graphic(pointGeometry, this.puntoImagenSymbol2);
            r.attributes['COORD_X'] =pointGeometry.longitude;
            r.attributes['COORD_Y'] =pointGeometry.latitude;
            this.pointClickEvent.emit({point:predio, type:TypePoint.LOTE});
            this.view.graphics.add(graphic);
            this.graphics.push(graphic);
          }*/

          else{
            const puntoImagen: any = {};
            const pointGeometry =  event.mapPoint;
            const graphic = new Graphic(pointGeometry, this.puntoImagenSymbol);
            //const graphic2 = new Graphic(pointGeometry, this.textSymbol);
            /*this.view.graphics.add(graphic);
            this.graphics.push(graphic);*/

            puntoImagen['COORD_X'] = pointGeometry.longitude;
            puntoImagen['COORD_Y'] = pointGeometry.latitude;



            const intersectFeature =
            MapUtils.queryIntersectFeaturelayer(
              layerManzana,
              pointGeometry,5,'meters'
            );

            intersectFeature.then((data: any) => {

              if (data && data.attributes) {
                  puntoImagen['ID_MZN_C']=data.attributes['ID_MZN_C'];
              }
                this.pointClickEvent.emit({point:puntoImagen, type:TypePoint.PUNTO_IMAGEN});
            });
            this.view.graphics.add(graphic);
            this.graphics.push(graphic);
            /*this.view.graphics.add(graphic2);
            this.graphics.push(graphic);
            this.graphics.push(graphic2);*/
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

  this.layersInfo.map((l) => {

        if (l.definitionExpressionBase && l.definitionExpressionBase !== '') {
            l.definitionExpression = `${
                l.definitionExpressionBase
            } AND UBIGEO ='${
                ubigeo
            }'`;

        } else {
            l.definitionExpression = ` UBIGEO ='${
            ubigeo
            }'`;
        }

    });

   this.zoomToUbigeo(where);
}


async zoomToUbigeo(where: string): Promise < any > {
  try {
      const layerManzana = this.layersInfo.find((l: any) => l.id === this.idManzanaLayer) ?. featureLayer;


      if (this.view) {
          this._fuseSplashScreenService.show();
          MapUtils.zoomToFeature(this.view, layerManzana, where).then(() => {
              this.view.zoom = 16;
              this._fuseSplashScreenService.hide();
          });
      }
  } catch (error) {
      console.error('EsriLoader: ', error);
  }

}

async onChangeUbicacion(ubicacion: IUbicacion):  Promise <void>{

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

  const graphic2 = new Graphic(
    {
        geometry: point,
        symbol: this.textSymbol,
        /*symbol: this.simpleMarkerSymbolUndefined*/
    }
   );

  this.view.graphics.removeAll();
  /*
  if(this.ubicacionGraphic){
    this.view.graphics.remove(this.ubicacionGraphic);
  }*/
  this.view?.graphics?.add(this.ubicacionGraphic);
  this.view?.graphics?.add(graphic2);
  this._resultsService.setView(this.view);


}
}



async addUbicacion(ubicacion: IUbicacion):  Promise <void>{
    const [// eslint-disable-next-line @typescript-eslint/naming-convention

    Graphic,
    // eslint-disable-next-line @typescript-eslint/naming-convention

  ] = await loadModules([

    'esri/Graphic',

  ]);

  if(this.view){
      this.view.center=[ubicacion.x,ubicacion.y];
      this.view.zoom = 20;
      const point = {
        type: 'point',
        longitude: ubicacion.x,
        latitude: ubicacion.y,
        };
        const ubicacionGraphic = new Graphic({
            geometry: point,
            symbol: this.predioSymbol,

        });
        const puntoNuevo: any = {};

        puntoNuevo['COORD_X'] = ubicacion.x;
        puntoNuevo['COORD_Y'] = ubicacion.y;
        this.pointClickEvent.emit({point:puntoNuevo, type:TypePoint.NUEVO_PUNTO_CAMPO});


        this.view?.graphics?.add(ubicacionGraphic);
        this.graphics.push(ubicacionGraphic);
        this._resultsService.setView(this.view);
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


showNextImage(): void  {
  this.currentIndex = (this.currentIndex + 1) % this.fotos.length;
}

showPrevImage(): void  {
  this.currentIndex = (this.currentIndex - 1 + this.fotos.length) % this.fotos.length;
}

onSelectUbigeo(ubigeo: any): void {
    this.ubigeo = ubigeo;
    console.log('this.ubigeo >>>', this.ubigeo);
    this._resultsService.setUbigeo(this.ubigeo);
    /*this.navigationAuthorizationService.ubigeoNavigation = this.ubigeo;
    this.formEdit.get('ubigeo').setValue(this.ubigeo);
    console.log('create user >>>', this.formEdit.value);*/
}
}
