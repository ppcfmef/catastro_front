import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { LandRegistryMap } from '../interfaces/land-registry-map.interface';
import { loadModules } from 'esri-loader';
import { CommonService } from 'app/core/common/services/common.service';

import { from } from 'rxjs';
import { LandOwner } from '../interfaces/land-owner.interface';
import { FormUtils } from 'app/shared/utils/form.utils';
import { I } from '@angular/cdk/keycodes';
import { PredioService } from 'app/modules/admin/predial-inspection/gap-analysis/services/predio.service';



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

  public _eventCancel: Subject<any> = new Subject();

  constructor(private _commonService: CommonService ) {
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

    set gestionPredios(value: LandRegistryMap){
        this._gestionPredios.next(value);
    }


    get gestionPredios$(): Observable<LandRegistryMap>{
        return this._gestionPredios.asObservable();

    }

   /* createCpu(value: LandRegistryMap): Observable<LandRegistryMap> {

         const o  = new Subject<LandRegistryMap>();
         o.next(value);

        if(value.cup) {
          return o.asObservable();
        }

        else{


            return from(this.generateMaxCPU(value));
        }


    }


    createSecuencia(value: LandRegistryMap): Observable<LandRegistryMap> {

        const o  = new Subject<LandRegistryMap>();
        o.next(value);

       if(value.cup) {
         return o.asObservable();
       }

       else{
           return from((value));
       }


   }

   */


    getEstado(): Observable<any>{
        return this._estado.asObservable();
    }


    setEstado(value: string): void {
        this._estado.next(value);
    }

    getEventCancel(): Observable<any> {
        return this._eventCancel.asObservable();
    }


    setEventCancel(value: boolean): void {
        this._eventCancel.next(value);
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

/*
   async generateMaxCPU( value: LandRegistryMap): Promise<LandRegistryMap>{

    const [

       
        FeatureLayer,

    ] = await loadModules([

        'esri/layers/FeatureLayer',

    ]);

        const ubigeo = (value && value.ubigeo)?value.ubigeo:'150101';




        const district =await this._commonService.getDistrictResource(ubigeo).toPromise();
        const utm=district.resources[0].utm;

        //const layerInfo=this.layersInfo.find(e=>e.utm === utm);
        const layerInfo=this.layersInfo[0];
        const url=`${layerInfo.urlBase}/${layerInfo.idServer}`;

        const layer = new FeatureLayer(url);

        const query = layer?.createQuery();
        const query2 = layer?.createQuery();

        if(value.ubigeo && value.rangCup && parseInt(value.rangCup,10)>0 ){
            query.where = `UBIGEO='${value.ubigeo}' and RAN_CPU='${value.rangCup}'`;
            query2.where = `UBIGEO='${value.ubigeo}'`;

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


        query.outStatistics = [ maxCPUStatistics ];
        query2.outStatistics = [ maxIDPREDIOStatistics];



        const response=await layer?.queryFeatures(query);
        const response2=await layer?.queryFeatures(query2);
    const stats = response.features[0].attributes;
    const stats2 = response2.features[0].attributes;
    const rangCPU=value.rangCup;
    let unidadImbNew = '0001';
    if(response.features.length>0 && stats.max_COD_CPU && stats.max_COD_CPU!==null ){
        const unidadImb=stats.max_COD_CPU.split('-')[1];
        unidadImbNew = FormUtils.zeroPad(parseInt(unidadImb,10)+1,4);
    }


    const factores=[2, 3, 4, 5, 6, 7, 2, 3, 4, 5, 6, 7];

   
    let s=0;
    for(let i=0;i< temp.length ;i++){
        s=parseInt(temp[i],10)*factores[i]+s;
    }
    
    let v=([11,10].includes(s%11))?s%11: 11-s%11;
    v= (v>9)?11-(v):v;

    const maxCPU =`${rangCPU}-${unidadImbNew}-${v}`;


    const idPRED =(stats2.max_ID_PRED)? parseInt(stats2.max_ID_PRED, 10) +1 :1;
    value.cup = maxCPU;
    value.idLandCartographic = idPRED.toString();
        }

return value;

   }
*/


}
