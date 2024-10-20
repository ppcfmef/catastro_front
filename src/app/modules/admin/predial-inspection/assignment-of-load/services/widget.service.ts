/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { loadModules } from 'esri-loader';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'root'
})
export class WidgetService {



    private dataWidget = new BehaviorSubject<any>(null);
    constructor(
    ) {
    }
    setDataWidget(data): void {
        this.dataWidget.next(data);
    }

    getDataWidget(): Observable<any> {
        return this.dataWidget.asObservable();
    }


    async listWidget(ubigeo): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const [newQuery, query] = await loadModules(['esri/rest/support/Query', 'esri/rest/query']);
                const urlDetailWorkLoad = `${environment.apiUrlArcGisServer}/pruebas/CAPAS_INSPECCION_AC/MapServer/6`;
                const queryStats = new newQuery();
                queryStats.where = `UBIGEO= '${ubigeo}'`;
                queryStats.outFields = ['*'];
                queryStats.returnGeometry = false;

                const response = await query.executeQueryJSON(urlDetailWorkLoad, queryStats);
                if (response.features.length > 0) {
                    // aqui estan las estadisticas
                    const transformedArray = [];
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

                    for (const [key, value] of Object.entries(dataTable)) {
                        if (key !== 'row_id' && key !== 'UBIGEO' && key !== 'OC') {
                            transformedArray.push({ num: value ? value : 0, text: statsNames[key], });
                        }
                    }
                    this.setDataWidget(transformedArray);
                    return resolve(transformedArray);

                }
                return reject('No se encontró la carga');
            }
            catch (error) {
                console.log('EsriLoader: ', error);
            }
        });
    }


    widgetUser(ubigeo, codUser): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const [newQuery, query] = await loadModules(['esri/rest/support/Query', 'esri/rest/query']);
                const urlStatsUser = `${environment.apiUrlArcGisServer}/pruebas/CAPAS_INSPECCION_AC/MapServer/7`;
                const queryStatsUser = new newQuery();
                queryStatsUser.where = `UBIGEO = '${ubigeo}' AND COD_USUARIO = ${codUser}`;
                queryStatsUser.outFields = ['*'];
                queryStatsUser.returnGeometry = false;

                const response = await query.executeQueryJSON(urlStatsUser, queryStatsUser);
                const statsUser = { pending: 0, attended: 0 };
                if (response.features.length > 0) {
                    statsUser.pending = response.features[0].attributes.PENDIENTE;
                    statsUser.attended = response.features[0].attributes.ATENDIDO;
                }

                return resolve(statsUser);

            }
            catch (error) {
                console.log('EsriLoader: ', error);
            }
        });
    }
}
