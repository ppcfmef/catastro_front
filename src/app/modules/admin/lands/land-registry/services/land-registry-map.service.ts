import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { LandRegistryMap } from '../interfaces/land-registry-map.interface';



@Injectable({
  providedIn: 'root'
})
export class LandRegistryMapService {

  public _landIn = new Subject<LandRegistryMap>();
  public _landOut = new Subject<LandRegistryMap>();
  public _ubigeo: Subject<string> = new Subject();

  public _gestionPredios: Subject<LandRegistryMap> = new Subject();


  /*
  public _landIn = new Subject<LandRegistryMap>();
  */

  constructor() {
  }

    set landIn(value: LandRegistryMap){
        this._landIn.next(value);
    }

    get landIn$(): Observable<LandRegistryMap>{
        return this._landIn.asObservable();
    }

    /*setLandIn(  ){

    }*/


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


    /*set ubigeo(value: string){
        this._ubigeo.next(value);
    }

    get ubigeo$(): Observable<string>{
        return this._ubigeo.asObservable();

    }*/
}
