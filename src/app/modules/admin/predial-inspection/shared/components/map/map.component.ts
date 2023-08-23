/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit, ViewChild, ElementRef, Query, AfterViewInit } from '@angular/core';
import { loadModules } from 'esri-loader';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.types';
import { FuseSplashScreenService } from '@fuse/services/splash-screen';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { StateService } from '../../../assignment-of-load/services/state.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit {
  @ViewChild('mapViewAOL', { static: false }) mapViewAOLContainer: ElementRef;
  @ViewChild('pointButton', { static: false }) pointButtonContainer: ElementRef;
  @ViewChild('clearSelection', { static: false }) clearButtonContainer: ElementRef;
  // @ViewChild('createCarga', { static: false }) createCargaContainer: ElementRef;
  // create string to the id of the map element that will be created
  hideSelectUbigeo:boolean = true;
  _queryUbigeo: string;
  _field_ubigeo = 'UBIGEO';
  _view = null;
  _graphicsIds = {};
  _webmap = null;
  // Properties app
  _currentUser: User;
  _currentUserUbigeo: string;
  _unsubscribeAll: Subject<any> = new Subject<any>();


  constructor(
    protected _fuseSplashScreenService: FuseSplashScreenService,
    private _userService: UserService,
    private _stateService: StateService,
  ) { }

  ngAfterViewInit(): void {
    this._fuseSplashScreenService.show(0);
    setTimeout(() => {
      this.initializeMapAOL();
    }, 1000);
  }

  ngOnInit(): void {
    this._userService.user$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((user: User) => {
        this._currentUser = user;
        // @SETUBIGEO
        this._currentUserUbigeo = this._currentUser.ubigeo ? this._currentUser.ubigeo : '040703';
        this._queryUbigeo = `${this._field_ubigeo} = '${this._currentUserUbigeo}'`;
      });
    this._stateService.clearAllGraphics.subscribe(() => this.clearSelection());
    this._stateService.refreshLayer.subscribe((id) => this.refreshLayerById(id));
  }

  clearSelection(): void {
    for (let oid in this._graphicsIds) {
      this._view.graphics.remove(this._graphicsIds[oid])
    }
    this._graphicsIds = {};
    this._stateService.deleteAll.emit(true);
    this._stateService.setWebMap(this._webmap);
    this._stateService.setGraphicsId(this._graphicsIds);
  }

  refreshLayerById(id): void {
    this._webmap.findLayerById(id).refresh();
  }

  async initializeMapAOL() {
    try {
      // add map to the view
      const [
        MapView,
        WebMap,
        esriConfig,
        query,
        Home,
        LayerList,
        Expand,
        BasemapGallery,
        Search,
        Draw,
        Graphic,
        Point,
        Query,
        Legend,
        Polygon,
        Extent,
        webMercatorUtils
      ] = await loadModules([
        'esri/views/MapView',
        'esri/WebMap',
        'esri/config',
        "esri/rest/query",
        "esri/widgets/Home",
        "esri/widgets/LayerList",
        "esri/widgets/Expand",
        "esri/widgets/BasemapGallery",
        "esri/widgets/Search",
        "esri/views/draw/Draw",
        "esri/Graphic",
        "esri/geometry/Point",
        "esri/rest/support/Query",
        "esri/widgets/Legend",
        "esri/geometry/Polygon",
        "esri/geometry/Extent",
        "esri/geometry/support/webMercatorUtils",
      ]);

      // Properties of the map
      const _portalUrl = 'https://ws.mineco.gob.pe/portaldf';
      const _idWebMap = "66adf64572f7438c892056ad832ea39d";
      let _layersMap = [];

      // Properties of the layers ids
      const _id_limites = "limites_nacional_6496"
      const _id_departamento = "limites_nacional_6496_0"
      const _id_provincia = "limites_nacional_6496_1"
      const _id_distrito = "limites_nacional_6496_2"
      const _id_cf_sector = "CARTO_FISCAL_6033"
      const _id_cf_manzana_urb = "CARTO_FISCAL_3571"
      const _id_cf_manzana = "CARTO_FISCAL_8574"
      const _id_cf_parques = "CARTO_FISCAL_4241"
      const _id_cf_unidades_urbanas = "CARTO_FISCAL_9795"
      const _id_cf_lotes = "CARTO_FISCAL_8149"
      const _id_cf_arancel = "CARTO_FISCAL_8360"
      const _id_cf_numeracion = "CARTO_FISCAL_9596"
      const _id_cf_eje_vial = "CARTO_FISCAL_8524"
      const _id_cf_lotes_pun = "CARTO_FISCAL_2829"
      const _id_cf_predio = "CARTO_FISCAL_869"

      const _id_mz_pred = "CAPAS_INSPECCION_AC_1236"
      const _id_mz_pimg = "CAPAS_INSPECCION_AC_3115"
      const _id_mz_inei = "CAPAS_INSPECCION_AC_3891"

      const _id_predio_sin_mz = "CARTO_PUNTO_CAMPO_7359"
      const _id_predios = "CARTO_PUNTO_CAMPO_4985"
      const _id_lotes_sin_predio = "CAPAS_INSPECCION_AC_3266"
      const _id_punto_imagen = "CAPAS_INSPECCION_AC_3611"

      const _id_carga = "carto_asignacion_carga_8124"
      const _mz_asignadas = "CARTO_MANZANA_CAMPO_3194"


      const self = this;
      // let graphicsIds = {};

      // symbol selected
      const symbolSelectedPolygon = {
        type: 'simple-fill', // autocasts as SimpleFillSymbol
        color: [255, 0, 0, 0.5],
        style: 'solid',
        outline: {  // autocasts as SimpleLineSymbol
          color: 'red',
          width: 2
        }
      };

      const symbolSelectedPoint = {
        type: 'simple-marker', // autocasts as new SimpleMarkerSymbol()
        color: [255, 0, 0, 0.5],
        outline: {
          color: [255, 0, 0],
          width: 2
        }
      };

      esriConfig.portalUrl = _portalUrl;

      self._webmap = new WebMap({
        portalItem: {
          id: _idWebMap
        }
      });

      self._view = new MapView({
        map: self._webmap,
        container: this.mapViewAOLContainer.nativeElement
      });

      const homeButton = new Home({
        view: self._view,
      });

      self._view.ui.add(homeButton, 'top-left');

      const layerList = new LayerList({
        view: self._view
      });

      const layerListExpand = new Expand({
        expandIcon: 'layers',
        view: self._view,
        content: layerList
      });

      self._view.ui.add(layerListExpand, 'top-right');

      const basemapGallery = new BasemapGallery({
        view: self._view
      });

      const basemapGalleryExpand = new Expand({
        view: self._view,
        content: basemapGallery
      });

      self._view.ui.add(basemapGalleryExpand, 'top-right');

      const searchWidget = new Search({
        view: self._view
      });

      self._view.ui.add(searchWidget, {
        position: 'top-left',
        index: 0
      });

      let legend = new Legend({
        view: self._view
      });

      self._view.ui.add(legend, "bottom-right");

      this._stateService.state
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((state) => {
          if (state) {
            self._view.ui.add(this.pointButtonContainer.nativeElement, 'top-left');
            self._view.ui.add(this.clearButtonContainer.nativeElement, 'top-left');
            // view.ui.add(this.createCargaContainer.nativeElement, 'top-left');
            // change stile of the button
            this.pointButtonContainer.nativeElement.style = 'visibility: visible;';
            this.clearButtonContainer.nativeElement.style = 'visibility: visible;';
            // this.createCargaContainer.nativeElement.style = "visibility: visible;"
          } else {
            this.pointButtonContainer.nativeElement.style = 'visibility: false;';
            this.clearButtonContainer.nativeElement.style = 'visibility: false;';
            // this.createCargaContainer.nativeElement.style = "visibility: false;"
          }
        });

      const draw = new Draw({
        view: self._view
      });

      function createPointGraphics(evt) {
        self._fuseSplashScreenService.show(0)
        // view.graphics.removeAll();
        let coordinates = evt.vertices.slice(-1)[0];
        const point_g = new Point({
          x: coordinates[0],
          y: coordinates[1],
          spatialReference: self._view.spatialReference
        });

        // query manzanas
        // const urlManzanas = webmap.findLayerById(_id_mz_pred).url;
        let queryManzanas = new Query();
        queryManzanas.where = self._webmap.findLayerById(_id_mz_pred).definitionExpression;
        queryManzanas.geometry = point_g;
        queryManzanas.spatialRelationship = "intersects";
        queryManzanas.returnGeometry = true;
        queryManzanas.outFields = ['UBIGEO', 'COD_SECT', 'COD_MZN', 'ID_MZN_C'];

        // query manzanas punto imagen
        // const urlManzanasPuntoImagen = webmap.findLayerById(_id_mz_pimg).url;
        // console.log(urlManzanasPuntoImagen)
        let queryManzanasPuntoImagen = new Query();
        queryManzanasPuntoImagen.where = self._webmap.findLayerById(_id_mz_pimg).definitionExpression;
        queryManzanasPuntoImagen.geometry = point_g;
        queryManzanasPuntoImagen.spatialRelationship = "intersects";
        queryManzanasPuntoImagen.returnGeometry = true;
        queryManzanasPuntoImagen.outFields = ['UBIGEO', 'ID_MZN_U'];

        // query manzanas inei
        // const urlManzanasInei = webmap.findLayerById(_id_mz_inei).url;
        let queryManzanasInei = new Query();
        queryManzanasInei.where = self._webmap.findLayerById(_id_mz_inei).definitionExpression;
        queryManzanasInei.geometry = point_g;
        queryManzanasInei.spatialRelationship = "intersects";
        queryManzanasInei.returnGeometry = true;
        queryManzanasInei.outFields = ['UBIGEO', 'ID_MZN_C'];

        // query predios sin manzana
        let queryPrediosSinManzana = new Query();
        queryPrediosSinManzana.where = self._webmap.findLayerById(_id_predio_sin_mz).definitionExpression;
        // generate buffer as point_g 10 meter
        queryPrediosSinManzana.distance = 5;
        queryPrediosSinManzana.units = "meters";
        queryPrediosSinManzana.geometry = point_g;
        queryPrediosSinManzana.spatialRelationship = "contains";
        queryPrediosSinManzana.returnGeometry = true;
        queryPrediosSinManzana.outFields = ['COD_PRE'];

        // query promises
        const promiseManzanas = self._webmap.findLayerById(_id_mz_pred).queryFeatures(queryManzanas)
        const promiseManzanasPuntoImagen = self._webmap.findLayerById(_id_mz_pimg).queryFeatures(queryManzanasPuntoImagen)
        const promiseManzanasInei = self._webmap.findLayerById(_id_mz_inei).queryFeatures(queryManzanasInei)
        const promisePrediosSinManzana = self._webmap.findLayerById(_id_predio_sin_mz).queryFeatures(queryPrediosSinManzana)

        evt.preventDefault();

        return Promise.all([promiseManzanas, promiseManzanasPuntoImagen, promiseManzanasInei, promisePrediosSinManzana])
          .then((results) => {
            const responseManzanas = results[0].features.map((row) => {
              // const oid = `${row.attributes.UBIGEO}${row.attributes.COD_SECT}${row.attributes.COD_MZN}`;
              const oid = row.attributes.ID_MZN_C;
              let status = 1
              if (self._graphicsIds[oid]) {
                self._view.graphics.remove(self._graphicsIds[oid])
                delete self._graphicsIds[oid]
                status = 0
              } else {
                let graphic = new Graphic({
                  geometry: row.geometry,
                  symbol: symbolSelectedPolygon
                });
                self._view.graphics.add(graphic);
                self._graphicsIds[oid] = graphic;
              }

              return {
                oid: oid,
                codigo: `${row.attributes.COD_SECT}-${row.attributes.COD_MZN}`,
                tipo: 'Manzana',
                fuente: 'CF',
                status: status
              }
            })

            const responseManzanasPuntoImagen = results[1].features.map((row) => {
              // const oid = `${row.attributes.ubigeo}${row.attributes.ID_MZN_U}`
              const oid = `I${row.attributes.ID_MZN_U}`
              let status = 1
              if (self._graphicsIds[oid]) {
                self._view.graphics.remove(self._graphicsIds[oid])
                delete self._graphicsIds[oid]
                status = 0
              } else {
                let graphic = new Graphic({
                  geometry: row.geometry,
                  symbol: symbolSelectedPolygon
                });
                self._view.graphics.add(graphic);
                self._graphicsIds[oid] = graphic;
              }
              return {
                oid: oid,
                codigo: `${row.attributes.ID_MZN_U}`,
                tipo: 'Manzana',
                fuente: 'CFA',
                status: status
              }
            })

            const responseManzanasInei = results[2].features.map((row) => {
              // const oid = `E${row.attributes.UBIGEO}${row.attributes.ID_MZN_C}`
              const oid = `E${row.attributes.ID_MZN_C}`
              let status = 1
              if (self._graphicsIds[oid]) {
                self._view.graphics.remove(self._graphicsIds[oid])
                delete self._graphicsIds[oid]
                status = 0
              } else {
                let graphic = new Graphic({
                  geometry: row.geometry,
                  symbol: symbolSelectedPolygon
                });
                self._view.graphics.add(graphic);
                self._graphicsIds[oid] = graphic;
              }
              return {
                oid: oid,
                codigo: `E${row.attributes.UBIGEO}${row.attributes.ID_MZN_C}`,
                tipo: 'Manzana',
                fuente: 'EU',
                status: status
              }
            })

            const responsePrediosSinManzana = results[3].features.map((row) => {
              const oid = `${row.attributes.COD_PRE}`
              let status = 1
              if (self._graphicsIds[oid]) {
                self._view.graphics.remove(self._graphicsIds[oid])
                delete self._graphicsIds[oid]
                status = 0
              } else {
                let graphic = new Graphic({
                  geometry: row.geometry,
                  symbol: symbolSelectedPoint
                })
                self._view.graphics.add(graphic);
                self._graphicsIds[oid] = graphic;
              }
              return {
                oid: oid,
                codigo: `${row.attributes.COD_PRE}`,
                tipo: 'Predio',
                fuente: 'CF',
                status: status
              };
            });

            let data = responseManzanas.concat(responseManzanasPuntoImagen).concat(responseManzanasInei).concat(responsePrediosSinManzana);
            // Aqui se debe enviar la data al componente tabla
            self._stateService.row.emit(data);
            self._fuseSplashScreenService.hide();
            self._stateService.setWebMap(self._webmap);
            self._stateService.setGraphicsId(self._graphicsIds);
            return data;

          })
          .catch((error) => {
            self._fuseSplashScreenService.hide();
            self._stateService.setWebMap(self._webmap);
            console.log(error)
          })
      }

      function enableCreatePoint(evt) {
        evt.currentTarget.classList.toggle('active')
        if (!evt.currentTarget.classList.contains('active')) {
          draw.reset();
          return
        }

        let action = draw.create("point");
        action.on("draw-complete", function (evt) {
          createPointGraphics(evt);
        });
      }

      this.pointButtonContainer.nativeElement.addEventListener('click', enableCreatePoint.bind(this));
      this.clearButtonContainer.nativeElement.addEventListener('click', self.clearSelection.bind(this));
      // this.createCargaContainer.nativeElement.addEventListener('click', createCargaTrabajo.bind(this));

      self._view.when(() => {
        // Filter layers by ubigeo
        _layersMap = self._webmap.allLayers
        self._webmap.findLayerById(_id_cf_sector).definitionExpression = this._queryUbigeo
        self._webmap.findLayerById(_id_cf_manzana_urb).definitionExpression = this._queryUbigeo
        self._webmap.findLayerById(_id_cf_manzana).definitionExpression = this._queryUbigeo
        self._webmap.findLayerById(_id_cf_parques).definitionExpression = this._queryUbigeo
        self._webmap.findLayerById(_id_cf_unidades_urbanas).definitionExpression = this._queryUbigeo
        self._webmap.findLayerById(_id_cf_lotes).definitionExpression = this._queryUbigeo
        self._webmap.findLayerById(_id_cf_arancel).definitionExpression = this._queryUbigeo
        self._webmap.findLayerById(_id_cf_numeracion).definitionExpression = this._queryUbigeo
        self._webmap.findLayerById(_id_cf_eje_vial).definitionExpression = this._queryUbigeo
        self._webmap.findLayerById(_id_cf_lotes_pun).definitionExpression = this._queryUbigeo
        self._webmap.findLayerById(_id_cf_predio).definitionExpression = this._queryUbigeo

        // Para el caso de las manzanas de predios se debe mantener la expresion definida desde portal y agregar el ubigeo
        // self._webmap.findLayerById(_id_mz_pred).definitionExpression += ` AND (${this._queryUbigeo})`
        self._webmap.findLayerById(_id_mz_pred).definitionExpression = this._queryUbigeo
        // console.log(self._webmap.findLayerById(_id_mz_pred).definitionExpression)
        self._webmap.findLayerById(_id_mz_pimg).definitionExpression += ` AND (${this._queryUbigeo})`
        self._webmap.findLayerById(_id_mz_inei).definitionExpression = this._queryUbigeo
        self._webmap.findLayerById(_id_carga).definitionExpression += ` AND (${this._queryUbigeo})`
        self._webmap.findLayerById(_id_predio_sin_mz).definitionExpression += ` AND (${this._queryUbigeo})`

        self._webmap.findLayerById(_id_lotes_sin_predio).definitionExpression = this._queryUbigeo
        self._webmap.findLayerById(_id_predios).definitionExpression += ` AND (${this._queryUbigeo})`
        self._webmap.findLayerById(_id_punto_imagen).definitionExpression = this._queryUbigeo
        self._webmap.findLayerById(_mz_asignadas).definitionExpression = this._queryUbigeo

        // zoom extent by ubigeo
        let limites_nacionales_url = self._webmap.findLayerById(_id_limites).url

        query.executeForExtent(`${limites_nacionales_url}/2`, { where: this._queryUbigeo }).then((response) => {
          self._view.goTo(response.extent);
          homeButton.viewpoint = {
            targetGeometry: response.extent,
          };
          this._fuseSplashScreenService.hide();

          self._stateService.setWebMap(self._webmap);
        }).catch((error) => {
          console.log('EsriLoader: ', error);
        });
      });

    } catch (error) {
      console.log('EsriLoader: ', error);
    }
  }
}
