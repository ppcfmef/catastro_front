/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/naming-convention */
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StateService } from '../../services/state.service';
import { UserService } from 'app/core/user/user.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription, Subject } from 'rxjs';
import { User } from 'app/core/user/user.types';
import { FuseSplashScreenService } from '@fuse/services/splash-screen';
import { takeUntil } from 'rxjs/operators';
import { loadModules } from 'esri-loader';




@Component({
    selector: 'app-assign-load',
    templateUrl: './assign-load.component.html',
    styleUrls: ['./assign-load.component.scss'],
})
export class AssignLoadComponent implements OnInit, AfterViewInit {

    _currentUserUbigeo: string;
    _queryUbigeo: string;
    _field_ubigeo = 'UBIGEO';
    _unsubscribeAll: Subject<any> = new Subject<any>();
    tableData: any;
    webMapData: any;
    graphicsIdsData: any;
    ubigeoSubscription: Subscription;
    tableDataSubscription: Subscription;
    webMapSubscription: Subscription;
    graphicsIdSubscription: Subscription;
    user: boolean = true;
    cards = [
        {
            num: 21,
            text: 'MANZANAS ASIGNADAS ACTUALMENTE'
        },
        {
            num: 25,
            text: 'TICKETS ATENDIDOS'
        }
    ];
    form: FormGroup;


    constructor(
        private _router: Router,
        private _stateService: StateService,
        private _userService: UserService,
        protected _fuseSplashScreenService: FuseSplashScreenService,
    ) {
        this.form = new FormGroup({
            loadName: new FormControl(''),
            description: new FormControl('')
        });

    }

    ngOnInit(): void {
        this._userService.user$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((user: User) => {
                // @SETUBIGEO
                this._currentUserUbigeo = user.ubigeo ? user.ubigeo : '040703';
                this._queryUbigeo = `${this._field_ubigeo} = '${this._currentUserUbigeo}'`;
            });

        // Suscríbete al BehaviorSubject para datos de la tabla
        this.tableDataSubscription = this._stateService.getTableData().subscribe(data => {
            this.tableData = data;
        });

        this.webMapSubscription = this._stateService.getWebMap().subscribe(webMap => {
            this.webMapData = webMap;
        });

        this.graphicsIdSubscription = this._stateService.getGraphicsId().subscribe(graphicsId => {
            this.graphicsIdsData = graphicsId;
        })


    }

    ngAfterViewInit(): void {
    }

    redirecto(): void {
        console.log('redirect'); this._router.navigate(['/land-inspection/assignment-of-load']);
        this._stateService.state.emit(false);

    }

    async createWorkLoad() {
        // params
        const dataWorkLoad = this.tableData;
        const nameWorkLoad = this.form.value.loadName
        const descWorlLoad = this.form.value.description
        const ubigeo = this._currentUserUbigeo
        const graphicsId = this.graphicsIdsData
        const webMap = this.webMapData
        const dateWorkLoad = new Date(2023, 7, 17).valueOf() // Reemplazar cuando se tenga el servicio de operador de campo
        const codUserWorkLoad = 'defaultUser'  // Reemplazar cuando se tenga el servicio de operador de campo
        const nomUserWorkLoad = 'defaultUser'  // Reemplazar cuando se tenga el servicio de operador de campo
        const id_carga = "carto_asignacion_carga_8124"


        try {
            const [
                Query,
                query,
                Extent,
                webMercatorUtils,
                Graphic,
                Polygon
                // esriConfig
            ] = await loadModules([
                'esri/rest/support/Query',
                'esri/rest/query',
                'esri/geometry/Extent',
                'esri/geometry/support/webMercatorUtils',
                'esri/Graphic',
                'esri/geometry/Polygon'
                // 'esri/config',
            ]);
            this._fuseSplashScreenService.show(0)


            let xmin = Infinity;
            let ymin = Infinity;
            let xmax = -Infinity;
            let ymax = -Infinity;

            // check graphicsId is null
            if (graphicsId === null) {
                return
            }

            // check graphicsId is empty
            if (Object.keys(graphicsId).length === 0) {
                return
            }
            for (let key in graphicsId) {
                if (graphicsId.hasOwnProperty(key)) {
                    let graphic = graphicsId[key];
                    let extent = { xmin: 0, ymin: 0, xmax: 0, ymax: 0 }
                    if (graphic.geometry.type === 'point') {
                        extent = {
                            xmin: graphic.geometry.x - 5,
                            ymin: graphic.geometry.y - 5,
                            xmax: graphic.geometry.x + 5,
                            ymax: graphic.geometry.y + 5,
                        }
                    } else {
                        extent = graphic.geometry.extent;
                    }

                    xmin = Math.min(xmin, extent.xmin);
                    ymin = Math.min(ymin, extent.ymin);
                    xmax = Math.max(xmax, extent.xmax);
                    ymax = Math.max(ymax, extent.ymax);
                }
            }

            let fullExtent = new Extent({
                xmin: xmin,
                ymin: ymin,
                xmax: xmax,
                ymax: ymax,
                spatialReference: 102100
            });

            let fullExtent_g = webMercatorUtils.webMercatorToGeographic(fullExtent)

            let queryCarga = new Query();
            queryCarga.where = this._queryUbigeo
            queryCarga.outStatistics = [{
                onStatisticField: "COD_CARGA",
                outStatisticFieldName: "resultado",
                statisticType: "max"
            }];


            const getAttributesByWorkLoad = (response) => {
                let cod_carga = response.features[0].attributes.resultado
                if (!cod_carga) {
                    cod_carga = '00000'
                }
                let cod_carga_int = parseInt(cod_carga, 10);
                cod_carga_int = cod_carga_int + 1;
                cod_carga = cod_carga_int.toString().padStart(5, '0');

                let graphics = []
                let graphic = new Graphic();
                graphic.attributes = {
                    ID_CARGA: `${ubigeo}${cod_carga}`,
                    COD_CARGA: cod_carga,
                    COD_USUARIO: codUserWorkLoad,
                    NOM_CARGA: nameWorkLoad,
                    DESCRIP: descWorlLoad,
                    FEC_ENTREGA: dateWorkLoad,
                    ESTADO: 1,
                    UBIGEO: ubigeo,
                    XMIN: fullExtent_g.xmin,
                    YMIN: fullExtent_g.ymin,
                    XMAX: fullExtent_g.xmax,
                    YMAX: fullExtent_g.ymax,
                    NOM_USUARIO: nomUserWorkLoad
                };
                graphic.geometry = Polygon.fromExtent(fullExtent_g)
                graphics.push(graphic);
                return graphics
            }


            webMap.findLayerById(id_carga).queryFeatures(queryCarga)
                .then((response) => {
                    return getAttributesByWorkLoad(response)
                })
                .then((graphics) => {
                    return webMap.findLayerById(id_carga).applyEdits({ addFeatures: graphics })
                })
                .then((add, update, del) => {
                    console.log(add)
                    for (let key in dataWorkLoad) {
                        console.log(key)
                    }
                    this._fuseSplashScreenService.hide();
                })
                .catch((error) => {
                    this._fuseSplashScreenService.hide();
                    console.log(error)
                })
            // view.graphics.add(graphicExtent);
            // view.goTo(fullExtent_g);

        }
        catch (error) {
            console.log('EsriLoader: ', error);
        }


    }

}

