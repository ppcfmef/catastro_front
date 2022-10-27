import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { LandRegistryMap } from '../interfaces/land-registry-map.interface';
import { loadModules } from 'esri-loader';
import { CommonService } from 'app/core/common/services/common.service';

import { from } from 'rxjs';
import { LandOwner } from '../interfaces/land-owner.interface';
import { FormUtils } from 'app/shared/utils/form.utils';
import { I } from '@angular/cdk/keycodes';
@Injectable({
  providedIn: 'root'
})
export class LandRegistryMapService {

  public _landIn = new Subject<LandRegistryMap>();
  public _landOut = new Subject<LandRegistryMap>();
  public _ubigeo: Subject<string> = new Subject();

  public _gestionPredios: Subject<LandRegistryMap> = new Subject();
  public _estado: Subject<string> = new Subject();
  public _print: Subject<any>= new Subject();


  layersInfo = [


     {

         id: 0,
         idServer: 0,
         urlBase:
             'https://ws.mineco.gob.pe/serverdf/rest/services/pruebas/CARTO_FISCAL_17/MapServer',
             utm: 17,

     },

     {

        id: 1,
        idServer: 0,
        urlBase:
            'https://ws.mineco.gob.pe/serverdf/rest/services/pruebas/CARTO_FISCAL_18/MapServer',
            utm: 18,

    },

    {

        id: 2,
        idServer: 0,
        urlBase:
            'https://ws.mineco.gob.pe/serverdf/rest/services/pruebas/CARTO_FISCAL_19/MapServer',
            utm: 19,

    },



 ];




  constructor(private _commonService: CommonService,) {
  }

    set landIn(value: LandRegistryMap){
        this._landIn.next(value);
    }

    get landIn$(): Observable<LandRegistryMap>{
        return this._landIn.asObservable();
    }


    set landOut(value: LandRegistryMap){
        this._landOut.next(value);
    }

    get landOut$(): Observable<LandRegistryMap>{
        return this._landOut.asObservable();
    }

    createCpu(value: LandRegistryMap): Observable<LandRegistryMap> {

         const o  = new Subject<LandRegistryMap>();
         o.next(value);

        if(value.cup) {
          return o.asObservable();
        }
/*
        else if(!value.rangCup){
            return o.asObservable();
        }
        else if( value.rangCup==='0' || value.rangCup==='00000000'){
            return o.asObservable();
        }*/

        else{
            return from(this.generateMaxCPU(value));
        }


    }

    set gestionPredios(value: LandRegistryMap){
        this._gestionPredios.next(value);
    }


    get gestionPredios$(): Observable<LandRegistryMap>{
        return this._gestionPredios.asObservable();



    }


    getEstado(): Observable<any>{
        return this._estado.asObservable();
    }


    setEstado(value: string): void {
        this._estado.next(value);
    }


    emitPrint(land: LandRegistryMap, owner: LandOwner): void{
        const inputs ={
            land: land,
            owner: owner
        };
        this._print.next(inputs);
    }

    getPrint(): Observable<any>{
        return this._print.asObservable();
    }


   async generateMaxCPU( value: LandRegistryMap): Promise<LandRegistryMap>{

    const [

        // eslint-disable-next-line @typescript-eslint/naming-convention
        FeatureLayer,

    ] = await loadModules([

        'esri/layers/FeatureLayer',

    ]);

        const ubigeo = (value && value.ubigeo)?value.ubigeo:'150101';




        const district =await this._commonService.getDistrictResource(ubigeo).toPromise();
        const utm=district.resources[0].utm;

        const layerInfo=this.layersInfo.find(e=>e.utm === utm);
        const url=`${layerInfo.urlBase}/${layerInfo.idServer}`;

        const layer = new FeatureLayer(url);

        const query = layer.createQuery();
        console.log('ubigeo>>',value.ubigeo);
        console.log('rangCup>>',value.rangCup);

        if(value.ubigeo && value.rangCup && parseInt(value.rangCup,10)>0 ){
            query.where = `UBIGEO='${value.ubigeo}' and RAN_CPU='${value.rangCup}'`;

            const maxCPUStatistics={
                onStatisticField: 'COD_CPU',  // service field for 2015 population
                outStatisticFieldName: 'max_COD_CPU',
                statisticType: 'max'

            };

            const maxIDPREDIOStatistics={
                onStatisticField: 'ID_PRED',  // service field for 2015 population
                outStatisticFieldName: 'max_ID_PRED',
                statisticType: 'max'

            };


        query.outStatistics = [ maxCPUStatistics ,maxIDPREDIOStatistics];




        const response=await layer.queryFeatures(query);

    const stats = response.features[0].attributes;
    console.log('Max cpu:' ,stats.max_COD_CPU);
    //const rangCPU=stats.max_COD_CPU.substring(0,8);
    const rangCPU=value.rangCup;

    //console.log('stats.max_COD_CPU.substring(8,12)',stats.max_COD_CPU.substring(8,12));
    //const unidadImb=stats.max_COD_CPU.substring(8,12) && stats.max_COD_CPU.substring(8,12)!=='NaNN'?stats.max_COD_CPU.substring(8,12):'0000';
    let unidadImbNew = '0001';
    if(response.features.length>0){
        const unidadImb=stats.max_COD_CPU.split('-')[1];
        unidadImbNew = FormUtils.zeroPad(parseInt(unidadImb,10)+1,4);
    }


    const factores=[2, 3, 4, 5, 6, 7, 2, 3, 4, 5, 6, 7];

    const temp=`${rangCPU}${unidadImbNew}`.split('').reverse().join('');

    /* eslint-disable @typescript-eslint/prefer-for-of */
    let s=0;
    for(let i=0;i< temp.length ;i++){
        s=parseInt(temp[i],10)*factores[0]+s;
    }
    /* eslint-enable @typescript-eslint/prefer-for-of */
    //let v = 11-s%11;
    const v=([11,10].includes(s%11))?s%11: 11-s%11;


    //const maxCPU =(stats.max_COD_CPU)? parseInt(stats.max_COD_CPU, 10) +1 :1;
    const maxCPU =`${rangCPU}-${unidadImbNew}-${v}`;


    const idPRED =(stats.max_ID_PRED)? parseInt(stats.max_ID_PRED, 10) +1 :1;
    //value.cup = maxCPU.toString();
    value.cup = maxCPU;
    value.idLandCartographic = idPRED.toString();
        }


return value;

   }



}
