import { Component, OnInit, ViewChild, ElementRef, Query } from '@angular/core';
import { loadModules } from 'esri-loader';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.types';
import { FuseSplashScreenService } from '@fuse/services/splash-screen';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @ViewChild('mapViewAOL', { static: false }) mapViewAOLContainer: ElementRef;
  @ViewChild('polygonButton', { static: false }) polygonButtonContainer: ElementRef;
  // create string to the id of the map element that will be created

  // Properties of the map
  _portalUrl = 'https://ws.mineco.gob.pe/portaldf';
  _idWebMap = "66adf64572f7438c892056ad832ea39d";
  _layersMap = [];

  // Properties of the layers ids
  _id_limites = "limites_nacional_6496"
  _id_departamento = "limites_nacional_6496_0"
  _id_provincia = "limites_nacional_6496_1"
  _id_distrito = "limites_nacional_6496_2"
  _id_cf_sector = "CARTO_FISCAL_6033"
  _id_cf_manzana_urb = "CARTO_FISCAL_3571"
  _id_cf_manzana = "CARTO_FISCAL_8574"
  _id_cf_parques = "CARTO_FISCAL_4241"
  _id_cf_unidades_urbanas = "CARTO_FISCAL_9795"
  _id_cf_lotes = "CARTO_FISCAL_8149"
  _id_cf_arancel = "CARTO_FISCAL_8360"
  _id_cf_numeracion = "CARTO_FISCAL_9596"
  _id_cf_eje_vial = "CARTO_FISCAL_8524"
  _id_cf_lotes_pun = "CARTO_FISCAL_2829"
  _id_cf_predio = "CARTO_FISCAL_869"

  _queryUbigeo: string
  _field_ubigeo = "UBIGEO"


  // Properties app
  _currentUser: User;
  _currentUserUbigeo: string;
  _unsubscribeAll: Subject<any> = new Subject<any>();


  constructor(
    protected _fuseSplashScreenService: FuseSplashScreenService,
    private _userService: UserService
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
        this._currentUserUbigeo = this._currentUser.ubigeo ? this._currentUser.ubigeo : '150101';
        this._queryUbigeo = `${this._field_ubigeo} = '${this._currentUserUbigeo}'`
      });
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
        Graphic
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
        "esri/Graphic"
      ]);

      esriConfig.portalUrl = this._portalUrl;

      const webmap = new WebMap({
        portalItem: {
          id: this._idWebMap
        }
      });

      const view = new MapView({
        map: webmap,
        container: this.mapViewAOLContainer.nativeElement
      });

      const homeButton = new Home({
        view: view,
      })

      view.ui.add(homeButton, "top-left");

      const layerList = new LayerList({
        view: view
      });

      const layerListExpand = new Expand({
        expandIcon: "layers",
        view: view,
        content: layerList
      });

      view.ui.add(layerListExpand, "top-right");

      const basemapGallery = new BasemapGallery({
        view: view
      });

      const basemapGalleryExpand = new Expand({
        view: view,
        content: basemapGallery
      });

      const searchWidget = new Search({
        view: view
      });

      view.ui.add(searchWidget, {
        position: "top-left",
        index: 0
      });

      view.ui.add(basemapGalleryExpand, "top-right");

      view.ui.add(this.polygonButtonContainer.nativeElement, "top-left");
      // change stile of the button
      this.polygonButtonContainer.nativeElement.style = "visibility: visible;"

      const draw = new Draw({
        view: view
      });

      function createPolygonGraphic(vertices, state = null) {
        view.graphics.removeAll();
        let polygon = {
          type: "polygon", // autocasts as Polygon
          rings: vertices,
          spatialReference: view.spatialReference
        };

        let graphic = new Graphic({
          geometry: polygon,
          symbol: {
            type: "simple-fill", // autocasts as SimpleFillSymbol
            color: [4, 90, 141, 0.1],
            style: "solid",
            outline: {  // autocasts as SimpleLineSymbol
              color: "red",
              width: 4,
              // style: "short-dot",
            }
          }
        });
        view.graphics.add(graphic);
        if (state === 'draw-complete') {
          view.goTo(graphic.geometry.extent);
        }
      }

      function enableCreatePolygon(evt) {
        let action = draw.create("polygon");

        // PolygonDrawAction.vertex-add
        // Fires when user clicks, or presses the "F" key.
        // Can also be triggered when the "R" key is pressed to redo.
        action.on("vertex-add", function (evt) {
          createPolygonGraphic(evt.vertices);
        });

        // // PolygonDrawAction.vertex-remove
        // // Fires when the "Z" key is pressed to undo the last added vertex
        action.on("vertex-remove", function (evt) {
          createPolygonGraphic(evt.vertices);
        });

        // // Fires when the pointer moves over the view
        action.on("cursor-update", function (evt) {
          createPolygonGraphic(evt.vertices);
        });

        // Add a graphic representing the completed polygon
        // when user double-clicks on the view or presses the "Enter" key
        action.on("draw-complete", function (evt) {
          createPolygonGraphic(evt.vertices, 'draw-complete');
        });
      }

      this.polygonButtonContainer.nativeElement.addEventListener('click', enableCreatePolygon.bind(this));

      view.when(() => {
        // Filter layers by ubigeo
        this._layersMap = webmap.allLayers
        webmap.findLayerById(this._id_cf_sector).definitionExpression = this._queryUbigeo
        webmap.findLayerById(this._id_cf_manzana_urb).definitionExpression = this._queryUbigeo
        webmap.findLayerById(this._id_cf_manzana).definitionExpression = this._queryUbigeo
        webmap.findLayerById(this._id_cf_parques).definitionExpression = this._queryUbigeo
        webmap.findLayerById(this._id_cf_unidades_urbanas).definitionExpression = this._queryUbigeo
        webmap.findLayerById(this._id_cf_lotes).definitionExpression = this._queryUbigeo
        webmap.findLayerById(this._id_cf_arancel).definitionExpression = this._queryUbigeo
        webmap.findLayerById(this._id_cf_numeracion).definitionExpression = this._queryUbigeo
        webmap.findLayerById(this._id_cf_eje_vial).definitionExpression = this._queryUbigeo
        webmap.findLayerById(this._id_cf_lotes_pun).definitionExpression = this._queryUbigeo
        webmap.findLayerById(this._id_cf_predio).definitionExpression = this._queryUbigeo

        // zoom extent by ubigeo
        let limites_nacionales_url = webmap.findLayerById(this._id_limites).url

        query.executeForExtent(`${limites_nacionales_url}/2`, { where: this._queryUbigeo }).then((response) => {
          view.goTo(response.extent);
          homeButton.viewpoint = {
            targetGeometry: response.extent,
          };
          this._fuseSplashScreenService.hide();
        }).catch((error) => {
          console.log('EsriLoader: ', error);
        })
      });

    } catch (error) {
      console.log('EsriLoader: ', error);
    }
  }
}
