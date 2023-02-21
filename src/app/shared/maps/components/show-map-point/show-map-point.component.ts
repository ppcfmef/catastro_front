import { Coordinates } from '../../maps.type';
import {
    AfterViewInit,
    Component,
    ElementRef,
    Input,
    OnInit,
    ViewChild,
    OnChanges,
    OnDestroy,
} from '@angular/core';
import { loadModules } from 'esri-loader';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { LandRecordService } from 'app/modules/admin/lands/land-registry/services/land-record.service';
import { LandRecord } from 'app/modules/admin/lands/land-registry/interfaces/land-record.interface';
import moment from 'moment';
import { CommonService } from 'app/core/common/services/common.service';
import { UserService } from 'app/core/user/user.service';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User } from 'app/core/user/user.types';
import { DistrictResource } from 'app/core/common/interfaces/common.interface';
import { LandOwner } from 'app/modules/admin/lands/land-registry/interfaces/land-owner.interface';
@Component({
    selector: 'app-show-map-point',
    templateUrl: './show-map-point.component.html',
    styleUrls: ['./show-map-point.component.scss'],
})
export class ShowMapPointComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
    @Input() landOwner: LandOwner;
    @Input() landRecord: LandRecord;
    @Input() points: Coordinates[] = [
        { latitude: -13.53063, longitude: -71.955921 },
        { latitude: -13.54, longitude: -71.955921 },
    ];
    @ViewChild('mapViewNode', { static: true }) private mapViewEl: ElementRef;



    title = 'Gestor Cartográfico';
    view: any = null;
    map: any;
    user: User;
    _unsubscribeAll: Subject<any> = new Subject<any>();
    simpleMarkerSymbol = {
        type: 'picture-marker', // autocasts as new PictureMarkerSymbol()
        url: '/assets/images/map/location2.png',
        width: '20px',
        height: '30px',
    };

    layersInfo = [
      /*  {
            idServer: 0,
            title: 'Zona 17',
            id: 0,
            urlBase:
                'https://ws.mineco.gob.pe/serverdf/rest/services/pruebas/CARTO_FISCAL_17/MapServer',
            order: 0,
            featureLayer: null,
            definitionExpression: '1=1',
            featureTable: null,
            popupTemplate: null,
            legend: null,
            sublayers: 'all',
        },

        {
            idServer: 0,
            title: 'Zona 18',
            id: 0,
            urlBase:
                'https://ws.mineco.gob.pe/serverdf/rest/services/pruebas/CARTO_FISCAL_18/MapServer',
            order: 0,
            featureLayer: null,
            definitionExpression: '1=1',
            featureTable: null,
            popupTemplate: null,
            legend: null,
            sublayers: 'all',
        },

        {
            idServer: 0,
            title: 'Zona 19',
            id: 0,
            urlBase:
                'https://ws.mineco.gob.pe/serverdf/rest/services/pruebas/CARTO_FISCAL_19/MapServer',
            order: 0,
            featureLayer: null,
            definitionExpression: '1=1',
            featureTable: null,
            popupTemplate: null,
            legend: null,
            sublayers: 'all',
        },
*/

{
    title: 'Cartografia Fiscal',
    id: 0,
    idServer: 0,
    urlBase:
        'https://ws.mineco.gob.pe/serverdf/rest/services/pruebas/CARTO_FISCAL/MapServer',
    order: 0,
    featureLayer: null,
    definitionExpression: '1=1',
    featureTable: null,
    popupTemplate: null,
    legend: null,
    sublayers: 'all',
},

        {
            idServer: 0,
            title: 'Actualizacion Cartográfica',
            id: 0,
            urlBase:
                'https://ws.mineco.gob.pe/serverdf/rest/services/ACTUALIZACION/CARTO_ACT/MapServer',
            order: 0,
            featureLayer: null,
            definitionExpression: '1=1',
            featureTable: null,
            popupTemplate: null,
            legend: null,
            sublayers: [
                {id:0,
                  visible:true,
                  title:'ACT_ARANCEL'
                },
                {id:1,
                    visible:true,
                    title:'ACT_MANZANA'
                },
            ],
        },

        {
            idServer: 0,
            title: 'Gestion de Predios',
            id: 0,
            urlBase:
                'https://ws.mineco.gob.pe/serverdf/rest/services/pruebas/GESTION_DE_PREDIOS/MapServer',
            order: 0,
            featureLayer: null,
            definitionExpression: '1=1',
            featureTable: null,
            popupTemplate: null,
            legend: null,
            sublayers: [
                {id:0,
                    visible:true,
                    title:'TB_PUNTO_IMG'
                }
            ],
        },
    ];
    subscription: Subscription;
    constructor(
        private _landRecordService: LandRecordService,
        private _commonService: CommonService,
        private _userService: UserService
    ) {}
    ngOnDestroy(): void {

        this.subscription.unsubscribe();
        //this._landRecordService.setLandRecordDownloadCroquis(false);
        //throw new Error('Method not implemented.');
    }

    ngOnInit(): void {
        this.subscription   =this._landRecordService
            .getLandRecordDownloadCroquis()
            .subscribe((res: boolean) => {
                if (res) {
                    this.downloadPDF();
                }
            });

        this._userService.user$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((user: User) => {
                this.user = user;
                const ubigeo =
                    this.user.placeScope && this.user.placeScope.ubigeo
                        ? this.user.placeScope.ubigeo
                        : '150101';
                /* this._commonService
            .getDistrictResource(ubigeo)
            .subscribe((data: DistrictResource) => {



            });*/
            });
    }

    ngAfterViewInit(): void {
        //this.points=[{latitude: -13.53063, longitude: -71.955921}] ;
        setTimeout(() => {
            this.initializeMap();
        }, 1000);
    }

    ngOnChanges(): void {
        if (this.view) {
            this.addPoints(this.points);
        }
    }
    /* eslint-disable @typescript-eslint/naming-convention */
    async initializeMap(): Promise<void> {
        try {
            const container = this.mapViewEl.nativeElement;

            const [
                // eslint-disable-next-line @typescript-eslint/naming-convention
                Map,
                // eslint-disable-next-line @typescript-eslint/naming-convention
                MapView,
                // eslint-disable-next-line @typescript-eslint/naming-convention
                Graphic,
                // eslint-disable-next-line @typescript-eslint/naming-convention
                GraphicsLayer,
                // eslint-disable-next-line @typescript-eslint/naming-convention
                MapImageLayer,
                Expand,
                BasemapGallery,
                LayerList
            ] = await loadModules([
                'esri/Map',
                'esri/views/MapView',
                'esri/Graphic',
                'esri/layers/GraphicsLayer',
                'esri/layers/MapImageLayer',
                'esri/widgets/Expand',
                'esri/widgets/BasemapGallery',
                'esri/widgets/LayerList',
            ]);

            const mapProperties = {
                basemap: 'streets-vector',
            };

            this.map = new Map(mapProperties);

            const mapViewProperties = {
                container: this.mapViewEl.nativeElement,
                zoom: 18,

                map: this.map,
            };

            this.view = new MapView(mapViewProperties);



            this.layersInfo.reverse().forEach(async (l) => {
                let options: any = {};

                if (l.sublayers === 'all'){
                    options = {
                        url : l.urlBase,
                    };
                }

                else {
                    options = {
                        url : l.urlBase,
                        sublayers: l.sublayers
                    };
                }

                const mapImageLayer = new MapImageLayer(options);

                this.map.add(mapImageLayer);

                const urlLegend = l.urlBase + '/legend?f=pjson';
                const response = await fetch(urlLegend);
                const legendLayers: any = await response.json();
                l.legend = legendLayers;
                /*const layers: any[]=infoLayers.layers;*/
            });

          /*  const screenshotDiv = document.getElementById('screenshotDiv');*/


            const basemapGallery = new BasemapGallery({
                view: this.view,
            });



            const baseMapGalleryExpand = new Expand({
                view: this.view,
                content: basemapGallery,
                id: 'mapGalleryBase',
                group: 'bottom-right',
            });

            const layerList = new LayerList({
                view: this.view,
            });

            const layerListExpand = new Expand({
                view: this.view,
                content: layerList,
                id: 'maplayerListExpand',
                group: 'bottom-right',
            });


            this.view.when(() => {
                this.addPoints(this.points);
                this.view.ui.add([baseMapGalleryExpand, layerListExpand], {
                    position: 'top-right',
                });
            });
        } catch (error) {
            console.error('EsriLoader: ', error);
        }
    }

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    async addPoints(inputPoints: Coordinates[] = []): Promise<void> {
        const [
            // eslint-disable-next-line @typescript-eslint/naming-convention
            Map,
            // eslint-disable-next-line @typescript-eslint/naming-convention
            MapView,
            // eslint-disable-next-line @typescript-eslint/naming-convention
            Graphic,
            // eslint-disable-next-line @typescript-eslint/naming-convention
            GraphicsLayer,
            // eslint-disable-next-line @typescript-eslint/naming-convention
            MapImageLayer,
        ] = await loadModules([
            'esri/Map',
            'esri/views/MapView',
            'esri/Graphic',
            'esri/layers/GraphicsLayer',
            'esri/layers/MapImageLayer',
        ]);

        this.view.graphics.removeAll();
        if (inputPoints.length > 0) {
            const x = inputPoints[0].longitude;
            const y = inputPoints[0].latitude;
            this.view.center = [x, y];
            inputPoints.forEach((inputPoint: Coordinates) => {
                const point = {
                    //Create a point
                    type: 'point',
                    longitude: inputPoint.longitude,
                    latitude: inputPoint.latitude,
                };
                const pointGraphic = new Graphic({
                    geometry: point,
                    symbol: this.simpleMarkerSymbol,
                });
                this.view.graphics.addMany([pointGraphic]);
            });
        }
    }

    async downloadPDF(): Promise<void> {
        const _districtResource: DistrictResource = await this._commonService
            .getDistrictResource(this.landRecord.ubigeo)
            .toPromise();
        const utm = _districtResource?.resources[0]?.utm;

        const legendJson = [];

        this.layersInfo
            .filter(l => l.title.includes(utm.toString()))
            .forEach((l) => {
                const legendLayers = l.legend.layers;
                legendLayers.forEach((lf) => {
                    const layerName = lf.layerName;
                    const legend = lf.legend[0];
                    const imageData = legend.imageData;
                    legendJson.push({ layerName, imageData });
                });
            });

        console.log('legendJson>>', legendJson);

        const doc = new jsPDF();
        const data: any = document.getElementById('divDownloadPDF');
        const options = {
            background: 'white',
            scale: 3,
        };

        autoTable(doc, {
            theme: 'grid',
            styles: {
                overflow: 'hidden',
                lineWidth: 0,
            },
            body: [
                [
                    {
                        content: 'FICHA DE PREDIO - CATASTRO FISCAL',
                        colSpan: 2,
                        styles: { halign: 'center' },
                    },
                ],

                [
                    {
                        content: `MUNICIPALIDAD DE ${_districtResource.name} UBIGEO  ${this.landRecord.ubigeo}`,
                        colSpan: 2,
                        styles: { halign: 'center' },
                    },
                ],

                [
                    { content: `Fecha ${moment().format('DD/MM/YYYY')}` },
                    { content: `Usuario ${this.user.name}` },
                ],

                [
                    {
                        content: `Código Predial Único: ${this.landRecord.cup?this.landRecord.cup:''}`,
                        colSpan: 2,
                    },
                ],
                [
                    {
                        content: `Código de Predio Municipal: ${this.landRecord.cpm?this.landRecord.cpm:''}`,
                        colSpan: 2,
                    },
                ],
                [
                    {
                        content: `Identificador geográfico: ${this.landRecord.municipalNumber?this.landRecord.municipalNumber:''}`,
                        colSpan: 2,
                    },
                ],
                [
                    {
                        content: `Contribuyente: ${this.landOwner?.name} ${this.landOwner?.paternalSurname} ${this.landOwner?.maternalSurname}`,
                        colSpan: 2,
                    },
                ],
                [{ content: `RUC / DNI: ${this.landOwner?.dni}`, colSpan: 2 }],
                [
                    {
                        content: `Área terreno: ${this.landRecord?.landArea} mt2  `,
                        colSpan: 2,
                    },
                ],
                [{ content: 'Área Construida:  mt2', colSpan: 2 }],
            ],
        });

        const screenshot = await this.view.takeScreenshot({
            format: 'jpg',
            quality: 100,
        });

        doc.addImage(screenshot.dataUrl, 'JPEG', 35, 100, 135, 75);
        const x: number = 35;
        const y: number = 185;
        const bodyLegend = [];

        const columns = 3;
        let array1 = [];

        // eslint-disable-next-line @typescript-eslint/no-shadow
        legendJson.forEach((l, i) => {
            array1 = array1.concat([{ content: '' }, { content: l.layerName }]);
            // eslint-disable-next-line eqeqeq
            if (i + 1 === legendJson.length || (i + 1) % columns === 0) {
                //array1  = array1.concat([{'content':''},{'content':l.layerName}]);
                bodyLegend.push(array1);
                array1 = [];
                //bodyLegend.push([{'content':''},{'content':l.layerName}]);
            } else {
                //array1  = array1.concat([{'content':''},{'content':l.layerName}]);
            }

            /*const l =[{'content':''},{'content':l.layerName}];*/

            /*doc.addImage(`data:image/jpeg;base64,${l.imageData}`, 'JPEG', x,y+i*5,4,4);
        doc.text(l.layerName, x+10,y+i*5);*/
        });

        console.log('bodyLegend>>>', bodyLegend);
        let i = 0;
        autoTable(doc, {
            theme: 'grid',
            startY: y,
            body: bodyLegend,
            columnStyles: {
                0: { cellWidth: 10 },
                1: { cellWidth: 50 },
                2: { cellWidth: 10 },
                3: { cellWidth: 50 },
                4: { cellWidth: 10 },
                5: { cellWidth: 50 },
                // etc
            },

            styles: {
                overflow: 'hidden',
                lineWidth: 0,
                //lineColor: [217, 216, 216]
            },
            // eslint-disable-next-line @typescript-eslint/no-shadow
            didDrawCell: (data: any) => {
                if (data.section === 'body' && data.column.index % 2 === 0) {
                    if (i + 1 <= legendJson.length) {
                        const base64Img = `data:image/jpeg;base64,${legendJson[i].imageData}`;
                        doc.addImage(
                            base64Img,
                            'JPEG',
                            data.cell.x + 2,
                            data.cell.y + 2,
                            4,
                            4
                        );
                    }

                    i = i + 1;
                }
            },
        });

        doc.save('Ficha de Predio.pdf');
    }

    takeFhoto(): void {
        this.view.takeScreenshot().then((screenshot) => {
            const imageElement: any =
                document.getElementById('screenshotImage');
            console.log('screenshot.dataUrl>>', screenshot.dataUrl);
            imageElement.src = screenshot.dataUrl;
        });
    }
}
