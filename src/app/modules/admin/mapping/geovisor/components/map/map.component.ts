import { AfterViewInit, Component, ElementRef, OnChanges, OnInit, ViewChild } from '@angular/core';
import { FuseSplashScreenService } from '@fuse/services/splash-screen';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.types';
import { MessageProviderService } from 'app/shared/services/message-provider.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { loadModules } from 'esri-loader';
import { MapUtils } from 'app/shared/utils/map.utils';
import { ServiceLayer } from 'app/shared/models/image-layer.interface';
declare let shpwrite: any;
import { saveAs } from 'file-saver';
import { takeUntil } from 'rxjs/operators';
import { CommonService } from 'app/core/common/services/common.service';
import { DistrictResource } from 'app/core/common/interfaces/common.interface';
import { Role } from 'app/shared/enums/role.enum';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit {
    iniExtent: any;
    // eslint-disable-next-line @typescript-eslint/member-ordering
    @ViewChild('mapViewNode', { static: true }) private mapViewEl: ElementRef;
    drawerMode: 'side' | 'over';
    title = 'Gestor Cartográfico';
    view: any = null;
    map: any;
    layerList: any;
    //visibility = 'hidden';
    featureLayer: any;
    link: any;
    user: User;
    _unsubscribeAll: Subject<any> = new Subject<any>();
    proj4Catalog = 'EPSG';

    proj4DestWkid = 32717;
    proj4ScrWkid = 4326;
    proj4SrcKey = this.proj4Catalog + ':' + String(this.proj4ScrWkid);
    proj4DestKey = this.proj4Catalog + ':' + String(this.proj4DestWkid);

    listImageLayers: ServiceLayer[]=[
        {
            id:0,
            url:'https://ws.mineco.gob.pe/serverdf/rest/services/pruebas/CARTO_FISCAL_17/MapServer',
            title:'CARTO_FISCAL_17',
            visible:true,
            mapImageLayer:null,
            layers:[]
        },
        {
            id:1,
            url:'https://ws.mineco.gob.pe/serverdf/rest/services/pruebas/CARTO_FISCAL_18/MapServer',
            title:'CARTO_FISCAL_18',
            visible:true,
            mapImageLayer:null,
            layers:[]
        },
        {
            id:2,
            url:'https://ws.mineco.gob.pe/serverdf/rest/services/pruebas/CARTO_FISCAL_19/MapServer',
            title:'CARTO_FISCAL_19',
            visible:true,
            mapImageLayer:null,
            layers:[]
        },
        {
            id:3,
            url:'https://ws.mineco.gob.pe/serverdf/rest/services/pruebas/CARTO_TEMATICA_INEI/MapServer',
            title:'CARTO_TEMATICA_INEI',
            visible:true,
            mapImageLayer:null,
            layers:[]
        },



    ];
    //userUbigeo: string='';
    params: any ={};
    urlSearchZonaUrbana =
    'https://ws.mineco.gob.pe/serverdf/rest/services/pruebas/CARTO_TEMATICA_INEI/MapServer/2';
    constructor(
        protected _ngxSpinner: NgxSpinnerService,
        private _userService: UserService,
        protected _messageProviderService: MessageProviderService,
        protected _fuseSplashScreenService: FuseSplashScreenService,
        private _commonService: CommonService,
    ) {}

    ngOnInit(): void {

        this._userService.user$
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((user: User) => {
            this.user = user;
            const ubigeo =
                this.user && this.user.ubigeo
                    ? this.user.ubigeo
                    : '150101';

                    this._commonService
                    .getDistrictResource(ubigeo)
                    .subscribe((result: DistrictResource) => {
                        
                        this.params = {
                            district: ubigeo,
                            namedistrict: result.name,
                        };
                       
                    });
        });

    }
    ngAfterViewInit(): void {
        this._fuseSplashScreenService.show(0);
        setTimeout(() => {
            this.initializeMap();
        }, 1000);
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
                Popup,
                GroupLayer,
                Home,
                Print,

                reactiveUtils,
                watchUtils

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
                'esri/widgets/Popup',
                'esri/layers/GroupLayer',
                'esri/widgets/Home',

                'esri/widgets/Print',
                'esri/core/reactiveUtils',
                'esri/core/watchUtils'
            ]);
            /* eslint-enable @typescript-eslint/naming-convention */

            const screenshotDiv=document.getElementById('screenshotDiv');

            const mapProperties = {
                basemap: 'streets-vector',
            };

            this.map = new Map(mapProperties);



            const mapViewProperties = {
                container: this.mapViewEl.nativeElement,
                zoom: 6,
                center: [-71.955921, -10.5],
                map: this.map,
            };

            this.view = new MapView(mapViewProperties);




            const searchWidget = new Search({
                view: this.view,
                container:'searchWidget'
            });



            this.listImageLayers.map( async (l: ServiceLayer)=>{
                const options = {
                    url:l.url,
                    title:l.title,
                    visible:l.visible
                };
                const imageLayer = new MapImageLayer(options);
                l.mapImageLayer = imageLayer;
                const urlLayers=l.url + '/layers?f=pjson';
                const response = await fetch(urlLayers);
                const infoLayers: any = await response.json();
                const layers: any[]=infoLayers.layers;
                l.layers=layers.map( (layer: any)=> ({id:layer.id, name: layer.name})).filter((c)=>{ if(!c.name.includes('LOTE') && !c.name.includes('PREDIO') ) {return c;}});
                this.map.add(imageLayer);
            });

            const layerList = new LayerList({
                view: this.view,
                id:'layerList',

            });

            const layerListExpand = new Expand({
                view: this.view,
                content: layerList,
                id: 'maplayerListExpand',
                container: 'layerListExpand',
                group: 'bottom-right',
            });

            const basemapGallery = new BasemapGallery({
                view: this.view,
                id:'basemapGallery',
            });


            const legend = new Legend({
                view: this.view
              });



            const legendExpand = new Expand({
                view: this.view,
                content: legend,
                id: 'legendExpand',
                container: 'legendExpand',
                group: 'bottom-right',
            });

            basemapGallery.activeBasemap = 'satellite';

            const baseMapGalleryExpand = new Expand({
                view: this.view,
                content: basemapGallery,
                container: 'baseMapGalleryExpand',
                group: 'bottom-right',
            });



            const filterElement = document.getElementById('filterElement');

            const filterExpand = new Expand({
                view: this.view,
                content: filterElement,
                expandIconClass: 'esri-icon-globe',
                container: 'filterExpand',
                group: 'bottom-right',
            });


            const loadElement = document.getElementById('loadElement');


            const homeBtn = new Home({
                view: this.view
              });

             // this.view.ui.add( [baseMapGalleryExpand],{})






            //this.view.ui.remove('zoom'); // Remover el boton Zoom;
/*


            const fieldInfos = [
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
            const fieldConfigs = fieldInfos.map((e: any) => ({
                name: e.fieldName,
                label: e.label,
            }));

            const popupTemp = {
                title: 'Arancel',
                content: [
                    {
                        type: 'fields',
                        fieldInfos: fieldInfos,
                    },
                ],
            };
*/

            this.view.when(() => {
                //this.visibility = 'visible';

                this._fuseSplashScreenService.hide();
                console.log('this.user>>',this.user);
                if(this.user.placeScope.id === Role.DISTRITAL){
                    this.buscar(this.params);
                }

                  this.view.ui.add([baseMapGalleryExpand, layerListExpand,legendExpand], {
                    position: 'top-right',
                 });

                this.view.ui.add([homeBtn,filterExpand], {
                    position: 'top-left',
                 });


                 this.view.ui.add(searchWidget,{position:'manual'});

                 this.iniExtent =  this.view.extent;

              




                });
/*
            reactiveUtils.watch(
                () => this.view?.extent?.xmin,
                (xmin) => {
                  console.log(`Extent change xmin = ${xmin}`)
                });


*/


/*
watchUtils.whenFalse(this.view, 'stationary', (evt)=>{
    if(!this.view.stationary){
      watchUtils.whenTrueOnce(this.view, 'stationary', (evt)=>{

        console.log('this.view.extent>>',this.view.extent);
        console.log('this.iniExtent.extent>>' , this.iniExtent);
        if(this.iniExtent && this.view.extent.xmin !== this.iniExtent.xmin)

         {


            console.log('stationary>>');
            console.log(this.view.extent);

            this.view.extent = this.iniExtent;
        console.log("max extent reached, rolling back to previous extent");
         }

      });
    }else{

      watchUtils.whenFalseOnce(this.view, 'interacting', (evt)=>{
        console.log('interacting>>');
        console.log(this.view.extent);
      });
    }
  })
*/

        } catch (error) {
            console.error('EsriLoader: ', error);
        }
    }

    buscar(params: any): void {
        if(this.view){
            console.log('params', params);
            const ubigeo = params.district;
            const where = `UBIGEO='${ubigeo}'`;
           
            this.listImageLayers.forEach((l) => {
                if(l.mapImageLayer && l.mapImageLayer.sublayers){
                    const sublayers: any[] = l.mapImageLayer.sublayers;
                    sublayers.forEach((sublayer)=>{
                        sublayer.definitionExpression = where;
                    });
                    
                }
            });
            
            this.zoomToUbigeo(where);
        }
       
    }



    async zoomToUbigeo(where: string): Promise<any> {
        try {
           // console.log('where>>', where);
            //const urlDistrito='https://ws.mineco.gob.pe/serverdf/rest/services/pruebas/CARTO_TEMATICA_INEI/MapServer/7';

            // eslint-disable-next-line @typescript-eslint/naming-convention
            const [FeatureLayer]= await loadModules(['esri/layers/FeatureLayer',]);
            const featureZonaUrbana = new FeatureLayer(this.urlSearchZonaUrbana);
            //const layerDistrito = new FeatureLayer(urlDistrito);

            /*const layerDistrito = this.layersInfo.find(
                (e) => e.title === 'Distritos'
            ).featureLayer;*/

            this._fuseSplashScreenService.show(0);
            const res=await MapUtils.zoomToFeature(this.view, featureZonaUrbana, where);
            console.log('res>>',res);
            this._fuseSplashScreenService.hide();
           /* this.iniExtent =  this.view.extent;*/
            /*this.iniExtent =  this.view.extent;*/

        } catch (error) {
            console.error('EsriLoader: ', error);
        }
    }


    takeFhoto(): void{

        this.view.takeScreenshot().then((screenshot)=> {
            const imageElement: any = document.getElementById('screenshotImage');
            console.log('screenshot.dataUrl>>',screenshot.dataUrl);
            imageElement.src = screenshot.dataUrl;
        });
    }

    async  descargar(params: any): Promise<void> {

        const _imageLayer=this.listImageLayers.find( (l: ServiceLayer) => l.id===params.serviceId);
        const _layers=(_imageLayer )?_imageLayer.layers:[];
        const _layer= _layers.find((l: any)=> l.id===params.featureId);
        this.proj4DestWkid = params.projection;
        this.proj4SrcKey = this.proj4Catalog + ':' + String(this.proj4DestWkid);
        const nameZip = `${_imageLayer.title}_${_layer.name}_${params.namedistrict}.zip`;

        const [
            // eslint-disable-next-line @typescript-eslint/naming-convention
            FeatureLayer,
            proj4DestWKT,
            shpWrite,
        ] = await loadModules([
            'esri/layers/FeatureLayer',
            'dojo/text!https://epsg.io/' + this.proj4DestWkid + '.esriwkt',
        ]);

        this._fuseSplashScreenService.show();
        console.log('url',_imageLayer.url + '/' + _layer.id);
        const _featureLayer = new FeatureLayer(
            _imageLayer.url + '/' + _layer.id
        );


        const query = _featureLayer.createQuery();
        const ubigeo = params.district;
        query.where = `UBIGEO='${ubigeo}'`;
        query.outSpatialReference = this.proj4DestWkid;
        query.returnGeometry = true;
        const features = await MapUtils.queryFeaturesInLayer(
            _featureLayer,
            query
        );
        if(features && features.length>0 ){
            console.log('features>>',features);
            const geojson = await MapUtils.createGeoJSON(features);

            const options = {
                types: {
                    point: 'points',
                    polygon: 'polygons',
                    polyline: 'polylines',
                },
                wkt: proj4DestWKT,
            };
            console.log('geojson>>',geojson);
            shpwrite.zip(geojson, options).then((content) => {
                saveAs(content, nameZip);
                this._fuseSplashScreenService.hide();
                this._messageProviderService.showAlert(
                    'Descarga Exitosa'
                );
            });

        }
        else{
            this._fuseSplashScreenService.hide();
            this._messageProviderService.showAlert(
                'No hay datos para descargar'
            );
        }


    }


    async  cargar(params: any):  Promise<void> {
        const _imageLayer=this.listImageLayers.find( (l: ServiceLayer) => l.id===params.serviceId);
        const _layers=(_imageLayer )?_imageLayer.layers:[];
        const _layer= _layers.find((l: any)=> l.id===params.featureId);
        this.proj4DestWkid = params.projection;
        this.proj4SrcKey = this.proj4Catalog + ':' + String(this.proj4DestWkid);

        const [
            // eslint-disable-next-line @typescript-eslint/naming-convention
            FeatureLayer,
            proj4DestWKT,
            shpWrite,
        ] = await loadModules([
            'esri/layers/FeatureLayer',
            'dojo/text!https://epsg.io/' + this.proj4DestWkid + '.esriwkt',
        ]);

        this._fuseSplashScreenService.show();
        console.log('url',_imageLayer.url + '/' + _layer.id);
        const _featureLayer = new FeatureLayer(
            _imageLayer.url + '/' + _layer.id
        );

        const query = _featureLayer.createQuery();
        const ubigeo = params.district;
        query.where = `UBIGEO='${ubigeo}'`;
        query.outSpatialReference = this.proj4DestWkid;
        query.returnGeometry = true;

    }
}
