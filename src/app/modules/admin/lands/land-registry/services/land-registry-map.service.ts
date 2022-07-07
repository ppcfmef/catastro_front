import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LandRegistryMap } from '../interfaces/land-registry-map.interface';
import { LandMapIn } from '../interfaces/land-map-in.interface';



@Injectable({
  providedIn: 'root'
})
export class LandRegistryMapService {

  public _landIn: Subject<LandMapIn> = new Subject();
  public _landOut: Subject<LandRegistryMap> = new Subject();
  public _ubigeo: Subject<string> = new Subject();

  constructor() {
  }

    set landIn(value: any){
        this._landIn.next(value);
    }

    get landIn$(): Observable<LandMapIn>{
        return this._landIn.asObservable();
    }

    set landOut(value: LandRegistryMap){
        this._landOut.next(value);
    }

    get landOut$(): Observable<LandRegistryMap>{
        return this._landOut.asObservable();
    }

    /*set ubigeo(value: string){
        this._ubigeo.next(value);
    }

    get ubigeo$(): Observable<string>{
        return this._ubigeo.asObservable();

    }*/
}
