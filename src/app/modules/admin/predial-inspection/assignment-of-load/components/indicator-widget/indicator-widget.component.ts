/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { loadModules } from 'esri-loader';
import { PuntoCampoService } from '../../../gap-analysis/services/punto-campo.service';
import { StateService } from '../../services/state.service';
@Component({
    selector: 'app-indicator-widget',
    templateUrl: './indicator-widget.component.html',
    styleUrls: ['./indicator-widget.component.scss']
})
export class IndicatorWidgetComponent implements OnInit {

    newCard =[];

    constructor(
        private _stateService: StateService,
    ) {

     }

    ngOnInit(): void {
        this.listWidget();
        this._stateService.updatewidget.subscribe( (state) => {
            if(state) {
                this.listWidget();
            }
        });
        this._stateService.stateRowdeleted.subscribe((state) => {
            if(state){
                this.listWidget();
            }
        });

    }

    async listWidget(): Promise<void> {
        try {
            const [ newQuery,query] = await loadModules([ 'esri/rest/support/Query','esri/rest/query']);

            const urlDetailWorkLoad = 'https://ws.mineco.gob.pe/serverdf/rest/services/pruebas/CAPAS_INSPECCION_AC/MapServer/6';
            const ubigeo = '040703';

            const queryStats = new newQuery();
            queryStats.where = `UBIGEO= '${ubigeo}'`;
            queryStats.outFields = ['*'];
            queryStats.returnGeometry = false;

            query.executeQueryJSON(urlDetailWorkLoad, queryStats)
                .then((response) => {
                    if (response.features.length > 0) {
                        // aqui estan las estadisticas
                        const dataTable = response.features[0].attributes;
                        const statsNames = {
                            'MA': 'MANZANAS DE ACTUALIZACIÓN',
                            'MAP': 'MANZANAS ASIGNADAS PENDIENTES',
                            'MEU': 'MANZANAS (EXPANSION URBANA)',
                            'MVC': 'MANZANAS VERIFICABLES EN CAMPO',
                            'OC': 'OPERADORES DE CAMPO',
                            'PAP': 'PREDIOS ASIGNADOS PENDIENTES',
                            'PLAP': 'PUNTOS LOTES ASIGNADOS PENDIENTES',
                        };
                        const transformedArray = [];

                        for (const [key, value] of Object.entries(dataTable)) {
                            if (key !== 'row_id' && key !== 'UBIGEO') {
                                transformedArray.push({ num: value ? value : 0, text: statsNames[key], });
                            }
                        }
                        this.newCard = [...transformedArray];
                        return;
                    }
                    return Promise.reject('No se encontró la carga');
                })
                .catch((error) => {
                    // Aqui se muestran los posibles errores
                    console.log(error);
                });

        }
        catch (error) {
            console.log('EsriLoader: ', error);
        }
    }
}
