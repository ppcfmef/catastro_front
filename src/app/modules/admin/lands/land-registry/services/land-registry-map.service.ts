import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LandRegistryMap } from '../interfaces/land-registry-map.interface';



@Injectable({
  providedIn: 'root'
})
export class LandRegistryMapService {

  public _landIn: Subject<any> = new Subject();
  public _landOut: Subject<LandRegistryMap> = new Subject();  
  constructor(
    
  ) { 

  }

    set landIn(value: any){
        this._landIn.next(value);
    }

    get landIn$():Observable<void>{
        return this._landIn.asObservable();
    }
    
    set landOut(value: LandRegistryMap){
        this._landOut.next(value);
    }

    get landOut$():Observable<LandRegistryMap>{
        return this._landOut.asObservable();
    }
}
